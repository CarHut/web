import { Link, useLocation } from 'react-router-dom';
import '../../css/addcarpage/AddPhotos.css';
import { useState } from 'react';
import APIMethods from '../../api/APIMethods';
import LoadingCircle from '../maincomponents/LoadingCircle';
import RegularButton from '../maincomponents/RegularButton';

function AddPhotos() {

    const UploadingState = {
        NOT_UPLOADING: "NOT_UPLOADING",
        UPLOADING: "UPLOADING",
        UPLOAD_ERROR: "UPLOAD_ERROR",
        UPLOAD_SUCCESS: "UPLOAD_SUCCESS"        
    };

    const loc = useLocation();
    const currentCarModel = loc.state;
    const [loadedImage, setLoadedImage] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploadingImageState, setUploadingImageState] = useState(UploadingState.NOT_UPLOADING);

    const buttonSizingWidth = {
        standardSize: '6vw',
        mediumSize: '10vw',
        smallSize: '15vw'
    }
    
    const buttonSizingHeight = {
        standardSize: '3vw',
        mediumSize: '5vw',
        smallSize: '6vw'
    }

    const handleLoadedImage = (image) => {
        setLoadedImage(image);
    }

    const uploadImage = async () => {
        setUploadingImageState(UploadingState.UPLOADING);

        if (!loadedImage || uploadingImageState === UploadingState.UPLOADING) {
            console.log('[AddCarPage][AddPhotos][uploadImage][WARN] - No image was uploaded yet or image is still uploading.');
            setUploadingImageState(UploadingState.UPLOAD_ERROR);
            return;
        }

        const formData = new FormData();
        formData.append('image', loadedImage);
        formData.append('username', localStorage.getItem('username'));

        const newUploadedImages = [...uploadedImages, loadedImage];
        setUploadedImages(newUploadedImages);
        setUploadingImageState(UploadingState.UPLOAD_SUCCESS);
    }

    const handleRemovedImage = (indexOfRemovedImg) => {
        const tempImages = [...uploadedImages];
        setUploadedImages(tempImages.filter((image, idx) => idx !== indexOfRemovedImg));
    }

    const renderUploadedImages = () => {
        return (
            uploadedImages.map((image, idx) => {
                return (
                    <div className='add-car-photos-uploaded-img-wrapper'>
                        <img className='add-car-photos-uploaded-img' id={idx} src={URL.createObjectURL(image)}/>
                        <div className='x-mark' onClick={(e) => handleRemovedImage(idx)}/>
                    </div>
                    
                )
            })
        )
    }

    return (
        <div className='add-car-photos-section'>
            <div className='add-car-photos-header'>Add photos of you car</div>
            <div className='add-car-line-container'/>
            <div className='add-car-photos-columns'>
                <div className='add-car-photos-column-wrapper'>
                    <img className='add-car-photos-loaded-img' src={loadedImage !== null ? URL.createObjectURL(loadedImage) : ""}/>
                    <div><input type='file' accept="image/png, image/jpg, image/jpeg" onChange={(e) => handleLoadedImage(e.target.files[0])}/></div>
                    <div className='add-car-photo-styled-button' onClick={() => uploadImage()}>Upload image</div>  
                    {uploadingImageState === UploadingState.UPLOADING ? <LoadingCircle/> : <div/>}          
                    {uploadingImageState === UploadingState.UPLOAD_SUCCESS 
                        ? <div className='add-photos-upload-text success'>Successfully uploaded image.</div>
                        : uploadingImageState === UploadingState.UPLOAD_ERROR
                            ? <div className='add-photos-upload-text error'>Failed to upload image.</div>
                            : <div/>
                    }
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
                <RegularButton
                    label={'Next'}
                    buttonWidth={buttonSizingWidth}
                    buttonHeight={buttonSizingHeight}
                />
            </Link>
        </div>
    );

}

export default AddPhotos;