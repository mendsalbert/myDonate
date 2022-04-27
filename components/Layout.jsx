import { useRouter } from "next/router";
import React, { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import FundRaising from "./FundraisingModal.js";

import Modal from "./Modal";
import { BigNumber, ethers, providers, utils } from "ethers";
import { donationAddress } from "../config";
import axios from "axios";
import Web3Modal, { local } from "web3modal";
import DonationContractABI from "../artifacts/contracts/Donation.sol/Donation.json";
import Web3 from "web3";
// type Props = {
//   children?: ReactNode;
//   title?: string;
// };

const Layout = ({ children, title = "myDonate" }) => {
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState("");
  const [modal, setModal] = useState(false);
  const [images, setImages] = useState([]);
  const [doners, setdoners] = useState([]);

  const [Donation, setDonation] = useState([]);
  const [ethprice, setethprice] = useState(1);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [ready, setready] = useState(false);
  const [connected, setconnected] = useState(false);

  const router = useRouter();
  const data = router.query;

  let account;
  // console.log(data.category);
  useEffect(() => {
    account = localStorage.getItem("account");
    axios
      .get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD,EUR"
      )
      .then((res) => {
        // console.log(res.data);
        setethprice(res.data.USD);
      })
      .catch((e) => {
        // console.log(e.target.value);
      });
    loadDonations();
  }, []);

  async function loadDonations() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider(
      "https://kovan.infura.io/v3/745fcbe1f649402c9063fa946fdbb84c"
    );
    // "https://rpc-mumbai.maticvigil.com/"
    // "https://rpc-mumbai.maticvigil.com/"
    // ("https://rpc-mumbai.matic.today");

    // setProvider(provider);
    const contract = new ethers.Contract(
      donationAddress,
      DonationContractABI.abi,
      provider
    );

    const { chainId } = await provider.getNetwork();
    console.log(chainId); // 42

    if (chainId) {
      const data = await contract.donationCount();
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

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className=" mx-4 md:mx-40 my-6  font-Montserrat">
        <div className="flex flex-row justify-between items-center space-x-6 md:space-x-32">
          <img src="/images/logo.png" className="w-16 md:w-28 " />

          <div
            onClick={async () => {
              const provider = new ethers.providers.Web3Provider(
                window.ethereum,
                "any"
              );
              // Prompt user for account connections
              await provider.send("eth_requestAccounts", []);
              const signer = provider.getSigner();
              const account = await signer.getAddress();
              console.log("Account:", await signer.getAddress());
              localStorage.setItem("account", account);
              // setconnected(true);
            }}
            className=" bg-gradient-to-r from-cyan-500 to-blue-500 px-4 md:px-6  md:py-3 py-2 rounded-md cursor-pointer text-white"
          >
            {localStorage.getItem("account") ? "Connected" : "Connet Wallet"}
          </div>
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
                setComp(<FundRaising />);
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
                  {/* <svg path="/images/education.svg" /> */}
                </div>

                <p className="pt-2 text-xl">Education</p>
              </div>
            </Link>
            <Link
              href={{
                pathname: "/category",
                query: { category: "disaster" },
              }}
              scroll={false} // the data
            >
              <div className="text-center">
                <div
                  className={` ${
                    data.category === "disaster" ? "ring-8 ring-gray-600" : ""
                  } rounded-lg shadow-xl bg-[#FFD93D] px-6 py-6 md:py-12 justify-center flex flex-row w-full text-center`}
                >
                  <img src="/images/hurrican.svg" className="w-16" />
                  {/* <svg path="/images/education.svg" /> */}
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
                  {/* <svg path="/images/education.svg" /> */}
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
        {children}
      </div>

      <footer>
        <div className="mt-28 text-center w-full py-4 flex flex-col justify-center items-center">
          <p className="text-lg text-gray-500 ">Connet with us</p>
          <div className="flex flex-row space-x-4 cursor-pointer">
            <img src="/images/twitter.svg" className="w-7" />
            <img src="/images/discord.svg" className="w-10" />
            <img src="/images/instagram.svg" className="w-7" />
          </div>
        </div>
      </footer>

      <Modal open={open} onClose={() => setOpen(false)}>
        {comp}
      </Modal>
    </div>
  );
};

export default Layout;
