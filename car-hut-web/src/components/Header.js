import '../css/Header.css'
import { useState } from 'react';

function Header() {

    const [loggedUserId, setLoggedUserId] = useState('');

    return (
        <header>
            <div className='logo'>
                <img className='carhut-img' src={require('../images/carhut_logo.png')}/>
                <h1>CarHut</h1>
            </div>
            <div className='login-entity'>
                <div className='header-text-content'>Login</div>
                <img className='login-img' src={require('../images/mainpage/login.png')}/>
            </div>
        </header>
    );
}

export default Header; 