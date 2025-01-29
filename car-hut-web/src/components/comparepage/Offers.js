import '../../css/comparepage/Offers.css'
import { useEffect, useState } from "react";
import APIMethods from "../../api/APIMethods";
import { LazyLoadImage } from 'react-lazy-load-image-component';

function Offers({ graphChangeContent, filters, numOfOffers }) {

    const [offers, setOffers] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [images, setImages] = useState([]);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        
    }, [graphChangeContent]);

    useEffect(() => {
        fetchOffersWithFilters();
    }, [filters, currentPage]);

    useEffect(() => {
        fetchImagesForOffers();
    }, [offers]);

    useEffect(() => {
        setPages(Math.ceil(numOfOffers / 10));
    }, [numOfOffers])

    const fetchImagesForOffers = async () => {
        const imagesTemp = [];
        if (offers === null || offers === undefined) {
            return;
        }
        for (const offer of offers) {
            const response = await APIMethods.getImageByOfferId(offer.id);
            if (response !== null && response !== undefined && response.statusCode === 200) {
                const responseBody = JSON.parse(response.responseBody);
                const base64String = btoa(new Uint8Array(responseBody).reduce((data, byte) => data + String.fromCharCode(byte), ''));
                imagesTemp.push({
                    offerId: offer.id,
                    img: `data:image/png;base64,${base64String}`
                });
            } else {
                imagesTemp.push({
                    offerId: offer.id,
                    img: `image-not-found`
                });
            }
        }
        setImages(imagesTemp);
    }

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
        const offersResponse = await APIMethods.getOffersWithFilters(offersFilterModel, null, null, 10, currentPage);
        if (offersResponse.statusCode !== 200) {
            return;
        }
        const offers = JSON.parse(offersResponse.responseBody);
        setOffers(offers);
    }

    const generateOffers = () => {
        if (offers === null || offers === undefined) {
            return [];
        }
        const offersArray = []
        offers.map((offer, idx) => {
            offersArray.push(
                <div id={idx} className="offer-wrapper">
                    <div className="offer-left-wrapper">
                        <div className="offer-header">{offer.header}</div>
                        <div className='offer-params'>
                            <div className='offer-params-column'>
                                <div className='offer-params-row'>{offer.fuel}</div>
                                <div className='offer-params-row'>{offer.year}</div>
                                <div className='offer-params-row'>{offer.mileage} km</div>
                            </div>
                            <div className='offer-params-column'>
                                <div className='offer-params-row'>{offer.gearbox}</div>
                                <div className='offer-params-row'>{offer.power} kW</div>
                                <div className='offer-params-row'>{offer.drivetrain}</div>
                            </div>
                            <div className='offer-params-column'>
                                
                            </div>
                        </div>
                        <div className='offer-price-label'>{offer.price} €</div>
                        <div className='offer-params-row'>{new Date(offer.date).toLocaleDateString()}</div>
                    </div>
                    <div className="offer-right-wrapper">
                    <LazyLoadImage
                        alt={offer.id}
                        height={"200px"}
                        src={images.length > 0 && images !== null && images !== undefined ? images.filter((img) => img.offerId === offer.id).length !== 0 ? images.filter((img) => img.offerId === offer.id)[0].img : require('../../images/carhut_logo.png') : require('../../images/carhut_logo.png')}
                        width={"auto"} />
                    </div>
                </div>
            ) 
        });
        
        return offersArray;

    }

    const onPickedPage = (pageNum) => {
        setCurrentPage(pageNum);
    }

    const generatePageNumbers = () => {
        console.log(pages)
        const startIdx = currentPage < 3 ? 1 : currentPage > pages - 2 ? pages - 4 : currentPage - 2;
        const pageNumbersArr = [];
        for (let i = startIdx; i < startIdx + 5; i++) {
            if (i === currentPage) {
                pageNumbersArr.push(<div className='page-number-wrapper selected' onClick={(e) => onPickedPage(i)}>{i}</div>)    
            } else {
                pageNumbersArr.push(<div className='page-number-wrapper' onClick={(e) => onPickedPage(i)}>{i}</div>)
            }
        }
        return (
            <div className='page-numbers-wrapper'>
                {pageNumbersArr.map((number) => number)}
            </div>
        )
    }

    return (
        <div>
            <div className="offers">{generateOffers()}</div>
            {generatePageNumbers()}
        </div>
    );
}

export default Offers;