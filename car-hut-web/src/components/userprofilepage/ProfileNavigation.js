import { Link } from 'react-router-dom';
import '../../css/userprofilepage/ProfileNavigation.css';

function ProfileNavigation() {
    return (
        <div className='profile-navigation-wrapper'>
            <Link 
                className='profile-navigation-entity'
                to={'/userProfile/account'}
                style={{"textDecoration": "none"}}    
            >
                <img className='profile-navigation-entity-img' src={require('C:\\Users\\Johny\\Desktop\\CarHut\\web\\car-hut-web\\src\\images\\mainpage\\login.png')}/>
                <div className='profile-navigation-entity-text'>Account</div>
            </Link>
            <div className='profile-navigation-entity'>
                <img className='profile-navigation-entity-img' src={require('C:\\Users\\Johny\\Desktop\\CarHut\\web\\car-hut-web\\src\\images\\userprofilepage\\saved_searches.png')}/>
                <div className='profile-navigation-entity-text'>Inbox</div>
            </div>
            <Link 
                className='profile-navigation-entity'
                to={'/userProfile/savedCars'}
                style={{"textDecoration": "none"}}
            >
                <img className='profile-navigation-entity-img' src={require('C:\\Users\\Johny\\Desktop\\CarHut\\web\\car-hut-web\\src\\images\\userprofilepage\\saved_cars.png')}/>
                <div className='profile-navigation-entity-text'>Saved cars</div>
            </Link>
            <div className='profile-navigation-entity'>
                <img className='profile-navigation-entity-img' src={require('C:\\Users\\Johny\\Desktop\\CarHut\\web\\car-hut-web\\src\\images\\userprofilepage\\saved_searches.png')}/>
                <div className='profile-navigation-entity-text'>Saved searches</div>
            </div>
            <div className='profile-navigation-entity'>
                <img className='profile-navigation-entity-img' src={require('C:\\Users\\Johny\\Desktop\\CarHut\\web\\car-hut-web\\src\\images\\userprofilepage\\saved_searches.png')}/>
                <div className='profile-navigation-entity-text'>My listings</div>
            </div>
            <div className='profile-navigation-entity'>
                <img className='profile-navigation-entity-img' src={require('C:\\Users\\Johny\\Desktop\\CarHut\\web\\car-hut-web\\src\\images\\userprofilepage\\saved_searches.png')}/>
                <div className='profile-navigation-entity-text'>My inquiries</div>
            </div>
            <div className='profile-navigation-entity'>
                <img className='profile-navigation-entity-img' src={require('C:\\Users\\Johny\\Desktop\\CarHut\\web\\car-hut-web\\src\\images\\userprofilepage\\saved_searches.png')}/>
                <div className='profile-navigation-entity-text'>Settings</div>
            </div>
        </div>
    );
}

export default ProfileNavigation;