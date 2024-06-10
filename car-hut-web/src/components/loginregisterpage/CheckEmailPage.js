import '../../css/loginregisterpage/CheckEmailPage.css';
import Header from '../maincomponents/Header';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function CheckEmailPage() {

    const loc = useLocation();
    const [email, setEmail] = useState(new URLSearchParams(loc.search).get('email'));

    return (
        <div className='check-email-body'>
            <Header/>
            <div className='check-email-content-wrapper'>
                <div className='check-email-content-header'>Please verify your account</div>
                <div className='check-email-content-body'>
                    <div className='check-email-content-body-text'>
                        We've sent you a verification e-mail to you e-mail address ({email}).<br/>
                        This is a necessary step to finish registration process.
                    </div>
                </div>
            </div>
        </div>
    );

}

export default CheckEmailPage;