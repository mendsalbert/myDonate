import {
  CashIcon,
  ClockIcon,
  SearchCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => (
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
        <div className="bg-gradient-to-r text-center w-max from-cyan-500 to-blue-500 px-6 py-3 rounded-full cursor-pointer text-white">
          Connet Wallet
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
    <div className=" mt-16">
      <p className="font-bold text-xl text-gray-500 my-10">Trending Category</p>
      <div className="flex flex-row space-x-6 ">
        <div className="8/12">
          <div className="w-full rounded-lg">
            <img src="/images/war.jpg" className=" rounded-lg object-cover" />
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-2xl">Ukrain vs Russia War</p>
          <p className="text-lg">
            The most transparent donation platform on the internet. Donate in
            cryptos
          </p>
          <div className="flex text-gray-600 flex-row items-center space-x-1">
            <ClockIcon className="h-7" />
            <p className="text-md">3 Days Left</p>
          </div>
          <div className="flex text-gray-600 flex-row items-center space-x-1">
            <CashIcon className="h-7" />
            <p className="text-md">$1,000,000.00</p>
          </div>
          <div className="bg-gradient-to-r text-center text-lg from-cyan-500 to-blue-500 px-6 py-3 rounded-md cursor-pointer text-white">
            Donate Now
          </div>
        </div>
      </div>
    </div>
    <div className=" mt-16">
      <p className="font-bold text-xl text-gray-500 my-10">Donations</p>
      <div
        className="mb-9 w-full flex flex-row items-center space-x-4
       justify-between "
      >
        <div className="w-3/12 rounded-lg">
          <img src="/images/war.jpg" className=" rounded-lg object-cover" />
        </div>

        <div className="grow ">
          <p className="text-2xl">Ukrain vs Russia War</p>
          <p className="text-lg">
            The most transparent donation platform on the internet. Donate in
            cryptos
          </p>
          <div className="flex text-gray-600 flex-row items-center space-x-3">
            <ClockIcon className="h-7" />
            <p className="text-lg">3 Days Left</p>
          </div>
          <div className="flex text-gray-600 flex-row items-center space-x-3">
            <CashIcon className="h-7" />
            <p className="text-lg">$1,000,000.00</p>
          </div>
        </div>
        <div className="bg-gradient-to-r text-center from-cyan-500 to-blue-500 px-6 py-3 rounded-md cursor-pointer text-white">
          Donate
        </div>
      </div>
      <div
        className="mb-9 w-full flex flex-row items-center space-x-4
       justify-between "
      >
        <div className="w-3/12 rounded-lg">
          <img src="/images/war.jpg" className=" rounded-lg object-cover" />
        </div>

        <div className="grow ">
          <p className="text-2xl">Ukrain vs Russia War</p>
          <p className="text-lg">
            The most transparent donation platform on the internet. Donate in
            cryptos
          </p>
          <div className="flex text-gray-600 flex-row items-center space-x-3">
            <ClockIcon className="h-7" />
            <p className="text-lg">3 Days Left</p>
          </div>
          <div className="flex text-gray-600 flex-row items-center space-x-3">
            <CashIcon className="h-7" />
            <p className="text-lg">$1,000,000.00</p>
          </div>
        </div>
        <div className="bg-gradient-to-r text-center from-cyan-500 to-blue-500 px-6 py-3 rounded-md cursor-pointer text-white">
          Donate
        </div>
      </div>
      <div
        className="mb-9 w-full flex flex-row items-center space-x-4
       justify-between "
      >
        <div className="w-3/12 rounded-lg">
          <img src="/images/war.jpg" className=" rounded-lg object-cover" />
        </div>

        <div className="grow ">
          <p className="text-2xl">Ukrain vs Russia War</p>
          <p className="text-lg">
            The most transparent donation platform on the internet. Donate in
            cryptos
          </p>
          <div className="flex text-gray-600 flex-row items-center space-x-3">
            <ClockIcon className="h-7" />
            <p className="text-lg">3 Days Left</p>
          </div>
          <div className="flex text-gray-600 flex-row items-center space-x-3">
            <CashIcon className="h-7" />
            <p className="text-lg">$1,000,000.00</p>
          </div>
        </div>
        <div className="bg-gradient-to-r text-center from-cyan-500 to-blue-500 px-6 py-3 rounded-md cursor-pointer text-white">
          Donate
        </div>
      </div>
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

export default IndexPage;
