import React from "react";

const NewsFile = ({ title, key, description, url, urlToImage }) => {
  return (
    <div className="md:mt-10 flex">
      <div key={key} className="px-5 py-5">
        <img
          id="news-image"
          src={urlToImage}
          alt={description}
          className="rounded-lg"
        />
        <h1 className="md:px-10 font-black text-xl md:text-2xl text-center py-3 text-blue-800 hover:text-stone-500">
          <a href={url}>{title}</a>
        </h1>
        <p className="">{description}</p>
      </div>
    </div>
  );
};

export default NewsFile;
