// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// import { 
//   api_id,
//   api_secret,
//   BASE_URL
//  } from '../utils';

//  const WeatherMap = () => {
//   const [map, setMap] = useState(null);

//   useEffect(() => {
//     var map = L.map('aerismap').setView([44.96, -93.27], 5);
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; OpenStreetMap contributors'
//     }).addTo(map);
//     L.tileLayer(`https://maps.aerisapi.com/[${api_id}]_[${api_secret}]/radar/{z}/{x}/{y}/current.png`, {
//         subdomains: '1234',
//         attribution: '&copy;AerisWeather',
//     }).addTo(map);
//     setMap(map);

//     // Fetch weather data from OpenWeatherMap
//     axios
//       .get(`${BASE_URL}/weather?q=YOUR_CITY&appid=${api_secret}`)
//       .then((response) => {
//         const weatherData = response.data;
//         console.log("🚀 ~ file: WeatherMap.tsx:26 ~ .then ~ weatherData:", weatherData)

//         // Process the weather data and customize your map
//         // For example, add markers or overlays to display weather information
//       })
//       .catch((error) => {
//         console.error('Error fetching weather data:', error);
//       });
//   }, []);

//   return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
// };

// export default WeatherMap;