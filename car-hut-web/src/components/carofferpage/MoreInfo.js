import '../../css/carofferpage/MoreInfo.css';
import { useEffect, useState } from 'react';

function MoreInfo({car}) {

    const [carModel, setCarModel] = useState(car);

    return (
        <div className='more-info-body'>
            <div className='more-info-header'>More info</div>
            <div className='more-info-main-paragraph'>{carModel.description}</div>
        </div>
    );
}

export default MoreInfo;