import { CashIcon, ClockIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React, { useState, useContext } from "react";
import DonateModal from "../components/DonateModal";
import Layout, { web3Context } from "../components/Layout";
import Modal from "../components/Modal";
import { ethers } from "ethers";
import { numDaysBetween } from "../lib/utilities";
import Spinner from "../components/spinner";

const Content = () => {
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState("") as any;
  const [provider, web3Provider, address, chainId, images, ethprice] =
    useContext(web3Context);

  if (images.length <= 0) {
    return <Spinner />;
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
