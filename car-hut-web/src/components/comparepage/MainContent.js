import '../../css/comparepage/MainContent.css';
import Graphs from './Graphs';
import Params from './Params';
import { useState } from 'react';

const MainContent = () => {

    const [rawGraphData, setRawGraphData] = useState('{}');
    const [graphChangeContent, setGraphChangeContent] = useState(null);

    return (
        <div className='main-content-bg'>
            <div className='main-content-body'>
                <div className='left-params-content'>        
                    <Params setRawGraphData={setRawGraphData} graphChangeContent={graphChangeContent}/>
                </div>
                <div className='right-graphs-content'>
                    <Graphs rawGraphData={rawGraphData} setGraphChangeContent={setGraphChangeContent}/>
                </div>
            </div>
        </div>
    )
}

export default MainContent;