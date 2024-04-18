import '../css/Header.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {

    const [loggedUserId, setLoggedUserId] = useState('');

    return (
        <header>
            <Link 
                className='logo'
                to={"/mainPage"}
                style={{"textDecoration": "none"}}
            >
                <img className='carhut-img' src={require('../images/carhut_logo.png')}/>
                <h1>CarHut</h1>
            </Link>
            <Link 
                className='login-entity'
                to={"/login"} 
                style={{"textDecoration": "none"}}  
            >
                <div className='header-text-content'>Login</div>
                <img className='login-img' src={require('../images/mainpage/login.png')}/>
            </Link>
        </header>
    );
}

export default Header; 