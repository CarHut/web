import '../../css/maincomponents/Header.css'
import { Link } from 'react-router-dom';
import AuthUtil from '../../utils/auth/AuthUtil';
import Constants from '../../constants/Constants';
import { useEffect, useState } from 'react';

function Header() {

    const [isUserLogged, setIsUserLogged] = useState(false);
    const [isMobileWidth, setIsMobileWidth] = useState(window.innerWidth < 600 ? true : false);
    const [isBurgerMenuVisible, setIsBurgerMenuVisible] = useState(false);

    const handleWindowResize = () => {
        if (window.innerWidth < 600) {
            setIsMobileWidth(true);
        } else {
            setIsMobileWidth(false);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        checkIfUserIsLogged();
        return (() => {
            window.removeEventListener('resize', handleWindowResize);
        });
    }, [])

    const checkIfUserIsLogged = () => {
        if (localStorage.getItem('token') === null) {
            setIsUserLogged(false);
        } else {
            setIsUserLogged(true);
        }
    }

    const renderRoutingToAddOffer = () => {
        if (isUserLogged) {
            return '/addCar/mainInfo';
        } else {
            return '/login';
        }
    }

    const renderLogo = () => {
        return (
            <Link 
                className='logo'
                to={"/mainPage"}
                style={{"textDecoration": "none"}}
            >
                <img className='carhut-img' src={require('../../images/carhut_logo.png')}/>
                <h1>CarHut</h1>
            </Link>
        );
    }

    const renderStandardLogin = () => {
        return (
            <Link 
                className='login-entity'
                to={"/login"} 
                style={{"textDecoration": "none"}}  
            >
                <div className='header-text-content'>Login</div>
                <img className='login-img' src={require('../../images/mainpage/login.png')}/>
            </Link> 
        );
    }

    const renderLoggedUser = () => {
        return (
            <div className='logged-user-entity'> 
                <div className='logged-user-content'>
                    <div className='header-text-content'>{localStorage.getItem('username')}</div>
                    <img className='login-img' src={require('../../images/mainpage/login.png')}/>
                </div>
                <div className='logged-user-dropdown-menu-wrapper'>
                    <Link
                        className='dropdown-menu-text'
                        to={'/userProfile/account'}
                        style={{"textDecoration": "none"}}
                    >
                        Profile
                    </Link>
                    <a href={`${Constants.webAddress}mainPage`} className='dropdown-menu-text' onClick={(e) => AuthUtil.logout(e)}>Logout</a>
                </div>
            </div>
        )
    }

    const renderBurgerMenu = () => {
        return (
            <div>
                <img className='burger-menu-img' src={require('../../images/burger_menu.png')} onClick={() => setIsBurgerMenuVisible(!isBurgerMenuVisible)}/>
                { isBurgerMenuVisible === true 
                    ?   <div className='burger-menu-overlay'>
                            <div style={{display: "flex", justifyContent: "center"}} onClick={() => setIsBurgerMenuVisible(false)}>
                                {renderLogo()}
                            </div>
                            <div className='burger-menu-content'>
                                <Link
                                    className='burger-menu-text'
                                    to={renderRoutingToAddOffer()}
                                    onClick={() => setIsBurgerMenuVisible(false)}
                                >
                                    Add offer
                                </Link>
                                <div className='burger-menu-line'/>                        
                            </div>
                        </div>
                    : <div/>   
                }
            </div>
            
        );
    }

    const renderStandardHeader = () => {
        return (
            <header>
                {renderLogo()}
                <Link
                    className='header-tab'
                    to={renderRoutingToAddOffer()}
                >
                    Add offer
                </Link>
                {localStorage.getItem('token') === null && localStorage.getItem('username') === null 
                    ?   renderStandardLogin()
                    :   renderLoggedUser()
                }
            </header>
        );
    }

    const renderMobileHeader = () => {
        return (
            <header>
                {renderBurgerMenu()}
                {renderLogo()}
                {localStorage.getItem('token') === null && localStorage.getItem('username') === null 
                    ?   renderStandardLogin()
                    :   renderLoggedUser()
                }
            </header>
        )
    }

    return (
        <>
            { isMobileWidth === true ? renderMobileHeader() : renderStandardHeader() }
        </>
    );
}

export default Header; 