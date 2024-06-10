import '../css/pages/PasswordResetPage.css';
import Header from '../components/maincomponents/Header';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import APIMethods from '../api/APIMethods';
import SocketAPI from '../messaging/SocketAPI';
import TextInputField from '../components/maincomponents/TextInputField';
import RegularButton from '../components/maincomponents/RegularButton';
import LoadingCircle from '../components/maincomponents/LoadingCircle';
import Footer from '../components/maincomponents/Footer';

function PasswordResetPage() {

    const [resetPasswordToken, setResetPasswordToken] = useState("");
    const [accountDetails, setAccountDetails] = useState();
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const textInputFieldSizingWidth = {
        standardSize: "10vw",
        mediumSize:   "30vw",
        smallSize:    "50vw"
    };

    const textInputFieldSizingHeight = {
        standardSize: "2vw",
        mediumSize:   "4vw",
        smallSize:    "6vw"
    }

    const buttonSizingWidth = {
        standardSize: '10vw',
        mediumSize: '15vw',
        smallSize: '25vw'
    }
    
    const buttonSizingHeight = {
        standardSize: '4vw',
        mediumSize: '6vw',
        smallSize: '10vw'
    }

    const fetchAccountDetails = async () => {
        try {
            const data = await APIMethods.getUserDetailsInfo();
            setAccountDetails(data);
        } catch (error) {
            console.log(`[PasswordResetPage][fetchAccountDetails][ERROR] - Cannot fetch user detail info. Stack trace message: ${error}`);
        }
    }

    const handlePasswordReset = async (e) => {
        setLoading(true);
        e.preventDefault();

        if (newPassword !== repeatNewPassword) {
            setShowErrorMessage(true);
            setLoading(false);
            return;
        }

        try {
            const response = await APIMethods.resetPasswordInitiate(resetPasswordToken, newPassword, repeatNewPassword, accountDetails.email);
            
            if (response.status === 200) {
                navigate("/userProfile/account")
            } else {
                console.log(`[PasswordResetPage][handlePasswordReset][ERROR] - Cannot initiate password reset. Something went wrong internally on server.`);
            }

            setLoading(false);
        } catch (error) {
            console.log(`[PasswordResetPage][handlePasswordReset][ERROR] - Cannot initiate password reset. Stack trace message: ${error}`);
            setLoading(false);
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
                    <form className='reset-password-form-wrapper' onSubmit={(e) => handlePasswordReset(e)}>
                        <TextInputField
                            label={'New password'}
                            width={textInputFieldSizingWidth}
                            height={textInputFieldSizingHeight}
                            textFieldValue={newPassword}
                            onChangeHandler={(e) => {setNewPassword(e.target.value)}}
                            type={'password'}    
                        />
                        <TextInputField
                            label={'Repeat new password'}
                            width={textInputFieldSizingWidth}
                            height={textInputFieldSizingHeight}
                            textFieldValue={repeatNewPassword}
                            onChangeHandler={(e) => {setRepeatNewPassword(e.target.value)}}
                            type={'password'}    
                        />
                        {showErrorMessage ? <div className='error-text'>Passwords are not the same.</div> : ""}
                        <RegularButton
                            label={'Change password'}
                            buttonWidth={buttonSizingWidth}
                            buttonHeight={buttonSizingHeight}
                            color={'#181818'}
                        />
                        {loading ? <LoadingCircle/> : <div/>}
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default PasswordResetPage;