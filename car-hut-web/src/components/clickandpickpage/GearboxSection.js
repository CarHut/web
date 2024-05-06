import '../../css/clickandpickpage/GearboxSection.css';
import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import APIMethods from '../../api/APIMethods';

function GearboxSection() {

    var loc = useLocation();

    const [baseGearboxTypes, setBaseGearboxTypes] = useState([]);
    const [gearboxType, setGearboxType] = useState('');

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
        const isGearboxTypePicked = gearboxType.includes(gearboxType);

        if (isGearboxTypePicked) {
            setGearboxType(gearboxType.filter((type) => type !== gearboxType))
        } else {
            setGearboxType([...gearboxType, gearboxType]);
        }
    }

    const fetchGearboxTypes = async () => {
        const data = await APIMethods.getGearboxTypes();

        if (data === null) {
            return;
        }

        setBaseGearboxTypes(data);
    }

    useEffect(() => {
        fetchGearboxTypes();
    }, [])

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
                        models: loc.state.models,
                        price: loc.state.price,
                        mileage: loc.state.mileage,
                        registration: loc.state.registration
                    }}
                >
                    <button className="styled-button">Engine</button>
                </Link>
                <Link
                    to={`/clickAndPickPage/color`}
                    state={{
                        brands: loc.state.brands,
                        models: loc.state.models,
                        price: loc.state.price,
                        mileage: loc.state.mileage,
                        registration: loc.state.registration,
                        fuelType: loc.state.fuelType,
                        power: loc.state.power,
                        displacement: loc.state.displacement,
                        gearbox: gearboxType
                    }}
                >
                    <button className="styled-button">Color</button>
                </Link>
            </div>
        </div>
    );
}

export default GearboxSection;