import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => (
  <div className="mx-40 my-6">
    <div className="flex flex-row justify-between items-center">
      <img src="/images/logo.png" className="w-28 grow" />
      <input type="text" className="border-2 rounded-lg" />
      <div>Connet Wallet</div>
    </div>
  </div>
);

export default IndexPage;
