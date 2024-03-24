import { keyboard } from '@testing-library/user-event/dist/keyboard';
import '../../css/searchlist/Offers.css';
import audiRS3Image from '../../images/searchlist/offers/audiRS3.jpg';
import { useEffect, useState } from 'react';


function Offers({offersPerPage}) {

    const [cars, setCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080/api/getAllTempCars')
            .then(response => response.json())
            .then(data => {
                setCars(data);
                setTotalPages(Math.ceil(data.length / offersPerPage));
            })
            .catch(error => console.error('Error fetching temp cars:', error)); 
             
    }, [offersPerPage]);

    const generateCarOffers = () => {
        const startIndex = (currentPage - 1) * parseInt(offersPerPage);
        const endIndex = currentPage * parseInt(offersPerPage);
        const displayedCars = cars.slice(startIndex, endIndex);

        return displayedCars.map((car, index) => { // Added 'index' parameter if you need it for unique keys
            return (
                <div>
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
                </div>
            );
        });
    }

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    return (
        <div className='search-list-main-wrapper'>
            <div className='search-list-offers-wrapper'>
                <div className='offers'>
                    {generateCarOffers()}
                </div>
            </div>
            <div className='page-buttons-wrapper'>
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                    <button className='page-button' key={startPage + i} onClick={() => goToPage(startPage + i)}>{startPage + i}</button>
                ))}
            </div>
        </div>
    );
}

export default Offers;