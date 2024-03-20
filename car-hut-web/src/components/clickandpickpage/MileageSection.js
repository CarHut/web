import '../../css/clickandpickpage/MileageSection.css';
import { useLocation, Link } from 'react-router-dom';
import React, { useState } from 'react';

function MileageSection() {
    var loc = useLocation();

    const [fromMileage, setFromMileage] = useState(); 
    const [toMileage, setToMileage] = useState();

    const handleFromMileageChange = (e) => {
        setFromMileage(e.target.value);
    };

    const handleToMileageChange = (e) => {
        setToMileage(e.target.value);
    };

    return (
        <div className='section-body-mileage-section'>
            <div className='section-header-mileage-section'>Pick mileage: {fromMileage}km - {toMileage}km </div>
            <div className="line-container"/>
            <div className='mileage-wrapper'>
                <div className="mileage-slider-container">
                    <label htmlFor="fromMileage">Mileage (from): {fromMileage}km</label>
                    <input
                        type="range"
                        id="fromMileage"
                        name="fromMileage"
                        min="0"
                        max="500000"
                        step="500"
                        value={fromMileage}
                        onChange={handleFromMileageChange}
                    />
                </div>
                <div className="mileage-slider-container">
                    <label htmlFor="toMileage">Mileage (To): {toMileage}km</label>
                    <input
                        type="range"
                        id="toMileage"
                        name="toMileage"
                        min="0"
                        max="500000"
                        step="500"
                        value={toMileage}
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
                        models: loc.state.pickedModels,
                    }}
                >
                    <button className="styled-button">Price</button>
                </Link>
                <Link
                    to={`/clickAndPickPage/registration`}
                    state={{
                        brands: loc.state.brands,
                        models: loc.state.pickedModels,
                        price: loc.state.price,
                        mileage: {
                            fromMileage: fromMileage, toMileage: toMileage
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