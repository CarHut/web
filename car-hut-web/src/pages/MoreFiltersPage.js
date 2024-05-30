import Header from "../components/maincomponents/Header";
import "../css/pages/MoreFiltersPage.css"
import BasicData from "../components/morefilterspage/BasicData";
import EngineAndPowertrain from "../components/morefilterspage/EngineAndPowertrain";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import APIMethods from "../api/APIMethods";
import SocketAPI from "../messaging/SocketAPI";

function MoreFiltersPage() {

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [carType, setCarType] = useState("");
    const [price, setPrice] = useState({priceFrom: "", priceTo: ""});
    const [mileage, setMileage] = useState({mileageFrom: "", mileageTo: ""});
    const [registration, setRegistration] = useState({registrationFrom: '', registrationTo: ''});
    const [seatingConfig, setSeatingConfig] = useState("");
    const [doors, setDoors] = useState("");
    const [location, setLocation] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [power, setPower] = useState({powerFrom: '', powerTo: ''});
    const [displacement, setDisplacement] = useState({displacementFrom: '', displacementTo: ''});
    const [gearbox, setGearbox] = useState("");
    const [powertrain, setPowertrain] = useState("");

    const [searchedCarsNumber, setSearchedCarsNumber] = useState(0);
    const [loadingSearchedCarsNumber, setLoadingSearchedCarsNumber] = useState(true);

    // Socket reconnecting
    useEffect(() => {    
        if (localStorage.getItem('socket') != null && localStorage.getItem('socket') != undefined) {
            localStorage.removeItem('socket')
            const socket = SocketAPI.connectToSocket(localStorage.getItem('username'));
            localStorage.setItem('socket', socket);
        }
    }, []);

    const updateSearchedCarsNumber = async () => {
        const result = await APIMethods.getNumberOfFilteredCars(`brand=${brand}&model=${model}&carType=${carType}&priceFrom=${price.priceFrom}&priceTo=${price.priceTo}` +
        `&mileageFrom=${mileage.mileageFrom}&mileageTo=${mileage.mileageTo}&registrationFrom=${registration.registrationFrom}&registrationTo=${registration.registrationTo}` +
        `&seatingConfig=${seatingConfig}&doors=${doors}&location=${location}&postalCode=${postalCode}&fuelType=${fuelType}&powerFrom=${power.powerFrom}` +
        `&powerTo=${power.powerTo}&displacementFrom=${displacement.displacementFrom}&displacement=${displacement.displacementTo}&gearbox=${gearbox}&powertrain=${powertrain}`, null)
        
        if (result === null) {
            return;
        }

        console.log(result);

        setSearchedCarsNumber(result);
        setLoadingSearchedCarsNumber(false);
    }

    useEffect(() => {
        updateSearchedCarsNumber();
    }, [loadingSearchedCarsNumber]);

    return (
        <div className="body">
            <Header/>
            {/* <div className="current-route-text">Main page -> Detailed search</div> */}
            <div className="header-section-more-filters">
                <div className="more-filters-page-header">Detailed search - find exactly what you want!</div>
                <Link
                    to={`/searchList`}
                    state={{
                        brand: brand,
                        model: model,
                        carType: carType,
                        price: price,
                        mileage: mileage,
                        registration: registration,
                        seatingConfig: seatingConfig,
                        doors: doors,
                        location: location,
                        postalCode: postalCode,
                        fuelType: fuelType,
                        power: power,
                        displacement: displacement,
                        gearbox: gearbox,
                        powertrain: powertrain,
                        models: [ { brand: brand, model: model} ]
                    }}
                > 
                    <button className="styled-search-button-more-filters">{searchedCarsNumber !== null && !loadingSearchedCarsNumber ? (searchedCarsNumber + ' cars') : ('Loading cars')}</button>
                </Link>
            </div>
            <BasicData brand={brand} setBrand={setBrand} model={model} setModel={setModel} carType={carType} setCarType={setCarType} price={price} setPrice={setPrice} 
                    mileage={mileage} setMileage={setMileage} registration={registration} setRegistration={setRegistration} seatingConfig={seatingConfig} setSeatingConfig={setSeatingConfig}
                    doors={doors} setDoors={setDoors} location={location} setLocation={setLocation} postalCode={postalCode} setPostalCode={setPostalCode} setLoadingSearchedCarsNumber={setLoadingSearchedCarsNumber}/>
            <EngineAndPowertrain fuelType={fuelType} setFuelType={setFuelType} power={power} setPower={setPower} displacement={displacement} setDisplacement={setDisplacement}
                    gearbox={gearbox} setGearbox={setGearbox} powertrain={powertrain} setPowertrain={setPowertrain} setLoadingSearchedCarsNumber={setLoadingSearchedCarsNumber}/>
        </div>
    );
}

export default MoreFiltersPage;