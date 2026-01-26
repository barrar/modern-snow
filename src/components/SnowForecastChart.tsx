import CustomChart from "@/components/CustomChart";
import type { ForecastPoint } from "@/data/getWeatherData";
import type { TimeZoneId } from "@/data/timeZones";

type SnowForecastChartProps = {
  data: ForecastPoint[];
  timeZoneId: TimeZoneId;
};

export default function SnowForecastChart({
  data,
  timeZoneId,
}: SnowForecastChartProps) {
  return <CustomChart data={data} timeZone={timeZoneId} />;
}
