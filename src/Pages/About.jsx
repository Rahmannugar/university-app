import React from "react";
import Covid from "../Components/Covid";
import aboutImage from "../images/about-university-manitoba-bannatyne-campus-01b_0.jpg";

const About = () => {
  return (
    <div>
      <div>
        <img src={aboutImage} alt="about" />
        <h1 className="text-center font-black text-2xl py-5">
          About our university.
        </h1>
        <p className="italic px-5">
          The Republican university is a leading institution of higher
          education, dedicated to providing students with a well-rounded and
          dynamic educational experience. With a rich history dating back 30
          years, the university has a long-standing reputation for academic
          excellence and a commitment to preparing students for successful
          careers and fulfilling lives. The university offers a diverse range of
          undergraduate and graduate programs in a variety of disciplines.
          Students benefit from the university's innovative curriculum, hands-on
          learning opportunities, and world-class faculty, who are experts in
          their respective fields. In addition to academic pursuits, The
          Republican university provides a supportive and inclusive campus
          community, where students can build relationships, participate in
          extracurricular activities, and engage in cultural events. With
          state-of-the-art facilities, including elite tutors, the university is
          committed to fostering a dynamic and enriching student experience.
          Whether you're seeking a top-notch education, opportunities for
          personal and professional growth, or a vibrant and engaging campus
          community, The Republican university has something to offer. Come
          discover what sets us apart and join us on the path to success.
        </p>
      </div>
      <div className="mt-10 md:mt-20 md:flex px-10">
        <h1 className="font-black text-xl md:text-2xl md:px-10">1992</h1>
        <span className="italic">
          The Republican university was established.
        </span>
        <h1 className="font-black text-xl md:text-2xl md:px-10">20,000+</h1>
        <span className="italic">
          Undergraduate and graduate students 80,000+ alumni living in 139
          countries.
        </span>
      </div>

      {/* Mission and Vision */}
      <div>
        <div className="mt-10 md:mt-20">
          <h1 className="text-center font-black py-5 md:py-0 text-xl md:text-2xl">
            Mission:
          </h1>
          <p className="italic px-5">
            The Republican university is dedicated to providing students with a
            rigorous and transformative educational experience. We strive to
            prepare our students for meaningful careers, engaged citizenship,
            and purposeful lives by fostering critical thinking, creativity, and
            a commitment to lifelong learning.
          </p>
        </div>

        <div>
          <h1 className="text-center font-black py-5 md:py-0 text-xl md:text-2xl">
            Vision:
          </h1>
          <p className="italic px-5">
            Our vision is to be a leading institution of higher education,
            recognized for our innovative approach to teaching and learning, and
            for the impact of our research and scholarship. We aspire to be a
            diverse and inclusive community, where students from all backgrounds
            can thrive, and where the exchange of ideas and perspectives
            enriches the educational experience for all. At the Republican
            university, we will continue to push the boundaries of knowledge and
            to inspire future generations to make a positive impact on the
            world.
          </p>
        </div>
      </div>
      <Covid />
    </div>
  );
};

export default About;
