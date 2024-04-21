import '../../css/userprofilepage/ProfileContent.css';
import { useLocation } from 'react-router-dom';
import Account from './Account';
import SavedCars from './SavedCars';

function ProfileContent() {

    const location = useLocation();

    const renderProfileContentByLocation = () => {
        if (location.pathname === '/userProfile/account') {
            return <Account/>;
        } 
        else if (location.pathname === '/userProfile/savedCars') {
            return <SavedCars/>
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