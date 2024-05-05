import { useState, useEffect } from 'react';
import Header from '../components/maincomponents/Header';
import '../css/pages/LoginRegisterPage.css';
import AuthUtil from '../utils/auth/AuthUtil';
import { redirect, useNavigate } from 'react-router-dom';
function LoginRegisterPage() {

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [repeatRegisterPassword, setRepeatRegisterPassword] = useState('');

    const [isTokenSet, setIsTokenSet] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const tokenAvailable = await AuthUtil.login(loginEmail, loginPassword); 
        setIsTokenSet(tokenAvailable);
        if (!tokenAvailable) {
            setShowErrorMessage(true);
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
                                <div className='input-label'>Email</div>
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
                        </form>
                    </div>
                    <div className='register-wrapper'>
                        <div className='header-label'>Register</div>
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
                    </div>
                </section>
            </div>
        </div>
        
    );
}

export default LoginRegisterPage;