const WeatherDetail = ({ current }) => (
    <div>
        <div><strong>temperature </strong>{current.temperature} º Celcius</div>
        <img
            src={current.weather_icons[0]}
            alt={`weather representation of ${current.name}`}
            width={50} height={50}
        />
        <div><strong>wind </strong>{current.wind_speed} km/h with direction {current.wind_dir}</div>
    </div>
)

export const CityWeather = ({ cityWeather }) => {
    console.log(cityWeather)
    if (cityWeather === '')
        return <div>Not information to show</div>
    else {
        const { current } = cityWeather
        return <WeatherDetail current={current} />
    }
}