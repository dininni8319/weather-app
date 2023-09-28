import classes from './SidebarWeatherDetail.module.css'

type Props = {
  weather: number[]
  minTempC: number
  maxTempC: number
  place: string
  currentWeather: unknown
}
const api_id = import.meta.env.VITE_ID;
const api_secret = import.meta.env.VITE_SECRET;
const SidebarWeatherDetail = ({
  weather, 
  minTempC, 
  maxTempC, 
  place, 
  currentWeather
}: Props) => {
  return (
    <div className={classes['weather-detail']}>
      <h2 className='capitalize text-2xl'>{place?.length < 20 ? place : place?.slice(0, 25)}{"..."}</h2>
      <h2 className='text-5xl'>{weather && weather[0]  +'°'}</h2>
      <p className='capitalize py-1'>{currentWeather?.weatherPrimary}</p>
      <div className='flex'>
        <p className='capitalize pe-2'>Humidity: {currentWeather?.humidity}%</p>
        <p className='capitalize'>{currentWeather?.windSpeedKPH} kph</p>
      </div>
      <div className='flex'>
        <p className='pe-2'>H: {maxTempC}</p>
        <p>L: {minTempC}</p>
      </div>
      <div>
        {/* <img src={`http://api.aerisapi.com/${currentWeather?.icon}?&client_id=${api_id}&client_secret=${api_secret}`} alt="weather icon" /> */}
      </div>
    </div>
  )
}

export default SidebarWeatherDetail
