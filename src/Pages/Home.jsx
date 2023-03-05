import React from "react";
import thomas from "../images/image-thomas.jpg";
import emily from "../images/image-emily.jpg";
import jennie from "../images/image-jennie.jpg";
import Carousel from "../Components/Carousel";
import News from "../Components/News";
import Study from "../Components/Study";
import Covid from "../Components/Covid";

const Home = () => {
  return (
    <>
      <Carousel />

      <div className="px-10 py-10 md:text-2xl text-xl md:py-16">
        <p>
          "The Republican university outstanding learning environment nurtures a
          climate for you to succeed. Our world-class professors bring expertise
          and knowledge to the classroom, encouraging dynamic collaboration and
          inspiring academic excellence."
        </p>
      </div>

      <Study />

      {/* News section */}
      <h1 className="font-black text-2xl text-blue-500 italic px-10 md:text-3xl md:mt-20 mt-10">
        Stories around us.
      </h1>
      <News />
      <section
        id="testimonial"
        className="sm:mb-28 bg-orange-200 md:px-36 mx-5 sm:mx-10 shadow-xl rounded-lg"
      >
        <h1
          id="testimonial-h1"
          className="font-bold text-xl text-center pt-20 mt-14 mb-14 sm:mt-28 sm:mb-20"
        >
          TOP STUDENTS' TESTIMONIALS.
        </h1>
        <div id="testimonial-div">
          <div className="flex flex-col items-center justify-center mb-12 px-8 sm:px-0">
            <img src={emily} alt="Emily" className="rounded-sm  mb-7" />
            <p
              id="testimonial-p"
              className="font-medium text-center mb-5 sm:mb-16 italic"
            >
              I am grateful for the education and opportunities that I have
              received at this school. The professors, staff, and fellow
              students have challenged me to grow both academically and
              personally. The hands-on experiences and diverse curriculum
              provided me with a well-rounded understanding of my field and set
              me up for success in my future endeavors. I am proud to be a
              graduate of this esteemed institution and will forever cherish the
              memories and skills I have acquired during my time here.
            </p>
            <h2
              id="testimonial-name"
              className="font-semibold text-xl text-center mb-2 sm:mb-3"
            >
              Emily R.
            </h2>
            <h5
              id="testimonial-title"
              className="font-medium text-sm text-center"
            >
              Best graduating student 19/20.
            </h5>
          </div>

          <div className="flex flex-col items-center justify-center mb-12 px-8 sm:px-8">
            <img src={thomas} alt="Thomas" className="rounded-sm  mb-7" />
            <p
              id="testimonial-p"
              className="font-medium text-center mb-5 sm:mb-16 italic"
            >
              I am proud to be a graduate of this school and I want to take a
              moment to reflect on my journey. The past few years have been a
              challenging but rewarding experience, and I am grateful for the
              opportunities and support I received during my time here. The
              professors and staff have been exceptional in their teaching,
              guidance and encouragement, helping me to grow both personally and
              professionally. The diverse and inclusive community has provided
              me with a wealth of knowledge and life-long friendships. I am
              confident that I am leaving this institution as a well-rounded
              individual, ready to take on the world. Thank you The Republican
              University, for everything."
            </p>
            <h2
              id="testimonial-name"
              className="font-semibold text-xl text-center mb-2 sm:mb-3"
            >
              Thomas S.
            </h2>
            <h5
              id="testimonial-title"
              className="font-medium text-sm text-center"
            >
              President, student union 19/20.
            </h5>
          </div>

          <div className="flex flex-col items-center justify-center px-5 sm:px-">
            <img src={jennie} alt="Jennie" className="rounded-sm mb-7" />
            <p
              id="testimonial-p"
              className="font-medium text-center mb-5 sm:mb-16 italic"
            >
              As I am preparing to embark on the next chapter of my life, I
              would like to take a moment to reflect on the amazing journey I
              have had at the university. The knowledge, skills, and
              relationships I have gained over the past few years have been
              invaluable and I am incredibly grateful. The faculty, staff, and
              my peers have all played a significant role in shaping who I am
              today and I am proud to have been a part of such a supportive and
              encouraging community. I am confident that I am ready to take on
              the world and make a positive impact, all thanks to the
              opportunities and experiences I have had at the university. Thank
              you for everything
            </p>
            <h2
              id="testimonial-name"
              className="font-semibold text-xl text-center mb-2 sm:mb-3"
            >
              Jennie F.
            </h2>
            <h5
              id="testimonial-title"
              className="font-medium text-sm text-center pb-10"
            >
              Best graduating student 20/21.
            </h5>
          </div>
        </div>
      </section>
      <Covid />
    </>
  );
};

export default Home;
