import { useContext } from 'react'
import classes from './SidebarWeatherDetail.module.css'
import { convertDate } from '../utils'
import { ThemeContext }  from '../Context/ThemeContext'
import { CurrentWeather } from '../application-types'

type Props = {
  weather: number[]
  minTempC: number
  maxTempC: number
  place: string
  currentWeather: CurrentWeather
}

const SidebarWeatherDetail = ({
  weather, 
  minTempC, 
  maxTempC, 
  place, 
  currentWeather
}: Props) => {

  const theme = useContext(ThemeContext)

  return (
    <div className={classes['weather-detail']}>
      <div className={`${theme?.isDarkMode ? 'bg-[#ACC9DD] p-3 rounded-md text-black text-center' : "bg-white p-3 rounded-md text-center"}`}>
          <h2 className='capitalize text-2xl'>{place?.length < 20 ? place : place?.slice(0, 12)}{"..."}</h2>
          <h2 className='text-5xl'>{weather && currentWeather.tempC  +'°'}</h2>
          <div className='flex'>
            <p className='capitalize pe-2'>Humidity: {currentWeather.humidity}%</p>
            <p className='capitalize'>{currentWeather.windSpeedKPH} kph</p>
          </div>
          <div className='flex w-full'>
            <p className='px-5'>H: {maxTempC}</p>
            <p>L: {minTempC}</p>
          </div>
          <div>
            <p>{convertDate(currentWeather.dateTimeISO)} </p>
          </div>
          <div className='flex justify-center'>
            <img src={`../../public/weather-icons/${currentWeather.icon}`} alt="weather icon" />
          </div>
      </div>
    </div>
  )
}

export default SidebarWeatherDetail
       