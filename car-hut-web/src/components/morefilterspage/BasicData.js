import '../../css/BasicData.css'
import React, { useState, useEffect } from 'react';

function BasicData() {
    
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
        // Fetch models when a brand is 
        if (selectedBrand) {
            fetch(`http://localhost:8080/api/getModelsByBrand/${selectedBrand}`)
                .then(response => response.json())
                .then(data => setModels(data))
                .catch(error => console.error('Error fetching models:', error));
        } else {
            // Clear models when no brand is 
            setModels([]);
        }
    }, [selectedBrand]);


    return (
        <div className='section-body-basic-data'>
            <div className='section-header-basic-data'>Basic data</div>
            <div className='line-container'/>
            <div className='upper-section-wrapper'>
                <div className='upper-section-left'>
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
                </div>
                <div className='upper-section-right'>   
                    <div className='label'>Car type</div>
                    <div className='car-type-wrapper'>
                        <div className='car-type-entity'>
                            <div className='car-type-left-wrapper'>
                                <img className='car-type-img' src={require('../../images/morefilterspage/sedan.png')}/>
                                <div className='car-type-bottom-label'>Sedan</div>
                            </div>
                            <label className='custom-checkbox'>
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className='car-type-entity'>
                            <div className='car-type-left-wrapper'>
                                <img className='car-type-img' src={require('../../images/morefilterspage/hatchback.png')}/>
                                <div className='car-type-bottom-label'>Hatchback</div>
                            </div>
                            <label className='custom-checkbox'>
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className='car-type-entity'>
                            <div className='car-type-left-wrapper'>
                                <img className='car-type-img' src={require('../../images/morefilterspage/combi.png')}/>
                                <div className='car-type-bottom-label'>Combi</div>
                            </div>
                            <label className='custom-checkbox'>
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className='car-type-entity'>
                            <div className='car-type-left-wrapper'>
                                <img className='car-type-img' src={require('../../images/morefilterspage/suv.png')}/>
                                <div className='car-type-bottom-label'>SUV</div>
                            </div>
                            <label className='custom-checkbox'>
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className='car-type-entity'>
                            <div className='car-type-left-wrapper'>
                                <img className='car-type-img' src={require('../../images/morefilterspage/coupe.png')}/>
                                <div className='car-type-bottom-label'>Coupé</div>
                            </div>
                            <label className='custom-checkbox'>
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className='car-type-entity'>
                            <div className='car-type-left-wrapper'>
                                <img className='car-type-img' src={require('../../images/morefilterspage/cabriolet.png')}/>
                                <div className='car-type-bottom-label'>Cabriolet</div>
                            </div>
                            <label className='custom-checkbox'>
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className='car-type-entity'>
                            <div className='car-type-left-wrapper'>
                                <img className='car-type-img' src={require('../../images/morefilterspage/minivan.png')}/>
                                <div className='car-type-bottom-label'>Minivan</div>
                            </div>
                            <label className='custom-checkbox'>
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className='car-type-entity'>
                            <div className='car-type-left-wrapper'>
                                <img className='car-type-img' src={require('../../images/morefilterspage/other.png')}/>
                                <div className='car-type-bottom-label'>Other</div>
                            </div>
                            <label className='custom-checkbox'>
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className='line-container'/>
            <div className='lower-section-wrapper'>
                <div className='lower-section-left'>
                    <div className='lower-combobox-wrapper'>   
                        <div className='lower-combobox-content'>
                            <div className='combobox-entity'>
                            <div className='label'>Price</div>
                                <div className="custom-combobox">
                                    <select className='myComboBox'>
                                        <option value="">From (€)</option>
                                        <option key={1000} value={'price1000f'}>1 000€</option>
                                        <option key={2000} value={'price2000f'}>2 000€</option>
                                        <option key={3000} value={'price3000f'}>3 000€</option>
                                        <option key={4000} value={'price4000f'}>4 000€</option>
                                        <option key={5000} value={'price5000f'}>5 000€</option>
                                        <option key={6000} value={'price6000f'}>6 000€</option>
                                        <option key={7000} value={'price7000f'}>7 000€</option>
                                        <option key={8000} value={'price8000f'}>8 000€</option>
                                        <option key={9000} value={'price9000f'}>9 000€</option>
                                        <option key={10000} value={'price10000f'}>10 000€</option>
                                        <option key={20000} value={'price20000f'}>20 000€</option>
                                        <option key={30000} value={'price30000f'}>30 000€</option>
                                        <option key={40000} value={'price40000f'}>40 000€</option>
                                        <option key={50000} value={'price50000f'}>50 000€</option>
                                        <option key={60000} value={'price60000f'}>60 000€</option>
                                        <option key={70000} value={'price70000f'}>70 000€</option>
                                        <option key={80000} value={'price80000f'}>80 000€</option>
                                        <option key={90000} value={'price90000f'}>90 000€</option>
                                        <option key={100000} value={'price100000f'}>100 000€</option>
                                        <option key={150000} value={'price150000f'}>150 000€</option>
                                        <option key={200000} value={'price200000f'}>200 000€</option>
                                        <option key={0} value={'priceMoref'}>More</option>
                                    </select>
                                </div>
                            </div>
                            <div className='combobox-entity'>   
                                <div className='label'>{'\0'}</div>
                                <div className="custom-combobox">
                                    <select className='myComboBox'>
                                        <option value="">To (€)</option>
                                        <option key={1000} value={'price1000t'}>1 000€</option>
                                        <option key={2000} value={'price2000t'}>2 000€</option>
                                        <option key={3000} value={'price3000t'}>3 000€</option>
                                        <option key={4000} value={'price4000t'}>4 000€</option>
                                        <option key={5000} value={'price5000t'}>5 000€</option>
                                        <option key={6000} value={'price6000t'}>6 000€</option>
                                        <option key={7000} value={'price7000t'}>7 000€</option>
                                        <option key={8000} value={'price8000t'}>8 000€</option>
                                        <option key={9000} value={'price9000t'}>9 000€</option>
                                        <option key={10000} value={'price10000t'}>10 000€</option>
                                        <option key={20000} value={'price20000t'}>20 000€</option>
                                        <option key={30000} value={'price30000t'}>30 000€</option>
                                        <option key={40000} value={'price40000t'}>40 000€</option>
                                        <option key={50000} value={'price50000t'}>50 000€</option>
                                        <option key={60000} value={'price60000t'}>60 000€</option>
                                        <option key={70000} value={'price70000t'}>70 000€</option>
                                        <option key={80000} value={'price80000t'}>80 000€</option>
                                        <option key={90000} value={'price90000t'}>90 000€</option>
                                        <option key={100000} value={'price100000t'}>100 000€</option>
                                        <option key={150000} value={'price150000t'}>150 000€</option>
                                        <option key={200000} value={'price200000t'}>200 000€</option>
                                        <option key={0} value={'priceMoret'}>More</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lower-combobox-wrapper'>   
                        <div className='lower-combobox-content'>
                            <div className='combobox-entity'>
                                <div className='label'>Mileage</div>
                                <div className="custom-combobox">
                                    <select className='myComboBox'>
                                        <option value="" >From (km)</option>
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
                            <div className='combobox-entity'>
                                <div className='label'>{'\0'}</div>
                                <div className="custom-combobox">
                                    <select className='myComboBox'>
                                        <option value="" >To (km)</option>
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
                    </div>
                    <div className='lower-combobox-wrapper'>   
                        <div className='lower-combobox-content'>
                            <div className='combobox-entity'>
                                <div className='label'>Registration</div>
                                <div className="custom-combobox">
                                    <select className='myComboBox'>
                                        <option value=""  >From</option>
                                        <option key={2024} value={'registration2024f'}>2024</option>
                                        <option key={2023} value={'registration2023f'}>2023</option>
                                        <option key={2022} value={'registration2022f'}>2022</option>
                                        <option key={2021} value={'registration2021f'}>2021</option>
                                        <option key={2020} value={'registration2020f'}>2020</option>
                                        <option key={2019} value={'registration2019f'}>2019</option>
                                        <option key={2018} value={'registration2018f'}>2018</option>
                                        <option key={2017} value={'registration2017f'}>2017</option>
                                        <option key={2016} value={'registration2016f'}>2016</option>
                                        <option key={2015} value={'registration2015f'}>2015</option>
                                        <option key={2014} value={'registration2014f'}>2014</option>
                                        <option key={2013} value={'registration2013f'}>2013</option>
                                        <option key={2012} value={'registration2012f'}>2012</option>
                                        <option key={2011} value={'registration2011f'}>2011</option>
                                        <option key={2010} value={'registration2010f'}>2010</option>
                                        <option key={2009} value={'registration2009f'}>2009</option>
                                        <option key={2008} value={'registration2008f'}>2008</option>
                                        <option key={2007} value={'registration2007f'}>2007</option>
                                        <option key={2006} value={'registration2006f'}>2006</option>
                                        <option key={2005} value={'registration2005f'}>2005</option>
                                        <option key={2004} value={'registration2004f'}>2004</option>
                                        <option key={2003} value={'registration2003f'}>2003</option>
                                        <option key={2002} value={'registration2002f'}>2002</option>
                                        <option key={2001} value={'registration2001f'}>2001</option>
                                        <option key={2000} value={'registration2000f'}>2000</option>
                                        <option key={1999} value={'registration1999f'}>1999</option>
                                        <option key={1998} value={'registration1998f'}>1998</option>
                                        <option key={1997} value={'registration1997f'}>1997</option>
                                        <option key={1996} value={'registration1996f'}>1996</option>
                                        <option key={1995} value={'registration1995f'}>1995</option>
                                        <option key={1990} value={'registration1990f'}>1990</option>
                                        <option key={1985} value={'registration1985f'}>1985</option>
                                        <option key={1980} value={'registration1980f'}>1980</option>
                                        <option key={1970} value={'registration1970f'}>1970</option>
                                        <option key={1960} value={'registration1960f'}>1960</option>
                                        <option key={0} value={'registrationOlderf'}>Older</option>
                                    </select>
                                </div>
                            </div>
                            <div className='combobox-entity'>
                                <div className='label'>{'\0'}</div>
                                <div className="custom-combobox">
                                    <select className='myComboBox'>
                                        <option value=""  >To</option>
                                        <option key={2024} value={'registration2024t'}>2024</option>
                                        <option key={2023} value={'registration2023t'}>2023</option>
                                        <option key={2022} value={'registration2022t'}>2022</option>
                                        <option key={2021} value={'registration2021t'}>2021</option>
                                        <option key={2020} value={'registration2020t'}>2020</option>
                                        <option key={2019} value={'registration2019t'}>2019</option>
                                        <option key={2018} value={'registration2018t'}>2018</option>
                                        <option key={2017} value={'registration2017t'}>2017</option>
                                        <option key={2016} value={'registration2016t'}>2016</option>
                                        <option key={2015} value={'registration2015t'}>2015</option>
                                        <option key={2014} value={'registration2014t'}>2014</option>
                                        <option key={2013} value={'registration2013t'}>2013</option>
                                        <option key={2012} value={'registration2012t'}>2012</option>
                                        <option key={2011} value={'registration2011t'}>2011</option>
                                        <option key={2010} value={'registration2010t'}>2010</option>
                                        <option key={2009} value={'registration2009t'}>2009</option>
                                        <option key={2008} value={'registration2008t'}>2008</option>
                                        <option key={2007} value={'registration2007t'}>2007</option>
                                        <option key={2006} value={'registration2006t'}>2006</option>
                                        <option key={2005} value={'registration2005t'}>2005</option>
                                        <option key={2004} value={'registration2004t'}>2004</option>
                                        <option key={2003} value={'registration2003t'}>2003</option>
                                        <option key={2002} value={'registration2002t'}>2002</option>
                                        <option key={2001} value={'registration2001t'}>2001</option>
                                        <option key={2000} value={'registration2000t'}>2000</option>
                                        <option key={1999} value={'registration1999t'}>1999</option>
                                        <option key={1998} value={'registration1998t'}>1998</option>
                                        <option key={1997} value={'registration1997t'}>1997</option>
                                        <option key={1996} value={'registration1996t'}>1996</option>
                                        <option key={1995} value={'registration1995t'}>1995</option>
                                        <option key={1990} value={'registration1990t'}>1990</option>
                                        <option key={1985} value={'registration1985t'}>1985</option>
                                        <option key={1980} value={'registration1980t'}>1980</option>
                                        <option key={1970} value={'registration1970t'}>1970</option>
                                        <option key={1960} value={'registration1960t'}>1960</option>
                                        <option key={0} value={'registrationOldert'}>Older</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='lower-section-right'>
                    <div className='lower-combobox-wrapper'>
                        <div className='lower-combobox-content'>
                            <div className='combobox-entity'>
                                <div className='label'>Seating configuration</div>
                                <div className="custom-combobox">
                                    <select className='myComboBox'>
                                        <option value="">No. of seast</option>
                                        <option key={2} value="seats2">2</option>
                                        <option key={2} value="seats3">3</option>
                                        <option key={2} value="seats4">4</option>
                                        <option key={2} value="seats5">5</option>
                                        <option key={2} value="seats6">6</option>
                                        <option key={2} value="seats7">7</option>
                                        <option key={2} value="seatsMore">More</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lower-combobox-wrapper'>
                        <div className='lower-combobox-content'>
                            <div className='combobox-entity'>
                                <div className='label'>Doors</div>
                                <div className="custom-combobox">
                                    <select className='myComboBox'>
                                        <option value="" >No. of doors</option>
                                        <option key={23} value="doors23">2/3</option>
                                        <option key={45} value="doors45">4/5</option>
                                        <option key={67} value="doors67">6/7</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lower-combobox-wrapper'>
                        <div className='lower-combobox-content'>
                            <div className='combobox-entity'>
                                <div className='label'>Location</div>
                                <div className="custom-combobox">
                                    <select className='myComboBox'>
                                        <option value="" disabled ></option>
                                    </select>
                                </div>
                            </div>
                            <div className="custom-input-container">
                                <div className='label'>{'\0'}</div>
                                <input type="text" id="customInput" className="custom-input" placeholder="Postal code"/>
                            </div>
                        </div>      
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasicData;