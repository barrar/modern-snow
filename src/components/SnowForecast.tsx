import type { ForecastLocationId } from '../data/forecastLocations'
import { getWeatherData } from '../data/getWeatherData'
import CustomChart from './CustomChart'

type SnowForecastProps = {
    locationId?: ForecastLocationId
}

export default async function SnowForecast({ locationId }: SnowForecastProps) {
    const data = await getWeatherData(locationId)

    return (
        <CustomChart data={data} />
    )
}