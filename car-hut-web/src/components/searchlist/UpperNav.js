import '../../css/searchlist/UpperNav.css';

function UpperNav({offersPerPage, setOffersPerPage, sortBy, setSortBy}) {
    
    const handleOffersPerPageChange = (e) => {
        setOffersPerPage(e.target.value);
    }
    
    const handleSortByChange = (e) => {
        setSortBy(e.target.value);
    }

    return (
        <div className='search-list-upper-nav-wrapper'>
            <div className='combobox-entity-upper-nav'>
                <div className='sort-dropdown-label'>Sort by</div>
                <div className="custom-combobox">
                    <select id="brandComboBox" className='myComboBox' value={sortBy} onChange={handleSortByChange}>
                        <option value="" disabled>Select Brand</option>
                        <option value="PFL" key={1}>Price - from lowest</option>
                        <option value="PFH" key={2}>Price - from highest</option>
                        <option value="RFL" key={3}>Registration - from lowest</option>
                        <option value="RFH" key={4}>Registration - from highest</option>
                        <option value="MFL" key={5}>Mileage - from lowest</option>
                        <option value="MFH" key={6}>Mileage - from highest</option>
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