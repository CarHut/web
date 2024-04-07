import { keyboard } from '@testing-library/user-event/dist/keyboard';
import '../../css/searchlist/ExtendedFilters.css';
import { useState, useEffect } from 'react';

function ExtendedFilters({ fetchedState, resultsListLength, handleStateChange }) {

    const [brandsAndModels, setBrandsAndModels] = useState([]);
    const [price, setPrice] = useState({ priceFrom: '', priceTo: '' });
    const [mileage, setMileage] = useState({ mileageFrom: '', mileageTo: ''});
    var brandsAndModelsFetchedTrigger = false;

    const handleRemovalOfABrandsAndModelEntity = (brand, model) => {
        setBrandsAndModels(brandsAndModels.filter((brandAndModel) => brandAndModel.brand !== brand || brandAndModel.model !== model));
        var updatedFetchedState = {...fetchedState};
        updatedFetchedState.models = updatedFetchedState.models.filter((brandAndModel) => brandAndModel.brand !== brand || brandAndModel.model != model);
        handleStateChange(updatedFetchedState);
    }

    useEffect(() => {
        if (fetchedState.models !== undefined && !brandsAndModelsFetchedTrigger) {
            setBrandsAndModels(fetchedState.models);
            setPrice(fetchedState.price);
            setMileage(fetchedState.mileage);
            brandsAndModelsFetchedTrigger = true;
        }
    }, []);
    
    const renderBrandsAndModelsEntities = () => {
        // Multiple brands and models choosed
        if (brandsAndModels.length > 0) {
            return (
                <div className='search-list-extended-filters-brandAndModel-section-content'>
                    {brandsAndModels.map((car, index) => {
                        return (
                            <div key={index} className='search-list-extended-filters-brandAndModel-entity'>{car.brand} {car.model} <div className='x' onClick={() => handleRemovalOfABrandsAndModelEntity(car.brand, car.model)}/></div>
                        )
                    })}
                </div>
            );
        } 
        // Only one brand was chosen or none
        else {
            if (fetchedState.brand !== null || fetchedState.brand !== undefined) {
                return (
                    <div className='search-list-extended-filters-brandAndModel-section-content'>
                        <div className='search-list-extended-filters-brandAndModel-entity'>{fetchedState.brand} {fetchedState.model}   x</div>
                    </div>
                )
            } else {
                return (
                    <div className='search-list-extended-filters-brandAndModel-section-content'></div>
                )
            }            
        }
    }

    // type -> 0 = priceFrom, 1 = priceTo
    const handlePriceChange = (value, type) => {
        switch (type) {
            case 0:
                setPrice({ priceFrom: value, priceTo: price.priceTo });
                break;
            case 1:
                setPrice({ priceFrom: price.priceFrom, priceTo: value });
                break;
        }

        var updatedState = {...fetchedState};
        updatedState.price = price;
        handleStateChange(updatedState);
    }

    // type -> 0 = mileageFrom, 1 = mileageTo
    const handleMileageChange = (value, type) => {
        switch (type) {
            case 0:
                setMileage({ mileageFrom: value, mileageTo: mileage.mileageTo });
                break;
            case 1:
                setMileage({ mileageFrom: mileage.mileageFrom, mileageTo: value });
                break;
        }

        var updatedState = {...fetchedState};
        updatedState.mileage = mileage;
        handleStateChange(updatedState);
    }

    return (
        <div className='search-list-extended-filters-wrapper'>
            <div className='search-list-extended-filters-padding-wrapper'>
                <div className='search-list-extended-filters-num-of-searches'>{resultsListLength} cars</div>
                <div className='search-list-extended-filters-header'>Filters</div>
                <div className='search-list-extended-filters-section'>
                    <div className='search-list-extended-filters-section-label'>Brands & models</div>
                    {renderBrandsAndModelsEntities()}
                </div>
                <div className='search-list-extended-filters-section'>
                    <div className='search-list-extended-filters-section-label'>Price</div>
                    <div className="search-list-extended-filters-slider-container">
                        <label className='search-list-extended-filters-slider-label' htmlFor="priceFrom">From: {price.priceFrom}€</label>
                        <input
                            type="range"
                            id="priceFrom"
                            name="priceFrom"
                            min="0"
                            max="500000"
                            step="500"
                            value={price.priceFrom}
                            onChange={(e) => handlePriceChange(e.target.value, 0)}
                        />
                    </div>
                    <div className="search-list-extended-filters-slider-container">
                        <label className='search-list-extended-filters-slider-label' htmlFor="toPrice">To: {price.priceTo}€</label>
                        <input
                            type="range"
                            id="priceTo"
                            name="priceTo"
                            min="0"
                            max="500000"
                            step="500"
                            value={price.priceTo}
                            onChange={(e) => handlePriceChange(e.target.value, 1)}
                        />
                    </div>
                </div>
                <div className='search-list-extended-filters-section'>
                    <div className='search-list-extended-filters-section-label'>Mileage</div>
                    <div className="search-list-extended-filters-slider-container">
                        <label className='search-list-extended-filters-slider-label' htmlFor="priceFrom">From: {mileage.mileageFrom} km</label>
                        <input
                            type="range"
                            id="mileageFrom"
                            name="mileageFrom"
                            min="0"
                            max="500000"
                            step="500"
                            value={mileage.mileageFrom}
                            onChange={(e) => handleMileageChange(e.target.value, 0)}
                        />
                    </div>
                    <div className="search-list-extended-filters-slider-container">
                        <label className='search-list-extended-filters-slider-label' htmlFor="toPrice">To: {mileage.mileageTo} km</label>
                        <input
                            type="range"
                            id="mileageTo"
                            name="mileageTo"
                            min="0"
                            max="500000"
                            step="500"
                            value={mileage.mileageTo}
                            onChange={(e) => handleMileageChange(e.target.value, 1)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExtendedFilters;