import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CalendarDate from "../Components/CalendarDate";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LaptopChromebook from "@material-ui/icons/LaptopChromebook";

const UserHome = () => {
  const [hasPaid, setHasPaid] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const date = new Date();

  const url = "http://localhost:9090/user";
  const paymentUrl = "http://localhost:9090/retrievepayments";

  const loadOnce = [isLoaded];

  useEffect(() => {
    fetch(url, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);
        setIsLoaded(true);
        if (data.data == "Token expired") {
          alert("Session expired, login again");
          window.localStorage.clear();
          window.location.href = "/login";
        }
      });
    if (isLoaded == true) {
      fetch(paymentUrl, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: userData.email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error == "User doesn't exist") {
            setHasPaid(false);
          } else {
            setHasPaid(data.data.paid);
          }
        });
    }
  }, loadOnce);
  //console.log(userData);
  return (
    <div>
      <div>
        <div className="w-full flex px-10 py-5 md:py-10">
          <input
            placeholder="Search"
            type="text"
            className="w-5/6 py-3 border border-black px-5"
          />
          <button className="text-white bg-black w-1/6">
            <SearchIcon />
          </button>
        </div>
        <h1 className="font-black text-4xl md:text-5xl px-10 pt-5 md:pt-5">
          Welcome {userData.firstName} {userData.lastName},
        </h1>
        <p className="font-bold text-xl px-10 py-3">
          Ready to excel in your academics today?
        </p>
      </div>

      <h1 className="font-black mt-10 text-center border-black border-b-2 text-2xl">
        Today's classes.
      </h1>
      <div className="px-10 pt-10">
        <div className="text-center bg-blue-200 py-10 rounded-lg">
          <h1>
            English lecture
            <LaptopChromebook />
          </h1>
          <h2>Topic: Tenses</h2>
          <AccessTimeIcon />
          <h2>
            Date: {date.getDate()}-{date.getMonth()}-{date.getFullYear()}
          </h2>
          <h2>Time: 8am.</h2>
        </div>
        <div className="text-center bg-red-200 py-10 mt-10 rounded-lg">
          <h1>
            Mathematics
            <LaptopChromebook />
          </h1>
          <h2>Topic: Partial fractions</h2>
          <AccessTimeIcon />
          <h2>
            Date: {date.getDate()}-{date.getMonth()}-{date.getFullYear()}
          </h2>
          <h2>Time: 12pm.</h2>
        </div>
        <div className="text-center bg-green-200 mt-10 py-10 rounded-lg">
          <h1>
            Computer literacy
            <LaptopChromebook />
          </h1>
          <h2>Topic: Introduction to computer education</h2>
          <AccessTimeIcon />
          <h2>
            Date: {date.getDate()}-{date.getMonth()}-{date.getFullYear()}
          </h2>
          <h2>Time: 3pm.</h2>
        </div>
      </div>

      <div className="pt-16">
        <h1 className="text-center text-2xl font-black pb-10 md:pb-16">
          Course Materials.
        </h1>

        <div className="sm:flex items-center justify-center sm:space-x-5 px-10">
          <h1 className="bg-black text-white py-3 px-5 text-2xl md:text-3xl mb-5 hover:bg-teal-700">
            GNS111
            <MenuBookIcon />
          </h1>
          <h1 className="bg-black text-white py-3 px-5 text-2xl md:text-3xl mb-5 hover:bg-teal-700">
            GSE101 <MenuBookIcon />
          </h1>
          <h1 className="bg-black text-white py-3 px-5 text-2xl md:text-3xl mb-5 hover:bg-teal-700">
            MAT113 <MenuBookIcon />
          </h1>
        </div>
        <h1 className="text-xl font-black px-5 text-center">
          Visit online library for more materials.
        </h1>
        <div className="flex items-center justify-center pb-10 pt-5 sm:pb-16">
          <button className="bg-blue-500 text-white px-3 py-3 rounded-sm hover:bg-orange-600 font-semibold">
            <a href="/library">More...</a>
          </button>
        </div>
      </div>

      <div className="px-10 pb-10">
        <div className="bg-emerald-300 px-10 py-10">
          <h1 className="text-center uppercase font-black text-xl md:text-2xl">
            School payments
          </h1>
          <ul className="list-disc font-black">
            <li>Tuition Fees - #30,000</li>
            <li>Hostel Accomodation - #35,000</li>
            <li>Library Fee - #5,000</li>
            <li>Health Insurance - #15,000</li>

            <li>Course Materials and Supplies - #15,000</li>
          </ul>
          <h1 className="font-black">Total - #100,000</h1>
          <p className="italic mt-5">
            Note: The fees listed above may vary depending on the university and
            program of study. It is important to consult the university's
            official website or speak to a financial aid representative to
            obtain an accurate and complete list of fees.
          </p>
          {!hasPaid ? (
            <div className="flex items-center justify-center mt-5">
              <button className="bg-blue-500 text-white uppercase py-3 px-3 hover:bg-orange-300 rounded-md">
                <a href="/payments">Make payments</a>
              </button>
            </div>
          ) : (
            <div className="text-center mt-5 font-black ">
              "Dear {userData.firstName} {userData.lastName}, you have completed
              the payment process, pls check your mail for transaction
              reference. We wish you the best in your studies this session." -
              University Management.
            </div>
          )}
        </div>
      </div>

      <div className="items-center flex justify-center">
        <CalendarDate />
      </div>

      <div className="mt-10">
        <h1 className="text-center font-black text-xl sm:text-2xl lg:text-3xl border-black border-b-2">
          Today's task.
        </h1>
        <ul className="list-disc px-10 py-5">
          <li className="py-2">Attend lectures.</li>
          <li className="py-2">Make new friends.</li>
          <li className="py-2">Upload assignments for submission.</li>
          <li className="py-2">Study.</li>
        </ul>
      </div>
    </div>
  );
};

export default UserHome;
