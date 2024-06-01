import '../../css/userprofilepage/Account.css';
import { useState, useEffect } from 'react';
import AuthUtil from '../../utils/auth/AuthUtil.js'
import APIMethods from '../../api/APIMethods.js';
import Constants from '../../constants/Constants.js';
import LoadingCircle from '../../components/maincomponents/LoadingCircle.js';

function Account() {
    
    const [accountDetails, setAccountDetails] = useState({});
    const [showResetPasswordSent, setShowResetPasswordSent] = useState(false);
    const [showResetPasswordError, setShowResetPasswordError] = useState(false);

    const [loadingAccountDetails, setLoadingAccountDetails] = useState(false);

    const fetchAccountDetails = async () => {
        setLoadingAccountDetails(true);
        try {
            const data = await APIMethods.getUserDetailsInfo();
            setAccountDetails(data);
            setLoadingAccountDetails(false);
        } catch (error) {
            console.log(`[UserProfilePage][Account][fetchAccountDetails][ERROR] - Cannot fetch account details. Stack trace message: ${error}`);
            setLoadingAccountDetails(false);
        }
    }

    useEffect(() => {
        fetchAccountDetails();
    }, []);

    const handleResetPassword = async () => {
        try {
            const response = await APIMethods.resetPasswordSendEmail(accountDetails.email); 
            if (response.status === 200) {
                setShowResetPasswordSent(true);
                setShowResetPasswordError(false);
            } else {
                setShowResetPasswordSent(false);
                setShowResetPasswordError(true);
            }
        } catch (error) {
            console.log(`[UserProfilePage][Account][handleResetPassword][ERROR] - Cannot initiate password reset. Stack trace message: ${error}`);
            setShowResetPasswordError(true);
        }
    }

    return (
        <div className='account-wrapper'>
            <div className='profile-content-header'>Account</div>
            {loadingAccountDetails ? <LoadingCircle/> : <div/>}
            <div className='account-main-info-wrapper'>
                <div className='account-main-info-column-entity'>
                    <div className='profile-content-dark-text'>Username</div>
                    <div className='profile-content-dark-text'>E-mail</div>
                    <div className='profile-content-dark-text'>Phone No.</div>
                    <div className='profile-content-dark-text'>Password</div>
                </div>
                <div className='account-main-info-column-entity'>
                    <div className='profile-content-text'>{accountDetails.username}</div>
                    <div className='profile-content-text'>{accountDetails.email}</div>
                    <div className='profile-content-text'>+421 000 000 000</div>
                    <div className='profile-content-text'>**********</div>
                    <div className='profile-content-text-forgot-password' onClick={handleResetPassword}>Change my password</div>
                    {showResetPasswordSent 
                        ?   <div className='profile-content-text-success'>Email with token will be send to email {accountDetails.email}.</div>
                        :   showResetPasswordError 
                            ?   <div className='profile-content-text-error'>Something went wrong. Try again later.</div>
                            :   <div/>
                    }
                </div>
                <a href={`${Constants.webAddress}mainPage`} className='account-button' onClick={() => AuthUtil.logout()}>
                    <div className='account-button-text'>Log out</div></a>
            </div>
        </div>
    );
}

export default Account;