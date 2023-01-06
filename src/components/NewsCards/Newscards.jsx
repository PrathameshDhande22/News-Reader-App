import NewsCard from "../NewsCard/NewsCard"

const Newscards = ({ articles, ActiveArticles }) => {
    const infoCards = [
        { color: '#00838f', title: 'Latest News', text: 'Give me the latest news' },
        { color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
        { color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
        { color: '#283593', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' },
    ];
    return (
        !articles.length ?
            <div className="searchTypes">
                {
                    infoCards.map((item, i) => (
                        <div key={i} className="item" style={{ background: item.color }}>
                            <h3>
                                {item.title}
                            </h3>
                            <div className="info">
                                <h4>
                                    {item.title.split(' ')[2]}
                                </h4>
                                {item.info}
                            </div>
                            <div className="saying">
                                <h4>
                                    Try saying
                                </h4>
                                {item.text}
                            </div>
                        </div>
                    ))
                }
            </div>
            :
            <div className="cards" >
                {
                    articles.map((article, i) => (
                        <NewsCard newsArticles={article} key={i} index={i} ActiveArticles={ActiveArticles} />
                    ))
                }
            </div >
    )
}

export default Newscards