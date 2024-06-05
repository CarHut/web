import { useState } from 'react';
import '../../css/maincomponents/RegularButton.css';
import { useEffect } from 'react';

// onClickHandler is not needed
function RegularButton({ label, buttonWidth, buttonHeight, color, onClickHandler }) {

    const [currentWidth, setCurrentWidth] = useState(0);
    const [currentHeight, setCurrentHeight] = useState(0);

    const handleResize = () => {
        if (window.innerWidth <= 600) {
            setCurrentWidth(buttonWidth.smallSize);
            setCurrentHeight(buttonHeight.smallSize);
        } else if (window.innerWidth <= 1350) {
            setCurrentWidth(buttonWidth.mediumSize);
            setCurrentHeight(buttonHeight.mediumSize);
        } else {
            setCurrentWidth(buttonWidth.standardSize);
            setCurrentHeight(buttonHeight.standardSize);
        }
    }

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return (
        <button 
            className='regular-button'
            style={{ width: currentWidth, height: currentHeight, backgroundColor: color }}
            onClick={ onClickHandler }
        >
            { label }
        </button>
    );
}

export default RegularButton;