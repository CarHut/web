import { useEffect, useState } from "react";
import APIMethods from "../../api/APIMethods";

function Offers({ graphChangeContent, filters }) {

    const [offers, setOffers] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        
    }, [graphChangeContent]);

    useEffect(() => {
        fetchOffersWithFilters();
    }, [filters]);

    const fetchOffersWithFilters = async () => {
        const offersFilterModel = {
            brandId: filters.brandId,
            modelId: filters.modelId,
            priceFrom: filters.priceFrom,
            priceTo: filters.priceTo,
            mileageFrom: filters.milFrom,
            mileageTo: filters.milTo,
            yearFrom: filters.yearFrom,
            yearTo: filters.yearTo,
            location: null,
            fuel: filters.fuelType,
            powerFrom: filters.powerFrom,
            powerTo: filters.powerTo,
            displacementFrom: filters.disFrom,
            displacementTo: filters.disTo,
            gearbox: filters.gearbox,
            models: [],
            bodyTypes: [],
            dateFrom: filters.dateFrom,
            dateTo: filters.dateTo
        }
        console.log(offersFilterModel);
        const offersResponse = await APIMethods.getOffersWithFilters(offersFilterModel, null, null, 10, currentPage);
        if (offersResponse.statusCode !== 200) {
            return;
        }
        const offers = JSON.parse(offersResponse.responseBody);
        setOffers(offers);
        console.log(offers);
    }

    // const generateOffers = () => {

    // }

    return (
        <div></div>
    );
}

export default Offers;