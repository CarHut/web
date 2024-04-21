import '../../css/userprofilepage/SavedCars.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import audiRS3Image from '../../images/searchlist/offers/audiRS3.jpg';

function SavedCars() {
 
    const [cars, setCars] = useState([]);

    const fetchSavedCarsByUserId = async () => {
        const requestOption = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: localStorage.getItem('username')
        };

        const response = await fetch('http://localhost:8080/api/carhut/savedCars/getSavedCarsByUsername', requestOption)
        const data = await response.json();
        setCars(data);
    }

    useEffect(() => {
        fetchSavedCarsByUserId();
    }, []);

    return (
        <div className='saved-cars-wrapper'>
            <div className='profile-content-header'>Saved cars</div>
            <div className='saved-cars-content-wrapper'>
            {cars.map((car, index) => (
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
                                    <div className='car-stats-text'>{car.fuelConsumption}</div>  
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
            ))}
            </div>
        </div>
    )

}

export default SavedCars;