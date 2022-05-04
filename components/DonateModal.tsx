import React, { useState, useEffect } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import DonationContractABI from "../artifacts/contracts/Donation.sol/Donation.json";
import { donationAddress } from "../config";
type Props = {
  donationId;
};

const DonateModal = (props) => {
  const [amount, setamount] = useState("") as any;
  async function tipDonation(donationId, value = amount) {
    if (typeof window.ethereum == "undefined") {
      alert("MetaMask is installed!");
    }
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    // const signer = provider.getSigner();
    const signer = props.provider.getSigner();

    let contract = new ethers.Contract(
      donationAddress,
      DonationContractABI.abi,
      signer
    );

    /* user will be prompted to pay the asking proces to complete the transaction */
    const amount_ = ethers.utils.parseUnits(value, "ether");
    let transaction = await contract.addDonation(donationId, {
      value: amount_,
    });

    await transaction.wait();
    alert("Donation sent succesfully");
    window.location.href = "/";
    // loadNFTs();
  }
  return (
    <div className="md:p-5 p-1  font-Montserrat overflow-auto">
      <p className="text-center text-gray-500 text-lg">
        How much you wanna donate?
      </p>
      <div className="py-3 space-y-3">
        <div
          onClick={() => {
            tipDonation(props.donationId, "5");
          }}
          className="text-center cursor-pointer border-[1px] border-opacity-30 text-lg border-gray-600 rounded-lg w-full py-2 bg-green-300 text-gray-700 "
        >
          5 ETH
        </div>
        <div
          onClick={() => {
            tipDonation(props.donationId, "10");
          }}
          className="text-center cursor-pointer border-[1px] border-opacity-30 text-lg border-gray-600 rounded-lg w-full py-2 bg-blue-300 text-gray-700 "
        >
          10 ETH
        </div>
        <div
          onClick={() => {
            tipDonation(props.donationId, "15");
          }}
          className="text-center cursor-pointer border-[1px] border-opacity-30 text-lg border-gray-600 rounded-lg w-full py-2 bg-purple-300 text-gray-700 "
        >
          15 ETH
        </div>
        <input
          type="number"
          value={amount}
          onChange={(e) => {
            setamount(e.target.value);
          }}
          className="w-full py-3 outline-none ring-2 rounded-lg p-3"
          placeholder="Enter amount manually"
        />
        <div
          onClick={() => {
            tipDonation(props.donationId);
          }}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded-lg text-center cursor-pointer text-white"
        >
          Continue
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
