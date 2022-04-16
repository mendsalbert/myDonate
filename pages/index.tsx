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

      <div>
        <div className="bg-white rounded-2xl z-10 grid grid-cols-2 gap-10 p-16 ">
          <div className="border-2 border-[#008E89] rounded-2xl text-center flex flex-col items-center space-y-4  p-4  py-5">
            <img src="/images/children.svg" className="w-24" />
            <p className="text-3xl text-[#008E89] ">Children</p>
            <div className="rounded-full px-16 w-full text-white py-2 bg-[#008E89]">
              <p>Register</p>
            </div>
          </div>
          <div className="border-2 border-[#008E89] rounded-2xl text-center flex flex-col items-center space-y-4  p-4  py-5">
            <img src="/images/adult.svg" className="w-24" />
            <p className="text-3xl text-[#008E89] ">Adult</p>
            <div className="rounded-full px-16 w-full text-white py-2 bg-[#008E89]">
              <p>Register</p>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-700 text-xl">
          Already have an account ? Log In
        </p>
      </div>
    </div>
  </div>
  // </Layout>
);

export default IndexPage;
