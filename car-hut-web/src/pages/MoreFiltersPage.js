import Header from "../components/Header";
import "../css/MoreFiltersPage.css"
import BasicData from "../components/morefilterspage/BasicData";
import EngineAndPowertrain from "../components/morefilterspage/EngineAndPowertrain";
import { useState, useEffect } from "react";

function MoreFiltersPage() {

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [carType, setCarType] = useState("");
    const [price, setPrice] = useState({priceFrom: '0', priceTo: '0'});
    const [mileage, setMileage] = useState({mileageFrom: '0', mileageTo: '0'});
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

    return (
        <div className="body">
            <Header/>
            <div className="current-route-text">Main page -> Detailed search</div>
            <div className="more-filters-page-header">Detailed search - find exactly what you want!</div>
            <BasicData brand={brand} setBrand={setBrand} model={model} setModel={setModel} carType={carType} setCarType={setCarType} price={price} setPrice={setPrice} 
                    mileage={mileage} setMileage={setMileage} registration={registration} setRegistration={setRegistration} seatingConfig={seatingConfig} setSeatingconfig={setSeatingconfig}
                    doors={doors} setDoors={setDoors} location={location} setLocation={setLocation} postalCode={postalCode} setPostalCode={setPostalCode}/>
            <EngineAndPowertrain fuelType={fuelType} setFuelType={setFuelType} power={power} setPower={setPower} displacement={displacement} setDisplacement={setDisplacement}
                    gearbox={gearbox} setGearbox={setGearbox} powertrain={powertrain} setPowertrain={setPowertrain}/>
        </div>
    );
}

export default MoreFiltersPage;