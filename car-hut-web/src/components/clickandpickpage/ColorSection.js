import '../../css/clickandpickpage/ColorSection.css';
import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { isCompositeComponent } from 'react-dom/test-utils';

function ColorSection() {

    const loc = useLocation();

    const colors = ["black", "silver", "gray", "white", "red", "purple", "green", "yellow", "navy", "blue", "beige", "brown", "darkorange", "gold", "powderblue", "sienna"];
    const [pickedColors, setPickedColors] = useState([]);

    const generateColorCheckboxes = () => {
        return colors.map((color, idx) => (
            <label className='custom-checkbox' key={idx}>
                <input onClick={() => handleClickedColor(color)} type="checkbox"/>
                <span className="checkmark" style={{"backgroundColor": color}}></span>
            </label>
        ));

    }

    const handleClickedColor = (color) => {
        const iseColorPicked = pickedColors.includes(color);
  
        if (iseColorPicked) {
            setPickedColors(pickedColors.filter((pickedColor) => pickedColor !== color));
        } else {
            setPickedColors([...pickedColors, color]);
        }
    }

    return (
        <div className='section-body-registration-section'>
            <div className='section-header-registration-section'>Pick color</div>
            <div className='line-container'/>
            <div className='color-wrapper'>
                {generateColorCheckboxes()}
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
                </div>
            </div>
            <div className='direction-buttons'>
                <Link
                    to={`/clickAndPickPage/gearbox`}
                    state={{
                        brands: loc.state.brands,
                        models: loc.state.models,
                        price: loc.state.price,
                        mileage: loc.state.mileage,
                        registration: loc.state.registration,
                        fuelType: loc.state.fuelType,
                        power: loc.state.power,
                        displacement: loc.state.displacement
                    }}
                >
                    <button className="styled-button">Gearbox</button>
                </Link>
                <Link
                    to={`/searchList`}
                    state={{
                        brands: loc.state.brands,
                        models: loc.state.models,
                        price: loc.state.price,
                        mileage: loc.state.mileage,
                        registration: loc.state.registration,
                        fuelType: loc.state.fuelType,
                        power: loc.state.power,
                        displacement: loc.state.displacement,
                        gearbox: loc.state.gearbox,
                        powertrain: '',
                        color: pickedColors
                    }}
                >
                    <button className="styled-button">Search results</button>
                </Link>
            </div>
        </div>
    );
}

export default ColorSection;