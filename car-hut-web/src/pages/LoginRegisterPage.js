import { useState, useEffect } from 'react';
import Header from '../components/maincomponents/Header';
import '../css/pages/LoginRegisterPage.css';
import AuthUtil from '../utils/auth/AuthUtil';
import { Link, useNavigate } from 'react-router-dom';
import APIMethods from '../api/APIMethods';
import SocketAPI from '../messaging/SocketAPI';
import LoadingCircle from '../components/maincomponents/LoadingCircle';
import RegularButton from '../components/maincomponents/RegularButton';
import TextInputField from '../components/maincomponents/TextInputField';
import Footer from '../components/maincomponents/Footer';

function LoginRegisterPage() {

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isTokenSet, setIsTokenSet] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [repeatRegisterPassword, setRepeatRegisterPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');

    const [registerLoading, setRegisterLoading] = useState(false);
    const [showRegistrationError, setShowRegistrationError] = useState(false);
    const [registrationErrorMessage, setRegistrationErrorMessage] = useState('');
    
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const regularButtonSizingWidth = {
        standardSize: "7vw",
        mediumSize:   "12vw",
        smallSize:    "15vw"
    };

    const regularButtonSizingHeight = {
        standardSize: "3vw",
        mediumSize:   "5vw",
        smallSize:    "8vw"
    }

    const textInputFieldSizingWidth = {
        standardSize: "10vw",
        mediumSize:   "15vw",
        smallSize:    "28vw"
    };

    const textInputFieldSizingHeight = {
        standardSize: "2vw",
        mediumSize:   "3vw",
        smallSize:    "4vw"
    }


    // Socket reconnecting
    useEffect(() => {    
        if (localStorage.getItem('socket') != null && localStorage.getItem('socket') != undefined) {
            localStorage.removeItem('socket')
            const socket = SocketAPI.connectToSocket(localStorage.getItem('username'));
            localStorage.setItem('socket', socket);
        }
    }, []);
    
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const tokenAvailable = await AuthUtil.login(loginEmail, loginPassword); 
            setIsTokenSet(tokenAvailable);
            if (!tokenAvailable) {
                setShowErrorMessage(true);
            }
            setLoading(false);
        } catch (error) {
            setShowErrorMessage(true);
            setLoading(false);
            console.log(`[LoginRegisterPage][handleLoginSubmit][ERROR] - Cannot login user into system. Stack trace message: ${error}`);
        }
    }

    useEffect(() => {
        if (isTokenSet) {
            navigate('/userProfile');
        } 
    }, [isTokenSet]);

    const handleRegisterSubmit = async (e) => {
        setRegisterLoading(true);
        e.preventDefault();

        const registerBody = {
            firstName: firstName,
            surname: surname,
            username: username,
            email: registerEmail,
            password: registerPassword,
            repeatPassword: repeatRegisterPassword
        }

        try {
            const response = await APIMethods.registerInitiate(registerBody);
            const responseText = await response.text();
            
            if (responseText !== 'Successfully initiated registration.') {
                switch (responseText) {
                    case 'SUCCESS':
                        setShowRegistrationError(false);
                        setRegistrationErrorMessage('');
                        break;
                    case 'INVALID_FIRST_NAME':
                        setShowRegistrationError(true);
                        setRegistrationErrorMessage('Invalid first name.');
                        break;
                    case 'INVALID_SURNAME':
                        setShowRegistrationError(true);
                        setRegistrationErrorMessage('Invalid surname.');
                        break;
                    case 'INVALID_USERNAME':
                        setShowRegistrationError(true);
                        setRegistrationErrorMessage('Invalid username.');
                        break;
                    case 'USERNAME_IN_USE':
                        setShowRegistrationError(true);
                        setRegistrationErrorMessage('Username is already used.');
                        break;
                    case 'PASSWORDS_DO_NOT_MATCH':
                        setShowRegistrationError(true);
                        setRegistrationErrorMessage('Passwords do not match.');
                        break;
                    case 'INVALID_EMAIL':
                        setShowRegistrationError(true);
                        setRegistrationErrorMessage('Invalid e-mail.');
                        break;
                    case 'EMAIL_IN_USE':
                        setShowRegistrationError(true);
                        setRegistrationErrorMessage('E-mail is already used.');
                        break;
                    case 'SHORT_PASSWORD':
                        setShowRegistrationError(true);
                        setRegistrationErrorMessage('Password must have atleast 8-characters.');
                        break;
                    case 'PASSWORD_DOES_NOT_CONTAIN_UPPER_CHARACTER':
                        setShowRegistrationError(true);
                        setRegistrationErrorMessage('Password must contain atleast one upper character.');
                        break;
                    case 'PASSWORD_DOES_NOT_CONTAIN_DIGIT':
                        setShowRegistrationError(true);
                        setRegistrationErrorMessage('Password must contain atleast one digit.');
                        break;
                    case 'PASSWORD_DOES_NOT_CONTAIN_SPECIAL_CHARACTER':
                        setShowRegistrationError(true);
                        setRegistrationErrorMessage('Password must contain atleast one special character (e.g. \'@\',\'_\',..).');
                        break;
                    case 'INVALID_PASSWORD':
                        setShowRegistrationError(true);
                        setRegistrationErrorMessage('Password contains invalid character/s.');
                        break; 
                    case 'REGISTRATION_TOKEN_ALREADY_SENT':
                        setShowRegistrationError(true);
                        setRegistrationErrorMessage(`E-mail with verification was already sent to ${registerEmail}.`)                                      
                    default:
                        break;
                }
            }

            if (responseText === 'SUCCESS') {
                setRegisterLoading(false);
                navigate(`/register/emailSent?email=${registerEmail}`);
            }
            setRegisterLoading(false);
        } catch (error) {
            console.log(`[LoginRegisterPage][handleRegisterSubmit][ERROR] - Cannot register user. Stack trace message: ${error}`);
            setShowRegistrationError(true);
            setRegisterLoading(false);
            setRegistrationErrorMessage('Internal error. Please try again later.');     
        }
    }

    const handleGoogleLogin = () => {
        AuthUtil.initiateOauth2GoogleLogin();
    }

    return (
        <div>
            <Header/>
            <div className='login-page-body'>
                <section className='main-wrapper'>
                    <div className='login-wrapper'>
                        <div className='header-label'>Login</div>
                        <form className='login-register-form' onSubmit={(e) => handleLoginSubmit(e)}>
                            <TextInputField 
                                label={'Username'}
                                width={textInputFieldSizingWidth}
                                height={textInputFieldSizingHeight}
                                textFieldValue={loginEmail}
                                textFieldPlaceHolder={'Enter username'}
                                onChangeHandler={(e) => {setLoginEmail(e.target.value)}}
                            />
                            <TextInputField 
                                label={'Password'}
                                width={textInputFieldSizingWidth}
                                height={textInputFieldSizingHeight}
                                textFieldValue={loginPassword}
                                textFieldPlaceHolder={'Enter password'}
                                onChangeHandler={(e) => {setLoginPassword(e.target.value)}}
                                type={'password'}
                            />
                            {showErrorMessage ? <div className='error-text'>Invalid username or password</div> : ""}
                            <RegularButton 
                                label={'Login'} 
                                color={'#181818'} 
                                buttonWidth={regularButtonSizingWidth} 
                                buttonHeight={regularButtonSizingHeight}
                            />
                            {loading ? <LoadingCircle/> : <div/>}
                        </form>
                    </div>
                    <div className='separator-wrapper'>
                        <div className='separator-line'/>   
                        <div className='sign-in-link-text'>Or sign in</div>
                        <div className='separator-line'/>
                    </div>
                    <div className='separator-wrapper'> 
                        <img 
                            className='media-img' 
                            src={require('../images/google.png')}
                            onClick={() => handleGoogleLogin()}
                        />
                    </div>
                    <div className='register-wrapper'>
                        <div className='header-label'>Register</div>
                        <form className='login-register-form' onSubmit={(e) => handleRegisterSubmit(e)}>
                            <div className='register-row-wrapper'>
                                <TextInputField 
                                    label={'First name'}
                                    width={textInputFieldSizingWidth}
                                    height={textInputFieldSizingHeight}
                                    textFieldValue={firstName}
                                    onChangeHandler={(e) => {setFirstName(e.target.value)}}
                                />
                                <TextInputField 
                                    label={'Surname'}
                                    width={textInputFieldSizingWidth}
                                    height={textInputFieldSizingHeight}
                                    textFieldValue={surname}
                                    onChangeHandler={(e) => {setSurname(e.target.value)}}
                                />
                            </div>
                            <TextInputField 
                                label={'Username'}
                                width={textInputFieldSizingWidth}
                                height={textInputFieldSizingHeight}
                                textFieldValue={username}
                                onChangeHandler={(e) => {setUsername(e.target.value)}}
                            />
                            <TextInputField 
                                label={'Email'}
                                width={textInputFieldSizingWidth}
                                height={textInputFieldSizingHeight}
                                textFieldValue={registerEmail}
                                onChangeHandler={(e) => {setRegisterEmail(e.target.value)}}
                            />
                            <TextInputField 
                                label={'Password'}
                                width={textInputFieldSizingWidth}
                                height={textInputFieldSizingHeight}
                                textFieldValue={registerPassword}
                                onChangeHandler={(e) => {setRegisterPassword(e.target.value)}}
                                type={'password'}
                            />
                            <TextInputField 
                                label={'Repeat password'}
                                width={textInputFieldSizingWidth}
                                height={textInputFieldSizingHeight}
                                textFieldValue={repeatRegisterPassword}
                                onChangeHandler={(e) => {setRepeatRegisterPassword(e.target.value)}}
                                type={'password'}
                            />
                            <RegularButton 
                                label={'Register'} 
                                color={'#181818'} 
                                buttonWidth={regularButtonSizingWidth} 
                                buttonHeight={regularButtonSizingHeight}
                            />
                            {showRegistrationError ? <div className='error-text'>{registrationErrorMessage}</div> : ""}
                            {registerLoading ? <LoadingCircle/> : <div/>}
                        </form>
                    </div>
                </section>
            </div>
            <Footer/>
        </div>
        
    );
}

export default LoginRegisterPage;