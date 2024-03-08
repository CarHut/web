import '../../css/BasicData.css'


function BasicData() {
    return (
        <div className='section-body-basic-data'>
            <div className='section-header-basic-data'>Basic data</div>
            <div className='line-container'/>
            <div className='upper-section-wrapper'>
                <div className='upper-section-left'>
                    <div className='combobox-entity'>
                        <div className='label'>Brand</div>
                        <div className="custom-combobox">
                            <select className='myComboBox'>
                                <option value="" disabled>Select Brand</option>
                            </select>
                        </div>
                    </div>
                    <div className='combobox-entity'>
                        <div className='label'>Model</div>
                        <div className="custom-combobox">
                            <select className='myComboBox'>
                                <option value="" disabled>Select Model</option>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasicData;