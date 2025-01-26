import { useEffect, useState } from 'react';
import '../../css/maincomponents/ComboBox.css';

{/* 
    label - label above combo-box
    width - width of combo-box - BE AWARE! You must put in 3 values that will reflect 3 different stages of window width
    height - height of combo-box - BE AWARE! You must put in 3 values that will reflect 3 different stages of window width
        format: {
            standardSize: {normal size},
            mediumSize: {max-width: 1350px},
            smallSize: {max-width: 600px} 
        }
    optionValues - format: 
    [
        {
            key: KEY,
            value: VALUE,
            textValue: TEXT_VALUE
        },
        ...
    ]
    onChangeHandler - format: (e) => your-handler-function-here(params...)

*/}
function ComboBox({ label, width, height, optionValues, selectedValue, onChangeHandler }) {
    
    const [currentWidth, setCurrentWidth] = useState(0);
    const [currentHeight, setCurrentHeight] = useState(0);

    const renderOptions = () => {
        const options = [];

        optionValues.map((optionValue, idx) => {
            if (optionValue.value == selectedValue) {
                options.push(
                    <option id={optionValue.key} key={optionValue.key} value={optionValue.value} selected={true}>{optionValue.textValue}</option>
                );
            } else {
                options.push(
                    <option id={optionValue.key} key={optionValue.key} value={optionValue.value}>{optionValue.textValue}</option>
                );
            }
        });

        return options;
    }

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
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='combo-box-entity'>
            <div className='combo-box-label'>{label}</div>
            <div className='combo-box-wrapper' style={{ width: currentWidth, height: currentHeight}}>
                <select className='combo-box' onChange={onChangeHandler}>
                    {renderOptions()}
                </select>
            </div>
        </div>
    )
}

export default ComboBox;