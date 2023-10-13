import { useState, useEffect } from 'react'
import classes from './App.module.css'
import SearchForm from './components/SearchForm'
import Card from './components/Card'
import SidebarWeatherDetail from './components/SidebarWeatherDetail'
import useGeolocation from './hooks/useGeolocation'
import { fetchWeatherData } from './weatherService'
import {
  getTempCelc,
  getWeatherNow,
  place,
  arr,
  api_id,
  api_secret
} from './utils';
import LoadingSkeleton from './components/LoadingSkeletonWeatherDetail'
import LoadingSkeletonCard from './components/LoadingSkeletonCards'
import { useTheme } from './hooks/useTheme'
import darkImg from './components/assets/night-mode.svg'
import lightImg from './components/assets/light-mode.svg'
import WeatherMap from './components/WeatherMap'

const App = () => {
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState([]);
  const { isDarkMode, toggleTheme } = useTheme()
  const { location, handleGeoLocation } = useGeolocation();
  const namePlace = place(weather)

  useEffect(() => {
    handleGeoLocation();
    if (location.lat && location.lon) {
      fetchWeatherData(`${location.lat},${location.lon}`, true)
        .then((res) => setWeather([...res.data.response]))
        .catch((err) => {
          setError(err);
          console.error(err);
        });
    }
  }, [location.lat, location.lon]);

  useEffect(() => {
    if (city.length > 2) {
      fetchWeatherData(city)
        .then((res) => setWeather([...res.data.response]))
        .catch((err) => {
          setError(err);
          console.error(err);
        });
    }
  }, [city]);

  const tempArr = getTempCelc(weather);
  const currentWeather = getWeatherNow(weather);
  const minTempC = tempArr.length > 0 ? Math.min(...tempArr) : undefined;
  const maxTempC = tempArr.length > 0 ? Math.max(...tempArr) : undefined;

  return (
    <div className={classes.container}>
      <div className={`${isDarkMode ? classes['dark-theme'] : classes['light-theme']}`}>
        <div className={`${classes.background}`}>
          <div className={classes["col-2"]}>
            <SearchForm city={city} setCity={setCity} />
            <div className="w-full sm:h-40 md:h-96 flex flex-col justify-center items-center">
              {currentWeather ? <SidebarWeatherDetail
                weather={tempArr}
                minTempC={minTempC}
                maxTempC={maxTempC}
                place={namePlace}
                currentWeather={currentWeather}
              /> : <LoadingSkeleton />
              }
            </div>
            <img
              src={`https://maps.aerisapi.com/${api_id}_${api_secret}/flat,radar,admin/300x200/minneapolis,mn,5/current.png`}
              style={{ width: "300px", height: "200px" }}
              alt="Weather Map"
            />

            {/* <WeatherMap /> */}
          </div>
          <div className='w-full'>
            <div className='flex justify-center md:justify-end w-full'>
                <button onClick={toggleTheme} className='mt-2 sm:ms-2 md:pe-5'>
                  <img 
                    src={isDarkMode ? lightImg : darkImg } 
                    alt="icon image" 
                  />
                </button>
            </div>
            <h2 className={`sm:text-xl md:text-3xl py-3 text-center`}>Weather Prediction in the next 15 Hours</h2>
            <div className={classes["col-8"]}>
                {
                  weather[0] ?  weather[0].periods?.map((item: unknown, index: number) => (
                    <Card
                      key={index}
                      weather={item}
                      place={namePlace}
                      error={error}
                    /> 
                  )) : arr.map((items: number) => <LoadingSkeletonCard />)
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
