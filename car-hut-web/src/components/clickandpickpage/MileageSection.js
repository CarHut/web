import '../../css/clickandpickpage/MileageSection.css';
import { useLocation, Link } from 'react-router-dom';
import React, { useState } from 'react';

function MileageSection() {
    var loc = useLocation();

    const [mileageFrom, setFromMileage] = useState(''); 
    const [mileageTo, setToMileage] = useState('');

    const handleFromMileageChange = (e) => {
        setFromMileage(e.target.value);
    };

    const handleToMileageChange = (e) => {
        setToMileage(e.target.value);
    };

    return (
        <div className='section-body-mileage-section'>
            <div className='section-header-mileage-section'>Pick mileage: {mileageFrom}km - {mileageTo}km </div>
            <div className="line-container"/>
            <div className='mileage-wrapper'>
                <div className="mileage-slider-container">
                    <label htmlFor="mileageFrom">Mileage (from): {mileageFrom}km</label>
                    <input
                        type="range"
                        id="mileageFrom"
                        name="mileageFrom"
                        min="0"
                        max="500000"
                        step="500"
                        value={mileageFrom}
                        onChange={handleFromMileageChange}
                    />
                </div>
                <div className="mileage-slider-container">
                    <label htmlFor="mileageTo">Mileage (To): {mileageTo}km</label>
                    <input
                        type="range"
                        id="mileageTo"
                        name="mileageTo"
                        min="0"
                        max="500000"
                        step="500"
                        value={mileageTo}
                        onChange={handleToMileageChange}
                    />
                </div>
            </div>
            <div className="click-and-pick-progress-bar">
                <div className="progress-bar-content">
                    <div className="progress-bar-sphere-traversed"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere-traversed"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere-traversed"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere-current"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                </div>
            </div>
            <div className='direction-buttons'>
                <Link
                    to={`/clickAndPickPage/price`}
                    state={{
                        brands: loc.state.brands,
                        models: loc.state.models,
                    }}
                >
                    <button className="styled-button">Price</button>
                </Link>
                <Link
                    to={`/clickAndPickPage/registration`}
                    state={{
                        brands: loc.state.brands,
                        models: loc.state.models,
                        price: loc.state.price,
                        mileage: {
                            mileageFrom: mileageFrom, mileageTo: mileageTo
                        } 
                    }}
                >
                    <button className="styled-button">Registration</button>
                </Link>
            </div>
        </div>
    );
}

export default MileageSection;