import { useEffect, useState } from 'react';
import '../../css/maincomponents/ComboBox.css';

function ComboBox({ label, fontSize, width, height, optionValues, selectedValue, onChangeHandler }) {

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

    return (
        <div className='combo-box-entity'>
            <div className='combo-box-label' style={{ fontSize: fontSize }}>{label}</div>
            <div className='combo-box-wrapper' style={{ width: width, height: height }}>
                <select className='combo-box' style={{ fontSize: fontSize }} onChange={onChangeHandler}>
                    {renderOptions()}
                </select>
            </div>
        </div>
    )
}

export default ComboBox;