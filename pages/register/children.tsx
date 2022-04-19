import { CameraIcon } from "@heroicons/react/outline";
import React, { useState, useRef } from "react";
import axios from "axios";
import Spinner from "../../components/spinner";
type Props = {};

const Children = (props: Props) => {
  const fileRef = useRef() as any;
  const [spinner, setspinner] = useState(false);
  const [file, setfile] = useState("") as any;
  const [firstname, setfirstname] = useState("Mends");
  const [lastname, setlastname] = useState("Albert");
  const [firstguardian, setfirstguardian] = useState("martha");
  const [secondguardian, setsecondguardian] = useState("joseph");
  const [firstguardiancontact, setfirstguardiancontact] =
    useState("0249107812");
  const [secondguardiancontact, setsecondguardiancontact] =
    useState("0249107812");
  const [schoolname, setschoolname] = useState("divine");
  const [classname, setclassname] = useState("class 6");
  const [gpsaddress, setgpsaddress] = useState("ba");
  const [housenumber, sethousenumber] = useState("sp90");
  const [password, setpassword] = useState("1234567");
  const [confirmpassword, setconfirmpassword] = useState("1234567");
  const [username, setusername] = useState("mendsalbert");
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
  const onSubmitHandler = () => {
    console.log("submitting");
    if (password !== confirmpassword) {
      alert("password do not match");
    }
    setspinner(true);
    let data = new FormData();

    data.append("image", uImage);
    data.append("firstname", firstname);
    data.append("username", username);
    data.append("lastname", lastname);
    data.append("firstguardian", firstguardian);
    data.append("firstguardiancontact", firstguardiancontact);
    data.append("secondguardian", secondguardian);
    data.append("secondguardiancontact", secondguardiancontact);
    data.append("nameofschool", schoolname);
    data.append("gpsaddress", gpsaddress);
    data.append("classname", classname);
    data.append("housenumber", housenumber);
    data.append("contact", "");
    data.append("email", "");
    data.append("ghanacard", "");
    data.append("password", password);
    data.append("usertype", "children");

    axios
      .post("http://localhost:1000/api/user/", data, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((success) => {
        console.log(success.data);
        setspinner(false);
        localStorage.setItem("user_token", success.data.token);
        alert("Registration successfull");
        //redirect to dashboard
        // alert("project uploaded successfully");
        // console.log("project upload successfully");
      })
      .catch((e) => {
        setspinner(false);
        console.log(e.response.data);
        alert(e.response.data.msg);
      });
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
            <p className=" text-gray-700 text-2xl text-center pb-6 ">
              Children Registration Form
            </p>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                <p className="block font-bold text-gray-700 text-md  mb-2">
                  When I write my name on this form, I promise to obey the rules
                  of the Library
                </p>
                <ol className="ml-6 list-decimal">
                  <li>head</li>
                  <li>head</li>
                </ol>
              </div>
            </div>
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
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  1st guardian Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="Jane"
                  name={firstguardian}
                  onChange={(e) => {
                    setfirstguardian(e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  1st guardian Contact
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="020*******"
                  name={firstguardiancontact}
                  onChange={(e) => {
                    setfirstguardiancontact(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  2st guardian Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="Jane"
                  name={secondguardian}
                  onChange={(e) => {
                    setsecondguardian(e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  2st guardian Contact
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="020*******"
                  name={secondguardiancontact}
                  onChange={(e) => {
                    setsecondguardiancontact(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Name of school
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="Divine international school"
                  name={schoolname}
                  onChange={(e) => {
                    setschoolname(e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  class
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Class 6"
                  name={classname}
                  onChange={(e) => {
                    setclassname(e.target.value);
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
              className="flex-shrink-0 flex flex-col justify-center items-center bg-teal-500 w-full hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-lg border-4 text-white py-2 mt-4 px-2 rounded"
              type="button"
              onClick={() => {
                onSubmitHandler();
              }}
            >
              {spinner ? <Spinner /> : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Children;
