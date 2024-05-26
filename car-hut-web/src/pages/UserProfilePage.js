import Header from '../components/maincomponents/Header';
import MainWrapper from '../components/userprofilepage/MainWrapper';
import '../css/pages/UserProfilePage.css';
import { useEffect } from 'react';
import SocketAPI from '../messaging/SocketAPI';

function UserProfilePage() {

    // Socket reconnecting
    useEffect(() => {    
        if (localStorage.getItem('socket') != null && localStorage.getItem('socket') != undefined) {
            localStorage.removeItem('socket')
            const socket = SocketAPI.connectToSocket(localStorage.getItem('username'));
            localStorage.setItem('socket', socket);
        }
    }, []);

    return (
        <div className='user-profile-body'>
            <Header/>
            {/* <div className='current-route-text'>in development</div> */}
            <div className='user-profile-page-header'>Profile</div>
            <MainWrapper/>
        </div>
    )

}

export default UserProfilePage;