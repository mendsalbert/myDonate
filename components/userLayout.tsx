import React, { useRef } from "react";
import {
  UserIcon,
  BookOpenIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

// const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
type Props = {
  children;
};

const UserLayout = (props: Props) => {
  const tablesection = useRef(null);
  const scrollDown = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <div className="bg-white  font-Montserrat ">
      <div className="bg-[#008E89] px-4 md:px-36 ">
        <div className="flex flex-row justify-between py-5">
          <div className="flex flex-row justify-center items-center  space-x-2">
            <img src="/images/ghlalogo.png" className="w-10 " />
            <p className="text-white text-lg">GHLA</p>
          </div>
          <p className="bg-white text-center rounded-full text-lg py-1 px-5 text-[#008E89]">
            Log out
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 text-center gap-7 py-16">
          <Link href="/dashboard/user/" scroll={false}>
            <div
              onClick={() => scrollDown(tablesection)}
              id="books"
              className="bg-white cursor-pointer shadow-2xl flex flex-col items-center justify-center space-y-2 py-10"
            >
              <div className="bg-green-600 rounded-full p-3 ">
                <BookOpenIcon className="w-10 text-white" />
              </div>
              <p className="text-2xl">BOOKS</p>
              <p className=" text-2xl text-gray-600">10 Books Lended</p>
            </div>
          </Link>
          <Link href="/dashboard/user/overdue" scroll={false}>
            <div
              onClick={() => scrollDown(tablesection)}
              id="overdue"
              className="bg-white cursor-pointer shadow-2xl flex flex-col items-center justify-center space-y-2 py-10"
            >
              <div className="bg-red-600 rounded-full p-3 ">
                <BookOpenIcon className="w-10 text-white" />
              </div>
              <p className="text-2xl">OVERDUE</p>
              <p className=" text-2xl text-gray-600">
                20 Books overdue(to be returned)
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div ref={tablesection}>{props.children}</div>
    </div>
  );
};

export default UserLayout;
