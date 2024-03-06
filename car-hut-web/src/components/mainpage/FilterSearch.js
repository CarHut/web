import '../../css/FilterSearch.css'

function FilterSearch() {
    return (
        <div className='section-body'>
            <img src={require('../../images/mainpage/find_car.png')}/>
            <div className='right-wrapper'>
                <div className='comboboxes'>
                    <div className='combobox-entity'>
                        <div className='label'>Brand</div>
                        <div class="custom-combobox">
                            <select id="myComboBox">
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </div>
                    </div>
                    <div className='combobox-entity'>
                        <div className='label'>Model</div>
                        <div class="custom-combobox">
                            <select id="myComboBox">
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </div>
                    </div>
                    <div className='combobox-entity'>
                        <div className='label'>Price</div>
                        <div class="custom-combobox">
                            <select id="myComboBox">
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </div>
                    </div>
                    <div className='combobox-entity'>
                        <div className='label'>Mileage</div>
                        <div class="custom-combobox">
                            <select id="myComboBox">
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='more-filters-text'>More filters</div>
            </div>
        </div>
    );
}

export default FilterSearch;