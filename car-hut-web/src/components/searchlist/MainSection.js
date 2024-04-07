import '../../css/searchlist/MainSection.css';
import ExtendedFilters from './ExtendedFilters';
import Offers from './Offers';
import UpperNav from './UpperNav';
import { useEffect, useState } from 'react';


function MainSection({state}) {
    const [offersPerPage, setOffersPerPage] = useState(10);
    const [sortBy, setSortBy] = useState("");
    const [resultsListLength, setResultsListLength] = useState(0);
    const [fetchedState, setFetchedState] = useState(state);

    const handleStateChange = (updatedState) => {
        setFetchedState(updatedState);
    }

    return (
        <div className='section-body-search-list-main-section'>
            <div className='search-list-left-wrapper'>  
                <UpperNav offersPerPage={offersPerPage} setOffersPerPage={setOffersPerPage} sortBy={sortBy} setSortBy={setSortBy}/>
                <Offers offersPerPage={offersPerPage} sortBy={sortBy} fetchedState={fetchedState} setResultsListLength={setResultsListLength}/>
            </div>
            <div className='search-list-right-wrapper'>
                <ExtendedFilters fetchedState={fetchedState} resultsListLength={resultsListLength} handleStateChange={(e) => handleStateChange(e)}/>
            </div>
        </div>
    );
}

export default MainSection;