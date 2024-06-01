import '../../css/maincomponents/ComboBox.css';

{/* 
    label - label above combo-box
    width - width of combo-box
    height - height of combo-box
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
function ComboBox({ label, width, height, optionValues, onChangeHandler }) {
    
    const renderOptions = () => {
        const options = [];
        
        optionValues.map((optionValue, idx) => {
            options.push(
                <option id={idx} key={optionValue.key} value={optionValue.value}>{optionValue.textValue}</option>
            );
        });

        return options;
    }

    return (
        <div className='combo-box-entity'>
            <div className='combo-box-label'>{label}</div>
            <div className='combo-box-wrapper' style={{width: width, height: height}}>
                <select className='combo-box' onChange={onChangeHandler}>
                    {renderOptions()}
                </select>
            </div>
        </div>
    )
}

export default ComboBox;