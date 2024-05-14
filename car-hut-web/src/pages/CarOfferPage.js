import '../css/pages/CarOfferPage.css';
import Header from "../components/maincomponents/Header";
import CarMainSection from '../components/carofferpage/CarMainSection';
import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';

function CarOfferPage() {

    var loc = useLocation();

    const [carId, setCarId] = useState(loc.state.id);

    return (
        <div className="body">
            <Header/>
            {/* <div className="current-route-text">in development</div> */}
            <div className="car-offer-page-header">You've picked</div>
            <CarMainSection carId={carId} car={null}/>
        </div>
    );

}

export default CarOfferPage;