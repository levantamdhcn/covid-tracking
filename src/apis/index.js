import axios from 'axios'

export const getCountries = () => axios.get('https://corona.lmao.ninja/v3/covid-19/countries')

export const getReportByCountryForHighLights = (country) => axios.get(`https://corona.lmao.ninja/v3/covid-19/countries/${country}`)

export const getReportByCountry = (country) => axios.get(`https://api.covid19api.com/dayone/country/${country}`)
