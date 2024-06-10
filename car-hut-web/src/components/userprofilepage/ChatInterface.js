import { useLocation } from 'react-router-dom';
import APIMethods from '../../api/APIMethods';
import '../../css/userprofilepage/ChatInterface.css';
import { useEffect, useState } from 'react';
import SocketAPI from '../../messaging/SocketAPI';

function ChatInterface({ socket }) {

    const [messages, setMessages] = useState([]);
    const [myId, setMyId] = useState('');
    const [otherUserId, setOtherUserId] = useState('');
    const [message, setMessage] = useState('');
    const [newMessage, setNewMessage] = useState();
    const loc = useLocation();
    const queryParams = new URLSearchParams(loc.search);
    const otherUserUsername = queryParams.get('username');

    useEffect(() => {
        window.addEventListener("chats", async () => {
            let otherIdNewMessage = null;
            try {
                otherIdNewMessage = await APIMethods.getUserIdByUsername(otherUserUsername);
            } catch (error) {
                console.log(`[UserProfilePage][ChatInterface][useEffect][ERROR] - Cannot fetch userId by username=${otherUserUsername}. Stack trac message: ${error}`);
                return;
            }

            const newChats = JSON.parse(localStorage.getItem('chats'));
            let newMessage = null;

            for (let i = 0; i < newChats.length; i++) {
                if (newChats[i].senderId === otherIdNewMessage) {
                    newMessage = newChats[i];
                    break;
                }
            }

            setNewMessage(newMessage);
        });
        
        return () => {
            window.removeEventListener("chats", () => {});
        };
    }, []);

    useEffect(() => {
        setIds();
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [myId, otherUserId, newMessage]);

    const setIds = async () => {
        try {
            const id = await APIMethods.getUserIdByUsername(localStorage.getItem('username'));
            const id2 = await APIMethods.getUserIdByUsername(otherUserUsername);
            setMyId(id);
            setOtherUserId(id2);
        } catch (error) {
            console.log(`[UserProfilePage][ChatInterface][setIds][ERROR] - Cannot fetch ids from server. Stack trace message: ${error}`);
        }
    }

    const fetchMessages = async () => {
        // This means that if there are no messages then start new chat
        try {
            const response = await SocketAPI.fetchMessagesWithUser(myId, otherUserId);
            console.log(response);
            setMessages(response);
        } catch (error) {
            console.log(`[UserProfilePage][ChatInterface][fetchMessages][WARN] - Cannot fetch messages between id1=${myId} and id2=${otherUserId}. Creating new chat.`);
            setMessage([]);
        }
    }

    const handleMessageInput = (message) => {
        setMessage(message);
    }

    const sendMessage = () => {
        if (message !== null && message !== undefined && message.length > 0) {
            socket.send(
                JSON.stringify({
                    sender: localStorage.getItem('username'),
                    recipient: otherUserUsername,
                    content: message
                })
            )
            setMessages([
                {
                    senderId: myId,
                    recipientId: otherUserId,
                    message: message,
                    date: Date.now(),
                    id: 'null',
                    delivered: false
                },
                ...messages
            ])
            setMessage('');            
        }
    }

    const renderMessages = () => {
        const result = [];
        messages.map((message, idx) => {
            const messageId = message.senderId; 
            result.push(
                (myId === messageId
                    ?   <div className='chat-interface-my-messages-side' key={idx} value={idx}>
                            <div className='chat-interface-my-message'>{message.message}</div>
                            <div className='chat-interface-delivered-time-text'>{new Date(message.date).toLocaleTimeString()}</div>
                        </div>
                    :   <div className='chat-interface-other-messages-side' key={idx} value={idx}>
                            <div className='chat-interface-other-user-message'>{message.message}</div> 
                            <div className='chat-interface-delivered-time-text'>{new Date(message.date).toLocaleTimeString()}</div>
                        </div>
                )
            )
        });
        return result;
    }

    return (
        <div className='chat-interface-wrapper'>
            <div className='profile-content-header'>Chat with <div style={{fontWeight: "bold"}}>{otherUserUsername}</div></div>
            <div className='chat-interface-content-wrapper'>
                <div className='chat-interface-upper-nav'>
                    // HEADER TO DO
                </div>
                <div className='chat-interface-main-body'>
                    <div className='chat-interface-box'>    
                        {renderMessages(messages)}
                    </div>
                </div>
                <div className="chat-interface-input-container">
                    <input type="text" value={message} className="chat-interface-message-input" onChange={(e) => handleMessageInput(e.target.value)}/>
                    <div className="chat-interface-arrow-right-button" onClick={() => sendMessage()}/>
                </div>
            </div>
        </div>
    )
}

export default ChatInterface;