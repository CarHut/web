import { Link } from 'react-router-dom';
import '../../css/addcarpage/SuccessPage.css';

function SuccessPage() {

    return (
        <div className='add-car-success-section'>
            <div className='add-car-success-header'>Your offer has been successfully added to our system.</div>
            <div className='line-container'/>
            <Link
                to={"/userProfile"}
                className='add-car-success-styled-button'
                style={{textDecoration: "none"}}
            >
                Check your offers
            </Link>
        </div>
    );
}

export default SuccessPage;