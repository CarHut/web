import Constants from '../constants/Constants.js';

const APIMethods = {
    getOffersForMinMaxPoint: async (minmaxVal, minmaxValType, offersFilterModel, offersPerPage, currentPage) => {
        const response = await fetch(Constants.proxyBasePath + `/carhut-api/get-offers-for-minmax-point?minmax-val=${minmaxVal}&minmax-val-type=${minmaxValType}&offers-per-page=${offersPerPage}&current-page=${currentPage}`, {
            method: 'POST',
            body: JSON.stringify(offersFilterModel),
            headers: {
               'Content-Type': 'application/json'
            }
        });
        return await response.json();
    },
    getOffersForMedianPoint: async (medianVal, offersFilterModel, offersPerPage, currentPage) => {
        const response = await fetch(Constants.proxyBasePath + `/carhut-api/get-offers-for-median-point?median-val=${medianVal}&offers-per-page=${offersPerPage}&current-page=${currentPage}`, {
            method: 'POST',
            body: JSON.stringify(offersFilterModel),
            headers: {
               'Content-Type': 'application/json'
            }
        });
        return await response.json();
    },
    getImageByOfferId: async (offerId) => {
        const response = await fetch(Constants.proxyBasePath + `/image-service/get-image-by-offer-id?offer-id=${offerId}`);
        return await response.json();
    },
    getPriceComparisonData: async (filters, showMedian = false, showPriceRange = false, showPriceDistribution = false) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filters)
        };
        const response = await fetch(Constants.proxyBasePath + `/carhut-api/get-price-comparison-data?show-median=${showMedian}&show-price-range=${showPriceRange}&show-price-distribution=${showPriceDistribution}`, requestOptions);
        return response;
    },
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

        const response = await fetch(Constants.baseAPIPath + 'carhut/savedCars/addSavedCarByUsername', requestOptions);
        return response;

    },
    getTempCarWithId: async (id) => {
        const url = Constants.baseAPIPath + `carhut/getTempCarWithId?carId=${id}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    },
    getCarWithId: async (id) => {
        const url = Constants.baseAPIPath + `carhut/getCarWithId?carId=${id}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    },
    getModelsByBrandName: async (brandName) => {
        const response = await fetch(Constants.proxyBasePath + `/carhut-api/get-models-by-brand-name?brand-name=${brandName}`);
        return await response.json();
    },
    getAllBrands: async () => {
        const response = await fetch(Constants.proxyBasePath + '/carhut-api/get-all-brands');
        const data  = await response.json();
        return data;
    },
    getModelsByBrandId: async (brandId) => {
        const response = await fetch(Constants.proxyBasePath + `/carhut-api/get-models-by-brand-id?brand-id=${brandId}`);
        const data  = await response.json();
        return data;
    },
    getOffersWithFilters: async (offersFilterModel, sortBy, sortOrder, offersPerPage, currentPage) => {
        const response = await fetch(Constants.proxyBasePath + `/carhut-api/get-offers-with-filters?sort-by=${sortBy}&sort-order=${sortOrder}&offers-per-page=${offersPerPage}&current-page=${currentPage}`, {
            method: 'POST',
            body: JSON.stringify(offersFilterModel),
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
            body: JSON.stringify({
                authenticationPrincipal: {
                    username: localStorage.getItem('username')
                },
                dto: {
                    username: localStorage.getItem('username')
                }
            }) 
        }
        const response = await fetch(Constants.baseAPIPath + 'auth/getUserDetailsInfo', requestOptions);
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

        return await fetch(Constants.baseAPIPath + 'auth/resetPasswordSendEmail', requestOptions);

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
        
        const response = await fetch(Constants.baseAPIPath + 'carhut/savedCars/getSavedCarsByUsername', requestOption)
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

        return await fetch(Constants.baseAPIPath + 'carhut/savedCars/removeSavedCarByUsername', requestOption);
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

        return await fetch(Constants.baseAPIPath + 'auth/resetPasswordInitiate', requestOptions);
    },
    getBodyTypes: async () => {
        const response = await fetch(Constants.baseAPIPath + 'carhut/getBodyTypes');
        const data = await response.json();
        return data;
    },
    getGearboxTypes: async () => {
        const response = await fetch(Constants.baseAPIPath + 'carhut/getGearboxTypes');
        const data = await response.json();
        return data;
    },
    getFuelTypes: async () => {
        const response = await fetch(Constants.proxyBasePath + '/carhut-api/get-fuel-types');
        const data = await response.json();
        return data;
    },
    getPowertrainTypes: async () => {
        const response = await fetch(Constants.baseAPIPath + 'carhut/getPowertrainTypes');
        const data = await response.json();
        return data;
    },
    getColors: async () => {
        const response = await fetch(Constants.baseAPIPath + 'carhut/getColors');
        const data = await response.json();
        return data;
    },
    getFeatures: async () => {
        const response = await fetch(Constants.baseAPIPath + 'carhut/getFeatures');
        const data = await response.json();
        return data;
    },
    getBrandIdFromBrandName: async (brand) => {
        const response = await fetch(Constants.proxyBasePath + `/carhut-api/get-brand-id-from-brand-name?brand=${brand}`);
        const data = await response.json();
        return data;
    },
    getModelIdByModelName: async (model, brandId) => {
        const response = await fetch(Constants.proxyBasePath + `/carhut-api/get-model-id-from-model-name?model=${model}&brand-id=${brandId}`);
        const data = await response.json();
        return data;
    },
    getFeatureIdByFeatureName: async (feature) => {
        const response = await fetch(Constants.baseAPIPath + 'carhut/getFeatureIdByFeatureName?feature=' + feature);
        const data = await response.json();
        return data;
    },
    getImages: async (carId) => {
        const response = await fetch(Constants.baseAPIPath + 'carhut/getImages?carId=' + carId);
        const data = await response.json();
        return data;
    },
    getColorStringNameFromColorId: async (colorId) => {
        const response = await fetch(Constants.baseAPIPath + 'carhut/getColorStringNameFromColorId?colorId=' + colorId);
        const data = await response.text();
        return data;
    },
    getFeatureNameByFeatureId: async (featureId) => {
        const response = await fetch(Constants.baseAPIPath + 'carhut/getFeatureNameByFeatureId?featureId=' + featureId);
        const data = await response.json();
        return data;
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
    getNumberOfFilteredCars: async (carHutFilterObject) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carHutFilterObject)
        }
        const response = await fetch(Constants.proxyBasePath + "/carhut-api/get-number-of-filtered-offers", requestOptions);
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
        const dummy = await response.text();
        return dummy;
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
        return response; 
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
    },
    removeSavedSearch: async (id) => {
        const requestOption = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch(Constants.baseAPIPath + `carhut/savedSearches/removeSavedSearch?savedSearchId=${id}`, requestOption);
        return response.text();
    },
    getSellerRating: async (sellerId) => {
        const response = await fetch(Constants.baseAPIPath + `rating/getSellerRating?sellerId=${sellerId}`);
        return await response.json();
    },
    giveSellerRating: async (userId, sellerId, rating) => {
        
        const requestOptions = {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sellerId: sellerId,
                userId: userId,
                rating: rating
            })
        }

        const response = await fetch(Constants.baseAPIPath + `rating/giveSellerRating`, requestOptions);
        return response;
    }
}

export default APIMethods;