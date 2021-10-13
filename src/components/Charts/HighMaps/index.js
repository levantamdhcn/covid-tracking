import React,{useState,useEffect,useRef,useContext } from 'react'
import HighChart from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsMap from 'highcharts/modules/map'
import { ThemeContext } from '../../contexts/ThemeContext'

highchartsMap(HighChart)

const cloneDeep = require('clone-deep');

const initOptions = {

    chart: {
        height: '500',
    },

    title: {
        text: null,
    },

    mapNavigation: {
        enabled: true
    },

    colorAxis: {
        min: 0,
        stops: [
            [0.2, '#FFC4AA'],
            [0.4, '#FF8A66'],
            [0.6, '#FF392B'],
            [0.8, '#871525'],
            [1, '#7A0826'],
        ]
    },

    legends: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'bottom',
    },

    series: [{
        mapData: {},
        name: 'Cases confirmed',
        tooltip: {
            pointFormat: `{point.name}: {point.value}`
        },
        joinBy: ['hc-key','key'],
    }],
    dataLabels: {
        enabled: true,
        format: '{point.properties.postal}'
    }
}

const HighMaps = ({ mapData }) => {
    const [options,setOptions] = useState({})
    const chartRef = useRef(null)
    const [configLoaded,setConfigLoaded] = useState(false)
    const { theme } = useContext(ThemeContext)
    useEffect(() => {
        if (mapData && Object.keys(mapData).length) {
            const fakeData = mapData.features.map((feature,index) => {
                return {
                    key: feature.properties['hc-key'],
                    value: index,
                }
            })
            setOptions({
                ...initOptions,
                chart: {
                    height: '500',
                    backgroundColor: theme.item.backgroundColor,
                },
                series: [{
                    ...initOptions.series[0],
                    mapData: mapData,
                    data: fakeData,
                },],
            })
        }
    },[mapData,theme.item.backgroundColor])
    useEffect(() => {
        if (chartRef && chartRef.current && chartRef.current.chart.series[0]) {
            chartRef.current.chart.series[0].update({
                mapData: mapData,
            })
            setConfigLoaded(true)
        }  
        if (!configLoaded) setConfigLoaded(true)

    }, [mapData,configLoaded])

    if (!configLoaded) return null
    return (
        <HighchartsReact highcharts={HighChart} options={cloneDeep(options)} constructorType='mapChart' ref={chartRef}/>
    )
}

export default React.memo(HighMaps)
