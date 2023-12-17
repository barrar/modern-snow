import SnowForecast from '../components/SnowForecast';
import dayjs from "dayjs"

const maxLength = 18

async function getWeatherData() {
  const res = await fetch(
    'https://api.weather.gov/gridpoints/PDT/23,40',
    {
      headers: { 'user-agent': '(modernsnow.com, contact@modernsnow.com)' }
    }
  )
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()

  const snowfallAmount = data.properties.snowfallAmount.values
  const values: number[] = Array.from(snowfallAmount.map((x: { value: number; }) =>
    Math.round(x.value * 0.0393701 * 100) / 100
  ))
  const dates: string[] = Array.from(snowfallAmount.map((x: { validTime: string; }) =>
    dayjs(x.validTime.replace(/\/.*$/, "")).format("ddd ha")
  ))

  return { dates: dates.slice(0,maxLength), values: values.slice(0,maxLength) }
}

async function getWeatherDataOWM() {
  const res = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat=43.9793&lon=-121.6884&appid=ee0e5170eeccaeb3ba4adc21bd8ff6f2')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()

  const values: number[] = Array.from(data.list.map((x: { snow: { [x: string]: any; }; }) =>
    (x.snow?.['3h'] ?? 0) * 0.0393701
  ))
  const dates: string[] = Array.from(data.list.map((x: { dt: number; }) =>
    dayjs(x.dt * 1000).format("ddd ha")
  ))

  // Combine to create 6 hour blocks instead of 3 hour blocks
  let newValues = []
  let newDates = []
  for (let i = 0; i < values.length - 2; i += 2) {
    let newValue = values[i] + values[i + 1]
    newValues.push(Math.round(newValue * 100) / 100)
    newDates.push(dates[i])
  }


  return { dates: newDates.slice(0,maxLength), values: newValues.slice(0,maxLength) }
}

export default async function Page() {
  const weatherData = await getWeatherData()


  const weatherDataOWM = await getWeatherDataOWM()


  return (
    <div className="grow p-10 max-h-96">
      <h1>Snowfall Forecast</h1>
      <h2>api.weather.gov</h2>
      <SnowForecast data={weatherData} />
      <h2>api.openweathermap.org</h2>
      <SnowForecast data={weatherDataOWM} />
    </div>
  )
}
