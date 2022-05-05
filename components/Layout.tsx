import { useRouter } from "next/router";
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useReducer,
} from "react";

import Link from "next/link";
import Head from "next/head";
import FundRaising from "./FundraisingModal.js";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Modal from "./Modal";
import { ethers, providers } from "ethers";
import { donationAddress } from "../config";
import axios from "axios";
import WalletLink from "walletlink";
import DonationContractABI from "../artifacts/contracts/Donation.sol/Donation.json";
import Web3Modal from "web3modal";
import { ellipseAddress, getChainData } from "../lib/utilities";
import Footer from "./Footer";

const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
  "custom-walletlink": {
    display: {
      logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
      name: "Coinbase",
      description: "Connect to Coinbase Wallet (not Coinbase App)",
    },
    options: {
      appName: "Coinbase", // Your app name
      networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options;
      const walletLink = new WalletLink({
        appName,
      });
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
      await provider.enable();
      return provider;
    },
  },
};

let web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true,
    providerOptions, // required
  });
}

type StateType = {
  provider?: any;
  web3Provider?: any;
  address?: string;
  chainId?: number;
};

type ActionType =
  | {
      type: "SET_WEB3_PROVIDER";
      provider?: StateType["provider"];
      web3Provider?: StateType["web3Provider"];
      address?: StateType["address"];
      chainId?: StateType["chainId"];
    }
  | {
      type: "SET_ADDRESS";
      address?: StateType["address"];
    }
  | {
      type: "SET_CHAIN_ID";
      chainId?: StateType["chainId"];
    }
  | {
      type: "RESET_WEB3_PROVIDER";
    };

const initialState: StateType = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.chainId,
      };
    case "RESET_WEB3_PROVIDER":
      return initialState;
    default:
      throw new Error();
  }
}

export const web3Context = createContext([]);
const Layout = ({ children, title = "myDonate" }) => {
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState("") as any;
  const [images, setImages] = useState([]);
  const [ethprice, setethprice] = useState(1);
  const [ready, setready] = useState(false);

  const router = useRouter();
  const data = router.query;

  async function loadDonations() {
    /* create a generic provider and query for unsold market items */
    // const provider = new ethers.providers.JsonRpcProvider();
    const provider = new ethers.providers.JsonRpcProvider(
      "https://kovan.infura.io/v3/745fcbe1f649402c9063fa946fdbb84c"
    );
    //

    const contract = new ethers.Contract(
      donationAddress,
      DonationContractABI.abi,
      provider
    );
    const { chainId } = await provider.getNetwork();

    if (chainId) {
      const data = await contract.donationCount();

      const getUsd = await contract.getEthUsd();
      let number = Number(getUsd.toString()) as any;
      let ethUSDPrice = ethers.utils.formatUnits(number, 8) as any;

      setethprice(ethUSDPrice);

      const lgt = await data.toString();
      const donersData = await contract.donersCount();
      const lgtDoners = await donersData.toString();

      for (let i = 1; i <= lgt; i++) {
        const image = await contract.idToDonationItem(i);

        let doners = [];
        for (let k = 1; k <= lgtDoners; k++) {
          doners.push(await contract.doners(i, k));
        }
        let filterDoners = doners.filter((v, i) => doners.indexOf(v) === i);
        setImages((prevState) => [...prevState, { image, filterDoners }]);
        setready(true);
      }
    } else {
      window.alert("Donation contract not deployed to detected network");
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const { provider, web3Provider, address, chainId } = state;

  const connect = useCallback(async function () {
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    const provider = await web3Modal.connect();

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new providers.Web3Provider(provider);

    const signer = web3Provider.getSigner() as any;
    const address = await signer.getAddress();
    const network = (await web3Provider.getNetwork()) as any;

    console.log(signer);

    dispatch({
      type: "SET_WEB3_PROVIDER",
      provider,
      web3Provider,
      address,
      chainId: network.chainId,
    });
  }, []);

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      dispatch({
        type: "RESET_WEB3_PROVIDER",
      });
    },
    [provider]
  );

  useEffect(() => {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD,EUR"
      )
      .then((res) => {
        // setethprice(res.data.USD);
      })
      .catch((e) => {});
    loadDonations();

    if (web3Modal.cachedProvider) {
      connect();
    }
  }, [connect]);

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("accountsChanged", accounts);
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        });
      };

      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload();
      };

      const handleDisconnect = (error: { code: number; message: string }) => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  const chainData = getChainData(chainId);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className=" mx-4 md:mx-40 my-6  font-Montserrat">
        <div className="flex flex-row justify-between items-center space-x-6 md:space-x-32">
          <Link href="/">
            <img src="/images/logo.png" className="w-16 md:w-28 " />
          </Link>

          {web3Provider ? (
            <div
              className=" bg-gradient-to-r from-cyan-500 to-blue-500 px-4 md:px-6  md:py-3 py-2 rounded-md cursor-pointer text-white"
              onClick={() => {
                disconnect();
              }}
            >
              Disconnect
            </div>
          ) : (
            <div
              className=" bg-gradient-to-r from-cyan-500 to-blue-500 px-4 md:px-6  md:py-3 py-2 rounded-md cursor-pointer text-white"
              onClick={() => {
                connect();
              }}
            >
              Connect
            </div>
          )}
        </div>
        <div className="flex mt-16 flex-col-reverse  md:flex-row space-x-0 md:space-x-4 md:justify-between">
          <div className="md:w-6/12 text-center md:text-left w-full">
            <p className="md:text-2xl mt-2 md:mt-3 text-xl text-gray-600 md:leading-[3rem] leading-[2rem]  ">
              The most{" "}
              <span className="text-blue-600 italic font-bold">
                Transparent
              </span>{" "}
              donation platform on the internet. Donate in cryptos let us build
              a better world
            </p>
            <div
              onClick={() => {
                setOpen(!open);
                setComp(<FundRaising provider={web3Provider} />);
              }}
              className="  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-5 text-center w-full md:w-max  px-6 py-3 rounded-full cursor-pointer text-white"
            >
              Start New Fundraising
            </div>
          </div>

          <div className="">
            <img src="/images/jumbotron.svg" className="md:w-96 w-52 " />
          </div>
        </div>
        <div className=" mt-16">
          <p className="font-bold text-xl text-gray-500 my-10">Category</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-20">
            <Link
              href={{
                pathname: "/category",
                query: { category: "education" }, // the data
              }}
              scroll={false}
            >
              <div className="text-center">
                <div
                  className={` ${
                    data.category === "education" ? "ring-8 ring-gray-600" : ""
                  } rounded-lg shadow-xl bg-[#FF6363] px-6 py-6 md:py-12 justify-center flex flex-row w-full text-center`}
                >
                  <img src="/images/education.svg" className="w-16" />
                </div>

                <p className="pt-2 text-xl">Education</p>
              </div>
            </Link>
            <Link
              href={{
                pathname: "/category",
                query: { category: "disaster" },
              }}
              scroll={false}
            >
              <div className="text-center">
                <div
                  className={` ${
                    data.category === "disaster" ? "ring-8 ring-gray-600" : ""
                  } rounded-lg shadow-xl bg-[#FFD93D] px-6 py-6 md:py-12 justify-center flex flex-row w-full text-center`}
                >
                  <img src="/images/hurrican.svg" className="w-16" />
                </div>
                <p className="pt-2 text-xl">Disaster</p>
              </div>
            </Link>
            <Link
              href={{
                pathname: "/category",
                query: { category: "health" }, // the data
              }}
              scroll={false}
            >
              <div className="text-center">
                <div
                  className={` ${
                    data.category === "health" ? "ring-8 ring-gray-600" : ""
                  } rounded-lg shadow-xl bg-[#6BCB77] px-6 py-6 md:py-12 justify-center flex flex-row w-full text-center`}
                >
                  <img src="/images/health.svg" className="w-16" />
                </div>
                <p className="pt-2 text-xl">Health</p>
              </div>
            </Link>
            <Link
              href={{
                pathname: "/category",
                query: { category: "famine" }, // the data
              }}
              scroll={false}
            >
              <div className="text-center">
                <div
                  className={` ${
                    data.category === "famine" ? "ring-8 ring-gray-600" : ""
                  } rounded-lg shadow-xl bg-[#4D96FF] px-6 py-6 md:py-12 justify-center flex flex-row w-full text-center`}
                >
                  <img src="/images/food.svg" className="w-16" />
                </div>
                <p className="pt-2 text-xl">Famine</p>
              </div>
            </Link>
          </div>
        </div>

        <web3Context.Provider
          value={[provider, web3Provider, address, chainId, images, ethprice]}
        >
          {children}
        </web3Context.Provider>
      </div>
      <Footer />
      <Modal open={open} onClose={() => setOpen(false)}>
        {comp}
      </Modal>
    </div>
  );
};

export default Layout;
