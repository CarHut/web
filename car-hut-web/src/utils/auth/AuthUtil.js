const AuthUtil = {
    login: async (username, password) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/authenticate', requestOptions);
            if (response.status !== 200) {
                return false;
            }
            
            const token = (await response.text()).valueOf();
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            return true;
        }
        catch(error) {
            console.log(error);
            return false;
        }
        
    },
    logout: () => {
        localStorage.removeItem('token');
    },
    checkAuth: (...params) => {
        return Promise.resolve();
    },
    getPermissions: () => {
        return Promise.resolve();
    }
};

export default AuthUtil;