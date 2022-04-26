import {
  CashIcon,
  ClockIcon,
  SearchCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";

import Link from "next/Link";
import React, { useState, useEffect } from "react";
import DonateModal from "../components/DonateModal";
import FundRaising from "../components/FundraisingModal.js";
import Layout from "../components/Layout";
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
    const provider = new ethers.providers.JsonRpcProvider();
    // "https://rpc-mumbai.maticvigil.com/"
    // ("https://rpc-mumbai.matic.today");

    // setProvider(provider);
    const contract = new ethers.Contract(
      donationAddress,
      DonationContractABI.abi,
      provider
    );

    if (contract) {
      const data = await contract.donationCount();
      const lgt = await data.toString();
      const donersData = await contract.donersCount();
      const lgtDoners = await donersData.toString();
      console.log("*********************", lgt);
      for (let i = 1; i <= lgt; i++) {
        const image = await contract.idToDonationItem(i);
        // const doners = await contract.doners(i, 3);
        // const doners2 = await contract.doners(i, 5);
        // console.log(doners, doners2);
        let doners = [];
        for (let k = 1; k <= lgtDoners; k++) {
          // doners = await contract.doners(i, k);
          doners.push(await contract.doners(i, k));
          // console.log(doners);
        }
        // console.log(doners);
        let filterDoners = doners.filter((v, i) => doners.indexOf(v) === i);
        console.log(filterDoners);
        // setdoners((prevState) => [...prevState, doners]);

        // let filteredImage = image.filter(
        //   (v, i) => v.owner === "0x0000000000000000000000000000000000000000"
        // );
        // console.log(filteredImage.length);

        setImages((prevState) => [...prevState, { image, filterDoners }]);
        // setdoners((prevState) => [...prevState, doners]);
        setready(true);
      }
    } else {
      window.alert("Donation contract not deployed to detected network");
    }
  }
  console.log(images);
  // console.log(doners);
  return (
    <div className="mx-40 my-6  font-Montserrat">
      <div className="flex flex-row justify-between items-center space-x-32">
        <img src="/images/logo.png" className="w-28 " />
        <div className="flex grow flex-row items-center bg-[#E7DDDD] px-4 rounded-full">
          <SearchIcon className="h-6 text-gray-500" />
          <input
            type="text"
            className=" py-3  w-full bg-[#E7DDDD] ring-0 focus:ring-0 outline-none focus:outline-none rounded-full px-4"
          />
        </div>
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded-md cursor-pointer text-white">
          Connet Wallet
        </div>
      </div>
      <div className="flex mt-16 flex-row space-x-4 justify-between">
        <div className="w-6/12">
          <p className="text-2xl text-gray-600 leading-[3rem] ">
            The most{" "}
            <span className="text-blue-600 italic font-bold">Transparent</span>{" "}
            donation platform on the internet. Donate in cryptos let us build a
            better world
          </p>
          <div
            onClick={() => {
              setOpen(!open);
              setComp(<FundRaising />);
            }}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-5 text-center w-max  px-6 py-3 rounded-full cursor-pointer text-white"
          >
            Start New Fundraising
          </div>
        </div>

        <div className="">
          <img src="/images/jumbotron.svg" className="w-96" />
        </div>
      </div>
      <div className=" mt-16">
        <p className="font-bold text-xl text-gray-500 my-10">Category</p>
        <div className="grid grid-cols-4 gap-20">
          <div className="text-center">
            <div className="rounded-lg shadow-xl bg-[#FF6363] px-6 py-12 justify-center flex flex-row w-full text-center">
              <img src="/images/education.svg" className="w-16" />
              {/* <svg path="/images/education.svg" /> */}
            </div>
            <p className="pt-2 text-xl">School</p>
          </div>
          <div className="text-center">
            <div className="rounded-lg shadow-xl bg-[#FFD93D] px-6 py-12 justify-center flex flex-row w-full text-center">
              <img src="/images/hurrican.svg" className="w-16" />
              {/* <svg path="/images/education.svg" /> */}
            </div>
            <p className="pt-2 text-xl">Disaster</p>
          </div>

          <div className="text-center">
            <div className="rounded-lg shadow-xl bg-[#6BCB77] px-6 py-12 justify-center flex flex-row w-full text-center">
              <img src="/images/health.svg" className="w-16" />
              {/* <svg path="/images/education.svg" /> */}
            </div>
            <p className="pt-2 text-xl">Health</p>
          </div>

          <div className="text-center">
            <div className="rounded-lg shadow-xl bg-[#4D96FF] px-6 py-12 justify-center flex flex-row w-full text-center">
              <img src="/images/education.svg" className="w-16" />
            </div>
            <p className="pt-2 text-xl">Famine</p>
          </div>
        </div>
      </div>
      {/* <div className=" mt-16">
        <p className="font-bold text-xl text-gray-500 my-10">
          Trending Category
        </p>
        <div className="flex flex-row space-x-6 ">
          <div className="8/12">
            <div className="w-full rounded-lg">
              <img
                src={ready ? images[0].hash : ""}
                className=" rounded-lg object-cover"
              />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-2xl">{ready ? images[0].title : ""}</p>
            <p className="text-lg">{ready ? images[0].description : ""}</p>
            <div className="flex text-gray-600 flex-row items-center space-x-1">
              <ClockIcon className="h-7" />
              <p className="text-md">
                {ready
                  ? new Date(
                      Date.now() - images[0].endDate.toString()
                    ).getDate() -
                      1 <
                    1
                    ? "Donation Ended"
                    : ` ${
                        new Date(
                          Date.now() - images[0].endDate.toString()
                        ).getDate() - 1
                      } Days Left`
                  : ""}{" "}
              </p>
            </div>
            <div className="flex text-gray-600 flex-row items-center space-x-1">
              <CashIcon className="h-7" />
              <p className="text-md">
                $
                {(
                  Number(
                    ethers.utils.formatEther(
                      images[0].donationAmount.toString()
                    )
                  ) * ethprice
                ).toLocaleString()}
                /$
                {(
                  Number(
                    ethers.utils.formatEther(images[0].targetPrice.toString())
                  ) * ethprice
                ).toLocaleString()}{" "}
                ETH-USD
              </p>
            </div>
            <div
              onClick={() => {
                setOpen(!open);
                setComp(<DonateModal />);
              }}
              className="bg-gradient-to-r text-center text-lg from-cyan-500 to-blue-500 px-6 py-3 rounded-md cursor-pointer text-white"
            >
              Donate Now
            </div>
          </div>
        </div>
      </div> */}
      <div className=" mt-16">
        <p className="font-bold text-xl text-gray-500 my-10">Donations</p>

        {images.map((donation, index) => {
          console.log(donation.image);
          const object = {
            title: donation.image.title,
            image: donation.image.hash,
            doners: donation.filterDoners,
            endDate:
              new Date(
                Date.now() - donation.image.endDate.toString()
              ).getDate() -
                1 <
              1
                ? "Donation Ended"
                : ` ${
                    new Date(
                      Date.now() - donation.image.endDate.toString()
                    ).getDate() - 1
                  } Days Left`,
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
            <div className=" cursor-default mb-9 w-full flex flex-row items-center space-x-4 justify-between ">
              <div className="w-3/12 rounded-lg">
                <Link
                  href={{
                    pathname: "/donation",
                    query: { object: JSON.stringify(object) }, // the data
                  }}
                >
                  <img
                    src={donation.image.hash}
                    className=" rounded-lg object-cover"
                  />
                </Link>
              </div>

              <div className="grow ">
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
                    {new Date(
                      Date.now() - donation.image.endDate.toString()
                    ).getDate() -
                      1 <
                    1
                      ? "Donation Ended"
                      : ` ${
                          new Date(
                            Date.now() - donation.image.endDate.toString()
                          ).getDate() - 1
                        } Days Left`}{" "}
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
                  <p>{donation.image.id.toString()}</p>
                  <p>{donation.filterDoners.length}</p>
                </div>
              </div>
              <div
                onClick={() => {
                  setOpen(!open);
                  setComp(
                    <DonateModal donationId={donation.image.id.toString()} />
                  );
                }}
                className="bg-gradient-to-r text-center from-cyan-500 to-blue-500 px-6 py-3 rounded-md cursor-pointer text-white"
              >
                Donate
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-28 text-center w-full py-4 flex flex-col justify-center items-center">
        <p className="text-lg text-gray-500 ">Connet with us</p>
        <div className="flex flex-row space-x-4 cursor-pointer">
          <img src="/images/twitter.svg" className="w-7" />
          <img src="/images/discord.svg" className="w-10" />
          <img src="/images/instagram.svg" className="w-7" />
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        {comp}
      </Modal>
    </div>
  );
};

export default IndexPage;
