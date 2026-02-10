export const timeZoneIds = ["America/Los_Angeles", "America/Denver"] as const;

export type TimeZoneId = (typeof timeZoneIds)[number];
