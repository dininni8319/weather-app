import classes from './Card.module.css'

type Props = { 
  weather: unknown
  error: any
  place: string
}

const Card = ({ weather, error, place }: Props) => {
  
  return (
    <div className={classes.card}>
      {error && <p className={classes.error}>{error}</p>}
      {weather && (
        <div className={classes['card-detail']}>
          <h2 className={classes.location}>{place.toLocaleUpperCase()}</h2>
          <h3 className={classes.weather}>{weather?.weather}</h3>
          <h4 className={classes.wind}>{weather?.tempC} {"°"}</h4>
          <br/>
          <p className={classes.humidity}>{weather?.humidity}%</p>
          {/* {<ul>{Object.keys(weather).map((key) => (<li key={key}>{`${key}: ${weather[key] }`}</li>))}</ul> } */}
        </div>
      )}
    </div>
  )
}

export default Card