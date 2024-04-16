import axios from "axios";

const AuthProvider = {
    login: async ( { username, password } ) => {
        return await fetch('http://localhost:8080/api/auth/authenticate', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(({ token }) => {
            localStorage.setItem('token', token);
            return Promise.resolve('/mainPage');
        });
    },
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve('/login');
    },
    checkError: () => {
        
    },
    checkAuth: () => {
        return localStorage.getItem('token') !== undefined;
    },
    getPermissions: () => {

    },
};

export default AuthProvider;