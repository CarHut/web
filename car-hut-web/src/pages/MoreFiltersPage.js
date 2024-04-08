import Header from "../components/Header";
import "../css/MoreFiltersPage.css"
import BasicData from "../components/morefilterspage/BasicData";
import EngineAndPowertrain from "../components/morefilterspage/EngineAndPowertrain";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import updateNumberOfSearchResults from "../utils/RenderTextUtil"; 

function MoreFiltersPage() {

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [carType, setCarType] = useState("");
    const [price, setPrice] = useState({priceFrom: "", priceTo: ""});
    const [mileage, setMileage] = useState({mileageFrom: "", mileageTo: ""});
    const [registration, setRegistration] = useState({registrationFrom: '', registrationTo: ''});
    const [seatingConfig, setSeatingconfig] = useState("");
    const [doors, setDoors] = useState("");
    const [location, setLocation] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [power, setPower] = useState({powerFrom: '', powerTo: ''});
    const [displacement, setDisplacement] = useState({displacementFrom: '', displacementTo: ''});
    const [gearbox, setGearbox] = useState("");
    const [powertrain, setPowertrain] = useState("");

    const [searchedCarsNumber, setSearchedCarsNumber] = useState(0);

    useEffect(() => {

        async function updateSearchedCarsNumber() {
            try {
                const result = await updateNumberOfSearchResults(brand, model, carType, price.priceFrom, price.priceTo, mileage.mileageFrom, mileage.mileageTo, registration.registrationFrom,
                    registration.registrationTo, seatingConfig, doors, location, postalCode, fuelType, power.powerFrom, power.powerTo, displacement.displacementFrom,
                    displacement.displacementTo, gearbox, powertrain);
                setSearchedCarsNumber(result);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        updateSearchedCarsNumber();
    }, [brand, model, price, mileage, carType, registration, seatingConfig, doors, location, postalCode, fuelType, power, displacement, gearbox, powertrain]);

    return (
        <div className="body">
            <Header/>
            <div className="current-route-text">Main page -> Detailed search</div>
            <div className="header-section">
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
                    <button className="styled-button">{searchedCarsNumber !== null ? (searchedCarsNumber + ' cars') : ('0 cars')}</button>
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