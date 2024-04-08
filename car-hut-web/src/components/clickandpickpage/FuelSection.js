import '../../css/clickandpickpage/FuelSection.css';
import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';

function FuelSection() {
    var loc = useLocation();

    // UPDATE IF NEW FUEL TYPE IS ADDED
    const baseFuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "LPG", "Ethanol", "Plug-in-hybrid"];

    const [fuelType, setFuelType] = useState('');

    const generateFuelTypeCheckboxes = () => {
        return baseFuelTypes.map((fuelType) => (
            <div className='model-line' key={fuelType}>
                <label className='custom-checkbox'>
                    <input onClick={() => handleClickedFuelType(fuelType)} type="checkbox"/>
                    <span className="checkmark"></span>
                </label>
                <div className='model-label'>{fuelType}</div>
            </div>
        ));
    }

    const handleClickedFuelType = (fuelType) => {
        const isFuelTypePicked = fuelType.includes(fuelType);

        if (isFuelTypePicked) {
            setFuelType(fuelType.filter((type) => type !== fuelType))
        } else {
            setFuelType([...fuelType, fuelType]);
        }
    }
 
    return (
        <div className='section-body-fuel-section'>
            <div className='section-header-fuel-section'>Pick fuel type</div>
            <div className="line-container"/>
            <div className='fuel-wrapper'>
                {generateFuelTypeCheckboxes()}
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
                </div>
            </div>
            <div className='direction-buttons'>
                <Link
                    to={`/clickAndPickPage/registration`}
                    state={{
                        brands: loc.state.brands,
                        models: loc.state.models,
                        price: loc.state.price,
                        mileage: loc.state.mileage
                    }}
                >
                    <button className="styled-button">Registration</button>
                </Link>
                <Link
                    to={`/clickAndPickPage/engine`}
                    state={{
                        brands: loc.state.brands,
                        models: loc.state.models,
                        price: loc.state.price,
                        mileage: loc.state.mileage,
                        registration: loc.state.registration,
                        fuelType: fuelType 
                    }}
                >
                    <button className="styled-button">Engine</button>
                </Link>
            </div>
        </div>
    );

}

export default FuelSection;