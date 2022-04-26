import React, { useState, useEffect } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import DonationContractABI from "../artifacts/contracts/Donation.sol/Donation.json";
type Props = {
  donationId;
};

const DonateModal = (props) => {
  const [amount, setamount] = useState(1) as any;
  async function tipDonation(donationId) {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions: {},
    });

    const web3Provider = await web3Modal.connect();
    const ethersProvider = new ethers.providers.Web3Provider(web3Provider);
    // const ethersSigner = ethersProvider.getSigner()

    const signer = ethersProvider.getSigner();
    // console.log();
    let contract = new ethers.Contract(
      "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
      DonationContractABI.abi,
      signer
    );

    /* user will be prompted to pay the asking proces to complete the transaction */
    const amount_ = ethers.utils.parseUnits(amount, "ether");
    // const price = window.web3.utils.toWei(nft.price.toString(), "Ether");
    // const price = ethers.utils.formatUnits(nft.price, "Ether");
    // const gweiValue = ethers.utils.formatUnits(weiValue, "gwei");

    let transaction = await contract.addDonation(donationId, {
      value: amount_,
    });

    // const transaction = await contract.createMarketSale(nft.tokenId);
    await transaction.wait();
    console.log("transaction complete");
    // loadNFTs();
  }
  return (
    <div className="p-5 font-Montserrat overflow-auto">
      <p className="text-center text-gray-500 text-lg">
        How much you wanna donate?
      </p>
      <div className="py-3 space-y-3">
        <div className="text-center cursor-pointer border-[1px] border-opacity-30 text-lg border-gray-600 rounded-lg w-full py-2 bg-green-300 text-gray-700 ">
          5 ETH
        </div>
        <div className="text-center cursor-pointer border-[1px] border-opacity-30 text-lg border-gray-600 rounded-lg w-full py-2 bg-blue-300 text-gray-700 ">
          10 ETH
        </div>
        <div className="text-center cursor-pointer border-[1px] border-opacity-30 text-lg border-gray-600 rounded-lg w-full py-2 bg-purple-300 text-gray-700 ">
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
