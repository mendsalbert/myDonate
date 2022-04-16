import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => (
  // <Layout title="Home | Next.js + TypeScript Example">
  <div className="bg-[#008E89] w-full h-screen relative">
    <div className="absolute left-0 bottom-0">
      <img src="/images/undraw_books_re_8gea.svg" />
    </div>
    <div className="flex flex-col justify-center items-center w-full">
      <div>
        <img src="/images/ghlalogo.png" className="w-14" />
      </div>
      <div className="text-center">
        <p>Ghana Library Authority</p>
        <p>Lending Services</p>
      </div>

      <div className="bg-white w-8/12 rounded-lg flex flex-row p-7">
        <div className="border-2 border-[#008E89] rounded-lg"></div>
      </div>
    </div>
  </div>
  // </Layout>
);

export default IndexPage;
