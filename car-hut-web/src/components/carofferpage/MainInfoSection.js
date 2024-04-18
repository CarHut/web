import '../../css/carofferpage/MainInfoSection.css';
import CarMainInfo from './CarMainInfo';
import PhotosSection from './PhotosSection';

function MainInfoSection({car}) {
    return (
        <div className='section-body-car-offer-main-info'>
            <PhotosSection/>
            <CarMainInfo car={car}/>
        </div>
    );
}

export default MainInfoSection;