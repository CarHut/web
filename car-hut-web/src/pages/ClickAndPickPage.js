import Header from "../components/Header";
import BrandSection from "../components/clickandpickpage/BrandSection";
import ModelSection from "../components/clickandpickpage/ModelSection";
import "../css/ClickAndPickPage.css"
import { useLocation } from "react-router-dom";

function ClickAndPickPage() {
    const location = useLocation();

    // Determine which section to render based on the current pathname
    const renderSection = () => {
        const { pathname } = location;

        if (pathname === '/clickAndPickPage/brand') {
            console.log("1");
            return <BrandSection/>;
        } else if (pathname === '/clickAndPickPage/model') {
            console.log("2");
            return <ModelSection/>;
        }

        return <div>Invalid route</div>;
    };

    return (
        <div className="body">
            <Header/>
            <div className="current-route-text">Main page -> Click and pick!</div>
            <div className="click-and-pick-page-header">Click and pick - find your car with our guidance</div>
            {renderSection()}
        </div>
    );
}

export default ClickAndPickPage;