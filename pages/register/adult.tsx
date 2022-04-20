import { CameraIcon } from "@heroicons/react/outline";
import React, { useState, useRef } from "react";
import axios from "axios";
import Spinner from "../../components/spinner";

type Props = {};

const Adult = (props: Props) => {
  const fileRef = useRef() as any;
  const [spinner, setspinner] = useState(false);
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
  const [uImage, setUImage] = useState("");

  const [date, setdate] = useState(new Date()) as any;
  const [interest, setinterest] = useState("interest");
  const [gfullname, setgfullname] = useState("mends albert");
  const [gaddress, setgaddress] = useState("p.o box 12");
  const [gphone, setgphone] = useState("020 *******");
  const [gdate, setgdate] = useState(new Date()) as any;
  const [gofficeaddress, setgofficeaddress] = useState("office address");
  const [gsign, setgsign] = useState(true) as any;

  const handleChange = () => {
    console.log(gsign);
    setgsign(!gsign);
  };

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
    data.append("firstguardian", "");
    data.append("firstguardiancontact", "");
    data.append("secondguardian", "");
    data.append("secondguardiancontact", "");
    data.append("nameofschool", "");
    data.append("gpsaddress", gpsaddress);
    data.append("classname", "");
    data.append("housenumber", housenumber);
    data.append("contact", contact);
    data.append("email", email);
    data.append("ghanacard", ghanacard);
    data.append("password", password);
    data.append("usertype", "adult");

    data.append("date", date);
    data.append("interest", interest);
    data.append("gfullname", gfullname);
    data.append("gaddres", gaddress);
    data.append("gphone", gphone);
    data.append("gdate", gdate);
    data.append("gofficeaddress", gofficeaddress);
    data.append("gsign", gsign);

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
        //redirect to dashboard
        alert("Registration successfull");
        window.location.href = "/register/login";
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
              Adult Registration Form
            </p>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                <p className="block font-bold text-gray-700 text-md  mb-2">
                  I, the undersigned hereby apply for Tickets to enable me to
                  borrow books from the Lending Library in accordance with the
                  Rules and Regulations, by which I agree to be bound.
                </p>
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
                  Date
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  name={date}
                  onChange={(e) => {
                    setdate(e.target.value);
                  }}
                  type="date"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Interest
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  name={interest}
                  onChange={(e) => {
                    setinterest(e.target.value);
                  }}
                  placeholder="Your interest"
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
                <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  This side is for guarantor only
                </p>
              </div>
            </div>

            {/* ====== */}

            <div className="w-full md:w-full px-3 mb-6 md:mb-0">
              <p className="block  text-gray-700 text-md  mb-2">
                I, the undersigned declare that, I believe the applicant named
                on the reverse of this card to be a person to whom books may be
                safely entrusted, and I hereby undertake in default of the
                applicant, to replace or pay the value of any book belonging to
                the Board issued in the name of the applicant, which shall be
                damaged or not duly returned and pay such fined and costs as may
                be incurred under the Regulations
              </p>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Name in full
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  placeholder="yaw dabo"
                  name={gfullname}
                  onChange={(e) => {
                    setgfullname(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Home Address
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  name={gaddress}
                  onChange={(e) => {
                    setgaddress(e.target.value);
                  }}
                  placeholder="p.o box 41"
                  type="text"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Phone Number
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  name={gphone}
                  onChange={(e) => {
                    setgphone(e.target.value);
                  }}
                  placeholder="024*******"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Office Address
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  name={gofficeaddress}
                  onChange={(e) => {
                    setgofficeaddress(e.target.value);
                  }}
                  placeholder="p.o box 41"
                  type="text"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Date
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="date"
                  name={gdate}
                  onChange={(e) => {
                    setgdate(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex mb-3">
              <div className="space-x-2 form-check form-check-inline">
                <input
                  className=""
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="option1"
                  onChange={() => handleChange()}
                />
                <label className="  form-check-label inline-block text-gray-800">
                  Tick to sign
                </label>
              </div>
            </div>

            {/* ====== */}
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

export default Adult;
