import {
  CashIcon,
  ClockIcon,
  SearchCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import DonateModal from "../components/DonateModal";
import FundRaising from "../components/FundraisingModal.js";
import Layout from "../components/Layout.jsx";
import Modal from "../components/Modal";
import { BigNumber, ethers, providers, utils } from "ethers";
import { donationAddress } from "../config";
import axios from "axios";
import Web3Modal from "web3modal";
import DonationContractABI from "../artifacts/contracts/Donation.sol/Donation.json";
import Web3 from "web3";

const IndexPage = () => {
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState("") as any;
  const [modal, setModal] = useState(false);
  const [images, setImages] = useState([]) as any;
  const [doners, setdoners] = useState([]);

  const [Donation, setDonation] = useState([]);
  const [ethprice, setethprice] = useState(1);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [ready, setready] = useState(false);

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
  return (
    <Layout>
      <div className=" mt-16">
        <p className="font-bold text-xl text-gray-500 my-10">Donations</p>

        {images.map((donation, index) => {
          // console.log(donation.image);
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
                    className=" rounded-lg object-cover w-full"
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
                    <DonateModal donationId={donation.image.id.toString()} />
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
    </Layout>
  );
};

export default IndexPage;
