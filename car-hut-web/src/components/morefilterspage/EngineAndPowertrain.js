import '../../css/EngineAndPowertrain.css';

function EngineAndPowertrain({fuelType, setFuelType, power, setPower, displacement, setDisplacement,
        gearbox, setGearbox, powertrain, setPowertrain, setLoadingSearchedCarsNumber}) {

    const handleSelectedFuelType = (fuel) => {
        setFuelType(fuel);
        setLoadingSearchedCarsNumber(true);
    }

    const handleSelectedPower = (e) => {
        if (e.target.className == 'myComboBox power-from') {
            setPower({ ...power, powerFrom: e.target.value });
        } else if (e.target.className == 'myComboBox power-to') {
            setPower({ ...power, powerTo: e.target.value });
        }
        setLoadingSearchedCarsNumber(true);
    }

    const handleSelectedDisplacement = (e) => {
        if (e.target.className == 'myComboBox displacement-from') {
            setDisplacement({ ...displacement, displacementFrom: e.target.value });
        } else if (e.target.className == 'myComboBox displacement-to') {
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

    return (
        <div className="section-body-engine-and-powertrain">
            <div className='section-header-engine-and-powertrain'>Engine and powertrain</div>
            <div className='line-container'/>
            <div className='fuel-type-wrapper'>
                <div className='combobox-entity'>
                        <div className='checkmarklabel-engine-and-powertrain'>Fuel type</div>
                        <div className="custom-combobox">
                            <select className='myComboBox' onChange={(e) => handleSelectedFuelType(e.target.value)}>
                                <option key={1} value="">All</option>
                                <option key={2} value={'Petrol'}>Petrol</option>
                                <option key={3} value={'Diesel'}>Diesel</option>
                                <option key={4} value={'Electric'}>Electric</option>
                                <option key={5} value={'Hybrid'}>Hybrid</option>
                                <option key={6} value={'LPG'}>LPG</option>
                                <option key={7} value={'CNG'}>CNG</option>
                                <option key={8} value={'NotStated'}>Not stated</option>
                            </select>
                        </div>
                </div>
            </div>
            <div className='line-wrapper-engine-and-powertrain'>
                <div className='power-wrapper'>
                    <div className='combobox-entity'>
                        <div className='checkmarklabel-engine-and-powertrain'>Power</div>
                        <div className="custom-combobox">
                            <select className='myComboBox power-from' onChange={(e) => handleSelectedPower(e)}>
                                <option value="">From (kw)</option>
                                <option key={25} value={'25'}>25 kw</option>
                                <option key={50} value={'50'}>50 kw</option>
                                <option key={70} value={'70'}>70 kw</option>
                                <option key={100} value={'100'}>100 kw</option>
                                <option key={150} value={'150'}>150 kw</option>
                                <option key={200} value={'200'}>200 kw</option>
                                <option key={250} value={'250'}>250 kw</option>
                                <option key={300} value={'300'}>300 kw</option>
                                <option key={0} value={'powerMoref'}>More</option>
                            </select>
                        </div>
                    </div>
                    <div className='combobox-entity'>
                        <div className='checkmarklabel-engine-and-powertrain'>{'\0'}</div>
                        <div className="custom-combobox">
                            <select className='myComboBox power-to' onChange={(e) => handleSelectedPower(e)}>
                                <option value="">To (kw)</option>
                                <option key={25} value={'25'}>25 kw</option>
                                <option key={50} value={'50'}>50 kw</option>
                                <option key={70} value={'70'}>70 kw</option>
                                <option key={100} value={'100'}>100 kw</option>
                                <option key={150} value={'150'}>150 kw</option>
                                <option key={200} value={'200'}>200 kw</option>
                                <option key={250} value={'250'}>250 kw</option>
                                <option key={300} value={'300'}>300 kw</option>
                                <option key={0} value={'powerMoret'}>More</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='gearbox-wrapper-engine-and-powertrain'>
                    <div className='combobox-entity'>
                        <div className='checkmarklabel-engine-and-powertrain'>Gearbox</div>
                        <div className="custom-combobox">
                            <select className='myComboBox' onChange={(e) => handleSelectedGearbox(e.target.value)}>
                                <option key={1} value="">All</option>
                                <option key={2} value="Manual">Manual</option>
                                <option key={3} value="Automatic">Automatic</option>
                                <option key={4} value="Sequential">Sequential</option>
                                <option key={5} value="NotStated">Not stated</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className='line-wrapper-engine-and-powertrain'>
                <div className='power-wrapper'>
                    <div className='combobox-entity'>
                        <div className='checkmarklabel-engine-and-powertrain'>Displacement</div>
                        <div className="custom-combobox">
                            <select className='myComboBox displacement-from' onChange={(e) => handleSelectedDisplacement(e)}>
                                <option value="">From (cm³)</option>
                                <option key={1000} value={'1000'}>1000 cm³</option>
                                <option key={1200} value={'1200'}>1200 cm³</option>
                                <option key={1500} value={'1500'}>1500 cm³</option>
                                <option key={1700} value={'1700'}>1700 cm³</option>
                                <option key={2000} value={'2000'}>2000 cm³</option>
                                <option key={3000} value={'3000'}>3000 cm³</option>
                                <option key={4000} value={'4000'}>4000 cm³</option>
                                <option key={5000} value={'5000'}>5000 cm³</option>
                                <option key={6000} value={'6000'}>6000 cm³</option>
                                <option key={0} value={'displacementMoref'}>More</option>
                            </select>
                        </div>
                    </div>
                    <div className='combobox-entity'>
                        <div className='checkmarklabel-engine-and-powertrain'>{'\0'}</div>
                        <div className="custom-combobox">
                            <select className='myComboBox displacement-to' onChange={(e) => handleSelectedDisplacement(e)}>
                                <option value="">To (cm³)</option>
                                <option key={1000} value={'1000'}>1000 cm³</option>
                                <option key={1200} value={'1200'}>1200 cm³</option>
                                <option key={1500} value={'1500'}>1500 cm³</option>
                                <option key={1700} value={'1700'}>1700 cm³</option>
                                <option key={2000} value={'2000'}>2000 cm³</option>
                                <option key={3000} value={'3000'}>3000 cm³</option>
                                <option key={4000} value={'4000'}>4000 cm³</option>
                                <option key={5000} value={'5000'}>5000 cm³</option>
                                <option key={6000} value={'6000'}>6000 cm³</option>
                                <option key={0} value={'displacementMoret'}>More</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='gearbox-wrapper-engine-and-powertrain'>
                    <div className='combobox-entity'>
                        <div className='checkmarklabel-engine-and-powertrain'>Powertrain</div>
                        <div className="custom-combobox">
                            <select className='myComboBox' onChange={(e) => handleSelectedPowertrain(e.target.value)}>
                                <option key={1} value="">All</option>
                                <option key={2} value="NotStated">Not stated</option>
                                <option key={3} value="Other">Other</option>
                                <option key={4} value="FrontWheel">Front-wheel drive</option>
                                <option key={5} value="RearWheel">Rear-wheel drive</option>
                                <option key={6} value="AllWheel">All-wheel drive</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EngineAndPowertrain;