import React, { useEffect, useState } from "react";
import ImageUpload from "../Components/ImageUpload";

const Profile = () => {
  const [imageUrl, setImageUrl] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [userData, setUserData] = useState([]);
  const [userImage, setUserImage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedTwice, setIsLoadedTwice] = useState(false);
  const [hasPaid, setHasPaid] = useState([]);

  const url = "http://localhost:9090/user";
  const fetchedImageUrl = "http://localhost:9090/image";
  const paymentUrl = "http://localhost:9090/retrievepayments";

  const loadTwice = [isLoaded, isLoadedTwice];

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
      fetch(fetchedImageUrl, {
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
          setIsLoadedTwice(true);
          if (data.error == "User doesn't exist") {
            null;
          } else {
            setImageUrl(data.data.imageUrl);
          }
        });
    } else {
      null;
    }

    if (isLoadedTwice == true) {
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
  }, loadTwice);

  //console.log(userData);
  return (
    <div>
      <div className="py-5 sm:py-16">
        <h1 className="font-black py-5 text-center text-2xl sm:text-3xl">
          {userData.firstName} {userData.lastName} personal details.
        </h1>
        <div className="flex items-center justify-center py-10">
          <img src={imageUrl} alt="student" className="h-60 w-72" />
        </div>
        <ImageUpload
          userImage={userImage}
          setUserImage={setUserImage}
          setImageUrl={setImageUrl}
          userData={userData}
        />
      </div>
      <h1 className="text-center italic font-black text-3xl lg:text-4xl border-black border-b-2">
        Personal details.
      </h1>
      <div className="md:grid grid-cols-4 px-10 py-3">
        <h1 className="font-black uppercase text-blue-500">First Name</h1>
        <span className="italic font-extrabold">{userData.firstName}</span>
        <h1 className="mt-3 md:mt-0 md:pb-10 font-black uppercase text-blue-500">
          Last Name
        </h1>
        <span className="italic font-extrabold">{userData.lastName}</span>
        <h1 className="mt-3 md:mt-0 md:pb-10 font-black uppercase text-blue-500">
          Date of Birth
        </h1>
        <span className="italic font-extrabold">{userData.birthDate}</span>
        <h1 className="mt-3 md:mt-0 md:pb-10 font-black uppercase text-blue-500">
          Country
        </h1>
        <span className="italic font-extrabold">{userData.country}</span>
        <h1 className="mt-3 md:mt-0 md:pb-10 font-black uppercase text-blue-500">
          Zip Code
        </h1>
        <span className="italic font-extrabold">{userData.zipCode}</span>
        <h1 className="mt-3 md:mt-0 md:pb-10 font-black uppercase text-blue-500">
          Course
        </h1>
        <span className="italic font-extrabold">{userData.course}</span>
        <h1 className="mt-3 md:mt-0 md:pb-10 font-black uppercase text-blue-500">
          Email
        </h1>
        <span className="italic font-extrabold">{userData.email}</span>
        <h1 className="mt-3 md:mt-0 md:pb-10 font-black uppercase text-blue-500">
          Phone
        </h1>
        <span className="italic font-extrabold">{userData.phone}</span>
        <h1 className="mt-3 md:mt-0 md:pb-10 font-black uppercase text-blue-500">
          Payments
        </h1>
        {!hasPaid ? (
          <span className="italic font-extrabold">#100,000 to be paid.</span>
        ) : (
          <span className="font-extrabold italic">School fees paid.</span>
        )}
      </div>
    </div>
  );
};

export default Profile;
