import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/addcarpage/Summary.css';
import CarMainSection from '../carofferpage/CarMainSection';
import { useState } from 'react';
import APIMethods from '../../api/APIMethods';
import LoadingCircle from '../../components/maincomponents/LoadingCircle'
import RegularButton from '../maincomponents/RegularButton';

function Summary() {
    
    const loc = useLocation();
    const nav = useNavigate();
    const [carModel, setCarModel] = useState(loc.state);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const [loading, setLoading] = useState(false);

    const buttonSizingWidth = {
        standardSize: '15vw',
        mediumSize: '25vw',
        smallSize: '35vw'
    }
    
    const buttonSizingHeight = {
        standardSize: '4vw',
        mediumSize: '6vw',
        smallSize: '8vw'
    }

    const handleCreatedOffer = async () => {

        setLoading(true);

        let brandId = "";
        let modelId = "";
        try {
            brandId = await APIMethods.getBrandIdFromBrandName(carModel.brandId);
            modelId = await APIMethods.getModelIdByModelName(carModel.modelId, brandId);    
        } catch (error) {
            console.log(`[AddCarPage][Summary][handleCreatedOffer][ERROR] - Cannot fetch brandId or modelId from server. Stack trace message: ${error}`);
            setShowErrorMessage(true);
            setLoading(false);
            return;
        }
        const featureIds = [];

        for (const feature of carModel.features) {
            try {
                featureIds.push(await APIMethods.getFeatureIdByFeatureName(feature));
            } catch (error) {
                console.log(`[AddCarPage][Summary][handleCreatedOffer][ERROR] - Cannot fetch featureId from server (feature=${feature}). Stack trace message: ${error}`);
                setShowErrorMessage(true);
                setLoading(false);
                return;
            }
        }

        const formData = new FormData();

        // Add carHutCar data as a JSON string
        const carHutCar = {
            sellerId: localStorage.getItem('username'),
            sellerAddress: carModel.sellerAddress,
            brandId: brandId,
            modelId: modelId,
            header: carModel.header,
            price: carModel.price,
            mileage: carModel.mileage,
            registration: carModel.registration,
            enginePower: carModel.enginePower,
            engineDisplacement: carModel.engineDisplacement,
            fuel: carModel.fuel,
            fuelConsumptionAvg: carModel.fuelConsumptionAvg,
            fuelConsumptionCity: carModel.fuelConsumptionCity,
            fuelConsumptionHighway: carModel.fuelConsumptionHighway,
            gearbox: carModel.gearbox,
            gearboxGears: carModel.gearboxGears,
            bodyType: 'Not stated',
            powertrain: carModel.powertrain,
            description: carModel.description,
            baseImgPath: 'this',
            previousOwners: carModel.previousOwners,
            energyEffClass: carModel.energyEffClass,
            seats: carModel.seats,
            doors: carModel.doors,
            emissionClass: carModel.emissionClass,
            exteriorColorId: carModel.exteriorColorId,
            interiorColorId: carModel.interiorColorId,
            damageStatus: carModel.damageStatus === 'Yes' ? true : false,
            parkingSensors: carModel.parkingSensors === 'Yes' ? true : false,
            parkingCameras: carModel.parkingCameras === 'Yes' ? true : false,
            countryOfOrigin: carModel.countryOfOrigin,
            technicalInspectionDate: carModel.technicalInspectionDate,
            emissionInspectionDate: carModel.emissionInspectionDate,
            features: featureIds
        };
        formData.append('carHutCar', new Blob([JSON.stringify(carHutCar)], { type: 'application/json' }));

        for (const file of carModel.images) {
            formData.append('multipartFiles', file);
        }
    
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: formData
        };

        console.log(formData);

        try {
            const response = await APIMethods.addCarToDatabase(requestOptions);
            if (response.status === 200) {
                nav('/addCar/success');
            } else {
                setShowErrorMessage(true);
            }
        } catch (error) {
            console.log(`[AddCarPage][Summary][handleCreatedOffer][ERROR] - Cannot save car offer to server. Stack trace message: ${error}`);
            setShowErrorMessage(true);
            setLoading(false);
        }
        setLoading(false);
    }

    return (
        <div>
            <div className='add-car-summary-section'>
                <div className='add-car-summary-header'>That's it! Now double check whether all information is ok.</div>
                <div className='add-car-line-container'/>
                <RegularButton
                    label={'Create offer'}
                    buttonWidth={buttonSizingWidth}
                    buttonHeight={buttonSizingHeight}
                    onClickHandler={(e) => handleCreatedOffer(e)}
                />
                {loading ? <LoadingCircle/> : <div/>}
                {showErrorMessage ? <div className='error-text'>Something went wrong! Try again later.</div> : <div/>}
            </div>
            {carModel === undefined ? <div/> : <CarMainSection carId={null} carModel={carModel} stateType={'add'}/>}
        </div>
    );
}

export default Summary;