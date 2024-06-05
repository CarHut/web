import { useEffect, useState } from 'react';
import '../../css/maincomponents/TextInputField.css';

function TextInputField({ label, width, height, textFieldValue, textFieldPlaceHolder, onChangeHandler, type, maxCharacters, color }) {

    const [currentWidth, setCurrentWidth] = useState(0);
    const [currentHeight, setCurrentHeight] = useState(0);

    const handleResize = () => {
        if (window.innerWidth <= 600) {
            setCurrentWidth(width.smallSize);
            setCurrentHeight(height.smallSize);
        } else if (window.innerWidth <= 1350) {
            setCurrentWidth(width.mediumSize);
            setCurrentHeight(height.mediumSize);
        } else {
            setCurrentWidth(width.standardSize);
            setCurrentHeight(height.standardSize);
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
        <div className='text-input-field-wrapper'>
            <div className='text-input-field-label'>{label}</div>
            <input 
                className='text-input-field-style'
                value={textFieldValue}
                placeholder={textFieldPlaceHolder}
                onChange={onChangeHandler}
                type={type}
                style={{ width: currentWidth, height: currentHeight, backgroundColor: color }}
                maxLength={maxCharacters}
            />
        </div>
    );
}

export default TextInputField;