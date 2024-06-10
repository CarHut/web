import '../css/pages/SearchList.css';
import Header from '../components/maincomponents/Header.js';
import MainSection from '../components/searchlist/MainSection.js';
import { useEffect, useState } from 'react';
import SocketAPI from '../messaging/SocketAPI.js';
import Footer from '../components/maincomponents/Footer.js';
import { useLocation } from 'react-router-dom';

function SearchList() {

    const loc = useLocation();

    const parseQuery = (search) => {
        const searchParams = new URLSearchParams(search);
        const parsedState = {
            brand: searchParams.get('brand'),
            model: searchParams.get('model'),
            price: { priceFrom: searchParams.get('price_priceFrom'), priceTo: searchParams.get('price_priceTo') },
            mileage: { mileageFrom: searchParams.get('mileage_mileageFrom'), mileageTo: searchParams.get('mileage_mileageTo') },
            fuelType: searchParams.get('fuelType'),
            powertrain: searchParams.get('powertrain'),
            gearbox: searchParams.get('gearbox'),
            power: { powerFrom: searchParams.get('power_powerFrom'), powerTo: searchParams.get('power_powerTo') },
            models: JSON.parse(searchParams.get('models') || '[]'),
            carTypes: JSON.parse(searchParams.get('carTypes') || '[]'),
            registration: { registrationFrom: searchParams.get('registration_registrationFrom'), registrationTo: searchParams.get('registration_registrationTo') },
            seatingConfig: searchParams.get('seatingConfig'),
            doors: searchParams.get('doors'),
            location: searchParams.get('location'),
            postalCode: searchParams.get('postalCode'),
            displacement: { displacementFrom: searchParams.get('displacement_displacementFrom'), displacementTo: searchParams.get('displacement_displacementTo') }
        };
        return parsedState;
    };

    const [params, setParams] = useState(parseQuery(loc.search));  

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
            {/* <div className="current-route-text">Main page -> Search list</div> */}
            <div className="search-list-page-header">Search list</div>
            <MainSection state={params}/>
            <Footer/>
        </div>
    );
}

export default SearchList;