import { useLocation } from 'react-router-dom';
import APIMethods from '../../api/APIMethods';
import '../../css/addcarpage/EngineInfo.css';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';

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

    const fetchFuelTypes = async () => {
        setFuelTypes(await APIMethods.getFuelTypes());
    }

    const fetchGearboxTypes = async () => {
        setGearboxTypes(await APIMethods.getGearboxTypes());
    }

    const fetchPowertrainTypes = async () => {
        setPowertrainTypes(await APIMethods.getPowertrainTypes());
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
            <div className="add-car-engine-power-slider-container">
                <div className='add-car-label' htmlFor="enginePower" style={{"display": "flex", "alignItems": "center"}}>Engine power*: <input className='add-car-engine-info-text-input' style={{"margin": "0 1em"}} maxLength='4' type='text' placeholder='' value={enginePower} onChange={(e) => handlePowerChange(e.target.value)} pattern='[0-9]'/> kW</div>
                <input
                    type="range"
                    id="enginePower"
                    name="enginePower"
                    min="0"
                    max="2000"
                    step="1"
                    value={enginePower}
                    onChange={(e) => handlePowerChange(e.target.value)}
                />
            </div>
        )
    }

    const renderDisplacement = () => {
        return (
            <div className="add-car-displacement-slider-container">
                <div className='add-car-label' htmlFor="displacement" style={{"display": "flex", "alignItems": "center"}}>Displacement*: <input className='add-car-engine-info-text-input' style={{"margin": "0 1em"}} maxLength='5' type='text' placeholder='' value={displacement} onChange={(e) => handleDisplacementChange(e.target.value)} pattern='[0-9]'/> cm³</div>
                <input
                    type="range"
                    id="displacement"
                    name="displacement"
                    min="0"
                    max="20000"
                    step="1"
                    value={displacement}
                    onChange={(e) => handleDisplacementChange(e.target.value)}
                />
            </div>
        )
    }

    const renderFuelTypes = () => {
        return (
            <div className='add-car-engine-info-combobox-entity'>
                <div className='add-car-label'>Fuel*</div>
                <div className="add-car-engine-info-custom-combobox">
                    <select id="brandComboBox" className='add-car-engine-info-myComboBox' value={fuel} onChange={(e) => handleSelectedFuel(e.target.value)}>
                        <option value="all" disabled>Select fuel type</option>
                        {fuelTypes.map((fuel, idx) => (
                            <option key={idx} value={fuel}>{fuel}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }

    const renderFuelConsumption = () => {
        return (
            <>
                <div className='add-car-label'>Fuel consumption</div>
                <div className='add-car-label'><input className='add-car-engine-info-text-input' style={{"margin": "1em 1em"}} type='text' placeholder='' value={avgFuelCons} onChange={(e) => handleFuelAvgConsumption(e.target.value)} pattern='[0-9]'/>l/100km (average)</div>
                <div className='add-car-label'><input className='add-car-engine-info-text-input' style={{"margin": "1em 1em"}} type='text' placeholder='' value={cityFuelCons} onChange={(e) => handleFuelCityConsumption(e.target.value)} pattern='[0-9]'/>l/100km (city)</div>
                <div className='add-car-label'><input className='add-car-engine-info-text-input' style={{"margin": "1em 1em"}} type='text' placeholder='' value={highwayFuelCons} onChange={(e) => handleFuelHighwayConsumption(e.target.value)} pattern='[0-9]'/>l/100km (highway)</div>     
            </>
        )
    }

    const renderGearboxTypes = () => {
        return (
            <div className='add-car-engine-info-combobox-entity'>
                <div className='add-car-label'>Gearbox*</div>
                <div className="add-car-engine-info-custom-combobox">
                    <select id="brandComboBox" className='add-car-engine-info-myComboBox' value={gearbox} onChange={(e) => handleSelectedGearbox(e.target.value)}>
                        <option value="all" disabled>Select gearbox</option>
                        {gearboxTypes.map((gearbox, idx) => (
                            <option key={idx} value={gearbox}>{gearbox}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }

    const renderGears = () => {
        return (
            <>
                <div className='add-car-label'>Gears</div>
                <input className='add-car-engine-info-text-input' style={{"margin": "1em 1em"}} type='text' placeholder='' value={gears} onChange={(e) => handleGearsChange(e.target.value)} pattern='[0-9]'/>    
            </>
        )
    }

    const renderPowertrainTypes = () => {
        return (
            <div className='add-car-engine-info-combobox-entity'>
                <div className='add-car-label'>Powertrain*</div>
                <div className="add-car-engine-info-custom-combobox">
                    <select id="brandComboBox" className='add-car-engine-info-myComboBox' value={powertrain} onChange={(e) => handleSelectedPowertrain(e.target.value)}>
                        <option value="all" disabled>Select powertrain</option>
                        {powertrainTypes.map((powertrain, idx) => (
                            <option key={idx} value={powertrain}>{powertrain}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
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
                Next
            </Link>
        </div>           
    );
}

export default EngineInfo;