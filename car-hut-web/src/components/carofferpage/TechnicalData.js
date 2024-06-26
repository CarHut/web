import APIMethods from '../../api/APIMethods';
import '../../css/carofferpage/TechnicalData.css';
import { useState, useEffect } from 'react';

function TechnicalData({car}) { 

    const [carModel, setCarModel] = useState(car);
    const [interiorColor, setInteriorColor] = useState("");
    const [exteriorColor, setExteriorColor] = useState("");


    const fetchExteriorColorStringFromColorId = async () => {
        if (car.exteriorColorId !== undefined || car.exteriorColorId !== null) {
            try {
                const color = await APIMethods.getColorStringNameFromColorId(car.exteriorColorId);
                setExteriorColor(color);
            } catch (error) {
                console.log(`[CarOfferPage][TechnicalData][fetchExteriorColorStringFromColorId][ERROR] - Cannot fetch exterior color for id=${car.exteriorColorId}. Stack trace message: ${error}`);
            }
        }
    }

    const fetchInteriorColorStringFromColorId = async () => {
        if (car.interiorColorId !== undefined || car.interiorColorId !== null) {
            try {
                const color = await APIMethods.getColorStringNameFromColorId(car.exteriorColorId);
                setInteriorColor(color);
            } catch (error) {
                console.log(`[CarOfferPage][TechnicalData][fetchInteriorColorStringFromColorId][ERROR] - Cannot fetch interior color for id=${car.interiorColorId}. Stack trace message: ${error}`);
            }
        }
    }

    useEffect(() => {
        if (car.exteriorColorId === undefined) {
            fetchExteriorColorStringFromColorId();
        } else {
            setExteriorColor(car.exteriorColorId);
        }

        if (car.interiorColorId === undefined) {
            fetchInteriorColorStringFromColorId();
        } else {
            setInteriorColor(car.interiorColorId);
        }
    }, []);


    return (
        <div className='technical-data-body'>
            <div className='technical-data-standard-view'>
                <div className='technical-data-headers-wrapper'>
                    <div className='technical-data-header'>Technical data</div>
                    <div className='technical-data-header'>Additional data</div>
                </div>
                <div className='technical-data-line-container'/>
                <div className='technical-data-content-body-wrapper'>
                    <div className='technical-data-content-body-entity-wrapper'>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>Car type</div>
                            <div className='technical-data-content-text-value'>{carModel.bodyType}</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>Mileage</div>
                            <div className='technical-data-content-text-value'>{carModel.mileage}</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>Power</div>
                            <div className='technical-data-content-text-value'>{carModel.enginePower}</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>Displacement</div>
                            <div className='technical-data-content-text-value'>{carModel.engineDisplacement}</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>Powertrain</div>
                            <div className='technical-data-content-text-value'>{carModel.powertrain}</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>Fuel</div>
                            <div className='technical-data-content-text-value'>{carModel.fuel}</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>Fuel Cons.</div>
                            <div className='technical-data-content-text-value'>comb. {carModel.fuelConsumptionAvg}</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'></div>
                            <div className='technical-data-content-text-value'>city {carModel.fuelConsumptionCity}</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'></div>
                            <div className='technical-data-content-text-value'>high. {carModel.fuelConsumptionHighway}</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>Energy eff. class</div>
                            <div className='technical-data-content-text-value'>{carModel.energyEffClass}</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>Seats</div>
                            <div className='technical-data-content-text-value'>{carModel.seats}</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>Doors</div>
                            <div className='technical-data-content-text-value'>{carModel.doors}</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>Emission class</div>
                            <div className='technical-data-content-text-value'>{carModel.emissionClass}</div>    
                        </div>
                    </div>
                    <div className='technical-data-line-container-vertical'/>
                    <div className='technical-data-content-body-entity-wrapper'>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>Exterior color</div>
                            <div className='technical-data-content-text-value'>{exteriorColor}</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>Interior color</div>
                            <div className='technical-data-content-text-value'>{interiorColor}</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>Damage status</div>
                            <div className='technical-data-content-text-value'>{carModel.damageStatus === "false" ? "No" : "Yes"}</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>Parking sensors</div>
                            <div className='technical-data-content-text-value'>{carModel.parkingSensors ? "Yes" : "No"}</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>Parking cameras</div>
                            <div className='technical-data-content-text-value'>{carModel.parkingCameras ? "Yes" : "No"}</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>Availability</div>
                            <div className='technical-data-content-text-value'>Immidiatelly</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>Country of origin</div>
                            <div className='technical-data-content-text-value'>{carModel.countryOfOrigin}</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>STK</div>
                            <div className='technical-data-content-text-value'>{new Date(carModel.technicalInspectionDate).toLocaleDateString()}</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>EK</div>
                            <div className='technical-data-content-text-value'>{new Date(carModel.emissionInspectionDate).toLocaleDateString()}</div>    
                        </div>
                        <div className='technical-data-body-line'>
                            <div className='technical-data-content-text'>Date added</div>
                            <div className='technical-data-content-text-value'>{new Date(carModel.dateAdded).toLocaleDateString()}</div>    
                        </div>
                    </div>
                </div>
            </div>
            <div className='technical-data-mobile-view'>
                <div className='technical-data-content-body-entity-wrapper'>
                    <div className='technical-data-header'>Technical data</div>    
                    <div className='technical-data-line-container'/>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Car type</div>
                        <div className='technical-data-content-text-value'>{carModel.bodyType}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Mileage</div>
                        <div className='technical-data-content-text-value'>{carModel.mileage}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Power</div>
                        <div className='technical-data-content-text-value'>{carModel.enginePower}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Displacement</div>
                        <div className='technical-data-content-text-value'>{carModel.engineDisplacement}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Powertrain</div>
                        <div className='technical-data-content-text-value'>{carModel.powertrain}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Fuel</div>
                        <div className='technical-data-content-text-value'>{carModel.fuel}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Fuel Cons.</div>
                        <div className='technical-data-content-text-value'>comb. {carModel.fuelConsumptionAvg}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'></div>
                        <div className='technical-data-content-text-value'>city {carModel.fuelConsumptionCity}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'></div>
                        <div className='technical-data-content-text-value'>high. {carModel.fuelConsumptionHighway}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Energy eff. class</div>
                        <div className='technical-data-content-text-value'>{carModel.energyEffClass}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Seats</div>
                        <div className='technical-data-content-text-value'>{carModel.seats}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Doors</div>
                        <div className='technical-data-content-text-value'>{carModel.doors}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Emission class</div>
                        <div className='technical-data-content-text-value'>{carModel.emissionClass}</div>    
                    </div>
                </div>
                <div className='technical-data-content-body-entity-wrapper'>     
                    <div className='technical-data-header'>Additional data</div>                            
                    <div className='technical-data-line-container'/>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Exterior color</div>
                        <div className='technical-data-content-text-value'>{exteriorColor}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Interior color</div>
                        <div className='technical-data-content-text-value'>{interiorColor}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Damage status</div>
                        <div className='technical-data-content-text-value'>{carModel.damageStatus === "false" ? "No" : "Yes"}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Parking sensors</div>
                        <div className='technical-data-content-text-value'>{carModel.parkingSensors ? "Yes" : "No"}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Parking cameras</div>
                        <div className='technical-data-content-text-value'>{carModel.parkingCameras ? "Yes" : "No"}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Availability</div>
                        <div className='technical-data-content-text-value'>Immidiatelly</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>Country of origin</div>
                        <div className='technical-data-content-text-value'>{carModel.countryOfOrigin}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>STK</div>
                        <div className='technical-data-content-text-value'>{new Date(carModel.technicalInspectionDate).toLocaleDateString()}</div>    
                    </div>
                    <div className='technical-data-body-line'>
                        <div className='technical-data-content-text'>EK</div>
                        <div className='technical-data-content-text-value'>{new Date(carModel.emissionInspectionDate).toLocaleDateString()}</div>    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TechnicalData;