import Header from "../components/maincomponents/Header";
import BrandSection from "../components/clickandpickpage/BrandSection";
import EngineSection from "../components/clickandpickpage/EngineSection";
import FuelSection from "../components/clickandpickpage/FuelSection";
import GearboxSection from "../components/clickandpickpage/GearboxSection";
import MileageSection from "../components/clickandpickpage/MileageSection";
import ModelSection from "../components/clickandpickpage/ModelSection";
import PriceSection from "../components/clickandpickpage/PriceSection";
import RegistrationSection from "../components/clickandpickpage/RegistrationSection";
import CategoriesSection from "../components/clickandpickpage/CategoriesSection";
import "../css/pages/ClickAndPickPage.css"
import { useLocation } from "react-router-dom";
import ColorSection from "../components/clickandpickpage/ColorSection";
import { useEffect } from "react";
import SocketAPI from "../messaging/SocketAPI";
import Footer from "../components/maincomponents/Footer";


function ClickAndPickPage() {
    const location = useLocation();

    // Socket reconnecting
    useEffect(() => {    
        if (localStorage.getItem('socket') != null && localStorage.getItem('socket') != undefined) {
            localStorage.removeItem('socket')
            const socket = SocketAPI.connectToSocket(localStorage.getItem('username'));
            localStorage.setItem('socket', socket);
        }
    }, []);

    // Determine which section to render based on the current pathname
    const renderSection = () => {
        const { pathname } = location;

        if (pathname === '/clickAndPickPage/brand') {
            return <BrandSection/>;
        } else if (pathname === '/clickAndPickPage/model') {
            return <ModelSection/>;
        } else if (pathname === '/clickAndPickPage/price') {
            return <PriceSection/>;
        } else if (pathname === '/clickAndPickPage/mileage') {
            return <MileageSection/>;
        } else if (pathname === '/clickAndPickPage/registration') {
            return <RegistrationSection/>;
        } else if (pathname === '/clickAndPickPage/fuel') {
            return <FuelSection/>;
        } else if (pathname === '/clickAndPickPage/engine') {
            return <EngineSection/>;
        } else if (pathname === '/clickAndPickPage/gearbox') {
            return <GearboxSection/>;
        } else if (pathname === '/clickAndPickPage/color') {
            return <ColorSection/>;
        }

        return <div>Invalid route</div>;
    };

    return (
        <div className="body">
            <Header/>
            {/* <div className="current-route-text">Main page -> Click and pick!</div> */}
            <div className="click-and-pick-page-header">Click and pick - find your car with our guidance</div>
            {renderSection()}
            <CategoriesSection/>
            <Footer/>
        </div>
    );
}

export default ClickAndPickPage;