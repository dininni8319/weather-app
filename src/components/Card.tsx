import classes from './Card.module.css'

// type Props = {}{}: Props

const Card = ({ weather, error }) => {
  return (
    <div className={classes.card}>
      {error && <p className={classes.error}>{error}</p>}
      {weather && (
        <>
          <p className={classes.location}>{weather?.place?.name}</p>
          <p className={classes.temp}>{weather?.tempF}°</p>
          <p className={classes.weather}>{weather?.weather}</p>
          <p className={classes.wind}>{weather?.windSpeedMPH} mph</p>
          <img src="https://www.pngitem.com/pimgs/m/152-1524736_weather-icon-png-transparent-png.png" />
          <br/>
          <p className={classes.humidity}>{weather?.humidity}%</p>
          {<ul>{Object.keys(weather).map((key) => (<li key={key}>{`${key}: ${weather[key] }`}</li>))}</ul> }
        </>
      )}
    </div>
  )
}

export default Card