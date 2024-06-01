import '../../css/carofferpage/CarMainInfo.css';
import APIMethods from '../../api/APIMethods';
import { useEffect, useState } from 'react';
import LoadingCircle from '../../components/maincomponents/LoadingCircle';

function CarMainInfo({car}) {
    const [carModel, setCarModel] = useState(car);
    const [carSellerFullName, setCarSellerFullName] = useState('');

    const [loadingAddCarToWishlist, setLoadingAddCarToWishlist] = useState(false);
    const [showAddCarToWishlistErrorMessage, setShowAddCarToWishlistErrorMessage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const fetchSellerFullName = async (sellerId) => {
        try {
            const fullName = await APIMethods.getFirstNameAndSurnameByUserId(sellerId);
            setCarSellerFullName(fullName);
        } catch (error) {
            console.log(`[CarOfferPage][CarMainInfo][fetchSellerFullName][ERROR] - Cannot fetch full name of seller with id=${sellerId}. Stack trace message: ${error}`);
        }
    }

    useEffect(() => {
        fetchSellerFullName(carModel.sellerId);
    }, []);

    const addCarToWishlist = async () => {
        setLoadingAddCarToWishlist(true);
        try {
            const state = await APIMethods.addCarToSavedByUser(-999, localStorage.getItem('username'), carModel.id);
            setShowAddCarToWishlistErrorMessage(false);
            setLoadingAddCarToWishlist(false);
            setShowSuccessMessage(true);
        } catch (error) {
            console.log(`[CarOfferPage][CarMainInfo][addCarToWishList][ERROR] - Cannot add car to wishlist. Stack trace message: ${error}`);
            setShowAddCarToWishlistErrorMessage(true);
            setLoadingAddCarToWishlist(false);
            setShowSuccessMessage(false);
        }
    }

    return (
        <div className='section-car-offer-main-info-section-body'>
            <div className='section-car-offer-main-info-wrapper'>
                <div className='car-offer-main-info-header'>
                    {carModel.header}
                </div>
                <div className='car-offer-main-info-line-container'/>
                <div className='car-offer-main-info-split-wrapper'>
                    <div className='car-offer-main-info-split-section-wrapper'>
                        <div className='car-offer-main-info-price-label'>{carModel.price}</div>
                        <div className='car-offer-main-info-netto-label'>70 752 $ (netto)</div>
                        <div className='car-offer-main-info-financing-label'>financing from 1 201$ / month</div>
                        <div className='pretty-button-car-offer-page' onClick={() => addCarToWishlist()}>Add to wishlist</div>
                        {loadingAddCarToWishlist ? <LoadingCircle/> : <div/>}
                        {showAddCarToWishlistErrorMessage ? <div className='car-main-info-add-to-wishlist-text error'>Cannot add car to wishlist. Please try later</div> : showSuccessMessage ? <div className='car-main-info-add-to-wishlist-text success'>Successfully added car to wishlist.</div> : <div/>}
                    </div>
                    <div className='car-offer-main-info-split-section-wrapper'>
                        <div className='car-offer-info-stars-wrapper'>    
                            <div className='star'/>
                            <div className='star'/>
                            <div className='star'/>
                            <div className='star'/>
                            <div className='star'/>
                        </div>
                        <div className='car-offer-main-info-price-status-label'>Good price</div>
                        <div className='car-offer-main-info-line-container'/>
                        <div className='car-offer-main-info-seller-name-label'>{carSellerFullName}</div>
                        <div className='car-offer-main-info-seller-address-label'>{carModel.sellerAddress}</div>
                        <button className='car-offer-main-info-button'>Contant seller</button>
                    </div>
                </div>
            </div>           
        </div>
    );
}

export default CarMainInfo;