import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo192.png";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase/config";
export const Navbar = () => {
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("isAuth")) || false
  );
  // const isAuth = false;
  const handleLogin = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log("result:", result);
      setIsAuth(true);
      localStorage.setItem("isAuth", true);
    });
  };
  const handleLogout = () => {
    signOut(auth);
    setIsAuth(false);
    localStorage.setItem("isAuth", false);
  };
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={"/"} className="flex items-center">
          <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            My Blog Note
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col md:p-2 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to={"/"}
                className="block  text-white rounded   md:text-blue-700 md:p-2 dark:text-white md:dark:text-blue-500 "
                end
              >
                Home
              </NavLink>
            </li>
            {isAuth ? (
              <>
                <NavLink
                  to={"/newPost"}
                  className="block  text-white  rounded  md:text-blue-700 md:p-2 dark:text-white md:dark:text-blue-500 "
                >
                  Create
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block  bg-blue-600  rounded text-white md:border-0 md:hover:text-blue-700 md:p-2 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  LogOut
                  <i className="bi bi-box-arrow-right ml-1 text-white "></i>
                </button>
              </>
            ) : (
              <li>
                <button
                  onClick={handleLogin}
                  className="auth block text-white bg-blue-800 rounded  md:border-0  md:p-2 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Login<i className="bi bi-google ml-1 text-white "></i>
                </button>
              </li>
            )}

            <li></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
