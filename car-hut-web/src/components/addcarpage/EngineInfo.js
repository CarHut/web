import { useLocation } from 'react-router-dom';
import APIMethods from '../../api/APIMethods';
import '../../css/addcarpage/EngineInfo.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ComboBox from '../maincomponents/ComboBox';
import RangeSlider from '../maincomponents/RangeSlider';
import TextInputField from '../maincomponents/TextInputField';
import RegularButton from '../maincomponents/RegularButton';

function EngineInfo() {

    const loc = useLocation();

    const [currentCarModel, setCurrentCarModel] = useState(loc.state);
    const [fuelTypes, setFuelTypes] = useState([]);
    const [gearboxTypes, setGearboxTypes] = useState([]);
    const [powertrainTypes, setPowertrainTypes] = useState([]);
    const [enginePower, setEnginePower] = useState('Not stated');
    const [displacement, setDisplacement] = useState('Not stated');
    const [fuel, setFuel] = useState('Not stated');
    const [gearbox, setGearbox] = useState('Not stated');
    const [powertrain, setPowertrain] = useState('Not stated'); 
    const [avgFuelCons, setAvgFuelCons] = useState('Not stated');
    const [cityFuelCons, setCityFuelCons] = useState('Not stated');
    const [highwayFuelCons, setHighwayFuelCons] = useState('Not stated');
    const [gears, setGears] = useState('Not stated');

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
        standardSize: "20vw",
        mediumSize:   "30vw",
        smallSize:    "80vw"
    };

    const textInputFieldSizingWidth = {
        standardSize: "10vw",
        mediumSize:   "30vw",
        smallSize:    "70vw"
    };

    const textInputFieldSizingHeight = {
        standardSize: "2vw",
        mediumSize:   "4vw",
        smallSize:    "6vw"
    }

    const buttonSizingWidth = {
        standardSize: '5vw',
        mediumSize: '10vw',
        smallSize: '15vw'
    }
    
    const buttonSizingHeight = {
        standardSize: '3vw',
        mediumSize: '5vw',
        smallSize: '6vw'
    }

    const fetchFuelTypes = async () => {
        try {
            setFuelTypes(await APIMethods.getFuelTypes());
        } catch (error) {
            console.log(`[AddCarPage][EngineInfo][fetchFuelTypes][ERROR] - Cannot fetch fuel types. Stack trace message: ${error}`);
        }
    }

    const fetchGearboxTypes = async () => {
        try {
            setGearboxTypes(await APIMethods.getGearboxTypes());   
        } catch (error) {
            console.log(`[AddCarPage][EngineInfo][fetchFuelTypes][ERROR] - Cannot fetch gearbox types. Stack trace message: ${error}`);
        }
    }

    const fetchPowertrainTypes = async () => {
        try {
            setPowertrainTypes(await APIMethods.getPowertrainTypes());
        } catch (error) {
            console.log(`[AddCarPage][EngineInfo][fetchFuelTypes][ERROR] - Cannot fetch powertrain types. Stack trace message: ${error}`);    
        }
    }

    useEffect(() => {
        fetchFuelTypes();
        fetchGearboxTypes();
        fetchPowertrainTypes();
    }, []);

    const handlePowerChange = (e) => {
        if (e.length < enginePower.length) {
            setEnginePower(e);
            return;
        }

        // Handling numbers input
        if (e.charCodeAt(e.length - 1) > 47 && e.charCodeAt(e.length - 1) < 58) {
            setEnginePower(e);
        }

        if (!isNaN(parseInt(e)) && e.length === 4) {
            if (parseInt(e) > 2000) {
                setEnginePower('2000');
            }
        }
    }

    const handleDisplacementChange = (e) => {
        if (e.length < displacement.length) {
            setDisplacement(e);
            return;
        }

        // Handling numbers input
        if (e.charCodeAt(e.length - 1) > 47 && e.charCodeAt(e.length - 1) < 58) {
            setDisplacement(e);
        }

        if (!isNaN(parseInt(e)) && e.length === 5) {
            if (parseInt(e) > 20000) {
                setDisplacement('20000');
            }
        }
    }

    const handleFuelAvgConsumption = (e) => {
        if (e.length < displacement.length) {
            setAvgFuelCons(e);
            return;
        }
    }

    const handleFuelCityConsumption = (e) => {
        if (e.length < displacement.length) {
            setCityFuelCons(e);
            return;
        }
    }

    const handleFuelHighwayConsumption = (e) => {
        if (e.length < displacement.length) {
            setHighwayFuelCons(e);
            return;
        }
    }

    const handleSelectedFuel = (e) => {
        setFuel(e);
    }

    const handleSelectedGearbox = (e) => {
        setGearbox(e);
    }

    const handleSelectedPowertrain = (e) => {
        setPowertrain(e);
    }

    const handleGearsChange = (e) => {
        setGears(e);
    }

    const renderEnginePower = () => {
        return (
            <RangeSlider 
                sliderLabel={`Engine power: ${enginePower} kW`} 
                sliderWidth={rangeSliderSizingWidth} 
                changingValue={enginePower}
                minValue={'0'}
                maxValue={'2000'}
                step={'1'}
                onChangeHandler={(e) => handlePowerChange(e.target.value)}
            />
        );
    }

    const renderDisplacement = () => {
        return (
            <RangeSlider 
                sliderLabel={`Displacement: ${displacement} cm³`} 
                sliderWidth={rangeSliderSizingWidth} 
                changingValue={displacement}
                minValue={'0'}
                maxValue={'20000'}
                step={'1'}
                onChangeHandler={(e) => handleDisplacementChange(e.target.value)}
            />
        );
    }

    const renderFuelTypes = () => {
        return (
            <ComboBox label={'Fuel'} width={comboBoxSizingWidth} height={comboBoxSizingHeight} 
                optionValues={fuelTypes.map((fuelType, idx) => new Object({ key: idx, value: fuelType, textValue: fuelType}))}
                onChangeHandler={(e) => handleSelectedFuel(e.target.value)}
            />
        );
    }

    const renderFuelConsumption = () => {
        return (
            <>
                <div className='add-car-label'>Fuel consumption</div>
                <div className='add-car-label'>
                    <TextInputField 
                        width={textInputFieldSizingWidth} 
                        height={textInputFieldSizingHeight} 
                        type={'text'} 
                        textFieldValue={avgFuelCons}
                        onChangeHandler={(e) => handleFuelAvgConsumption(e.target.value)}
                        color={'#313131'}
                    />
                    l/100km (average)
                </div>
                <div className='add-car-label'>
                    <TextInputField 
                        width={textInputFieldSizingWidth} 
                        height={textInputFieldSizingHeight} 
                        type={'text'} 
                        textFieldValue={cityFuelCons}
                        onChangeHandler={(e) => handleFuelCityConsumption(e.target.value)}
                        color={'#313131'}
                    />
                    l/100km (city)
                </div>
                <div className='add-car-label'>
                    <TextInputField 
                        width={textInputFieldSizingWidth} 
                        height={textInputFieldSizingHeight} 
                        type={'text'} 
                        textFieldValue={highwayFuelCons}
                        onChangeHandler={(e) => handleFuelHighwayConsumption(e.target.value)}
                        color={'#313131'}
                    />
                    l/100km (highway)
                </div>
            </>
        )
    }

    const renderGearboxTypes = () => {
        return (
            <ComboBox label={'Gearbox'} width={comboBoxSizingWidth} height={comboBoxSizingHeight}
                optionValues={gearboxTypes.map((gearboxType, idx) => new Object({ key: idx, value: gearboxType, textValue: gearboxType }))}
                onChangeHandler={(e) => handleSelectedGearbox(e.target.value)}
            />
        );
    }

    const renderGears = () => {
        return (
            <>
                <div className='add-car-label'>Gears</div>
                <TextInputField 
                    width={textInputFieldSizingWidth} 
                    height={textInputFieldSizingHeight} 
                    type={'text'} 
                    textFieldValue={gears}
                    onChangeHandler={(e) => handleGearsChange(e.target.value)}
                    color={'#313131'}
                />
            </>
        )
    }

    const renderPowertrainTypes = () => {
        return (
            <ComboBox label={'Powertrain'} width={comboBoxSizingWidth} height={comboBoxSizingHeight}
                optionValues={powertrainTypes.map((powertrainType, idx) => new Object({ key: idx, value: powertrainType, textValue: powertrainType }))}
                onChangeHandler={(e) => handleSelectedPowertrain(e.target.value)}
            />
        );
    }

    return (
        <div className='add-car-engine-info-section'>
            <div className='add-car-engine-info-header'>Engine info</div>
            <div className="add-car-line-container"/>
            <div className='add-car-engine-info-row-wrapper'>
                <div className='add-car-engine-info-column-wrapper'>
                    {renderEnginePower()}
                    {renderDisplacement()}
                    {renderFuelTypes()}
                    {renderFuelConsumption()}
                    {renderGearboxTypes()}
                    {renderGears()}
                    {renderPowertrainTypes()}
                </div>
                <div className='add-car-engine-info-content-wrapper'>
                    <div className='add-car-engine-info-column-wrapper'>
                        <div className='add-car-engine-info-small-text-darker'>*Brand</div>
                        <div className='add-car-engine-info-small-text-darker'>*Model</div>
                        <div className='add-car-engine-info-small-text-darker'>Headline</div>
                        <div className='add-car-engine-info-small-text-darker'>*Mileage</div>
                        <div className='add-car-engine-info-small-text-darker'>*Registration</div>
                        <div className='add-car-engine-info-small-text-darker'>*Price</div>
                        <div className='add-car-engine-info-small-text-darker'>*Address</div>
                        <div className='add-car-engine-info-small-text-darker'>*Engine power</div>
                        <div className='add-car-engine-info-small-text-darker'>Displacement</div>
                        <div className='add-car-engine-info-small-text-darker'>*Fuel</div>
                        <div className='add-car-engine-info-small-text-darker'>Average fuel cons.</div>
                        <div className='add-car-engine-info-small-text-darker'>City fuel cons.</div>
                        <div className='add-car-engine-info-small-text-darker'>Highway fuel cons.</div>
                        <div className='add-car-engine-info-small-text-darker'>*Gearbox</div>
                        <div className='add-car-engine-info-small-text-darker'>Gears</div>
                        <div className='add-car-engine-info-small-text-darker'>*Powertrain</div>
                    </div>
                    <div className='add-car-engine-info-column-wrapper'>
                        <div className='add-car-engine-info-small-text'>{currentCarModel.brandId}</div>
                        <div className='add-car-engine-info-small-text'>{currentCarModel.modelId}</div>
                        <div className='add-car-engine-info-small-text'>{currentCarModel.header}</div>
                        <div className='add-car-engine-info-small-text'>{currentCarModel.mileage} km</div>
                        <div className='add-car-engine-info-small-text'>{currentCarModel.registration}</div>
                        <div className='add-car-engine-info-small-text'>{currentCarModel.price} €</div>
                        <div className='add-car-engine-info-small-text'>{currentCarModel.sellerAddress}</div>
                        <div className='add-car-engine-info-small-text'>{enginePower} kW</div>
                        <div className='add-car-engine-info-small-text'>{displacement} cm³</div>  
                        <div className='add-car-engine-info-small-text'>{fuel}</div>   
                        <div className='add-car-engine-info-small-text'>{avgFuelCons} l/100km</div>   
                        <div className='add-car-engine-info-small-text'>{cityFuelCons} l/100km</div>   
                        <div className='add-car-engine-info-small-text'>{highwayFuelCons} l/100km</div> 
                        <div className='add-car-engine-info-small-text'>{gearbox}</div>  
                        <div className='add-car-engine-info-small-text'>{gears}</div>  
                        <div className='add-car-engine-info-small-text'>{powertrain}</div>            
                    </div>        
                </div>
            </div>
            <div className='add-car-main-info-small-text-darker'>* necessary to fill</div>
            <Link
                style={{"textDecoration": "none"}}
                state={{
                    brandId: currentCarModel.brandId,
                    modelId: currentCarModel.modelId,
                    header: currentCarModel.header,
                    mileage: currentCarModel.mileage,
                    registration: currentCarModel.registration,
                    price: currentCarModel.price,
                    sellerAddress: currentCarModel.sellerAddress,
                    enginePower: enginePower,
                    engineDisplacement: displacement,
                    fuel: fuel,
                    fuelConsumptionAvg: avgFuelCons,
                    fuelConsumptionCity: cityFuelCons,
                    fuelConsumptionHighway: highwayFuelCons,
                    gearbox: gearbox,
                    gearboxGears: gears,
                    powertrain: powertrain
                }}
                to={'/addCar/additionalInfo'}
            >
                <RegularButton 
                    label={'Next'}
                    buttonWidth={buttonSizingWidth}
                    buttonHeight={buttonSizingHeight}
                />
            </Link>
        </div>           
    );
}

export default EngineInfo;