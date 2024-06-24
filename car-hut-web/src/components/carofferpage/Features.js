import APIMethods from '../../api/APIMethods';
import '../../css/carofferpage/Features.css';
import { useEffect, useState } from 'react';

function Features({ car, stateType }) {

    const [carModel, setCarModel] = useState(car);
    const [features, setFeatures] = useState([]);

    const fetchFeatures = async () => {
        try {
            if (stateType === 'add') {
                setFeatures(carModel.features);
            } else {
                setFeatures(await APIMethods.getMultipleFeaturesByIds(carModel.features));
            }
        } catch (error) {
            console.log(`[CarOfferPage][Features][fetchFeatures][ERROR] - Cannot fetch features. Stack trace message: ${error}`);
        }
    }

    useEffect(() => {
        fetchFeatures();
    }, []);

    const renderFeatures = () => {
        if (features === null || features === undefined) {
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