import { Bar, Line } from "react-chartjs-2";
import { Chart, Legend, scales } from 'chart.js/auto';
import { createPath } from "react-router-dom";

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
function Graphs({ rawGraphData, setGraphChangeContent }) {
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

    return (
        <div className='graphs-column'>
            <div className='graph-wrapper'>{medianGraph()}</div>
            <div className='graph-wrapper'>{minMaxGraph()}</div>     
            <div className='graph-wrapper'>{priceDistributionGraph()}</div> 
            <div className="graph-wrapper">{priceFluctuationGraph()}</div>              
        </div>
    )

}

export default Graphs;