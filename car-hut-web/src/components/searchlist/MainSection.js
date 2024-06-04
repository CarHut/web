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
    const [loadingResultsListLength, setLoadingResultsListLength] = useState(true);

    const handleStateChange = (updatedState) => {
        setFetchedState(updatedState);
    }

    useEffect(() => {
        if (state.sortBy !== undefined && state.sortBy !== null && state.sortBy !== "" && state.sortBy !== " ") {
            setSortBy(state.sortBy);
        }

        if (state.offersPerPage !== undefined && state.offersPerPage !== null && state.offersPerPage !== "") {
            setOffersPerPage(state.offersPerPage);
        }

    }, [state])

    return (
        <div className='section-body-search-list-main-section'>
            <div className='search-list-left-wrapper'>  
                <UpperNav fetchedState={fetchedState} offersPerPage={offersPerPage} setOffersPerPage={setOffersPerPage} sortBy={sortBy} setSortBy={setSortBy}/>
                <div className='extended-filters-mobile-version'>
                    <ExtendedFilters fetchedState={fetchedState} resultsListLength={resultsListLength} loadingResultsListLength={loadingResultsListLength} 
                    setLoadingResultsListLength={setLoadingResultsListLength} handleStateChange={(e) => handleStateChange(e)}/>
                    <hr/>
                </div>
                <Offers offersPerPage={offersPerPage} sortBy={sortBy} fetchedState={fetchedState} setResultsListLength={setResultsListLength} setLoadingResultsListLength={setLoadingResultsListLength} loadingResultsListLength={loadingResultsListLength}/>
            </div>
            <div className='search-list-right-wrapper'>
                <div className='extended-filters-classic-version'>
                    <ExtendedFilters fetchedState={fetchedState} resultsListLength={resultsListLength} loadingResultsListLength={loadingResultsListLength} 
                    setLoadingResultsListLength={setLoadingResultsListLength} handleStateChange={(e) => handleStateChange(e)}/>
                </div>
            </div>
        </div>
    );
}

export default MainSection;