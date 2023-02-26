import React from "react";
import Covid from "../Components/Covid";
import academyImage from "../images/beautiful-american-african-student-feeling-excited-as-they-study-their-project_216356-426.jpg";

const Academics = () => {
  return (
    <div>
      <img src={academyImage} alt="academy" className="w-full" />
      <div className="mt-10 md:mt-20">
        <h1 className="font-black text-center text-2xl md:text-3xl uppercase pb-5">
          Our fields of study.
        </h1>

        <ul className="list-disc px-10">
          <li>Mechanical engineering</li>
          <li>Medicine</li>
          <li>Computer science</li>
          <li>Law</li>
          <li>Theatre arts</li>
          <li>Pharmacy</li>
          <li>Anatomy</li>
          <li>Biochemistry</li>
          <li>Microbiology</li>
          <li>Chemical engineering</li>
          <li>Computer engineering</li>
          <li>Literature</li>
          <li>Mathematics</li>
          <li>English Language</li>
          <li>Physics</li>
          <li>Metallurgical and material engineering</li>
          <li>Chemistry</li>
          <li>Statistics</li>
          <li>Music</li>
          <li>Chemistry</li>
          <li>Architecture</li>
          <li>Chemistry</li>
          <li>Agriculture</li>
          <li>Nursing</li>
          <li>Vetinary medicine</li>
          <li>Education</li>
          <li>Mass communication</li>
          <li>Telecommunication and information science</li>
          <li>Religious studies</li>
          <li>Geography...</li>
        </ul>
        <div className="flex items-center justify-center">
          <button className="hover:bg-blue-600 mt-10 text-white text-lg font-semibold sm:text-xl px-4 py-2 rounded-sm bg-black">
            Enrol now.
          </button>
        </div>
      </div>
      <Covid />
    </div>
  );
};

export default Academics;
