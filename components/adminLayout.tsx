import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import {
  UserIcon,
  BookOpenIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
type Props = {
  children;
};

const Layout = (props: Props) => {
  const [users, setusers] = useState([]);
  const [books, setbooks] = useState([]);
  const [overduebooks, setoverduebooks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:1000/api/user/all-users`, {
        headers: {
          // "x-auth-token": token,
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((success) => {
        setusers(success.data);
      })
      .catch((e) => {
        console.log(e.response.data);
      });

    axios
      .get(`http://localhost:1000/api/book/all-books`, {
        headers: {
          // "x-auth-token": token,
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((success) => {
        setbooks(success.data);
      })
      .catch((e) => {
        console.log(e.response.data);
      });

    axios
      .get(`http://localhost:1000/api/book/all-books-overdue`, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((success) => {
        setoverduebooks(success.data);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  }, []);

  const tablesection = useRef(null);
  const scrollDown = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <div className="bg-white relative font-Montserrat ">
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

        <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-7 py-16">
          <Link href="/dashboard/admin" scroll={false}>
            <div
              onClick={() => scrollDown(tablesection)}
              className="
            
            bg-white cursor-pointer shadow-2xl flex flex-col items-center justify-center space-y-2 py-10"
            >
              <div className="bg-yellow-600 rounded-full p-3 ">
                <UserGroupIcon className="w-10 text-white" />
              </div>
              <p className="text-2xl">USERS</p>
              <p className=" text-2xl text-gray-600">
                {users.length} Users added
              </p>
            </div>
          </Link>
          <Link href="/dashboard/admin/books" scroll={false}>
            <div
              onClick={() => scrollDown(tablesection)}
              className="bg-white cursor-pointer shadow-2xl flex flex-col items-center justify-center space-y-2 py-10"
            >
              <div className="bg-green-600 rounded-full p-3 ">
                <BookOpenIcon className="w-10 text-white" />
              </div>
              <p className="text-2xl">BOOKS</p>
              <p className=" text-2xl text-gray-600">
                {books.length} Books added
              </p>
            </div>
          </Link>
          <Link href="/dashboard/admin/overdue" scroll={false}>
            <div
              onClick={() => scrollDown(tablesection)}
              className="bg-white cursor-pointer shadow-2xl flex flex-col items-center justify-center space-y-2 py-10"
            >
              <div className="bg-red-600 rounded-full p-3 ">
                <BookOpenIcon className="w-10 text-white" />
              </div>
              <p className="text-2xl">OVERDUE</p>
              <p className=" text-2xl text-gray-600">
                {overduebooks.length} Books overdue
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div ref={tablesection}>{props.children}</div>
    </div>
  );
};

export default Layout;
