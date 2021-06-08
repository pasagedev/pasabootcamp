import axios from 'axios'
import react, { useEffect } from 'react'
import { useState } from 'react'
import {CountryInformation} from './components/countryInfo.js'
import {CountrySearch} from './components/countrySearch.js'
const App = () => {

  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [countrySelected, setCountrySelected] = useState('')
  const [cityWeather, setCityWeather] = useState('')

  const requestWeather = (city) => {
    const api_key = process.env.REACT_APP_API_KEY
    const params = {
      access_key: api_key,
      query: city
    }
    axios.get(`http://api.weatherstack.com/current?`, { params })
      .then(response => setCityWeather(response.data))
  }

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const countriesFiltered = countries.filter(({ name }) => (
    name.toLowerCase().includes(countryFilter.toLowerCase())
  ))

  const handleInputCountry = event => {
    setCountryFilter(event.target.value)
    setCountrySelected('')
    setCityWeather('')
  }

  const handleShowButton = (event) => setCountrySelected(
    countriesFiltered.filter(country => country.numericCode === event.target.id)[0])

  if (countriesFiltered.length === 1 && countrySelected === '')
    setCountrySelected(countriesFiltered[0])

  if (countrySelected !== '' && cityWeather === '')
    requestWeather(countrySelected.capital)

  return (
    <div>
      <CountrySearch inputValue={countryFilter} handleInput={handleInputCountry} />
      <CountryInformation
        countries={countriesFiltered}
        handleShowButton={handleShowButton}
        countrySelected={countrySelected}
        cityWeather={cityWeather}
      />
    </div>
  )
}
export default App;
