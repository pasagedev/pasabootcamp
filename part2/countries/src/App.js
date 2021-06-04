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

const Countries = ({ countries }) => {
  if (countries.length > 10)
    return <div>To many matches, specify another filter</div>
  else if (countries.length === 1)
    return <CountryInformation country={countries[0]} />
  else
    return countries.map((country) => (
      <div key={country.numericCode}>{country.name}</div>
    ))
}

const App = () => {

  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleInputCountry = event => setCountryFilter(event.target.value)


  const filterCountries = countries.filter(({ name }) => (
    name.toLowerCase().includes(countryFilter.toLowerCase())
  ))

  return (
    <div>
      <CountrySearch inputValue={countryFilter} handleInput={handleInputCountry} />
      <Countries countries={filterCountries} />
    </div>
  )
}
export default App;
