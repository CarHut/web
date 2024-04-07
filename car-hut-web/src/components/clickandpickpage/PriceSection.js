import '../../css/clickandpickpage/PriceSection.css'
import { useLocation, Link } from 'react-router-dom';
import React, { useState } from 'react';

function PriceSection() {
    var loc = useLocation();

    const [priceFrom, setFromPrice] = useState(''); 
    const [priceTo, setToPrice] = useState('');

    const handleFromPriceChange = (e) => {
        setFromPrice(e.target.value);
    };

    const handleToPriceChange = (e) => {
        setToPrice(e.target.value);
    };

    return (
        <div className='section-body-model-section'>
            <div className='section-header-model-section'>Pick a price: {priceFrom}€ - {priceTo}€ </div>
            <div className="line-container"/>
            <div className='price-wrapper'>
                <div className="price-slider-container">
                    <label htmlFor="priceFrom">Price (from): {priceFrom}€</label>
                    <input
                        type="range"
                        id="priceFrom"
                        name="priceFrom"
                        min="0"
                        max="500000"
                        step="500"
                        value={priceFrom}
                        onChange={handleFromPriceChange}
                    />
                </div>
                <div className="price-slider-container">
                    <label htmlFor="priceTo">Price (To): {priceTo}€</label>
                    <input
                        type="range"
                        id="priceTo"
                        name="priceTo"
                        min="0"
                        max="500000"
                        step="500"
                        value={priceTo}
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
            <div className='direction-buttons'>
                <Link
                    to={`/clickAndPickPage/model`}
                    state={{
                        brands: loc.state.brands
                    }}
                >
                    <button className="styled-button">Model</button>
                </Link>
                <Link
                    to={`/clickAndPickPage/mileage`}
                    state={{
                        brands: loc.state.brands,
                        models: loc.state.models,
                        price: {
                            priceFrom: priceFrom, priceTo: priceTo
                        }
                    }}
                >
                    <button className="styled-button">Mileage</button>
                </Link>
            </div>
        </div>
    );
}

export default PriceSection;