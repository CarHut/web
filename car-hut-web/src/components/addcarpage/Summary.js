import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../css/addcarpage/Summary.css';
import CarMainSection from '../carofferpage/CarMainSection';
import { useEffect, useState } from 'react';
import APIMethods from '../../api/APIMethods';

function Summary() {
    
    const loc = useLocation();
    const nav = useNavigate();
    const [carModel, setCarModel] = useState(loc.state);
    
    const handleCreatedOffer = async () => {

        const brandId = await APIMethods.getBrandIdFromBrandName(carModel.brandId);
        const modelId = await APIMethods.getModelIdByModelName(carModel.modelId, brandId);
        
        const featureIds = [];

        for (const feature of carModel.features) {
            featureIds.push(await APIMethods.getFeatureIdByFeatureName(feature));
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
            })
        };

        const response = await fetch('http://localhost:8080/api/carhut/addCarToDatabase', requestOptions);
        console.log(response);
        // nav('/addCar/success');
    }

    return (
        <div>
            <div className='add-car-summary-section'>
                <div className='add-car-summary-header'>That's it! Now double check whether all information is ok.</div>
                <div className='line-container'/>
                <div className='add-car-summary-styled-button' onClick={(e) => handleCreatedOffer(e)}>Create offer</div>
            </div>
            {carModel === undefined ? <div/> : <CarMainSection carId={null} carModel={carModel}/>}
        </div>
    );
}

export default Summary;