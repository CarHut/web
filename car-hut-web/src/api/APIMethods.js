import Constants from '../constants/Constants.js';

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

        try {
            const response = await fetch(Constants.baseAPIPath + 'carhut/savedCars/addSavedCarByUsername', requestOptions)
                .catch((error) => console.log(error));

            return response;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getTempCarWithId: async (id) => {
        try {
            const url = Constants.baseAPIPath + `carhut/getTempCarWithId?carId=${id}`;
            const response = await fetch(url);
            const data = await response.json();
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getCarWithId: async (id) => {
        try {
            const url = Constants.baseAPIPath + `carhut/getCarWithId?carId=${id}`;
            const response = await fetch(url);
            const data = await response.json();
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getModelsByBrandName: async (brandName) => {
        try {
            const response = await fetch(Constants.baseAPIPath + `carhut/getModelsByBrandName?brandName=${brandName}`);
            return await response.json();
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getAllBrands: async () => {
        try {
            const response = await fetch(Constants.baseAPIPath + 'carhut/getAllBrands');
            const data  = await response.json();
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        } 
    },
    getModelsByBrand: async (selectedBrand) => {
        try {
            const response = await fetch(Constants.baseAPIPath + `carhut/getModelsByBrand/${selectedBrand}`);
            const data  = await response.json();
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getCarsWithFilters: async (url, models) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(models),
                headers: {
                   'Content-Type': 'application/json'
                }
            });
            return await response.json();
        }
        catch (e) {
            console.log(e);
            return null;
        }
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
        
        try {
            const response = await fetch(Constants.baseAPIPath + 'auth/getUserDetailsInfo', requestOptions);
            return await response.json();
        }
        catch (e) {
            console.log(e);
            return null;
        }
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

        try {
            return await fetch(Constants.baseAPIPath + 'auth/resetPasswordSendEmail', requestOptions);
        }
        catch (e) {
            console.log(e);
            return null;
        }
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
        try {
            const response = await fetch(Constants.baseAPIPath + 'carhut/savedCars/getSavedCarsByUsername', requestOption)
            return await response.json();
        }
        catch (e) {
            console.log(e);
            return null;
        }
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

        try {
            return await fetch(Constants.baseAPIPath + 'carhut/savedCars/removeSavedCarByUsername', requestOption);
        }
        catch (e) {
            console.log(e);
            return null;
        }
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

        try {
            return await fetch(Constants.baseAPIPath + 'auth/resetPasswordInitiate', requestOptions);
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getBodyTypes: async () => {
        try {
            const response = await fetch(Constants.baseAPIPath + 'carhut/getBodyTypes');
            const data = await response.json();
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getGearboxTypes: async () => {
        try {
            const response = await fetch(Constants.baseAPIPath + 'carhut/getGearboxTypes');
            const data = await response.json();
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getFuelTypes: async () => {
        try {
            const response = await fetch(Constants.baseAPIPath + 'carhut/getFuelTypes');
            const data = await response.json();
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getPowertrainTypes: async () => {
        try {
            const response = await fetch(Constants.baseAPIPath + 'carhut/getPowertrainTypes');
            const data = await response.json();
            return data;
        }
        catch (e) {
            console.log(e);
        }
    },
    getColors: async () => {
        try {
            const response = await fetch(Constants.baseAPIPath + 'carhut/getColors');
            const data = await response.json();
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getFeatures: async () => {
        try {
            const response = await fetch(Constants.baseAPIPath + 'carhut/getFeatures');
            const data = await response.json();
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getBrandIdFromBrandName: async (brand) => {
        try {
            const response = await fetch(Constants.baseAPIPath + 'carhut/getBrandIdFromBrandName?brand=' + brand);
            const data = await response.json();
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getModelIdByModelName: async (model, brandId) => {
        try {
            const response = await fetch(Constants.baseAPIPath + 'carhut/getModelIdFromModelName?model=' + model + '&brandId=' + brandId);
            const data = await response.json();
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getFeatureIdByFeatureName: async (feature) => {
        try {
            const response = await fetch(Constants.baseAPIPath + 'carhut/getFeatureIdByFeatureName?feature=' + feature);
            const data = await response.json();
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getImages: async (carId) => {
        try {
            const response = await fetch(Constants.baseAPIPath + 'carhut/getImages?carId=' + carId);
            const data = await response.json();
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getColorStringNameFromColorId: async (colorId) => {
        try {
            const response = await fetch(Constants.baseAPIPath + 'carhut/getColorStringNameFromColorId?colorId=' + colorId);
            const data = await response.text();
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getFeatureNameByFeatureId: async (featureId) => {
        try {
            const response = await fetch(Constants.baseAPIPath + 'carhut/getFeatureNameByFeatureId?featureId=' + featureId);
            const data = await response.json();
            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getMultipleFeaturesByIds: async (featureIds) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(featureIds) 
        }

        const response = await fetch(Constants.baseAPIPath + 'carhut/getMultipleFeaturesByIds', requestOptions);
        const data = await response.json();
        return data;
    },
    uploadImage: async (imageData) => {
        const response = await fetch(Constants.baseAPIPath + 'carhut/uploadImage', {
            method: 'POST',
            body: imageData,
        });

        return response;
    },
    addCarToDatabase: async (requestOptions) => {
        const response =  await fetch(Constants.baseAPIPath + 'carhut/addCarToDatabase', requestOptions);
        return response;
    },
    getNumberOfFilteredCars: async (url, models) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(models)
        }

        const response = await fetch(Constants.baseAPIPath + "carhut/getNumberOfFilteredCars?" + url, requestOptions);
        return await response.json();
    },
    registerInitiate: async (registrationBody) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationBody)
        }

        const response = await fetch(Constants.baseAPIPath + "register/registerInitiate", requestOptions);
        return response;
    },
    verifyAccount: async (token) => {
        const response = await fetch(Constants.baseAPIPath + `register/verifyAccount?token=${token}`);
        return response;
    },
    getUsernameByUserId: async (userId) => {
        const response = await fetch(Constants.baseAPIPath + `carhut/getUsernameByUserId?userId=${userId}`);
        return await response.text();
    },
    getFirstNameAndSurnameByUserId: async (userId) => {
        const response = await fetch(Constants.baseAPIPath + `carhut/getFirstNameAndSurnameByUserId?userId=${userId}`);
        return await response.text();
    },
    getOffersNumByUserId: async (userId) => {
        const response = await fetch(Constants.baseAPIPath + `carhut/getOffersNumByUserId?userId=${userId}`);
        return await response.text();
    },
    getEmailByUserId: async (userId) => {
        const response = await fetch(Constants.baseAPIPath + `carhut/getEmailByUserId?userId=${userId}`);
        return await response.text(); 
    },
    getMyListings: async () => {
        const requestOption = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch(Constants.baseAPIPath + `carhut/getMyListings?username=${localStorage.getItem('username')}`, requestOption);
        return await response.json(); 
    },
    removeOffer: async (carId) => {
        const requestOption = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch(Constants.baseAPIPath + `carhut/removeOffer?carId=${carId}`, requestOption);
        return await response.text(); 
    },
    addNewSavedSearch: async (savedSearchEntity) => {
        const requestOption = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(savedSearchEntity)
        };

        const response = await fetch(Constants.baseAPIPath + `carhut/savedSearches/addNewSavedSearch`, requestOption);
        return await response.text(); 
    },
    getSavedSearchesByUsername: async (username) => {
        const requestOption = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch(Constants.baseAPIPath + `carhut/savedSearches/getSavedSearchesByUsername?username=${username}`, requestOption);
        return await response.json(); 
    },
    getUserIdByUsername: async (username) => {
        const requestOption = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch(Constants.baseAPIPath + `carhut/getUserIdByUsername?username=${username}`, requestOption);
        return await response.text(); 
    }
}

export default APIMethods;