import '../../css/FilterSearch.css'

function FilterSearch() {
    return (
        <div className='section-body'>
            <img src={require('../../images/mainpage/find_car.png')}/>
            <div class="dropdown">
                <button class="dropbtn">Dropdown <span class="arrow">&#9660;</span></button>
                <div class="dropdown-content">
                    <a href="#">Option 1</a>
                    <a href="#">Option 2</a>
                    <a href="#">Option 3</a>
                </div>
            </div>
        </div>
    );
}

export default FilterSearch;