import '../../css/searchlist/MainSection.css';
import ExtendedFilters from './ExtendedFilters';
import Offers from './Offers';
import UpperNav from './UpperNav';

function MainSection() {
    return (
        <div className='section-body-search-list-main-section'>
            <div className='search-list-left-wrapper'>  
                <UpperNav/>
                <Offers/>
            </div>
            <div className='search-list-right-wrapper'>
                <ExtendedFilters/>
            </div>
        </div>
    );
}

export default MainSection;