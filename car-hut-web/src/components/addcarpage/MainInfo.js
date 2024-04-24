import APIMethods from '../../api/APIMethods';
import '../../css/addcarpage/MainInfo.css';
import { useState, useEffect } from 'react';


function MainInfo() {

    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [reactCarModel, setReactCarModel] = useState({});
    const [header, setHeader] = useState('');

    useEffect(() => {
        fetchBrands();
    }, []);

    useEffect(() => {
        fetchModels(selectedBrand);
    }, [selectedBrand]);

    const fetchBrands = async () => {
        const data = await APIMethods.getAllBrands();
        console.log(data);
        setBrands(data);
    }

    const fetchModels = async (selectedBrand) => {
        const data = await APIMethods.getModelsByBrandName(selectedBrand);
        setModels(data);
    }

    const handleSelectedBrand = (brand) => {
        setSelectedBrand(brand);
    }

    const handleSelectedModel = (model) => {
        setSelectedModel(model);
    }

    const handleWrittenHeadline = (text) => {
        setHeader(text);
    }


    return (
        <div className='add-car-main-info-section'>
            <div className='add-car-main-info-header'>Let's start with basic data of your car</div>
            <div className="line-container"/>
            <div className='add-car-main-info-row-wrapper'>
                <div className='add-car-main-info-column-wrapper'>
                    <div className='add-car-main-info-row-wrapper'>
                        <div className='add-car-main-info-combobox-entity'>
                            <div className='label'>Brand*</div>
                            <div className="add-car-main-info-custom-combobox">
                                <select id="brandComboBox" className='add-car-main-info-myComboBox' value={selectedBrand} onChange={(e) => handleSelectedBrand(e.target.value)}>
                                    <option value="all" disabled>Select Brand</option>
                                    {brands.map(brand => (
                                        <option key={brand.id} value={brand.brand}>{brand.brand}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='add-car-main-info-combobox-entity'>
                            <div className='label'>Model*</div>
                            <div className="add-car-main-info-custom-combobox">
                                <select id="modelComboBox" className={`add-car-main-info-myComboBox ${!selectedBrand ? 'disabled' : ''}`} value={selectedModel} onChange={(e) => handleSelectedModel(e.target.value)} disabled={!selectedBrand}>
                                    <option value="all" disabled={!selectedBrand}>Select Model</option>
                                    {models.map(model => (
                                        <option key={model.id} value={model.model}>{model.model}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='add-car-main-info-row-wrapper'>
                        <div className='add-car-form'>
                            <div className='add-car-main-info-regular-text'>Do you want custom header? Here you go!</div>
                            <input className='add-car-main-info-text-input' maxLength='50' type='text' placeholder='max. 50 characters' onChange={(e) => handleWrittenHeadline(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className='add-car-main-info-content-wrapper'>
                    <div className='add-car-main-info-column-wrapper'>
                        <div className='add-car-main-info-small-text-darker'>Brand</div>
                        <div className='add-car-main-info-small-text-darker'>Model</div>
                        <div className='add-car-main-info-small-text-darker'>Headline</div>
                    </div>
                    <div className='add-car-main-info-column-wrapper'>
                        <div className='add-car-main-info-small-text'>{selectedBrand}</div>
                        <div className='add-car-main-info-small-text'>{selectedModel}</div>
                        <div className='add-car-main-info-small-text'>{header}</div>
                    </div>        
                </div>
            </div>
            <div className='add-car-main-info-small-text-darker'>* necessary to fill</div>
        </div>
    )
}

export default MainInfo;