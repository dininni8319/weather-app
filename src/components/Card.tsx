import classes from './Card.module.css'
import { convertDate } from '../utils'

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
          <h2 className='uppercase p-1'>{place.slice(0,10)}</h2>
          <h3 className={classes.weather}>{weather.weather}</h3>
          <h4 className={classes.wind}>{weather.tempC} {"°"}</h4>
          <p>{convertDate(weather.dateTimeISO)} </p>
          <img src={`../../public/weather-icons/${weather.icon}`} alt="weather icon" />
          <br/>
        </div>
      )}
    </div>
  )
}

export default Card