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
                        <option value="">--</option>
                        <option value="PFL" key={1}>Price - from lowest</option>
                        <option value="PFH" key={2}>Price - from highest</option>
                        <option value="AFL" key={3}>Alphabetically - A to Z</option>
                        <option value="AFH" key={4}>Alphabetically - Z to A</option>
                        <option value="MFL" key={5}>Mileage - from lowest</option>
                        <option value="MFH" key={6}>Mileage - from highest</option>
                        <option value="SFL" key={7}>Power - from lowest</option>
                        <option value="SFH" key={8}>Power - from highest</option>
                    </select>
                </div>
            </div>
            <div className='combobox-entity-upper-nav'>
                <div className='sort-dropdown-label'>Offers per page</div>
                <div className="custom-combobox">
                    <select id="brandComboBox" className='myComboBox' value={offersPerPage} onChange={handleOffersPerPageChange}>
                        <option value="" disabled>--</option>
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