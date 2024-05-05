import { keyboard } from '@testing-library/user-event/dist/keyboard';
import '../../css/searchlist/Offers.css';
import audiRS3Image from '../../images/searchlist/offers/audiRS3.jpg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import APIMethods from '../../api/APIMethods';
import LoadingCircle from '../maincomponents/LoadingCircle';

function Offers({offersPerPage, sortBy, fetchedState, setResultsListLength, setLoadingResultsListLength, loadingResultsListLength}) {

    const [cars, setCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchCars = async () => {
        const sortOrder = sortBy[sortBy.length - 1] == 'L' ? "ASC" : "DESC";

        const url = `http://localhost:8080/api/carhut/getCarsWithFilters?` +
            `&priceFrom=${fetchedState.price.priceFrom}&priceTo=${fetchedState.price.priceTo}&mileageFrom=${fetchedState.mileage.mileageFrom}` +
            `&mileageTo=${fetchedState.mileage.mileageTo}&fuelType=${fetchedState.fuelType}&gearbox=${fetchedState.gearbox}&powertrain=${fetchedState.powertrain}` +
            `&powerFrom=${fetchedState.power.powerFrom}&powerTo=${fetchedState.power.powerTo}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

        const result = await APIMethods.getCarsWithFilters(url, fetchedState.models);

        setCars(result);
        setTotalPages(Math.ceil(result.length / offersPerPage));
        setResultsListLength(result.length);    
        setLoadingResultsListLength(false);
    }

    useEffect(() => {
        fetchCars();
        setTotalPages(Math.ceil(cars.length / offersPerPage)); 
    }, [offersPerPage]);

    useEffect(() => {
        fetchCars();
    }, [sortBy]);

    useEffect(() => {
        fetchCars();
    }, [fetchedState]);

    const generateCarOffers = () => {
        const startIndex = (currentPage - 1) * parseInt(offersPerPage);
        const endIndex = currentPage * parseInt(offersPerPage);
        const displayedCars = cars.slice(startIndex, endIndex);

        return displayedCars.map((car, index) => { 
            return (
                <Link
                    to={'/carOffer'}
                    state={{
                        id: car.id
                    }}
                    style={{textDecoration: 'none'}}
                >
                    <div className='offer-wrapper' key={index}>
                        <div className='offer-left-wrapper'>
                            <div className='offer-car-title'>{car.header}</div>
                            <div className='car-stats-wrapper'>
                                <div className='car-stats-column'>
                                    <div className='car-stats-text'>{car.mileage}</div>
                                    <div className='car-stats-text'>{car.registration}</div>
                                    <div className='car-stats-text'>{car.enginePower}</div>
                                    <div className='car-stats-text'>{car.fuel}</div>
                                </div>
                                <div className='car-stats-column'>
                                    <div className='car-stats-text'>{car.bodyType}</div>
                                    <div className='car-stats-text'>{car.gearbox}</div>
                                    <div className='car-stats-text'>{car.powertrain}</div>
                                    <div className='car-stats-text'>{car.fuelConsumptionAvg}</div>  
                                </div>
        
                                <div className='car-stats-column'>
                                    <div className='car-stats-text'>Seller</div>
                                    <div className='line-container-seller'/>
                                    <div className='car-stats-text'>{car.sellerName}</div>
                                    <div className='car-stats-text'>{car.sellerAddress}</div>
                                </div>
                            </div>
                        </div>
                        <div className='offer-right-wrapper'>
                            <img className='car-img' src={audiRS3Image}/>
                            <div className='car-stats-column-right-wrapper'>
                                <div className='car-stats-price-text'>{car.price}</div>
                                <div className='car-stats-price-rating-text'>Good price</div>
                            </div>
                        </div>
                    </div>
                    <div className='offers-line-separator'/>
                </Link>
            );
        });
    }

    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
    };

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    return (
        <div className='search-list-main-wrapper'>
            {!loadingResultsListLength ? (
                <>
                    <div className='page-buttons-wrapper' style={{ paddingTop: '2em' }}>
                        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                            <button className={startPage + i === currentPage ? 'page-button-current' : 'page-button'} key={startPage + i} onClick={() => goToPage(startPage + i)}>{startPage + i}</button>
                        ))}
                    </div>
                    <div className='search-list-offers-wrapper'>
                        <div className='offers'>
                            {generateCarOffers()}
                        </div>
                    </div>
                    <div className='page-buttons-wrapper'>
                        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                            <button className={startPage + i === currentPage ? 'page-button-current' : 'page-button'} key={startPage + i} onClick={() => goToPage(startPage + i)}>{startPage + i}</button>
                        ))}
                    </div>
                </>
            ) : (
                <LoadingCircle />
            )}
        </div>
    );
}

export default Offers;