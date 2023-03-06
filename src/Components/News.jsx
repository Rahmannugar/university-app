import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import NewsFile from "./NewsFile";

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const data = await axios.get(
        "https://university-backend.onrender.com/news"
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
