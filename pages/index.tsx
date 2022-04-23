import { SearchCircleIcon, SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => (
  <div className="mx-40 my-6 font-Montserrat">
    <div className="flex flex-row justify-between items-center space-x-32">
      <img src="/images/logo.png" className="w-28 " />
      <div className="flex flex-row items-center bg-[#E7DDDD]">
        <SearchIcon className="h-7" />
        <input
          type="text"
          className="border-2 grow py-2 bg-[#E7DDDD]  outline-none focus:outline-none rounded-full px-4"
        />
      </div>
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 rounded-md cursor-pointer text-white">
        Connet Wallet
      </div>
    </div>
  </div>
);

export default IndexPage;
