import '../../css/carofferpage/ImportantData.css';
import { useState } from 'react';

function ImportantData({car}) {

    const [carModel, setCarModel] = useState(car);

    return (
        <div className='section-car-offer-important-data-body'>
            <div className='car-offer-important-data-entity-wrapper'>
                <img className='car-offer-important-data-img' src={require('../../images/caroffer/mileage.png')}/>
                <div className='car-offer-important-data-text-wrapper'>
                    <div className='car-offer-important-data-label'>Mileage</div>
                    <div className='car-offer-important-data-value'>{carModel.mileage}</div>
                </div>
            </div>
            <div className='car-offer-important-data-entity-wrapper'>
                <img className='car-offer-important-data-img' src={require('../../images/caroffer/power.png')}/>
                <div className='car-offer-important-data-text-wrapper'>
                    <div className='car-offer-important-data-label'>Power</div>
                    <div className='car-offer-important-data-value'>{carModel.enginePower}</div>
                </div>
            </div>
            <div className='car-offer-important-data-entity-wrapper'>
                <img className='car-offer-important-data-img' src={require('../../images/caroffer/fuel.png')}/>
                <div className='car-offer-important-data-text-wrapper'>
                    <div className='car-offer-important-data-label'>Fuel</div>
                    <div className='car-offer-important-data-value'>{carModel.fuel}</div>
                </div>
            </div>
            <div className='car-offer-important-data-entity-wrapper'>
                <img className='car-offer-important-data-img' src={require('../../images/caroffer/gearbox.png')}/>
                <div className='car-offer-important-data-text-wrapper'>
                    <div className='car-offer-important-data-label'>Gearbox</div>
                    <div className='car-offer-important-data-value'>{carModel.gearbox}</div>
                </div>
            </div>
            <div className='car-offer-important-data-entity-wrapper'>
                <img className='car-offer-important-data-img' src={require('../../images/caroffer/owner.png')}/>
                <div className='car-offer-important-data-text-wrapper'>
                    <div className='car-offer-important-data-label'>Previous owners</div>
                    <div className='car-offer-important-data-value'>{carModel.previousOwners}</div>
                </div>
            </div>
        </div>
    ); 
}

export default ImportantData;