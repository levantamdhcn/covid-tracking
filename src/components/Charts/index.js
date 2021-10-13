import React from 'react'
import { Grid,makeStyles } from '@material-ui/core'
import LineChart from './LineChart/index'
import { ThemeContext } from '../contexts/ThemeContext'

const useStyle = makeStyles({
    wrapper: (props) => ({
        backgroundColor: props.theme.container.backgroundColor,
        padding: '25px'
    })
})

const Charts = ({ countries }) => {
    let dataToDisplay = ['VN','AU','CN','ID','CU','MM']
    const { theme } = React.useContext(ThemeContext)
    const classes = useStyle({ theme })
    return (
        <Grid container spacing={3} className={classes.wrapper}>
            {
                dataToDisplay.map((el) => {
                    return (
                        <Grid item xs={12} md={6}>
                            <LineChart countries={countries} countryId={el}/>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default React.memo(Charts)