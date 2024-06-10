import { Link } from 'react-router-dom';
import APIMethods from '../../api/APIMethods';
import '../../css/addcarpage/MainInfo.css';
import { useState, useEffect } from 'react';
import ComboBox from '../maincomponents/ComboBox';
import RangeSlider from '../maincomponents/RangeSlider';
import TextInputField from '../maincomponents/TextInputField';
import RegularButton from '../maincomponents/RegularButton';
import { validQueryParams } from 'react-admin';
import StateUtil from '../../utils/StateUtil';


function MainInfo() {

    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('Not picked');
    const [selectedModel, setSelectedModel] = useState('Not picked');
    const [header, setHeader] = useState('Not set');
    const [mileage, setMileage] = useState('Not set');
    const [registration, setRegistration] = useState('Not set');
    const [price, setPrice] = useState('Not stated');
    const [sellerAddress, setSellerAddress] = useState('Not stated');

    const comboBoxSizingWidth = {
        standardSize: "10vw",
        mediumSize:   "20vw",
        smallSize:    "40vw"
    };

    const comboBoxSizingHeight = {
        standardSize: "2vw",
        mediumSize:   "4vw",
        smallSize:    "7vw"
    }

    const rangeSliderSizingWidth = {
        standardSize: "20vw",
        mediumSize:   "30vw",
        smallSize:    "80vw"
    };

    const textInputFieldSizingWidth = {
        standardSize: "20vw",
        mediumSize:   "30vw",
        smallSize:    "70vw"
    };

    const textInputFieldSizingHeight = {
        standardSize: "2vw",
        mediumSize:   "4vw",
        smallSize:    "6vw"
    }

    const buttonSizingWidth = {
        standardSize: '6vw',
        mediumSize: '10vw',
        smallSize: '15vw'
    }
    
    const buttonSizingHeight = {
        standardSize: '3vw',
        mediumSize: '5vw',
        smallSize: '6vw'
    }

    useEffect(() => {
        fetchBrands();
    }, []);

    useEffect(() => {
        fetchModels(selectedBrand);
    }, [selectedBrand]);

    const fetchBrands = async () => {
        try {
            const data = await APIMethods.getAllBrands();
            setBrands(data);
        } catch (error) {
            console.log(`[AddCarPage][MainInfo][fetchBrands][ERROR] - Cannot fetch brands. Stack trace message: ${error}`);
        }
    }

    const fetchModels = async (selectedBrand) => {
        try {
            const data = await APIMethods.getModelsByBrandName(selectedBrand);
            setModels(data);
        } catch (error) {
            console.log(`[AddCarPage][MainInfo][fetchModels][ERROR] - Cannot fetch models for brand=${selectedBrand}. Stack trace message ${error}`);
        }
    }

    const handleSelectedBrand = (brand) => {
        setSelectedBrand(brand);
    }

    const handleSelectedModel = (model) => {
        setSelectedModel(model);
    }

    const handleWrittenHeadline = (text) => {
        setHeader(text);
    }

    const handleRegistrationChange = (e) => {
        // Handling backspace
        if (e.length < registration.length) {
            setRegistration(e);
            return;
        }

        // Handling numbers input
        if (e.charCodeAt(e.length - 1) > 47 && e.charCodeAt(e.length - 1) < 58) {
            setRegistration(e);
        }

        if (!isNaN(parseInt(e)) && e.length === 4) {
            if (parseInt(e) > 2024) {
                setRegistration('2024');
            }
            if (parseInt(e) < 1900) {
                setRegistration('1900');
            }
        }
    }

    const handleMileageChange = (e) => {
        // Handling backspace
        if (e.length < mileage.length) {
            setMileage(e);
        }

        // Handling numbers input
        if (e.charCodeAt(e.length - 1) > 47 && e.charCodeAt(e.length - 1) < 58) {
            setMileage(e);
        }

    }

    const handlePriceChange = (e) => {
        // Handling backspace
        if (e.length < price.length) {
            setPrice(e);
        }

        // Handling numbers input
        if (e.charCodeAt(e.length - 1) > 47 && e.charCodeAt(e.length - 1) < 58) {
            setPrice(e);
        }
    }

    const handleSellerAddressChange = (e) => {
        setSellerAddress(e);
    }

    const renderBrands = () => {
        const options = [];
        options.push(new Object({ key: '-1', value: '', textValue: 'Select brand'}));
        brands.map((brand) => options.push(new Object({ key: brand.id, value: brand.brand, textValue: brand.brand })));

        return (
            <ComboBox label={'Select brand'} width={comboBoxSizingWidth} height={comboBoxSizingHeight} 
                optionValues={options} 
                onChangeHandler={(e) => handleSelectedBrand(e.target.value)}
            />
        );
    }

    const renderModels = () => {
        const options = [];
        options.push(new Object({ key: '-1', value: '', textValue: 'Select model'}));
        models.map((model) => options.push( new Object({ key: model.id, value: model.model, textValue: model.model})));
        
        return (
            <ComboBox label={'Selected model'} width={comboBoxSizingWidth} height={comboBoxSizingHeight}
                optionValues={options}
                onChangeHandler={(e) => handleSelectedModel(e.target.value)}
            />
        );
    }

    const renderHeaderInput = () => {
        return (
            <div className='add-car-form'>
                <div className='add-car-main-info-regular-text'>Do you want custom header? Type in!</div>
                <TextInputField 
                    type={'text'} 
                    textFieldPlaceHolder={'max. 50 characters'}
                    onChangeHandler={(e) => handleWrittenHeadline(e.target.value)}
                    width={textInputFieldSizingWidth}
                    height={textInputFieldSizingHeight}
                    maxCharacters={50}
                    color={"#313131"}
                />
            </div>
        )
    }

    const renderPriceSlider = () => {
        return (
            <RangeSlider 
                sliderLabel={`Price: ${price} €`} 
                sliderWidth={rangeSliderSizingWidth} 
                changingValue={price}
                minValue={'0'}
                maxValue={'999999'}
                step={'5'}
                onChangeHandler={(e) => handlePriceChange(e.target.value)}
            />
        );
    }

    const renderMileageSlider = () => {
        return (
            <RangeSlider 
                sliderLabel={`Mileage: ${mileage} km`} 
                sliderWidth={rangeSliderSizingWidth} 
                changingValue={mileage}
                minValue={'0'}
                maxValue={'1000000'}
                step={'1'}
                onChangeHandler={(e) => handleMileageChange(e.target.value)}
            />
        );
    }

    const renderRegistrationSlider = () => {
        return (
            <RangeSlider 
                sliderLabel={`Registration: ${registration}`} 
                sliderWidth={rangeSliderSizingWidth} 
                changingValue={registration}
                minValue={'1900'}
                maxValue={'2024'}
                step={'1'}
                onChangeHandler={(e) => handleRegistrationChange(e.target.value)}
            />
        );
    }

    const renderAddressSection = () => {
        return (
            <>
                <div className='add-car-label' htmlFor="address">Address*</div>
                <TextInputField 
                    type={'text'}
                    onChangeHandler={(e) => handleSellerAddressChange(e.target.value)}
                    width={textInputFieldSizingWidth}
                    height={textInputFieldSizingHeight}
                    maxCharacters={512}
                    color={"#313131"}
                />
            </>
        )
    }

    const renderNextButton = () => {
        const state = {
            brandId: selectedBrand,
            modelId: selectedModel,
            header: header,
            mileage: mileage,
            registration: registration,
            price: price,
            sellerAddress: sellerAddress
        };

        return (
            <Link
                style={{"textDecoration": "none"}}
                to={`/addCar/engineInfo`}
                state={state}
            >
                <RegularButton
                    label={'Next'}
                    buttonWidth={buttonSizingWidth}
                    buttonHeight={buttonSizingHeight}
                />
            </Link>
        );
    }

    return (
        <div className='add-car-main-info-section'>
            <div className='add-car-main-info-header'>Let's start with basic data of your car</div>
            <div className="add-car-line-container"/>
            <div className='add-car-main-info-row-wrapper'>
                <div className='add-car-main-info-column-wrapper'>
                    {renderBrands()}
                    {renderModels()}
                    <div className='add-car-main-info-row-wrapper'>
                        {renderHeaderInput()}
                    </div>
                    <div className='add-car-main-info-row-wrapper'>
                        {renderPriceSlider()}
                    </div>
                    <div className='add-car-main-info-row-wrapper'>
                        {renderMileageSlider()}
                    </div>
                    <div className='add-car-main-info-row-wrapper'>
                        {renderRegistrationSlider()}
                    </div>
                    {renderAddressSection()}
                </div>
                <div className='add-car-main-info-content-wrapper'>
                    <div className='add-car-main-info-column-wrapper'>
                        <div className='add-car-main-info-small-text-darker'>*Brand</div>
                        <div className='add-car-main-info-small-text-darker'>*Model</div>
                        <div className='add-car-main-info-small-text-darker'>Headline</div>
                        <div className='add-car-main-info-small-text-darker'>*Mileage</div>
                        <div className='add-car-main-info-small-text-darker'>*Registration</div>
                        <div className='add-car-main-info-small-text-darker'>*Price</div>
                        <div className='add-car-main-info-small-text-darker'>*Address</div>
                    </div>
                    <div className='add-car-main-info-column-wrapper'>
                        <div className='add-car-main-info-small-text'>{selectedBrand}</div>
                        <div className='add-car-main-info-small-text'>{selectedModel}</div>
                        <div className='add-car-main-info-small-text'>{header}</div>
                        <div className='add-car-main-info-small-text'>{mileage} km</div>
                        <div className='add-car-main-info-small-text'>{registration}</div>
                        <div className='add-car-main-info-small-text'>{price} €</div>
                        <div className='add-car-main-info-small-text'>{sellerAddress}</div>
                    </div>        
                </div>
            </div>
            <div className='add-car-main-info-small-text-darker'>* necessary to fill</div>
            {renderNextButton()}
        </div>
    )
}

export default MainInfo;