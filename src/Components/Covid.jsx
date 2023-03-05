import React from "react";
import covid_image from "../images/Lovepik_com-450015073-red Coronavirus Vector.png";

const Covid = () => {
  return (
    <div className="md:flex px-10 mt-10 bg-blue-200 pt-10 pb-16 mx-5 sm:mx-10 shadow-xl rounded-lg">
      <div className="flex justify-center">
        <img
          src={covid_image}
          alt="Covid-19"
          className="md:w-screen md:h-60 md:mt-36"
        />
      </div>
      <div className="md:pl-32">
        <h1 className="text-center font-black uppercase text-xl">
          Covid-19 guidelines for students.
        </h1>
        <ul className="list-disc text-sm font-medium">
          <li className="py-1">
            Practice good hygiene: Wash your hands frequently with soap and
            water for at least 20 seconds. Use hand sanitizer when hand washing
            is not possible. Avoid touching your face, especially your mouth,
            nose, and eyes.
          </li>
          <li className="py-1">
            Wear a mask: Wear a face mask in public areas and when you are
            around others. Masks should cover your nose and mouth.
          </li>
          <li className="py-1">
            Social distancing: Keep at least 6 feet away from others in public
            areas. Avoid large gatherings and crowded spaces.
          </li>
          <li className="py-1">
            Stay home if you are sick: If you have symptoms of COVID-19, such as
            a fever, cough, or shortness of breath, stay home and contact your
            healthcare provider.
          </li>
          <li className="py-1">
            Get tested: If you have symptoms or have been in close contact with
            someone who has COVID-19, get tested as soon as possible.
          </li>
          <li className="py-1">
            Follow university policies: Follow any policies or guidelines set by
            your university regarding COVID-19, such as quarantine procedures or
            attending classes online.
          </li>
          <li className="py-1">
            Stay informed: Stay informed about the latest developments and
            guidelines related to COVID-19.
          </li>
          <li className="py-1">
            Mental and emotional health: Take care of your mental and emotional
            health during this challenging time. Seek support from family,
            friends, and mental health resources if needed.
          </li>
        </ul>
        <h3 className="font-semibold italic">
          By following these guidelines, you can help protect yourself and
          others from COVID-19.
        </h3>
      </div>
    </div>
  );
};

export default Covid;
