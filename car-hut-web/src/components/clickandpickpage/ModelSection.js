import '../../css/clickandpickpage/ModelSection.css'
import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import APIMethods from '../../api/APIMethods';


function ModelSection() {
    const brands = useLocation().state.brands;
    
    const [modelsByBrand, setModelsByBrand] = useState([]);
    const [pickedModels, setPickedModels] = useState([]);
    const [brandModelsObjects, setBrandModelsObjects] = useState([]);

    const fetchData = async () => {
        try {
            if (brands && brands.length > 0) {
                var modelsData = [];

                for (const brand of brands) {
                    const data = await APIMethods.getModelsByBrandName(brand);

                    modelsData.push({
                        brand: brand,
                        models: data
                    });
                    
                }
                setModelsByBrand(modelsData);
            } else {
                setModelsByBrand([]);
            }
        } catch (error) {
            console.error('Error fetching models:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [brands]);

    const generateLabelsForModels = () => {
        return modelsByBrand.map((brandData, brandIndex) => {
            const groupedModels = [];
            const groupSize = brandData.models.length / 8;
    
            for (let i = 0; i < brandData.models.length; i += groupSize) {
                groupedModels.push(brandData.models.slice(i, i + groupSize));
            }
    
            return (
                <div>
                    <div className='brand-label-model-section'>{brandData.brand}</div>
                    <div className='line-container-model-section'/>
                    <div key={brandIndex} className='model-wrapper'>
                        {groupedModels.map((group, groupIndex) => (
                            <div key={groupIndex} className='model-group'>
                                {group.map((model, index) => (
                                    <div className='model-line'>
                                        <label className='custom-checkbox-model-section'>
                                            <input onClick={() => handleClickedModel(model.model, brandIndex)} type="checkbox"/>
                                            <span className="checkmark-model-section"></span>
                                        </label>
                                        <div key={index} className='model-label'>{model.model}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            );
        });
    };
   
    const handleClickedModel = (model, brandIndex) => {
        const isModelPicked = pickedModels.includes(model);

        if (isModelPicked) {
            setPickedModels(pickedModels.filter((pickedModel) => pickedModel !== model));
            setBrandModelsObjects(brandModelsObjects.filter((pickedModel) => pickedModel.model !== model));
        } else {
            setPickedModels([...pickedModels, model]);
            setBrandModelsObjects([...brandModelsObjects, { brand: brands.at(brandIndex), model: model }])
        }
    }

    return (
        <div className='section-body-model-section'>
            <div className='section-header-model-section'>Pick a model for car</div>
            <div className="line-container-model-section"/>        
            {generateLabelsForModels()}
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
            <div className='direction-buttons'>
                <Link
                    to={`/clickAndPickPage/brand`}
                    state={{
                    }}
                >
                    <button className="styled-button-model-section">Brand</button>
                </Link>
                <Link
                    to={`/clickAndPickPage/price`}
                    state={{
                        brands: brands,
                        models: brandModelsObjects
                    }}
                >
                    <button className="styled-button-model-section">Price</button>
                </Link>
            </div>
            
        </div>
    );
}

export default ModelSection;