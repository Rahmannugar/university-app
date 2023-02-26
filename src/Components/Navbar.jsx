import React, { useState } from "react";
import logo from "../images/University-logo.png";

const Navbar = () => {
  const peer = "peer-checked:translate-x-0";
  const [hidden, setHidden] = useState(
    `${peer} bg-white inset-0 w-[calc(100%-4.5rem)] translate-x-[-100%] shadow-xl transition duration-300 md:hidden`
  );
  const handleHidden = () => {
    console.log(!peer);
    setHidden(
      `${!peer} bg-white inset-0 w-[calc(100%-4.5rem)] translate-x-[-100%] shadow-xl transition duration-300 md:hidden`
    );
  };
  return (
    <header>
      <div className="border-b">
        <div className="px-6 md:px-12 lg:container lg:px-6 lg:py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="sm:flex">
              <img
                src={logo}
                alt="logo"
                className="w-28 md:w-44 lg:w-36"
                id="logo"
              />
              <h1 className="font-black text-sm sm:py-10 lg:py-14 mb-5">
                The Republican University.
              </h1>
            </a>
            {/* Web view */}
            <div className="hidden md:flex md:pl-32 lg:pl-36">
              <ul className="md:flex md:space-x-7 lg:space-x-16 xl:space-x-20 sm:font-black">
                <li>
                  <a
                    href="/login"
                    className="bg-blue-700 w-14 text-white px-10 py-5 rounded-md"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a href="/academics">Academics</a>
                </li>
                <li>
                  <a href="/#testimonial">Testimonials</a>
                </li>
                <li>
                  <a href="/#news">News</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
              </ul>
            </div>

            {/* Mobile view. */}
            <div className=" flex items-center justify-end">
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

              <div id="navbar" className={hidden}>
                <ul className=" pt-32 md:px-12 space-y-20 md:space-y-0 text-center">
                  <li>
                    <a href="/login">
                      <span className="relative font-black text-base md:text-2xl bg-blue-700 w-14 text-white px-10 py-5 rounded-md">
                        Login
                      </span>
                    </a>
                  </li>

                  <li>
                    <a href="/academics ">
                      <span className="relative font-black text-base md:text-2xl">
                        Academics
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/#testimonial">
                      <span
                        className="relative font-black text-base md:text-2xl"
                        onClick={handleHidden}
                      >
                        Testimonials
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/#news">
                      <span
                        className="relative font-black text-base md:text-2xl"
                        onClick={handleHidden}
                      >
                        News
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/about">
                      <span className="relative font-black text-base md:text-2xl">
                        About
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
  );
};

export default Navbar;
