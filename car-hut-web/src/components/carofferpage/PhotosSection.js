import { getAllByTestId } from '@testing-library/react';
import '../../css/carofferpage/PhotosSection.css';
import { useEffect, useState } from 'react';
import APIMethods from '../../api/APIMethods';

function PhotosSection({ car }) {

    const MAX_OF_SHOWN_MINIATURES = 5;
    const [currentMiniatureSelectedNum, setCurrentMiniatureSelectedNum] = useState(1);

    // Images (when adding car they are in state, when looking for already added car web app must fetch images from backend via base_image_path)
    const [images, setImages] = useState([]);
    const [carModel, setCarModel] = useState(car);

    useEffect(() => {
        if (carModel.images === undefined) {
            //fetching images from backend
            fetchImages(car.id);
        } else {
            // adding images from state
            setImages(carModel.images);
        }
    }, [carModel])

    const fetchImages = async (carId) => {
        if (carId === null || carId === undefined) {
            return;
        }

        const fetchedData = await APIMethods.getImages(carId);
        const imageUrls = fetchedData.map((bytes) => `data:image/png;base64,${bytes}`)
        setImages(imageUrls);
    }

    const renderPhotoMiniatures = () => {
        return (
            <div className='photo-miniatures-preview-wrapper'>
                {Array.from({ length: endMiniature - startMiniature + 1}, (_, i) => {
                    // const url = URL.createObjectURL(images[startMiniature + i - 1]);
                    return (
                        <img className='photo-miniature-img' src={images[startMiniature + i - 1]} key={startMiniature + i} onClick={() => setCurrentMiniatureSelectedNum(startMiniature + i)}/>
                    );
                })}
            </div>
        );
    }

    const renderMainPhoto = () => {
        // const url = URL.createObjectURL(images[currentMiniatureSelectedNum - 1]);

        return (
            <div className='main-photo-wrapper'>
                <img className='main-photo-img' src={images[currentMiniatureSelectedNum - 1]}/>
            </div>
        );
    }

    const renderCurrentPageLabel = () => {
        return (
            <div className='current-page-label'>{currentMiniatureSelectedNum}/{images.length}</div>
        );
    }

    const startMiniature = Math.max(images.length === 0 ? 0 : 1, currentMiniatureSelectedNum - 2);
    const endMiniature = Math.min(images.length === 0 ? 0 : images.length, startMiniature + 4);

    return (
        <div className='section-car-offer-photos-section-body'>
            {images.length !== 0 ? renderPhotoMiniatures() : <div/>}
            {images.length !== 0 ? renderMainPhoto() : <div/>}
            {images.length !== 0 ? renderCurrentPageLabel() : <div/>}
        </div>
    );
}

export default PhotosSection;