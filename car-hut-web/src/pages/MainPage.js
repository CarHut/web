import '../css/pages/MainPage.css'
import Header from '../components/maincomponents/Header.js';
import FilterSearch from '../components/mainpage/FilterSearch.js';
import ClickAndPick from '../components/mainpage/ClickAndPick.js';
import CarNews from '../components/mainpage/CarNews.js';
import { useEffect } from 'react';
import SocketAPI from '../messaging/SocketAPI.js';
import Footer from '../components/maincomponents/Footer.js';

function MainPage() {
    
    // Socket reconnecting
    useEffect(() => {    
        if (localStorage.getItem('socket') !== null && localStorage.getItem('socket') !== undefined) {
            localStorage.removeItem('socket')
            const socket = SocketAPI.connectToSocket(localStorage.getItem('username'));
            localStorage.setItem('socket', socket);
        }
    }, []);
    
    return (
        <div className='body'>
            <Header/>
            <FilterSearch/>
            <ClickAndPick/>
            <CarNews/>
            <Footer/>
        </div>
    );
}

export default MainPage;
