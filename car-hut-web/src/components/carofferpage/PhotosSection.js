import '../../css/carofferpage/PhotosSection.css';
import { useEffect, useState } from 'react';

function PhotosSection({ car }) {

    const MAX_OF_SHOWN_MINIATURES = 5;
    const [currentMiniatureSelectedNum, setCurrentMiniatureSelectedNum] = useState(1);

    // Images (when adding car they are in state, when looking for already added car web app must fetch images from backend via base_image_path)
    const [images, setImages] = useState(null);
    const [carModel, setCarModel] = useState(car);

    useEffect(() => {
        if (carModel.images === undefined) {
            //fetching images from backend
            
        } else {
            // adding images from state
            setImages(carModel.images);
        }
        
    }, [carModel])

    const renderPhotoMiniatures = () => {
        return (
            <div className='photo-miniatures-preview-wrapper'>
                {Array.from({ length: endMiniature - startMiniature + 1}, (_, i) => {
                    const url = URL.createObjectURL(images[startMiniature + i - 1]);
                    return (
                        <img className='photo-miniature-img' src={url} key={startMiniature + i} onClick={() => setCurrentMiniatureSelectedNum(startMiniature + i)}/>
                    );
                })}
            </div>
        );
    }

    const renderMainPhoto = () => {
        const url = URL.createObjectURL(images[currentMiniatureSelectedNum - 1]);

        return (
            <div className='main-photo-wrapper'>
                <img className='main-photo-img' src={url}/>
            </div>
        );
    }

    const renderCurrentPageLabel = () => {
        return (
            <div className='current-page-label'>{currentMiniatureSelectedNum}/{images.length}</div>
        );
    }

    const startMiniature = Math.max(1, currentMiniatureSelectedNum - 2);
    const endMiniature = Math.min(images === null ? 0 : images.length, startMiniature + 4);

    return (
        <div className='section-car-offer-photos-section-body'>
            {images !== null ? renderPhotoMiniatures() : <div/>}
            {images !== null ? renderMainPhoto() : <div/>}
            {images !== null ? renderCurrentPageLabel() : <div/>}
        </div>
    );
}

export default PhotosSection;