import { Link } from 'react-router-dom';
import APIMethods from '../../api/APIMethods';
import '../../css/carofferpage/SellerInfo.css';
import { useEffect, useState } from 'react';
import { RemoveItemButton } from 'react-admin';


function SellerInfo({car}) {

    const [offersNum, setOffersNum] = useState('');
    const [sellerFullName, setSellerFullName] = useState('');
    const [sellerEmail, setSellerEmail] = useState('');
    const [sellerUsername, setSellerUsername] = useState('');
    const [canAccessChat, setCanAccessChat] = useState(false);

    const [showSendMessageError, setShowSendMessageError] = useState(false);


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

    const fetchSellerUsername = async () => {
        try {
            setSellerUsername(await APIMethods.getUsernameByUserId(car.sellerId));
        } catch (error) {
            console.log(`[CarOfferPage][SellerInfo][fetchUsernameByUserId][ERROR] - Cannot fetch seller username from userId=${car.sellerId}. Stack trace message: ${error}`);
        }
    }

    const pickRoute = () => {
        return `/userProfile/chats/with?username=${sellerUsername}`;
    }

    const handleChatAccessibility = () => {
        // User isn't logged in
        if (localStorage.getItem('username') === null) {  
            setCanAccessChat(false);
            return;
        }

        // User cannot send message to themselves
        if (sellerUsername === localStorage.getItem('username')) {
            setCanAccessChat(false);
            return;
        }

        setCanAccessChat(true);
    }

    useEffect(() => {
        fetchOffersNum();
        fetchSellerFullName();
        fetchSellerEmail();
        fetchSellerUsername();
        handleChatAccessibility();
    }, []);

    return (
        <div className='seller-info-body'>
            <div className='seller-info-header'>Seller</div>
            <div className='seller-info-line-container'/>
            <div className='seller-info-content-body'>
                <div className='seller-info-content-header-wrapper'>
                    <div className='seller-info-content-body-name-text'>{sellerFullName}</div>
                    <Link
                        style={{ visibility: canAccessChat ? "visible" : "hidden" }}
                        to={pickRoute()}
                    >
                        <img className='seller-info-chat-img' src={require('../../images/userprofilepage/chats.png')}/>
                    </Link>            
                    {showSendMessageError ? <div className='seller-info-error-text'>Cannot send message to yourself!</div> : <div/>}
                </div>
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