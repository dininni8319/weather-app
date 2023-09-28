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


const App = () => {
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState([]);
  
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
          <div className="w-full h-96 flex flex-col justify-center">
            <SidebarWeatherDetail
              weather={tempArr}
              minTempC={minTempC}
              maxTempC={maxTempC}
              place={namePlace}
              currentWeather={currentWeather}
            />
          </div>
        </div>
        <div className={classes["col-8"]}>
           {
            weather[0]?.periods?.map((item, index) => (
              <Card
                key={index}
                weather={item}
                place={namePlace}
                error={error}
              />
            ))
           }
        </div>
      </div>
    </div>
  );
};

export default App;
