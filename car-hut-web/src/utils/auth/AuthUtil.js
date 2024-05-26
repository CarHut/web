import Constants from '../../constants/Constants.js';
import SocketAPI from '../../messaging/SocketAPI.js';

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
            const response = await fetch(Constants.baseAPIPath + 'auth/authenticate', requestOptions);
            if (response.status !== 200) {
                return false;
            }
            
            const token = (await response.text()).valueOf();
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            const socket = SocketAPI.connectToSocket(username);
            localStorage.setItem('socket', socket);
            const messages = await SocketAPI.fetchChats(username);
            localStorage.setItem('chats', JSON.stringify(messages));
            window.dispatchEvent(new Event("storage"));
            return true;
        }
        catch(error) {
            console.log(error);
            return false;
        }
        
    },
    logout: async () => {
        const response = await fetch(Constants.baseAddressPath + 'logout')
                        .catch((error) => console.log(error));

        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('socket');
    },
    checkAuth: (...params) => {
        return Promise.resolve();
    },
    getPermissions: () => {
        return Promise.resolve();
    }
};

export default AuthUtil;