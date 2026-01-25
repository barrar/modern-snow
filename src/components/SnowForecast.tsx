import type { ForecastLocationId } from "../data/forecastLocations";
import { getWeatherData } from "../data/getWeatherData";
import type { TimeZoneId } from "../data/timeZones";
import CustomChart from "./CustomChart";

type SnowForecastProps = {
  locationId?: ForecastLocationId;
  timeZoneId: TimeZoneId;
};

export default async function SnowForecast({
  locationId,
  timeZoneId,
}: SnowForecastProps) {
  const data = await getWeatherData(locationId);

  return <CustomChart data={data} timeZone={timeZoneId} />;
}
