import APIMethods from '../../api/APIMethods';
import '../../css/carofferpage/SellerInfo.css';
import { useEffect, useState } from 'react';


function SellerInfo({car}) {

    const [offersNum, setOffersNum] = useState('');
    const [sellerFullName, setSellerFullName] = useState('');
    const [sellerEmail, setSellerEmail] = useState('');
    
    const fetchOffersNum = async () => {
        try {
            setOffersNum(await APIMethods.getOffersNumByUserId(car.sellerId));
        } catch (error) {
            console.log(`[CarOfferPage][SellerInfo][fetchOffersNum][ERROR] - Cannot fetch offers number from sellerId=${car.sellerId}. Stack trace message: ${error}`);
        }
    }

    const fetchSellerFullName = async () => {
        try {
            setSellerFullName(await APIMethods.getFirstNameAndSurnameByUserId(car.sellerId));
        } catch (error) {
            console.log(`[CarOfferPage][SellerInfo][fetchSellerFullName][ERROR] - Cannot fetch seller full name from sellerId=${car.sellerId}. Stack trace message: ${error}`);
        }
    }

    const fetchSellerEmail = async () => {
        try {
            setSellerEmail(await APIMethods.getEmailByUserId(car.sellerId));
        } catch (error) {
            console.log(`[CarOfferPage][SellerInfo][fetchSellerFullName][ERROR] - Cannot fetch seller email from sellerId=${car.sellerId}. Stack trace message: ${error}`);
        }
    }

    useEffect(() => {
        fetchOffersNum();
        fetchSellerFullName();
        fetchSellerEmail();
    }, []);

    return (
        <div className='seller-info-body'>
            <div className='seller-info-header'>Seller</div>
            <div className='seller-info-line-container'/>
            <div className='seller-info-content-body'>
                <div className='seller-info-content-body-name-text'>{sellerFullName}</div>
                <div className='seller-info-content-row-wrapper'>
                    <div className='seller-info-content-column-wrapper'>
                        <div className='seller-info-content-body-text-opacity'>E-mail</div>
                        <div className='seller-info-content-body-text-opacity'>Offers posted</div>
                    </div>
                    <div className='seller-info-content-column-wrapper'>
                        <div className='seller-info-content-body-text'>{sellerEmail}</div>
                        <div className='seller-info-content-body-text'>{offersNum}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellerInfo;