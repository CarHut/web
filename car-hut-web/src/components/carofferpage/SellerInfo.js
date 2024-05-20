import APIMethods from '../../api/APIMethods';
import '../../css/carofferpage/SellerInfo.css';
import { useEffect, useState } from 'react';


function SellerInfo({car}) {

    const [offersNum, setOffersNum] = useState('');
    const [sellerFullName, setSellerFullName] = useState('');
    const [sellerEmail, setSellerEmail] = useState('');
    
    const fetchOffersNum = async () => {
        setOffersNum(await APIMethods.getOffersNumByUserId(car.sellerId));
    }

    const fetchSellerFullName = async () => {
        setSellerFullName(await APIMethods.getFirstNameAndSurnameByUserId(car.sellerId));
    }

    const fetchSellerEmail = async () => {
        setSellerEmail(await APIMethods.getEmailByUserId(car.sellerId));
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