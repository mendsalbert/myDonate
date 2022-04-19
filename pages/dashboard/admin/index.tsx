import react, { useState, useEffect } from "react";
import Layout from "../../../components/adminLayout";
import Link from "next/link";
import axios from "axios";
import { BookOpenIcon } from "@heroicons/react/outline";
export default function Dashboard() {
  const [toggle, settoggle] = useState(false);

  let _users = [];
  useEffect(() => {
    _users = JSON.parse(localStorage.getItem("users") || "[]");
  }, []);
  const [users, setusers] = useState(_users);
  const [spinner, setspinner] = useState(false);
  const [renewdate, setrenewdate] = useState("");
  const [bookid, setbookid] = useState("");
  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = users.filter((user) => {
        return (
          user.firstname.toLowerCase().startsWith(keyword.toLowerCase()) ||
          user.lastname.toLowerCase().startsWith(keyword.toLowerCase()) ||
          user.username.toLowerCase().startsWith(keyword.toLowerCase())
        );
      });
      setusers(results);
    } else {
      setusers(JSON.parse(localStorage.getItem("users")));
    }
  };

  const renewHanlder = () => {
    console.log(bookid);
    setspinner(true);
    axios
      .post(
        `http://localhost:1000/api/book/renew-book/${bookid}`,
        { renewDate: renewdate },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((success) => {
        console.log(success.data);
        setspinner(false);
        settoggle(false);
        //redirect to dashboard
        alert("Book renewed  successfull");
        // console.log("project upload successfully");
      })
      .catch((e) => {
        setspinner(false);
        console.log(e.response.data);
        alert(e.response.data.msg);
      });
  };

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
        console.log(success.data);
        setusers(success.data);
        localStorage.setItem("users", JSON.stringify(success.data));
      })
      .catch((e) => {
        console.log(e.response.data);
      });

    axios
      .get(`http://localhost:1000/api/book/check-overdue`, {
        headers: {
          // "x-auth-token": token,
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((success) => {
        console.log(success.data);
        // setusers(success.data);
        // localStorage.setItem("users", JSON.stringify(success.data));
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  }, [spinner]);

  return (
    <>
      <Layout>
        {toggle ? (
          <div
            className="modal fade fixed  z-40 w-full px-4  md:px-0 md:w-4/12 grid place-items-center h-screen top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  outline-none overflow-x-hidden overflow-y-auto"
            id="exampleModalScrollable"
            aria-labelledby="exampleModalScrollableLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable relative w-auto pointer-events-none">
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                  <h5
                    className="text-xl font-medium leading-normal text-gray-800"
                    id="exampleModalScrollableLabel"
                  >
                    Renew Book
                  </h5>
                  <button
                    type="button"
                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body relative p-4">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Date to be returned
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name"
                        type="date"
                        placeholder="Doe"
                        value={renewdate}
                        onChange={(e) => {
                          setrenewdate(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                  <button
                    onClick={() => {
                      settoggle(!toggle);
                    }}
                    type="button"
                    className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      renewHanlder();
                    }}
                    type="button"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="w-full  bg-white px-4 md:px-36 ">
          <body className="antialiased font-sans ">
            <div className="container mx-auto  ">
              <div className="py-8">
                <div>
                  <h2 className="text-3xl text-gray-600  leading-tight">
                    Users
                  </h2>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between  md:items-center">
                  <div className="my-2 flex sm:flex-row flex-col">
                    <div className="flex flex-row mb-1 sm:mb-0"></div>
                    <div className="block relative">
                      <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 fill-current text-gray-500"
                        >
                          <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                        </svg>
                      </span>
                      <input
                        placeholder="Search"
                        onChange={(e) => {
                          filter(e);
                        }}
                        type="search"
                        className=" rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                      />
                    </div>
                  </div>
                  <Link href="/">
                    <div className="bg-blue-600 text-lg text-center px-6 py-1 rounded-md cursor-pointer text-white">
                      Add User
                    </div>
                  </Link>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            username
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            GPS-address
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Books owned
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 w-16 h-16">
                                  <img
                                    className="w-full h-full rounded-full"
                                    src={`data:image/png;base64,${user.image.toString(
                                      "base64"
                                    )}`}
                                    alt={user.username}
                                  />
                                </div>
                                <div className="ml-3">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {user.firstname + " " + user.lastname}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {user.username}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {user.usertype === "children"
                                  ? user.firstguardiancontact
                                  : user.contact}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {user.gpsaddress}
                              </p>
                              {/* <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                <span
                                  aria-hidden
                                  className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                ></span>
                                <span className="relative">Activo</span>
                              </span> */}
                            </td>
                            <td className="px-5 py-5 border-b space-y-2 border-gray-200 bg-white text-sm">
                              {user.books.map((book) => (
                                <div className="flex flex-row items-center  space-x-2">
                                  <p className="text-gray-600 text-md py-1">
                                    {book.title}
                                  </p>
                                  {book.renewed ? (
                                    <span className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-blue-900 leading-tight">
                                      <span
                                        aria-hidden
                                        className="absolute inset-0 bg-blue-200 opacity-50 rounded-lg"
                                      ></span>
                                      <span className="relative">Renewed</span>
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  {book.receive ? (
                                    <span className="relative inline-block cursor-pointer px-3 py-1 font-semibold text-green-900 leading-tight">
                                      <span
                                        aria-hidden
                                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                      ></span>
                                      <span className="relative">Returned</span>
                                    </span>
                                  ) : (
                                    <div className="flex flex-row items-center space-x-2">
                                      {book.renewed ? (
                                        " "
                                      ) : (
                                        <>
                                          <span className="relative inline-block cursor-pointer px-3 py-1 font-semibold text-red-900 leading-tight">
                                            <span
                                              aria-hidden
                                              className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                            ></span>
                                            <span className="relative">
                                              expired
                                            </span>
                                          </span>
                                          <span
                                            onClick={() => {
                                              // console.log(book._id);
                                              setbookid(book._id);
                                              settoggle(!toggle);
                                            }}
                                            className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-blue-900 leading-tight"
                                          >
                                            <span
                                              aria-hidden
                                              className="absolute inset-0 bg-blue-200 opacity-50 rounded-lg"
                                            ></span>
                                            <span className="relative">
                                              Renew
                                            </span>
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                      <span className="text-xs xs:text-sm text-gray-900">
                        Showing 1 to 4 of 50 Entries
                      </span>
                      <div className="inline-flex mt-2 xs:mt-0">
                        <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                          Prev
                        </button>
                        <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </div>
      </Layout>
    </>
  );
}
