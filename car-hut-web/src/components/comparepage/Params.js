import '../../css/comparepage/Params.css';
import { useEffect, useState } from "react";
import APIMethods from "../../api/APIMethods";
import ComboBox from "../maincomponents/ComboBox";
import { Chart } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Params = () => {

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

    const years = [];
    [...new Array(2025-1960+1)].map((_,i) => i+1960).reverse().map((year, idx) =>  years.push({key: idx, value: year, textValue: year}));
    const displacement = [];
    [...new Array(20)].map((_,i) => i*500).map((dis, idx) =>  displacement.push({key: idx, value: dis, textValue: `${dis} ccm³`}));
    const mileage = [];
    [...new Array(10)].map((_,i) => i*50000).map((mil, idx) =>  mileage.push({key: idx, value: mil, textValue: `${mil} km`}));
    const power = [];
    [...new Array(15)].map((_,i) => i*50).map((pow, idx) =>  power.push({key: idx, value: pow, textValue: `${pow} PS`}));
    const price = [];
    [...new Array(40)].map((_,i) => i*5000).map((pri, idx) =>  price.push({key: idx, value: pri, textValue: `${pri} €`}));

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

    const onPickedBrand = (e) => {
        try {
            setPickedBrand(e.target.value);
        } catch (error) {
            console.log('Cannot set picked brand. Error: ' + error);
        }
    }

    const onPickedModel = (e) => {
        try {
            setPickedModel(e.target.value);
        } catch (error) {
            console.log('Cannot set picked model. Error: ' + error);
        }
    }

    const fetchModels = async () => {
        try {
            const data = await APIMethods.getModelsByBrandName(pickedBrand);
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
        } catch (error) { 
            console.log(`Cannot pick fuel type. Error: ${error}`);
        }
    }

    const onPickedYearFrom = (e) => {
        try {
            setPickedYearFrom(e.target.value);
        } catch (error) {
            console.log(`Cannot pick year from. Error ${error}`);
        }
    }

    const onPickedYearTo = (e) => {
        try {
            setPickedYearTo(e.target.value);
        } catch (error) {
            console.log(`Cannot pick year to. Error ${error}`);
        }
    }

    const onPickedDisFrom = (e) => {
        try {
            setPickedDisFrom(e.target.value);
        } catch (error) {
            console.log(`Cannot pick displacement from. Error ${error}`);
        }
    }

    const onPickedDisTo = (e) => {
        try {
            setPickedDisTo(e.target.value);
        } catch (error) {
            console.log(`Cannot pick displacement to. Error ${error}`);
        }
    }

    const onPickedMilFrom = (e) => {
        try {
            setPickedMilFrom(e.target.value);
        } catch (error) {
            console.log(`Cannot pick mileage from. Error ${error}`);
        }
    }

    const onPickedMilTo = (e) => {
        try {
            setPickedMilTo(e.target.value);
        } catch (error) {
            console.log(`Cannot pick mileage to. Error ${error}`);
        }
    }

    const onPickedPowerFrom = (e) => {
        try {
            setPickedPowerFrom(e.target.value);
        } catch (error) {
            console.log(`Cannot pick power from. Error ${error}`);
        }
    }

    const onPickedPowerTo = (e) => {
        try {
            setPickedPowerTo(e.target.value);
        } catch (error) {
            console.log(`Cannot pick power to. Error ${error}`);
        }
    }

    const onPickedPriceFrom = (e) => {
        try {
            setPickedPriceFrom(e.target.value);
        } catch (error) {
            console.log(`Cannot pick price from. Error ${error}`);
        }
    }

    const onPickedPriceTo = (e) => {
        try {
            setPickedPriceTo(e.target.value);
        } catch (error) {
            console.log(`Cannot pick price to. Error ${error}`);
        }
    }

    return (
        <div className="params-body">
            <div className='params-column'>
                <ComboBox label={"Price from"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={price} onChangeHandler={(e) => onPickedPriceFrom(e)}/>
                <ComboBox label={"Price to"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={price} onChangeHandler={(e) => onPickedPriceTo(e)}/>
                <ComboBox label={"Brand"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={brands} onChangeHandler={(e) => onPickedBrand(e)}/>
                <ComboBox label={"Model"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={models} onChangeHandler={(e) => onPickedModel(e)}/>
                <ComboBox label={"Fuel"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={fuelTypes} onChangeHandler={(e) => onPickedFuelType(e)}/>
                <ComboBox label={"Year from"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={years} onChangeHandler={(e) => onPickedYearFrom(e)}/>
                <ComboBox label={"Year to"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={years} onChangeHandler={(e) => onPickedYearTo(e)}/>    
                <ComboBox label={"Displacement from"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={displacement} onChangeHandler={(e) => onPickedDisFrom(e)}/>
                <ComboBox label={"Displacement to"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={displacement} onChangeHandler={(e) => onPickedDisTo(e)}/>    
                <ComboBox label={"Mileage from"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={mileage} onChangeHandler={(e) => onPickedMilFrom(e)}/>
                <ComboBox label={"Mileage to"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={mileage} onChangeHandler={(e) => onPickedMilTo(e)}/>       
                <ComboBox label={"Power from"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={power} onChangeHandler={(e) => onPickedPowerFrom(e)}/>
                <ComboBox label={"Power to"} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={power} onChangeHandler={(e) => onPickedPowerTo(e)}/>   
            </div>
            <div className='params-column'>    
                <div className='calendar-label'>Date range</div>
                <div className='params-date-range-row'>
                    <Calendar className={'calendar-object'}/>
                    <Calendar className={'calendar-object'}/>
                </div>
            </div>
        </div>
    );
}

export default Params;