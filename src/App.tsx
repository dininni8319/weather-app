import { useState, useEffect } from 'react'
import classes from './App.module.css'
import SearchForm from './components/SearchForm'
import axios from 'axios'
import Card from './components/Card'
import SidebarWeatherDetail from './components/SidebarWeatherDetail'

const App = () => {
  const api_id = import.meta.env.VITE_ID;
  const api_secret = import.meta.env.VITE_SECRET;
  const [city, setCity ] = useState('')
  const [ error, setError ] = useState()
  const [ weather, setWeather ] = useState([])
  const [ location, setLocation ] = useState({})
  console.log("🚀 ~ file: App.tsx:15 ~ App ~ location:", location)
  console.log("🚀 ~ file: App.tsx:14 ~ App ~ weather:", weather)
  
  const handleGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      })
    } else{
       alert('Geolocation is not supported by this browser.')
    }
  }
  // getting the name of the city
  const place: string = weather[0]?.place.name

  // getting an array of temperatures
  const getTempCelc = () => weather?.map(el => el?.periods?.map(el => el?.tempC)) 
  const getWeatherNow = () => weather?.map(el => el?.periods) 
  // getting the current weather
  const currentWeather = getWeatherNow().flat(1)[0]
  const tempArr = getTempCelc().flat(1)
  let minTempC: number, maxTempC: number
  const now = new Date()
  if (tempArr.length > 0) {
    minTempC = Math.min(...tempArr)
    maxTempC = Math.max(...tempArr)
  }
  
  // const averageTemp = tempArr?.reduce((total: number, curr: number) => total + curr, 0) / tempArr?.length
    
  useEffect(() => {
    handleGeoLocation()
    const apiUrl = `https://api.aerisapi.com/conditions/${location.lat},${location.lon}?&from=${now}&to=+1day&limit=24&client_id=${api_id}&client_secret=${api_secret}`
    axios.get(apiUrl)
      .then(res =>  setWeather([...res.data.response]))
      .catch(err => {
        setError(err)
        console.log(err)
    }) 
  },[])
  
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
