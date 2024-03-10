import '../../css/EngineAndPowertrain.css';

function EngineAndPowertrain() {
    return (
        <div className="section-body-engine-and-powertrain">
            <div className='section-header-engine-and-powertrain'>Basic data</div>
            <div className='line-container'/>
            <div className='fuel-type-wrapper'>
                <div className='label'>Fuel type</div>
                <div className='fuel-type-content'>
                    <div className='fuel-type-entity'>
                        <div className='checkbox-label'>Petrol</div>
                        <label className='custom-checkbox'>
                            <input type="checkbox"/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className='fuel-type-entity'>
                        <div className='checkbox-label'>Diesel</div>
                        <label className='custom-checkbox'>
                            <input type="checkbox"/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className='fuel-type-entity'>
                        <div className='checkbox-label'>Electric</div>
                        <label className='custom-checkbox'>
                            <input type="checkbox"/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className='fuel-type-entity'>
                        <div className='checkbox-label'>Hybrid</div>
                        <label className='custom-checkbox'>
                            <input type="checkbox"/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className='fuel-type-entity'>
                        <div className='checkbox-label'>LPG</div>
                        <label className='custom-checkbox'>
                            <input type="checkbox"/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className='fuel-type-entity'>
                        <div className='checkbox-label'>Plug-in hybrid</div>
                        <label className='custom-checkbox'>
                            <input type="checkbox"/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className='fuel-type-entity'>
                        <div className='checkbox-label'>Ethanol</div>
                        <label className='custom-checkbox'>
                            <input type="checkbox"/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>
            <div className='line-wrapper-engine-and-powertrain'>
                <div className='power-wrapper'>
                    <div className='combobox-entity'>
                        <div className='label'>Power</div>
                        <div className="custom-combobox">
                            <select className='myComboBox'>
                                <option value="">From (kw)</option>
                                <option key={25} value={'power25kwf'}>25 kw</option>
                                <option key={50} value={'power50kwf'}>50 kw</option>
                                <option key={70} value={'power70kwf'}>70 kw</option>
                                <option key={100} value={'power100kwf'}>100 kw</option>
                                <option key={150} value={'power150kwf'}>150 kw</option>
                                <option key={200} value={'power200kwf'}>200 kw</option>
                                <option key={250} value={'power250kwf'}>250 kw</option>
                                <option key={300} value={'power300kwf'}>300 kw</option>
                                <option key={0} value={'powerMoref'}>More</option>
                            </select>
                        </div>
                    </div>
                    <div className='combobox-entity'>
                        <div className='label'>{'\0'}</div>
                        <div className="custom-combobox">
                            <select className='myComboBox'>
                                <option value="">To (kw)</option>
                                <option key={25} value={'power25kwt'}>25 kw</option>
                                <option key={50} value={'power50kwt'}>50 kw</option>
                                <option key={70} value={'power70kwt'}>70 kw</option>
                                <option key={100} value={'power100kwt'}>100 kw</option>
                                <option key={150} value={'power150kwt'}>150 kw</option>
                                <option key={200} value={'power200kwt'}>200 kw</option>
                                <option key={250} value={'power250kwt'}>250 kw</option>
                                <option key={300} value={'power300kwt'}>300 kw</option>
                                <option key={0} value={'powerMoret'}>More</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='gearbox-wrapper'>
                    <div className='label'>Gearbox</div>
                    <div className='gearbox-content'>
                        <div className='gearbox-entity'>
                            <div className='checkbox-label'>Manual</div>
                            <label className='custom-checkbox'>
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className='gearbox-entity'>
                            <div className='checkbox-label'>Automatic</div>
                            <label className='custom-checkbox'>
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className='gearbox-entity'>
                            <div className='checkbox-label'>Sequential</div>
                            <label className='custom-checkbox'>
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className='line-wrapper-engine-and-powertrain'>
                <div className='power-wrapper'>
                    <div className='combobox-entity'>
                        <div className='label'>Displacement</div>
                        <div className="custom-combobox">
                            <select className='myComboBox'>
                                <option value="">From (cm³)</option>
                                <option key={1000} value={'displacement1000f'}>1000 cm³</option>
                                <option key={1200} value={'displacement1000f'}>1200 cm³</option>
                                <option key={1500} value={'displacement1000f'}>1500 cm³</option>
                                <option key={1700} value={'displacement1000f'}>1700 cm³</option>
                                <option key={2000} value={'displacement1000f'}>2000 cm³</option>
                                <option key={3000} value={'displacement1000f'}>3000 cm³</option>
                                <option key={4000} value={'displacement1000f'}>4000 cm³</option>
                                <option key={5000} value={'displacement1000f'}>5000 cm³</option>
                                <option key={6000} value={'displacement1000f'}>6000 cm³</option>
                                <option key={0} value={'displacementMoref'}>More</option>
                            </select>
                        </div>
                    </div>
                    <div className='combobox-entity'>
                        <div className='label'>{'\0'}</div>
                        <div className="custom-combobox">
                            <select className='myComboBox'>
                                <option value="">To (cm³)</option>
                                <option key={1000} value={'displacement1000t'}>1000 cm³</option>
                                <option key={1200} value={'displacement1000t'}>1200 cm³</option>
                                <option key={1500} value={'displacement1000t'}>1500 cm³</option>
                                <option key={1700} value={'displacement1000t'}>1700 cm³</option>
                                <option key={2000} value={'displacement1000t'}>2000 cm³</option>
                                <option key={3000} value={'displacement1000t'}>3000 cm³</option>
                                <option key={4000} value={'displacement1000t'}>4000 cm³</option>
                                <option key={5000} value={'displacement1000t'}>5000 cm³</option>
                                <option key={6000} value={'displacement1000t'}>6000 cm³</option>
                                <option key={0} value={'displacementMoret'}>More</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='gearbox-wrapper'>
                    <div className='label'>Powertrain (drive)</div>
                    <div className='gearbox-content'>
                        <div className='gearbox-entity'>
                            <div className='checkbox-label'>Front-wheel</div>
                            <label className='custom-checkbox'>
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className='gearbox-entity'>
                            <div className='checkbox-label'>Rear-wheel</div>
                            <label className='custom-checkbox'>
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className='gearbox-entity'>
                            <div className='checkbox-label'>All-wheel</div>
                            <label className='custom-checkbox'>
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EngineAndPowertrain;