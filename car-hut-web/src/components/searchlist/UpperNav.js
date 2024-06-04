import APIMethods from '../../api/APIMethods';
import '../../css/searchlist/UpperNav.css';
import { useState } from 'react';
import LoadingCircle from '../../components/maincomponents/LoadingCircle';
import ComboBox from '../maincomponents/ComboBox';

function UpperNav({ fetchedState, offersPerPage, setOffersPerPage, sortBy, setSortBy }) {
    
    const comboBoxSizingWidth = {
        standardSize: "10vw",
        mediumSize:   "20vw",
        smallSize:    "30vw"
    };

    const comboBoxSizingHeight = {
        standardSize: "2vw",
        mediumSize:   "4vw",
        smallSize:    "6vw"
    }

    const [savedSearchState, setSavedSearchState] = useState(null); 
    
    const [loading, setLoading] = useState(false);

    const handleOffersPerPageChange = (e) => {
        setOffersPerPage(e);
    }
    
    const handleSortByChange = (e) => {
        setSortBy(e);
    }

    const renderSortComboBox = () => {

        const options = [
            { key: '-1', value: '', textValue: '--'},
            { key: '1', value: "PFL", textValue: 'Price - from lowest' },
            { key: '2', value: "PFH", textValue: 'Price - from highest' },
            { key: '3', value: "AFL", textValue: 'Alphabetically - A to Z' },
            { key: '4', value: "AFH", textValue: 'Alphabetically - Z to A' },
            { key: '5', value: "MFL", textValue: 'Mileage - from lowest' },
            { key: '6', value: "MFH", textValue: 'Mileage - from highest' },
            { key: '7', value: "SFL", textValue: 'Power - from lowest' },
            { key: '8', value: "SFH", textValue: 'Power - from highest' },
            { key: '9', value: "DAO", textValue: 'Date added - oldest' },
            { key: '10', value: "DAN", textValue: 'Date added - newest' }
        ];

        return (
            <ComboBox label={'Sort by'} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={options} onChangeHandler={(e) => handleSortByChange(e.target.value)}/>
        );
    }

    const renderOfferPerPageComboBox = () => {
        
        const options = [
            { key: '', value: '', textValue: '--' },
            { key: '', value: '5', textValue: '5' },
            { key: '', value: '10', textValue: '10' },
            { key: '', value: '15', textValue: '15' },
            { key: '', value: '20', textValue: '20' },
            { key: '', value: '30', textValue: '30' },
            { key: '', value: '50', textValue: '50' },
            { key: '', value: '100', textValue: '100' }
        ]

        return (
            <ComboBox label={'Offers per page'} width={comboBoxSizingWidth} height={comboBoxSizingHeight} optionValues={options} onChangeHandler={(e) => handleOffersPerPageChange(e.target.value)}/>
        )
    }

    const saveSearch = async () => {
        setLoading(true);
        try {    
            const searchBody = {
                id: 'NULL',
                userId: await APIMethods.getUserIdByUsername(localStorage.getItem('username')),
                sortBy: sortBy,
                offersPerPage: offersPerPage,
                brandsAndModels: fetchedState.models,
                priceFrom: fetchedState.price.priceFrom,
                priceTo: fetchedState.price.priceTo,
                mileageFrom: fetchedState.mileage.mileageFrom,
                mileageTo: fetchedState.mileage.mileageTo,
                fuelType: fetchedState.fuelType,
                gearboxType: fetchedState.gearbox,
                powertrainType: fetchedState.powertrain,
                powerFrom: fetchedState.power.powerFrom,
                powerTo: fetchedState.power.powerTo
            }

            const response = await APIMethods.addNewSavedSearch(searchBody);
            
            if (response.status === 200) {
                setSavedSearchState(true);
                setTimeout(() => setSavedSearchState(null), 5000);
            } else {
                console.log(`[SearchList][UpperNav][saveSearch][ERROR] - Cannot save search.`);
                setSavedSearchState(false);
                setTimeout(() => setSavedSearchState(null), 5000);
            }
            setLoading(false);
        } catch (error) {
            console.log(`[SearchList][UpperNav][saveSearch][ERROR] - Cannot save search. Stack trace message: ${error}`);
            setSavedSearchState(false);
            setLoading(false);
            setTimeout(() => setSavedSearchState(null), 5000);
        }
    }

    return (
        <div className='search-list-upper-nav-wrapper'>
            <div className='search-list-upper-nav-content'>
                {renderSortComboBox()}
                {renderOfferPerPageComboBox()}
                <div className='save-search-wrapper-upper-nav'>
                    <div className="styled-button-upper-nav" onClick={() => saveSearch()}>Save search</div>
                    <div className={`save-search-result-text ${savedSearchState !== null ? savedSearchState ? "success" : "error" : ""}`}>{savedSearchState !== null ? savedSearchState ? "Successfully saved search parameters" : "Couldn't save search parameters" : ""}</div>
                    {loading ? <LoadingCircle/> : <div/>}
                </div>
            </div>     
        </div>
    );
}

export default UpperNav;