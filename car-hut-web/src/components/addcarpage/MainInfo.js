import { Link } from 'react-router-dom';
import APIMethods from '../../api/APIMethods';
import '../../css/addcarpage/MainInfo.css';
import { useState, useEffect } from 'react';


function MainInfo() {

    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('Not picked');
    const [selectedModel, setSelectedModel] = useState('Not picked');
    const [reactCarModel, setReactCarModel] = useState({});
    const [header, setHeader] = useState('Not set');
    const [mileage, setMileage] = useState('Not set');
    const [registration, setRegistration] = useState('Not set');
    const [price, setPrice] = useState('Not stated');
    const [sellerAddress, setSellerAddress] = useState('Not stated');

    useEffect(() => {
        fetchBrands();
    }, []);

    useEffect(() => {
        fetchModels(selectedBrand);
    }, [selectedBrand]);

    const fetchBrands = async () => {
        const data = await APIMethods.getAllBrands();
        console.log(data);
        setBrands(data);
    }

    const fetchModels = async (selectedBrand) => {
        const data = await APIMethods.getModelsByBrandName(selectedBrand);
        setModels(data);
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

    return (
        <div className='add-car-main-info-section'>
            <div className='add-car-main-info-header'>Let's start with basic data of your car</div>
            <div className="line-container"/>
            <div className='add-car-main-info-row-wrapper'>
                <div className='add-car-main-info-column-wrapper'>
                    <div className='add-car-main-info-row-wrapper'>
                        <div className='add-car-main-info-combobox-entity'>
                            <div className='label'>Brand*</div>
                            <div className="add-car-main-info-custom-combobox">
                                <select id="brandComboBox" className='add-car-main-info-myComboBox' value={selectedBrand} onChange={(e) => handleSelectedBrand(e.target.value)}>
                                    <option value="all" disabled>Select Brand</option>
                                    {brands.map(brand => (
                                        <option key={brand.id} value={brand.brand}>{brand.brand}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='add-car-main-info-combobox-entity'>
                            <div className='label'>Model*</div>
                            <div className="add-car-main-info-custom-combobox">
                                <select id="modelComboBox" className={`add-car-main-info-myComboBox ${!selectedBrand ? 'disabled' : ''}`} value={selectedModel} onChange={(e) => handleSelectedModel(e.target.value)} disabled={!selectedBrand}>
                                    <option value="all" disabled={!selectedBrand}>Select Model</option>
                                    {models.map(model => (
                                        <option key={model.id} value={model.model}>{model.model}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='add-car-main-info-row-wrapper'>
                        <div className='add-car-form'>
                            <div className='add-car-main-info-regular-text'>Do you want custom header? Here you go!</div>
                            <input className='add-car-main-info-text-input' maxLength='50' type='text' placeholder='max. 50 characters' onChange={(e) => handleWrittenHeadline(e.target.value)}/>
                        </div>
                    </div>
                    <div className='add-car-main-info-row-wrapper'>
                        <div className="registration-slider-container">
                            <div className='add-car-label' htmlFor="price" style={{"display": "flex", "alignItems": "center"}}>Price*: <input className='add-car-main-info-text-input' style={{"margin": "0 1em"}} maxLength='7' type='text' placeholder='' value={price} onChange={(e) => handlePriceChange(e.target.value)} pattern='[0-9]'/> €</div>
                            <input
                                type="range"
                                id="price"
                                name="price"
                                min="0"
                                max="999999"
                                step="5"
                                value={price}
                                onChange={(e) => handlePriceChange(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='add-car-main-info-row-wrapper'>
                        <div className="registration-slider-container">
                            <div className='add-car-label' htmlFor="mileage" style={{"display": "flex", "alignItems": "center"}}>Mileage*: <input className='add-car-main-info-text-input' style={{"margin": "0 1em"}} maxLength='7' type='text' placeholder='' value={mileage} onChange={(e) => handleMileageChange(e.target.value)} pattern='[0-9]'/> km</div>
                            <input
                                type="range"
                                id="mileage"
                                name="mileage"
                                min="0"
                                max="1000000"
                                step="1"
                                value={mileage}
                                onChange={(e) => handleMileageChange(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='add-car-main-info-row-wrapper'>
                        <div className="registration-slider-container">
                            <div className='add-car-label' htmlFor="registration" style={{"display": "flex", "alignItems": "center"}}>Registration*: <input className='add-car-main-info-text-input' style={{"margin": "0 1em"}} maxLength='4' type='text' placeholder='' value={registration} pattern='[0-9]' onChange={(e) => handleRegistrationChange(e.target.value)}/></div>
                            <input
                                type="range"
                                id="fromRegistration"
                                name="fromRegistration"
                                min="1900"
                                max="2024"
                                step="1"
                                value={registration}
                                onChange={(e) => handleRegistrationChange(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='add-car-label' htmlFor="address">Address*</div>
                    <input className='add-car-main-info-text-input' maxLength={512} type='text' placeholder='' value={sellerAddress} pattern='[0-9]' onChange={(e) => handleSellerAddressChange(e.target.value)}/>                
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
            <Link
                className='add-car-styled-button'
                style={{"textDecoration": "none"}}
                state={{
                    brandId: selectedBrand,
                    modelId: selectedModel,
                    header: header,
                    mileage: mileage,
                    registration: registration,
                    price: price,
                    sellerAddress: sellerAddress
                }}
                to={'/addCar/engineInfo'}
            >
                Next
            </Link>
        </div>
    )
}

export default MainInfo;