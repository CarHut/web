import '../../css/clickandpickpage/GearboxSection.css';
import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';

function GearboxSection() {

    var loc = useLocation();

    // UPDATE IF NEW GEARBOX TYPE IS ADDED
    const baseGearboxTypes = ["Manual", "Automatic", "Sequential"];

    const [gearboxTypes, setGearboxTypes] = useState([]);

    const generateGearboxTypeCheckboxes = () => {
        return baseGearboxTypes.map((fuelType) => (
            <div className='model-line' key={fuelType}>
                <label className='custom-checkbox'>
                    <input onClick={() => handleClickedGearboxType(fuelType)} type="checkbox"/>
                    <span className="checkmark"></span>
                </label>
                <div className='model-label'>{fuelType}</div>
            </div>
        ));
    }

    const handleClickedGearboxType = (gearboxType) => {
        const isGearboxTypePicked = gearboxTypes.includes(gearboxType);

        if (isGearboxTypePicked) {
            setGearboxTypes(gearboxTypes.filter((type) => type !== gearboxType))
        } else {
            setGearboxTypes([...gearboxTypes, gearboxType]);
        }
    }

    return (
        <div className='section-body-gearbox-section'>
            <div className='section-header-gearbox-section'>Pick gearbox type</div>
            <div className="line-container"/>
            <div className='gearbox-wrapper'>
                {generateGearboxTypeCheckboxes()}
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
                    to={`/clickAndPickPage/engine`}
                    state={{
                        brands: loc.state.brands,
                        models: loc.state.pickedModels,
                        price: loc.state.price,
                        mileage: loc.state.mileage,
                        registration: loc.state.registration
                    }}
                >
                    <button className="styled-button">Engine</button>
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
                        enginePower: loc.state.enginePower,
                        displacement: loc.state.displacement,
                        gearbox: gearboxTypes
                    }}
                >
                    <button className="styled-button">unknown</button>
                </Link>
            </div>
        </div>
    );
}

export default GearboxSection;