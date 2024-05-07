import { Link, useLocation } from 'react-router-dom';
import '../../css/addcarpage/AddPhotos.css';
import { useState } from 'react';

function AddPhotos() {

    const loc = useLocation();
    const currentCarModel = loc.state;
    const [loadedImage, setLoadedImage] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);

    const handleLoadedImage = (image) => {
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

            const newUploadedImages = [...uploadedImages, loadedImage];
            setUploadedImages(newUploadedImages);
        } catch (error) {
            console.error('Error uploading image:', error);
            return;
        }
    }

    const handleRemovedImage = (indexOfRemovedImg) => {
        const tempImages = [...uploadedImages];
        setUploadedImages(tempImages.filter((image, idx) => idx !== indexOfRemovedImg));
    }

    const renderUploadedImages = () => {
        return (
            uploadedImages.map((image, idx) => {
                return (
                    <div className='add-car-photos-uploaded-img'>
                        <img id={idx} src={URL.createObjectURL(image)}/>
                        <div className='x-mark' onClick={(e) => handleRemovedImage(idx)}/>
                    </div>
                    
                )
            })
        )
    }

    return (
        <div className='add-car-photos-section'>
            <div className='add-car-photos-header'>Add photos of you car</div>
            <div className='line-container'/>
            <div className='add-car-photos-columns'>
                <div className='add-car-photos-column-wrapper'>
                    <img className='add-car-photos-loaded-img' src={loadedImage !== null ? URL.createObjectURL(loadedImage) : ""}/>
                    <div><input type='file' accept="image/png, image/jpg, image/jpeg" onChange={(e) => handleLoadedImage(e.target.files[0])}/></div>
                    <div className='add-car-photo-styled-button' onClick={uploadImage}>Upload image</div>            
                </div>
                <div className='add-car-photos-column-wrapper'>
                    <div className='add-car-photos-header'>Added photos</div>
                    <div className='add-car-photos-uploaded-images-wrapper'>
                        {renderUploadedImages()}
                    </div>
                </div>
            </div>
            <Link
                to={"/addCar/summary"}
                className='add-car-styled-button'
                style={{textDecoration: "none"}}
                state={{
                    brandId: currentCarModel.brandId,
                    modelId: currentCarModel.modelId,
                    header: currentCarModel.header,
                    mileage: currentCarModel.mileage,
                    registration: currentCarModel.registration,
                    price: currentCarModel.price,
                    sellerAddress: currentCarModel.sellerAddress,
                    enginePower: currentCarModel.enginePower,
                    engineDisplacement: currentCarModel.engineDisplacement,
                    fuel: currentCarModel.fuel,
                    fuelConsumptionAvg: currentCarModel.fuelConsumptionAvg,
                    fuelConsumptionCity: currentCarModel.fuelConsumptionCity,
                    fuelConsumptionHighway: currentCarModel.fuelConsumptionHighway,
                    gearbox: currentCarModel.gearbox,
                    gearboxGears: currentCarModel.gearboxGears,
                    powertrain: currentCarModel.powertrain,
                    exteriorColorId: currentCarModel.exteriorColorId,
                    interiorColorId: currentCarModel.interiorColorId,
                    technicalInspectionDate: currentCarModel.technicalInspectionDate,
                    emissionInspectionDate: currentCarModel.emissionInspectionDate,
                    countryOfOrigin: currentCarModel.countryOfOrigin,
                    damageStatus: currentCarModel.damageStatus,
                    parkingSensors: currentCarModel.parkingSensors,
                    parkingCameras: currentCarModel.parkingCameras,
                    doors: currentCarModel.doors,
                    seats: currentCarModel.seats,
                    previousOwners: currentCarModel.previousOwners,
                    energyEffClass: currentCarModel.energyEffClass,
                    emissionClass: currentCarModel.emissionClass,
                    features: currentCarModel.features,
                    images: uploadedImages
                }}
            >
                Next    
            </Link>
        </div>
    );

}

export default AddPhotos;