import React from "react";
import logo from "../images/University-logo.png";

const UserNavbar = () => {
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };
  return (
    <div>
      <header>
        <div className="border-b">
          <div className="px-6 md:px-1 lg:px-10">
            <div className="flex items-center justify-between">
              <a href="/" className="sm:flex">
                <img
                  src={logo}
                  alt="logo"
                  className="w-28 md:w-44 lg:w-48"
                  id="logo"
                />
                <h1 className="font-black text-sm sm:py-16 md:text-base">
                  The Republican University.
                </h1>
              </a>
              {/* Web view */}
              <div className="hidden md:flex ">
                <ul className="md:pl-20 lg:pl-28 md:flex md:space-x-10 xl:space-x-20 font-black">
                  <li
                    className="bg-red-700 text-white px-8 py-3 rounded-md"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                  <li className="py-3">
                    <a href="/">Home</a>
                  </li>
                  <li className="py-3">
                    <a href="/profile">Profile</a>
                  </li>
                  <li className="py-3">
                    <a href="/result">Results</a>
                  </li>
                </ul>
              </div>

              {/* Mobile view. */}
              <div className=" flex items-center justify-end z-50">
                <input
                  type="checkbox"
                  name="hamburger"
                  id="hamburger"
                  className="peer"
                  hidden
                />
                <label
                  htmlFor="hamburger"
                  className="peer-checked:hamburger block relative p-3 cursor-pointer md:hidden"
                >
                  <div
                    aria-hidden="true"
                    className="m-auto bg-black h-0.5 rounded transition duration-300"
                  ></div>
                  <div
                    aria-hidden="true"
                    className="m-auto bg-black mt-2 h-0.5 w-8 rounded transition duration-300"
                  ></div>
                </label>

                <div
                  id="navbar"
                  className="peer-checked:translate-x-0 bg-white inset-0 w-[calc(100%-4.5rem)] translate-x-[-100%] shadow-xl transition duration-300 md:hidden"
                >
                  <ul className=" pt-32 md:px-12 space-y-20 md:space-y-0 text-center absolute">
                    <li onClick={handleLogout}>
                      <span className="relative font-black text-base md:text-2xl bg-red-700 w-14 text-white px-10 py-5 rounded-md">
                        Logout
                      </span>
                    </li>
                    <li>
                      <a href="/">
                        <span className="relative font-black text-base md:text-2xl">
                          Home
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/profile">
                        <span className="relative font-black text-base md:text-2xl">
                          Profile
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/result">
                        <span className="relative font-black text-base md:text-2xl">
                          Results
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default UserNavbar;
