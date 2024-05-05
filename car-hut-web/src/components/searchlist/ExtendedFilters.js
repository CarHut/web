import { keyboard } from '@testing-library/user-event/dist/keyboard';
import '../../css/searchlist/ExtendedFilters.css';
import { useState, useEffect } from 'react';
import APIMethods from '../../api/APIMethods';

function ExtendedFilters({ fetchedState, resultsListLength, handleStateChange, loadingResultsListLength, setLoadingResultsListLength }) {

    const [brandsAndModels, setBrandsAndModels] = useState([]);
    const [price, setPrice] = useState(fetchedState.price);
    const [mileage, setMileage] = useState(fetchedState.mileage);
    const [fuelType, setFuelType] = useState(fetchedState.fuelType);
    const [gearbox, setGearbox] = useState(fetchedState.gearbox);
    const [powertrain, setPowertrain] = useState(fetchedState.powertrain);
    const [power, setPower] = useState(fetchedState.power);
    const [addBrands, setAddBrands] = useState([]);
    const [addModels, setAddModels] = useState([]);
    const [addBrand, setAddBrand] = useState('');
    const [addModel, setAddModel] = useState('');

    const [addBrandAndModelOverlay, setAddBrandAndModelOverlay] = useState(false);
    var brandsAndModelsFetchedTrigger = false;

    useEffect(() => {
        fetchBrands();
    }, []);

    useEffect(() => {
        // Fetch models when a brand is 
        if (addBrand !== '') {
            fetchModels();
        } else {
            // Clear models when no brand is 
            setAddModels([]);
        }
    }, [addBrand]);

    const fetchBrands = async () => {
        setAddBrands(await APIMethods.getAllBrands());
    }

    const fetchModels = async () => {
        setAddModels(await APIMethods.getModelsByBrand(addBrand));
    }

    const handleRemovalOfABrandsAndModelEntity = (brand, model) => {
        setBrandsAndModels(brandsAndModels.filter((brandAndModel) => brandAndModel.brand !== brand || brandAndModel.model !== model));
        var updatedFetchedState = {...fetchedState};
        updatedFetchedState.models = updatedFetchedState.models.filter((brandAndModel) => brandAndModel.brand !== brand || brandAndModel.model != model);
        handleStateChange(updatedFetchedState);
        setLoadingResultsListLength(true);
    }

    useEffect(() => {
        if (fetchedState.models !== undefined && !brandsAndModelsFetchedTrigger) {
            setBrandsAndModels(fetchedState.models);
            brandsAndModelsFetchedTrigger = true;
        }
    }, []);
    
    const handleSelectedAddBrand = (val) => {
        setAddBrand(val.target.value);
        setLoadingResultsListLength(true);
        
    }

    const handleSelectedAddModel = (val) => {
        setAddModel(val.target.value);
        setLoadingResultsListLength(true);
    }

    const renderBrandsAndModelsEntities = () => {
        return (
            <div className='search-list-extended-filters-brandAndModel-section-content'>
                {brandsAndModels.map((car, index) => {
                    return (
                        <div key={index} className='search-list-extended-filters-brandAndModel-entity'>{car.brand} {car.model} <div className='x' onClick={() => handleRemovalOfABrandsAndModelEntity(car.brand, car.model)}/></div>
                    )
                })}
                <div className='search-list-extended-filters-brandAndModel-add-button' onClick={() => handleAddBrandAndModelOverlay()}>Add +</div>
                {addBrandAndModelOverlay === true 
                    ?   <div className='search-list-extended-filters-brandAndModel-add-overlay'>
                            <div className='combobox-entity'>
                                <div className='label'>Brand</div>
                                <div className="custom-combobox">
                                    <select id="brandComboBox" className='myComboBox' value={addBrand} onChange={(e) => handleSelectedAddBrand(e)}>
                                        <option key={0} value={''} onChange={(e) => handleSelectedAddBrand(e)}>All</option>
                                        {addBrands.map(brand => (
                                            <option key={brand.id} value={brand.brand}>{brand.brand}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='combobox-entity'>
                                <div className='label'>Model</div>
                                <div className="custom-combobox">
                                    <select id="modelComboBox" className={`myComboBox ${addBrand === '' ? 'disabled' : ''}`} value={addModel} onChange={(e) => handleSelectedAddModel(e)} disabled={addBrand === ''}>
                                        <option key={0} value={''} onChange={(e) => handleSelectedAddBrand(e)}>All</option>
                                        {addModels.map(model => (
                                            <option key={model.id} value={model.model}>{model.model}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    :   <div className=''></div> 
                }
            </div>
        );

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
        setLoadingResultsListLength(true);
    }

    // type -> 0 = powerFrom, 1 = powerTo
    const handlePowerChange = (value, type) => {
        switch (type) {
            case 0:
                setPower({ powerFrom: value, powerTo: power.powerTo });
                break;
            case 1:
                setPower({ powerFrom: power.powerFrom, powerTo: value });
                break;
        }
        setLoadingResultsListLength(true);
    }

    const onPriceChanged = () => {
        // Nothing changed thus no need to call update
        if (fetchedState.price === price) {
            return;
        }
        var updatedState = {...fetchedState};
        updatedState.price = price;
        handleStateChange(updatedState);
        setLoadingResultsListLength(true);
    }

    const onPowerChanged = () => {
        // Nothing changed thus no need to call update
        if (fetchedState.power === power) {
            return;
        }
        var updatedState = {...fetchedState};
        updatedState.power = power;
        handleStateChange(updatedState);
        setLoadingResultsListLength(true);
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
        setLoadingResultsListLength(true);
    }

    const onMileageChanged = () => {
        // Nothing changed thus no need to call update
        if (fetchedState.mileage === mileage) {
            return;
        }
        var updatedState = {...fetchedState};
        updatedState.mileage = mileage;
        handleStateChange(updatedState);
        setLoadingResultsListLength(true);
    }

    const handleFuelTypeChange = (fuelTypeNew) => {
        setFuelType(fuelTypeNew);
        var updatedState = {...fetchedState};
        updatedState.fuelType = fuelTypeNew;
        handleStateChange(updatedState);
        setLoadingResultsListLength(true);
    }

    const handleAddBrandAndModelOverlay = () => {
        if (addBrandAndModelOverlay) {
            if (addBrand !== '') {
                var updatedState = {...fetchedState};
                var updatedModels = [];
                if (addModel !== '') {
                    updatedModels = [...updatedState.models, { brand: addBrand, model: addModel }];
                } else {
                    updatedModels = [...updatedState.models, { brand: addBrand, model: '' }];
                }
                updatedState.models = updatedModels;
                setBrandsAndModels(updatedModels);
                handleStateChange(updatedState);
            }
        }

        setAddBrand('');
        setAddModel('');
        setAddBrandAndModelOverlay(!addBrandAndModelOverlay);
    }

    const handleGearboxChange = (gearboxNew) => {
        setGearbox(gearboxNew);
        var updatedState = {...fetchedState};
        updatedState.gearbox = gearboxNew;
        handleStateChange(updatedState);
        setLoadingResultsListLength(true);
    }

    const handlePowertrainChange = (powertrainNew) => {
        setPowertrain(powertrainNew);
        var updatedState = {...fetchedState};
        updatedState.powertrain = powertrainNew;
        handleStateChange(updatedState);
        setLoadingResultsListLength(true);
    }

    return (
        <div className='search-list-extended-filters-wrapper'>
            <div className='search-list-extended-filters-padding-wrapper'>
                <div className='search-list-extended-filters-num-of-searches'>{!loadingResultsListLength ? resultsListLength + " cars" : "Loading cars"} </div>
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
                            max={price.priceTo === "" ? "500000" : price.priceTo}
                            step="500"
                            value={price.priceFrom}
                            onChange={(e) => handlePriceChange(e.target.value, 0)}
                            onMouseLeave ={() => onPriceChanged()}
                        />
                    </div>
                    <div className="search-list-extended-filters-slider-container">
                        <label className='search-list-extended-filters-slider-label' htmlFor="toPrice">To: {price.priceTo}€</label>
                        <input
                            type="range"
                            id="priceTo"
                            name="priceTo"
                            min={price.priceFrom === "" ? "0" : price.priceFrom}
                            max="500000"
                            step="500"
                            value={price.priceTo}
                            onChange={(e) => handlePriceChange(e.target.value, 1)}
                            onMouseLeave={() => onPriceChanged()}
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
                            max={mileage.mileageTo === "" ? "500000" : mileage.mileageTo}
                            step="500"
                            value={mileage.mileageFrom}
                            onChange={(e) => handleMileageChange(e.target.value, 0)}
                            onMouseLeave={() => onMileageChanged()}
                        />
                    </div>
                    <div className="search-list-extended-filters-slider-container">
                        <label className='search-list-extended-filters-slider-label' htmlFor="toPrice">To: {mileage.mileageTo} km</label>
                        <input
                            type="range"
                            id="mileageTo"
                            name="mileageTo"
                            min={mileage.mileageFrom === "" ? "0" : mileage.mileageFrom}
                            max="500000"
                            step="500"
                            value={mileage.mileageTo}
                            onChange={(e) => handleMileageChange(e.target.value, 1)}
                            onMouseLeave={() => onMileageChanged()}
                        />
                    </div>
                </div>
                <div className='search-list-extended-filters-section'>
                    <div className='search-list-extended-filters-section-label'>Fuel type</div>
                    <div className='combobox-entity'>
                        <div className="custom-combobox">
                            <select id="fuelComboBox" className='myComboBox' onChange={(e) => handleFuelTypeChange(e.target.value)}>
                                <option key={1} value={""}>Any</option>
                                <option key={2} value={'NotStated'}>Not stated</option>
                                <option key={3} value={'Hybrid'}>Hybrid</option>
                                <option key={4} value={'Diesel'}>Diesel</option>
                                <option key={5} value={'Petrol'}>Petrol</option>
                                <option key={6} value={'Electric'}>Electric</option>
                                <option key={7} value={'LPG'}>LPG</option>
                                <option key={8} value={'CNG'}>CNG</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='search-list-extended-filters-section'>
                    <div className='search-list-extended-filters-section-label'>Gearbox</div>
                    <div className='combobox-entity'>
                        <div className="custom-combobox">
                            <select id="gearboxComboBox" className='myComboBox' onChange={(e) => handleGearboxChange(e.target.value)}>
                                <option key={1} value={""}>Any</option>
                                <option key={2} value={'NotStated'}>Not stated</option>
                                <option key={3} value={'Manual'}>Manual</option>
                                <option key={4} value={'Automatic'}>Automatic</option>
                                <option key={5} value={'Sequential'}>Sequential</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='search-list-extended-filters-section'>
                    <div className='search-list-extended-filters-section-label'>Powertrain</div>
                    <div className='combobox-entity'>
                        <div className="custom-combobox">
                            <select id="gearboxComboBox" className='myComboBox' onChange={(e) => handlePowertrainChange(e.target.value)}>
                                <option key={1} value={""}>Any</option>
                                <option key={2} value={'Other'}>Other</option>
                                <option key={3} value={'NotStated'}>Not stated</option>
                                <option key={4} value={'RearWheel'}>Rear-wheel drive</option>
                                <option key={5} value={'FrontWheel'}>Front-wheel drive</option>
                                <option key={5} value={'AllWheel'}>All-wheel drive</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='search-list-extended-filters-section'>
                    <div className='search-list-extended-filters-section-label'>Power</div>
                    <div className="search-list-extended-filters-slider-container">
                        <label className='search-list-extended-filters-slider-label' htmlFor="powerFrom">From: {power.powerFrom} kW</label>
                        <input
                            type="range"
                            id="powerFrom"
                            name="powerFrom"
                            min="0"
                            max={power.powerTo === "" ? "1000" : power.powerTo}
                            step="1"
                            value={power.powerFrom}
                            onChange={(e) => handlePowerChange(e.target.value, 0)}
                            onMouseLeave ={() => onPowerChanged()}
                        />
                    </div>
                    <div className="search-list-extended-filters-slider-container">
                        <label className='search-list-extended-filters-slider-label' htmlFor="powerTo">To: {power.powerTo} kW</label>
                        <input
                            type="range"
                            id="powerTo"
                            name="powerTo"
                            min={power.powerFrom === "" ? "0" : power.powerFrom}
                            max="1000"
                            step="1"
                            value={power.powerTo}
                            onChange={(e) => handlePowerChange(e.target.value, 1)}
                            onMouseLeave={() => onPowerChanged()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExtendedFilters;