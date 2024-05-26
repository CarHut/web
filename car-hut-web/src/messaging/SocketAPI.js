import Constants from "../constants/Constants";

const SocketAPI = {
    connectToSocket: (username) => {
        const socket = new WebSocket(Constants.socketAddress + `?username=${username}`);
        socket.onopen = async () => {
            console.log('Connected to websocket server.');
            const newestChats = await SocketAPI.fetchChats(localStorage.getItem('username'));
            localStorage.removeItem('chats');
            localStorage.setItem('chats', JSON.stringify(newestChats));
            window.dispatchEvent(new Event("storage"));
        }

        socket.onclose = () => {
            console.log('Disconnected from WebSocket server.');
        }

        socket.onerror = () => {
            console.log('Socket error.')
        }

        socket.onmessage = async () => {
            console.log('Socket listener: new message.');
            // fetch newest chats
            const newestChats = await SocketAPI.fetchChats(localStorage.getItem('username'));
            localStorage.removeItem('chats');
            localStorage.setItem('chats', JSON.stringify(newestChats));
            window.dispatchEvent(new Event("storage"));
        }

        return socket;
    },
    fetchChats: async (username) => {
        const response = await fetch(Constants.baseMessagingAPIPath + `/getAllMyChatsByDateDesc?myUsername=${username}`)
        const chatsJson = await response.json();
        return chatsJson;
    } 

    
}

export default SocketAPI;