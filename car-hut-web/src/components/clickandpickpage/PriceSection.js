import '../../css/clickandpickpage/PriceSection.css'
import { useLocation, Link } from 'react-router-dom';
import React, { useState } from 'react';

function PriceSection() {
    var loc = useLocation();

    const [fromPrice, setFromPrice] = useState(); 
    const [toPrice, setToPrice] = useState();

    const handleFromPriceChange = (e) => {
        setFromPrice(e.target.value);
    };

    const handleToPriceChange = (e) => {
        setToPrice(e.target.value);
    };

    return (
        <div className='section-body-model-section'>
            <div className='section-header-model-section'>Pick a price: {fromPrice}€ - {toPrice}€ </div>
            <div className="line-container"/>
            <div className='price-wrapper'>
                <div className="price-slider-container">
                    <label htmlFor="priceFrom">Price (from): {fromPrice}€</label>
                    <input
                        type="range"
                        id="fromPrice"
                        name="fromPrice"
                        min="0"
                        max="500000"
                        step="500"
                        value={fromPrice}
                        onChange={handleFromPriceChange}
                    />
                </div>
                <div className="price-slider-container">
                    <label htmlFor="toPrice">Price (To): {toPrice}€</label>
                    <input
                        type="range"
                        id="toPrice"
                        name="toPrice"
                        min="0"
                        max="500000"
                        step="500"
                        value={toPrice}
                        onChange={handleToPriceChange}
                    />
                </div>
            </div>
            <div className="click-and-pick-progress-bar">
                <div className="progress-bar-content">
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
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                </div>
            </div>
            <div className="progress-bar-label">{"Model  <  Price  >  "}</div>
            <Link
                to={`/clickAndPickPage/mileage`}
                state={{
                    brands: loc.state.brands,
                    models: loc.state.pickedModels,
                    price: {
                        fromPrice: fromPrice, toPrice: toPrice
                    }
                }}
                className="next-button"
            >
                <button className="styled-button">Next</button>
            </Link>
        </div>
    );
}

export default PriceSection;