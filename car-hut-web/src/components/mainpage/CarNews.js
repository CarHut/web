import '../../css/mainpage/CarNews.css';

function CarNews() {
    return (
        <div className='section-body-car-news'>
            <div className='section-header-text-car-news'>Car related news</div>
            <div className='news-main-wrapper'>
                <img className='img-car-news' src={require('../../images/mainpage/news1.png')}/>
                <div className='car-news-text-wrapper'>
                    <div className='news-type-text'>Article</div>
                    <div className='header-text-car-news'>Dodge Charger drops V8 for straight-six and electric power</div>
                    <div className='news-body-text'>All-new muscle car seats five, hits 60mph in 3.3sec and promises Hellcat levels of noise, even in EV...</div>
                    <div className='news-footer'>06.03.2024</div>
                    <div className='news-footer'>Jan Kapral</div>
                </div>
            </div>
            <div className='line-container'></div>
            <div className='line-container'></div>
            <div className='other-news-wrapper'>
                <img className='img-car-news' src={require('../../images/mainpage/news2.png')}/>
                <div className='other-news-text-wrapper'>
                    <div className='other-news-type-text'>Review</div>
                    <div className='other-header-text-car-news'>Volkswagen Passat - From £38,490</div>
                    <div className='other-news-body-text'>The Passat is larger, roomier, smoother-riding, more engaging to drive and more impressive inside ...</div>
                    <div className='other-news-footer'>06.03.2024</div>
                    <div className='other-news-footer'>Jan Kapral</div>
                </div>
            </div>
            <div className='more-news-text'>Find more</div>
        </div>
    );
}

export default CarNews;