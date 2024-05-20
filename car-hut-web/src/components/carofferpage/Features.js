import APIMethods from '../../api/APIMethods';
import '../../css/carofferpage/Features.css';
import { useEffect, useState } from 'react';

function Features({ car }) {

    const [carModel, setCarModel] = useState(car);
    const [features, setFeatures] = useState([]);

    const fetchFeatures = async () => {
        if (carModel.features !== undefined || carModel.features !== null) {
            setFeatures(await APIMethods.getMultipleFeaturesByIds(carModel.features));
        }
    }

    useEffect(() => {
        if (car.features !== null || car.features !== undefined) {
            fetchFeatures();
        }
    }, []);

    const renderFeatures = () => {
        if (features === null) {
            return (
                <div/>
            );
        }

        return (
            <div className='features-columns-wrapper'>
                {Array.from({ length: 4}, (_, i) => {
                    return (
                        <div className='features-column-block'>
                            {Array.from({ length: Math.min(14, features.length - (14 * i))}, (_, j) => { 
                                return (
                                    <div className='features-column-text'>
                                        {features[j + (i * 14)]}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        )
    }

    return (
        <div className='features-body'>
            <div className='features-header'>Features</div>
            <div className='features-line-container'/>
            {renderFeatures()}
        </div>
    );
}

export default Features;