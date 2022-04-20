import React, { useState } from "react";
import axios from "axios";
import Spinner from "../../components/spinner";

type Props = {};

const Login = (props: Props) => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [spinner, setspinner] = useState(false);
  const onSubmitHandler = () => {
    setspinner(true);
    axios
      .post(
        "http://localhost:1000/api/auth",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        setPassword("");
        setusername("");
        alert("successfully signed in");
        localStorage.setItem("user_token", result.data.token);
        setspinner(false);
        if (result.data.user.isAdmin) {
          window.location.href = "/dashboard/admin/";
        } else {
          window.location.href = "/dashboard/user/";
        }
      })
      .catch((e) => {
        console.log(e.response.data);
        setspinner(false);
        alert("incorrect password or email");
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
          <p className="text-white text-lg md:text-2xl font-bold">
            Ghana Library Authority
          </p>
          <p className="text-white text-lg md:text-2xl">Lending Services</p>
        </div>
        <div className=" z-10 bg-white mx-2 w-11/12 md:w-5/12 md:mx-0 rounded-2xl shadow-2xl p-6 ">
          <div className="w-full max-w-lg">
            <p className="text-gray-700 text-xl text-center pb-6 ">Log In</p>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  User name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                  placeholder="Jane"
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
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  placeholder="******************"
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
              {spinner ? <Spinner /> : "Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
