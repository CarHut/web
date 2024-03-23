import '../../css/searchlist/Offers.css';
import audiRS3Image from '../../images/searchlist/offers/audiRS3.jpg';

function Offers() {

    const car = {
        title: "Audi RS3 Sportback 2,5 TFSI quattro 400k STR",
        mileage: "253 km",
        registration: "2021",
        enginePower: "294 kW",
        fuel: "Petrol",
        bodyType: "Hatchback",
        gearbox: "Automatic",
        powertrain: "4x4",
        fuelConsumption: "comb. 8,0l/100km",
        sellerName: "Autohaus Royal GmbH",
        sellerAddress: "DE-12103 Berlin, Händler",
        price: "84 843 €",
        imagePath: "C:\\Users\\Johny\\Desktop\\CarHut\\web\\car-hut-web\\src\\images\\searchlist\\offers\\audiRS3.jpg"
    };

    return (
        <div className='search-list-offers-wrapper'>
            <div className='offers'>
                <div className='offer-wrapper'>
                    <div className='offer-left-wrapper'>
                        <div className='offer-car-title'>{car.title}</div>
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
                <div className='offer-wrapper'>
                    <div className='offer-left-wrapper'>
                        <div className='offer-car-title'>{car.title}</div>
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
            </div>
        </div>
    );
}

export default Offers;