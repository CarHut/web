import '../../css/userprofilepage/SavedCars.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import audiRS3Image from '../../images/searchlist/offers/audiRS3.jpg';
import APIMethods from '../../api/APIMethods';

function SavedCars() {
 
    const [cars, setCars] = useState([]);
    const [imagesForDisplayedCars, setImagesForDisplayedCars] = useState([]);

    const fetchSavedCarsByUserId = async () => {
        setCars(await APIMethods.getSavedCarsByUsername());
    }

    useEffect(() => {
        fetchSavedCarsByUserId();
    }, []);

    const removeCarFromWishList = async (id) => {
        const response = APIMethods.removeSavedCarByUsername(id);
        fetchSavedCarsByUserId();
    }

    useEffect(() => {
        fetchImagesForDisplayedCars();
    }, [cars]);

    const fetchImagesForDisplayedCars = async () => {
        const imageList = [];
        for (let i = 0; i < cars.length; i++) {
            const data = await APIMethods.getImages(cars[i].id);
            if (data !== null) {
                const url = `data:image/png;base64,${data[0]}`;
                imageList.push(url);
            } else {
                imageList.push("no-image-found");
            }
        }
        setImagesForDisplayedCars(imageList);
    } 

    const renderSavedCars = () => {
        const offerElements = [];

        for (let i = 0; i < cars.length; i++) {
            const car = cars[i];
            const imageSrc = imagesForDisplayedCars[i];
            
            offerElements.push(<div>
                <Link
                    to={'/carOffer'}
                    state={{
                        id: car.id
                    }}
                    style={{textDecoration: 'none'}}
                >
                    <div className='saved-car-offer-wrapper' key={i}>
                        <div className='saved-car-offer-left-wrapper'>
                            <div className='saved-car-offer-car-title'>{car.header}</div>
                            <div className='saved-car-stats-wrapper'>
                                <div className='saved-car-stats-column'>
                                    <div className='saved-car-stats-text'>{car.mileage}</div>
                                    <div className='saved-car-stats-text'>{car.registration}</div>
                                    <div className='saved-car-stats-text'>{car.enginePower}</div>
                                    <div className='saved-car-stats-text'>{car.fuel}</div>
                                </div>
                                <div className='saved-car-stats-column'>
                                    <div className='saved-car-stats-text'>{car.bodyType}</div>
                                    <div className='saved-car-stats-text'>{car.gearbox}</div>
                                    <div className='saved-car-stats-text'>{car.powertrain}</div>
                                    <div className='saved-car-stats-text'>{car.fuelConsumption}</div>  
                                </div>
        
                                <div className='saved-car-stats-column'>
                                    <div className='saved-car-stats-text'>Seller</div>
                                    <div className='line-container-seller'/>
                                    <div className='saved-car-stats-text'>{car.sellerName}</div>
                                    <div className='saved-car-stats-text'>{car.sellerAddress}</div>
                                </div>
                            </div>
                        </div>
                        <div className='saved-car-offer-right-wrapper'>
                            <img className='saved-car-img' src={imageSrc}/>
                            <div className='saved-car-stats-column-right-wrapper'>
                                <div className='saved-car-stats-price-text'>{car.price}</div>
                                <div className='saved-car-stats-price-rating-text'>Good price</div>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className='x-button' onClick={() => removeCarFromWishList(car.id)}>×</div>
                <div className='offers-line-separator'/>
            </div>);
        }

        return offerElements;
    }

    return (
        <div className='saved-cars-wrapper'>
            <div className='profile-content-header'>Saved cars</div>
            <div className='saved-cars-content-wrapper'>
            {renderSavedCars()}
            </div>
        </div>
    )

}

export default SavedCars;