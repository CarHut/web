import '../../css/clickandpickpage/ModelSection.css'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { keyboard } from '@testing-library/user-event/dist/keyboard';


function ModelSection() {
    var uppercaseFilename = useLocation().state.split('.')[0];
    uppercaseFilename = uppercaseFilename.toLowerCase();
    uppercaseFilename = uppercaseFilename.replace('-', ' ');

    const [models, setModels] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (uppercaseFilename) {
                    const response = await fetch(`http://localhost:8080/api/getModelsByBrandName/${uppercaseFilename}`);
                    const data = await response.json();
                    setModels(data);
                } else {
                    setModels([]);
                }
            } catch (error) {
                console.error('Error fetching models:', error);
            }
        };

        fetchData();
    }, [uppercaseFilename]);

    const generateLabelsForModels = () => {
        const groupedModels = [];
        const groupSize = models.length / 8;

        for (let i = 0; i < models.length; i += groupSize) {
            groupedModels.push(models.slice(i, i + groupSize));
        }

        return groupedModels.map((group, groupIndex) => (
            <div key={groupIndex} className='model-group'>
                {group.map((model, index) => (
                    <div key={index} className='model-label'>{model.model}</div>
                ))}
            </div>
        ));
    };

    return (
        <div className='section-body-model-section'>
            <div className='section-header-model-section'>Pick a model for car {uppercaseFilename}</div>
            <div className="line-container"/>        
            <div className='model-wrapper'>
                {generateLabelsForModels()}
            </div>
            <div className="click-and-pick-progress-bar">
                <div className="progress-bar-content">
                    <div className="progress-bar-sphere-traversed"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere-current"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                </div>
            </div>
            <div className="progress-bar-label">{"Brand  <  Model  >  "}</div>
        </div>
    );
}

export default ModelSection;