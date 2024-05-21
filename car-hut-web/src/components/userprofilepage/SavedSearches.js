import '../../css/userprofilepage/SavedSearches.css';
import { useEffect, useState } from 'react';
import APIMethods from '../../api/APIMethods';
import { Link } from 'react-router-dom';

function SavedSearches() {

    const [savedSearches, setSavedSearches] = useState([]);

    const fetchSavedSearches = async () => {
        const response = await APIMethods.getSavedSearchesByUsername(localStorage.getItem('username'));
        setSavedSearches(response);
    }

    useEffect(() => {
        fetchSavedSearches();
    }, []);

    const transformBrandsAndModelsToString = (brandsAndModels) => {
        console.log(savedSearches[0].sortBy);
        const resultString = brandsAndModels.map((row) => `${row.brand} ${row.model}`).join(', ');
       
        return resultString.length > 22 ? resultString.substring(22) + "..." : resultString;
    }

    const renderSavedSearches = () => {
        return (
            <div className='saved-searches-content-wrapper'>
                {savedSearches.map((savedSearch) => {
                    return (
                        <>
                            <Link 
                                className='saved-search-entity'
                                to={"/searchList"}
                                style={{textDecoration: "none"}}
                                state={
                                    {
                                        sortBy: savedSearch.sortBy,
                                        offersPerPage: savedSearch.offersPerPage,
                                        price: {
                                            priceFrom: savedSearch.priceFrom,
                                            priceTo: savedSearch.priceTo
                                        },
                                        mileage: {
                                            mileageFrom: savedSearch.mileageFrom,
                                            mileageTo: savedSearch.mileageTo
                                        },
                                        power: {
                                            powerFrom: savedSearch.powerFrom,
                                            powerTo: savedSearch.powerTo
                                        },
                                        fuelType: savedSearch.fuelType,
                                        gearbox: savedSearch.gearboxType,
                                        powertrain: savedSearch.powertrainType,
                                        models: savedSearch.brandsAndModels
                                    }
                                }
                            >
                                <div className='saved-search-entity-column'>
                                    <div className='saved-search-entity-text-opacity'>Sort by</div>
                                    <div className='saved-search-entity-text-opacity'>Offers per page</div>
                                    <div className='saved-search-entity-text-opacity'>Price from</div>
                                    <div className='saved-search-entity-text-opacity'>Price to</div>
                                    <div className='saved-search-entity-text-opacity'>Mileage from</div>
                                    <div className='saved-search-entity-text-opacity'>Mileage to</div>
                                </div>
                                <div className='saved-search-entity-column'>
                                    <div className='saved-search-entity-text'>{savedSearch.sortBy === " " ? '-' : savedSearch.sortBy}</div>
                                    <div className='saved-search-entity-text'>{savedSearch.offersPerPage === "" ? '-' : savedSearch.offersPerPage}</div>
                                    <div className='saved-search-entity-text'>{savedSearch.priceFrom === "" ? '-' : savedSearch.priceFrom}</div>
                                    <div className='saved-search-entity-text'>{savedSearch.priceTo === "" ? '-' : savedSearch.priceTo}</div>
                                    <div className='saved-search-entity-text'>{savedSearch.mileageFrom === "" ? '-' : savedSearch.mileageFrom}</div>
                                    <div className='saved-search-entity-text'>{savedSearch.mileageTo === "" ? '-' : savedSearch.mileageTo}</div>
                                </div>
                                <div className='saved-search-entity-column'>
                                    <div className='saved-search-entity-text-opacity'>Fuel type</div>
                                    <div className='saved-search-entity-text-opacity'>Gearbox</div>
                                    <div className='saved-search-entity-text-opacity'>Powertrain</div>
                                    <div className='saved-search-entity-text-opacity'>Power from</div>
                                    <div className='saved-search-entity-text-opacity'>Power to</div>
                                    <div className='saved-search-entity-text-opacity'>Brands and models</div>
                                </div>
                                <div className='saved-search-entity-column'>
                                    <div className='saved-search-entity-text'>{savedSearch.fuelType === "" ? '-' : savedSearch.fuelType}</div>
                                    <div className='saved-search-entity-text'>{savedSearch.gearboxType === "" ? '-' : savedSearch.gearboxType}</div>
                                    <div className='saved-search-entity-text'>{savedSearch.powertrainType === "" ? '-' : savedSearch.powertrainType}</div>
                                    <div className='saved-search-entity-text'>{savedSearch.powerFrom === "" ? '-' : savedSearch.powerFrom}</div>
                                    <div className='saved-search-entity-text'>{savedSearch.powerTo === "" ? '-' : savedSearch.powerTo}</div>
                                    <div className='saved-search-entity-text'>{transformBrandsAndModelsToString(savedSearch.brandsAndModels)}</div>
                                </div>
                            </Link>
                            <div className='saved-searches-line-separator'/>
                        </>
                    );
                })}

            </div>
        );
    }

    return (
        <div className='saved-searches-wrapper'>
            <div className='profile-content-header'>Saved searches</div>
            {renderSavedSearches()}
        </div>
    );
}

export default SavedSearches;