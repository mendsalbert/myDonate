import {
  CashIcon,
  ClockIcon,
  SearchCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { HeartIcon } from "@heroicons/react/solid";

import { BigNumber, ethers, providers, utils } from "ethers";
const Donation = () => {
  const [ethprice, setethprice] = useState(1);
  const router = useRouter();
  const data = router.query as any;
  let donation = {
    title: "",
    image: "",
    doners: [],
    endDate: "",
    donationAmount: "",
    targetAmount: "",
  };
  if (data.object) {
    donation = JSON.parse(data.object);
  }
  // console.log(data.object);
  console.log(
    Math.round(
      (parseInt(donation.donationAmount) / parseInt(donation.targetAmount)) *
        100
    )
  );
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
  }, []);
  // console.log(donation.image[5]);
  // console.log(ethers.utils.formatEther(donation.image[5].toString()));
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
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-5 text-center w-max  px-6 py-3 rounded-full cursor-pointer text-white">
            Start New Fundraising
          </div>
        </div>
        {/* <div className=" grow py-14  bg-gradient-to-r p-8 from-cyan-500 text-center rounded-xl to-blue-500">
        <p className="text-white py-3 text-xl">Start New Fundraising</p>
        <div className="bg-white  py-2   rounded-md cursor-pointer text-blue">
          Start Now
        </div>
      </div> */}
        <div className="">
          <img src="/images/jumbotron.svg" className="w-96" />
        </div>
      </div>

      <div className=" mt-32">
        <div className="flex flex-row  space-x-10 w-full">
          <div className="w-8/12 mb-3">
            <div className="w-full rounded-lg">
              <img
                src={donation.image}
                className="w-full h-96 rounded-lg object-cover"
              />
            </div>
          </div>
          <div className="w-6/12 space-y-3">
            <p className="text-2xl font-bold text-gray-600">{donation.title}</p>
            <p className="text-xl font-bold text-gray-600">Charity Target</p>

            <div className="flex text-gray-600 flex-row items-center space-x-3">
              <CashIcon className="h-7" />
              <p className="text-lg">${donation.targetAmount}</p>
            </div>
            <p className="text-lg text-gray-600">
              {" "}
              $ {donation.donationAmount}/{donation.targetAmount} ETH-USD
            </p>

            <div className="flex flex-row items-center space-x-3">
              <div className="w-full bg-gray-200 rounded-full h-2.5 ">
                <div className={`bg-blue-600 h-2.5 rounded-full w-[1%]`}></div>
              </div>
              <p className="text-gray-600 text-lg">
                {Math.round(
                  (parseInt(donation.donationAmount) /
                    parseInt(donation.targetAmount)) *
                    100
                )}
                %
              </p>
            </div>

            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                {/* {donation.doners.map((doners) => ( */}
                <div className=" rounded-lg">
                  <HeartIcon className="h-7 animate-pulse " fill="red" />
                  {/* <img
                      src="/images/war.jpg"
                      className=" h-8 w-8 ring-4 ring-white rounded-full object-cover"
                    /> */}
                </div>
                {/* ))} */}

                <p className="text-gray-600 text-md font-bold">
                  +{donation.doners.length} Donated
                </p>
              </div>
              <div className="bg-green-200 text-sm font-bold w-max text-green-800 px-2 py-1 rounded-full text-center">
                {donation.endDate}
              </div>
            </div>

            <div className="bg-gradient-to-r text-center from-cyan-500 to-blue-500 px-6 py-3 rounded-md cursor-pointer text-white">
              Donate Now
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>

      <div className="mt-28 text-center w-full py-4 flex flex-col justify-center items-center">
        <p className="text-lg text-gray-500 ">Connet with us</p>
        <div className="flex flex-row space-x-4 cursor-pointer">
          <img src="/images/twitter.svg" className="w-7" />
          <img src="/images/discord.svg" className="w-10" />
          <img src="/images/instagram.svg" className="w-7" />
        </div>
      </div>
    </div>
  );
};

export default Donation;
