import classes from './Card.module.css'
import { convertDate } from '../utils'
import { ThemeContext } from '../Context/ThemeContext'
import { useContext } from 'react'

export type Props = { 
  weather: {
    weather: string
    tempC: number
    dateTimeISO: string
    icon: string
  } | null
  error: string | null
  place: string
}

const Card = ({ weather, error, place }: Props) => {
  const theme = useContext(ThemeContext)
  
  return (
    <div className={classes.card}>
      {error && <p className={classes.error}>{error}</p>}
      {weather && (
        <div className={`${classes['card-detail']} ${theme?.isDarkMode ? '' : 'bg-green-700 p-2'}`}>
          <h2 className='uppercase p-1'>{place.slice(0,10)}</h2>
          <h3 className={classes.weather}>{weather.weather}</h3>
          <h4>{weather.tempC} {"°"}</h4>
          <p>{convertDate(weather.dateTimeISO)} </p>
          <img src={`../../public/weather-icons/${weather.icon}`} alt="weather icon" />
          <br/>
        </div>
      )}
    </div>
  )
}

export default Card

  

