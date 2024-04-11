import '../../css/carofferpage/MoreInfo.css';

function MoreInfo({car}) {

    return (
        <div className='more-info-body'>
            <div className='more-info-header'>More info</div>
            <div className='more-info-main-paragraph'>{car.description}</div>
        </div>
    );
}

export default MoreInfo;