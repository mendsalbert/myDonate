import { CameraIcon } from "@heroicons/react/outline";
import React, { useState, useRef } from "react";
import axios from "axios";
import Layout from "../../../components/adminLayout";
import Spinner from "../../../components/spinner";
export default function AddBook() {
  const fileRef = useRef() as any;
  const [file, setfile] = useState("") as any;
  const [title, settitle] = useState("title");
  const [spinner, setspinner] = useState(false);
  const [number, setnumber] = useState("JFIC 428/FA");
  const [copynumber, setcopynumber] = useState("C.85");
  const [author, setauthor] = useState("Mends Albert");
  const [assertionnumber, setassertionnumber] = useState("656889");
  const [booktype, setbooktype] = useState("");
  const [uImage, setUImage] = useState("");

  const handleCapture = (e) => {
    setfile({
      file: URL.createObjectURL(e.target.files[0]),
    });
    const fileReader = new FileReader();
    //Displaying image in the UI if it is one
    if (e.target.files.length === 1) {
      setUImage(e.target.files[0]);
      fileReader.onload = (e) => {
        // setImage(e.target.result);
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };
  const onSubmitBookHandler = () => {
    console.log("submitting");

    setspinner(true);
    let data = new FormData();

    data.append("image", uImage);
    data.append("title", title);
    data.append("number", number);
    data.append("copynumber", copynumber);
    data.append("author", author);
    data.append("assertion", assertionnumber);
    data.append("type", booktype);

    axios
      .post("http://localhost:1000/api/book/add-book", data, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((success) => {
        console.log(success.data);
        setspinner(false);
        localStorage.setItem("user_token", success.data.token);
        //redirect to dashboard
        alert("Registration successfull");
        // console.log("project upload successfully");
      })
      .catch((e) => {
        setspinner(false);
        console.log(e.response.data);
        alert(e.response.data.msg);
      });
  };
  return (
    <>
      <Layout>
        <div className="flex my-10 flex-col justify-center items-center w-full">
          <div className=" z-10 bg-white mx-2 md:mx-0 mb-10 rounded-2xl shadow-2xl p-6  overflow-hidden w-full md:w-8/12 ">
            <div className="w-full  ">
              <p className="font-bold text-gray-700 text-xl py-10 text-center pb-6 ">
                Add Book
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
                      handleCapture(e);
                    }}
                    className="opacity-0 z-50"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Title
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    name={title}
                    onChange={(e) => {
                      settitle(e.target.value);
                    }}
                    type="text"
                    placeholder="Jane"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Number
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    name={number}
                    onChange={(e) => {
                      setnumber(e.target.value);
                    }}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-6/12 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Copy number
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-city"
                    type="text"
                    placeholder="0249107812"
                    name={copynumber}
                    onChange={(e) => {
                      setcopynumber(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full md:w-6/12 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Author
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-city"
                    type="text"
                    placeholder="example@gmial.com"
                    name={author}
                    onChange={(e) => {
                      setauthor(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-6/12 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Assertion Number
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-city"
                    type="text"
                    value={assertionnumber}
                    onChange={(e) => {
                      setassertionnumber(e.target.value);
                    }}
                    placeholder="Albuquerque"
                  />
                </div>
                <div className="w-full md:w-6/12 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Type
                  </label>
                  <div className="relative">
                    <select
                      onChange={(e) => {
                        setbooktype(e.target.value);
                      }}
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                    >
                      <option></option>
                      <option>Children</option>
                      <option>Adult</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="flex-shrink-0 flex flex-col justify-center items-center bg-teal-500 w-full hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-lg border-4 text-white py-2 mt-4 px-2 rounded"
                type="button"
                onClick={() => {
                  onSubmitBookHandler();
                }}
              >
                {spinner ? <Spinner /> : "Add Book"}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
