import '../../css/userprofilepage/Account.css';
import { useState, useEffect } from 'react';
import AuthUtil from '../../utils/auth/AuthUtil.js'
import APIMethods from '../../api/APIMethods.js';

function Account() {
    
    const [accountDetails, setAccountDetails] = useState({});
    const [showResetPasswordSent, setShowResetPasswordSent] = useState(false);
    const [showResetPasswordError, setShowResetPasswordError] = useState(false);

    const fetchAccountDetails = async () => {
        const data = await APIMethods.getUserDetailsInfo();
        setAccountDetails(data);
    }

    useEffect(() => {
        fetchAccountDetails();
    }, []);

    const handleResetPassword = async () => {
        const response = await APIMethods.resetPasswordSendEmail(accountDetails.email); 
        if (response.status === 200) {
            setShowResetPasswordSent(true);
            setShowResetPasswordError(false);
        } else {
            setShowResetPasswordSent(false);
            setShowResetPasswordError(true);
        }
    }

    return (
        <div className='account-wrapper'>
            <div className='profile-content-header'>Account</div>
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
                <a href='http://localhost:3000/mainPage' className='pretty-button' onClick={() => AuthUtil.logout()}>
                    <div className='pretty-button-text'>Log out</div></a>
            </div>
        </div>
    );
}

export default Account;