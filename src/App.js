import { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";
import Newscards from "./components/NewsCards/Newscards";
import "./styles.scss";
import alanimg from "./images/alan.jpg";
import { Footer } from "./components/Footer";

function App() {
  const [newsArticles, setnewsArticles] = useState([]);
  const [ActiveArticles, setActiveArticles] = useState(-1);
  const alanKey =
    "e5ba70b1dfde056059f60dbe908551b72e956eca572e1d8b807a3e2338fdd0dc/stage";
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newsHeadlines") {
          console.log(articles);
          setnewsArticles(articles);
          setActiveArticles(-1);
        } else if (command === "highlight") {
          setActiveArticles((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText("Please try that again...");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening...");
          } else {
            alanBtn().playText("Please try that again...");
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <img className="banner" src={alanimg} alt="Alan" />
      <Newscards articles={newsArticles} ActiveArticles={ActiveArticles} />
      <Footer/>
    </div>
  );
}

export default App;
