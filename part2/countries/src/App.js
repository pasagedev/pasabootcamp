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
const CountryInformation = ({ country }) => (
  <div>
    <h2>{country.name}</h2>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h3>languages</h3>
    <Languages languages={country.languages} />
    <Flag country={country} />
  </div>
)

const Countries = ({ countries, handleShowButton, countrySelected }) => {
  if (countrySelected !=='')
    return <CountryInformation country={countrySelected[0]} />
  if (countries.length > 10)
    return <div>To many matches, specify another filter</div>
  else if (countries.length === 1)
    return <CountryInformation country={countries[0]} />
  else
    return countries.map((country) => (
      <div key={country.numericCode}>
        {country.name}
        <button id={country.numericCode} onClick={handleShowButton}> show </button>
      </div>
    ))
}

const App = () => {

  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [countrySelected, setCountrySelected] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleInputCountry = event => {
    setCountryFilter(event.target.value)
    setCountrySelected('')
  }

  const showCountry = (event) => setCountrySelected(
    countries.filter(country => country.numericCode === event.target.id))

  const filterCountries = countries.filter(({ name }) => (
    name.toLowerCase().includes(countryFilter.toLowerCase())
  ))

  return (
    <div>
      <CountrySearch inputValue={countryFilter} handleInput={handleInputCountry} />
      <Countries countries={filterCountries} handleShowButton={showCountry} countrySelected={countrySelected} />
    </div>
  )
}
export default App;
