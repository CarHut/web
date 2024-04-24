import '../../css/carofferpage/TechnicalData.css';
import CarOfferPage from '../../pages/CarOfferPage';

function TechnicalData({car}) { 

    return (
        <div className='technical-data-body'>
            <div className='technical-data-headers-wrapper'>
                <div className='technical-data-header'>Technical data</div>
                <div className='technical-data-header'>Additional data</div>
            </div>
            <div className='technical-data-line-container'/>
            <div className='technical-data-content-body-wrapper'>
                <div className='technical-data-content-body-entity-wrapper'>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Car type</div>
                        <div className='technical-data-content-text-value'>{car.bodyType}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Mileage</div>
                        <div className='technical-data-content-text-value'>{car.mileage}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Power</div>
                        <div className='technical-data-content-text-value'>{car.enginePower}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Displacement</div>
                        <div className='technical-data-content-text-value'>{car.engineDisplacement}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Fuel</div>
                        <div className='technical-data-content-text-value'>{car.fuel}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Fuel Consumption</div>
                        <div className='technical-data-content-text-value'>comb. {car.fuelConsumptionAvg}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'></div>
                        <div className='technical-data-content-text-value'>city {car.fuelConsumptionCity}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'></div>
                        <div className='technical-data-content-text-value'>high. {car.fuelConsumptionHighway}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Energy eff. class</div>
                        <div className='technical-data-content-text-value'>{car.energyEffClass}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Seats</div>
                        <div className='technical-data-content-text-value'>{car.seats}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Doors</div>
                        <div className='technical-data-content-text-value'>{car.doors}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Emission class</div>
                        <div className='technical-data-content-text-value'>{car.emissionClass}</div>    
                    </div>
                </div>
                <div className='technical-data-line-container-vertical'/>
                <div className='technical-data-content-body-entity-wrapper'>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Exterior color</div>
                        <div className='technical-data-content-text-value'>{car.exteriorColorId}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Interior color</div>
                        <div className='technical-data-content-text-value'>{car.interiorColorId}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Damage status</div>
                        <div className='technical-data-content-text-value'>{car.damageStatus}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Parking sensors</div>
                        <div className='technical-data-content-text-value'>{car.parkingSensors}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Parking cameras</div>
                        <div className='technical-data-content-text-value'>{car.parkingCameras}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Availability</div>
                        <div className='technical-data-content-text-value'>Immidiatelly</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Country of origin</div>
                        <div className='technical-data-content-text-value'>{car.countryOfOrigin}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>STK</div>
                        <div className='technical-data-content-text-value'>{car.technicalInspectionDate}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>EK</div>
                        <div className='technical-data-content-text-value'>{car.emissionInspectionDate}</div>    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TechnicalData;