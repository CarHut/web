import '../css/pages/MainPage.css'
import Header from '../components/maincomponents/Header.js';
import FilterSearch from '../components/mainpage/FilterSearch.js';
import ClickAndPick from '../components/mainpage/ClickAndPick.js';
import CarNews from '../components/mainpage/CarNews.js';

function MainPage() {
    return (
        <div className='body'>
            <Header/>
            <FilterSearch/>
            <ClickAndPick/>
            <CarNews/>
        </div>
    );
}

export default MainPage;
