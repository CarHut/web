import '../../css/carofferpage/CarMainInfo.css';

function CarMainInfo({car}) {

    const addCarToWishlist = async () => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: -999,
                userId: localStorage.getItem('username'),
                carId: car.id
              })
        };

        const response = await fetch('http://localhost:8080/api/carhut/savedCars/addSavedCarByUsername', requestOptions);
        console.log(response);
    }

    return (
        <div className='section-car-offer-main-info-section-body'>
            <div className='section-car-offer-main-info-wrapper'>
                <div className='car-offer-main-info-header'>
                    {car.header}
                </div>
                <div className='car-offer-main-info-line-container'/>
                <div className='car-offer-main-info-split-wrapper'>
                    <div className='car-offer-main-info-split-section-wrapper'>
                        <div className='car-offer-main-info-price-label'>{car.price}</div>
                        <div className='car-offer-main-info-netto-label'>70 752 $ (netto)</div>
                        <div className='car-offer-main-info-financing-label'>financing from 1 201$ / month</div>
                        <div className='pretty-button-car-offer-page' onClick={() => addCarToWishlist()}>Add to wishlist</div>
                    </div>
                    <div className='car-offer-main-info-split-section-wrapper'>
                        <div className='car-offer-info-stars-wrapper'>    
                            <div className='star'/>
                            <div className='star'/>
                            <div className='star'/>
                            <div className='star'/>
                            <div className='star'/>
                        </div>
                        <div className='car-offer-main-info-price-status-label'>Good price</div>
                        <div className='car-offer-main-info-line-container'/>
                        <div className='car-offer-main-info-seller-name-label'>Autohaus Royal GmbH</div>
                        <div className='car-offer-main-info-seller-address-label'>DE-12103 Berlin, Händler</div>
                        <button className='car-offer-main-info-button'>Contant seller</button>
                    </div>
                </div>
            </div>           
        </div>
    );
}

export default CarMainInfo;