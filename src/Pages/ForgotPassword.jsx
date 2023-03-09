import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import swal from "sweetalert";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { grey } from "@mui/material/colors";

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
  const [loader, setLoader] = useState(false);
  const [showEmailMessage, setShowEmailMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updateOnce = [password, newPassword];

  const color = grey[900];

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

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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

  const url = "https://university-backend.onrender.com/forgot-password";
  const postUrl = "https://university-backend.onrender.com/reset-password";
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
          swal({
            icon: "success",
            title: "Student email verification",
            text: "This email has been found in our records.",
          });
          setShowEmailMessage("");
          setLoader(true);
        } else {
          swal({
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
      swal({
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
            variant="outlined"
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
            <div className="flex items-center justify-center px-10 py-3">
              <FormControl variant="outlined" className="w-96">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password *
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{
                          color: color,
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>

            <div className="flex items-center justify-center px-10 py-3">
              <FormControl variant="outlined" className="w-96">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password *
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  placeholder="Password"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{
                          color: color,
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
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
