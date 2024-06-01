import APIMethods from '../../api/APIMethods';
import '../../css/userprofilepage/Chats.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingCircle from '../maincomponents/LoadingCircle';

function Chats({ socket }) {

    const [chats, setChats] = useState([]);
    const [usernames, setUsernames] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchChatsFromStorage();
    }, []);

    useEffect(() => {
        window.addEventListener("chats", () => {
            
        });
      
        return () => {
          window.removeEventListener("chats", () => {});
        };
    }, []);

    useEffect(() => { 
        setUsernamesForChats();
    }, [chats]);

    const fetchChatsFromStorage = () => {
        setChats(JSON.parse(localStorage.getItem('chats')));
        setLoading(false);
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

        const result = chats.map((chat, idx) => {
            
            if (usernames[idx] !== undefined) {
                const date = new Date(chat.date).toUTCString('dd/MM/yy HH:mm:ss');
                const role = usernames[idx].role === 'sender' ? usernames[idx].username : 'You';

                return (
                    <Link 
                        className='chats-entity' id={idx} key={idx}
                        to={`/userProfile/chats/with?username=${usernames[idx].username}`}
                        style={{textDecoration: "none"}}
                    >
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
                    </Link>
                )
            }
        });

        return result;
    }

    const fetchUserIdByUsername = async (username) => {
        try {
            const response = await APIMethods.getUserIdByUsername(username);
            return response;
        } catch (error) {
            console.log(`[UserProfilePage][Chats][fetchUserIdByUsername][ERROR] - Cannot fetch user id from server with username=${username}. Stack trace message: ${error}`);
        }
    }

    const fetchUsernameByUserId = async (userId) => {
        try {
            const response = await APIMethods.getUsernameByUserId(userId); 
            return response;
        } catch (error) {
            console.log(`[UserProfilePage][Chats][fetchUsernameByUserId][ERROR] - Cannot fetch username with userId=${userId}. Stack trace message: ${error}`);
        }
    }

    return (
        <div className='chats-wrapper'>
            <div className='profile-content-header'>Chats</div>
            <div className='chats-content-wrapper'>
                {loading ? <LoadingCircle/> : <div/>}
                {renderChats()}
            </div>
        </div>
    )

}

export default Chats;