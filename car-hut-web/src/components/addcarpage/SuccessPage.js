import { Link } from 'react-router-dom';
import '../../css/addcarpage/SuccessPage.css';
import RegularButton from '../maincomponents/RegularButton';

function SuccessPage() {

    const buttonSizingWidth = {
        standardSize: '6vw',
        mediumSize: '10vw',
        smallSize: '35vw'
    }
    
    const buttonSizingHeight = {
        standardSize: '3vw',
        mediumSize: '5vw',
        smallSize: '8vw'
    }

    const renderButton = () => {
        return (
            <RegularButton 
                label={'Check your offers'}
                buttonWidth={buttonSizingWidth}
                buttonHeight={buttonSizingHeight}
            />
        )
    }

    return (
        <div className='add-car-success-section'>
            <div className='add-car-success-header'>Your offer has been successfully added to our system.</div>
            <div className='line-container'/>
            <Link
                to={"/userProfile"}
                style={{textDecoration: "none"}}
            >
                {renderButton()}
            </Link>
        </div>
    );
}

export default SuccessPage;