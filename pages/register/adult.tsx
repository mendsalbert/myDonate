import { CameraIcon } from "@heroicons/react/outline";
import React, { useState, useRef } from "react";

type Props = {};

const Adult = (props: Props) => {
  const fileRef = useRef() as any;
  const [file, setfile] = useState("") as any;
  const [firstname, setfirstname] = useState("Mends");
  const [username, setusername] = useState("mendsalbert");
  const [lastname, setlastname] = useState("Albert");
  const [gpsaddress, setgpsaddress] = useState("ba");
  const [contact, setcontact] = useState("0249107812");
  const [email, setemail] = useState("mendsalbert@gmail.com");
  const [ghanacard, setghanacard] = useState("GHA-XXXX");
  const [housenumber, sethousenumber] = useState("sp90");
  const [password, setpassword] = useState("1234567");
  const [confirmpassword, setconfirmpassword] = useState("1234567");

  const handleChange = (event) => {
    setfile({
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  const onSubmitHandler = () => {
    if (password !== confirmpassword) {
      alert("password do not match");
    }
    console.log(firstname);
    console.log(lastname);

    console.log(gpsaddress);
    console.log(housenumber);
    console.log(password);
    console.log(confirmpassword);
  };
  return (
    <div className="bg-[#008E89] w-full min-h-screen relative  font-Montserrat">
      <div className="absolute left-0 bottom-0 -z-5">
        <img src="/images/undraw_books_re_8gea.svg" className="w-96" />
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        <div>
          <img src="/images/ghlalogo.png" className="w-14 mt-5" />
        </div>
        <div className="text-center py-4">
          <p className="text-white text-lg md:text-3xl font-bold">
            Ghana Library Authority
          </p>
          <p className="text-white text-lg md:text-2xl">Lending Services</p>
        </div>
        <div className=" z-10 bg-white mx-2 md:mx-0 mb-10 rounded-2xl shadow-2xl p-6  overflow-hidden w-full md:w-8/12 ">
          <div className="w-full  ">
            <p className="font-bold text-gray-700 text-xl text-center pb-6 ">
              Children Registration Form
            </p>

            <div>
              <img src={file.file} className="w-36 mt-6" />

              <CameraIcon
                onClick={() => fileRef.current.click()}
                className="h-14 text-gray-700 cursor-pointer"
              />
              <div className="relative">
                <input
                  ref={fileRef}
                  type="file"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="opacity-0 z-50"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  User name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  name={username}
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                  type="text"
                  placeholder="janedoe"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  First Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  name={firstname}
                  onChange={(e) => {
                    setfirstname(e.target.value);
                  }}
                  type="text"
                  placeholder="Jane"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Last Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  name={lastname}
                  onChange={(e) => {
                    setlastname(e.target.value);
                  }}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-6/12 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Contact
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="0249107812"
                  name={contact}
                  onChange={(e) => {
                    setcontact(e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-6/12 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="example@gmial.com"
                  name={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-6/12 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  GPS Address
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="BA-60-55"
                  name={gpsaddress}
                  onChange={(e) => {
                    setgpsaddress(e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-6/12 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  House No
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="SP 98"
                  name={housenumber}
                  onChange={(e) => {
                    sethousenumber(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Ghana Card Number
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  placeholder="GHA-XXXX"
                  name={ghanacard}
                  onChange={(e) => {
                    setghanacard(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="password"
                  placeholder="******************"
                  name={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Confirm Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="password"
                  placeholder="******************"
                  name={confirmpassword}
                  onChange={(e) => {
                    setconfirmpassword(e.target.value);
                  }}
                />
              </div>
            </div>

            <button
              className="flex-shrink-0 bg-teal-500 w-full hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 mt-4 px-2 rounded"
              type="button"
              onClick={() => {
                onSubmitHandler();
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adult;
