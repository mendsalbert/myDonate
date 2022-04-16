import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => (
  // <Layout title="Home | Next.js + TypeScript Example">
  <div className="bg-[#008E89] w-full min-h-screen relative  font-Montserrat">
    <div className="absolute left-0 bottom-0 -z-5">
      <img src="/images/undraw_books_re_8gea.svg" className="w-96" />
    </div>
    <div className="flex flex-col justify-center items-center w-full">
      <div>
        <img src="/images/ghlalogo.png" className="w-14 mt-5" />
      </div>
      <div className="text-center py-4">
        <p className="text-white text-lg md:text-2xl font-bold">
          Ghana Library Authority
        </p>
        <p className="text-white text-lg md:text-2xl">Lending Services</p>
      </div>
      <div className=" z-10 bg-white mx-6 md:mx-0 rounded-2xl shadow-2xl ">
        <div className="flex flex-col md:flex-row md:space-x-9 space-x-0 space-y-5 md:space-y-0  p-7 md:p-16 ">
          <div className="border-2 border-[#008E89] rounded-2xl text-center flex flex-col items-center space-y-4  p-4  py-5">
            <img src="/images/children.svg" className="w-24" />
            <p className="text-3xl text-[#008E89] ">Children</p>
            <Link href="/register/children">
              <div className=" cursor-pointer rounded-full px-16 w-full text-white py-2 bg-[#008E89]">
                <p>Register</p>
              </div>
            </Link>
          </div>
          <div className="border-2 border-[#008E89] rounded-2xl text-center flex flex-col items-center space-y-4  p-4  py-5">
            <img src="/images/adult.svg" className="w-24" />
            <p className="text-3xl text-[#008E89] ">Adult</p>
            <Link href="/register/adult">
              <div className=" cursor-pointer rounded-full  px-16 w-full text-white py-2 bg-[#008E89]">
                <p>Register</p>
              </div>
            </Link>
          </div>
        </div>
        <Link href="/register/login">
          <p className="text-center cursor-pointer text-gray-700 p-4 md:p-0 text-lg md:text-xl mb-10">
            Already have an account ? Log In
          </p>
        </Link>
      </div>
    </div>
  </div>
);

export default IndexPage;
