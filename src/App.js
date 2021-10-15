import React,{ useEffect,useState } from 'react'
import { getCountries,getReportByCountry,getReportByCountryForHighLights } from './apis/index'
import { Grid, makeStyles } from '@material-ui/core'
import Dashboard from './components/Dashboard/index'
import { Header } from './components/Header/index'
import { Footer } from './components/Footer/index'
import Charts from './components/Charts/index'
import { ColorOptions } from './components/ColorOptions/index'
import ThemeContextProvider from './components/contexts/ThemeContext'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"; 

const useStyle = makeStyles({
  grid: {
    width: '100%',
    margin: '0px',
    backgroundColor: '#f7f8fc',
  },
  item: {
    backgroundColor: '#fff',
    padding: '0px',
    margin: '0px',
    boxShadow: '0 0 30px 0 rgb(82 63 105 / 5%);',
  },
  time: {
    color: 'rgba(0, 0, 0, 0.65)',
    fontSize: '14px',
    display: 'flex',
    paddingBottom: '0px',
  },
  span: {
    color: '#7B6FFF !important',
    fontWeight: 'bold',
    marginLeft: '10px',
  },
  fix: {
    paddingBottom: '0px !important',
  },
})

const App = () => {
  const [selectedCountryId, setSelectedCountryId] = useState('')
  const [countries,setCountries] = useState([])
  const [report,setReport] = useState([])
  const [reportForHighLights,setReportForHighLights] = useState([])
  useEffect(()=> {
    getCountries()
      .then(res => {
        setCountries(res.data)
        setSelectedCountryId('VN')
      })
  },[])
  const handleOnChange = (e) => {
    setSelectedCountryId(e.target.value)
  }

  useEffect(() => {
    if (selectedCountryId) {
      const { countryInfo } = countries.find((country) => country.countryInfo.iso2 === selectedCountryId)
      getReportByCountryForHighLights(countryInfo.iso2)
      .then(res => {
        setReportForHighLights(res.data)
      })
    }
  },[countries,selectedCountryId])

  useEffect(() => {
    if (selectedCountryId) {
      const { countryInfo } = countries.find((country) => country.countryInfo.iso2 === selectedCountryId)
      getReportByCountry(countryInfo.iso2)
      .then(res => {
        setReport(res.data)
      })
    }
  },[countries,selectedCountryId])

  const [mapData,setMapData] = React.useState({})
    React.useEffect(() => {
        if(selectedCountryId){
            import(
                `@highcharts/map-collection/countries/${selectedCountryId.toLowerCase()}/${selectedCountryId.toLowerCase()}-all.geo.json`
                ).then(res => {
                    setMapData(res)
                }) 
        }
    }, [selectedCountryId])
  
  const classes = useStyle()
  return (
    <div>
        {
          <ThemeContextProvider>
                <Router>
                  <Grid container spacing={3} className={classes.grid}>
                    <Header/>
                  </Grid>
                  <Switch>
                    <Route path='/chart' component={(props) =><Charts countries={countries}/>}/> 
                    <Route exact path='/' component={(props) => <Dashboard 
                      countries={countries}
                      selectedCountryId={selectedCountryId}
                      handleOnChange={handleOnChange}
                      report={report}
                      reportForHighLights={reportForHighLights}
                      mapData={mapData}
                    />} 
                    />
                  </Switch>
                    <Grid item xs={12}>
                      <Footer />
                    </Grid>
                    <Grid>
                      <ColorOptions />
                    </Grid>
              </Router>
        </ThemeContextProvider>
        }
    </div>
  )
}

export default App;
