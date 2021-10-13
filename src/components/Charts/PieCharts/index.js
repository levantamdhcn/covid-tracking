import React from 'react'
import Highcharts from 'highcharts/highstock'
import highchartsMore from "highcharts/highcharts-more.js"
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from 'highcharts-react-official'

highchartsMore(Highcharts);
solidGauge(Highcharts);
 
const GaugeChart = (data,theme) => {
    let recoverdPercent = data.recovered/data.cases*100
    let formattedRecoverdPercent = parseFloat(recoverdPercent.toFixed(2))
    return {
        chart: {
            type: "solidgauge",
            height: '81.5%',
            backgroundColor: theme.item.backgroundColor,
            borderRadius: '5px'
        },
        title: {
            text: 'Recovery Rate',
            style: {
                fontSize: '16px',
                fontWeight: 'normal',
                color: '#AEAED5',
            }
        },
        
        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                fontSize: '14px',
                color: '#AEAED5',
            },
            valueSuffix: '%',
            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
            positioner: function (labelWidth) {
                return {
                    x: (this.chart.chartWidth - labelWidth) / 2,
                    y: (this.chart.plotHeight / 2) + 15
                };
            }
        },
        
        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Move
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor: '#f4f4f4',
                borderWidth: 1
            },
        ]
        },
        
        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },
        
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false,
                rounded: false
            }
        },
        
        series: [{
            name: 'Recovery Rate',
            type: 'solidgauge',
            data: [{
                color: '#28a745',
                radius: '112%',
                innerRadius: '88%',
                y: data ? formattedRecoverdPercent : 0
            },
        ]
        }]
    };
}

const PieCharts = ({ data,theme }) => {
    console.log()
    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={GaugeChart(data,theme)}
                animateDuration = {3000}
                formatTextValue = {(value) => value + '%'}
            />  
        </div>
    )
}

export default React.memo(PieCharts)
