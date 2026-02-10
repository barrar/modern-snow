import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(duration);

export const parseNumber = (value: number | string | null | undefined) => {
  if (value == null) return null;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return null;
  const matches = value.match(/-?\d+(\.\d+)?/g);
  if (!matches) return null;
  const numbers = matches.map((match) => Number(match)).filter((number) => Number.isFinite(number));
  if (!numbers.length) return null;
  if (numbers.length >= 2) {
    return (numbers[0] + numbers[1]) / 2;
  }
  return numbers[0];
};

export const mmToInches = (millimeters: number | string | null | undefined) => {
  const numeric = parseNumber(millimeters);
  if (numeric == null) return 0;
  return Math.round(numeric * 0.0393701 * 100) / 100;
};

export const parseInterval = (validTime: string) => {
  const [start, endOrDuration] = validTime.split("/");
  if (!endOrDuration) return { start, end: start };
  if (endOrDuration.startsWith("P")) {
    const end = dayjs.utc(start).add(dayjs.duration(endOrDuration)).toISOString();
    return { start, end };
  }
  return { start, end: endOrDuration };
};

export const intervalStart = (validTime: string) => parseInterval(validTime).start;

export const cToF = (celsius: number | null) =>
  celsius == null ? null : Math.round(((celsius * 9) / 5 + 32) * 10) / 10;

export const kmhToMph = (kmh: number | null) => (kmh == null ? null : Math.round(kmh * 0.621371 * 10) / 10);

export const fillNearest = (times: string[], values: Array<number | null>) => {
  if (!values.length) return values;
  const timeMs = times.map((time) => dayjs.utc(time).valueOf());
  const prevValue: Array<number | null> = new Array(values.length).fill(null);
  const prevTime: Array<number | null> = new Array(values.length).fill(null);
  let lastValue: number | null = null;
  let lastTime: number | null = null;
  values.forEach((value, idx) => {
    if (value != null) {
      lastValue = value;
      lastTime = timeMs[idx];
    }
    prevValue[idx] = lastValue;
    prevTime[idx] = lastTime;
  });

  const nextValue: Array<number | null> = new Array(values.length).fill(null);
  const nextTime: Array<number | null> = new Array(values.length).fill(null);
  let upcomingValue: number | null = null;
  let upcomingTime: number | null = null;
  for (let idx = values.length - 1; idx >= 0; idx -= 1) {
    if (values[idx] != null) {
      upcomingValue = values[idx];
      upcomingTime = timeMs[idx];
    }
    nextValue[idx] = upcomingValue;
    nextTime[idx] = upcomingTime;
  }

  return values.map((value, idx) => {
    if (value != null) return value;
    const previous = prevValue[idx];
    const next = nextValue[idx];
    if (previous == null && next == null) return null;
    if (previous == null) return next;
    if (next == null) return previous;
    const prevDistance = timeMs[idx] - (prevTime[idx] ?? timeMs[idx]);
    const nextDistance = (nextTime[idx] ?? timeMs[idx]) - timeMs[idx];
    return prevDistance <= nextDistance ? previous : next;
  });
};
