import React, { useState, useEffect } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const FundRaising = () => {
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
  return (
    <div className="p-5 font-Montserrat overflow-auto">
      <p className="text-center text-gray-500 text-lg">
        How much you wanna donate?
      </p>
      <div className="py-3 space-y-3">
        <input
          type="text"
          className="w-full py-3 outline-none ring-2 rounded-lg p-3"
          placeholder="Enter title "
        />
        <input
          type="text"
          className="w-full py-3 outline-none ring-2 rounded-lg p-3"
          placeholder="Enter description"
        />
        <div>
          <label className="mt-6">Select category</label>
          <select
            placeholder="Select description"
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
            type="date"
            className="w-full py-3 outline-none ring-2 rounded-lg p-3"
            placeholder="Enter amount manually"
          />
        </div>
        <input type="file" name="Asset" className="my-4" onChange={onChange} />
        {fileUrl && <img className="rounded mt-4" width="350" src={fileUrl} />}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded-lg text-center cursor-pointer text-white">
          Continue
        </div>
      </div>
    </div>
  );
};

export default FundRaising;
