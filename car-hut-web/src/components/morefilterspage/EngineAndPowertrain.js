import '../../css/EngineAndPowertrain.css';

function EngineAndPowertrain({fuelType, setFuelType, power, setPower, displacement, setDisplacement,
        gearbox, setGearbox, powertrain, setPowertrain}) {

    const handleSelectedFuelType = (fuel) => {
        setFuelType(fuel);
    }

    const handleSelectedPower = (e) => {
        if (e.target.className == 'myComboBox power-from') {
            setPower({ ...power, powerFrom: e.target.value });
        } else if (e.target.className == 'myComboBox power-to') {
            setPower({ ...power, powerTo: e.target.value });
        }
    }

    const handleSelectedDisplacement = (e) => {
        if (e.target.className == 'myComboBox displacement-from') {
            setDisplacement({ ...displacement, displacementFrom: e.target.value });
        } else if (e.target.className == 'myComboBox displacement-to') {
            setDisplacement({ ...displacement, displacementTo: e.target.value });
        }
    }

    const handleSelectedGearbox = (gearbox) => {
        setGearbox(gearbox);
    }

    const handleSelectedPowertrain = (powertrain) => {
        setPowertrain(powertrain);
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
                    <div className='checkmarklabel-engine-and-powertrain'>Gearbox</div>
                    <div className='gearbox-content'>
                        <div className='gearbox-entity'>
                            <div className='checkbox-label'>Manual</div>
                            <label className='custom-checkbox-engine-and-power'>
                                <input type="checkbox"/>
                                <span className="checkmark-engine-and-power" onClick={handleSelectedGearbox('Manual')}></span>
                            </label>
                        </div>
                        <div className='gearbox-entity'>
                            <div className='checkbox-label'>Automatic</div>
                            <label className='custom-checkbox-engine-and-power'>
                                <input type="checkbox"/>
                                <span className="checkmark-engine-and-power" onClick={handleSelectedGearbox('Automatic')}></span>
                            </label>
                        </div>
                        <div className='gearbox-entity'>
                            <div className='checkbox-label'>Sequential</div>
                            <label className='custom-checkbox-engine-and-power'>
                                <input type="checkbox"/>
                                <span className="checkmark-engine-and-power" onClick={handleSelectedGearbox('Sequential')}></span>
                            </label>
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
                    <div className='checkmarklabel-engine-and-powertrain'>Powertrain (drive)</div>
                    <div className='gearbox-content'>
                        <div className='gearbox-entity'>
                            <div className='checkbox-label'>Front-wheel</div>
                            <label className='custom-checkbox-engine-and-power'>
                                <input type="checkbox"/>
                                <span className="checkmark-engine-and-power" onClick={handleSelectedPowertrain('Front-wheel')}></span>
                            </label>
                        </div>
                        <div className='gearbox-entity'>
                            <div className='checkbox-label'>Rear-wheel</div>
                            <label className='custom-checkbox-engine-and-power'>
                                <input type="checkbox"/>
                                <span className="checkmark-engine-and-power" onClick={handleSelectedPowertrain('Rear-wheel')}></span>
                            </label>
                        </div>
                        <div className='gearbox-entity'>
                            <div className='checkbox-label'>All-wheel</div>
                            <label className='custom-checkbox-engine-and-power'>
                                <input type="checkbox"/>
                                <span className="checkmark-engine-and-power" onClick={handleSelectedPowertrain('All-wheel')}></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EngineAndPowertrain;