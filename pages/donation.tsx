import {
  CashIcon,
  ClockIcon,
  SearchCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import Layout from "../components/Layout";

const Donation = () => (
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
    <div className="flex mt-16 flex-row justify-between">
      <p className="text-3xl text-gray-600 leading-[3.2rem] w-6/12">
        The most transparent donation platform on the internet. Donate in
        cryptos
      </p>
      <div className="w-5/12 py-14  bg-gradient-to-r p-8 from-cyan-500 text-center rounded-xl to-blue-500">
        <p className="text-white font-bold py-3 text-xl">
          Start New Fundraising
        </p>
        <div className="bg-white px-6 py-2   rounded-md cursor-pointer text-blue">
          Start Now
        </div>
      </div>
    </div>

    <div className=" mt-32">
      {/* <p className="font-bold text-xl text-gray-500 my-10">Trending Category</p> */}
      <div className="flex flex-col">
        <div className="w-full mb-3">
          <div className="w-full rounded-lg">
            <img
              src="/images/war.jpg"
              className="w-full h-96 rounded-lg object-cover"
            />
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-3xl font-bold text-gray-600">
            Ukrain vs Russia War
          </p>
          <p className="text-xl font-bold text-gray-600">Charity Target</p>
          <div className="flex text-gray-600 flex-row items-center space-x-3">
            <ClockIcon className="h-7" />
            <p className="text-lg">3 Days Left</p>
          </div>
          <div className="flex text-gray-600 flex-row items-center space-x-3">
            <CashIcon className="h-7" />
            <p className="text-lg">$1,000,000.00</p>
          </div>
          <div className="bg-gradient-to-r text-center from-cyan-500 to-blue-500 px-6 py-3 rounded-md cursor-pointer text-white">
            Donate Now
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Donation;
