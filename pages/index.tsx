import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => (
  <div className="mx-40 my-6 font-Montserrat">
    <div className="flex flex-row justify-between items-center space-x-32">
      <img src="/images/logo.png" className="w-28 " />
      <input type="text" className="border-2 rounded-lg grow" />
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 rounded-md cursor-pointer text-white">
        Connet Wallet
      </div>
    </div>
  </div>
);

export default IndexPage;
