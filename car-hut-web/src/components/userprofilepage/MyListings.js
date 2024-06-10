import '../../css/userprofilepage/MyListings.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import APIMethods from '../../api/APIMethods';
import LoadingCircle from '../maincomponents/LoadingCircle';


function MyListings() {

    const [cars, setCars] = useState([]);
    const [imagesForDisplayedCars, setImagesForDisplayedCars] = useState([]);

    const [loading, setLoading] = useState(false);

    const fetchMyListings = async () => {
        setLoading(true);
        try {
            const response = await APIMethods.getMyListings(); 
            setCars(response);
            setLoading(false);
        } catch (error) {
            console.log(`[UserProfilePage][MyListings][fetchMyListings][ERROR] - Cannot fetch listings from server. Stack trac message: ${error}`);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMyListings();
    }, []);

    const removeOffer = async (id) => {
        try {
            const response = await APIMethods.removeOffer(id);
            fetchMyListings();
        } catch (error) {
            console.log(`[UserProfilePage][MyListings][removeOffer][ERROR] - Cannot remove offer with id=${id}. Stack trace message: ${error}`);
        }
    }

    useEffect(() => {
        fetchImagesForDisplayedCars();
    }, [cars]);

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
                console.log(`[UserProfilePage][MyListings][fetchImagesForDisplayedCars][ERROR] - Cannot fetch images for displayed car with id=${cars[i].id}. Stack trace message: ${error}`);
            }
        }
        setImagesForDisplayedCars(imageList);
    } 

    const renderMyListings = () => {
        const offerElements = [];

        for (let i = 0; i < cars.length; i++) {
            const car = cars[i];
            const imageSrc = imagesForDisplayedCars[i];

            offerElements.push(<div>
                <Link
                    to={`/carOffer?${car.id}`}
                    style={{textDecoration: 'none'}}
                >
                    <div className='my-listing-offer-wrapper' key={i}>
                        <div className='my-listing-offer-left-wrapper'>
                            <div className='my-listing-offer-car-title'>{car.header}</div>
                            <div className='my-listing-stats-wrapper'>
                                <div className='my-listing-stats-column'>
                                    <div className='my-listing-stats-text'>{car.mileage}</div>
                                    <div className='my-listing-stats-text'>{car.registration}</div>
                                    <div className='my-listing-stats-text'>{car.enginePower}</div>
                                    <div className='my-listing-stats-text'>{car.fuel}</div>
                                </div>
                                <div className='my-listing-stats-column'>
                                    <div className='my-listing-stats-text'>{car.bodyType}</div>
                                    <div className='my-listing-stats-text'>{car.gearbox}</div>
                                    <div className='my-listing-stats-text'>{car.powertrain}</div>
                                    <div className='my-listing-stats-text'>{car.fuelConsumption}</div>  
                                </div>
        
                                <div className='my-listing-stats-column'>
                                    <div className='my-listing-stats-text'>Seller</div>
                                    <div className='line-container-seller'/>
                                    <div className='my-listing-stats-text'>{car.sellerName}</div>
                                    <div className='my-listing-stats-text'>{car.sellerAddress}</div>
                                </div>
                            </div>
                        </div>
                        <div className='my-listing-offer-right-wrapper'>
                            <img className='my-listing-img' src={imageSrc}/>
                            <div className='my-listing-stats-column-right-wrapper'>
                                <div className='my-listing-stats-price-text'>{car.price}</div>
                                <div className='my-listing-stats-price-rating-text'>Good price</div>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className='x-button' onClick={() => removeOffer(car.id)}>×</div>
                <div className='offers-line-separator'/>
            </div>);
        }

        return offerElements;
    }

    return (
        <div className='my-listings-wrapper'>
            <div className='profile-content-header'>My listings</div>
            <div className='my-listings-content-wrapper'>
                {loading ? <LoadingCircle/> : <div/>}
                {renderMyListings()}
            </div>
        </div>
    )

}

export default MyListings;