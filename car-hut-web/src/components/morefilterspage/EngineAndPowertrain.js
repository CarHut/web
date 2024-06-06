import '../../css/morefilterspage/EngineAndPowertrain.css';
import ComboBox from '../maincomponents/ComboBox';

function EngineAndPowertrain({fuelType, setFuelType, power, setPower, displacement, setDisplacement,
        gearbox, setGearbox, powertrain, setPowertrain, setLoadingSearchedCarsNumber}) {
           

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

    const handleSelectedFuelType = (fuel) => {
        setFuelType(fuel);
        setLoadingSearchedCarsNumber(true);
    }

    const handleSelectedPower = (type, e) => {
        if (type === 'power-from') {
            setPower({ ...power, powerFrom: e.target.value });
        } else if (type === 'power-to') {
            setPower({ ...power, powerTo: e.target.value });
        }
        setLoadingSearchedCarsNumber(true);
    }

    const handleSelectedDisplacement = (type, e) => {
        if (type === 'displacement-from') {
            setDisplacement({ ...displacement, displacementFrom: e.target.value });
        } else if (type === 'displacement-to') {
            setDisplacement({ ...displacement, displacementTo: e.target.value });
        }
        setLoadingSearchedCarsNumber(true);
    }

    const handleSelectedGearbox = (gearbox) => {
        setGearbox(gearbox);
        setLoadingSearchedCarsNumber(true);
    }

    const handleSelectedPowertrain = (powertrain) => {
        setPowertrain(powertrain);
        setLoadingSearchedCarsNumber(true);
    }

    const renderFuelTypes = () => {
        const options = [
            { key: '1', value: '',          textValue: 'All'        }, 
            { key: '2', value: 'Petrol',    textValue: 'Petrol'     }, 
            { key: '3', value: 'Diesel',    textValue: 'Diesel'     },    
            { key: '4', value: 'Electric',  textValue: 'Electric'   },       
            { key: '5', value: 'Hybrid',    textValue: 'Hybrid'     },     
            { key: '6', value: 'LPG',       textValue: 'LPG'        },    
            { key: '7', value: 'CNG',       textValue: 'CNG'        },    
            { key: '8', value: 'NotStated', textValue: 'Not stated' }        
        ];

        return (
            <ComboBox
                label={'Fuel type'}
                width={comboBoxSizingWidth}
                height={comboBoxSizingHeight}
                optionValues={options}
                onChangeHandler={(e) => handleSelectedFuelType(e.target.value)}
            />
        );
    }

    const renderEnginePower = (className) => {
        const options = [
            { key: '-1',  value: "",            textValue: className.includes("power-from") ? "From" : "To" },
            { key: '25',  value: '25',          textValue: '25 kw'                                          },           
            { key: '50',  value: '50',          textValue: '50 kw'                                          },           
            { key: '70',  value: '70',          textValue: '70 kw'                                          },           
            { key: '100', value: '100',         textValue: '100 kw'                                         },            
            { key: '150', value: '150',         textValue: '150 kw'                                         },            
            { key: '200', value: '200',         textValue: '200 kw'                                         },            
            { key: '250', value: '250',         textValue: '250 kw'                                         },            
            { key: '300', value: '300',         textValue: '300 kw'                                         },            
            { key: '0',   value: 'powerMoref',  textValue: 'More'                                           }          
        ];                                                     

        return (
            <ComboBox
                label={className.includes("power-from") ? "Power from" : "Power to"}
                width={comboBoxSizingWidth}
                height={comboBoxSizingHeight}
                optionValues={options}
                onChangeHandler={(e) => handleSelectedPower(className, e)}
            />
        );
    } 

    const renderGearboxTypes = () => {

        const options = [
            { key: '1', value: "",              textValue: 'All'        },
            { key: '2', value: "Manual",        textValue: 'Manual'     }, 
            { key: '3', value: "Automatic",     textValue: 'Automatic'  }, 
            { key: '4', value: "Sequential",    textValue: 'Sequential' },  
            { key: '5', value: "NotStated",     textValue: 'Not stated' } 
        ];

        return (
            <ComboBox
                label={'Gearbox'}
                width={comboBoxSizingWidth}
                height={comboBoxSizingHeight}
                optionValues={options}
                onChangeHandler={(e) => handleSelectedGearbox(e.target.value)}
            />
        );
    }

    const renderDisplacement = (className) => {

        const options = [
            { key: '-1',   value: '',                  textValue: className.includes("displacement-from") ? "From" : "To" },
            { key: '1000', value: '1000',              textValue: '1000 cm³'                                              },
            { key: '1200', value: '1200',              textValue: '1200 cm³'                                              },
            { key: '1500', value: '1500',              textValue: '1500 cm³'                                              },
            { key: '1700', value: '1700',              textValue: '1700 cm³'                                              },
            { key: '2000', value: '2000',              textValue: '2000 cm³'                                              },
            { key: '3000', value: '3000',              textValue: '3000 cm³'                                              },
            { key: '4000', value: '4000',              textValue: '4000 cm³'                                              },
            { key: '5000', value: '5000',              textValue: '5000 cm³'                                              },
            { key: '6000', value: '6000',              textValue: '6000 cm³'                                              },
            { key: '0',    value: 'displacementMoref', textValue: 'More'                                                  }
        ];

        return (
            <ComboBox
                label={className.includes("displacement-from") ? "Displacement from" : "Displacement to"}
                width={comboBoxSizingWidth}
                height={comboBoxSizingHeight}
                optionValues={options}
                onChangeHandler={(e) => handleSelectedDisplacement(className, e)}
            />
        );
    }

    const renderPowertrain = () => {
        const options = [
            { key: '1', value: "",           textValue: 'All'               },    
            { key: '2', value: "NotStated",  textValue: 'Not stated'        }, 
            { key: '3', value: "Other",      textValue: 'Other'             },
            { key: '4', value: "FrontWheel", textValue: 'Front-wheel drive' }, 
            { key: '5', value: "RearWheel",  textValue: 'Rear-wheel drive'  },    
            { key: '6', value: "AllWheel",   textValue: 'All-wheel drive'   } 
        ];

        return (
            <ComboBox
                label={'Powertrain'}
                width={comboBoxSizingWidth}
                height={comboBoxSizingHeight}
                optionValues={options}
                onChangeHandler={(e) => handleSelectedPowertrain(e.target.value)}
            />
        );
    }

    return (
        <div className="section-body-engine-and-powertrain">
            <div className='section-header-engine-and-powertrain'>Engine and powertrain</div>
            <div className='line-container-engine-and-powertrain'/>
            <div className='engine-and-powertrain-rows'>
                <div className='power-wrapper'>
                    <img className='engine-and-powertrain-combobox-image-item' src={require('../../images/caroffer/fuel.png')}/>
                    {renderFuelTypes()}
                </div>
                <div className='line-wrapper-engine-and-powertrain'>
                    <div className='power-wrapper'>
                        <img className='engine-and-powertrain-combobox-image-item' src={require('../../images/caroffer/power.png')}/>
                        {renderEnginePower('power-from')}
                        {renderEnginePower('power-to')}
                    </div>
                    <div className='power-wrapper'>
                        <img className='engine-and-powertrain-combobox-image-item' src={require('../../images/caroffer/gearbox.png')}/>
                        {renderGearboxTypes()}
                    </div>
                </div>
                <div className='line-wrapper-engine-and-powertrain'>
                    <div className='power-wrapper'>
                        <img className='engine-and-powertrain-combobox-image-item' src={require('../../images/morefilterspage/pistons.png')}/>
                        {renderDisplacement('displacement-from')}
                        {renderDisplacement('displacement-to')}
                    </div>
                    <div className='power-wrapper'>
                        <img className='engine-and-powertrain-combobox-image-item' src={require('../../images/morefilterspage/powertrain.png')}/>
                        {renderPowertrain()}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EngineAndPowertrain;