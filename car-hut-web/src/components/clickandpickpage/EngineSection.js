import '../../css/clickandpickpage/EngineSection.css'
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function EngineSection() {
    
    var loc = useLocation();

    const [fromEnginePower, setFromEnginePower] = useState(); 
    const [toEnginePower, setToEnginePower] = useState();
    const [fromDisplacement, setFromDisplacement] = useState();
    const [toDisplacement, setToDisplacement] = useState();
    

    const handleFromEnginePowerChange = (e) => {
        setFromEnginePower(e.target.value);
    };

    const handleToEnginePowerChange = (e) => {
        setToEnginePower(e.target.value);
    };

    const handleFromDisplacementChange = (e) => {
        setFromDisplacement(e.target.value)
    }

    const handleToDisplacementChange = (e) => {
        setToDisplacement(e.target.value)
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
                        <label htmlFor="fromRegistration">Engine power (from): {fromEnginePower} kW</label>
                        <input
                            type="range"
                            id="fromEnginePower"
                            name="fromEnginePower"
                            min="0"
                            max="1200"
                            step="1"
                            value={fromEnginePower}
                            onChange={handleFromEnginePowerChange}
                        />
                    </div>
                    <div className="registration-slider-container">
                        <label htmlFor="toRegistration">Engine power (To): {toEnginePower} kW</label>
                        <input
                            type="range"
                            id="toEnginePower"
                            name="toEnginePower"
                            min="0"
                            max="1200"
                            step="1"
                            value={toEnginePower}
                            onChange={handleToEnginePowerChange}
                        />
                    </div>
                </div>
                <div className='label-engine-section'>Displacement</div>
                <div className='line-container'/>
                <div className='displacement-wrapper'>
                    <div className="registration-slider-container">
                        <label htmlFor="fromRegistration">Displacement (from): {fromDisplacement} cm³</label>
                        <input
                            type="range"
                            id="fromDisplacement"
                            name="fromDisplacement"
                            min="200"
                            max="10000"
                            step="1"
                            value={fromDisplacement}
                            onChange={handleFromDisplacementChange}
                        />
                    </div>
                    <div className="registration-slider-container">
                        <label htmlFor="toRegistration">Displacement (To): {toDisplacement} cm³</label>
                        <input
                            type="range"
                            id="toDisplacement"
                            name="toDisplacement"
                            min="200"
                            max="10000"
                            step="1"
                            value={toDisplacement}
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
                        models: loc.state.pickedModels,
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
                        models: loc.state.pickedModels,
                        price: loc.state.price,
                        mileage: loc.state.mileage,
                        registration: loc.state.registration,
                        fuel: loc.state.fuel,
                        enginePower: {
                            fromEnginePower: fromEnginePower, toEnginePower: toEnginePower
                        },
                        displacement: {
                            fromDisplacement: fromDisplacement, toDisplacement: toDisplacement
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