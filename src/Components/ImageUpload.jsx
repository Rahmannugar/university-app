import React, { useState } from "react";
import storage from "./firebaseStorage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import swal from "sweetalert";

const ImageUpload = ({ userImage, setUserImage, setImageUrl, userData }) => {
  const [percent, setPercent] = useState(0);

  const handleImage = (e) => {
    setUserImage(e.target.files[0]);
    const displayedImage = URL.createObjectURL(e.target.files[0]);
    setImageUrl(displayedImage);
  };
  const handleUpload = () => {
    if (!userImage) {
      alert("Please upload an image first!");
    }
    const storageRef = ref(storage, `/files/${userImage.name}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, userImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url

        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          uploadImage(url);
        });
      }
    );
  };

  const uploadImage = async (imageUrl) => {
    try {
      const email = userData.email;
      const inputs = { email, imageUrl };
      const postImageUrl = "https://university-backend.onrender.com/upload";
      setImageUrl(imageUrl);
      await axios.post(postImageUrl, inputs);
      swal({
        icon: "success",
        title: "Success",
        text: "Image uploaded successfully",
      });
      setTimeout(() => {
        window.location.href = "/";
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
    <div className="text-center">
      <form className="flex items-center justify-center px-20">
        <input type="file" accept="image/*" onChange={handleImage} />
      </form>
      <button
        className="mt-5 bg-black text-white px-3 py-1 rounded-sm"
        onClick={handleUpload}
      >
        Submit
      </button>
      {userImage ? <p>{percent}% done</p> : null}
    </div>
  );
};

export default ImageUpload;
