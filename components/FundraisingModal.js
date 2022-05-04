import React, { useState, useEffect } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
import DonationContractABI from "../artifacts/contracts/Donation.sol/Donation.json";
import { donationAddress } from "../config";
const FundRaising = (props) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    title: "",
    description: "",
    category: "",
    targetAmount: "",
    endDate: "",
  });

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function addFund() {
    if (typeof window.ethereum == "undefined") {
      alert("MetaMask is installed!");
    }
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = props.provider.getSigner();

    /* next, create the item */
    const targetAmount = ethers.utils.parseUnits(
      formInput.targetAmount,
      "ether"
    );
    let contract = new ethers.Contract(
      donationAddress,
      DonationContractABI.abi,
      signer
    );
    const date = new Date(formInput.endDate);
    let transaction = await contract.uploadDonation(
      fileUrl,
      formInput.description,
      Math.floor(date.getTime() / 1000),
      formInput.category,
      formInput.title,
      targetAmount
    );

    await transaction.wait();

    alert("Donation uploaded succesfully");
    window.location.href = "/";
  }

  return (
    <div className="p-5 font-Montserrat overflow-auto">
      <p className="text-center text-gray-500 text-lg">Add a donation(ETH)</p>
      <div className="py-3 space-y-3">
        <input
          type="text"
          required={true}
          onChange={(e) =>
            updateFormInput({ ...formInput, title: e.target.value })
          }
          className="w-full py-3 outline-none ring-2 rounded-lg p-3"
          placeholder="Enter title "
        />
        <input
          type="text"
          required={true}
          onChange={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
          className="w-full py-3 outline-none ring-2 rounded-lg p-3"
          placeholder="Enter description"
        />
        <input
          type="number"
          onChange={(e) =>
            updateFormInput({ ...formInput, targetAmount: e.target.value })
          }
          className="w-full py-3 outline-none ring-2 rounded-lg p-3"
          placeholder="Targeted Amount (ETH)"
          required={true}
        />
        <div>
          <label className="mt-6">Select category</label>
          <select
            placeholder="Select description"
            required={true}
            onChange={(e) =>
              updateFormInput({ ...formInput, category: e.target.value })
            }
            className="w-full py-3 outline-none ring-2 rounded-lg p-3"
          >
            <option value="education"></option>
            <option value="education">Education</option>
            <option value="disaster">Disaster</option>
            <option value="health">Health</option>
            <option value="famine">Famine</option>
          </select>
        </div>
        <div className="">
          <label className="mt-6">End date</label>
          <input
            required={true}
            type="date"
            onChange={(e) =>
              updateFormInput({ ...formInput, endDate: e.target.value })
            }
            className="w-full py-3 outline-none ring-2 rounded-lg p-3"
            placeholder="Enter amount manually"
          />
        </div>
        <input
          required={true}
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
        {fileUrl && <img className="rounded mt-4" width="350" src={fileUrl} />}
        <div
          onClick={addFund}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded-lg text-center cursor-pointer text-white"
        >
          Continue
        </div>
      </div>
    </div>
  );
};

export default FundRaising;
