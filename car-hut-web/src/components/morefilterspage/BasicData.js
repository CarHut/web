import { radiantDarkTheme } from 'react-admin';
import APIMethods from '../../api/APIMethods';
import '../../css/morefilterspage/BasicData.css'
import React, { useState, useEffect } from 'react';

function BasicData({brand, setBrand, model, setModel, carType, setCarType, 
                    price, setPrice, mileage, setMileage, registration, setRegistration,
                    seatingConfig, setSeatingConfig, doors, setDoors, location, setLocation,
                    postalCode, setPostalCode, setLoadingSearchedCarsNumber}) {
    
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    const fetchBrands = async () => {
        const data = await APIMethods.getAllBrands();
        
        if (data === null) {
            return;
        }

        setBrands(data);
    }

    const fetchModelsByBrand = async (brand) => {
        const data = await APIMethods.getModelsByBrand(brand);

        if (data === null) {
            return;
        }

        setModels(data);
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
        setSelectedBrand(e.target.value);
        setBrand(e.target.value);
        setModel("");
        setSelectedModel("");
        setLoadingSearchedCarsNumber(true);
    }

    const handleSelectedModel = (e) => {
        setSelectedModel(e.target.value);
        setModel(e.target.value);
        setLoadingSearchedCarsNumber(true);
    }

    const handleSelectedCarType = (type) => {
        setCarType(type);
        setLoadingSearchedCarsNumber(true);
    }

    const handleSelectedPrice = (e) => {
        if (e.target.className == 'basic-data-styled-combobox price-from') {
            setPrice({ ...price, priceFrom: e.target.value });
        } else if (e.target.className == 'basic-data-styled-combobox price-to') {
            setPrice({ ...price, priceTo: e.target.value });
        }
        setLoadingSearchedCarsNumber(true);
    }

    const handleSelectedMileage = (e) => {
        if (e.target.className == 'basic-data-styled-combobox mileage-from') {
            setMileage({ ...mileage, mileageFrom: e.target.value });
        } else if (e.target.className == 'basic-data-styled-combobox mileage-to') {
            setMileage({ ...mileage, mileageTo: e.target.value });
        }
        setLoadingSearchedCarsNumber(true);
    }

    const handleSelectedRegistration = (e) => {
        if (e.target.className == 'basic-data-styled-combobox registration-from') {
            setRegistration({ ...registration, registrationFrom: e.target.value });
        } else if (e.target.className == 'basic-data-styled-combobox registration-to') {
            setRegistration({ ...registration, registrationTo: e.target.value });
        }
        setLoadingSearchedCarsNumber(true);
    }

    const handleSelectedSeatingConfig = (e) => {
        setSeatingConfig(e.target.value);
        setLoadingSearchedCarsNumber(true);
    }

    const handleSelectedDoors = (e) => {
        setDoors(e.target.value);
        setLoadingSearchedCarsNumber(true);
    }

    const renderBrands = () => {
        return (
            brands.map(brand => (
                <option key={brand.id} value={brand.brand}>{brand.brand}</option>
            ))
        )
    }

    const renderModels = () => {
        return (
            models.map(model => (
                <option key={model.id} value={model.model}>{model.model}</option>
            ))
        )
    }

    const renderCarTypes = () => {
        return (
            <div className='car-type-wrapper-basic-data'>
                <div className='car-type-entity-basic-data'>
                    <div className='car-type-left-wrapper-basic-data'>
                        <img className='car-type-img' src={require('../../images/morefilterspage/sedan.png')}/>
                        <div className='car-type-bottom-label-basic-data'>Sedan</div>
                    </div>
                    <div className='custom-checkbox-basic-data'>
                        <input type="checkbox"/>
                        <span className="checkmark-basic-data" onClick={() => handleSelectedCarType("Sedan")}></span>
                    </div>
                </div>
                <div className='car-type-entity-basic-data'>
                    <div className='car-type-left-wrapper-basic-data'>
                        <img className='car-type-img' src={require('../../images/morefilterspage/hatchback.png')}/>
                        <div className='car-type-bottom-label-basic-data'>Hatchback</div>
                    </div>
                    <div className='custom-checkbox-basic-data'>
                        <input type="checkbox"/>
                        <span className="checkmark-basic-data" onClick={() => handleSelectedCarType("Hatchback")}></span>
                    </div>
                </div>
                <div className='car-type-entity-basic-data'>
                    <div className='car-type-left-wrapper-basic-data'>
                        <img className='car-type-img' src={require('../../images/morefilterspage/combi.png')}/>
                        <div className='car-type-bottom-label-basic-data'>Combi</div>
                    </div>
                    <div className='custom-checkbox-basic-data'>
                        <input type="checkbox"/>
                        <span className="checkmark-basic-data" onClick={() => handleSelectedCarType("Combi")}></span>
                    </div>
                </div>
                <div className='car-type-entity-basic-data'>
                    <div className='car-type-left-wrapper-basic-data'>
                        <img className='car-type-img' src={require('../../images/morefilterspage/suv.png')}/>
                        <div className='car-type-bottom-label-basic-data'>SUV</div>
                    </div>
                    <div className='custom-checkbox-basic-data'>
                        <input type="checkbox"/>
                        <span className="checkmark-basic-data" onClick={() => handleSelectedCarType("SUV")}></span>
                    </div>
                </div>
                <div className='car-type-entity-basic-data'>
                    <div className='car-type-left-wrapper-basic-data'>
                        <img className='car-type-img' src={require('../../images/morefilterspage/coupe.png')}/>
                        <div className='car-type-bottom-label-basic-data'>Coupé</div>
                    </div>
                    <div className='custom-checkbox-basic-data'>
                        <input type="checkbox"/>
                        <span className="checkmark-basic-data" onClick={() => handleSelectedCarType("Coupé")}></span>
                    </div>
                </div>
                <div className='car-type-entity-basic-data'>
                    <div className='car-type-left-wrapper-basic-data'>
                        <img className='car-type-img' src={require('../../images/morefilterspage/cabriolet.png')}/>
                        <div className='car-type-bottom-label-basic-data'>Cabriolet</div>
                    </div>
                    <div className='custom-checkbox-basic-data'>
                        <input type="checkbox"/>
                        <span className="checkmark-basic-data" onClick={() => handleSelectedCarType("Cabriolet")}></span>
                    </div>
                </div>
                <div className='car-type-entity-basic-data'>
                    <div className='car-type-left-wrapper-basic-data'>
                        <img className='car-type-img' src={require('../../images/morefilterspage/minivan.png')}/>
                        <div className='car-type-bottom-label-basic-data'>Minivan</div>
                    </div>
                    <div className='custom-checkbox-basic-data'>
                        <input type="checkbox"/>
                        <span className="checkmark-basic-data" onClick={() => handleSelectedCarType("Minivan")}></span>
                    </div>
                </div>
                <div className='car-type-entity-basic-data'>
                    <div className='car-type-left-wrapper-basic-data'>
                        <img className='car-type-img' src={require('../../images/morefilterspage/other.png')}/>
                        <div className='car-type-bottom-label-basic-data'>Other</div>
                    </div>
                    <div className='custom-checkbox-basic-data'>
                        <input type="checkbox"/>
                        <span className="checkmark-basic-data" onClick={() => handleSelectedCarType("Other")}></span>
                    </div>
                </div>
            </div>
        )
    }

    const renderPrice = (className) => {
        return (
            <div className="basic-data-combobox">
                <select className={className} onChange={(e) => handleSelectedPrice(e)}>
                    <option value="">From (€)</option>
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
        )
    }

    const renderMileage = (className) => {
        return (
            <div className="basic-data-combobox">
                <select className={className} onChange={(e) => handleSelectedMileage(e)}>
                    <option value="" >From (km)</option>
                    <option key={1000} value={'1000'}>1 000 km</option>
                    <option key={5000} value={'5000'}>5 000 km</option>
                    <option key={10000} value={'10000'}>10 000 km</option>
                    <option key={50000} value={'50000'}>50 000 km</option>
                    <option key={100000} value={'100000'}>100 000 km</option>
                    <option key={200000} value={'200000'}>200 000 km</option>
                    <option key={0} value={'mileageMore'}>More</option>
                </select>
            </div>
        )
    }

    const renderRegistration = (className) => {
        return (
            <div className="basic-data-combobox">
                <select className={className} onChange={(e) => handleSelectedRegistration(e)}>
                    <option value=""  >From</option>
                    <option key={2024} value={'2024'}>2024</option>
                    <option key={2023} value={'2023'}>2023</option>
                    <option key={2022} value={'2022'}>2022</option>
                    <option key={2021} value={'2021'}>2021</option>
                    <option key={2020} value={'2020'}>2020</option>
                    <option key={2019} value={'2019'}>2019</option>
                    <option key={2018} value={'2018'}>2018</option>
                    <option key={2017} value={'2017'}>2017</option>
                    <option key={2016} value={'2016'}>2016</option>
                    <option key={2015} value={'2015'}>2015</option>
                    <option key={2014} value={'2014'}>2014</option>
                    <option key={2013} value={'2013'}>2013</option>
                    <option key={2012} value={'2012'}>2012</option>
                    <option key={2011} value={'2011'}>2011</option>
                    <option key={2010} value={'2010'}>2010</option>
                    <option key={2009} value={'2009'}>2009</option>
                    <option key={2008} value={'2008'}>2008</option>
                    <option key={2007} value={'2007'}>2007</option>
                    <option key={2006} value={'2006'}>2006</option>
                    <option key={2005} value={'2005'}>2005</option>
                    <option key={2004} value={'2004'}>2004</option>
                    <option key={2003} value={'2003'}>2003</option>
                    <option key={2002} value={'2002'}>2002</option>
                    <option key={2001} value={'2001'}>2001</option>
                    <option key={2000} value={'2000'}>2000</option>
                    <option key={1999} value={'1999'}>1999</option>
                    <option key={1998} value={'1998'}>1998</option>
                    <option key={1997} value={'1997'}>1997</option>
                    <option key={1996} value={'1996'}>1996</option>
                    <option key={1995} value={'1995'}>1995</option>
                    <option key={1990} value={'1990'}>1990</option>
                    <option key={1985} value={'1985'}>1985</option>
                    <option key={1980} value={'1980'}>1980</option>
                    <option key={1970} value={'1970'}>1970</option>
                    <option key={1960} value={'1960'}>1960</option>
                    <option key={0} value={'registrationOlder'}>Older</option>
                </select>
            </div>
        )
    }

    const renderSeatingConfig = () => {
        return (
            <div className="basic-data-combobox">
                <select className='basic-data-styled-combobox' onChange={(e) => handleSelectedSeatingConfig(e)}>
                    <option value="">No. of seast</option>
                    <option key={2} value="seats2">2</option>
                    <option key={3} value="seats3">3</option>
                    <option key={4} value="seats4">4</option>
                    <option key={5} value="seats5">5</option>
                    <option key={6} value="seats6">6</option>
                    <option key={7} value="seats7">7</option>
                    <option key={8} value="seatsMore">More</option>
                </select>
            </div>
        )
    }

    const renderDoors = () => {
        return (
            <div className="basic-data-combobox">
                <select className='basic-data-styled-combobox' onChange={(e) => handleSelectedDoors(e)}>
                    <option value="" >No. of doors</option>
                    <option key={23} value="doors23">2/3</option>
                    <option key={45} value="doors45">4/5</option>
                    <option key={67} value="doors67">6/7</option>
                </select>
            </div>
        )
    }


    return (
        <div className='section-body-basic-data'>
            <div className='section-header-basic-data'>Basic data</div>
            <div className='line-container-basic-data'/>
            <div className='upper-section-wrapper-basic-data'>
                <div className='upper-section-left-basic-data'>
                    <div className='basic-data-combobox-entity'>
                        <div className='label-basic-data'>Brand</div>
                        <div className="basic-data-combobox">
                            <select id="brandComboBox" className='basic-data-styled-combobox' value={selectedBrand} onChange={(e) => handleSelectedBrand(e)}>
                                <option value="all" disabled>Select Brand</option>
                                {renderBrands()}
                            </select>
                        </div>
                    </div>
                    <div className='basic-data-combobox-entity'>
                        <div className='label-basic-data'>Model</div>
                        <div className="basic-data-combobox">
                            <select id="modelComboBox" className={`basic-data-styled-combobox ${!selectedBrand ? 'disabled' : ''}`} value={selectedModel} onChange={(e) => handleSelectedModel(e)} disabled={!selectedBrand}>
                                <option value="all" disabled={!selectedBrand}>Select Model</option>
                                {renderModels()}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='upper-section-right-basic-data'>   
                    <div className='label-basic-data'>Car type</div>
                    {renderCarTypes()}
                </div>
            </div>
            <div className='line-container-basic-data'/>
            <div className='lower-section-wrapper-basic-data'>
                <div className='lower-section-left-basic-data'>
                    <div className='lower-combobox-wrapper-basic-data'>   
                        <div className='lower-combobox-content-basic-data'>
                            <div className='basic-data-combobox-entity'>
                            <div className='label-basic-data'>Price</div>
                                {renderPrice('basic-data-styled-combobox price-from')}
                            </div>
                            <div className='basic-data-combobox-entity'>   
                                <div className='label-basic-data'>{'\0'}</div>
                                {renderPrice('basic-data-styled-combobox price-to')}
                            </div>
                        </div>
                    </div>
                    <div className='lower-combobox-wrapper-basic-data'>   
                        <div className='lower-combobox-content-basic-data'>
                            <div className='basic-data-combobox-entity'>
                                <div className='label-basic-data'>Mileage</div>
                                {renderMileage('basic-data-styled-combobox mileage-from')}
                            </div>
                            <div className='basic-data-combobox-entity'>
                                <div className='label-basic-data'>{'\0'}</div>
                                {renderMileage('basic-data-styled-combobox mileage-to')}
                            </div>
                        </div>
                    </div>
                    <div className='lower-combobox-wrapper-basic-data'>   
                        <div className='lower-combobox-content-basic-data'>
                            <div className='basic-data-combobox-entity'>
                                <div className='label-basic-data'>Registration</div>
                                {renderRegistration('basic-data-styled-combobox registration-from')}
                            </div>
                            <div className='basic-data-combobox-entity'>
                                <div className='label-basic-data'>{'\0'}</div>
                                {renderRegistration('basic-data-styled-combobox registration-to')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='lower-section-right-basic-data'>
                    <div className='lower-combobox-wrapper-basic-data'>
                        <div className='lower-combobox-content-basic-data'>
                            <div className='basic-data-combobox-entity'>
                                <div className='label-basic-data'>Seating configuration</div>
                                {renderSeatingConfig()}
                            </div>
                        </div>
                    </div>
                    <div className='lower-combobox-wrapper-basic-data'>
                        <div className='lower-combobox-content-basic-data'>
                            <div className='basic-data-combobox-entity'>
                                <div className='label-basic-data'>Doors</div>
                                {renderDoors()}
                            </div>
                        </div>
                    </div>
                    <div className='lower-combobox-wrapper-basic-data'>
                        <div className='lower-combobox-content-basic-data'>
                            <div className='basic-data-combobox-entity'>
                                <div className='label-basic-data'>Location</div>
                                <div className="basic-data-combobox">
                                    <select className='basic-data-styled-combobox'>
                                        <option value="" disabled ></option>
                                    </select>
                                </div>
                            </div>
                            <div className="custom-input-container-basic-data">
                                <div className='label-basic-data'>{'\0'}</div>
                                <input type="text" id="customInput" className="custom-input-basic-data" placeholder="Postal code"/>
                            </div>
                        </div>      
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasicData;