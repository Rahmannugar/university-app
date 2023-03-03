import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import NewsFile from "./NewsFile";

const News = () => {
  //const api_key = import.meta.env.VITE_API_KEY;
  const api_key = "9e5c40353e2f460d98859b44d27fba67";
  const [articles, setArticles] = useState([]);
  const newsData = ["education", "business", "university", "nigeria", "sports"];
  const news = Math.floor(Math.random() * newsData.length);

  useEffect(() => {
    const getArticles = async () => {
      const data = await axios.get(
        `https://newsapi.org/v2/everything?q=${newsData[news]}&apikey=${api_key}`
      );
      setArticles(data.data.articles);
    };
    getArticles();
  }, []);
  return (
    <div className="md:grid md:grid-cols-2 px-5" id="news">
      {articles.map(
        (article, index) =>
          index < 6 && (
            <NewsFile
              key={article.id}
              title={article.title}
              url={article.url}
              description={article.description}
              urlToImage={article.urlToImage}
            />
          )
      )}
    </div>
  );
};

export default News;
