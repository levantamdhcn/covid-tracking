import React from 'react'
import { Grid,makeStyles } from '@material-ui/core'
import LineChart from './LineChart/index'
import { ThemeContext } from '../contexts/ThemeContext'
import { DotLoading } from '../DotLoading'

const useStyle = makeStyles({
    wrapper: (props) => ({
        backgroundColor: props.theme.container.backgroundColor,
        padding: '25px',
    }),
    fix: {
        marginTop: '70px',
    }
})

const Charts = ({ countries }) => {
    let dataToDisplay = ['VN','AU','CN','ID','CU','MM']
    const [loading,setLoading] = React.useState(true)
    React.useEffect(()=>{
        if(countries.length > 0) {
            setLoading(false)
        }
    },[countries])
    const { theme } = React.useContext(ThemeContext)
    const classes = useStyle({ theme })
    return (
        <div className={classes.fix}>
            {
            loading ? <DotLoading/> : 
            <Grid container spacing={3} className={classes.wrapper}>
                {
                    dataToDisplay.map((el) => {
                        return (
                            <Grid item xs={12} md={6} key={el}>
                                <LineChart countries={countries} countryId={el}/>
                            </Grid>
                        )
                    })
                }
            </Grid>
            }
        </div>
    )
}

export default React.memo(Charts)