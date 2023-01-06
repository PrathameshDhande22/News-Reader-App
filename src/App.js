import { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from "words-to-numbers"
import Newscards from './components/NewsCards/Newscards';
import "./styles.scss"

function App() {
    const [newsArticles, setnewsArticles] = useState([]);
    const [ActiveArticles, setActiveArticles] = useState(-1);
    const alanKey = 'a375ba1d8b472ed54bea7a9a5fe132bc2e956eca572e1d8b807a3e2338fdd0dc/stage'
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadlines') {
                    setnewsArticles(articles);
                    setActiveArticles(-1);
                } else if (command === 'highlight') {
                    setActiveArticles((prevActiveArticle) => prevActiveArticle + 1);
                } else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                    if (parsedNumber > articles.length) {
                        alanBtn().playText('Please try that again...');
                    } else if (article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...');
                    } else {
                        alanBtn().playText('Please try that again...');
                    }
                }
            }
        })
    }, [])

    return (
        <div>
            <img className='banner' src={require("./images/alan.jpg")} />
            <Newscards articles={newsArticles} ActiveArticles={ActiveArticles} />
        </div>
    )
}

export default App