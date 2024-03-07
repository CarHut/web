import '../../css/FilterSearch.css'
import React, { useState, useEffect } from 'react';

function FilterSearch() {
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetch('http://localhost:8080/api/getAllBrands')
            .then(response => response.json())
            .then(data => setBrands(data))
            .catch(error => console.error('Error fetching brands:', error));
    }, []);

    useEffect(() => {
        // Fetch models when a brand is selected
        if (selectedBrand) {
            fetch(`http://localhost:8080/api/getModelsByBrand/${selectedBrand}`)
                .then(response => response.json())
                .then(data => setModels(data))
                .catch(error => console.error('Error fetching models:', error));
        } else {
            // Clear models when no brand is selected
            setModels([]);
        }
    }, [selectedBrand]);

    return (
        <div className='section-body'>
            <img src={require('../../images/mainpage/find_car.png')}/>
            <div className='right-wrapper'>
                <div className='comboboxes'>
                    <div className='combobox-entity'>
                        <div className='label'>Brand</div>
                        <div className="custom-combobox">
                            <select id="brandComboBox" className='myComboBox' value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                                <option value="" disabled>Select Brand</option>
                                {brands.map(brand => (
                                    <option key={brand.id} value={brand.brand}>{brand.brand}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='combobox-entity'>
                        <div className='label'>Model</div>
                        <div className="custom-combobox">
                            <select id="modelComboBox" className={`myComboBox ${!selectedBrand ? 'disabled' : ''}`} value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} disabled={!selectedBrand}>
                                <option value="" disabled={!selectedBrand}>Select Model</option>
                                {models.map(model => (
                                    <option key={model.id} value={model.model}>{model.model}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='combobox-entity'>
                        <div className='label'>Price</div>
                        <div className="custom-combobox">
                            <select id="priceComboBox" className='myComboBox'>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </div>
                    </div>
                    <div className='combobox-entity'>
                        <div className='label'>Mileage</div>
                        <div className="custom-combobox">
                            <select id="mileageComboBox" className='myComboBox'>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='more-filters-text'>More filters</div>
            </div>
        </div>
    );
}

export default FilterSearch;