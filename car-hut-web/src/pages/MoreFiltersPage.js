import Header from "../components/Header";
import "../css/MoreFiltersPage.css"
import BasicData from "../components/morefilterspage/BasicData";

function MoreFiltersPage() {
    return (
        <div className="body">
            <Header/>
            <div className="current-route-text">Main page -> Detailed search</div>
            <div className="more-filters-page-header">Detailed search - find exactly what you want!</div>
            <BasicData/>
        </div>
    );
}

export default MoreFiltersPage;