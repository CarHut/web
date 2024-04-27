import '../../css/addcarpage/Features.css';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import APIMethods from '../../api/APIMethods';

function Features() {

    const loc = useLocation();
    const currentCarModel = loc.state;
    const [features, setFeatures] = useState([]);
    const [numOfColumns, setNumOfColumns] = useState(4); // IF CHANGED UPDATE WIDTH FOR add-car-features-column-wrapper in Features.css
    const [numOfFeaturesPerColumn, setNumOfFeaturesPerColumn] = useState(1);
    const [selectedFeatures, setSelectedFeatures] = useState([]);

    const fetchFeatures = async () => {
        setFeatures(await APIMethods.getFeatures());
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
            <div className='line-container'/>
            {renderFeatures()}
            <Link
                className='add-car-features-styled-button'
                style={{"textDecoration": "none"}}
                state={{
                    brand: currentCarModel.brand,
                    model: currentCarModel.model,
                    header: currentCarModel.header,
                    mileage: currentCarModel.mileage,
                    registration: currentCarModel.registration,
                    enginePower: currentCarModel.enginePower,
                    displacement: currentCarModel.displacement,
                    fuel: currentCarModel.fuel,
                    avgFuelCons: currentCarModel.avgFuelCons,
                    cityFuelCons: currentCarModel.cityFuelCons,
                    highwayFuelCons: currentCarModel.highwayFuelCons,
                    gearbox: currentCarModel.gearbox,
                    gearboxGears: currentCarModel.gearboxGears,
                    powertrain: currentCarModel.powertrain,
                    exteriorColor: currentCarModel.exteriorColor,
                    interiorColor: currentCarModel.interiorColor,
                    techInspectionDate: currentCarModel.techInspectionDate,
                    emInspectionDate: currentCarModel.emInspectionDate,
                    countryOfOrigin: currentCarModel.countryOfOrigin,
                    damage: currentCarModel.damage,
                    parkSensors: currentCarModel.parkSensors,
                    parkCameras: currentCarModel.parkCameras,
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