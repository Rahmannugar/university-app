import React from "react";
import image1 from "../images/admissions-undergraduate-studies-02.jpg";
import image2 from "../images/gradstudies-garywong-homepage.jpg";

const Study = () => {
  return (
    <div className="sm:flex">
      <div className="px-5 mb-5 md:mb-0 xl:px-36">
        <img
          src={image1}
          alt="
Undergraduate studies"
          className="mb-5 rounded-lg md:w-full"
        />
        <h1 className="font-black text-xl md:text-2xl">
          Undergraduate studies
        </h1>
        <p className="italic py-3 lg:text-xl">
          There are many program options available to you within our culturally
          rich and diverse community—whether you know the direction you want to
          go or are figuring out where your passion lies.
        </p>
        <button className="bg-black text-white py-2 px-4 rounded-sm transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
          <a href="/signup">Sign up.</a>
        </button>
      </div>

      <div className="px-5 mb-5 mt-5 md:mt-0 xl:px-36">
        <img
          src={image2}
          alt="
Undergraduate studies"
          className="mb-5 rounded-lg md:w-full"
        />
        <h1 className="font-black text-xl md:text-2xl">Graduate studies</h1>
        <p className="italic py-3  lg:text-xl">
          Graduate students are leading the way to discoveries that matter to
          the society. Challenge yourself, expand your horizons and continue
          your education in one of our many graduate programs.
        </p>
        <button className="bg-black text-white py-2 px-4 rounded-sm transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
          <a href="/signup">Sign up.</a>
        </button>
      </div>
    </div>
  );
};

export default Study;
