import { useLocation } from 'react-router-dom';
import '../../css/addcarpage/AddPhotos.css';
import { useState } from 'react';

function AddPhotos() {

    const loc = useLocation();
    const currentCarModel = loc.state;
    const [loadedImage, setLoadedImage] = useState(null)

    const handleLoadedImage = (image) => {
        console.log(image);
        setLoadedImage(image);
    }

    const uploadImage = async () => {
        if (!loadedImage) {
            console.log('No image was uploaded yet!');
            return;
        }

        const formData = new FormData();
        formData.append('image', loadedImage);
        formData.append('username', localStorage.getItem('username'));

        try {
            const response = await fetch('http://localhost:8080/api/carhut/uploadImage', {
              method: 'POST',
              body: formData,
            });
        } catch (error) {
            console.error('Error uploading image:', error);
        }

    }

    return (
        <div className='add-car-photos-section'>
            <div className='add-car-photos-header'>Add photos of you car</div>
            <div className='line-container'/>
            <input type='file' accept="image/png, image/jpg, image/jpeg" onChange={(e) => handleLoadedImage(e.target.files[0])}/>
            <div className='add-car-photo-styled-button' onClick={uploadImage}>Upload image</div>
        </div>
    );

}

export default AddPhotos;