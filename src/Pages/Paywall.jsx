import React, { useEffect, useState } from "react";
import swal from "sweetalert";

const Paywall = () => {
  const [userData, setUserData] = useState([]);
  const url = "http://localhost:9090/user";
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
        if (data.data == "Token expired") {
          swal({
            icon: "warning",
            title: "Timeout",
            text: "Session expired, login again",
          });
          setTimeout(() => {
            window.location.href = "/login";
            window.localStorage.clear();
          }, 2000);
        }
      });
  }, []);
  return (
    <div className="mt-5 px-5">
      <h1 className="font-black text-xl sm:text-3xl">
        Dear {userData.firstName} {userData.lastName},
      </h1>
      <span className="font-semibold">
        your school fees payments was successful, pls refer to your mail or
        faculty officer for more instructions.
      </span>

      <a href="/">
        <button id="btn">Your dashboard</button>
      </a>
    </div>
  );
};

export default Paywall;
