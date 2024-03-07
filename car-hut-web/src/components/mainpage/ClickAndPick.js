import '../../css/ClickAndPick.css';

function ClickAndPick() {
    return (
        <div className="section-body-click-and-pick">
            <div className='section-header-text-click-and-pick'>Click and pick!</div>
            <div className='content-click-and-pick'>
                <div className="row-click-and-pick">
                    <div className="cell-click-and-pick">
                        <img className='img-click-and-pick' src={require("../../images/carbrands/audi.png")} alt="audi"/>
                    </div>
                    <div className="cell-click-and-pick">
                        <img className='img-click-and-pick' src={require("../../images/carbrands/bmw.png")} alt="bmw"/>
                    </div>
                    <div className="cell-click-and-pick">
                        <img className='img-click-and-pick' src={require("../../images/carbrands/honda.png")} alt="honda"/>
                    </div>
                    <div className="cell-click-and-pick">
                        <img className='img-click-and-pick' src={require("../../images/carbrands/kia.png")} alt="kia"/>
                    </div>
                    <div className="cell-click-and-pick">
                        <img className='img-click-and-pick' src={require("../../images/carbrands/mercedes.png")} alt="mercedes"/>
                    </div>
                    <div className="cell-click-and-pick">
                        <img className='img-click-and-pick' src={require("../../images/carbrands/skoda.png")} alt="skoda"/>
                    </div>
                    <div className="cell-click-and-pick">
                        <img className='img-click-and-pick' src={require("../../images/carbrands/tesla.png")} alt="tesla"/>
                    </div>
                    <div className="cell-click-and-pick">
                        <img className='img-click-and-pick' src={require("../../images/carbrands/toyota.png")} alt="toyota"/>
                    </div>
                    <div className="cell-click-and-pick">
                        <img className='img-click-and-pick' src={require("../../images/carbrands/volvo.png")} alt="volvo"/>
                    </div>
                    <div className="cell-click-and-pick">
                        <img className='img-click-and-pick' src={require("../../images/carbrands/vw.png")} alt="vw"/>
                    </div>
                </div>
                <div className='more-brands-text'>More brands ...</div>
            </div>
        </div>
    );
}

export default ClickAndPick;