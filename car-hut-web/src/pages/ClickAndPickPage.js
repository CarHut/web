import Header from "../components/Header";
import BrandSection from "../components/clickandpickpage/BrandSection";
import "../css/ClickAndPickPage.css"

function ClickAndPickPage() {
    return (
        <div className="body">
            <Header/>
            <div className="current-route-text">Main page -> Click and pick!</div>
            <div className="click-and-pick-page-header">Click and pick - find your car with our guidance</div>
            <BrandSection/>
        </div>
    );
}

export default ClickAndPickPage;