import '../../css/searchlist/MainSection.css';
import ExtendedFilters from './ExtendedFilters';
import Offers from './Offers';
import UpperNav from './UpperNav';
import { useState } from 'react';

function MainSection() {
    const [offersPerPage, setOffersPerPage] = useState(10);


    return (
        <div className='section-body-search-list-main-section'>
            <div className='search-list-left-wrapper'>  
                <UpperNav offersPerPage={offersPerPage} setOffersPerPage={setOffersPerPage}/>
                <Offers offersPerPage={offersPerPage}/>
            </div>
            <div className='search-list-right-wrapper'>
                <ExtendedFilters/>
            </div>
        </div>
    );
}

export default MainSection;