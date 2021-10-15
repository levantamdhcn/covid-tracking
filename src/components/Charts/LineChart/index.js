import React, { useState,useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import moment from 'moment'
import { getReportByCountry } from '../../../apis/index'
import { ButtonGroup,Button,Typography,makeStyles,Box } from '@material-ui/core'
import { ThemeContext } from '../../contexts/ThemeContext' 


const generateOptions = (data,theme) => {
    const categories = data.map(item => moment(item.Date).format('DD/MM/YYYY'))
    return {
        chart: {
            height: 500,
            borderRadius: 5,
            fontSize: 14,
            backgroundColor: theme.item.backgroundColor,
            color: theme.item.iconColor
        },
        title: {
            text: undefined,
        },
        xAxis: {
            categories: categories,
            crosshair: true,
        },
        colors: ['#6456ff','#f5385a','#2dce99'],
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
        },
        legend: {
            itemStyle: {
                color: '#A0A0A0',
                fontFamily: 'Roboto',
                fontSize: '14px'
            },
            itemHoverStyle: {
                color: '#ccc'
            },
            itemHiddenStyle: {
                color: '#ccc'
            },
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'top',
        },
        tooltip: {
            headerFormat: '<span style="font-size: 10px">{point.key}</span><table>',
            pointFormat: 
                '<tr><td style="color:{series.color}; padding:0;">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} ca</td></tr>',
            footerFormat: '</table>',
            shared: true,
            usedHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: 'Summary',
                data: data.map((item) => {
                    return item.Confirmed
                })
            },
            {
                name: 'Deaths',
                data: data.map((item) => {
                    return item.Deaths
                })
            },
            {
                name: 'Recovered',
                data: data.map((item) => {
                    return item.Recovered
                }),
            },
        ]
    }
}

const useStyle = makeStyles({
    wrapper: (props) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: props.theme.item.backgroundColor,
        color: props.theme.item.textColor,
        borderBottom: '1px solid #e0e0e0',
        padding: '20px',
        borderRadius: '5px',
        "& button":{
            fontSize: '12px',
            color: props.theme.item.iconColor,
            borderRight: '1px solid'
        },
    }),
    title: {
        fontSize: '18px',
        fontWeight: '500'
    },
    activeBtn: (props) => ({
        fontSize: '12px',
        color: '#f60',
        border: '1px solid #f60'
    })
})

const LineChart = ({ countries, countryId }) => {
    const [options,setOptions] = useState({})
    const [data,setData] = useState([])
    const [reportType,setReportType] = useState('all')
    const { theme } = React.useContext(ThemeContext)
    
    useEffect(() => {
        if (countryId) {
            getReportByCountry(countryId)
            .then(res => {
                setData(res.data)
            })
        }
    },[countryId])
    useEffect(()=> {
        let customData = []
        switch(reportType) {
            case 'all': 
                customData = data;
                break;
            case '30': 
                customData = data.slice(data.length - 30);
                break;
            case '7': 
                customData = data.slice(data.length - 7);
                break;
            default: 
                customData = data;
                break;
        }
        setOptions(generateOptions(customData,theme))
    },[data,reportType,theme])
    if (countries.length > 0) {
        var { country } = countries.find((el) => el.countryInfo.iso2 === countryId)
    }
    const classes = useStyle({ theme })
    return (
        <div>
            <Box className={classes.wrapper}>
                <Typography component="p" className={classes.title}>{country}</Typography>
                <ButtonGroup size='small'>
                    <Button  
                        onClick={() => setReportType('all')} 
                        className={ reportType === 'all' ? classes.activeBtn : classes.btn}
                    >
                        All
                    </Button>
                    <Button 
                        onClick={() => setReportType('30')}
                        className={ reportType === '30' ? classes.activeBtn : classes.btn}
                    >
                        Last 30 Days
                    </Button>
                    <Button 
                        onClick={() => setReportType('7')}
                        className={ reportType === '7' ? classes.activeBtn : classes.btn}
                    >
                        Last 7 Days
                    </Button>
                </ButtonGroup>
            </Box>
            <HighchartsReact highcharts={Highcharts} options={options}/>
        </div>
    )
}

export default React.memo(LineChart)

