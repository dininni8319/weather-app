export const api_id = import.meta.env.VITE_ID;
export const api_secret = import.meta.env.VITE_SECRET;

// getting an array of temperatures
export const getTempCelc = (weather: unknown) => {
  const rangeWeather = weather?.map(el => el?.periods?.map((el: unknown) => el?.tempC)).flat(1) 
  return rangeWeather
}
// getting the current weather 
export const getWeatherNow = (weather: unknown) => weather?.map((el: unknown )=> el?.periods).flat(1)[0]

// getting the name of the city
export const place = (weather: unknown) => weather[0]?.place.name

// getting the average temperature
export const averageTemp = (tempArr: number[]): number => {
  return tempArr?.reduce((total: number, curr: number) => total + curr, 0) / tempArr?.length
} 

export const API_BASE_URL: string = import.meta.env.VITE_BASE_API

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
