import { useState, useEffect } from 'react'
import axios from 'axios'
import { GEOCODE_KEYS } from '../utils'

const useCityCoordinates = (cityName: string) => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 })

  useEffect(() => {
    const handleGetCoordinates = async () => {
      try {
          if (cityName.length > 2) {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${GEOCODE_KEYS}`
            );
            console.log("🚀 ~ file: useCityCoordinates.ts:19 ~ handleGetCoordinates ~ location:", response)
      
            if (response.data.results.length > 0) {
              
              const location = response.data.results[0].loc;
              setCoordinates(
                {
                  lat : location.lat, 
                  lon: location.lng
                }
              )
            } else {
              setCoordinates({ lat: 0, lon: 0 })
            }
          }
      } catch (error) {
        console.error('Error fetching geolocation:', error)
      }
    };
    handleGetCoordinates()
  },[cityName])
  return { coordinates }
}

export default useCityCoordinates
