import CustomChart from './CustomChart'
import { getWeatherData } from '../data/getWeatherData'

// Server component to load data and pass to client component
// Allows for suspense in parent component
// Data is streamed durring initial request
export default async function SnowForecast() {
    const data = await getWeatherData()

    return (
        <CustomChart data={data} />
    );
}