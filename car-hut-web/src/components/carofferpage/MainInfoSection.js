import '../../css/carofferpage/MainInfoSection.css';
import CarMainInfo from './CarMainInfo';
import PhotosSection from './PhotosSection';

function MainInfoSection() {
    return (
        <div className='section-body-car-offer-main-info'>
            <PhotosSection/>
            <CarMainInfo/>
        </div>
    );
}

export default MainInfoSection;