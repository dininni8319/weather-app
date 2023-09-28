import { useState, useEffect } from 'react'
import classes from './App.module.css'
import SearchForm from './components/SearchForm'
import axios from 'axios'
import Card from './components/Card'
import SidebarWeatherDetail from './components/SidebarWeatherDetail'
import useGeolocation from './hooks/useGeolocation'
import { 
  api_id, 
  api_secret, 
  getTempCelc, 
  getWeatherNow,
  place, now
} from './utils'


const App = () => {
  const [city, setCity ] = useState('')
  const [ error, setError ] = useState()
  const [ weather, setWeather ] = useState([])
  const { location, handleGeoLocation } = useGeolocation()

  // getting the current weather
  const currentWeather = getWeatherNow(weather)
  const tempArr = getTempCelc(weather)
  let minTempC: number, maxTempC: number

  if (tempArr.length > 0) {
    minTempC = Math.min(...tempArr)
    maxTempC = Math.max(...tempArr)
  }

  useEffect(() => {
    handleGeoLocation()
    if (location.lat && location.lon) {
      console.log('location', location.lat, location.lon);
      const apiUrl = `https://api.aerisapi.com/conditions/${location.lat},${location.lon}?&from=${now}&to=+1day&limit=24&client_id=${api_id}&client_secret=${api_secret}`
      axios.get(apiUrl)
        .then(res =>  setWeather([...res.data.response]))
        .catch(err => {
          setError(err)
          console.log(err)
      }) 
    }
  },[location.lat, location.lon])

  useEffect(() => {
    if (city.length > 4) {
      const apiUrl = `http://api.aerisapi.com/conditions/${city},wa?from=now&to=+12hours&client_id=${api_id}&client_secret=${api_secret}`
      axios.get(apiUrl)
        .then(res => setWeather([...res.data.response]))
        .catch(err => {
          setError(err)
          console.log(err)
        }) 
    }
  },[city])

  return (
    <div 
      className={classes.container} 
    >
      <div 
        className={classes.background}
      >
        <div className={classes["col-2"]}>
          <SearchForm 
            city={city}
            setCity={setCity}
          />
          <div className='w-full h-96 flex flex-col justify-center'>
            <SidebarWeatherDetail 
              weather={tempArr}
              minTempC={minTempC}
              maxTempC={maxTempC}
              place={place}
              currentWeather={currentWeather}
            />
          </div>
        </div>
        <div className={classes["col-8"]}>
          <Card 
            weather={weather}
            error={error}
          />
        </div>
      </div>
    </div>
  )
}

export default App
