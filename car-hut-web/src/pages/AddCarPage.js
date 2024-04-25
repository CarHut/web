import Header from '../components/Header';
import AdditionalInfo from '../components/addcarpage/AdditionalInfo';
import EngineInfo from '../components/addcarpage/EngineInfo';
import MainInfo from '../components/addcarpage/MainInfo';
import '../css/AddCarPage.css';
import { useLocation } from 'react-router-dom';

function AddCarPage() {

    const loc = useLocation();

    const renderSection = () => {
        if (loc.pathname === '/addCar/mainInfo') {
            return <MainInfo/>;
        } else if (loc.pathname === '/addCar/engineInfo') {
            return <EngineInfo/>;
        } else if (loc.pathname === '/addCar/additionalInfo') {
            return <AdditionalInfo/>;
        }

        return <div/>
    }

    return (
        <div className='body'>
            <Header/>
            <div className="current-route-text">work in progress</div>
            <div className="header-section">
                <div className='add-car-page-header'>Add car</div>
            </div>
            {renderSection()}
        </div>
    );

}

export default AddCarPage;