import '../css/pages/PasswordResetPage.css';
import Header from '../components/maincomponents/Header';
import { useState, useEffect } from 'react';
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import { email } from 'react-admin';
import APIMethods from '../api/APIMethods';
import SocketAPI from '../messaging/SocketAPI';

function PasswordResetPage() {

    const [resetPasswordToken, setResetPasswordToken] = useState("");
    const [accountDetails, setAccountDetails] = useState();
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const fetchAccountDetails = async () => {
        const data = await APIMethods.getUserDetailsInfo();
        setAccountDetails(data);
    }

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        if (newPassword !== repeatNewPassword) {
            setShowErrorMessage(true);
            return;
        }

        const response = await APIMethods.resetPasswordInitiate(resetPasswordToken, newPassword, repeatNewPassword, accountDetails.email);
        
        if (response.status === 200) {
            navigate("/userProfile/account")
        } else {
            console.log("there was a error.");
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const resetPasswordTokenParam = params.get('resetPasswordToken');
        setResetPasswordToken(resetPasswordTokenParam);
        fetchAccountDetails();

        // Socket reconnecting
        if (localStorage.getItem('socket') != null && localStorage.getItem('socket') != undefined) {
            localStorage.removeItem('socket')
            const socket = SocketAPI.connectToSocket(localStorage.getItem('username'));
            localStorage.setItem('socket', socket);
        }

    }, []);

    return (
        <div className='body'>
            <Header/>
            <div className='password-reset-body'>
                <div className='password-reset-wrapper'>
                    <div className='password-reset-header'>
                        Please enter new password
                    </div>
                    <form onSubmit={(e) => handlePasswordReset(e)}>
                        <div className='input-container'>
                            <div className='input-label'>New password</div>
                            <input 
                                value={newPassword}
                                type={'password'}
                                placeholder=''
                                onChange={(e) => {setNewPassword(e.target.value)}}
                                className='login-input'
                            />
                        </div>
                        <div className='input-container'>
                            <div className='input-label'>Repeat new password</div>
                            <input 
                                value={repeatNewPassword}
                                type={'password'}
                                placeholder=''
                                onChange={(e) => {setRepeatNewPassword(e.target.value)}}
                                className='login-input'
                            />
                        </div>
                        {showErrorMessage ? <div className='error-text'>Passwords are not the same.</div> : ""}
                        <button type='submit'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PasswordResetPage;