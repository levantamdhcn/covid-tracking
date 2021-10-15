import React from 'react'
import { Grid,makeStyles} from '@material-ui/core'
import HighMaps from '../../Charts/HighMaps/index'
import HighLights from '../Highlights/index'
import PieCharts from '../../Charts/PieCharts/index'
import HighlighCard from '../Highlights/HighlighCard'

const useStyle = makeStyles({
    wrapper: {
        boxShadow: '0 0 30px 0 rgb(82 63 105 / 5%);',
        borderRadius: '5px',
    },
})

const Summary = ({ selectedCountryId,reportForHighLights,theme,mapData }) => {

    

    const classes = useStyle({ theme })

    return (
        <Grid container spacing={3}>
            <Grid item sm={6} xs={12} className={classes.wrapper}>
                <Grid container spacing={3}>
                    <Grid item sm={12}>
                        <HighLights report={reportForHighLights} theme={theme}/>
                    </Grid>
                    <Grid item sm={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                        <HighlighCard 
                                            title={'Today cases'} 
                                            count={reportForHighLights.todayCases} 
                                            type={'todayCases'} key={'todayCases'} 
                                            icon={'fas fa-user-friends'}
                                            theme={theme}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <HighlighCard 
                                            title={'Today deaths'} 
                                            count={reportForHighLights.todayDeaths} 
                                            type={'todayDeaths'} 
                                            key={'todayDeaths'} 
                                            icon={'fas fa-bed'}
                                            theme={theme}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <PieCharts data={reportForHighLights} theme={theme}/>     
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={6} xs={12} className={classes.wrapper}>
                <HighMaps mapData={mapData}/>
            </Grid>
        </Grid>
    )
}

export default React.memo(Summary)