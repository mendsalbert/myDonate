import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => (
  // <Layout title="Home | Next.js + TypeScript Example">
  <div className="bg-[#008E89] w-full h-screen relative font-Montserrat">
    <div className="absolute left-0 bottom-0 -z-5">
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

      <div className="bg-white rounded-lg flex z-10 flex-row p-7">
        <div className="border-2 border-[#008E89] rounded-lg text-center p-4  py-5">
          <img src="/images/children.svg" className="w-24" />
          <p className="text-2xl text-[#008E89] ">Children</p>
          <div className="rounded-full px-16 w-full text-white py-2 bg-[#008E89]">
            <p>Register</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  // </Layout>
);

export default IndexPage;
