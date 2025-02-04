import '../../css/comparepage/Params.css';
import { useEffect, useState } from "react";
import APIMethods from "../../api/APIMethods";
import ComboBox from "../maincomponents/ComboBox";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { v4 as uuidv4 } from 'uuid';
import Offers from './Offers';

const Params = ({ setRawGraphData, graphChangeContent }) => {

    const [brands, setBrands] = useState([]);
    const [pickedBrand, setPickedBrand] = useState(null);
    const [models, setModels] = useState([]);
    const [pickedModel, setPickedModel] = useState(null);
    const [fuelTypes, setFuelTypes] = useState([]);
    const [pickedFuelType, setPickedFuelType] = useState(null);
    const [pickedYearFrom, setPickedYearFrom] = useState(null);
    const [pickedYearTo, setPickedYearTo] = useState(null);
    const [pickedDisFrom, setPickedDisFrom] = useState(null);
    const [pickedDisTo, setPickedDisTo] = useState(null);
    const [pickedMilFrom, setPickedMilFrom] = useState(null);
    const [pickedMilTo, setPickedMilTo] = useState(null);
    const [pickedPowerFrom, setPickedPowerFrom] = useState(null);
    const [pickedPowerTo, setPickedPowerTo] = useState(null);
    const [pickedPriceFrom, setPickedPriceFrom] = useState(null);
    const [pickedPriceTo, setPickedPriceTo] = useState(null);
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());
    const [numberOfLabels, setNumberOfLabels] = useState(null);
    const [dateFromShownOffers, setDateFromShownOffers] = useState(new Date());
    const [dateToShownOffers, setDateToShownOffers] = useState(new Date());
    const [filters, setFilters] = useState({
       brandId: null,
       modelId: null,
       fuelType: null,
       yearFrom: null,
       yearTo: null,
       disFrom: null,
       disTo: null,
       milFrom: null,
       milTo: null,
       powerFrom: null,
       powerTo: null,
       priceFrom: null,
       priceTo: null,
       dateFrom: null,
       dateTo: null,
    });
    const [numOfOffers, setNumOfOffers] = useState(0);

    const years = [];
    [...new Array(2025-1960+1)].map((_,i) => i+1960).reverse().map((year, idx) =>  years.push({key: uuidv4(), value: year, textValue: year}));
    const displacement = [];
    [...new Array(20)].map((_,i) => i*500).map((dis, idx) =>  displacement.push({key: uuidv4(), value: dis, textValue: `${dis} ccm³`}));
    const mileage = [];
    [...new Array(10)].map((_,i) => i*50000).map((mil, idx) =>  mileage.push({key: uuidv4(), value: mil, textValue: `${mil} km`}));
    const power = [];
    [...new Array(15)].map((_,i) => i*50).map((pow, idx) =>  power.push({key: uuidv4(), value: pow, textValue: `${pow} kW`}));
    const price = [];
    [...new Array(40)].map((_,i) => i*5000).map((pri, idx) =>  price.push({key: uuidv4(), value: pri, textValue: `${pri} €`}));
    const labelsCount = [];
    [...new Array(15)].map((_,i) => i + 1).map((lbl, idx) =>  labelsCount.push({key: uuidv4(), value: lbl, textValue: `${lbl}`})); 

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

    useEffect(() => {
        fetchBrands();
        fetchFuelTypes();
    }, []);

    useEffect(() => {
        fetchModels(); 
    }, [pickedBrand]);

    useEffect(() => {
        fetchCurrentData();
        fetchNumberOfOffers();
    }, [pickedBrand, pickedModel, pickedFuelType, pickedYearFrom, pickedYearTo, pickedDisFrom, pickedDisTo, pickedMilFrom, pickedMilTo, pickedPowerFrom, pickedPowerTo, 
        pickedPriceFrom, pickedPriceTo, dateFrom, dateTo, numberOfLabels]);

    const fetchCurrentData = async () => {
        const dateFromInc = new Date(dateFrom.toString());
        const dateToInc = new Date(dateTo.toString());
        dateFromInc.setDate(dateFromInc.getDate() + 1);
        dateToInc.setDate(dateToInc.getDate() + 1);
        const filters = {
            priceFrom:          pickedPriceFrom,
            priceTo:            pickedPriceTo,
            brand:              pickedBrand,
            model:              pickedModel,
            fuel:               pickedFuelType,
            yearFrom:           pickedYearFrom,
            yearTo:             pickedYearTo,
            displacementFrom:   pickedDisFrom,
            displacementTo:     pickedDisTo,
            mileageFrom:        pickedMilFrom,
            mileageTo:          pickedMilTo,
            powerFrom:          pickedPowerFrom,
            powerTo:            pickedPowerTo,
            dateRangeFrom:      dateFromInc,
            dateRangeTo:        dateToInc,
            numOfLabels:        numberOfLabels
        };
        const response = await APIMethods.getPriceComparisonData(filters, true, true, true, true);
        const data = await response.json();
        console.log(data);
        setRawGraphData(data.responseBody);
    }

    const fetchFuelTypes = async () => {
        try {
            const data = await APIMethods.getFuelTypes();
            const responseBody = data.responseBody;
            const json = JSON.parse(responseBody);
            const mappedFuelTypes = [];
            json.map((fuelType, idx) => {
                mappedFuelTypes.push({key: idx, value: fuelType, textValue: fuelType});
            }); 
            setFuelTypes(mappedFuelTypes);
        } catch (error) {
            console.log(`Cannot fetch fuel types. Error ${error}`);
        }
    };

    const fetchBrands = async () => {
        try {
            const data = await APIMethods.getAllBrands();
            const responseBody = data.responseBody;
            const json = JSON.parse(responseBody);
            const mappedBrands = [];
            json.map((currBrand, idx) => {
                mappedBrands.push({key: currBrand.id, value: currBrand.brand, textValue: currBrand.brand});
            }); 
            setBrands(mappedBrands);
        } catch (error) {
            console.log("Cannot fetch all brands. Error: " + error);
        }
    }

    const onPickedBrand = async (e) => {
        try {
            const brandId = await APIMethods.getBrandIdFromBrandName(e.currentTarget.value);
            setPickedBrand(brandId.responseBody);
            const tempFilters = { ...filters };
            tempFilters.brandId = brandId.responseBody;
            setFilters(tempFilters);
        } catch (error) {
            console.log('Cannot set picked brand. Error: ' + error);
        }
    }

    const onPickedModel = async (e) => {
        try {
            const modelId = await APIMethods.getModelIdByModelName(e.currentTarget.value, pickedBrand);
            setPickedModel(modelId.responseBody);
            const tempFilters = { ...filters };
            tempFilters.modelId = modelId.responseBody;
            setFilters(tempFilters);
        } catch (error) {
            console.log('Cannot set picked model. Error: ' + error);
        }
    }

    const fetchModels = async () => {
        try {
            const data = await APIMethods.getModelsByBrandId(pickedBrand);
            const responseBody = data.responseBody;
            const json = JSON.parse(responseBody);
            const mappedModels = [];
            json.map((currModel, idx) => {
                mappedModels.push({key: currModel.id, value: currModel.model, textValue: currModel.model});
            });
            setModels(mappedModels);
        } catch (error) {
            console.log(`Cannot fetch models for picked brand ${pickedBrand}. Error: ${error}`);
        }
    }

    const onPickedFuelType = (e) => {
        try {
            setPickedFuelType(e.target.value);
            const tempFilters = { ...filters };
            tempFilters.fuelType = e.target.value;
            setFilters(tempFilters);
        } catch (error) { 
            console.log(`Cannot pick fuel type. Error: ${error}`);
        }
    }

    const onPickedYearFrom = (e) => {
        try {
            setPickedYearFrom(e.target.value);
            const tempFilters = { ...filters };
            tempFilters.yearFrom = e.target.value;
            setFilters(tempFilters);
        } catch (error) {
            console.log(`Cannot pick year from. Error ${error}`);
        }
    }

    const onPickedYearTo = (e) => {
        try {
            setPickedYearTo(e.target.value);
            const tempFilters = { ...filters };
            tempFilters.yearTo = e.target.value;
            setFilters(tempFilters);
        } catch (error) {
            console.log(`Cannot pick year to. Error ${error}`);
        }
    }

    const onPickedDisFrom = (e) => {
        try {
            setPickedDisFrom(e.target.value);
            const tempFilters = { ...filters };
            tempFilters.disFrom = e.target.value;
            setFilters(tempFilters);
        } catch (error) {
            console.log(`Cannot pick displacement from. Error ${error}`);
        }
    }

    const onPickedDisTo = (e) => {
        try {
            setPickedDisTo(e.target.value);
            const tempFilters = { ...filters };
            tempFilters.disTo = e.target.value;
            setFilters(tempFilters);
        } catch (error) {
            console.log(`Cannot pick displacement to. Error ${error}`);
        }
    }

    const onPickedMilFrom = (e) => {
        try {
            setPickedMilFrom(e.target.value);
            const tempFilters = { ...filters };
            tempFilters.milFrom = e.target.value;
            setFilters(tempFilters);
        } catch (error) {
            console.log(`Cannot pick mileage from. Error ${error}`);
        }
    }

    const onPickedMilTo = (e) => {
        try {
            setPickedMilTo(e.target.value);
            const tempFilters = { ...filters };
            tempFilters.brandId = e.target.value;
            setFilters(tempFilters);
        } catch (error) {
            console.log(`Cannot pick mileage to. Error ${error}`);
        }
    }

    const onPickedPowerFrom = (e) => {
        try {
            setPickedPowerFrom(e.target.value);
            const tempFilters = { ...filters };
            tempFilters.powerFrom = e.target.value;
            setFilters(tempFilters);
        } catch (error) {
            console.log(`Cannot pick power from. Error ${error}`);
        }
    }

    const onPickedPowerTo = (e) => {
        try {
            setPickedPowerTo(e.target.value);
            const tempFilters = { ...filters };
            tempFilters.powerTo = e.target.value;
            setFilters(tempFilters);
        } catch (error) {
            console.log(`Cannot pick power to. Error ${error}`);
        }
    }

    const onPickedPriceFrom = (e) => {
        try {
            setPickedPriceFrom(e.target.value);
            const tempFilters = { ...filters };
            tempFilters.priceFrom = e.target.value;
            setFilters(tempFilters);
        } catch (error) {
            console.log(`Cannot pick price from. Error ${error}`);
        }
    }

    const onPickedPriceTo = (e) => {
        try {
            setPickedPriceTo(e.target.value);
            const tempFilters = { ...filters };
            tempFilters.priceTo = e.target.value;
            setFilters(tempFilters);
        } catch (error) {
            console.log(`Cannot pick price to. Error ${error}`);
        }
    }

    const onPickedNumberOfLabels = (e) => {
        setNumberOfLabels(e.target.value);
    }

    const onPickedDateFrom = (dateValue) => {
        try {
            setDateFrom(dateValue);
            setDateFromShownOffers(dateValue);
            const tempFilters = { ...filters };
            tempFilters.dateFrom = dateValue;
            setFilters(tempFilters);
        } catch (e) {
            console.log('Cannot set date from. Try again. Error: ' + e);
        }
    }

    const onPickedDateTo = (dateValue) => {
        try {
            setDateTo(dateValue);
            setDateToShownOffers(dateValue);
            const tempFilters = { ...filters };
            tempFilters.dateTo = dateValue;
            setFilters(tempFilters);
        } catch (e) {
            console.log('Cannot set date to. Try again. Error: ' + e);
        }
    }

    const fetchNumberOfOffers = async () => {
        const offersFilterModel = {
            brandId: filters.brandId,
            modelId: filters.modelId,
            priceFrom: filters.priceFrom,
            priceTo: filters.priceTo,
            mileageFrom: filters.milFrom,
            mileageTo: filters.milTo,
            yearFrom: filters.yearFrom,
            yearTo: filters.yearTo,
            location: null,
            fuel: filters.fuelType,
            powerFrom: filters.powerFrom,
            powerTo: filters.powerTo,
            displacementFrom: filters.disFrom,
            displacementTo: filters.disTo,
            gearbox: filters.gearbox,
            models: [],
            bodyTypes: [],
            dateFrom: filters.dateFrom,
            dateTo: filters.dateTo
        }

        try {
            const response = await APIMethods.getNumberOfFilteredCars(offersFilterModel);
            setNumOfOffers(response.responseBody);
        } catch (e) {
            console.log('Cannot fetch number of filtered out offers.');
        }
    }

    return (
        <div className="params-body">
            <div className='params-column'>    
                <ComboBox label={"Number of labels"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={labelsCount} selectedValue={numberOfLabels} onChangeHandler={(e) => onPickedNumberOfLabels(e)}/>
                <ComboBox label={"Price from"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={price} selectedValue={pickedPriceFrom} onChangeHandler={(e) => onPickedPriceFrom(e)}/>
                <ComboBox label={"Price to"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={price} selectedValue={pickedPriceTo} onChangeHandler={(e) => onPickedPriceTo(e)}/>
                <ComboBox label={"Brand"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={brands} selectedValue={pickedBrand} onChangeHandler={(e) => onPickedBrand(e)}/>
                <ComboBox label={"Model"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={models} selectedValue={pickedModel} onChangeHandler={(e) => onPickedModel(e)}/>
                <ComboBox label={"Fuel"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={fuelTypes} selectedValue={pickedFuelType} onChangeHandler={(e) => onPickedFuelType(e)}/>
                <ComboBox label={"Year from"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={years} selectedValue={pickedYearFrom} onChangeHandler={(e) => onPickedYearFrom(e)}/>
                <ComboBox label={"Year to"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={years} selectedValue={pickedYearTo} onChangeHandler={(e) => onPickedYearTo(e)}/>    
                <ComboBox label={"Displacement from"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={displacement} selectedValue={pickedDisFrom} onChangeHandler={(e) => onPickedDisFrom(e)}/>
                <ComboBox label={"Displacement to"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={displacement} selectedValue={pickedDisTo} onChangeHandler={(e) => onPickedDisTo(e)}/>    
                <ComboBox label={"Mileage from"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={mileage} selectedValue={pickedMilFrom} onChangeHandler={(e) => onPickedMilFrom(e)}/>
                <ComboBox label={"Mileage to"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={mileage} selectedValue={pickedMilTo} onChangeHandler={(e) => onPickedMilTo(e)}/>       
                <ComboBox label={"Power from"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={power} selectedValue={pickedPowerFrom} onChangeHandler={(e) => onPickedPowerFrom(e)}/>
                <ComboBox label={"Power to"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={power} selectedValue={pickedPowerTo} onChangeHandler={(e) => onPickedPowerTo(e)}/>   
            </div>
            <div className='params-column'>    
                <div className='calendar-label'>Date range</div>
                <div className='params-date-range-row'>
                    <Calendar className={'calendar-object'} onChange={(value, event) => onPickedDateFrom(value)} value={dateFrom}/>
                    <Calendar className={'calendar-object'} onChange={(value, event) => onPickedDateTo(value)} value={dateTo}/>
                </div>
                <div className='date-range-and-num-of-offers-wrapper'>
                    <div className='date-range-label'>Range: {dateFromShownOffers.toLocaleDateString()} - {dateToShownOffers.toLocaleDateString()}</div>
                    <div className='date-range-label'>{numOfOffers} offers</div>
                </div>
                <Offers graphChangeContent={graphChangeContent} filters={filters} numOfOffers={numOfOffers}/>
            </div>
        </div>
    );
}

export default Params;