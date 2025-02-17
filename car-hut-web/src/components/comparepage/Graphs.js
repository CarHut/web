import { Bar, Line } from "react-chartjs-2";
import { Chart, Legend, scales } from 'chart.js/auto';
import { createPath } from "react-router-dom";
import '../../css/comparepage/Graphs.css';
import { use, useState } from "react";

/**
 * setGraphChangeContent structure:
 * 
 * {
 *  type: type of graph (mandatory) [median, maxmin, pricedis],
 *  value: value of certain point, object (mandatory) [integer],
 *  valType: (maxmin) ['min', 'max'],
 * } 
 * 
**/ 
function Graphs({ rawGraphData, setGraphChangeContent, setOverlayActive }) {
    const [isGraphOverlayActive, setIsGraphOverlayActive] = useState(false);
    const [isMedianGraphActive, setIsMedianGraphActive] = useState(true);
    const [isMinMaxGraphActive, setIsMinMaxGraphActive] = useState(true);
    const [isPriceDistributionGraphActive, setIsPriceDistributionGraphActive] = useState(true);
    const [isPriceFluctuationGraphActive, setIsPriceFluctuationGraphActive] = useState(true);
    const [isOffersVolumeGraphActive, setIsOffersVolumeGraphActive] = useState(true);

    const medianGraph = () => {
        if (rawGraphData === null || rawGraphData === undefined) {
            return (
                <div/>
            );
        }
        const dataJson = JSON.parse(rawGraphData);
        if (dataJson !== null) {
            if (dataJson.median !== null && dataJson.median !== undefined) {
                const prepData = {
                    labels: dataJson.median.labels,
                    datasets: [
                        {
                          label: dataJson.median.graphLabel,
                          data: dataJson.median.medianPrices,
                          fill: false,
                          tension: 0.3,
                        },
                    ]
                }
        
                const options = {
                    plugins: {
                        customCanvasBackgroundColor: {
                          color: '#313131',
                        },
                        title: {
                            display: true,
                            text: "Median prices"
                        }
                    },
                    interaction: {
                        mode: 'point'
                    },
                    onClick: (_, element) => {
                        if (element.length > 0) {
                            setGraphChangeContent({
                                type: 'median',
                                value: element[0].element.$context.raw
                            });
                        }
                    }
                }
    
                const plugin = {
                    id: 'customCanvasBackgroundColor',
                    beforeDraw: (chart, args, options) => {
                        const {ctx} = chart;
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-over';
                        ctx.fillStyle = options.color || '#fff';
                        ctx.fillRect(0, 0, chart.width, chart.height);
                        ctx.restore();
                    },
                };
    
                return ( 
                    <Line data={prepData} color='#fff' options={options} plugins={[plugin]}/>
                );
            }
        }
    }

    const minMaxGraph = () => {
        if (rawGraphData === null || rawGraphData === undefined) {
            return (
                <div/>
            );
        }
        const dataJson = JSON.parse(rawGraphData);
        if (dataJson !== null) {
            if (dataJson.minMax !== null && dataJson.minMax !== undefined) {
                const prepData = {
                    labels: dataJson.minMax.labels,
                    datasets: [
                        // min
                        {
                          label: 'Min',
                          data: dataJson.minMax.minMaxData.map(priceRange => priceRange[0]),
                          fill: false,
                          tension: 0.3,
                        },
                        // max
                        {
                            label: 'Max',
                            data: dataJson.minMax.minMaxData.map(priceRange => priceRange[1]),
                            fill: false,
                            tension: 0.3,
                        }
                    ]
                }
        
                const options = {
                    plugins: {
                        customCanvasBackgroundColor: {
                          color: '#313131',
                        },
                        title: {
                            display: true,
                            text: "MinMax prices"
                        }
                    },
                    onClick: (_, element) => {
                        if (element.length > 0) {
                            setGraphChangeContent({
                                type: 'minmax',
                                value: element[0].element.$context.raw,
                                valType: element[0].datasetIndex === 0 ? 'min' : 'max'
                            });
                        }
                    }
                }
    
                const plugin = {
                    id: 'customCanvasBackgroundColor',
                    beforeDraw: (chart, args, options) => {
                        const {ctx} = chart;
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-over';
                        ctx.fillStyle = options.color || '#fff';
                        ctx.fillRect(0, 0, chart.width, chart.height);
                        ctx.restore();
                    }
                };
    
                return ( 
                    <Line data={prepData} options={options} plugins={[plugin]}/>
                );
            }
        }
    }

    const priceDistributionGraph = () => {
        if (rawGraphData === null || rawGraphData === undefined) {
            return (
                <div/>
            );
        }
        const dataJson = JSON.parse(rawGraphData);
        if (dataJson !== null) {
            if (dataJson.priceDistribution !== null && dataJson.priceDistribution !== undefined) {
                const prepData = {
                    labels: dataJson.priceDistribution.labels,
                    datasets: [
                        // low range
                        {
                            label: dataJson.priceDistribution.graphLabels[0],
                            data: dataJson.priceDistribution.priceDistributionData.map(priceRange => priceRange[0]),
                            backgroundColor: '#008000'
                        },
                        // mid range
                        {
                            label: dataJson.priceDistribution.graphLabels[1],
                            data: dataJson.priceDistribution.priceDistributionData.map(priceRange => priceRange[1]),
                            backgroundColor: '#FFDE21'
                        },
                        // high range
                        {
                            label: dataJson.priceDistribution.graphLabels[2],
                            data: dataJson.priceDistribution.priceDistributionData.map(priceRange => priceRange[2]),
                            backgroundColor: '#FF0000'
                        },
                    ]
                }
        
                const options = {
                    plugins: {
                        customCanvasBackgroundColor: {
                          color: '#313131',
                        },
                        title: {
                            display: true,
                            text: "Price distribution"
                        }
                    },
                    responsive: true,
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true
                        }
                    },
                    onClick: (_, element) => {
                        if (element.length > 0) {
                            setGraphChangeContent({
                                type: 'pricedis',
                                value: element[0].element.$context.raw
                            });
                        }
                    }
                }
    
                const plugin = {
                    id: 'customCanvasBackgroundColor',
                    beforeDraw: (chart, args, options) => {
                        const {ctx} = chart;
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-over';
                        ctx.fillStyle = options.color || '#fff';
                        ctx.fillRect(0, 0, chart.width, chart.height);
                        ctx.restore();
                    }
                };
    
                return ( 
                    <Bar data={prepData} options={options} plugins={[plugin]}/>
                );
            }
        }
    }

    const priceFluctuationGraph = () => {
        if (rawGraphData === null || rawGraphData === undefined) {
            return (
                <div/>
            );
        }
        const dataJson = JSON.parse(rawGraphData);
        if (dataJson !== null) {
            if (dataJson.priceFluctuation !== null && dataJson.priceFluctuation !== undefined) {
                const data = {
                    labels: dataJson.priceFluctuation.labels,
                    datasets: [{
                        label: "Price fluctuation",
                        data: 
                            dataJson.priceFluctuation.priceFluctuationData.map((col, idx) => {
                                return {
                                    x: dataJson.priceFluctuation.labels[idx],
                                    o: col.priceFrom,
                                    c: col.priceTo,
                                    p: col.percentage,
                                    s: [col.priceFrom, col.priceTo]
                                }
                            }),
                            backgroundColor: (ctx) => {
                                if (ctx.raw === null || ctx.raw === undefined) {
                                    return '';
                                }
                                if (ctx.raw.p < 0.0) {
                                    return 'rgb(255, 0, 0)';
                                } else {
                                    return 'rgb(60, 179, 113)';
                                }
                            }
                    }],
                };

                const options = {
                    plugins: {
                        customCanvasBackgroundColor: {
                          color: '#313131',
                        },
                        title: {
                            display: true,
                            text: "Price fluctuation"
                        },
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: (ctx) => {
                                    if (ctx === null) {
                                        return '';
                                    }
                                    return `${ctx.raw.p}%   |   From:  ${ctx.raw.o}€   |   To:  ${ctx.raw.c}€`;
                                }
                            }
                        }
                    },
                    responsive: true,
                    parsing: {
                        xAxisKey: 'x',
                        yAxisKey: 's'
                    }
                }

                const plugin = {
                    id: 'customCanvasBackgroundColor',
                    beforeDraw: (chart, args, options) => {
                        const {ctx} = chart;
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-over';
                        ctx.fillStyle = options.color || '#fff';
                        ctx.fillRect(0, 0, chart.width, chart.height);
                        ctx.restore();
                    }
                };
                
                return ( 
                    <Bar data={data} options={options} plugins={[plugin]}/>
                );
            }
        }
    }

    const offersVolumeGraph = () => {
        if (rawGraphData === null || rawGraphData === undefined) {
            return (
                <div/>
            );
        }
        const dataJson = JSON.parse(rawGraphData);
        if (dataJson !== null) {
            if (dataJson.offersVolume !== null && dataJson.offersVolume !== undefined) {
                const maxVolume = Math.max(...dataJson.offersVolume.offerVolumes.map(v => v.volume));
                const highThreshold = maxVolume * 0.75;
                const lowThreshold = maxVolume * 0.25;

                // Define colors for categories
                const colorMapping = {
                    "Top volume": "#008000",
                    "Standard volume": "#ba8e23",
                    "Low volume": "#FF0000"
                };

                // Function to categorize a volume
                function getVolumeCategory(volume) {
                    if (volume >= highThreshold) return "Top volume";
                    if (volume <= lowThreshold) return "Low volume";
                    return "Standard volume";
                }

                // Initialize grouped data with empty arrays for each label
                const groupedData = {
                    "Top volume": new Array(dataJson.offersVolume.labels.length).fill(null),
                    "Standard volume": new Array(dataJson.offersVolume.labels.length).fill(null),
                    "Low volume": new Array(dataJson.offersVolume.labels.length).fill(null)
                };

                // Assign volumes to correct positions
                dataJson.offersVolume.offerVolumes.forEach((volumeData, index) => {
                    const category = getVolumeCategory(volumeData.volume);
                    groupedData[category][index] = volumeData.volume; // Place the value at the correct index
                });

                // Final dataset ensuring alignment with labels
                const datasets = Object.keys(groupedData).map(category => ({
                    label: category,
                    data: groupedData[category], // Values aligned with labels
                    backgroundColor: colorMapping[category]
                }));

                const prepData = {
                    labels: dataJson.offersVolume.labels, // Ensure labels match the dataset
                    datasets: datasets
                };
        
                const options = {
                    plugins: {
                        customCanvasBackgroundColor: {
                          color: '#313131',
                        },
                        title: {
                            display: true,
                            text: "Offers volume"
                        }
                    },
                    responsive: true,
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true
                        }
                    },
                }
    
                const plugin = {
                    id: 'customCanvasBackgroundColor',
                    beforeDraw: (chart, args, options) => {
                        const {ctx} = chart;
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-over';
                        ctx.fillStyle = options.color || '#fff';
                        ctx.fillRect(0, 0, chart.width, chart.height);
                        ctx.restore();
                    }
                };
    
                return ( 
                    <Bar data={prepData} options={options} plugins={[plugin]}/>
                );
            }
        }
    }

    const changeGraphOverlayStatus = () => {
        if (isGraphOverlayActive === true) {
            setIsGraphOverlayActive(false);
            setIsMedianGraphActive(true);
            setIsMinMaxGraphActive(true);
            setIsPriceDistributionGraphActive(true);
            setIsPriceFluctuationGraphActive(true);
            setIsOffersVolumeGraphActive(true);
            setOverlayActive(false);
        } else {
            setIsGraphOverlayActive(true);
            setOverlayActive(true);
        }
    }

    const showMedianGraph = () => {
        if (isMedianGraphActive === true) {
            setIsMedianGraphActive(false);
        } else {
            setIsMedianGraphActive(true);
        }
    }

    const showMinMaxGraph = () => {
        if (isMinMaxGraphActive === true) {
            setIsMinMaxGraphActive(false);
        } else {
            setIsMinMaxGraphActive(true);
        }
    }

    const showPriceDistributionGraph = () => {
        if (isPriceDistributionGraphActive === true) {
            setIsPriceDistributionGraphActive(false);
        } else {
            setIsPriceDistributionGraphActive(true);
        }
    }

    const showPriceFluctuationGraph = () => {
        if (isPriceFluctuationGraphActive === true) {
            setIsPriceFluctuationGraphActive(false);
        } else {
            setIsPriceFluctuationGraphActive(true);
        }
    }

    const showOffersVolumeGraph = () => {
        if (isOffersVolumeGraphActive === true) {
            setIsOffersVolumeGraphActive(false);
        } else {
            setIsOffersVolumeGraphActive(true);
        }
    }

    const areMultipleChartsActiveInOverlay = () => {
        return (isMedianGraphActive + isMinMaxGraphActive + isPriceDistributionGraphActive + isPriceFluctuationGraphActive) > 1;
    }

    return (
        <div className={isGraphOverlayActive === false ? 'graphs-column' : areMultipleChartsActiveInOverlay() === false ? 'graphs-overlay' : 'graphs-overlay flex'}>
            <button onClick={changeGraphOverlayStatus} className="graph-overlay-button">{isGraphOverlayActive === true ? ">>> Close graph overlay" : "<<< Open graph overlay"}</button>
            {isGraphOverlayActive === true 
                ? 
                    <div className="graphs-overlay-navbar">
                        <button onClick={showMedianGraph} className={isMedianGraphActive === true ? "graphs-overlay-navbar-button active" : "graphs-overlay-navbar-button"}>Median graph</button>
                        <button onClick={showMinMaxGraph} className={isMinMaxGraphActive == true ? "graphs-overlay-navbar-button active" : "graphs-overlay-navbar-button"}>MinMax graph</button>
                        <button onClick={showPriceDistributionGraph} className={isPriceDistributionGraphActive == true ? "graphs-overlay-navbar-button active" : "graphs-overlay-navbar-button"}>Price distribution graph</button>
                        <button onClick={showPriceFluctuationGraph} className={isPriceFluctuationGraphActive == true ? "graphs-overlay-navbar-button active" : "graphs-overlay-navbar-button"}>Price fluctuation graph</button>
                        <button onClick={showOffersVolumeGraph} className={isOffersVolumeGraphActive == true ? "graphs-overlay-navbar-button active" : "graphs-overlay-navbar-button"}>Offers volume graph</button>
                    </div> 
                :   <div/>
            }
            {isMedianGraphActive === false ? <div/> 
                : <div className={isGraphOverlayActive === true && areMultipleChartsActiveInOverlay() === false ? "overlay-graph-wrapper" : "graph-wrapper"}>{medianGraph()}</div>
            }
            {isMinMaxGraphActive === false ? <div/> 
                : <div className={isGraphOverlayActive === true && areMultipleChartsActiveInOverlay() === false ? "overlay-graph-wrapper" : "graph-wrapper"}>{minMaxGraph()}</div>
            }
            {isPriceDistributionGraphActive === false ? <div/> 
                : <div className={isGraphOverlayActive === true && areMultipleChartsActiveInOverlay() === false ? "overlay-graph-wrapper" : "graph-wrapper"}>{priceDistributionGraph()}</div>
            }
            {isPriceFluctuationGraphActive === false ? <div/>
                : <div className={isGraphOverlayActive === true && areMultipleChartsActiveInOverlay() === false ? "overlay-graph-wrapper" : "graph-wrapper"}>{priceFluctuationGraph()}</div>
            }
            {isOffersVolumeGraphActive === false ? <div/>
                : <div className={isGraphOverlayActive === true && areMultipleChartsActiveInOverlay() === false ? "overlay-graph-wrapper" : "graph-wrapper"}>{offersVolumeGraph()}</div>
            }
        </div>
    )

}

export default Graphs;