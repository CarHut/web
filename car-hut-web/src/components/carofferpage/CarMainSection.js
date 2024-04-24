import { useEffect, useState } from 'react';
import '../../css/carofferpage/CarMainSection.css';
import Features from './Features';
import ImportantData from './ImportantData';
import MainInfoSection from './MainInfoSection';
import TechnicalData from './TechnicalData';
import MoreInfo from './MoreInfo';
import SellerInfo from './SellerInfo';
import APIMethods from '../../api/APIMethods';

function CarMainSection({ carId }) {

    const [car, setCar] = useState({});

    const fetchCar = async (carId) => {
        const data = await APIMethods.getCarWithId(carId);
        setCar(data);
    } 

    useEffect(() => {
        fetchCar(carId);
    }, [carId]);

    return (
        <div className='section-body-car-main-section'>
            <MainInfoSection car={car}/>
            <ImportantData car={car}/>
            <div className='car-main-section-split-wrapper'>
                <TechnicalData car={car}/>
                <Features/>
            </div>
            <MoreInfo car={car}/>
            <SellerInfo car={car}/>
        </div>
    );
}

export default CarMainSection;