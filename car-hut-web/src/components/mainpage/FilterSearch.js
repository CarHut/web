import '../../css/mainpage/FilterSearch.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import APIMethods from '../../api/APIMethods';
import ComboBox from '../maincomponents/ComboBox';
import RegularButton from '../maincomponents/RegularButton';

function FilterSearch() {
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedPriceFrom, setSelectedPriceFrom] = useState('');
    const [selectedMileageFrom, setSelectedMileageFrom] = useState('');
    const [searchedCarsNumber, setSearchedCarsNumber] = useState(null);
    const [loadingSearchedCarsNumber, setLoadingSearchedCarsNumber] = useState(true);

    const comboBoxSizingWidth = {
        standardSize: "10vw",
        mediumSize:   "20vw",
        smallSize:    "25vw"
    };

    const comboBoxSizingHeight = {
        standardSize: "2vw",
        mediumSize:   "4vw",
        smallSize:    "6vw"
    }

    const regularButtonSizingWidth = {
        standardSize: "10vw",
        mediumSize:   "14vw",
        smallSize:    "25vw"
    };

    const regularButtonSizingHeight = {
        standardSize: "3vw",
        mediumSize:   "6vw",
        smallSize:    "8vw"
    }

    const updateSearchedCarsNumber = async () => {
        try {
            const result = await APIMethods.getNumberOfFilteredCars(`brand=${selectedBrand}&model=${selectedModel}&priceFrom=${selectedPriceFrom}&mileageFrom=${selectedMileageFrom}`, null) 
            setSearchedCarsNumber(result);
            setLoadingSearchedCarsNumber(false);
        } catch (error) {
            console.error('[MainPage][FilterSearch][updateSearchedCarsNumber]: cannot fetch number of filtered cars. Error: ', error);
            setLoadingSearchedCarsNumber(false);
        }
    }

    useEffect(() => {
        updateSearchedCarsNumber();
    }, [selectedBrand, selectedModel, selectedPriceFrom, selectedMileageFrom, brands]);

    const fetchBrands = async () => {
        try {
            const data = await APIMethods.getAllBrands();
            setBrands(data);
            setLoadingSearchedCarsNumber(true);
        } catch (error) {
            console.error('[MainPage][FilterSearch][fetchBrands]: cannot fetch brands. Error: ', error);
            setLoadingSearchedCarsNumber(false);
        }
    }

    const fetchModelsByBrand = async (brand) => {
        try {
            const data = await APIMethods.getModelsByBrand(selectedBrand); 
            setModels(data);
            setLoadingSearchedCarsNumber(true);
        } catch (error) {
            console.log(`[MainPage][FilterSearch][fetchModelsByBrand]: cannot fetch models for brand=${brand}. Error: ${error}`)
            setLoadingSearchedCarsNumber(false);
        }
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

    const renderBrands = () => {
        const options = [];

        // Push empty option
        options.push({ key: '-1', value: '', textValue: 'Select brand'});

        brands.map(brand => {
            options.push({ key: brand.id, value: brand.brand, textValue: brand.brand});
        });

        return (
            <ComboBox label={'Brands'} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={options} onChangeHandler={(e) => handleSelectedBrand(e.target.value)}/>
        )        
    }

    const renderModels = () => {
        const options = [];

        // Push empty option
        options.push({ key: '-1', value: '', textValue: 'Select model'});

        models.map(model => {
            options.push({ key: model.id, value: model.model, textValue: model.model});
        });

        return (
            <ComboBox label={'Models'} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={options} onChangeHandler={(e) => handleSelectedModel(e.target.value)}/>
        ) 
    }

    const renderPriceComboBox = () => {
        const optionValues = [
            {key: -1,     value: '',         textValue: "Select price" },
            {key: 1000,   value: '1000',     textValue: "1 000€"       },
            {key: 2000,   value: '2000',     textValue: "2 000€"       },
            {key: 3000,   value: '3000',     textValue: "3 000€"       },
            {key: 4000,   value: '4000',     textValue: "4 000€"       },
            {key: 5000,   value: '5000',     textValue: "5 000€"       },
            {key: 6000,   value: '6000',     textValue: "6 000€"       },
            {key: 7000,   value: '7000',     textValue: "7 000€"       },
            {key: 8000,   value: '8000',     textValue: "8 000€"       },
            {key: 9000,   value: '9000',     textValue: "9 000€"       },
            {key: 10000,  value: '10000',    textValue: '10 000€'      },
            {key: 20000,  value: '20000',    textValue: '20 000€'      },
            {key: 30000,  value: '30000',    textValue: '30 000€'      },
            {key: 40000,  value: '40000',    textValue: '40 000€'      },
            {key: 50000,  value: '50000',    textValue: '50 000€'      },
            {key: 60000,  value: '60000',    textValue: '60 000€'      },
            {key: 70000,  value: '70000',    textValue: '70 000€'      },
            {key: 80000,  value: '80000',    textValue: '80 000€'      },
            {key: 90000,  value: '90000',    textValue: '90 000€'      },
            {key: 100000, value: '100000',   textValue: '100 000€'     },
            {key: 150000, value: '150000',   textValue: '150 000€'     },
            {key: 200000, value: '200000',   textValue: '200 000€'     },
            {key: 0,      value:'priceMore', textValue: 'More'         }
        ];

        return (
            <ComboBox label={'Price from'} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={optionValues}  onChangeHandler={(e) => handleSelectedPriceFrom(e.target.value)}/>
        );
    }

    const renderMileageComboBox = () => {
        const optionValues = [
            { key: -1,     value: '',       textValue: "Select mileage" },
            { key: 1000,   value: '1000',   textValue: "1 000 km"       },
            { key: 5000,   value: '5000',   textValue: "5 000 km"       },
            { key: 10000,  value: '10000',  textValue: "10 000 km"      },
            { key: 50000,  value: '50000',  textValue: "50 000 km"      },
            { key: 100000, value: '100000', textValue: "100 000 km"     },
            { key: 200000, value: '200000', textValue: "200 000 km"     },
            { key: 0,      value: '0',      textValue: "More"           }
        ];

        return (
            <ComboBox label={'Mileage from'} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={optionValues}  onChangeHandler={(e) => handleSelectedMileageFrom(e.target.value)}/>
        );
    }

    const renderSearchButton = () => {
        return (
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
                <RegularButton 
                    label={searchedCarsNumber !== null && !loadingSearchedCarsNumber ? (searchedCarsNumber + " cars") : ("Loading cars")} 
                    buttonWidth={regularButtonSizingWidth}
                    buttonHeight={regularButtonSizingHeight}
                />
            </Link>
        );
    }


    return (
        <div className='section-body'>
            <img className='img-filter-search' src={require('../../images/mainpage/find_car.png')}/>
            <div className='right-wrapper'>
                <div className='comboboxes-filter-search'>
                    <div className='combobox-filter-search-item'>
                        {renderBrands()}
                    </div>
                    <div className='combobox-filter-search-item'>
                        {renderModels()}    
                    </div>
                    <div className='combobox-filter-search-item'>
                        {renderPriceComboBox()}       
                    </div>
                    <div className='combobox-filter-search-item'>
                        {renderMileageComboBox()}
                    </div>
                </div>
                <div className="filter-search-links">
                    <Link to={'/moreFiltersPage'} className='more-filters-text-search-list-main-page'>More filters</Link>
                    {renderSearchButton()}
                </div>
            </div>
        </div>
    );
}

export default FilterSearch;