import classes from './Card.module.css'

// type Props = {}{}: Props

const Card = ({ weather, error }) => {
  return (
    <div className={classes.card}>
      {error && <p className={classes.error}>{error}</p>}
      {weather && (
        <>
          <h1>National Weather</h1>
          <p className={classes.location}>{weather?.place?.name}</p>
          {/* <p className={classes.temp}>{weather?.tempF}°</p> */}
          <h2 className={classes.weather}>{weather?.weather}</h2>
          <p className={classes.wind}>{weather?.windSpeedMPH} mph</p>
          <br/>
          <p className={classes.humidity}>{weather?.humidity}%</p>
          {<ul>{Object.keys(weather).map((key) => (<li key={key}>{`${key}: ${weather[key] }`}</li>))}</ul> }
        </>
      )}
    </div>
  )
}

export default Card