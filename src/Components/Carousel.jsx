import React from "react";
import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
const Carousel = () => {
  const slides = [
    {
      url: "https://www.kindpng.com/picc/m/57-573808_students-png-transparent-png.png",
    },
    {
      url: "https://www.kindpng.com/picc/m/557-5577376_background-student-transparent-transparent-background-university-students-png.png",
    },
    {
      url: "https://www.kindpng.com/picc/m/117-1176647_graduate-student-png-graduate-students-png-transparent-png.png",
    },
    {
      url: "https://www.kindpng.com/picc/m/127-1271502_student-group-png-high-school-and-college-students.png",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(3);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  return (
    <div id="carousel" className="h-[600px] w-full pt-16">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-50% h-full rounded-2xl bg-center bg-cover duration-500"
      >
        <div className="grid py-72 px-5 text-center">
          <h1
            id="carousel-h1"
            className="py-2 rounded-lg text-xl sm:text-2xl lg:text-3xl text-center uppercase bg-black font-black text-white"
          >
            Reach your academic goals...
          </h1>
          <a href="/signup">
            <button className="hover:bg-black mt-3 text-white text-lg font-semibold sm:text-xl px-5 py-3 rounded-2xl  bg-blue-500">
              Enrol now.
            </button>
          </a>
        </div>
      </div>
      <div className="absolute top-[50%] md:top-[65%] translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-white text-black cursor-pointer">
        <BsChevronCompactLeft size={30} onClick={prevSlide} />
      </div>
      <div className="absolute top-[50%] md:top-[65%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-white text-black cursor-pointer">
        <BsChevronCompactRight size={30} onClick={nextSlide} />
      </div>
    </div>
  );
};

export default Carousel;
