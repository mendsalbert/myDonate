import React from "react";
import Link from "next/link";
import {
  UserIcon,
  BookOpenIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
type Props = {
  children;
};

const Layout = (props: Props) => {
  return (
    <div className="bg-white  font-Montserrat ">
      <div className="bg-[#008E89] px-10 md:px-36 ">
        <div className="flex flex-row justify-between py-5">
          <div className="flex flex-row justify-center items-center  space-x-2">
            <img src="/images/ghlalogo.png" className="w-10 " />
            <p className="text-white text-lg">GHLA</p>
          </div>
          <p className="bg-white text-center rounded-full text-lg py-1 px-5 text-[#008E89]">
            Log out
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-7 py-16">
          <Link href="/dashboard/admin">
            <div className="bg-white cursor-pointer shadow-2xl flex flex-col items-center justify-center space-y-2 py-10">
              <div className="bg-yellow-600 rounded-full p-3 ">
                <UserGroupIcon className="w-10 text-white" />
              </div>
              <p className="text-2xl">USERS</p>
              <p className=" text-2xl text-gray-600">5 Users added</p>
            </div>
          </Link>
          <Link href="/dashboard/admin/books">
            <div className="bg-white cursor-pointer shadow-2xl flex flex-col items-center justify-center space-y-2 py-10">
              <div className="bg-green-600 rounded-full p-3 ">
                <BookOpenIcon className="w-10 text-white" />
              </div>
              <p className="text-2xl">BOOKS</p>
              <p className=" text-2xl text-gray-600">10 Books added</p>
            </div>
          </Link>
          <Link href="/dashboard/admin/overdue">
            <div className="bg-white cursor-pointer shadow-2xl flex flex-col items-center justify-center space-y-2 py-10">
              <div className="bg-red-600 rounded-full p-3 ">
                <BookOpenIcon className="w-10 text-white" />
              </div>
              <p className="text-2xl">OVERDUE</p>
              <p className=" text-2xl text-gray-600">20 Books overdue</p>
            </div>
          </Link>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default Layout;
