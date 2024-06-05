import '../../css/searchlist/ExtendedFilters.css';
import { useState, useEffect } from 'react';
import APIMethods from '../../api/APIMethods';
import ComboBox from '../../components/maincomponents/ComboBox';
import RangeSlider from '../maincomponents/RangeSlider.js';
import RegularButton from '../maincomponents/RegularButton.js';

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
    const [visibleFilters, setVisibleFilters] = useState(true);

    const [addBrandAndModelOverlay, setAddBrandAndModelOverlay] = useState(false);
    var brandsAndModelsFetchedTrigger = false;

    const comboBoxSizingWidth = {
        standardSize: "10vw",
        mediumSize:   "20vw",
        smallSize:    "40vw"
    };

    const comboBoxSizingHeight = {
        standardSize: "2vw",
        mediumSize:   "4vw",
        smallSize:    "7vw"
    }

    const rangeSliderSizingWidth = {
        standardSize: "90%",
        mediumSize:   "100%",
        smallSize:    "90%"
    };

    const regularButtonSizingWidth = {
        standardSize: "6vw",
        mediumSize:   "9vw",
        smallSize:    "15vw"
    };

    const regularButtonSizingHeight = {
        standardSize: "3vw",
        mediumSize:   "4vw",
        smallSize:    "8vw"
    }

    useEffect(() => { 
        fetchBrands();
        if (fetchedState.brandsAndModels !== undefined && fetchedState.brandsAndModels !== null) {
            setBrandsAndModels(fetchedState.brandsAndModels);
        }
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
        try {
            const data = await APIMethods.getAllBrands();
            if (data !== null) {
                setAddBrands(data);
            }
        } catch (error) {
            console.log(`[SearchList][ExtendedFilters][fetchBrands][ERROR] - Cannot fetch brands. Stack trace message: ${error}`);
        }
    }

    const fetchModels = async () => {
        try {
            const data = await APIMethods.getModelsByBrand(addBrand);
            if (data !== null) {
                setAddModels(data);
            }
        } catch (error) {
            console.log(`[SearchList][ExtendedFilters][fetchBrands][ERROR] - Cannot fetch models for brand: ${addBrand}. Stack trace message: ${error}`);
        }
        
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
        const renderedBrands = [];
        const renderedModels = [];
        
        renderedBrands.push({ key: '-1', value: '', textValue: 'Select brand' });
        addBrands.map((brand) => renderedBrands.push(new Object({ key: brand.id, value: brand.brand, textValue: brand.brand })));

        renderedModels.push({ key: '-1', value: '', textValue: 'Select model' });
        addModels.map((model) => renderedModels.push(new Object({ key: model.id, value: model.model, textValue: model.model })));

        return (
            <div className='search-list-extended-filters-brandAndModel-section-content'>
                {brandsAndModels.map((car, index) => {
                    return (
                        <div key={index} className='search-list-extended-filters-brandAndModel-entity'>{car.brand} {car.model} <div className='x' onClick={() => handleRemovalOfABrandsAndModelEntity(car.brand, car.model)}/></div>
                    )
                })}
                <RegularButton 
                    label={'Add +'} 
                    buttonWidth={regularButtonSizingWidth}
                    buttonHeight={regularButtonSizingHeight}
                    color={"#181818"}
                    onClickHandler={(e) => handleAddBrandAndModelOverlay()} 
                />
                {addBrandAndModelOverlay === true 
                    ?   <div className='search-list-extended-filters-brandAndModel-add-overlay'>
                            <ComboBox label={'Brand'} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={renderedBrands} onChangeHandler={(e) => handleSelectedAddBrand(e)}/>
                            <ComboBox label={'Model'} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={renderedModels} onChangeHandler={(e) => handleSelectedAddModel(e)}/>
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
        if (addBrands.length === 0) {
            return;
        }
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

    const renderPriceRangeSlider = (type) => {
        const typeOfSliderStringVal = type === 'priceFrom' ? 'From: ' : 'To: ';
        return (
            <RangeSlider sliderLabel={`${typeOfSliderStringVal} ${type === 'priceFrom' ? price.priceFrom : price.priceTo}€`} 
                changingValue={type === 'priceFrom' ? price.priceFrom : price.priceTo} 
                minValue={type === "priceFrom" ? "0" : price.priceFrom === "" ? "0" : price.priceFrom}
                maxValue={type === 'priceTo' ? "500000" : price.priceTo === "" ? "500000" : price.priceTo}
                step={'500'}
                onChangeHandler={(e) => handlePriceChange(e.target.value, type === "priceFrom" ? 0 : 1)}
                onMouseLeaveHandler={() => onPriceChanged()}
                sliderWidth={rangeSliderSizingWidth}
            />
        );
    }

    const renderMileage = (type) => {
        const typeOfSliderStringVal = type === 'mileageFrom' ? 'From: ' : 'To: ';
        return (
            <RangeSlider sliderLabel={`${typeOfSliderStringVal} ${type === 'mileageFrom' ? mileage.mileageFrom : mileage.mileageTo} km`} 
                changingValue={type === 'mileageFrom' ? mileage.mileageFrom : mileage.mileageTo} 
                minValue={type === 'mileageFrom' ? "0" : mileage.mileageFrom === '' ? "0" : mileage.mileageFrom}
                maxValue={type === 'mileageTo' ? "500000" : mileage.mileageTo === '' ? "500000" : mileage.mileageTo}
                step={'500'}
                onChangeHandler={(e) => handleMileageChange(e.target.value, type === 'mileageFrom' ? 0 : 1)}
                onMouseLeaveHandler={() => onMileageChanged()}
                sliderWidth={rangeSliderSizingWidth}
            />
        );
    }

    const renderFuelTypes = () => {
        const options = [
            { key: '1', value: '',           textValue: 'Any'        },          
            { key: '2', value: 'NotStated',  textValue: 'Not stated' }, 
            { key: '3', value: 'Hybrid',     textValue: 'Hybrid'     }, 
            { key: '4', value: 'Diesel',     textValue: 'Diesel'     },
            { key: '5', value: 'Petrol',     textValue: 'Petrol'     }, 
            { key: '6', value: 'Electric',   textValue: 'Electric'   },  
            { key: '7', value: 'LPG',        textValue: 'LPG'        },   
            { key: '8', value: 'CNG',        textValue: 'CNG'        }     
        ];

        return (
            <ComboBox label={'Fuel type'} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={options} onChangeHandler={(e) => handleFuelTypeChange(e.target.value)}/>
        );
    }

    const renderGearboxTypes = () => {
        const options = [
            { key: '9', value: '',            textValue: 'Any'         },    
            { key: '10', value: 'NotStated',   textValue: 'Not stated'  },   
            { key: '11', value: 'Manual',      textValue: 'Manual'      },     
            { key: '12', value: 'Automatic',   textValue: 'Automatic'   },       
            { key: '13', value: 'Sequential',  textValue: 'Sequential'  }   
        ];

        return (
            <ComboBox label={'Gearbox'} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={options} onChangeHandler={(e) => handleGearboxChange(e.target.value)}/>
        );
    }

    const renderEnginePower = (type) => {
        const typeOfSliderStringVal = type === 'powerFrom' ? 'From: ' : 'To: ';
        return (
            <RangeSlider sliderLabel={`${typeOfSliderStringVal} ${type === 'powerFrom' ? power.powerFrom : power.powerTo} kW`} 
                sliderWidth={rangeSliderSizingWidth}
                changingValue={type === 'powerFrom' ? power.powerFrom : power.powerTo} 
                minValue={type === 'powerFrom' ? "0" : power.powerFrom === '' ? "0" : power.powerFrom}
                maxValue={type === 'powerTo' ? "1000" : power.powerTo === '' ? "1000" : power.powerTo}
                step={'1'}
                onChangeHandler={(e) => handlePowerChange(e.target.value, type === 'powerFrom' ? 0 : 1)}
                onMouseLeaveHandler={() => onPowerChanged()}
            />
        );
    }

    const renderPowertrainTypes = () => {
        const options = [
            { key: '14', value: '',           textValue: 'Any'               },   
            { key: '15', value: 'Other',      textValue: 'Other'             },   
            { key: '16', value: 'NotStated',  textValue: 'Not stated'        },     
            { key: '17', value: 'RearWheel',  textValue: 'Rear-wheel drive'  },       
            { key: '18', value: 'FrontWheel', textValue: 'Front-wheel drive' },    
            { key: '19', value: 'AllWheel',   textValue: 'All-wheel drive'   }  
        ];

        return (
            <ComboBox label={'Powetrain'} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={options} onChangeHandler={(e) => handlePowertrainChange(e.target.value)}/> 
        );
    }

    const handleFiltersVisibility = () => {
        setVisibleFilters(!visibleFilters);
    }

    return (
        <div className='search-list-extended-filters-wrapper'>
            <div className='search-list-extended-filters-padding-wrapper'>
                <div className='search-list-extended-filters-num-of-searches'>{!loadingResultsListLength ? resultsListLength + " cars" : "Loading cars"} </div>
                <div className='search-list-extended-filters-header'>Filters</div>
                <div className='extended-filters-dropdown-arrow' onClick={handleFiltersVisibility}/>
                <div className='search-list-extended-filters-section' style={visibleFilters === true ? {visibility: "visible", display: "block"} : {visibility: "hidden", display: "none"}}>
                    <div className='search-list-extended-filters-section-label'>Brands & models</div>
                    {renderBrandsAndModelsEntities()}
                </div>
                <div className='search-list-extended-filters-section' style={visibleFilters === true ? {visibility: "visible", display: "block"} : {visibility: "hidden", display: "none"}}>
                    <div className='search-list-extended-filters-section-label'>Price</div>
                    {renderPriceRangeSlider("priceFrom")}
                    {renderPriceRangeSlider("priceTo")}
                </div>
                <div className='search-list-extended-filters-section' style={visibleFilters === true ? {visibility: "visible", display: "block"} : {visibility: "hidden", display: "none"}}>
                    <div className='search-list-extended-filters-section-label'>Mileage</div>
                    {renderMileage('mileageFrom')}
                    {renderMileage('mileageTo')}
                </div>
                <div className='search-list-extended-filters-section' style={visibleFilters === true ? {visibility: "visible", display: "block"} : {visibility: "hidden", display: "none"}}>
                    {renderFuelTypes()}
                </div>
                <div className='search-list-extended-filters-section' style={visibleFilters === true ? {visibility: "visible", display: "block"} : {visibility: "hidden", display: "none"}}>
                    {renderGearboxTypes()}
                </div>
                <div className='search-list-extended-filters-section' style={visibleFilters === true ? {visibility: "visible", display: "block"} : {visibility: "hidden", display: "none"}}>
                    {renderPowertrainTypes()}
                </div>
                <div className='search-list-extended-filters-section' style={visibleFilters === true ? {visibility: "visible", display: "block"} : {visibility: "hidden", display: "none"}}>
                    <div className='search-list-extended-filters-section-label'>Power</div>
                    {renderEnginePower('powerFrom')}
                    {renderEnginePower('powerTo')}
                </div>
            </div>
        </div>
    );
}

export default ExtendedFilters;