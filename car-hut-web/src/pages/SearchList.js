import '../css/SearchList.css';
import Header from '../components/Header.js';
import MainSection from '../components/searchlist/MainSection.js';

function SearchList() {
    return (
        <div className="body">
            <Header/>
            <div className="current-route-text">Main page -> Search list</div>
            <div className="click-and-pick-page-header">Search list</div>
            <MainSection/>
        </div>
    );
}

export default SearchList;