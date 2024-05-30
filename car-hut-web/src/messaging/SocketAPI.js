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
            setTimeout(async () => { 
                console.log('Socket listener: new message.');
                const newestChats = await SocketAPI.fetchChats(localStorage.getItem('username')) 
                localStorage.removeItem('chats');
                localStorage.setItem('chats', JSON.stringify(newestChats));
                window.dispatchEvent(new Event("chats"));
            }, 1000);
        }


        return socket;
    },
    fetchChats: async (username) => {
        const response = await fetch(Constants.baseMessagingAPIPath + `/getAllMyChatsByDateDesc?myUsername=${username}`)
        const chatsJson = await response.json();
        return chatsJson;
    },
    fetchMessagesWithUser: async (myUserId, otherUserId) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                senderId: myUserId,
                recipientId: otherUserId
            })
        };

        const response = await fetch(Constants.baseMessagingAPIPath + '/getLastFiftyMessagesWithUser', requestOptions);
        const messages = await response.json();
        return messages;
    },

    
}

export default SocketAPI;