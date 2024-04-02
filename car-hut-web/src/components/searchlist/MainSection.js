import '../../css/searchlist/MainSection.css';
import ExtendedFilters from './ExtendedFilters';
import Offers from './Offers';
import UpperNav from './UpperNav';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


function MainSection() {
    const [offersPerPage, setOffersPerPage] = useState(10);
    const [sortBy, setSortBy] = useState("");

    var loc = useLocation();

    return (
        <div className='section-body-search-list-main-section'>
            <div className='search-list-left-wrapper'>  
                <UpperNav offersPerPage={offersPerPage} setOffersPerPage={setOffersPerPage} sortBy={sortBy} setSortBy={setSortBy}/>
                <Offers offersPerPage={offersPerPage} sortBy={sortBy} results={loc.state.results}/>
            </div>
            <div className='search-list-right-wrapper'>
                <ExtendedFilters/>
            </div>
        </div>
    );
}

export default MainSection;