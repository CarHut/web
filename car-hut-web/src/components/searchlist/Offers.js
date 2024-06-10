import '../../css/searchlist/Offers.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import APIMethods from '../../api/APIMethods';
import LoadingCircle from '../maincomponents/LoadingCircle';

function Offers({offersPerPage, sortBy, fetchedState, setResultsListLength, setLoadingResultsListLength, loadingResultsListLength}) {

    const [cars, setCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [imagesForDisplayedCars, setImagesForDisplayedCars] = useState([]);
    const [sellerNames, setSellerNames] = useState([]);

    const fetchFirstNameAndSurname = async (userId) => {
        try {
            const username = await APIMethods.getFirstNameAndSurnameByUserId(userId);
            return username;
        } catch (error) {
            console.log(`[SearchList][Offers][fetchFirstNameAndSurname][ERROR] - Cannot fetch first name and surname for user id=${userId}. Stack trace message: ${error}`)
        }
    }

    const fetchSellerInfoOfLoadedCars = async () => {
        const sellersArray = [];

        for (let i = 0; i < cars.length; i++) {
            try {
                sellersArray.push(await fetchFirstNameAndSurname(cars[i].sellerId));
            } catch (error) {
                console.log(`[SearchList][Offers][fetchSellerInfoOfLoadedCars][ERROR] - Cannot fetch seller info for sellerId=${cars[i].sellerId}. Stack trace message: ${error}`);
            }
        }

        setSellerNames(sellersArray);
    }

    const fetchCars = async () => {
        
        const sortOrder = sortBy[sortBy.length - 1] == 'L' || sortBy[sortBy.length - 1] == 'O' ? "ASC" : "DESC";

        const carHutFilterObject = {
            brand: fetchedState.brand,
            model: fetchedState.model,
            carTypes: fetchedState.carTypes,
            priceFrom: fetchedState.price.priceFrom,
            priceTo: fetchedState.price.priceTo,
            mileageFrom: fetchedState.mileage.mileageFrom,
            mileageTo: fetchedState.mileage.mileageTo,
            registrationFrom: fetchedState.registrationFrom,
            registrationTo: fetchedState.registrationTo,
            seatingConfig: fetchedState.seatingConfig,
            doors: fetchedState.doors,
            location: fetchedState.location,
            postalCode: fetchedState.postalCode,
            fuelType: fetchedState.fuelType,
            powerFrom: fetchedState.power.powerFrom,
            powerTo: fetchedState.power.powerTo,
            displacementFrom: fetchedState.displacementFrom,
            displacementTo: fetchedState.displacementTo,
            gearbox: fetchedState.gearbox,
            models: fetchedState.models
        };

        let result = null;
        try {
            result = await APIMethods.getCarsWithFilters(carHutFilterObject, sortBy, sortOrder, offersPerPage, currentPage);
        } catch (error) {
            console.log(`[SearchList][Offers][fetchCars][ERROR] - Cannot fetch cars (aborting fetching cars and number of available cars). Stack trace message: ${error}`);
            return;
        }

        if (result !== null) {
            setCars(result);

            let length = 0;
            try {
                length = await APIMethods.getNumberOfFilteredCars(carHutFilterObject);
            } catch (error) {
                console.log(`[SearchList][Offers][fetchCars][ERROR] - Cannot fetch number of filtered cars. Stack trace message: ${error}`);
                return;
            }

            setTotalPages(Math.ceil(length / offersPerPage));
            setResultsListLength(length);    
            setLoadingResultsListLength(false);
        }
    }

    useEffect(() => {
        fetchCars();
        setTotalPages(Math.ceil(cars.length / offersPerPage)); 
    }, [offersPerPage]);

    useEffect(() => {
        fetchCars();
    }, [sortBy, fetchedState, currentPage])

    useEffect(() => {
        fetchImagesForDisplayedCars();
        fetchSellerInfoOfLoadedCars();
    }, [cars])

    const fetchImagesForDisplayedCars = async () => {
        const imageList = [];
        for (let i = 0; i < cars.length; i++) {
            try {
                const data = await APIMethods.getImages(cars[i].id);
                if (data !== null) {
                    const url = `data:image/png;base64,${data[0]}`;
                    imageList.push(url);
                } else {
                    imageList.push("no-image-found");
                }
            } catch (error) {
                console.log(`[SearchList][Offers][fetchImagesForDisplayedCars][ERROR] - Cannot fetch image for car id=${cars[i].id}. Stack trace message: ${error}`);
            }            
        }
        setImagesForDisplayedCars(imageList);
    } 

    const generateCarOffers = () => {
        const offerElements = [];
        for (let index = 0; index < cars.length; index++) {
            const car = cars[index];
            const imageSrc = imagesForDisplayedCars[index];

            offerElements.push(
                <Link
                    to={`/carOffer?carId=${car.id}`}
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
                                    <div className='car-stats-text'>{new Date(car.dateAdded).toDateString()}</div>
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
                                    <div className='car-stats-text'>{sellerNames[index]}</div>
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
        setLoadingResultsListLength(true);
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