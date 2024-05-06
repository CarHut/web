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
    const [displayedCars, setDisplayedCars] = useState([]);
    const [imagesForDisplayedCars, setImagesForDisplayedCars] = useState([]);

    const fetchCars = async () => {
        const sortOrder = sortBy[sortBy.length - 1] == 'L' ? "ASC" : "DESC";

        const url = `http://localhost:8080/api/carhut/getCarsWithFilters?` +
            `&priceFrom=${fetchedState.price.priceFrom}&priceTo=${fetchedState.price.priceTo}&mileageFrom=${fetchedState.mileage.mileageFrom}` +
            `&mileageTo=${fetchedState.mileage.mileageTo}&fuelType=${fetchedState.fuelType}&gearbox=${fetchedState.gearbox}&powertrain=${fetchedState.powertrain}` +
            `&powerFrom=${fetchedState.power.powerFrom}&powerTo=${fetchedState.power.powerTo}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

        const result = await APIMethods.getCarsWithFilters(url, fetchedState.models);

        if (result !== null) {
            setCars(result);
            setTotalPages(Math.ceil(result.length / offersPerPage));
            setResultsListLength(result.length);    
            setLoadingResultsListLength(false);
        }
    }

    useEffect(() => {
        fetchCars();
        setTotalPages(Math.ceil(cars.length / offersPerPage)); 
    }, [offersPerPage]);

    useEffect(() => {
        fetchCars();
    }, [sortBy, fetchedState])

    useEffect(() => {
        fetchImagesForDisplayedCars();
    }, [displayedCars])

    useEffect(() => {
        const startIndex = (currentPage - 1) * parseInt(offersPerPage);
        const endIndex = currentPage * parseInt(offersPerPage);
        const disCars = cars.slice(startIndex, endIndex);
        setDisplayedCars(disCars);
    }, [cars]);

    const fetchImagesForDisplayedCars = async () => {
        const imageList = [];
        for (let i = 0; i < displayedCars.length; i++) {
            const data = await APIMethods.getImages(displayedCars[i].id);
            if (data !== null) {
                const url = `data:image/png;base64,${data[0]}`;
                imageList.push(url);
            } else {
                imageList.push("no-image-found");
            }
        }
        setImagesForDisplayedCars(imageList);
    } 

    const generateCarOffers = () => {
        const offerElements = [];
        for (let index = 0; index < displayedCars.length; index++) {
            const car = displayedCars[index];
            const imageSrc = imagesForDisplayedCars[index];

            offerElements.push(
                <Link
                    to={'/carOffer'}
                    state={{
                        id: car.id
                    }}
                    style={{ textDecoration: 'none' }}
                    key={index}
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
                                    <div className='line-container-seller' />
                                    <div className='car-stats-text'>{car.sellerName}</div>
                                    <div className='car-stats-text'>{car.sellerAddress}</div>
                                </div>
                            </div>
                        </div>
                        <div className='offer-right-wrapper'>
                            <img className='car-img' src={imageSrc}/>
                            <div className='car-stats-column-right-wrapper'>
                                <div className='car-stats-price-text'>{car.price}</div>
                                <div className='car-stats-price-rating-text'>Good price</div>
                            </div>
                        </div>
                    </div>
                    <div className='offers-line-separator' />
                </Link>
            );
        }
    
        return offerElements;
    }

    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
    };

    const renderPageButtons = () => {
        return (
            Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                <button className={startPage + i === currentPage ? 'page-button-current' : 'page-button'} key={startPage + i} onClick={() => goToPage(startPage + i)}>{startPage + i}</button>
            ))
        )
    }


    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    return (
        <div className='search-list-main-wrapper'>
            {!loadingResultsListLength ? (
                <>
                    <div className='page-buttons-wrapper' style={{ paddingTop: '2em' }}>
                        {renderPageButtons()}
                    </div>
                    <div className='search-list-offers-wrapper'>
                        <div className='offers'>
                            {generateCarOffers()}
                        </div>
                    </div>
                    <div className='page-buttons-wrapper'>
                        {renderPageButtons()}
                    </div>
                </>
            ) : (
                <LoadingCircle/>
            )}
        </div>
    );
}

export default Offers;