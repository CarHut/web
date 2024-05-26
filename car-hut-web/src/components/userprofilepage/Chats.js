import { keyboard } from '@testing-library/user-event/dist/keyboard';
import APIMethods from '../../api/APIMethods';
import '../../css/userprofilepage/Chats.css';

import { useEffect, useState } from 'react';

function Chats() {

    const [chats, setChats] = useState([]);
    const [usernames, setUsernames] = useState([]);

    useEffect(() => {
        fetchChatsFromStorage();
    }, []);

    useEffect(() => {
        window.addEventListener("storage", () => {
          fetchChatsFromStorage();
        });
      
        return () => {
          window.removeEventListener("storage", () => {});
        };
    }, []);

    useEffect(() => { 
        setUsernamesForChats();
    }, [chats]);

    const fetchChatsFromStorage = () => {
        setChats(JSON.parse(localStorage.getItem('chats')));
    }


    const setUsernamesForChats = async () => {
        const usernameArray = [];
        for (let i = 0; i < chats.length; i++) {
            const myId = await fetchUserIdByUsername(localStorage.getItem('username'));
            const secondUsername = await fetchUsernameByUserId(myId === chats[i].senderId ? chats[i].recipientId : chats[i].senderId);
            usernameArray.push({
                username: secondUsername,
                role: myId === chats[i].senderId ? 'recipient' : 'sender'
            });
        }

        setUsernames(usernameArray);
    }

    const renderChats = () => {
        // if (chats === null || chats === undefined || (chats instanceof Object && chats.constructor === Object)) {
        //     return;
        // }

        const result = chats.map((chat, idx) => {
            
            if (usernames[idx] !== undefined) {
                const date = new Date(chat.date).toUTCString('dd/MM/yy HH:mm:ss');
                const role = usernames[idx].role === 'sender' ? usernames[idx].username : 'You';

                return (
                    <div className='chats-entity' id={idx} key={idx}>
                        <img className='chats-entity-img' src={require('../../images/userprofilepage/chats.png')}/>
                        <div className='chats-entity-text-wrapper'>
                            <div className='chats-username'>{usernames[idx].username}</div>
                            <div className='chats-entity-content-wrapper'>
                                <div className='chats-content-text'>
                                    <div className='chats-content-text' style={{opacity: "70%"}}>{role}:</div>{chat.message.substring(0,20)}{chat.message.length > 20 ? '...' : ''}
                                </div>
                                <div className='chats-time-delivered-text'>{date}</div>
                            </div>
                        </div>
                    </div>
                )
            }
        });
        return result;
    }

    const fetchUserIdByUsername = async (username) => {
        const response = await APIMethods.getUserIdByUsername(username);
        return response;
    }

    const fetchUsernameByUserId = async (userId) => {
        const response = await APIMethods.getUsernameByUserId(userId); 
        return response;
    }

    return (
        <div className='chats-wrapper'>
            <div className='profile-content-header'>Chats</div>
            <div className='chats-content-wrapper'>
                {renderChats()}
            </div>
        </div>
    )

}

export default Chats;