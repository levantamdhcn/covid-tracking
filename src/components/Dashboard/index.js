import React from 'react'
import { Grid,Typography,makeStyles } from '@material-ui/core'
import CountrySelector from './CountrySelector/index'
import Summary from './Summary/index'
import { TopTen } from './Summary/TopTen';
import { Table } from './TableStats';
import "@fontsource/roboto";
import moment from 'moment'
import { ThemeContext } from '../contexts/ThemeContext'
import { DotLoading } from '../DotLoading/index'

const useStyle = makeStyles({
  grid: (props) => ({
    width: '100%',
    margin: '0px',
    backgroundColor: props.theme.container.backgroundColor,
    marginTop: '70px',
    "& h3": {
      color: props.theme.item.iconColor,
      fontSize: '14px',
      display: 'flex',
      paddingBottom: '0px',
    },
  }),
  item: (props) => ({
    backgroundColor: props.theme.item.backgroundColor,
    padding: '0px',
    margin: '0px',
    boxShadow: '0 0 30px 0 rgb(82 63 105 / 5%);'
  }),
  span: {
    color: '#7B6FFF !important',
    fontWeight: 'bold',
    marginLeft: '10px',
  },
  fix: {
    paddingBottom: '0px !important',
  }
})

const Dashboard = ({ countries,handleOnChange,selectedCountryId,report,reportForHighLights,mapData }) => {
    const {theme} = React.useContext(ThemeContext)
    const [isLoading,setIsLoading] = React.useState(true)
    React.useEffect(() => {
      if (countries.length > 0) {
        setIsLoading(false)
      }
    },[countries])

  const classes = useStyle({ theme })
    return (
            <div>
              {
                isLoading ? <DotLoading/> :
                <Grid container spacing={3} className={classes.grid}>
                  <Grid item xs={12} className={classes.fix}>
                      <Typography component="h3">
                        Last Update: <span className={classes.span}>{moment().format('LLL')}</span>
                      </Typography>
                  </Grid>
                  
                  <Grid item xs={12} className={classes.countrySelector}>
                      <CountrySelector 
                        countries = {countries} 
                        handleOnChange={handleOnChange} 
                        value={selectedCountryId}
                        theme={theme}
                      />
                  </Grid>

                  <Grid item xs={12}>
                      <Summary 
                        report={report} 
                        reportForHighLights={reportForHighLights} 
                        selectedCountryId={selectedCountryId} 
                        data={countries}
                        theme={theme}
                        mapData={mapData}
                      />
                  </Grid>

                  <Grid item xs={12}>
                      <TopTen data={countries}/>
                  </Grid>

                  <Grid item xs={12}>
                      <Table data={countries}/>
                  </Grid>
              </Grid>
              }
            </div>
    )
}

export default React.memo(Dashboard)
