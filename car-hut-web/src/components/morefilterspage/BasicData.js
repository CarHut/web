import APIMethods from '../../api/APIMethods';
import '../../css/morefilterspage/BasicData.css'
import React, { useState, useEffect } from 'react';
import ComboBox from '../maincomponents/ComboBox';
import TextInputField from '../maincomponents/TextInputField';
import { WithListContext } from 'react-admin';

function BasicData({brand, setBrand, model, setModel, carTypes, setCarTypes, 
                    price, setPrice, mileage, setMileage, registration, setRegistration,
                    seatingConfig, setSeatingConfig, doors, setDoors, location, setLocation,
                    postalCode, setPostalCode, setLoadingSearchedCarsNumber}) {
    
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

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

    const textInputFieldSizingWidth = {
        standardSize: "10vw",
        mediumSize:   "15vw",
        smallSize:    "28vw"
    };

    const textInputFieldSizingHeight = {
        standardSize: "2vw",
        mediumSize:   "3vw",
        smallSize:    "4vw"
    }

    const fetchBrands = async () => {
        try {
            const data = await APIMethods.getAllBrands();
            
            if (data === null) {
                return;
            }

            setBrands(data);
        } catch (error) {
            console.log(`[MoreFiltersPage][BasicData][fetchBrands][ERROR] - Cannot fetch brands. Stack trace message: ${error}`);
        }
    }

    const fetchModelsByBrand = async (brand) => {
        try {
            const data = await APIMethods.getModelsByBrand(brand);
    
            if (data === null) {
                return;
            }
    
            setModels(data);
        } catch (error) {
            console.log(`[MoreFiltersPage][BasicData][fetchModelsByBrand][ERROR] - Cannot fetch models for brand ${brand}. Stack trace message: ${error}`);
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
        if (carTypes.includes(type)) {
            const temp = [...carTypes];
            temp.splice(carTypes.indexOf(type), 1);
            setCarTypes(temp);
        } else {
            setCarTypes([type, ...carTypes])
        }
        setLoadingSearchedCarsNumber(true);
    }

    const handleSelectedPrice = (type, e) => {
        if (type === 'price-from') {
            setPrice({ ...price, priceFrom: e.target.value });
        } else if (type === 'price-to') {
            setPrice({ ...price, priceTo: e.target.value });
        }
        setLoadingSearchedCarsNumber(true);
    }

    const handleSelectedMileage = (type, e) => {
        if (type === 'mileage-from') {
            setMileage({ ...mileage, mileageFrom: e.target.value });
        } else if (type === 'mileage-to') {
            setMileage({ ...mileage, mileageTo: e.target.value });
        }
        setLoadingSearchedCarsNumber(true);
    }

    const handleSelectedRegistration = (type, e) => {
        if (type === 'registration-from') {
            setRegistration({ ...registration, registrationFrom: e.target.value });
        } else if (type === 'registration-to') {
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
        const options = [];
        options.push({ key: '-1', value: '', textValue: 'Select brand' });
        brands.map((brand) => options.push({ key: brand.id, value: brand.brand, textValue: brand.brand }));

        return (
            <ComboBox 
                label={'Brand'} 
                width={comboBoxSizingWidth} 
                height={comboBoxSizingHeight} 
                optionValues={options}
                onChangeHandler={(e) => handleSelectedBrand(e)}
            />
        );
    }

    const renderModels = () => {
        const options = [];
        options.push({ key: '-1', value: '', textValue: 'Select model' });
        models.map((model) => options.push({ key: model.id, value: model.model, textValue: model.model }));

        return (
            <ComboBox 
                label={'Model'} 
                width={comboBoxSizingWidth} 
                height={comboBoxSizingHeight} 
                optionValues={options}
                onChangeHandler={(e) => handleSelectedModel(e)}
            />
        );
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
                        <input className='basic-data-input' type="checkbox" onClick={() => handleSelectedCarType("Sedan")}></input> 
                    </div>
                </div>
                <div className='car-type-entity-basic-data'>
                    <div className='car-type-left-wrapper-basic-data'>
                        <img className='car-type-img' src={require('../../images/morefilterspage/hatchback.png')}/>
                        <div className='car-type-bottom-label-basic-data'>Hatchback</div>
                    </div>
                    <div className='custom-checkbox-basic-data'>
                        <input className='basic-data-input' type="checkbox" onClick={() => handleSelectedCarType("Hatchback")}></input> 
                    </div>
                </div>
                <div className='car-type-entity-basic-data'>
                    <div className='car-type-left-wrapper-basic-data'>
                        <img className='car-type-img' src={require('../../images/morefilterspage/combi.png')}/>
                        <div className='car-type-bottom-label-basic-data'>Combi</div>
                    </div>
                    <div className='custom-checkbox-basic-data'>
                        <input className='basic-data-input' type="checkbox" onClick={() => handleSelectedCarType("Combi")}></input>        
                    </div>
                </div>
                <div className='car-type-entity-basic-data'>
                    <div className='car-type-left-wrapper-basic-data'>
                        <img className='car-type-img' src={require('../../images/morefilterspage/suv.png')}/>
                        <div className='car-type-bottom-label-basic-data'>SUV</div>
                    </div>
                    <div className='custom-checkbox-basic-data'>
                        <input className='basic-data-input' type="checkbox" onClick={() => handleSelectedCarType("SUV")}></input> 
                    </div>
                </div>
                <div className='car-type-entity-basic-data'>
                    <div className='car-type-left-wrapper-basic-data'>
                        <img className='car-type-img' src={require('../../images/morefilterspage/coupe.png')}/>
                        <div className='car-type-bottom-label-basic-data'>Coupé</div>
                    </div>
                    <div className='custom-checkbox-basic-data'>
                        <input className='basic-data-input' type="checkbox" onClick={() => handleSelectedCarType("Coupe")}></input> 
                    </div>
                </div>
                <div className='car-type-entity-basic-data'>
                    <div className='car-type-left-wrapper-basic-data'>
                        <img className='car-type-img' src={require('../../images/morefilterspage/cabriolet.png')}/>
                        <div className='car-type-bottom-label-basic-data'>Cabriolet</div>
                    </div>
                    <div className='custom-checkbox-basic-data'>
                        <input className='basic-data-input' type="checkbox" onClick={() => handleSelectedCarType("Cabriolet")}></input>     
                    </div>
                </div>
                <div className='car-type-entity-basic-data'>
                    <div className='car-type-left-wrapper-basic-data'>
                        <img className='car-type-img' src={require('../../images/morefilterspage/minivan.png')}/>
                        <div className='car-type-bottom-label-basic-data'>Minivan</div>
                    </div>
                    <div className='custom-checkbox-basic-data'>
                        <input className='basic-data-input' type="checkbox" onClick={() => handleSelectedCarType("Minivan")}></input> 
                    </div>
                </div>
                <div className='car-type-entity-basic-data'>
                    <div className='car-type-left-wrapper-basic-data'>
                        <img className='car-type-img' src={require('../../images/morefilterspage/other.png')}/>
                        <div className='car-type-bottom-label-basic-data'>Other</div>
                    </div>
                    <div className='custom-checkbox-basic-data'>
                        <input className='basic-data-input' type="checkbox" onClick={() => handleSelectedCarType("Other")}></input> 
                    </div>
                </div>
            </div>
        )
    }

    const renderPrice = (className) => {

        const options = [
            { key: '-1',     value: '',          textValue: className.includes("price-from") ? "From €"  : "To €"  },
            { key: '1000',   value: '1000',      textValue: '1 000€'                                               },           
            { key: '2000',   value: '2000',      textValue: '2 000€'                                               },           
            { key: '3000',   value: '3000',      textValue: '3 000€'                                               },           
            { key: '4000',   value: '4000',      textValue: '4 000€'                                               },           
            { key: '5000',   value: '5000',      textValue: '5 000€'                                               },           
            { key: '6000',   value: '6000',      textValue: '6 000€'                                               },           
            { key: '7000',   value: '7000',      textValue: '7 000€'                                               },           
            { key: '8000',   value: '8000',      textValue: '8 000€'                                               },           
            { key: '9000',   value: '9000',      textValue: '9 000€'                                               },           
            { key: '10000',  value: '10000',     textValue: '10 000€'                                              }, 
            { key: '20000',  value: '20000',     textValue: '20 000€'                                              },   
            { key: '30000',  value: '30000',     textValue: '30 000€'                                              },   
            { key: '40000',  value: '40000',     textValue: '40 000€'                                              },   
            { key: '50000',  value: '50000',     textValue: '50 000€'                                              },   
            { key: '60000',  value: '60000',     textValue: '60 000€'                                              },   
            { key: '70000',  value: '70000',     textValue: '70 000€'                                              },   
            { key: '80000',  value: '80000',     textValue: '80 000€'                                              },   
            { key: '90000',  value: '90000',     textValue: '90 000€'                                              },   
            { key: '100000', value: '100000',    textValue: '100 000€'                                             }, 
            { key: '150000', value: '150000',    textValue: '150 000€'                                             },  
            { key: '200000', value: '200000',    textValue: '200 000€'                                             }, 
            { key: '0',      value: 'priceMore', textValue: 'More'                                                 }
        ];

        return (
            <ComboBox
                label={className.includes("price-from") ? "Price from" : "Price to"}
                width={comboBoxSizingWidth}
                height={comboBoxSizingHeight}
                optionValues={options}
                onChangeHandler={(e) => handleSelectedPrice(className, e)}
            />
        );
    }

    const renderMileage = (className) => {
        const options = [
            { key: '-1',     value: '', textValue: className.includes("mileage-from") ? "From km" : "To km" },
            { key: '1000',   value: '1000',         textValue: '1 000 km'                                   },            
            { key: '5000',   value: '5000',         textValue: '5 000 km'                                   },        
            { key: '10000',  value: '10000',        textValue: '10 000 km'                                  },         
            { key: '50000',  value: '50000',        textValue: '50 000 km'                                  },         
            { key: '100000', value: '100000',       textValue: '100 000 km'                                 },          
            { key: '200000', value: '200000',       textValue: '200 000 km'                                 },          
            { key: '0',      value: 'mileageMore',  textValue: 'More'                                       }    
        ];

        return (
            <ComboBox
                label={className.includes("mileage-from") ? "Mileage from" : "Mileage to"}
                width={comboBoxSizingWidth}
                height={comboBoxSizingHeight}
                optionValues={options}
                onChangeHandler={(e) => handleSelectedMileage(className, e)}
            />
        );

    }

    const renderRegistration = (className) => {

        const options = [
            { key: '-1', value: '', textValue: className.includes("registration-from") ? "From" : "To" },
            { key: '2024', value: '2024',               textValue: '2024'                              },
            { key: '2023', value: '2023',               textValue: '2023'                              },
            { key: '2022', value: '2022',               textValue: '2022'                              },
            { key: '2021', value: '2021',               textValue: '2021'                              },
            { key: '2020', value: '2020',               textValue: '2020'                              },
            { key: '2019', value: '2019',               textValue: '2019'                              },
            { key: '2018', value: '2018',               textValue: '2018'                              },
            { key: '2017', value: '2017',               textValue: '2017'                              },
            { key: '2016', value: '2016',               textValue: '2016'                              },
            { key: '2015', value: '2015',               textValue: '2015'                              },
            { key: '2014', value: '2014',               textValue: '2014'                              },
            { key: '2013', value: '2013',               textValue: '2013'                              },
            { key: '2012', value: '2012',               textValue: '2012'                              },
            { key: '2011', value: '2011',               textValue: '2011'                              },
            { key: '2010', value: '2010',               textValue: '2010'                              },
            { key: '2009', value: '2009',               textValue: '2009'                              },
            { key: '2008', value: '2008',               textValue: '2008'                              },
            { key: '2007', value: '2007',               textValue: '2007'                              },
            { key: '2006', value: '2006',               textValue: '2006'                              },
            { key: '2005', value: '2005',               textValue: '2005'                              },
            { key: '2004', value: '2004',               textValue: '2004'                              },
            { key: '2003', value: '2003',               textValue: '2003'                              },
            { key: '2002', value: '2002',               textValue: '2002'                              },
            { key: '2001', value: '2001',               textValue: '2001'                              },
            { key: '2000', value: '2000',               textValue: '2000'                              },
            { key: '1999', value: '1999',               textValue: '1999'                              },
            { key: '1998', value: '1998',               textValue: '1998'                              },
            { key: '1997', value: '1997',               textValue: '1997'                              },
            { key: '1996', value: '1996',               textValue: '1996'                              },
            { key: '1995', value: '1995',               textValue: '1995'                              },
            { key: '1990', value: '1990',               textValue: '1990'                              },
            { key: '1985', value: '1985',               textValue: '1985'                              },
            { key: '1980', value: '1980',               textValue: '1980'                              },
            { key: '1970', value: '1970',               textValue: '1970'                              },
            { key: '1960', value: '1960',               textValue: '1960'                              },
            { key: 'xxxx', value: 'registrationOlder',  textValue: 'Older'                             } 
        ];

        return (
            <ComboBox 
                label={className.includes("registration-from") ? "Registration from" : "Registration to"}
                width={comboBoxSizingWidth}
                height={comboBoxSizingHeight}
                optionValues={options}
                onChangeHandler={(e) => handleSelectedRegistration(className, e)}
            />
        );
    }

    const renderSeatingConfig = () => {
        const options = [
            { key: '-1', value: '',       textValue: 'No. of seats' },
            { key: '2',  value: "seats2", textValue: '2'            },
            { key: '3',  value: "seats3", textValue: '3'            },
            { key: '4',  value: "seats4", textValue: '4'            },
            { key: '5',  value: "seats5", textValue: '5'            },
            { key: '6',  value: "seats6", textValue: '6'            },
            { key: '7',  value: "seats7", textValue: '7'            },
            { key: '8',  value: "seatsMore", textValue: 'More'      }
        ]; 

        return (
            <ComboBox 
                label={'Seating configuration'}
                width={comboBoxSizingWidth}
                height={comboBoxSizingHeight}
                optionValues={options}
                onChangeHandler={(e) => handleSelectedSeatingConfig(e)}
            />
        );
    }

    const renderDoors = () => {

        const options = [
            { key: '-1', value: "",        textValue: 'No. of doors' }, 
            { key: '23', value: "doors23", textValue: '2/3'          },  
            { key: '45', value: "doors45", textValue: '4/5'          },   
            { key: '67', value: "doors67", textValue: '6/7'          }   
        ];

        return (
            <ComboBox
                label={'Doors'}
                width={comboBoxSizingWidth}
                height={comboBoxSizingHeight}
                optionValues={options}
                onChangeHandler={(e) => handleSelectedDoors(e)}
            />
        );
    }

    const renderLocation = () => {
        const options = [
            { key: '-1', value: '', textValue: 'In development'}
        ];

        return (
            <ComboBox
                label={'Location'}
                width={comboBoxSizingWidth}
                height={comboBoxSizingHeight}
                optionValues={options}
            />
        );
    }

    const renderPostalCodeTextField = () => {
        return (
            <TextInputField
                label={'Postal code'}
                width={textInputFieldSizingWidth}
                height={textInputFieldSizingHeight} 
                type={'text'}
                color={"#313131"}
            />
        );
    }

    return (
        <div className='section-body-basic-data'>
            <div className='section-header-basic-data'>Basic data</div>
            <div className='line-container-basic-data'/>
            <div className='upper-section-wrapper-basic-data'>
                <div className='upper-section-left-basic-data'>
                    {renderBrands()}
                    {renderModels()}
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
                        <img className='basic-data-combobox-image-item' src={require('../../images/morefilterspage/price_tag.png')}/>
                        {renderPrice('price-from')}
                        {renderPrice('price-to')}
                    </div>
                    <div className='lower-combobox-wrapper-basic-data'>
                        <img className='basic-data-combobox-image-item' src={require('../../images/caroffer/mileage.png')}/>   
                        {renderMileage('mileage-from')}
                        {renderMileage('mileage-to')}
                    </div>
                    <div className='lower-combobox-wrapper-basic-data'>
                        <img className='basic-data-combobox-image-item' src={require('../../images/morefilterspage/date.png')}/>   
                        {renderRegistration('registration-from')}
                        {renderRegistration('registration-to')}
                    </div>
                </div>
                <div className='lower-section-right-basic-data'>
                    <div className='lower-combobox-wrapper-basic-data'>
                        <img className='basic-data-combobox-image-item' src={require('../../images/morefilterspage/seat.png')}/>  
                        {renderSeatingConfig()}
                    </div>
                    <div className='lower-combobox-wrapper-basic-data'>
                        <img className='basic-data-combobox-image-item' src={require('../../images/morefilterspage/door.png')}/>  
                        {renderDoors()}
                    </div>
                    <div className='lower-combobox-wrapper-basic-data'>
                        <img className='basic-data-combobox-image-item' src={require('../../images/morefilterspage/location.png')}/>  
                        {renderLocation()}
                        {renderPostalCodeTextField()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasicData;