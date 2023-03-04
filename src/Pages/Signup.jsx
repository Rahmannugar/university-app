import React, { useState } from "react";
import axios from "axios";
import app from "../Components/firebaseConfig";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import FileUploadPage from "../Components/FileUploadPage";
import Courses from "../Components/Courses";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { grey } from "@mui/material/colors";
import swal from "sweetalert";

const auth = getAuth(app);

const Signup = ({
  nation,
  setNation,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  zipCode,
  setZipCode,
  password,
  setPassword,
  country,
  setCountry,
  course,
  setCourse,
  birthDate,
  setBirthDate,
  gender,
  setGender,
  verifyButton,
  verifyOTP,
  setVerifyButton,
  setVerifyOTP,
  otp,
  setOtp,
  setIsValid,
  message,
  setMessage,
}) => {
  const [loginStyle, setLoginStyle] = useState("");
  const [loginResponse, setLoginResponse] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const color = grey[900];

  // const inputsPhp = {
  //   firstName,
  //   lastName,
  //   birthDate,
  //   gender,
  //   country,
  //   zipCode,
  //   course,
  //   email,
  //   phone,
  //   password,
  // };
  const inputs = {
    firstName,
    lastName,
    birthDate,
    gender,
    country,
    zipCode,
    course,
    email,
    phone,
    password,
  };
  const handlePhoneChange = (e) => {
    if (phone.length == 10) {
      setVerifyButton(true);
    } else {
      setVerifyButton(false);
    }
    const inputNumber = e.target.value;
    if (inputNumber.length <= 11) {
      setPhone(inputNumber);
    }
  };

  const avatarStyle = { backgroundColor: "black" };

  useEffect(() => {
    const getCountry = async () => {
      const data = await axios.get("https://restcountries.com/v3.1/all");
      setNation(
        <div className="mt-3 px-10">
          <select
            required
            name="country"
            id="country"
            defaultValue="country"
            className="border-gray-300 rounded-md border w-full py-4 mt-3 mb-3"
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          >
            {data.data.map((datum) => (
              <>
                <option value="country" hidden>
                  Choose Country
                </option>
                <option key={datum.id} value={datum.name.common}>
                  {datum.name.common}
                </option>
              </>
            ))}
          </select>
        </div>
      );
    };
    getCountry();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // await axios.post("http://localhost:7070/api/user/save", inputsPhp);
    try {
      const url = "https://university-backend.onrender.com/signup";
      await axios.post(url, inputs);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data.message);
      }
    }
    setLoginStyle("text-green-900 font-black italic mt-3");
    setLoginResponse("User created successfully");

    window.location.href = "/login";
  };

  const onCaptchaVerify = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
          onSignInSubmit();
        },
      },
      auth
    );
  };

  const onSignInSubmit = () => {
    onCaptchaVerify();
    const phoneNumber = "+234" + phone;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        swal({
          icon: "success",
          title: "Success",
          text: "OTP sent!",
        });
        setVerifyOTP(true);
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log(error);
        // ...
      });
  };

  const verifyCode = () => {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        swal({
          icon: "success",
          title: "Success",
          text: "Mobile verification done",
        });
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        swal({
          icon: "error",
          title: "Error",
          text: "Invalid OTP",
        });
        // ...
      });
  };

  const emailRegex = /\S+@\S+\.\S+/;
  let messageColor;
  if (message == "Please enter a valid email!") {
    messageColor = "text-red-900 text-center";
  }
  if (message == "Valid email!") {
    messageColor = "text-blue-900 text-center";
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

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <Grid>
          <div id="login-background"></div>
          <Grid align="center" className="grid-view">
            <div className="mt-10">
              <Avatar style={avatarStyle}></Avatar>
              <br />
              <h1 className="font-black pb-5">University registration form.</h1>
            </div>
          </Grid>

          <div className="sm:grid grid-cols-2">
            <div>
              <div className="px-10 py-3">
                <TextField
                  label="First name"
                  placeholder="First name"
                  fullWidth
                  required
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div className="px-10 py-3">
                <TextField
                  label="Last name"
                  placeholder="Last name"
                  fullWidth
                  required
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div className="py-3 px-10">
                <div>
                  <TextField
                    id="date"
                    label="Date of birth"
                    type="date"
                    value={birthDate}
                    onChange={(e) => {
                      setBirthDate(e.target.value);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </div>

              <div id="recaptcha-container"></div>
              <div className="px-10">
                <select
                  defaultValue="Select gender"
                  className="border-gray-300 rounded-md border w-full py-4 mt-3 mb-3"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option defaultValue="Select gender" disabled>
                    Select gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {nation}
              <div className="px-10 py-3">
                <TextField
                  label="ZIP code"
                  placeholder="ZIP code"
                  fullWidth
                  type="number"
                  required
                  value={zipCode}
                  onChange={(e) => {
                    setZipCode(e.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <div className="py-3 px-10">
                <label htmlFor="O'level result">Upload O'level results</label>
              </div>
              <FileUploadPage />
              <Courses setCourse={setCourse} />
              <div className="px-10 py-3">
                <TextField
                  label="Email address"
                  placeholder="Email address"
                  fullWidth
                  required
                  value={email}
                  onChange={handleEmail}
                />
              </div>
              <div className={messageColor}>{message}</div>
              <div className="px-10 py-3 ">
                <TextField
                  label="Phone"
                  placeholder="Phone"
                  minLength={0}
                  maxLength={10}
                  fullWidth
                  required
                  type="number"
                  value={phone}
                  onChange={handlePhoneChange}
                />
                {verifyButton ? (
                  <div className="flex justify-center items-center">
                    <input
                      type="button"
                      value="verify"
                      onClick={onSignInSubmit}
                      className="bg-black text-white rounded-sm px-3 py-2 mt-3 hover:bg-blue-500"
                    />
                  </div>
                ) : null}
              </div>
              {verifyOTP ? (
                <div className="px-10">
                  <TextField
                    label="OTP"
                    placeholder="Enter OTP"
                    fullWidth
                    required
                    type="number"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
                  />
                  <div className="flex justify-center items-center">
                    <input
                      type="button"
                      value="Verify OTP"
                      onClick={verifyCode}
                      className="bg-black text-white rounded-sm px-3 py-2 mt-3 hover:bg-blue-500"
                    />
                  </div>
                </div>
              ) : null}

              <div className="px-10 py-3">
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
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
            </div>
          </div>

          <div className="mt-7 text-center">
            <Button type="submit" color="primary" variant="contained">
              Sign up
            </Button>
            <h1 className={loginStyle}>{loginResponse}</h1>
            <div className="mt-7 mb-3">
              <Typography>
                Existing student?
                <a
                  href="/login"
                  className="underline underline-offset-4
"
                >
                  Login
                </a>
              </Typography>
            </div>
          </div>
        </Grid>
      </form>
    </div>
  );
};

export default Signup;
