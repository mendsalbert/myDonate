import {
  CashIcon,
  ClockIcon,
  SearchCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";

import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import DonateModal from "../components/DonateModal";
import FundRaising from "../components/FundraisingModal.js";
import Layout, { web3Context } from "../components/Layout";
import Modal from "../components/Modal";
import { BigNumber, ethers, providers, utils } from "ethers";
import { donationAddress } from "../config";
import axios from "axios";
import Web3Modal from "web3modal";
import DonationContractABI from "../artifacts/contracts/Donation.sol/Donation.json";
import Web3 from "web3";
const Content = () => {
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState("") as any;
  const [modal, setModal] = useState(false);
  const [images, setImages] = useState([]) as any;
  const [doners, setdoners] = useState([]);

  const [Donation, setDonation] = useState([]);
  const [ethprice, setethprice] = useState(1);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [ready, setready] = useState(false);
  const [provider, web3Provider, address, chainId] = useContext(web3Context);

  useEffect(() => {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD,EUR"
      )
      .then((res) => {
        setethprice(res.data.USD);
      })
      .catch((e) => {});
    loadDonations();
  }, []);

  async function loadDonations() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider(
      "https://kovan.infura.io/v3/745fcbe1f649402c9063fa946fdbb84c"
    );
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
        console.log(filterDoners);

        setImages((prevState) => [...prevState, { image, filterDoners }]);

        setready(true);
      }
    } else {
      window.alert("Donation contract not deployed to detected network");
    }
  }

  const numDaysBetween = function (d1, d2) {
    var today = d2.getTime() / 1000;
    // console.log("today", today);
    var diff = Math.abs(d1 - d2.getTime() / 1000);
    // console.log("diff", diff / (60 * 60 * 24));
    return diff / (60 * 60 * 24);
  };

  if (images.length <= 0) {
    return (
      <div className="md:mt-10 flex flex-col justify-center items-center">
        <svg
          role="status"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-300 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }
  return (
    <>
      <div className=" mt-16">
        <p className="font-bold text-xl text-gray-500 my-10">Donations</p>

        {images.map((donation, index) => {
          const object = {
            id: donation.image.id,
            title: donation.image.title,
            image: donation.image.hash,
            doners: donation.filterDoners,
            endDate:
              Math.round(
                numDaysBetween(
                  Number(donation.image.endDate.toString()),

                  new Date()
                )
              ) < 1
                ? "Donation Ended"
                : Math.round(
                    numDaysBetween(
                      Number(donation.image.endDate.toString()),

                      new Date()
                    )
                  ) + " Days Left",
            donationAmount: (
              Number(
                ethers.utils.formatEther(
                  donation.image.donationAmount.toString()
                )
              ) * ethprice
            ).toLocaleString(),
            targetAmount: (
              Number(
                ethers.utils.formatEther(donation.image.targetPrice.toString())
              ) * ethprice
            ).toLocaleString(),
            // image: donation.image,
          };
          return (
            <div className=" cursor-default mb-9 w-full flex md:flex-row flex-col items-center space-x-0 md:space-x-4 md:justify-between ">
              <div className="w-full md:w-3/12 rounded-lg">
                <Link
                  href={{
                    pathname: "/donation",
                    query: { object: JSON.stringify(object) }, // the data
                  }}
                >
                  <img
                    src={donation.image.hash}
                    className=" h-40 rounded-lg object-cover w-full"
                  />
                </Link>
              </div>

              <div className="md:grow w-full my-3 ">
                <Link
                  href={{
                    pathname: "/donation",
                    query: { object: JSON.stringify(object) }, // the data
                  }}
                >
                  <p className="text-2xl">{donation.image.title}</p>
                </Link>
                <p className="text-lg">{donation.image.description}</p>
                <p className="text-lg font-bold">{donation.image.category}</p>

                <div className="flex text-gray-600 flex-row items-center space-x-2">
                  <ClockIcon className="h-5" />
                  <p className="text-lg">
                    {Math.round(
                      numDaysBetween(
                        Number(donation.image.endDate.toString()),

                        new Date()
                      )
                    ) < 1
                      ? "Donation Ended"
                      : Math.round(
                          numDaysBetween(
                            Number(donation.image.endDate.toString()),

                            new Date()
                          )
                        ) + " Days Left"}
                  </p>
                </div>
                <div className="flex text-gray-600 flex-row items-center space-x-2">
                  <CashIcon className="h-5" />
                  <p className="text-lg">
                    $
                    {(
                      Number(
                        ethers.utils.formatEther(
                          donation.image.donationAmount.toString()
                        )
                      ) * ethprice
                    ).toLocaleString()}
                    /$
                    {(
                      Number(
                        ethers.utils.formatEther(
                          donation.image.targetPrice.toString()
                        )
                      ) * ethprice
                    ).toLocaleString()}{" "}
                    ETH-USD
                  </p>
                </div>
              </div>
              <div
                onClick={() => {
                  setOpen(!open);
                  setComp(
                    <DonateModal
                      provider={web3Provider}
                      donationId={donation.image.id.toString()}
                    />
                  );
                }}
                className="w-full md:w-max bg-gradient-to-r text-center from-cyan-500 to-blue-500 px-6 py-3 rounded-md cursor-pointer text-white"
              >
                Donate
              </div>
            </div>
          );
        })}
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        {comp}
      </Modal>
    </>
  );
};
const IndexPage = (props) => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

export default IndexPage;
