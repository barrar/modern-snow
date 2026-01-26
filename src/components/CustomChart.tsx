import type { ForecastPoint } from "@/data/getWeatherData";
import type { TimeZoneId } from "@/data/timeZones";
import CustomChartClient from "@/components/CustomChartClient";

type CustomChartProps = {
  data: ForecastPoint[];
  timeZone: TimeZoneId;
};

export default function CustomChart({ data, timeZone }: CustomChartProps) {
  return <CustomChartClient data={data} timeZone={timeZone} />;
}
