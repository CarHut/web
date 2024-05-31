import '../../css/addcarpage/Features.css';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import APIMethods from '../../api/APIMethods';
import SellerInfo from '../carofferpage/SellerInfo';

function Features() {

    const loc = useLocation();
    const currentCarModel = loc.state;
    const [features, setFeatures] = useState([]);
    const [numOfColumns, setNumOfColumns] = useState(4); // IF CHANGED, UPDATE WIDTH FOR add-car-features-column-wrapper in Features.css
    const [numOfFeaturesPerColumn, setNumOfFeaturesPerColumn] = useState(1);
    const [selectedFeatures, setSelectedFeatures] = useState([]);

    const fetchFeatures = async () => {
        try {
            setFeatures(await APIMethods.getFeatures());
        } catch (error) {
            console.log(`[AddCarPage][Features][fetchFeatures][ERROR] - Cannot fetch features. Stack trace message: ${error}`);
        }
    }

    const countFeaturesPerColumn = () => {
        const result = Math.round(features.length / numOfColumns);
        if (result !== 0) {
            setNumOfFeaturesPerColumn(result);
        }
    } 

    useEffect(() => {
        fetchFeatures();
    }, []);

    useEffect(() => {
        countFeaturesPerColumn();
    }, [features]);

    const renderFeatures = () => {
        
        let columnFeatures = [];

        for (let i = 0; i < features.length; i += numOfFeaturesPerColumn) {
            columnFeatures.push(features.slice(i, i + numOfFeaturesPerColumn));
        }

        return (
            <div className='add-car-features-main-wrapper'>
                {columnFeatures.map((column, index) => {
                    return (
                        <div id={index} className='add-car-features-column-wrapper'>
                            {column.map((feature, featureIdx) => {
                                return (
                                    <div className='add-car-features-row-wrapper'>
                                        <input value={feature.feature} type='checkbox' className='add-car-features-checkbox' onChange={(e) => handleAddedFeature(e.target.value)}/>
                                        <div index={featureIdx} className='add-car-features-feature-text'>
                                            {feature.feature}
                                        </div>
                                    </div>
                                    
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        );
    }

    const handleAddedFeature = (feature) => {
        if (selectedFeatures.includes(feature)) {
            selectedFeatures.splice(selectedFeatures.findIndex((element) => element === feature));
        } else {
            selectedFeatures.push(feature);
        }
    }

    return (
        <div className='add-car-features-section'>
            <div className='add-car-features-header'>What features does YOUR car have?</div>
            <div className='add-car-line-container'/>
            {renderFeatures()}
            <Link
                className='add-car-features-styled-button'
                style={{"textDecoration": "none"}}
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
                    features: selectedFeatures
                }}
                to={'/addCar/addPhotos'}
            >
                Next
            </Link>
        </div>
    );
}

export default Features;