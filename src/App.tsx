import { useState, useEffect } from 'react';
import classes from './App.module.css';
import SearchForm from './components/SearchForm';
import Card from './components/Card';
import SidebarWeatherDetail from './components/SidebarWeatherDetail';
import useGeolocation from './hooks/useGeolocation';
import { fetchWeatherData } from './weatherService';
import {
  getTempCelc,
  getWeatherNow,
  place,
} from './utils';
import LoadingSkeleton from './components/LoadingSkeletonWeatherDetail';
import LoadingSkeletonCard from './components/LoadingSkeletonCards';

const App = () => {
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState([]);
  const arr = [0,1,2,3,4,5,6,7,8,9,10,11]
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
      <div className={classes.background}>
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
        </div>
        <div className='w-full text-center'>
          <h2 className='text-white sm:text-xl md:text-2xl py-5'>Weather Prediction in the next 15 Hours</h2>
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
  );
};

export default App;
