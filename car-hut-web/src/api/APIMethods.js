const APIMethods = {
    addCarToSavedByUser: async (id, userId, carId) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: -999,
                userId: localStorage.getItem('username'),
                carId: carId
              })
        };

        const response = await fetch('http://localhost:8080/api/carhut/savedCars/addSavedCarByUsername', requestOptions)
                .catch((error) => console.log(error));
        
        return response;
    },
    getTempCarWithId: async (id) => {
        const url = `http://localhost:8080/api/carhut/getTempCarWithId?carId=${id}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    },
    getCarWithId: async (id) => {
        const url = `http://localhost:8080/api/carhut/getCarWithId?carId=${id}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    },
    getModelsByBrandName: async (brandName) => {
        const response = await fetch(`http://localhost:8080/api/carhut/getModelsByBrandName?brandName=${brandName}`);
        return await response.json();
    },
    getAllBrands: async () => {
        const response = await fetch('http://localhost:8080/api/carhut/getAllBrands');
        const data  = await response.json();
        return data;
    },
    getModelsByBrand: async (selectedBrand) => {
        const response = await fetch(`http://localhost:8080/api/carhut/getModelsByBrand/${selectedBrand}`);
        const data  = await response.json();
        return data;
    },
    getCarsWithFilters: async (url, models) => {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(models),
            headers: {
               'Content-Type': 'application/json'
            }
        });

        return await response.json();
    },
    getUserDetailsInfo: async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json' 
            },
            body: localStorage.getItem('username')
        }
        
        const response = await fetch('http://localhost:8080/api/auth/getUserDetailsInfo', requestOptions);
        return await response.json();
    },
    resetPasswordSendEmail: async (email) => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json' 
            },
            body: email
        }

        return await fetch('http://localhost:8080/api/auth/resetPasswordSendEmail', requestOptions);
    },
    getSavedCarsByUsername: async () => {
        const requestOption = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: localStorage.getItem('username')
        };

        const response = await fetch('http://localhost:8080/api/carhut/savedCars/getSavedCarsByUsername', requestOption)
        return await response.json();
    },
    removeSavedCarByUsername: async (carId) => {
        const requestOption = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 'not-specified',
                userId: localStorage.getItem('username'),
                carId: carId
            })
        };

        return await fetch('http://localhost:8080/api/carhut/savedCars/removeSavedCarByUsername', requestOption)
    },
    resetPasswordInitiate: async (resetPasswordToken, newPassword, repeatNewPassword, email) => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'passwordResetToken': resetPasswordToken,
                'newPassword': newPassword,
                'repeatedNewPassword': repeatNewPassword,
                'email': email
            })
        }

        return await fetch('http://localhost:8080/api/auth/resetPasswordInitiate', requestOptions);
    },
    getBodyTypes: async () => {
        const response = await fetch('http://localhost:8080/api/carhut/getBodyTypes');
        const data = await response.json();
        return data;
    },
    getGearboxTypes: async () => {
        const response = await fetch('http://localhost:8080/api/carhut/getGearboxTypes');
        const data = await response.json();
        return data;
    },
    getFuelTypes: async () => {
        const response = await fetch('http://localhost:8080/api/carhut/getFuelTypes');
        const data = await response.json();
        return data;
    },
    getPowertrainTypes: async () => {
        const response = await fetch('http://localhost:8080/api/carhut/getPowertrainTypes');
        const data = await response.json();
        return data;
    },
}

export default APIMethods;