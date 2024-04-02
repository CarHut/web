import Header from "../components/Header";
import "../css/MoreFiltersPage.css"
import BasicData from "../components/morefilterspage/BasicData";
import EngineAndPowertrain from "../components/morefilterspage/EngineAndPowertrain";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MoreFiltersPage() {

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [carType, setCarType] = useState("");
    const [price, setPrice] = useState({priceFrom: "", priceTo: ""});
    const [mileage, setMileage] = useState({mileageFrom: "", mileageTo: ""});
    const [registration, setRegistration] = useState({registrationFrom: '0', registrationTo: '0'});
    const [seatingConfig, setSeatingconfig] = useState("");
    const [doors, setDoors] = useState("");
    const [location, setLocation] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [power, setPower] = useState({powerFrom: '0', powerTo: '0'});
    const [displacement, setDisplacement] = useState({displacementFrom: '0', displacementTo: '0'});
    const [gearbox, setGearbox] = useState("");
    const [powertrain, setPowertrain] = useState("");

    const [resultList, setResultList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                brand === 'all' ? setBrand("") : setBrand(brand);
                model === 'all' ? setModel("") : setModel(model);
                const response = await fetch('http://localhost:8080/api/getTempCarsWithFilters?brand=' + brand + '&model=' + model + 
                                    '&priceFrom=' + price.priceFrom + '&priceTo=' + price.priceTo + '&mileageFrom=' + mileage.mileageFrom +
                                    '&mileageTo=' + mileage.mileageTo + '&fuelType=' + fuelType);
                const data = await response.json();
                setResultList(data);
            } catch (error) {
                console.error('Error fetching filtered car list:', error);
            }
        };
    
        fetchData();
    }, [brand, model, price, mileage, fuelType]);

    const updateNumberOfSearchResults = () => {
        return (
            <div>
                {resultList.length} cars
            </div>
        )
    } 

    return (
        <div className="body">
            <Header/>
            <div className="current-route-text">Main page -> Detailed search</div>
            <div className="header-section">
                <div className="more-filters-page-header">Detailed search - find exactly what you want!</div>
                <Link
                    to={`/searchList`}
                    state={{
                        results: resultList
                    }}
                >
                    <button className="styled-button">{updateNumberOfSearchResults()}</button>
                </Link>
            </div>
            <BasicData brand={brand} setBrand={setBrand} model={model} setModel={setModel} carType={carType} setCarType={setCarType} price={price} setPrice={setPrice} 
                    mileage={mileage} setMileage={setMileage} registration={registration} setRegistration={setRegistration} seatingConfig={seatingConfig} setSeatingconfig={setSeatingconfig}
                    doors={doors} setDoors={setDoors} location={location} setLocation={setLocation} postalCode={postalCode} setPostalCode={setPostalCode}/>
            <EngineAndPowertrain fuelType={fuelType} setFuelType={setFuelType} power={power} setPower={setPower} displacement={displacement} setDisplacement={setDisplacement}
                    gearbox={gearbox} setGearbox={setGearbox} powertrain={powertrain} setPowertrain={setPowertrain}/>
        </div>
    );
}

export default MoreFiltersPage;