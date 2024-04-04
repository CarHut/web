import axios from "axios";

export default async function updateNumberOfSearchResults(brand, model, carType, priceFrom, priceTo, mileageFrom, mileageTo, registrationFrom, registrationTo, seatingConfig, 
                                                            doors, location, postalCode, fuelType, powerFrom, powerTo, displacementFrom, displacementTo, gearbox, powertrain) {
    console.log('was here');
    const url = `http://localhost:8080/api/getNumberOfTempFilteredCars?brand=${brand}&model=${model}&carType=${carType}&priceFrom=${priceFrom}&priceTo=${priceTo}` +
                `&mileageFrom=${mileageFrom}&mileageTo=${mileageTo}&registrationFrom=${registrationFrom}&registrationTo=${registrationTo}` +
                `&seatingConfig=${seatingConfig}&doors=${doors}&location=${location}&postalCode=${postalCode}&fuelType=${fuelType}&powerFrom=${powerFrom}` +
                `&powerTo=${powerTo}&displacementFrom=${displacementFrom}&displacement=${displacementTo}&gearbox=${gearbox}&powertrain=${powertrain}`;
    
    const response = await axios.get(url);

    return response.data;
} 


