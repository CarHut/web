import '../../css/carofferpage/MainInfoSection.css';
import CarMainInfo from './CarMainInfo';
import PhotosSection from './PhotosSection';
import { useEffect, useState } from 'react';

function MainInfoSection({car}) {
    const [carModel, setCarModel] = useState(car);
    
    return (
        <div className='section-body-car-offer-main-info'>
            {carModel === undefined ? <div/> : <PhotosSection car={carModel}/>}
            {carModel === undefined ? <div/> : <CarMainInfo car={carModel}/>}
        </div>
    );
}

export default MainInfoSection;