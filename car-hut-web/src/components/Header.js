import '../css/Header.css'
import { Link } from 'react-router-dom';
import AuthUtil from '../utils/auth/AuthUtil';

function Header() {

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
            {localStorage.getItem('token') === null && localStorage.getItem('username') === null 
                    ?   <Link 
                            className='login-entity'
                            to={"/login"} 
                            style={{"textDecoration": "none"}}  
                        >
                            <div className='header-text-content'>Login</div>
                            <img className='login-img' src={require('../images/mainpage/login.png')}/>
                        </Link> 
                  :     <div className='logged-user-entity'> 
                            <div className='logged-user-content'>
                                <div className='header-text-content'>{localStorage.getItem('username')}</div>
                                <img className='login-img' src={require('../images/mainpage/login.png')}/>
                            </div>
                            <div className='logged-user-dropdown-menu-wrapper'>
                                <Link
                                    className='dropdown-menu-text'
                                    to={'/userProfile/account'}
                                    style={{"textDecoration": "none"}}
                                >
                                    Profile
                                </Link>
                                <Link
                                    
                                >
                                    Add offer
                                </Link>
                                <a href='http://localhost:3000/mainPage' className='dropdown-menu-text' onClick={(e) => AuthUtil.logout(e)}>Logout</a>
                            </div>
                        </div>
            }
        </header>
    );
}

export default Header; 