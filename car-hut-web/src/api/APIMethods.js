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
            const response = await fetch('http://localhost:8080/api/carhut/savedCars/addSavedCarByUsername', requestOptions)
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
            const url = `http://localhost:8080/api/carhut/getTempCarWithId?carId=${id}`;
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
            const url = `http://localhost:8080/api/carhut/getCarWithId?carId=${id}`;
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
            const response = await fetch(`http://localhost:8080/api/carhut/getModelsByBrandName?brandName=${brandName}`);
            return await response.json();
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getAllBrands: async () => {
        try {
            const response = await fetch('http://localhost:8080/api/carhut/getAllBrands');
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
            const response = await fetch(`http://localhost:8080/api/carhut/getModelsByBrand/${selectedBrand}`);
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
            const response = await fetch('http://localhost:8080/api/auth/getUserDetailsInfo', requestOptions);
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
            return await fetch('http://localhost:8080/api/auth/resetPasswordSendEmail', requestOptions);
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
            const response = await fetch('http://localhost:8080/api/carhut/savedCars/getSavedCarsByUsername', requestOption)
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
            return await fetch('http://localhost:8080/api/carhut/savedCars/removeSavedCarByUsername', requestOption);
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
            return await fetch('http://localhost:8080/api/auth/resetPasswordInitiate', requestOptions);
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getBodyTypes: async () => {
        try {
            const response = await fetch('http://localhost:8080/api/carhut/getBodyTypes');
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
            const response = await fetch('http://localhost:8080/api/carhut/getGearboxTypes');
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
            const response = await fetch('http://localhost:8080/api/carhut/getFuelTypes');
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
            const response = await fetch('http://localhost:8080/api/carhut/getPowertrainTypes');
            const data = await response.json();
            return data;
        }
        catch (e) {
            console.log(e);
        }
    },
    getColors: async () => {
        try {
            const response = await fetch('http://localhost:8080/api/carhut/getColors');
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
            const response = await fetch('http://localhost:8080/api/carhut/getFeatures');
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
            const response = await fetch('http://localhost:8080/api/carhut/getBrandIdFromBrandName?brand=' + brand);
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
            const response = await fetch('http://localhost:8080/api/carhut/getModelIdFromModelName?model=' + model + '&brandId=' + brandId);
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
            const response = await fetch('http://localhost:8080/api/carhut/getFeatureIdByFeatureName?feature=' + feature);
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
            const response = await fetch('http://localhost:8080/api/carhut/getImages?carId=' + carId);
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
            const response = await fetch('http://localhost:8080/api/carhut/getColorStringNameFromColorId?colorId=' + colorId);
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
            const response = await fetch('http://localhost:8080/api/carhut/getFeatureNameByFeatureId?featureId=' + featureId);
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

        const response = await fetch('http://localhost:8080/api/carhut/getMultipleFeaturesByIds', requestOptions);
        const data = await response.json();
        return data;
    },
}

export default APIMethods;