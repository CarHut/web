import '../../css/addcarpage/AdditionalInfo.css';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import nations from '../../resources/Nations'; 
import APIMethods from '../../api/APIMethods';
import ComboBox from '../maincomponents/ComboBox';
import TextInputField from '../maincomponents/TextInputField';
import RegularButton from '../maincomponents/RegularButton';

function AdditionalInfo() {

    const loc = useLocation();
    const currentCarModel = loc.state;

    const [previousOwners, setPreviousOwners] = useState('Not stated');
    const [energyEffClass, setEngergyEffClass] = useState('Not stated');
    const [emissionClass, setEmissionClass] = useState('Not stated');
    const [doors, setDoors] = useState('Not stated');
    const [seats, setSeats] = useState('Not stated');
    const [damage, setDamage] = useState('Not stated');
    const [parkSensors, setParkSensors] = useState('Not stated');
    const [parkCameras, setParkCameras] = useState('Not stated');
    const [countryOfOrigin, setCountryOfOrigin] = useState('Not stated');
    const [interiorColor, setInteriorColor] = useState('Not stated');
    const [exteriorColor, setExteriorColor] = useState('Not stated');
    const [emInspectionDate, setemInspectionDate] = useState('Not stated');
    const [techInspectionDate, setTechInspectionDate] = useState('Not stated');
    const [colors, setColors] = useState([]);

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
        standardSize: '6vw',
        mediumSize: '10vw',
        smallSize: '15vw'
    }
    
    const buttonSizingHeight = {
        standardSize: '3vw',
        mediumSize: '5vw',
        smallSize: '6vw'
    }

    const fetchColors = async () => {
        setColors(await APIMethods.getColors())
    }

    useEffect(() => {
        fetchColors();
    }, []);

    const handlePreviousOwnersChange = (e) => {
        setPreviousOwners(e);
    }

    const handleEnergyEffClassChange = (e) => {
        setEngergyEffClass(e);
    }

    const handleEmissionClassChange = (e) => {
        setEmissionClass(e);
    }

    const handleDoorsChange = (e) => {
        setDoors(e);
    }

    const handleSeatsChange = (e) => {
        setSeats(e);
    }

    const handleDamageChange = (e) => {
        setDamage(e);
    }

    const handleParkSensorsChange = (e) => {
        setParkSensors(e);
    }

    const handleParkCamerasChange = (e) => {
        setParkCameras(e);
    }

    const handleNationChange = (e) => {
        setCountryOfOrigin(e);
    }

    const handleTechInspection = (e) => {
        setTechInspectionDate(e);
    }

    const handleEmmInspection = (e) => {
        setemInspectionDate(e);
    }

    const handleExteriorColorChange = (e) => {
        setExteriorColor(e);
    }

    const handleInteriorColorChange = (e) => {
        setInteriorColor(e);
    }

    const renderColors = (type) => {
        const usedHandleFunction = type === 'exterior' ? (e) => handleExteriorColorChange(e.target.value) : (e) => handleInteriorColorChange(e.target.value);

        return (
            <form className='add-car-additional-info-form'>
                {colors.map((color, idx) => {
                    return (
                        <div className='add-car-label-additional-info'>
                            <input id={idx} type='radio' name='option' value={color.color} onClick={usedHandleFunction}/>
                            {color.color}
                        </div>
                    )
                })}
            </form>
        )
    }

    const renderInspectionDate = (type) => {
        const usedHandleFunction = type === 'technical' ? (e) => handleTechInspection(e.target.value) : (e) => handleEmmInspection(e.target.value);
        const val = type === 'technical' ? techInspectionDate : emInspectionDate;
    
        return (
            <>
                <div className='add-car-label'>Next {type} inspection</div>
                <input type='date' value={val} onChange={usedHandleFunction}/>
            </>
        )
    }

    const renderCountries = () => {
        return (
            <ComboBox label={'Country of origin'} width={comboBoxSizingWidth} height={comboBoxSizingHeight}
                optionValues={nations.map((nation, idx) => new Object({ key: idx, value: nation, textValue: nation }))}
                onChangeHandler={(e) => handleNationChange(e.target.value)}
            />
        );
    }

    const renderBooleanStatusRadioButtons = (type, label) => {
        let usedHandleFunction = null;
        switch (type) {
            case 'crashStatus':
                usedHandleFunction = (e) => handleDamageChange(e.target.value);     
                break;
            case 'parkingSensors':
                usedHandleFunction = (e) => handleParkSensorsChange(e.target.value);     
                break;
            case 'parkingCameras':
                usedHandleFunction = (e) => handleParkCamerasChange(e.target.value);     
                break;
            default:
                break;
        }

        return (
            <>
                <div className='add-car-label'>{label}</div>
                <form className='add-car-additional-info-form'>
                    <div className='add-car-label-additional-info'>
                        <input type='radio' name='option' value='Yes' onClick={usedHandleFunction}/>
                        Yes
                    </div>
                    <div className='add-car-label-additional-info'>
                        <input type='radio' name='option' value='No' onClick={usedHandleFunction}/>
                        No
                    </div>
                </form>
            </>
        )
    }

    const renderInputBox = (type, label) => {
        let val = 'null';
        let usedHandleFunction = null;

        switch (type) {
            case 'doors':
                usedHandleFunction = (e) => handleDoorsChange(e.target.value);
                val = doors;
                break;
            case 'seats':
                usedHandleFunction = (e) => handleSeatsChange(e.target.value);
                val = seats;
                break;
            case 'previousOwners':
                usedHandleFunction = (e) => handlePreviousOwnersChange(e.target.value);
                val = previousOwners;
                break;
            case 'energyEffClass':
                usedHandleFunction = (e) => handleEnergyEffClassChange(e.target.value);
                val = energyEffClass;
                break;
            case 'emClass':
                usedHandleFunction = (e) => handleEmissionClassChange(e.target.value);
                val = emissionClass;
                break;                
            default:
                break;
        }

        return (
            <>
                <div className='add-car-label'>{label}</div>
                <TextInputField
                    width={textInputFieldSizingWidth}
                    height={textInputFieldSizingHeight}
                    color={'#313131'}
                    type={'text'}
                    onChangeHandler={usedHandleFunction}
                    textFieldValue={val}
                /> 
            </>
        )
    }

    return (
        <div className='add-car-additional-info-section'>
            <div className='add-car-additional-info-header'>Additional info</div>
            <div className="add-car-line-container"/>
            <div className='add-car-additional-info-row-wrapper'>
                <div className='add-car-additional-info-column-wrapper'>
                    
                    <div className='add-car-label'>Exterior color</div>
                    {renderColors('exterior')}

                    <div className='add-car-label'>Interior color</div>
                    {renderColors('interior')}

                    {renderInspectionDate('technical')}
                    {renderInspectionDate('emission')}

                    {renderCountries()}

                    {renderBooleanStatusRadioButtons('crashStatus', 'Was car previously crashed?')}

                    {renderBooleanStatusRadioButtons('parkingSensors', 'Does your car have parking sensors?')}

                    {renderBooleanStatusRadioButtons('parkingCameras', 'Does your car have parking cameras?')}

                    {renderInputBox('doors', 'No. of doors')}
                    {renderInputBox('seats', 'No. of seats')}
                    {renderInputBox('previousOwners', 'No. of previous owners')}
                    {renderInputBox('energyEffClass', 'Energy efficiency class')}
                    {renderInputBox('emClass', 'Emission class')}
                    
                </div>
                <div className='add-car-additional-info-content-wrapper'>
                    <div className='add-car-additional-info-column-wrapper'>
                        <div className='add-car-additional-info-small-text-darker'>*Brand</div>
                        <div className='add-car-additional-info-small-text-darker'>*Model</div>
                        <div className='add-car-additional-info-small-text-darker'>Headline</div>
                        <div className='add-car-additional-info-small-text-darker'>*Mileage</div>
                        <div className='add-car-additional-info-small-text-darker'>*Registration</div>
                        <div className='add-car-additional-info-small-text-darker'>*Price</div>
                        <div className='add-car-additional-info-small-text-darker'>*Address</div>
                        <div className='add-car-additional-info-small-text-darker'>*Engine power</div>
                        <div className='add-car-additional-info-small-text-darker'>Displacement</div>
                        <div className='add-car-additional-info-small-text-darker'>*Fuel</div>
                        <div className='add-car-additional-info-small-text-darker'>Average fuel cons.</div>
                        <div className='add-car-additional-info-small-text-darker'>City fuel cons.</div>
                        <div className='add-car-additional-info-small-text-darker'>Highway fuel cons.</div>
                        <div className='add-car-additional-info-small-text-darker'>*Gearbox</div>
                        <div className='add-car-additional-info-small-text-darker'>Gears</div>
                        <div className='add-car-additional-info-small-text-darker'>*Powertrain</div>
                        <div className='add-car-additional-info-small-text-darker'>Exterior color</div>
                        <div className='add-car-additional-info-small-text-darker'>Interior color</div>
                        <div className='add-car-additional-info-small-text-darker'>Next tech. inspection date</div>
                        <div className='add-car-additional-info-small-text-darker'>Next em. inspection date</div>
                        <div className='add-car-additional-info-small-text-darker'>Country of origin</div>
                        <div className='add-car-additional-info-small-text-darker'>Damaged</div>
                        <div className='add-car-additional-info-small-text-darker'>Parking sensors</div>
                        <div className='add-car-additional-info-small-text-darker'>Parking cameras</div>
                        <div className='add-car-additional-info-small-text-darker'>Doors</div>
                        <div className='add-car-additional-info-small-text-darker'>Seats</div>
                        <div className='add-car-additional-info-small-text-darker'>No. of previous owners</div>
                        <div className='add-car-additional-info-small-text-darker'>Energy eff. class</div>
                        <div className='add-car-additional-info-small-text-darker'>Emission class</div>
                    </div>
                    <div className='add-car-additional-info-column-wrapper'>
                        <div className='add-car-additional-info-small-text'>{currentCarModel.brandId}</div>
                        <div className='add-car-additional-info-small-text'>{currentCarModel.modelId}</div>
                        <div className='add-car-additional-info-small-text'>{currentCarModel.header}</div>
                        <div className='add-car-additional-info-small-text'>{currentCarModel.mileage} km</div>
                        <div className='add-car-additional-info-small-text'>{currentCarModel.registration}</div>
                        <div className='add-car-additional-info-small-text'>{currentCarModel.price} €</div>
                        <div className='add-car-additional-info-small-text'>{currentCarModel.sellerAddress}</div>
                        <div className='add-car-additional-info-small-text'>{currentCarModel.enginelPower} kW</div>
                        <div className='add-car-additional-info-small-text'>{currentCarModel.engineDisplacement} cm³</div>  
                        <div className='add-car-additional-info-small-text'>{currentCarModel.fuel}</div>   
                        <div className='add-car-additional-info-small-text'>{currentCarModel.fuelConsumptionAvg} l/100km</div>   
                        <div className='add-car-additional-info-small-text'>{currentCarModel.fuelConsumptionCity} l/100km</div>   
                        <div className='add-car-additional-info-small-text'>{currentCarModel.fuelConsumptionHighway} l/100km</div> 
                        <div className='add-car-additional-info-small-text'>{currentCarModel.gearbox}</div>  
                        <div className='add-car-additional-info-small-text'>{currentCarModel.gearboxGears}</div>  
                        <div className='add-car-additional-info-small-text'>{currentCarModel.powertrain}</div>            
                        <div className='add-car-additional-info-small-text'>{exteriorColor}</div>
                        <div className='add-car-additional-info-small-text'>{interiorColor}</div>
                        <div className='add-car-additional-info-small-text'>{techInspectionDate}</div>
                        <div className='add-car-additional-info-small-text'>{emInspectionDate}</div>
                        <div className='add-car-additional-info-small-text'>{countryOfOrigin}</div>
                        <div className='add-car-additional-info-small-text'>{damage}</div>
                        <div className='add-car-additional-info-small-text'>{parkSensors}</div>
                        <div className='add-car-additional-info-small-text'>{parkCameras}</div>
                        <div className='add-car-additional-info-small-text'>{doors}</div>
                        <div className='add-car-additional-info-small-text'>{seats}</div>
                        <div className='add-car-additional-info-small-text'>{previousOwners}</div>
                        <div className='add-car-additional-info-small-text'>{energyEffClass}</div>
                        <div className='add-car-additional-info-small-text'>{emissionClass}</div>            
                        
                    </div>        
                </div>
            </div>
            <div className='add-car-main-info-small-text-darker'>* necessary to fill</div>
            <Link
                className='add-car-styled-button'
                style={{"textDecoration": "none"}}
                state={{
                    brandId: currentCarModel.brandId,
                    modelId: currentCarModel.modelId,
                    header: currentCarModel.header,
                    mileage: currentCarModel.mileage,
                    registration: currentCarModel.registration,
                    price: currentCarModel.price,
                    sellerAddress: currentCarModel.sellerAddress,
                    enginePower: currentCarModel.enginePower,
                    engineDisplacement: currentCarModel.engineDisplacement,
                    fuel: currentCarModel.fuel,
                    fuelConsumptionAvg: currentCarModel.fuelConsumptionAvg,
                    fuelConsumptionCity: currentCarModel.fuelConsumptionCity,
                    fuelConsumptionHighway: currentCarModel.fuelConsumptionHighway,
                    gearbox: currentCarModel.gearbox,
                    gearboxGears: currentCarModel.gearboxGears,
                    powertrain: currentCarModel.powertrain,
                    exteriorColorId: exteriorColor,
                    interiorColorId: interiorColor,
                    technicalInspectionDate: techInspectionDate,
                    emissionInspectionDate: emInspectionDate,
                    countryOfOrigin: countryOfOrigin,
                    damageStatus: damage,
                    parkingSensors: parkSensors,
                    parkingCameras: parkCameras,
                    doors: doors,
                    seats: seats,
                    previousOwners: previousOwners,
                    energyEffClass: energyEffClass,
                    emissionClass: emissionClass
                }}
                to={'/addCar/features'}
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

export default AdditionalInfo;