import { useState } from 'react'

type Geolocation = {
  lat: number
  lon: number
}

const useGeolocation = () => {
  const [ location, setLocation ] = useState<{location: Geolocation} | unknown>({})
  
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
  return { 
    handleGeoLocation,
    location
   }
}

export default useGeolocation;
