import { SearchCircleIcon, SearchIcon } from "@heroicons/react/outline";
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
    <div className=" mt-16">
      <p className="font-bold text-xl text-gray-500 my-10">Category</p>
      <div className="grid grid-cols-4 gap-16">
        <div className="text-center">
          <div className="rounded-lg bg-[#FF6363] p-7 justify-center flex flex-row w-full text-center">
            <img src="/images/education.svg" className="w-24" />
            {/* <svg path="/images/education.svg" /> */}
          </div>
          <p className="pt-2 text-xl">School</p>
        </div>
        <div className="text-center">
          <div className="rounded-lg bg-[#FFD93D] p-7 justify-center flex flex-row w-full text-center">
            <img src="/images/hurrican.svg" className="w-24" />
            {/* <svg path="/images/education.svg" /> */}
          </div>
          <p className="pt-2 text-xl">Disaster</p>
        </div>

        <div className="text-center">
          <div className="rounded-lg bg-[#6BCB77] p-7 justify-center flex flex-row w-full text-center">
            <img src="/images/health.svg" className="w-24" />
            {/* <svg path="/images/education.svg" /> */}
          </div>
          <p className="pt-2 text-xl">Health</p>
        </div>

        <div className="text-center">
          <div className="rounded-lg bg-[#4D96FF] p-7 justify-center flex flex-row w-full text-center">
            <img src="/images/education.svg" className="w-24" />
          </div>
          <p className="pt-2 text-xl">Famine</p>
        </div>
      </div>
    </div>
    <div className=" mt-16">
      <p className="font-bold text-xl text-gray-500 my-10">Trending Category</p>
      <div className="6/12">
        <div>
          <img src="/images/war.jpg" className="w-10" />
        </div>
      </div>
      <div>
        <p>right</p>
      </div>
    </div>
  </div>
);

export default IndexPage;
