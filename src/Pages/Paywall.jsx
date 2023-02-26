import React, { useEffect, useState } from "react";

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
          alert("Session expired, login again");
          window.localStorage.clear();
          window.location.href = "/login";
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
      <button id="btn">
        <a href="/">Your dashboard</a>
      </button>
    </div>
  );
};

export default Paywall;
