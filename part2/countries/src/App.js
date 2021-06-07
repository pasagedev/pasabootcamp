import axios from 'axios'
import react, { useEffect } from 'react'
import { useState } from 'react'

const CountrySearch = ({ inputValue, handleInput }) => (
  <div>
    find countries: <input onChange={handleInput} value={inputValue} />
  </div>
)

const Flag = ({ country }) => (
  <img
    src={country.flag}
    alt={`flag of ${country.name}`}
    width={150} height={100}
  />
)

const Languages = ({ languages }) => (
  <ul>
    {languages.map(language =>
      <li key={language.name}>
        {language.name}
      </li>)
    }
  </ul>
)

const CityWeather = ({ cityWeather }) => (
  (cityWeather !== '' )
  ? <div>{cityWeather.error.info}</div>
  : <div>Not information to show</div>
)

const CountryDetail = ({ country, cityWeather }) => (
  <div>
    <h2>{country.name}</h2>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h3>languages</h3>
    <Languages languages={country.languages} />
    <Flag country={country} />
    <h3>wheather in {country.capital}</h3>
    <CityWeather cityWeather={cityWeather} />
  </div>
)

const CountriesList = ({ countries, handleShowButton }) => (
  countries.map((country) => (
    <div key={country.numericCode}>
      {country.name}
      <button id={country.numericCode} onClick={handleShowButton}> show </button>
    </div>
  ))
)

const CountryInformation = ({ countries, handleShowButton, countrySelected, cityWeather }) => {
  if (countries.length > 10)
    return <div>To many matches, specify another filter</div>
  else if (countrySelected !== '')
    return <CountryDetail country={countrySelected} cityWeather={cityWeather} />
  else
    return <CountriesList countries={countries} handleShowButton={handleShowButton} />
}


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
  }

  const handleShowButton = (event) => setCountrySelected(
    countriesFiltered.filter(country => country.numericCode === event.target.id)[0])

  if (countriesFiltered.length === 1 && countrySelected === '')
    setCountrySelected(countriesFiltered[0])

  if (countrySelected !== '' && cityWeather === '')
    requestWeather(countrySelected.city)

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
