import React from "react";

const Courses = ({ setCourse }) => {
  const onChange = (e) => {
    const value = e.target.value;
    setCourse(value);
  };
  return (
    <div className="mt-3 px-10">
      <label htmlFor="Courses">Choose desired course of study:</label>

      <select
        defaultValue="Select course"
        className="border-gray-300 rounded-md border w-full py-4 mt-3 mb-3"
        onChange={onChange}
      >
        <option defaultValue="Select course" disabled>
          Select course
        </option>
        <option value="Mechanical engineering">Mechanical engineering</option>
        <option value="Medicine">Medicine</option>
        <option value="Computer science">Computer science</option>
        <option value="Law">Law</option>
        <option value="Theatre arts">Theatre arts</option>
        <option value="Pharmacy">Pharmacy</option>
        <option value="Anatomy">Anatomy</option>
        <option value="Biochemistry">Biochemistry</option>
        <option value="Microbiology">Microbiology</option>
        <option value="Chemical engineering">Chemical engineering</option>
        <option value="Computer engineering">Computer engineering</option>
        <option value="Literature">Literature</option>
        <option value="Mathematics">Mathematics</option>
        <option value="English Language">English Language</option>
        <option value="Physics">Physics</option>
        <option value="Metallurgical and material engineering">
          Metallurgical and material engineering
        </option>
        <option value="Chemistry">Chemistry</option>
        <option value="Statistics">Statistics</option>
        <option value="Music">Music</option>
        <option value="Biology">Biology</option>
        <option value="Architecture">Architecture</option>
        <option value="Banking and Finance">Banking and Finance</option>
        <option value="Agriculture">Agriculture</option>
        <option value="Nursing">Nursing</option>
        <option value="Vetinary medicine">Vetinary medicine</option>
        <option value="Education">Education</option>
        <option value="Mass communication">Mass communication</option>
        <option value="Telecommunication and information science">
          Telecommunication and information science
        </option>
        <option value="Religious studies">Religious studies</option>
        <option value="Geography">Geography</option>
      </select>
    </div>
  );
};

export default Courses;
