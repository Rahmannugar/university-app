import React, { useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const Login = ({
  email,
  password,
  setEmail,
  setPassword,
  isValid,
  setIsValid,
  message,
  setMessage,
}) => {
  const [visible, setVisible] = useState("true");
  const [hiddenPassword, setHiddenPassword] = useState("true");
  const [loginStyle, setLoginStyle] = useState("");
  const [loginResponse, setLoginResponse] = useState("");

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

  const changeVisibility = () => {
    setVisible(!visible);
    setHiddenPassword(!hiddenPassword);
  };
  const inputs = { email, password };
  const avatarStyle = { backgroundColor: "blue" };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:9090/login";
      await axios.post(url, inputs).then((data) => {
        //console.log(data.data.status);
        if (data.data.status == "Logged in successfully") {
          setLoginStyle("text-green-600 font-black italic mt-3");
          setLoginResponse("Login successful");
          window.localStorage.setItem("token", data.data.data);
          window.localStorage.setItem("logged-in", true);
          window.location.href = "/";
        } else {
          setLoginStyle("text-red-600 font-black italic mt-3");
          setLoginResponse("Wrong Password");
        }
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setLogin(error.response.data.message);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid>
          <div id="login-background"></div>
          <Grid align="center" className="grid-view">
            <div className="mt-10">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <br />
              <h1 className="font-black">Welcome back, Sign in.</h1>
            </div>
          </Grid>
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
          <div className="flex items-center justify-center pl-10 pr-5">
            <TextField
              label="Password"
              placeholder="Password"
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

          <div className="flex items-center justify-center">
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember me"
            />
          </div>

          <div className="mt-3 text-center">
            <Button type="submit" color="primary" variant="contained">
              Login
            </Button>
            <h1 className={loginStyle}>{loginResponse}</h1>
            <div className="mt-3 mb-3">
              <Typography>
                Forgot password?
                <a
                  href="/editpassword"
                  className="underline underline-offset-4
"
                >
                  Click here to change.
                </a>
              </Typography>
            </div>
            <div>
              <Typography>
                Aspiring student?
                <a
                  href="/signup"
                  className="underline underline-offset-4
"
                >
                  Enrol.
                </a>
              </Typography>
            </div>
          </div>
        </Grid>
      </form>
    </div>
  );
};

export default Login;
