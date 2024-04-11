import { useEffect, useState } from 'react';
import '../../css/carofferpage/CarMainSection.css';
import Features from './Features';
import ImportantData from './ImportantData';
import MainInfoSection from './MainInfoSection';
import TechnicalData from './TechnicalData';
import MoreInfo from './MoreInfo';
import SellerInfo from './SellerInfo';

function CarMainSection({ carId }) {

    const [car, setCar] = useState({});

    useEffect(async () => {
        const url = `http://localhost:8080/api/getTempCarWithId?carId=${carId}`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        
        if (data !== null) {
            setCar(data);
        }
        console.log(data);
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