import '../css/pages/SearchList.css';
import Header from '../components/maincomponents/Header.js';
import MainSection from '../components/searchlist/MainSection.js';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import SocketAPI from '../messaging/SocketAPI.js';
import Footer from '../components/maincomponents/Footer.js';

function SearchList() {

    var loc = useLocation();

    // Socket reconnecting
    useEffect(() => {    
        if (localStorage.getItem('socket') != null && localStorage.getItem('socket') != undefined) {
            localStorage.removeItem('socket')
            const socket = SocketAPI.connectToSocket(localStorage.getItem('username'));
            localStorage.setItem('socket', socket);
        }
    }, []);

    return (
        <div className="body">
            <Header/>
            {/* <div className="current-route-text">Main page -> Search list</div> */}
            <div className="search-list-page-header">Search list</div>
            <MainSection state={loc.state}/>
            <Footer/>
        </div>
    );
}

export default SearchList;