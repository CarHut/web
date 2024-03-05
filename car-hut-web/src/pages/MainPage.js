import '../css/MainPage.css'
import '../components/Header.js'
import Header from '../components/Header.js';
import FilterSearch from '../components/mainpage/FilterSearch.js';

function MainPage() {
    return (
        <div className='body'>
            <Header/>
            <FilterSearch/>
        </div>
    );
}

export default MainPage;
