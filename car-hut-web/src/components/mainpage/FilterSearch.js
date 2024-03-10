import '../../css/FilterSearch.css';
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
                    <div className='combobox-entity-filter-search'>
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
                    <div className='combobox-entity-filter-search'>
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
                    <div className='combobox-entity-filter-search'>
                        <div className='label'>Price</div>
                        <div className="custom-combobox">
                            <select id="priceComboBox" className='myComboBox'>
                                <option value="">Select Price</option>
                                <option key={1000} value={'price1000'}>1 000€</option>
                                <option key={2000} value={'price2000'}>2 000€</option>
                                <option key={3000} value={'price3000'}>3 000€</option>
                                <option key={4000} value={'price4000'}>4 000€</option>
                                <option key={5000} value={'price5000'}>5 000€</option>
                                <option key={6000} value={'price6000'}>6 000€</option>
                                <option key={7000} value={'price7000'}>7 000€</option>
                                <option key={8000} value={'price8000'}>8 000€</option>
                                <option key={9000} value={'price9000'}>9 000€</option>
                                <option key={10000} value={'price10000'}>10 000€</option>
                                <option key={20000} value={'price20000'}>20 000€</option>
                                <option key={30000} value={'price30000'}>30 000€</option>
                                <option key={40000} value={'price40000'}>40 000€</option>
                                <option key={50000} value={'price50000'}>50 000€</option>
                                <option key={60000} value={'price60000'}>60 000€</option>
                                <option key={70000} value={'price70000'}>70 000€</option>
                                <option key={80000} value={'price80000'}>80 000€</option>
                                <option key={90000} value={'price90000'}>90 000€</option>
                                <option key={100000} value={'price100000'}>100 000€</option>
                                <option key={150000} value={'price150000'}>150 000€</option>
                                <option key={200000} value={'price200000'}>200 000€</option>
                                <option key={0} value={'priceMore'}>More</option>
                            </select>
                        </div>
                    </div>
                    <div className='combobox-entity-filter-search'>
                        <div className='label'>Mileage</div>
                        <div className="custom-combobox">
                            <select id="mileageComboBox" className='myComboBox'> 
                                <option value="">Select Mileage</option> 
                                <option key={1000} value={'mileage1000'}>1 000 km</option>
                                <option key={5000} value={'mileage5000'}>5 000 km</option>
                                <option key={10000} value={'mileage10000'}>10 000 km</option>
                                <option key={50000} value={'mileage50000'}>50 000 km</option>
                                <option key={100000} value={'mileage100000'}>100 000 km</option>
                                <option key={200000} value={'mileage200000'}>200 000 km</option>
                                <option key={0} value={'mileageMore'}>More</option>
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