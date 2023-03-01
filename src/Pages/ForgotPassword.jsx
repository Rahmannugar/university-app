import { TextField } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

const ForgotPassword = ({
  password,
  setPassword,
  email,
  setEmail,
  setIsValid,
  message,
  setMessage,
}) => {
  const [visible, setVisible] = useState("true");
  const [hiddenPassword, setHiddenPassword] = useState("true");
  const [checkPassword, setCheckPassword] = useState("");
  const [equalPassword, setEqualPassword] = useState(true);
  const [loader, setLoader] = useState(false);
  const [showEmailMessage, setShowEmailMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updateOnce = [password, newPassword];

  const changeVisibility = () => {
    setVisible(!visible);
    setHiddenPassword(!hiddenPassword);
  };

  const emailRegex = /\S+@\S+\.\S+/;
  let messageColor;
  if (message == "Please enter a valid email!") {
    messageColor = "text-red-900";
  }
  if (message == "Valid email!") {
    messageColor = "text-blue-900";
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (emailRegex.test(email)) {
      setIsValid(true);
      setMessage("Valid email!");
    } else {
      setIsValid(false);
      setMessage("Please enter a valid email!");
    }
  };
  useEffect(() => {
    handleEqualpassword();
  }, updateOnce);

  const handleEqualpassword = (e) => {
    if (password == newPassword) {
      setCheckPassword(
        <>
          <h1 className="text-green-600 mt-3">Both password inputs match.</h1>
          <button
            className="mt-5 bg-black text-white py-2 px-3 rounded-sm hover:bg-gray-600"
            onClick={handleSubmitForm}
          >
            Change Password
          </button>
        </>
      );
    } else {
      setCheckPassword(
        <h1 className="text-red-600 mt-3">Passwords do not match.</h1>
      );
    }
  };

  const url = "http://localhost:9090/forgot-password";
  const postUrl = "http://localhost:9090/reset-password";
  const inputs = { email, password };

  const handleVerifyEmail = (e) => {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "Valid student") {
          Swal.fire({
            icon: "success",
            title: "Student email verification",
            text: "This email has been found in our records.",
          });
          setShowEmailMessage("");
          setLoader(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "Student email verification",
            text: "This email wasn't found in our records.",
          });
          setShowEmailMessage(
            <h1 className="text-center text-xl">No record found.</h1>
          );
        }
      });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post(postUrl, inputs);
      Swal.fire({
        icon: "success",
        title: "Password Change",
        text: "Password has been changed successfully",
      }).then(() => {
        window.location.href = "/login";
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text-center">
      <h1 className="font-black text-center text-xl py-3 uppercase">
        Change Your password.
      </h1>
      <form>
        <div className="flex items-center justify-center px-10">
          <TextField
            label="Email address"
            placeholder="Email address"
            required
            className="w-96"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className={messageColor}>{message}</div>
        <button
          onClick={handleVerifyEmail}
          className="mt-5 bg-indigo-900 text-white py-2 px-2 rounded-sm hover:bg-black"
        >
          Verify Email Address
        </button>
        {loader ? (
          <>
            <div className="flex items-center justify-center pl-10 pr-5 mt-3">
              <TextField
                label="New Password"
                placeholder="Enter new password"
                type={hiddenPassword ? "password" : "text"}
                className="w-96"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div onClick={changeVisibility} className="">
                {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </div>
            </div>

            <div className="flex items-center justify-center pl-10 pr-5 mt-3">
              <TextField
                label="Confirm new Password"
                placeholder="Confirm new password"
                type={hiddenPassword ? "password" : "text"}
                className="w-96"
                required
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <div onClick={changeVisibility} className="">
                {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </div>
            </div>
            {checkPassword}
          </>
        ) : (
          showEmailMessage
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
