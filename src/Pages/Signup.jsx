import React, { useState } from "react";
import axios from "axios";
import app from "../Components/firebaseConfig";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { Avatar, Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import FileUploadPage from "../Components/FileUploadPage";
import Courses from "../Components/Courses";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const auth = getAuth(app);
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
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
  isValid,
  setIsValid,
  message,
  setMessage,
}) => {
  const [visible, setVisible] = useState("true");
  const [hiddenPassword, setHiddenPassword] = useState("true");
  const [loginStyle, setLoginStyle] = useState("");
  const [loginResponse, setLoginResponse] = useState("");

  const changeVisibility = () => {
    setVisible(!visible);
    setHiddenPassword(!hiddenPassword);
  };
  const inputsPhp = {
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
            className="border-black border-2 w-5/6"
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
    await axios.post("http://localhost:7070/api/user/save", inputsPhp);
    try {
      const url = "http://localhost:9090/signup";
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
        alert("otp sent");
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
        alert("Mobile verification done");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        alert("Invalid OTP");
        // ...
      });
  };
  const classes = useStyles();
  const avatarStyle = { backgroundColor: "black" };

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
    <div>
      <form onSubmit={handleSubmit}>
        <Grid>
          <div id="login-background"></div>
          <Grid align="center" className="grid-view">
            <div className="mt-10">
              <Avatar style={avatarStyle}></Avatar>
              <br />
              <h1 className="font-black">University registration form.</h1>
            </div>
          </Grid>
          <div>
            <div className="px-10">
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
            <div className="px-10">
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
            <div className="mt-3 px-10">
              <div className={classes.container}>
                <TextField
                  id="date"
                  label="Date of birth"
                  type="date"
                  value={birthDate}
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                  }}
                  className={classes.textField}
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
                className="border-black border-2 w-5/6 mt-5"
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
            <div className="px-10">
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
            <div className="mt-3 px-10">
              <label htmlFor="O'level result">Upload O'level results</label>
            </div>
            <FileUploadPage />

            <Courses setCourse={setCourse} />
            <div className="px-10">
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
            <div className="px-10">
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

            <div className="flex items-center justify-center pl-10 pr-5">
              <TextField
                label="Password"
                placeholder="Password"
                type={hiddenPassword ? "password" : "text"}
                className="w-screen"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <span onClick={changeVisibility}>
                {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </span>
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
          </div>
        </Grid>
      </form>
    </div>
  );
};

export default Signup;
