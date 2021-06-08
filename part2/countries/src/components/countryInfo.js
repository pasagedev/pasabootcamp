import {CityWeather} from './weatherInfo.js'

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

export const CountryInformation = ({ countries, handleShowButton, countrySelected, cityWeather }) => {
    if (countries.length > 10)
        return <div>To many matches, specify another filter</div>
    else if (countrySelected !== '')
        return <CountryDetail country={countrySelected} cityWeather={cityWeather} />
    else
        return <CountriesList countries={countries} handleShowButton={handleShowButton} />
}