import { useState, 
  useEffect, 
  useContext 
} from 'react'
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
  arr
} from './utils';
import LoadingSkeleton from './components/LoadingSkeletonWeatherDetail'
import LoadingSkeletonCard from './components/LoadingSkeletonCards'
import { ThemeContext } from './Context/ThemeContext'
import darkImg from './components/assets/night-mode.svg'
import lightImg from './components/assets/light-mode.svg'
import WeatherMap from './components/WeatherMap'
import LoadingMapSkeleton from './components/LoadingMapSkeleton'
import { CurrentWeather } from './application-types'
import { 
  IWeather, 
  ILocation, 
  Periods, 
  Place
} from './application-types'


const App = () => {
  const [city, setCity] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [weatherData, setWeatherData] = useState<{ periods?: unknown[] }[]>([]);
  const theme = useContext(ThemeContext)
  const { location, handleGeoLocation } = useGeolocation();
  const namePlace = place(weatherData[0] as Place)

  const checkLocation = location && (
    typeof location === 'object' && 'lat' in location
  )

  useEffect(() => {
    handleGeoLocation();
      fetchWeatherData(
        `${(location as ILocation).lat},${(location as ILocation).lon}`, 
        true
      )
        .then((res) => setWeatherData(res.data.response))
        .catch((err) => {
          setError(err);
          console.error(err);
        });
      //@ts-ignore
  }, [location.lat, location.lon, city]);
  
  useEffect(() => {
      if (city.length > 2) {
        fetchWeatherData(city, false)
          .then((res) => setWeatherData(res.data.response))
          .catch((err) => {
            setError(err);
            console.error(err);
          });  
      }
  }, [city]);

  const tempArr = getTempCelc(weatherData as Periods[]);
  const currentWeather = getWeatherNow(weatherData as Periods[]);

  // @ts-ignore 
  const minTempC = tempArr.length > 0 ? Math.min(...tempArr) : undefined;
  // @ts-ignore 
  const maxTempC = tempArr.length > 0 ? Math.max(...tempArr) : undefined;

  return (
      <div className={classes.container}>
        <div className={`${theme?.isDarkMode ? classes['dark-theme'] : classes['light-theme']}`}>
          <div className={`${classes.background}`}>
            <div className={classes["col-2"]}>
              <SearchForm 
                city={city} 
                setCity={setCity} 
              />
              <div className="w-full sm:h-50 md:h-96 flex flex-col justify-center items-center">
                {currentWeather ? ( 
                    <SidebarWeatherDetail
                      // @ts-ignore 
                      weather={tempArr as number[]}
                      minTempC={minTempC as number}
                      maxTempC={maxTempC as number}
                      place={namePlace}
                      currentWeather={currentWeather as CurrentWeather}
                    />
                  ) : <LoadingSkeleton />
                }
              </div>
              {checkLocation ? 
                <WeatherMap location={location as ILocation} /> : 
                <LoadingMapSkeleton />
              }
            </div>
            <div className='w-full'>
              <div className='flex justify-center md:justify-end w-full'>
                  <button onClick={theme?.toggleTheme} className='mt-2 sm:ms-2 md:pe-5'>
                    <img 
                      src={theme?.isDarkMode ? lightImg : darkImg } 
                      alt="icon image" 
                    />
                  </button>
              </div>
              <h2 className={`sm:text-xl md:text-2xl py-3 text-center`}>
                Weather Prediction in the next 15 Hours
              </h2>
              <div className={classes["col-8"]}>
                  {
                    weatherData[0] ?  weatherData[0].periods?.map((
                      item: unknown, 
                      index: number
                    ) => (
                      <Card
                        key={index}
                        weather={item as IWeather}
                        place={namePlace}
                        error={error as  string | null}
                      /> 
                    )) : arr.map(() => <LoadingSkeletonCard />)
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default App;
    