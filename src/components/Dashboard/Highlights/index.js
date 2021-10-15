import React from 'react'
import { Grid } from '@material-ui/core'
import HighlighCard from './HighlighCard'

const HighLights = ({ report,theme }) => {
    const data = report
    const summary = [
        {
            title: 'Total cases',
            count: data.cases,
            type: 'confirmed',
            icon: 'fas fa-users icon',
        },
        {
            title: 'Total Active',
            count: data.active,
            type: 'active',
            icon: 'fas fa-bell icon',
        },
        {
            title: 'Total Recovered',
            count: data.recovered,
            type: 'recovered',
            icon: 'fas fa-child icon',
        },
        {
            title: 'Total Deaths',
            count: data.deaths,
            type: 'death',
            icon: 'fas fa-procedures icon',
        },
    ]
    return (
        <Grid container spacing={3}>
            {
                summary.map((item) => {
                    return (
                        <Grid item xs={12} sm={12} md={6} key={item.title}>
                            <HighlighCard 
                                title={item.title} 
                                count={item.count} 
                                type={item.type} 
                                key={item.type} 
                                icon={item.icon}
                                theme={theme}
                            />
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default HighLights