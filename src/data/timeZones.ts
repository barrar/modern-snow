export const timeZoneOptions = [
  { id: "America/Los_Angeles", label: "Pacific Standard Time" },
  { id: "America/Denver", label: "Mountain Standard Time" },
  { id: "America/Chicago", label: "Central Standard Time" },
  { id: "America/New_York", label: "Eastern Standard Time" },
  { id: "America/Anchorage", label: "Alaska Standard Time" },
  { id: "Pacific/Honolulu", label: "Hawaii Standard Time" },
] as const;

export type TimeZoneId = (typeof timeZoneOptions)[number]["id"];
export type TimeZoneOption = (typeof timeZoneOptions)[number];

export const defaultTimeZoneId: TimeZoneId = timeZoneOptions[0].id;

export const resolveTimeZoneId = (value?: string | string[]) => {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (candidate && timeZoneOptions.some((option) => option.id === candidate)) {
    return candidate as TimeZoneId;
  }
  return defaultTimeZoneId;
};
