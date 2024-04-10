import '../css/CarOfferPage.css';
import Header from "../components/Header";
import CarMainSection from '../components/carofferpage/CarMainSection';

function CarOfferPage() {

    return (
        <div className="body">
            <Header/>
            <div className="current-route-text">xxx</div>
            <div className="car-offer-page-header">You've picked</div>
            <CarMainSection/>
        </div>
    );

}

export default CarOfferPage;