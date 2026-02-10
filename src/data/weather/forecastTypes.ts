export type NOAAValue = { validTime: string; value: number | string | null };

export type ForecastPoint = {
  time: string;
  startTime: string;
  endTime: string;
  inches: number | null;
  precipInches: number | null;
  precipProbability: number | null;
  temperatureF: number | null;
  windMph: number | null;
  windGustMph: number | null;
  cloudCover: number | null;
  precipitationType: "snow" | "rain" | "none";
  hasFreshPowder: boolean;
  isBluebird: boolean;
  alert: "rain" | null;
};
