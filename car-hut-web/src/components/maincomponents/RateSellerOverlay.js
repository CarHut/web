import { useState } from 'react';
import '../../css/maincomponents/RateSellerOverlay.css';
import Star from './Star';
import RegularButton from './RegularButton';
import APIMethods from '../../api/APIMethods';

function RateSellerOverlay({ sellerId, sellerRating }) {

    const [newRating, setNewRating] = useState(0);
    const [showRatingError, setShowErrorRating] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const buttonWidthSizing = {
        smallSize: "20vw",
        mediumSize: "12vw",
        standardSize: "8vw"
    }

    const buttonHeightSizing = {
        smallSize: "7vw",
        mediumSize: "4vw",
        standardSize: "3vw"
    }

    const starWidthSizing = {
        smallSize: "5vw",
        mediumSize: "3vw",
        standardSize: "2.2vw"
    }; 

    const starHeightSizing = {
        smallSize: "5vw",
        mediumSize: "3vw",
        standardSize: "2.2vw"
    };

    const handleRatingChange = (e, ratingNum) => {
        e.preventDefault();
        setNewRating(ratingNum);
    }

    const submitRating = async (e) => {
        e.preventDefault(e);
        
        if (newRating > 5 || newRating < 1) {
            return;
        }

        try {
            const userId = await APIMethods.getUserIdByUsername(localStorage.getItem("username"));
            const response = await APIMethods.giveSellerRating(userId, sellerId, newRating);

            if (response.status === 200) {
                setShowErrorRating(false);
                setShowSuccess(true);
            } else {
                setShowErrorRating(true);
                setShowSuccess(false);
            }

        } catch (error) {
            console.log("Error occured while giving seller rating. Error: " + error);
        }
    }

    const decideColorOfStar = (value) => {
        return newRating === 0 && sellerRating !== null ? sellerRating.rating >= value ? "gold" : "fff" : newRating >= value ? "gold" : "fff";
    }

    return (
        <div className='rate-seller-overlay-body'>
            <div className='rate-seller-header-text'>Rate seller</div>
            <div className='rating-row'>
                <Star width={starWidthSizing} height={starHeightSizing} rotation={"0"} color={decideColorOfStar(1)} hoverState={true} onClickHandler={(e) => handleRatingChange(e, 1)}/>
                <Star width={starWidthSizing} height={starHeightSizing} rotation={"0"} color={decideColorOfStar(2)} hoverState={true} onClickHandler={(e) => handleRatingChange(e, 2)}/>
                <Star width={starWidthSizing} height={starHeightSizing} rotation={"0"} color={decideColorOfStar(3)} hoverState={true} onClickHandler={(e) => handleRatingChange(e, 3)}/>
                <Star width={starWidthSizing} height={starHeightSizing} rotation={"0"} color={decideColorOfStar(4)} hoverState={true} onClickHandler={(e) => handleRatingChange(e, 4)}/>
                <Star width={starWidthSizing} height={starHeightSizing} rotation={"0"} color={decideColorOfStar(5)} hoverState={true} onClickHandler={(e) => handleRatingChange(e, 5)}/>
            </div>
            <RegularButton label={"Set rating"} buttonWidth={buttonWidthSizing} buttonHeight={buttonHeightSizing} color={"#181818"} onClickHandler={(e) => submitRating(e)}/>
            {showRatingError ? <div className='set-rating-error-text'>Cannot set new rating for seller.</div> : <div/>}
            {showSuccess ? <div className='set-rating-success-text'>Successfully set new rating.</div> : <div/>}
        </div>
    );
}

export default RateSellerOverlay;