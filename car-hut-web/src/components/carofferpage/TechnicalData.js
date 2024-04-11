import '../../css/carofferpage/TechnicalData.css';

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
                        <div className='technical-data-content-text-value'>Hatchback</div>    
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
                        <div className='technical-data-content-text-value'>2 459 cm³</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Fuel</div>
                        <div className='technical-data-content-text-value'>{car.fuel}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Fuel Consumption</div>
                        <div className='technical-data-content-text-value'>comb. 8,9 l/100 km</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'></div>
                        <div className='technical-data-content-text-value'>city 8,9 l/100 km</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'></div>
                        <div className='technical-data-content-text-value'>high. 8,9 l/100 km</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Energy eff. class</div>
                        <div className='technical-data-content-text-value'>F</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Seats</div>
                        <div className='technical-data-content-text-value'>4</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Doors</div>
                        <div className='technical-data-content-text-value'>2/3</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Emission class</div>
                        <div className='technical-data-content-text-value'>Euro 6d</div>    
                    </div>
                </div>
                <div className='technical-data-line-container-vertical'/>
                <div className='technical-data-content-body-entity-wrapper'>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Exterior color</div>
                        <div className='technical-data-content-text-value'>Black</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Interior color</div>
                        <div className='technical-data-content-text-value'>Black</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Damage status</div>
                        <div className='technical-data-content-text-value'>New car</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Parking sensors</div>
                        <div className='technical-data-content-text-value'>Yes</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Parking cameras</div>
                        <div className='technical-data-content-text-value'>Yes</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Availability</div>
                        <div className='technical-data-content-text-value'>Immidiatelly</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Country of origin</div>
                        <div className='technical-data-content-text-value'>Germany</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>STK</div>
                        <div className='technical-data-content-text-value'>12.1.2025</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>EK</div>
                        <div className='technical-data-content-text-value'>15.2.2025</div>    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TechnicalData;