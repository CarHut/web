import Header from '../components/Header';
import MainWrapper from '../components/userprofilepage/MainWrapper';
import '../css/UserProfilePage.css';

function UserProfilePage() {

    return (
        <div className='user-profile-body'>
            <Header/>
            <div className='current-route-text'>in development</div>
            <div className='user-profile-page-header'>Profile</div>
            <MainWrapper/>
        </div>
    )

}

export default UserProfilePage;