import { SearchCircleIcon, SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => (
  <div className="mx-40 my-6 font-Montserrat">
    <div className="flex flex-row justify-between items-center space-x-32">
      <img src="/images/logo.png" className="w-28 " />
      <div className="flex grow flex-row items-center bg-[#E7DDDD] px-4 rounded-full">
        <SearchIcon className="h-6 text-gray-500" />
        <input
          type="text"
          className=" py-2 bg-[#E7DDDD] ring-0 focus:ring-0 outline-none focus:outline-none rounded-full px-4"
        />
      </div>
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 rounded-md cursor-pointer text-white">
        Connet Wallet
      </div>
    </div>
    <div className="flex flex-row justify-between">
      <p>
        The most transparent donation platform on the internet. Donate in
        cryptos
      </p>
      <div></div>
    </div>
  </div>
);

export default IndexPage;
