import '../../css/searchlist/UpperNav.css';

function UpperNav() {
    return (
        <div className='search-list-upper-nav-wrapper'>
            <div className='combobox-entity-upper-nav'>
                <div className='sort-dropdown-label'>Sort by</div>
                <div className="custom-combobox">
                    <select id="brandComboBox" className='myComboBox' /*value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}*/>
                        <option value="" disabled>Select Brand</option>
                        {/* {brands.map(brand => (
                            <option key={brand.id} value={brand.brand}>{brand.brand}</option>
                        ))} */}
                    </select>
                </div>
            </div>
            <div className='combobox-entity-upper-nav'>
                <div className='sort-dropdown-label'>Offers per page</div>
                <div className="custom-combobox">
                    <select id="brandComboBox" className='myComboBox' /*value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}*/>
                        <option value="" disabled>Select </option>
                        {/* {brands.map(brand => (
                            <option key={brand.id} value={brand.brand}>{brand.brand}</option>
                        ))} */}
                    </select>
                </div>
            </div>
            <button className="styled-button-upper-nav">Save search</button>
        </div>
    );
}

export default UpperNav;