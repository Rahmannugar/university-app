import React, { useEffect, useState } from "react";
import "../payments.css";
import cardImage from "../images/card_img.png";
import masterCard from "../images/mastercard-3-svgrepo-com.svg";
import visa from "../images/visa-svgrepo-com.svg";
import app from "../Components/firebaseConfig";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import axios from "axios";
import swal from "sweetalert";


const auth = getAuth(app);
const Payments = ({
  phone,
  setPhone,
  verifyButton,
  verifyOTP,
  setVerifyButton,
  setVerifyOTP,
  otp,
  setOtp,
  paid,
  setPaid,
}) => {
  const [userData, setUserData] = useState([]);
  const [cardPhoto, setCardPhoto] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [expiryMonth, setExpiryMonth] = useState();
  const [expiryYear, setExpiryYear] = useState();
  const [ccv, setCcv] = useState();

  const url = "https://university-backend.onrender.com/user";
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

  const handlePhoneChange = (e) => {
    if (phone.length == 10) {
      setVerifyButton(true);
    } else {
      setVerifyButton(false);
    }
    const inputNumber = e.target.value;
    setPaid(true);
    if (inputNumber.length <= 11) {
      setPhone(inputNumber);
    }
  };

  //set card image
  const handleCardNumberChange = (e) => {
    const inputNumber = e.target.value;
    if (inputNumber.length <= 16) {
      setCardNumber(e.target.value);
    }
    if (cardNumber.startsWith(5)) {
      setCardPhoto(<img src={masterCard} alt="card" className="w-10 h-10" />);
    } else if (cardNumber.startsWith(4)) {
      setCardPhoto(<img src={visa} alt="card" className="w-10 h-10" />);
    } else {
      setCardPhoto("");
    }
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

  const onPaymentSubmit = async (e) => {
    e.preventDefault();
    const email = userData.email;
    const inputs = { email, paid };

    try {
      const url = "https://university-backend.onrender.com/payments";

      await axios.post(url, inputs);
      swal({
        icon: "success",
        title: "Success",
        text: "Payment successful",
      });
      setTimeout(() => {
        window.location.href = "/paywall";
      }, 2000);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={onPaymentSubmit}>
        <h1 className="font-black text-2xl text-center py-10">
          School Payment Gateway.
        </h1>
        <div className="row">
          <div className="col">
            <h1 className="title">Billing address.</h1>

            <div className="inputBox">
              <span>First Name :</span>
              <input type="text" value={userData.firstName} readOnly />
            </div>
            <div className="inputBox">
              <span>Last Name :</span>
              <input type="text" value={userData.lastName} readOnly />
            </div>
            <div className="inputBox">
              <span>Email Address:</span>
              <input type="email" value={userData.email} readOnly />
            </div>
            <div className="inputBox">
              <span>Home Address :</span>
              <input type="text" placeholder="Home address" required />
            </div>
            <div className="inputBox">
              <span>City :</span>
              <input type="text" placeholder="City" required />
            </div>

            <div className="flex">
              <div className="inputBox">
                <span>State :</span>
                <input type="text" placeholder="State" required />
              </div>
              <div className="inputBox">
                <span>Zip Code :</span>
                <input type="text" value={userData.zipCode} readOnly />
              </div>
            </div>
            <div className="inputBox">
              <span>Country :</span>
              <input type="text" value={userData.country} readOnly />
            </div>
          </div>

          <div className="col">
            <h1 className="title">Payment section.</h1>

            <div id="recaptcha-container"></div>
            <div className="inputBox">
              <span>Phone Number:</span>
              <input
                type="number"
                minLength={0}
                maxLength={10}
                placeholder="Phone No."
                value={phone}
                required
                onChange={handlePhoneChange}
              />
            </div>

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

            {verifyOTP ? (
              <div className="inputBox">
                <input
                  placeholder="Enter OTP"
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

            <div className="inputBox">
              <span>Cards Accepted :</span>
              <img src={cardImage} alt="card" className="card-img" />
            </div>
            <div className="inputBox">
              <span>Name On Card :</span>
              <input type="text" placeholder="Card Name" required />
            </div>
            <div className="inputBox">
              <span>Credit Card Number :</span>
              <div className="flex">
                {cardPhoto}
                <input
                  type="number"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  minLength={0}
                  maxLength={16}
                  required
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
              </div>
            </div>
            <div className="inputBox">
              <span>Expiry Month :</span>
              <input
                type="text"
                minLength={0}
                maxLength={2}
                placeholder="XX"
                required
                value={expiryMonth}
                onChange={(e) => {
                  setExpiryMonth(e.target.value);
                }}
              />
            </div>

            <div className="flex">
              <div className="inputBox">
                <span>Expiry Year :</span>
                <input
                  type="text"
                  minLength={0}
                  maxLength={4}
                  placeholder="XXXX"
                  required
                  value={expiryYear}
                  onChange={(e) => {
                    setExpiryYear(e.target.value);
                  }}
                />
              </div>
              <div className="inputBox">
                <span>CCV :</span>
                <input
                  type="text"
                  minLength={0}
                  maxLength={3}
                  placeholder="XXX"
                  required
                  value={ccv}
                  onChange={(e) => {
                    setCcv(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <h1 className="font-black uppercase text-xl text-center">
          Fees - #100,000.
        </h1>

        <button id="btn" className="text-white" type="submit">
          Make Payments
        </button>
      </form>
    </div>
  );
};

export default Payments;
