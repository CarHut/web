import '../../css/maincomponents/Footer.css';

function Footer() {

    return (
        <div className='footer-wrapper'>
            <div className='footer-content-row-wrapper'>
                <div className='footer-line'/>
                <a href='https://linkedin.com/in/ján-kapraľ-147ab4259'>
                    <img className='footer-img' src={require('../../images/media/linkedin.png')}/>     
                </a>
                <a href='https://github.com/JohnyKapo'>
                    <img className='footer-img' src={require('../../images/media/github.png')}/>
                </a>
                <div className='footer-line'/>
            </div>
            <a href='https://github.com/CarHut' className='footer-carhut' style={{textDecoration: "none"}}>
                <img className='footer-carhut-img' src={require('../../images/carhut_logo.png')}/>
                <div className='footer-h1'>CarHut</div>
            </a>
            <div className='footer-copyright-wrapper'>
                <div className='footer-copyright-text'>Copyright © 2024 Ján Kapraľ</div>
            </div>
            <div className='footer-tabs-content-wrapper'>
                <div className='footer-tabs-content-text'>Privacy Policy</div>
                <div className='footer-tabs-content-text'>|</div>
                <div className='footer-tabs-content-text'>Legal Stuff</div>
                <div className='footer-tabs-content-text'>|</div>
                <div className='footer-tabs-content-text'>Contact</div>
                <div className='footer-tabs-content-text'>|</div>
                <div className='footer-tabs-content-text'>Cookies</div>
            </div>
        </div>
    );

}

export default Footer;