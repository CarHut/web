import '../../css/userprofilepage/MainWrapper.css';
import ProfileContent from './ProfileContent';
import ProfileNavigation from './ProfileNavigation';

function MainWrapper() {
    return (
        <div className='section-body-user-page-main-section'>
            <div className='user-page-left-wrapper'>
                <ProfileNavigation/>
            </div>
            <div className='user-page-vertical-line-container'/>
            <div className='user-page-right-wrapper'>
                <ProfileContent/>
            </div>
        </div>
    );
}

export default MainWrapper;