import '../../css/maincomponents/RateSellerOverlay.css';
import Star from './Star';

function RateSellerOverlay() {

    return (
        <div className='rate-seller-overlay-body'>
            <div className='rate-seller-header-text'>Rate seller</div>
            <div className='rating-row'>
                <Star width={"2.5vw"} height={"2.5vw"} rotation={"0"} color={'#fff'} onClickHandler={() => {}}/>
                <Star width={"2.5vw"} height={"2.5vw"} rotation={"0"} color={"#fff"} onClickHandler={() => {}}/>
                <Star width={"2.5vw"} height={"2.5vw"} rotation={"0"} color={"#fff"} onClickHandler={() => {}}/>
                <Star width={"2.5vw"} height={"2.5vw"} rotation={"0"} color={"#fff"} onClickHandler={() => {}}/>
                <Star width={"2.5vw"} height={"2.5vw"} rotation={"0"} color={"#fff"} onClickHandler={() => {}}/>
            </div>
        </div>
    );
}

export default RateSellerOverlay;