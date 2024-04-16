import { useState } from 'react';
import Header from '../components/Header';
import '../css/LoginRegisterPage.css';
import { useLogin, useNotify } from 'react-admin';

function LoginRegisterPage() {

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [repeatRegisterPassword, setRepeatRegisterPassword] = useState('');

    const login = useLogin();
    const notify = useNotify();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        login({ loginEmail, loginPassword }).catch((error) => notify(`Error: ${error.message}`));
    }

    return (
        <div>
            <Header/>
            <div className='login-page-body'>
                <section className='main-wrapper'>
                    <div className='login-wrapper'>
                        <div className='header-label'>Login</div>
                        <form onSubmit={handleLoginSubmit}>
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
                                    placeholder='Enter password'
                                    onChange={(e) => {setLoginPassword(e.target.value)}}
                                    className='login-input'
                                />
                            </div>
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