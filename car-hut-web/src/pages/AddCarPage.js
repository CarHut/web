import Header from '../components/maincomponents/Header';
import AddPhotos from '../components/addcarpage/AddPhotos';
import AdditionalInfo from '../components/addcarpage/AdditionalInfo';
import EngineInfo from '../components/addcarpage/EngineInfo';
import Features from '../components/addcarpage/Features';
import MainInfo from '../components/addcarpage/MainInfo';
import SuccessPage from '../components/addcarpage/SuccessPage';
import Summary from '../components/addcarpage/Summary';
import '../css/pages/AddCarPage.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import SocketAPI from '../messaging/SocketAPI';
import Footer from '../components/maincomponents/Footer';

function AddCarPage() {

    const loc = useLocation();

    // Socket reconnecting
    useEffect(() => {    
        if (localStorage.getItem('socket') != null && localStorage.getItem('socket') != undefined) {
            localStorage.removeItem('socket')
            const socket = SocketAPI.connectToSocket(localStorage.getItem('username'));
            localStorage.setItem('socket', socket);
        }
    }, []);

    const renderSection = () => {
        if (loc.pathname.includes('/addCar/mainInfo')) {
            return <MainInfo/>;
        } else if (loc.pathname.includes('/addCar/engineInfo')) {
            return <EngineInfo/>;
        } else if (loc.pathname.includes('/addCar/additionalInfo')) {
            return <AdditionalInfo/>;
        } else if (loc.pathname.includes('/addCar/features')) {
            return <Features/>;
        } else if (loc.pathname.includes('/addCar/addPhotos')) {
            return <AddPhotos/>;
        } else if (loc.pathname.includes('/addCar/summary')) {
            return <Summary/>;
        } else if (loc.pathname.includes('/addCar/success')) {
            return <SuccessPage/>;
        }

        return <div/>
    }

    return (
        <div className='body'>
            <Header/>
            {/* <div className="current-route-text">work in progress</div> */}
            <div className="header-section">
                <div className='add-car-page-header'>Add car</div>
            </div>
            {renderSection()}
            <Footer/>
        </div>
    );

}

export default AddCarPage;