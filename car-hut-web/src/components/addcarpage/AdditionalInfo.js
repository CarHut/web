import '../../css/addcarpage/AdditionalInfo.css';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import nations from '../../resources/Nations'; 
import APIMethods from '../../api/APIMethods';

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

    return (
        <div className='add-car-additional-info-section'>
            <div className='add-car-additional-info-header'>Additional info</div>
            <div className="line-container"/>
            <div className='add-car-additional-info-row-wrapper'>
                <div className='add-car-additional-info-column-wrapper'>
                    
                    <div className='label'>Exterior color</div>
                    <form className='add-car-additional-info-form'>
                        {colors.map((color, idx) => {
                            return (
                                <div className='add-car-label-additional-info'>
                                    <input id={idx} type='radio' name='option' value={color.color} onClick={(e) => handleExteriorColorChange(e.target.value)}/>
                                    {color.color}
                                </div>
                            )
                        })}
                    </form>

                    <div className='label'>Interior color</div>
                    <form className='add-car-additional-info-form'>
                        {colors.map((color, idx) => {
                            return (
                                <div className='add-car-label-additional-info'>
                                    <input id={idx} type='radio' name='option' value={color.color} onClick={(e) => handleInteriorColorChange(e.target.value)}/>
                                    {color.color}
                                </div>
                            )
                        })}
                    </form>

                    <div className='label'>Next technical inspection</div>
                    <input type='date' value={techInspectionDate} onChange={(e) => handleTechInspection(e.target.value)}/>

                    <div className='label'>Next emission inspection</div>
                    <input type='date' value={emInspectionDate} onChange={(e) => handleEmmInspection(e.target.value)}/>

                    <div className='add-car-engine-info-combobox-entity'>
                        <div className='label'>Country of origin</div>
                        <div className="add-car-engine-info-custom-combobox">
                            <select id="brandComboBox" className='add-car-engine-info-myComboBox' value={countryOfOrigin} onChange={(e) => handleNationChange(e.target.value)}>
                                <option value="all" disabled></option>
                                {nations.map((nation, idx) => (
                                    <option key={idx} value={nation}>{nation}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='label'>Was car previously crashed?</div>
                    <form className='add-car-additional-info-form'>
                        <div className='add-car-label-additional-info'>
                            <input type='radio' name='option' value='Yes' onClick={(e) => handleDamageChange(e.target.value)}/>
                            Yes
                        </div>
                        <div className='add-car-label-additional-info'>
                            <input type='radio' name='option' value='No' onClick={(e) => handleDamageChange(e.target.value)}/>
                            No
                        </div>
                    </form>

                    <div className='label'>Does your car have parking sensors?</div>
                    <form className='add-car-additional-info-form'>
                        <div className='add-car-label-additional-info'>
                            <input type='radio' name='option' value='Yes' onClick={(e) => handleParkSensorsChange(e.target.value)}/>
                            Yes
                        </div>
                        <div className='add-car-label-additional-info'>
                            <input type='radio' name='option' value='No' onClick={(e) => handleParkSensorsChange(e.target.value)}/>
                            No
                        </div>
                    </form>

                    <div className='label'>Does your car have parking cameras?</div>
                    <form className='add-car-additional-info-form'>
                        <div className='add-car-label-additional-info'>
                            <input type='radio' name='option' value='Yes' onClick={(e) => handleParkCamerasChange(e.target.value)}/>
                            Yes
                        </div>
                        <div className='add-car-label-additional-info'>
                            <input type='radio' name='option' value='No' onClick={(e) => handleParkCamerasChange(e.target.value)}/>
                            No
                        </div>
                    </form>

                    <div className='label'>No. of doors</div>
                    <input className='add-car-additional-info-text-input' style={{"margin": "1em 1em"}} type='text' placeholder='' value={doors} onChange={(e) => handleDoorsChange(e.target.value)} pattern='[0-9]'/>
                                        
                    <div className='label'>No. of seats</div>
                    <input className='add-car-additional-info-text-input' style={{"margin": "1em 1em"}} type='text' placeholder='' value={seats} onChange={(e) => handleSeatsChange(e.target.value)} pattern='[0-9]'/>
                    
                    <div className='label'>No. of previous owners</div>
                    <input className='add-car-additional-info-text-input' style={{"margin": "1em 1em"}} type='text' placeholder='' value={previousOwners} onChange={(e) => handlePreviousOwnersChange(e.target.value)} pattern='[0-9]'/>
                    
                    <div className='label'>Energy efficiency class</div>
                    <input className='add-car-additional-info-text-input' style={{"margin": "1em 1em"}} type='text' placeholder='' value={energyEffClass} onChange={(e) => handleEnergyEffClassChange(e.target.value)} pattern='[0-9]'/>
                
                    
                    <div className='label'>Emission class</div>
                    <input className='add-car-additional-info-text-input' style={{"margin": "1em 1em"}} type='text' placeholder='' value={emissionClass} onChange={(e) => handleEmissionClassChange(e.target.value)} pattern='[0-9]'/>
                </div>
                <div className='add-car-engine-info-content-wrapper'>
                    <div className='add-car-engine-info-column-wrapper'>
                        <div className='add-car-engine-info-small-text-darker'>*Brand</div>
                        <div className='add-car-engine-info-small-text-darker'>*Model</div>
                        <div className='add-car-engine-info-small-text-darker'>Headline</div>
                        <div className='add-car-engine-info-small-text-darker'>*Mileage</div>
                        <div className='add-car-engine-info-small-text-darker'>*Registration</div>
                        <div className='add-car-engine-info-small-text-darker'>*Engine power</div>
                        <div className='add-car-engine-info-small-text-darker'>Displacement</div>
                        <div className='add-car-engine-info-small-text-darker'>*Fuel</div>
                        <div className='add-car-engine-info-small-text-darker'>Average fuel cons.</div>
                        <div className='add-car-engine-info-small-text-darker'>City fuel cons.</div>
                        <div className='add-car-engine-info-small-text-darker'>Highway fuel cons.</div>
                        <div className='add-car-engine-info-small-text-darker'>*Gearbox</div>
                        <div className='add-car-engine-info-small-text-darker'>Gears</div>
                        <div className='add-car-engine-info-small-text-darker'>*Powertrain</div>
                        <div className='add-car-engine-info-small-text-darker'>Exterior color</div>
                        <div className='add-car-engine-info-small-text-darker'>Interior color</div>
                        <div className='add-car-engine-info-small-text-darker'>Next tech. inspection date</div>
                        <div className='add-car-engine-info-small-text-darker'>Next em. inspection date</div>
                        <div className='add-car-engine-info-small-text-darker'>Country of origin</div>
                        <div className='add-car-engine-info-small-text-darker'>Damaged</div>
                        <div className='add-car-engine-info-small-text-darker'>Parking sensors</div>
                        <div className='add-car-engine-info-small-text-darker'>Parking cameras</div>
                        <div className='add-car-engine-info-small-text-darker'>Doors</div>
                        <div className='add-car-engine-info-small-text-darker'>Seats</div>
                        <div className='add-car-engine-info-small-text-darker'>No. of previous owners</div>
                        <div className='add-car-engine-info-small-text-darker'>Energy eff. class</div>
                        <div className='add-car-engine-info-small-text-darker'>Emission class</div>
                    </div>
                    <div className='add-car-engine-info-column-wrapper'>
                        <div className='add-car-engine-info-small-text'>{currentCarModel.brand}</div>
                        <div className='add-car-engine-info-small-text'>{currentCarModel.model}</div>
                        <div className='add-car-engine-info-small-text'>{currentCarModel.header}</div>
                        <div className='add-car-engine-info-small-text'>{currentCarModel.mileage} km</div>
                        <div className='add-car-engine-info-small-text'>{currentCarModel.registration}</div>
                        <div className='add-car-engine-info-small-text'>{currentCarModel.enginePower} kW</div>
                        <div className='add-car-engine-info-small-text'>{currentCarModel.displacement} cm³</div>  
                        <div className='add-car-engine-info-small-text'>{currentCarModel.fuel}</div>   
                        <div className='add-car-engine-info-small-text'>{currentCarModel.avgFuelCons} l/100km</div>   
                        <div className='add-car-engine-info-small-text'>{currentCarModel.cityFuelCons} l/100km</div>   
                        <div className='add-car-engine-info-small-text'>{currentCarModel.highwayFuelCons} l/100km</div> 
                        <div className='add-car-engine-info-small-text'>{currentCarModel.gearbox}</div>  
                        <div className='add-car-engine-info-small-text'>{currentCarModel.gearboxGears}</div>  
                        <div className='add-car-engine-info-small-text'>{currentCarModel.powertrain}</div>            
                        <div className='add-car-engine-info-small-text'>{exteriorColor}</div>
                        <div className='add-car-engine-info-small-text'>{interiorColor}</div>
                        <div className='add-car-engine-info-small-text'>{techInspectionDate}</div>
                        <div className='add-car-engine-info-small-text'>{emInspectionDate}</div>
                        <div className='add-car-engine-info-small-text'>{countryOfOrigin}</div>
                        <div className='add-car-engine-info-small-text'>{damage}</div>
                        <div className='add-car-engine-info-small-text'>{parkSensors}</div>
                        <div className='add-car-engine-info-small-text'>{parkCameras}</div>
                        <div className='add-car-engine-info-small-text'>{doors}</div>
                        <div className='add-car-engine-info-small-text'>{seats}</div>
                        <div className='add-car-engine-info-small-text'>{previousOwners}</div>
                        <div className='add-car-engine-info-small-text'>{energyEffClass}</div>
                        <div className='add-car-engine-info-small-text'>{emissionClass}</div>            
                        
                    </div>        
                </div>
            </div>
            <div className='add-car-main-info-small-text-darker'>* necessary to fill</div>
            <Link
                className='add-car-styled-button'
                style={{"textDecoration": "none"}}
                state={{
                    brand: currentCarModel.brand,
                    model: currentCarModel.model,
                    header: currentCarModel.header,
                    mileage: currentCarModel.mileage,
                    registration: currentCarModel.registration,
                    enginePower: currentCarModel.enginePower,
                    displacement: currentCarModel.displacement,
                    fuel: currentCarModel.fuel,
                    avgFuelCons: currentCarModel.avgFuelCons,
                    cityFuelCons: currentCarModel.cityFuelCons,
                    highwayFuelCons: currentCarModel.highwayFuelCons,
                    gearbox: currentCarModel.gearbox,
                    gearboxGears: currentCarModel.gearboxGears,
                    powertrain: currentCarModel.powertrain,
                    exteriorColor: exteriorColor,
                    interiorColor: interiorColor,
                    techInspectionDate: techInspectionDate,
                    emInspectionDate: emInspectionDate,
                    countryOfOrigin: countryOfOrigin,
                    damage: damage,
                    parkSensors: parkSensors,
                    parkCameras: parkCameras,
                    doors: doors,
                    seats: seats,
                    previousOwners: previousOwners,
                    energyEffClass: energyEffClass,
                    emissionClass: emissionClass
                }}
                to={'/addCar/features'}
            >
                Next
            </Link>
        </div>
    );
}

export default AdditionalInfo;