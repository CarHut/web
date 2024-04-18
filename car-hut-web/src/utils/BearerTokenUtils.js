const BearerTokenUtils = {
    isTokenPresent: () => {
        return localStorage.getItem('token') !== null;
    },
};

export default BearerTokenUtils;