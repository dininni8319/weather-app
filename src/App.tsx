import { useState, useEffect } from 'react'
import classes from './App.module.css'
import SearchForm from './components/SearchForm'
import axios from 'axios'
import Card from './components/Card'


const App = () => {
  const api_id = import.meta.env.VITE_ID;
  const api_secret = import.meta.env.VITE_SECRET;
  const [city, setCity ] = useState('')
  const [ error, setError ] = useState()
  const [weather, setWeather] = useState({})
  
  useEffect(() => {
    if (city.length > 4) {
      const apiUrl = `http://api.aerisapi.com/observations/${city},wa?client_id=${api_id}&client_secret=${api_secret}`
      axios.get(apiUrl)
        .then(res => setWeather({...res.data.response.ob}))
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
