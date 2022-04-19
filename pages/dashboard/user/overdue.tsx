import react, { useState, useEffect } from "react";
import Layout from "../../../components/userLayout";
import Link from "next/link";
import axios from "axios";
import Spinner from "../../../components/spinner";
export default function Overdue() {
  const [toggle, settoggle] = useState(false);

  let _books = [];
  let token;
  useEffect(() => {
    _books = JSON.parse(localStorage.getItem("user_books") || "[]");
    token = localStorage.getItem("user_token");
  }, []);

  const [books, setbooks] = useState(_books);

  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = books.filter((book) => {
        return (
          book.title.toLowerCase().startsWith(keyword.toLowerCase()) ||
          book.author.toLowerCase().startsWith(keyword.toLowerCase())
        );
      });
      setbooks(results);
    } else {
      setbooks(JSON.parse(localStorage.getItem("user_books")));
    }
  };

  console.log(token);

  useEffect(() => {
    axios
      .get(`http://localhost:1000/api/user/all-overdue`, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      })
      .then((success) => {
        // console.log(success.data[0].books);
        let books = success.data[0].books.filter((book) => {
          return book.isOverdue === true;
        });
        console.log(books);
        setbooks(books);
        localStorage.setItem("user_books", JSON.stringify(books));
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  }, []);

  return (
    <>
      <Layout>
        <div className="w-full relative bg-white px-4 md:px-36 ">
          <body className="antialiased font-sans ">
            <div className="container mx-auto  ">
              <div className="py-8">
                <div>
                  <h2 className="text-3xl text-gray-600  leading-tight">
                    Overdue Books
                  </h2>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between  md:items-center">
                  <div className="my-2 flex sm:flex-row flex-col">
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
                        type="search"
                        onChange={(e) => {
                          filter(e);
                        }}
                        className=" rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Book
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Copy Number
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            author
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Assertion Number
                          </th>
                          {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            status
                          </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {books.map((book) => (
                          <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 w-14 h-14">
                                  <img
                                    // className="w-full h-full rounded-full"
                                    src={`data:image/png;base64,${book.image.toString(
                                      "base64"
                                    )}`}
                                    alt={book.title}
                                  />
                                </div>
                                <div className="ml-3">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {book.title}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {book.copynumber}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {book.author}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {book.assertion}
                              </p>
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
