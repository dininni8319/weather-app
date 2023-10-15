export const api_id = import.meta.env.VITE_ID;
export const api_secret = import.meta.env.VITE_SECRET;
export const API_BASE_URL: string = import.meta.env.VITE_BASE_API
export const BASE_URL = import.meta.env.VITE_BASE_API_URL
export const CLOUD_ICONS = import.meta.env.VITE_CLOUD_ICONS
export const arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]

// getting an array of temperatures
export const getTempCelc = (weather: { periods?: { tempC?: number }[] }[]) => {
  const rangeWeather = weather?.map(el => el.periods?.map((el) => el?.tempC)) 
  return rangeWeather
}
// getting the current weather 
export const getWeatherNow = (weather: { periods?: { tempC?: number }[] }[]) => weather?.map((el) => el?.periods).flat(1)[0]

// getting the name of the city
export const place = (weather: { place: { name: string } }) => weather?.place.name

// getting the average temperature
export const averageTemp = (tempArr: number[]): number => {
  return tempArr?.reduce((total: number, curr: number) => total + curr, 0) / tempArr?.length
} 

export const now = new Date()

export const convertDate = (date: string) => {
  const newDate = new Date(date)
  return newDate.toLocaleString('en-US', { 
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: true,
    month: 'short',
    day: 'numeric', 
  })
}
