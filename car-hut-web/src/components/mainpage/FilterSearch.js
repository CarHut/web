import '../../css/mainpage/FilterSearch.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import updateNumberOfSearchResults from '../../utils/RenderTextUtil';
import APIMethods from '../../api/APIMethods';
import { inferTypeFromValues } from 'react-admin';


function FilterSearch() {
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedPriceFrom, setSelectedPriceFrom] = useState('');
    const [selectedMileageFrom, setSelectedMileageFrom] = useState('');
    const [searchedCarsNumber, setSearchedCarsNumber] = useState(null);
    const [loadingSearchedCarsNumber, setLoadingSearchedCarsNumber] = useState(true);

    const updateSearchedCarsNumber = async () => {
        try {
            const result = await updateNumberOfSearchResults(selectedBrand, selectedModel, "", selectedPriceFrom, "", selectedMileageFrom, "", "", "", "", "", "", "", "", "", "", "", "", "", "");
            setSearchedCarsNumber(result);
            setLoadingSearchedCarsNumber(false);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        updateSearchedCarsNumber();
    }, [selectedBrand, selectedModel, selectedPriceFrom, selectedMileageFrom, brands, models]);

    const fetchBrands = async () => {
        const data = await APIMethods.getAllBrands();
        setBrands(data);
        setLoadingSearchedCarsNumber(true);
    }

    const fetchModelsByBrand = async (brand) => {
        const data = await APIMethods.getModelsByBrand(selectedBrand); 
        setModels(data);
        setLoadingSearchedCarsNumber(true);
        console.log('was here');
    }

    useEffect(() => { 
        fetchBrands();
    }, []);

    useEffect(() => {
        if (selectedBrand) {
            fetchModelsByBrand(selectedBrand);
        } else {
            setModels([]);
        }
    }, [selectedBrand]);

    const handleSelectedBrand = (e) => {
        setSelectedBrand(e);
        setSelectedModel('');
    }

    const handleSelectedModel = (model) => {
        setSelectedModel(model);
        setLoadingSearchedCarsNumber(true);
    }

    const handleSelectedPriceFrom = (priceFrom) => {
        setSelectedPriceFrom(priceFrom);
        setLoadingSearchedCarsNumber(true);
    }

    const handleSelectedMileageFrom = (mileageFrom) => {
        setSelectedMileageFrom(mileageFrom);
        setLoadingSearchedCarsNumber(true);
    }


    return (
        <div className='section-body'>
            <img src={require('../../images/mainpage/find_car.png')}/>
            <div className='right-wrapper'>
                <div className='comboboxes'>
                    <div className='combobox-entity-filter-search'>
                        <div className='label'>Brand</div>
                        <div className="custom-combobox">
                            <select id="brandComboBox" className='myComboBox' value={selectedBrand} onChange={(e) => handleSelectedBrand(e.target.value)}>
                                <option value="all">Select Brand</option>
                                {brands.map(brand => (
                                    <option key={brand.id} value={brand.brand}>{brand.brand}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='combobox-entity-filter-search'>
                        <div className='label'>Model</div>
                        <div className="custom-combobox">
                            <select id="modelComboBox" className={`myComboBox ${!selectedBrand ? 'disabled' : ''}`} value={selectedModel} onChange={(e) => handleSelectedModel(e.target.value)} disabled={!selectedBrand}>
                                <option value="all" disabled={!selectedBrand}>Select Model</option>
                                {models.map(model => (
                                    <option key={model.id} value={model.model}>{model.model}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='combobox-entity-filter-search'>
                        <div className='label'>Price from</div>
                        <div className="custom-combobox">
                            <select id="priceComboBox" className='myComboBox' onChange={(e) => handleSelectedPriceFrom(e.target.value)}>
                                <option value="">Select Price</option>
                                <option key={1000} value={'1000'}>1 000€</option>
                                <option key={2000} value={'2000'}>2 000€</option>
                                <option key={3000} value={'3000'}>3 000€</option>
                                <option key={4000} value={'4000'}>4 000€</option>
                                <option key={5000} value={'5000'}>5 000€</option>
                                <option key={6000} value={'6000'}>6 000€</option>
                                <option key={7000} value={'7000'}>7 000€</option>
                                <option key={8000} value={'8000'}>8 000€</option>
                                <option key={9000} value={'9000'}>9 000€</option>
                                <option key={10000} value={'10000'}>10 000€</option>
                                <option key={20000} value={'20000'}>20 000€</option>
                                <option key={30000} value={'30000'}>30 000€</option>
                                <option key={40000} value={'40000'}>40 000€</option>
                                <option key={50000} value={'50000'}>50 000€</option>
                                <option key={60000} value={'60000'}>60 000€</option>
                                <option key={70000} value={'70000'}>70 000€</option>
                                <option key={80000} value={'80000'}>80 000€</option>
                                <option key={90000} value={'90000'}>90 000€</option>
                                <option key={100000} value={'100000'}>100 000€</option>
                                <option key={150000} value={'150000'}>150 000€</option>
                                <option key={200000} value={'200000'}>200 000€</option>
                                <option key={0} value={'priceMore'}>More</option>
                            </select>
                        </div>
                    </div>
                    <div className='combobox-entity-filter-search'>
                        <div className='label'>Mileage from</div>
                        <div className="custom-combobox">
                            <select id="mileageComboBox" className='myComboBox' onChange={(e) => handleSelectedMileageFrom(e.target.value)}> 
                                <option value="">Select Mileage</option> 
                                <option key={1000} value={'1000'}>1 000 km</option>
                                <option key={5000} value={'5000'}>5 000 km</option>
                                <option key={10000} value={'10000'}>10 000 km</option>
                                <option key={50000} value={'50000'}>50 000 km</option>
                                <option key={100000} value={'100000'}>100 000 km</option>
                                <option key={200000} value={'200000'}>200 000 km</option>
                                <option key={0} value={'mileageMore'}>More</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="filter-search-links">
                    <Link to={'/moreFiltersPage'} className='more-filters-text'>More filters</Link>
                    <Link
                        to={`/searchList`}
                        state={{
                            brand: selectedBrand,
                            model: selectedModel,
                            price: { priceFrom: selectedPriceFrom, priceTo: ''},
                            mileage: { mileageFrom: selectedMileageFrom, mileageTo: '' },
                            fuelType: '',
                            powertrain: '',
                            gearbox: '',
                            power: { powerFrom: '', powerTo: '' },
                            models: [
                                { brand: selectedBrand, model: selectedModel }
                            ]
                        }}
                    >
                        <button className="styled-button">{searchedCarsNumber !== null && !loadingSearchedCarsNumber ? (searchedCarsNumber + " cars") : ("Loading cars")}</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default FilterSearch;