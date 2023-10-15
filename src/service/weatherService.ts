import axios from 'axios'
import {
  api_id,
  api_secret,
  now,
  API_BASE_URL
} from '../utils';

export const fetchWeatherData = (cityOrLatLon: string, isLatLon = false) => {
  let apiUrl;
  
  if (isLatLon) {
    apiUrl = `${API_BASE_URL}${cityOrLatLon}?&from=now&to=+14hours&client_id=${api_id}&client_secret=${api_secret}`;
  } else {
    apiUrl = `${API_BASE_URL}${cityOrLatLon},wa?&from=${now}&to=+1day&limit=14&client_id=${api_id}&client_secret=${api_secret}`;
  }

  return axios.get(apiUrl);
};