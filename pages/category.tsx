import { CashIcon, ClockIcon } from "@heroicons/react/outline";

import Link from "next/link";
import React, { useState, useRef, useContext, useEffect } from "react";
import DonateModal from "../components/DonateModal";
import Layout, { web3Context } from "../components/Layout";
import Modal from "../components/Modal";
import { BigNumber, ethers, providers, utils } from "ethers";
import { donationAddress } from "../config";
import axios from "axios";

import DonationContractABI from "../artifacts/contracts/Donation.sol/Donation.json";

import { useRouter } from "next/router";
import { numDaysBetween } from "../lib/utilities";

const Content = () => {
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState("") as any;
  const [provider, web3Provider, address, chainId, images, ethprice] =
    useContext(web3Context);
  const router = useRouter();
  const data = router.query as any;

  const filterData = (type) => {
    return images.filter((v, i) => {
      return v.image.category === type;
    });
  };

  let filteredCategory = filterData(data.category);

  return (
    <>
      <div className=" mt-16">
        <p className="font-bold text-xl text-gray-500 my-10">
          All donations in {data.category}
        </p>

        {filteredCategory.map((donation, index) => {
          const object = {
            id: donation.image.id.toString(),
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
const Category = () => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

export default Category;
