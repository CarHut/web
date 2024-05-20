import APIMethods from '../../api/APIMethods';
import '../../css/loginregisterpage/SuccessfulVerificationPage.css';
import Header from '../maincomponents/Header';
import { useEffect, useState } from 'react';

function SuccessfulVerificationPage() {

    const search = window.location.search;
    const params = new URLSearchParams(search); 
    const [verified, setVerified] = useState(false);


    const verifyAccount = async (token) => {
        console.log(token);
        const response = await APIMethods.verifyAccount(token);
        if (response.status === 200) {
            setVerified(true);
        }
    }

    useEffect(() => {
        verifyAccount(params.get('token'));
    }, [])

    return (
        <div className='successful-verification-body'>
            <Header/>
            ({verified ?
                <div className='successful-verification-content-wrapper'>
                    <div className='successful-verification-content-header'>Successful!</div>
                    <div className='successful-verification-content-body'>
                        <div className='successful-verification-content-body-text'>
                            Briliant! <br/>
                            Your account has been verified.
                        </div>
                    </div>
                </div>
            : <div className='successful-verification-content-wrapper'>
                    <div className='successful-verification-content-header'>Something went wrong!</div>
                    <div className='successful-verification-content-body'>
                        <div className='successful-verification-content-body-text'>
                            Internal error (500).
                        </div>
                    </div>
                </div>
            })
            
        </div>
    );

}

export default SuccessfulVerificationPage;