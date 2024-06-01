import { useState, useEffect } from 'react';
import Header from '../components/maincomponents/Header';
import '../css/pages/LoginRegisterPage.css';
import AuthUtil from '../utils/auth/AuthUtil';
import { useNavigate } from 'react-router-dom';import APIMethods from '../api/APIMethods';
import SocketAPI from '../messaging/SocketAPI';
import { findAllByDisplayValue } from '@testing-library/react';
import LoadingCircle from '../components/maincomponents/LoadingCircle';

function LoginRegisterPage() {

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [repeatRegisterPassword, setRepeatRegisterPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    
    const [loading, setLoading] = useState(false);

    const [showRegistrationError, setShowRegistrationError] = useState(false);
    const [registrationErrorMessage, setRegistrationErrorMessage] = useState('');

    const [isTokenSet, setIsTokenSet] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = useNavigate();

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

    const handleRegisterSubmit = async (e) => {
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
                navigate('/register/emailSent', { state: { email: registerEmail} });
            }
        } catch (error) {
            console.log(`[LoginRegisterPage][handleRegisterSubmit][ERROR] - Cannot register user. Stack trace message: ${error}`);
            setShowRegistrationError(true);
            setRegistrationErrorMessage('Internal error. Please try again later.');     
        }
    }

    useEffect(() => {
        if (isTokenSet) {
            navigate('/userProfile');
        } 
    }, [isTokenSet]);

    return (
        <div>
            <Header/>
            <div className='login-page-body'>
                <section className='main-wrapper'>
                    <div className='login-wrapper'>
                        <div className='header-label'>Login</div>
                        <form onSubmit={(e) => handleLoginSubmit(e)}>
                            <div className='input-container'>
                                <div className='input-label'>Username</div>
                                <input 
                                    value={loginEmail}
                                    placeholder='Enter email'
                                    onChange={(e) => {setLoginEmail(e.target.value)}}
                                    className='login-input'
                                />
                            </div>
                            <div className='input-container'>
                                <div className='input-label'>Password</div>
                                <input 
                                    value={loginPassword}
                                    type={'password'}
                                    placeholder='Enter password'
                                    onChange={(e) => {setLoginPassword(e.target.value)}}
                                    className='login-input'
                                />
                            </div>
                            {showErrorMessage ? <div className='error-text'>Invalid username or password</div> : ""}
                            <button type='submit'>Login</button>
                            {loading ? <LoadingCircle/> : <div/>}
                        </form>
                    </div>
                    <div className='register-wrapper'>
                        <div className='header-label'>Register</div>
                        <form onSubmit={(e) => handleRegisterSubmit(e)}>
                            <div className='register-row-wrapper'>
                                <div className='input-container'>
                                    <div className='input-label'>First name</div>
                                    <input 
                                        value={firstName}
                                        placeholder='Enter first name'
                                        onChange={(e) => {setFirstName(e.target.value)}}
                                        className='register-input'
                                    />
                                </div>
                                <div className='input-container' style={{marginLeft: "1vw"}}>
                                    <div className='input-label'>Surname</div>
                                    <input 
                                        value={surname}
                                        placeholder='Enter surname'
                                        onChange={(e) => {setSurname(e.target.value)}}
                                        className='register-input'
                                    />
                                </div>
                            </div>
                            <div className='input-container'>
                                <div className='input-label'>Username</div>
                                <input 
                                    value={username}
                                    placeholder='Enter username'
                                    onChange={(e) => {setUsername(e.target.value)}}
                                    className='register-input'
                                />
                            </div>
                            <div className='input-container'>
                                <div className='input-label'>Email</div>
                                <input 
                                    value={registerEmail}
                                    placeholder='Enter email'
                                    onChange={(e) => {setRegisterEmail(e.target.value)}}
                                    className='register-input'
                                />
                            </div>
                            <div className='input-container'>
                                <div className='input-label'>Password</div>
                                <input 
                                    value={registerPassword}
                                    placeholder='Enter password'
                                    onChange={(e) => {setRegisterPassword(e.target.value)}}
                                    className='register-input'
                                />
                            </div>
                            <div className='input-container'>
                                <div className='input-label'>Repeat password</div>
                                <input 
                                    value={repeatRegisterPassword}
                                    placeholder='Enter password'
                                    onChange={(e) => {setRepeatRegisterPassword(e.target.value)}}
                                    className='register-input'
                                />
                            </div>
                            <button type='submit'>Register</button>
                            {showRegistrationError ? <div className='error-text'>{registrationErrorMessage}</div> : ""}
                        </form>
                    </div>
                </section>
            </div>
        </div>
        
    );
}

export default LoginRegisterPage;