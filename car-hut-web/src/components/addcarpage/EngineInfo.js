import APIMethods from '../../api/APIMethods';
import '../../css/addcarpage/EngineInfo.css';
import { useEffect, useState } from 'react';

function EngineInfo() {

    const [fuelTypes, setFuelTypes] = useState([]);
    const [gearboxTypes, setGearboxTypes] = useState([]);
    const [powertrainTypes, setPowertrainTypes] = useState([]);

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

    return (
        <div className='add-car-engine-info-section'>
            <div className='add-car-engine-info-header'>Engine info</div>
            <div className="line-container"/>
            <div className='add-car-engine-info-row-wrapper'>
                <div className='add-car-main-info-column-wrapper'>

                </div>
            </div>
        </div>           
    );
}

export default EngineInfo;