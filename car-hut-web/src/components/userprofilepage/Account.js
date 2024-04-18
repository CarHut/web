import '../../css/userprofilepage/Account.css';
import { useState, useEffect } from 'react';


function Account() {
    
    const [accountDetails, setAccountDetails] = useState();

    const fetchAccountDetails = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json' 
            },
            body: localStorage.getItem('username')
        }

        console.log(localStorage.getItem('token'));
        console.log(localStorage.getItem('username'));
        
        const response = await fetch('http://localhost:8080/api/auth/getUserDetailsInfo', requestOptions);
        const data = await response.json();
        setAccountDetails(data);
    }

    useEffect(() => {
        fetchAccountDetails();
    }, []);

    return (
        <div className='account-wrapper'>
            <div className='profile-content-header'>Account</div>
            <div className='account-main-info-wrapper'>
                <div className='account-main-info-column-entity'>
                    <div className='profile-content-dark-text'>Username</div>
                    <div className='profile-content-dark-text'>E-mail</div>
                    <div className='profile-content-dark-text'>Phone No.</div>
                    <div className='profile-content-dark-text'>Password</div>
                </div>
                <div className='account-main-info-column-entity'>
                    <div className='profile-content-text'>{accountDetails.username}</div>
                    <div className='profile-content-text'>{accountDetails.email}</div>
                    <div className='profile-content-text'>+421 000 000 000</div>
                    <div className='profile-content-text'>**********</div>
                </div>
            </div>
        </div>
    );
}

export default Account;