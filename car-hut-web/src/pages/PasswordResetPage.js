import '../css/PasswordResetPage.css';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import { email } from 'react-admin';

function PasswordResetPage() {

    const [resetPasswordToken, setResetPasswordToken] = useState("");
    const [accountDetails, setAccountDetails] = useState();
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const fetchAccountDetails = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json' 
            },
            body: localStorage.getItem('username')
        }
        
        const response = await fetch('http://localhost:8080/api/auth/getUserDetailsInfo', requestOptions);
        const data = await response.json();
        setAccountDetails(data);
    }

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        if (newPassword !== repeatNewPassword) {
            setShowErrorMessage(true);
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'passwordResetToken': resetPasswordToken,
                'newPassword': newPassword,
                'repeatedNewPassword': repeatNewPassword,
                'email': accountDetails.email
            })
        }

        const response = await fetch('http://localhost:8080/api/auth/resetPasswordInitiate', requestOptions); 

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