import '../css/pages/SearchList.css';
import Header from '../components/maincomponents/Header.js';
import MainSection from '../components/searchlist/MainSection.js';
import { useLocation } from 'react-router-dom';

function SearchList() {

    var loc = useLocation();

    return (
        <div className="body">
            <Header/>
            <div className="current-route-text">Main page -> Search list</div>
            <div className="click-and-pick-page-header">Search list</div>
            <MainSection state={loc.state}/>
        </div>
    );
}

export default SearchList;