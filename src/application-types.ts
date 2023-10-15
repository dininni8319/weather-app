export interface IWeather { 
  weather: string
  tempC: number
  dateTimeISO: string
  icon: string
  error: string | null
  place: string
}

export interface ILocation {
  lat: number
  lon: number
}

export type CurrentWeather = {
  humidity: number
  windSpeedKPH: number
  dateTimeISO: string
  icon: string
  weatherPrimary: string,
  tempC: number
}

export type Periods = { 
  periods?: { tempC?: number }[] 
}

export type Place = {place: { name: string }}
