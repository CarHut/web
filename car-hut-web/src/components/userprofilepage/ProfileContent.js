import '../../css/userprofilepage/ProfileContent.css';
import { useLocation } from 'react-router-dom';
import Account from './Account';
import SavedCars from './SavedCars';
import MyListings from './MyListings';
import SavedSearches from './SavedSearches';
import Chats from './Chats';
import ChatInterface from './ChatInterface';

function ProfileContent({ socket }) {

    const location = useLocation();

    const renderProfileContentByLocation = () => {
        if (location.pathname === '/userProfile/account') {
            return <Account/>;
        } 
        else if (location.pathname === '/userProfile/savedCars') {
            return <SavedCars/>;
        } 
        else if (location.pathname === '/userProfile/myListings') {
            return <MyListings/>;
        }
        else if (location.pathname === '/userProfile/savedSearches') {
            return <SavedSearches/>;
        } else if (location.pathname === '/userProfile/chats') {
            return <Chats socket={socket}/>;
        } else if (location.pathname === '/userProfile/chats/with') {
            return <ChatInterface socket={socket}/>;
        }

        return <div/>;
    }

    return (
        <div className='profile-content-body'>
            {renderProfileContentByLocation()}
        </div>
    );

}

export default ProfileContent;