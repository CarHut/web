import '../../css/carofferpage/PhotosSection.css';
import { useEffect, useState } from 'react';
import audiRS3Image from '../../images/searchlist/offers/audiRS3.jpg';

function PhotosSection() {
    const MAX_OF_SHOWN_MINIATURES = 5;
    const paths = ['src\\images\\searchlist\\offers\\audiRS3.jpg', 'src\\images\\searchlist\\offers\\audiRS3.jpg', 'src\\images\\searchlist\\offers\\audiRS3.jpg', 'src\\images\\searchlist\\offers\\audiRS3.jpg', 'src\\images\\searchlist\\offers\\audiRS3.jpg', 'src\\images\\searchlist\\offers\\audiRS3.jpg', 'src\\images\\searchlist\\offers\\audiRS3.jpg', 'src\\images\\searchlist\\offers\\audiRS3.jpg', 'src\\images\\searchlist\\offers\\audiRS3.jpg', 'src\\images\\searchlist\\offers\\audiRS3.jpg', 'src\\images\\searchlist\\offers\\audiRS3.jpg', 'src\\images\\searchlist\\offers\\audiRS3.jpg', 'src\\images\\searchlist\\offers\\audiRS3.jpg', 'src\\images\\searchlist\\offers\\audiRS3.jpg'];
    const [photoPaths, setPhotoPaths] = useState(paths);
    const [currentMiniatureSelectedNum, setCurrentMiniatureSelectedNum] = useState(1);

    const renderPhotoMiniatures = () => {
        return (
            <div className='photo-miniatures-preview-wrapper'>
                {Array.from({ length: endMiniature - startMiniature + 1}, (_, i) => {
                    return (
                        <img className='photo-miniature-img' src={audiRS3Image} key={startMiniature + i} onClick={() => setCurrentMiniatureSelectedNum(startMiniature + i)}/>
                    );
                })}
            </div>
        );
    }

    const renderMainPhoto = () => {
        return (
            <div className='main-photo-wrapper'>
                <img className='main-photo-img' src={audiRS3Image}/>
            </div>
        );
    }

    const renderCurrentPageLabel = () => {
        return (
            <div className='current-page-label'>{currentMiniatureSelectedNum}/{paths.length}</div>
        );
    }

    const startMiniature = Math.max(1, currentMiniatureSelectedNum - 2);
    const endMiniature = Math.min(photoPaths.length, startMiniature + 4);

    return (
        <div className='section-car-offer-photos-section-body'>
            {renderPhotoMiniatures()}
            {renderMainPhoto()}
            {renderCurrentPageLabel()}
        </div>
    );
}

export default PhotosSection;