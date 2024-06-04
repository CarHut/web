import { useEffect, useState } from 'react';
import '../../css/maincomponents/RangeSlider.css';

function RangeSlider({ sliderLabel, sliderWidth, changingValue, minValue, maxValue, step, onChangeHandler, onMouseLeaveHandler  }) {

    const [currentWidth, setCurrentWidth] = useState(0);

    const handleResize = () => {
        if (window.innerWidth <= 600) {
            setCurrentWidth(sliderWidth.smallSize);
        } else if (window.innerWidth <= 1350) {
            setCurrentWidth(sliderWidth.mediumSize);
        } else {
            setCurrentWidth(sliderWidth.standardSize);
        }
    }

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div className="range-slider-container">
            <div className='range-slider-label'>{sliderLabel}</div>
            <input
                style={{width: currentWidth}}
                type="range"
                id='id'
                min={minValue}
                max={maxValue}
                step={step}
                value={changingValue}
                onChange={onChangeHandler}
                onMouseLeave={onMouseLeaveHandler}
            />
        </div>
    );

}

export default RangeSlider;