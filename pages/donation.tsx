import {
  CashIcon,
  ClockIcon,
  SearchCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import Layout, { web3Context } from "../components/Layout";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";

import { HeartIcon } from "@heroicons/react/solid";
import ProgressBar from "@ramonak/react-progress-bar";

import DonateModal from "../components/DonateModal";
import Modal from "../components/Modal";
const Content = () => {
  const [provider, web3Provider, address, chainId] = useContext(web3Context);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState("") as any;
  const router = useRouter();
  const data = router.query as any;
  let donation = {
    id: "",
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

  console.log(
    Math.round(
      (parseInt(donation.donationAmount) / parseInt(donation.targetAmount)) *
        100
    )
  );

  let percentage = Math.ceil(
    (parseInt(donation.donationAmount) / parseInt(donation.targetAmount)) * 100
  );

  console.log(percentage);
  return (
    <>
      <div className=" mt-32">
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-10 w-full">
          <div className="md:w-8/12 w-full mb-3">
            <div className="w-full rounded-lg">
              <img
                src={donation.image}
                className="w-full h-96 rounded-lg object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-6/12 space-y-3">
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
                <ProgressBar
                  completed={Math.round(
                    (parseInt(donation.donationAmount) /
                      parseInt(donation.targetAmount)) *
                      100
                  )}
                />
                {/* <div className={`bg-blue-600 h-2.5 rounded-full w-[%]`}></div> */}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex mb-2 md:mb-0 flex-row items-center">
                <div className=" rounded-lg">
                  <HeartIcon className="h-7 animate-pulse " fill="red" />
                </div>

                <p className="text-gray-600 text-md font-bold">
                  +{Number(donation.doners.length)} Donated
                </p>
              </div>
              <div className="bg-green-200 w-full text-sm font-bold md:w-max text-green-800 px-2 py-1 rounded-full text-center">
                {donation.endDate}
              </div>
            </div>

            <div
              onClick={() => {
                console.log(donation.id);
                setOpen(!open);
                setComp(
                  <DonateModal
                    provider={web3Provider}
                    donationId={donation.id}
                  />
                );
              }}
              className="bg-gradient-to-r text-center from-cyan-500 to-blue-500 px-6 py-3 rounded-md cursor-pointer text-white"
            >
              Donate Now
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        {comp}
      </Modal>
    </>
  );
};
const Donation = () => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

export default Donation;
