import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import UserNavbar from "./Components/UserNavbar";
import About from "./Pages/About";
import Academics from "./Pages/Academics";
import ForgotPassword from "./Pages/ForgotPassword";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Payments from "./Pages/Payments";
import Paywall from "./Pages/Paywall";
import Profile from "./Pages/Profile";
import Result from "./Pages/Result";
import Signup from "./Pages/Signup";
import UserHome from "./Pages/UserHome";

const App = () => {
  const [nation, setNation] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("2000-05-24");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [course, setCourse] = useState("");
  const [verifyButton, setVerifyButton] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const isLoggedIn = window.localStorage.getItem("logged-in");
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("");
  const [paid, setPaid] = useState(false);

  return (
    <div>
      {isLoggedIn == "true" ? <UserNavbar /> : <Navbar />}
      <Routes>
        <Route
          exact
          path="*"
          element={isLoggedIn == "true" ? <UserHome /> : <Home />}
        />
        <Route
          exact
          path="/login"
          element={
            <Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              isValid={isValid}
              setIsValid={setIsValid}
              message={message}
              setMessage={setMessage}
            />
          }
        />
        <Route
          exact
          path="/signup"
          element={
            <Signup
              nation={nation}
              setNation={setNation}
              firstName={firstName}
              birthDate={birthDate}
              setBirthDate={setBirthDate}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              country={country}
              setCountry={setCountry}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              course={course}
              setCourse={setCourse}
              zipCode={zipCode}
              setZipCode={setZipCode}
              gender={gender}
              setGender={setGender}
              phone={phone}
              setPhone={setPhone}
              verifyButton={verifyButton}
              verifyOTP={verifyOTP}
              setVerifyButton={setVerifyButton}
              setVerifyOTP={setVerifyOTP}
              otp={otp}
              setOtp={setOtp}
              isValid={isValid}
              setIsValid={setIsValid}
              message={message}
              setMessage={setMessage}
            />
          }
        />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/academics" element={<Academics />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/result" element={<Result />} />
        <Route exact path="/paywall" element={<Paywall />} />
        <Route
          exact
          path="/payments"
          element={
            <Payments
              paid={paid}
              setPaid={setPaid}
              phone={phone}
              setPhone={setPhone}
              verifyButton={verifyButton}
              verifyOTP={verifyOTP}
              setVerifyButton={setVerifyButton}
              setVerifyOTP={setVerifyOTP}
              otp={otp}
              setOtp={setOtp}
            />
          }
        />
        <Route
          exact
          path="/editpassword"
          element={
            <ForgotPassword
              setPassword={setPassword}
              password={password}
              email={email}
              setEmail={setEmail}
              setIsValid={setIsValid}
              message={message}
              setMessage={setMessage}
            />
          }
        />
      </Routes>
      <Footer isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default App;
