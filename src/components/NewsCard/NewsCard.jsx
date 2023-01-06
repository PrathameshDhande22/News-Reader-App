import { useState, useEffect, createRef } from "react";
const NewsCard = ({ newsArticles: { description, publishedAt, source, title, url, urlToImage }, index, ActiveArticles }) => {
  const [elRefs, setElRefs] = useState([]);
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

  useEffect(() => {
    window.scroll(0, 0);

    setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
  }, []);

  useEffect(() => {
    if (index === ActiveArticles && elRefs[ActiveArticles]) {
      scrollToRef(elRefs[ActiveArticles]);
    }
  }, [index, ActiveArticles, elRefs]);

  return (
    <a ref={elRefs[index]} href={url} className="card" style={{ borderBottom: index === ActiveArticles ? "5px solid royalblue" : "" }}>
      <img src={urlToImage || require("../../images/newsplaceholder.png")} alt="news" />

      <div className="text">
        <div className="top">
          <span className="dateNews">{new Date(publishedAt).toDateString()}</span>
          <span>{source.name}</span>
        </div>
        <h5 className="title">{title}</h5>
        <p>{description?.slice(0, 100)}</p>
        <div className="bottom">
          <h5>Learn More</h5>
          <h5>{index + 1}</h5>
        </div>
      </div>
    </a >
  )
}

export default NewsCard;