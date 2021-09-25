import React from 'react'
import { Grid } from '@material-ui/core'
import HighlighCard from './HighlighCard'

const HighLights = ({ report }) => {
    const data = report && report.length ? report[report.length - 1 ] : []
    const summary = [
        {
            title: 'Số ca nhiễm',
            count: new Intl.NumberFormat().format(data.Confirmed),
            type: 'confirmed'
        },
        {
            title: 'Hồi phục',
            count: new Intl.NumberFormat().format(data.Recovered),
            type: 'recovered'
        },
        {
            title: 'Tử vong',
            count: new Intl.NumberFormat().format(data.Deaths),
            type: 'death'
        },
    ]
    return (
        <Grid container spacing={3}>
            {
                summary.map((item) => {
                    return <HighlighCard title={item.title} count={item.count} type={item.type}/>
                })
            }
        </Grid>
    )
}

export default HighLights