import '../../css/searchlist/UpperNav.css';

function UpperNav({offersPerPage, setOffersPerPage }) {
    
    const handleOffersPerPageChange = (e) => {
        setOffersPerPage(e.target.value);
    }
    
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
                    <select id="brandComboBox" className='myComboBox' value={offersPerPage} onChange={handleOffersPerPageChange}>
                        <option value="" disabled>Select </option>
                        <option value={5} key={5}>5</option>
                        <option value={10} key={10}>10</option>
                        <option value={15} key={15}>15</option>
                        <option value={20} key={20}>20</option>
                        <option value={30} key={30}>30</option>
                        <option value={50} key={50}>50</option>
                        <option value={100} key={100}>100</option>
                    </select>
                </div>
            </div>
            <button className="styled-button-upper-nav">Save search</button>
        </div>
    );
}

export default UpperNav;