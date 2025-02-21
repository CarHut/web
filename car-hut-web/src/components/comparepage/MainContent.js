import '../../css/comparepage/MainContent.css';
import Graphs from './Graphs';
import Params from './Params';
import { useState } from 'react';

const MainContent = () => {

    const [rawGraphData, setRawGraphData] = useState('{}');
    const [graphChangeContent, setGraphChangeContent] = useState(null);
    const [overlayActive, setOverlayActive] = useState(false);

    return (
        <div className='main-content-bg'>
            <div className='main-content-body'>
                <div className={overlayActive === true ? "left-params-content graph-overlay" : "left-params-content"}>        
                    <Params setRawGraphData={setRawGraphData} graphChangeContent={graphChangeContent} overlayActive={overlayActive}/>
                </div>
                <div className={overlayActive === true ? "right-graphs-content graph-overlay" : "right-graphs-content"}>
                    <Graphs rawGraphData={rawGraphData} setGraphChangeContent={setGraphChangeContent} setOverlayActive={setOverlayActive}/>
                </div>
            </div>
        </div>
    )
}

export default MainContent;