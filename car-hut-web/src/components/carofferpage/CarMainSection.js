import { useEffect, useState } from 'react';
import '../../css/carofferpage/CarMainSection.css';
import Features from './Features';
import ImportantData from './ImportantData';
import MainInfoSection from './MainInfoSection';
import TechnicalData from './TechnicalData';
import MoreInfo from './MoreInfo';
import SellerInfo from './SellerInfo';
import APIMethods from '../../api/APIMethods';

function CarMainSection({ carId, carModel }) {
    const [car, setCar] = useState();

    const fetchCar = async () => {
        if (carId === null) {
            setCar(carModel);
        } else {
            try {   
                const data = await APIMethods.getCarWithId(carId);
                setCar(data);
            } catch (error) {
                console.log(`[CarOfferPage][CarMainSection][fetchCar][ERROR] - Cannot fetch car data from server. Stack trace message: ${error}`);
            }
        }
    } 

    useEffect(() => {
        fetchCar();
    }, [carId, carModel]);

    return (
        <div className='section-body-car-main-section'>
            {car === undefined ? <div/> : <MainInfoSection car={car}/>}
            {car === undefined ? <div/> : <ImportantData car={car}/>}
            <div className='car-main-section-split-wrapper'>
                {car === undefined ? <div/> : <TechnicalData car={car}/>}
                {car === undefined ? <div/> : <Features car={car}/>}
            </div>
            {car === undefined ? <div/>  : <MoreInfo car={car}/>}
            {car === undefined ? <div/> : <SellerInfo car={car}/>}
        </div>
    );
}

export default CarMainSection;