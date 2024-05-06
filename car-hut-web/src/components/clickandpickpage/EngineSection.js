import '../../css/clickandpickpage/EngineSection.css'
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function EngineSection() {
    
    var loc = useLocation();

    const [powerFrom, setPowerFrom] = useState(''); 
    const [powerTo, setPowerTo] = useState('');
    const [displacementFrom, setDisplacementFrom] = useState('');
    const [displacementTo, setDisplacementTo] = useState('');
    

    const handleFromEnginePowerChange = (e) => {
        setPowerFrom(e.target.value);
    };

    const handleToEnginePowerChange = (e) => {
        setPowerTo(e.target.value);
    };

    const handleFromDisplacementChange = (e) => {
        setDisplacementFrom(e.target.value)
    }

    const handleToDisplacementChange = (e) => {
        setDisplacementTo(e.target.value)
    }

    return (
        <div className='section-body-engine-section'>
            <div className='section-header-engine-section'>Pick engine specifications</div>
            <div className="line-container"/>
            <div className='engine-wrapper'>
                <div className='label-engine-section'>Engine power</div>
                <div className='line-container'/>
                <div className='engine-power-wrapper'>
                    <div className="registration-slider-container">
                        <label htmlFor="fromRegistration">Engine power (from): {powerFrom} kW</label>
                        <input
                            type="range"
                            id="powerFrom"
                            name="powerFrom"
                            min="0"
                            max="1200"
                            step="1"
                            value={powerFrom}
                            onChange={handleFromEnginePowerChange}
                        />
                    </div>
                    <div className="registration-slider-container">
                        <label htmlFor="toRegistration">Engine power (To): {powerTo} kW</label>
                        <input
                            type="range"
                            id="powerTo"
                            name="powerTo"
                            min="0"
                            max="1200"
                            step="1"
                            value={powerTo}
                            onChange={handleToEnginePowerChange}
                        />
                    </div>
                </div>
                <div className='label-engine-section'>Displacement</div>
                <div className='line-container'/>
                <div className='displacement-wrapper'>
                    <div className="registration-slider-container">
                        <label htmlFor="fromRegistration">Displacement (from): {displacementFrom} cm³</label>
                        <input
                            type="range"
                            id="displacementFrom"
                            name="displacementFrom"
                            min="200"
                            max="10000"
                            step="1"
                            value={displacementFrom}
                            onChange={handleFromDisplacementChange}
                        />
                    </div>
                    <div className="registration-slider-container">
                        <label htmlFor="toRegistration">Displacement (To): {displacementTo} cm³</label>
                        <input
                            type="range"
                            id="displacementTo"
                            name="displacementTo"
                            min="200"
                            max="10000"
                            step="1"
                            value={displacementTo}
                            onChange={handleToDisplacementChange}
                        />
                    </div>
                </div>
            </div>
            <div className="click-and-pick-progress-bar">
                <div className="progress-bar-content">
                    <div className="progress-bar-sphere-traversed"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere-traversed"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere-traversed"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere-traversed"/>
                    <div className="progress-bar-line"/>
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
                </div>
            </div>
            <div className='direction-buttons'>
                <Link
                    to={`/clickAndPickPage/fuel`}
                    state={{
                        brands: loc.state.brands,
                        models: loc.state.models,
                        price: loc.state.price,
                        mileage: loc.state.mileage,
                        registration: loc.state.registration
                    }}
                >
                    <button className="styled-button">Fuel</button>
                </Link>
                <Link
                    to={`/clickAndPickPage/gearbox`}
                    state={{
                        brands: loc.state.brands,
                        models: loc.state.models,
                        price: loc.state.price,
                        mileage: loc.state.mileage,
                        registration: loc.state.registration,
                        fuelType: loc.state.fuelType,
                        power: {
                            powerFrom: powerFrom, powerTo: powerTo
                        },
                        displacement: {
                            displacementFrom: displacementFrom, displacementTo: displacementTo
                        }
                    }}
                >
                    <button className="styled-button">Gearbox</button>
                </Link>
            </div>
        </div>
    );
}

export default EngineSection;