import React,{ useEffect,useState } from 'react'
import CountrySelector from './components/CountrySelector/index'
import HighLights from './components/Highlights/index'
import Summary from './components/Summary';
import { getCountries,getReportByCountry } from './apis/index'

const App = () => {
  const [selectedCountryId, setSelectedCountryId] = useState('')
  const [countries,setCountries] = useState([])
  const [report,setReport] = useState([])
  useEffect(()=> {
    getCountries()
      .then(res => {
        setCountries(res.data)
        setSelectedCountryId('vn')
      })
  },[])
  const handleOnChange = (e) => {
    setSelectedCountryId(e.target.value)
  }
  useEffect(() => {
    if (selectedCountryId) {
      const { Slug } = countries.find((country) => country.ISO2.toLowerCase() === selectedCountryId)
      getReportByCountry(Slug)
      .then(res => {
        setReport(res.data)
      })
    }
  },[countries,selectedCountryId])
  return (
    <div className='app'>
      <CountrySelector countries = {countries} handleOnChange={handleOnChange} value={selectedCountryId}/>
      <HighLights report={report}/>
      <Summary report={report} selectedCountryId={selectedCountryId}/>
    </div>
  )
}

export default App;
