import '../../css/clickandpickpage/RegistrationSection.css'
import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';

function RegistrationSection() {
    var loc = useLocation();

    const [fromRegistration, setFromRegistration] = useState(); 
    const [toRegistration, setToRegistration] = useState();

    const handleFromRegistrationChange = (e) => {
        setFromRegistration(e.target.value);
    };

    const handleToRegistrationChange = (e) => {
        setToRegistration(e.target.value);
    };

    return (
        <div className='section-body-registration-section'>
            <div className='section-header-registration-section'>Pick registration: {fromRegistration} - {toRegistration} </div>
            <div className="line-container"/>
            <div className='registration-wrapper'>
                <div className="registration-slider-container">
                    <label htmlFor="fromRegistration">Registration (from): {fromRegistration}</label>
                    <input
                        type="range"
                        id="fromRegistration"
                        name="fromRegistration"
                        min="1900"
                        max="2024"
                        step="1"
                        value={fromRegistration}
                        onChange={handleFromRegistrationChange}
                    />
                </div>
                <div className="registration-slider-container">
                    <label htmlFor="toRegistration">Registration (To): {toRegistration}</label>
                    <input
                        type="range"
                        id="toRegistration"
                        name="toRegistration"
                        min="1900"
                        max="2024"
                        step="1"
                        value={toRegistration}
                        onChange={handleToRegistrationChange}
                    />
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
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                </div>
            </div>
            <div className="progress-bar-label">{"Mileage  <  Registration  >  "}</div>
            <Link
                to={`/clickAndPickPage/registration`}
                state={{
                    brands: loc.state.brands,
                    models: loc.state.pickedModels,
                    price: loc.state.price,
                    price: loc.state.mileage,
                    registration: {
                        fromRegistration: fromRegistration, toRegistration: toRegistration
                    } 
                }}
                className="next-button"
            >
                <button className="styled-button">Next</button>
            </Link>
        </div>
    );
}

export default RegistrationSection;