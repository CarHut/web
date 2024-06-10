import '../css/pages/CarOfferPage.css';
import Header from "../components/maincomponents/Header";
import CarMainSection from '../components/carofferpage/CarMainSection';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SocketAPI from '../messaging/SocketAPI';
import Footer from '../components/maincomponents/Footer';

function CarOfferPage() {

    var loc = useLocation();

    const [carId, setCarId] = useState(new URLSearchParams(loc.search).get('carId'));

    // Socket reconnecting
    useEffect(() => {    
        if (localStorage.getItem('socket') != null && localStorage.getItem('socket') != undefined) {
            localStorage.removeItem('socket')
            const socket = SocketAPI.connectToSocket(localStorage.getItem('username'));
            localStorage.setItem('socket', socket);
        }
    }, []);

    return (
        <div className="body">
            <Header/>
            {/* <div className="current-route-text">in development</div> */}
            <div className="car-offer-page-header">You've picked</div>
            <CarMainSection carId={carId} car={null}/>
            <Footer/>
        </div>
    );

}

export default CarOfferPage;