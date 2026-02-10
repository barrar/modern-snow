import { createClient } from "redis";
import type { ForecastLocation } from "../forecastLocations";

const CACHE_TTL_SECONDS = 4 * 60 * 60; // 4 hours

type RedisClient = ReturnType<typeof createClient>;

type CachedGridData = {
  data: unknown;
};

let redisClient: RedisClient | null = null;
let redisClientPromise: Promise<RedisClient | null> | null = null;

const getRedisClient = async (): Promise<RedisClient | null> => {
  const redisUrl = process.env.REDIS_ROSE_OCEAN_REDIS_URL;
  if (!redisUrl) return null;
  if (redisClient) return redisClient;
  if (!redisClientPromise) {
    const client = createClient({ url: redisUrl });
    redisClientPromise = client
      .connect()
      .then(() => {
        redisClient = client;
        return client;
      })
      .catch((error) => {
        redisClientPromise = null;
        console.warn("Failed to connect to Redis", error);
        return null;
      });
  }
  return redisClientPromise;
};

export const buildCacheKey = (location: ForecastLocation) =>
  `weather-grid:${location.gridpoints.office}:${location.gridpoints.x},${location.gridpoints.y}`;

export const readCachedGridData = async <T>(cacheKey: string): Promise<T | null> => {
  const client = await getRedisClient();
  if (!client) return null;
  try {
    const cached = await client.get(cacheKey);
    if (!cached) return null;
    const parsed = JSON.parse(cached) as CachedGridData | unknown;
    if (parsed && typeof parsed === "object" && "data" in parsed) {
      const payload = parsed as CachedGridData;
      if (payload.data == null) return null;
      return payload.data as T;
    }
    return parsed as T;
  } catch (error) {
    console.warn("Redis cache read failed", error);
    return null;
  }
};

export const writeCachedGridData = async (cacheKey: string, data: unknown) => {
  const client = await getRedisClient();
  if (!client) return;
  try {
    const payload: CachedGridData = { data };
    await client.set(cacheKey, JSON.stringify(payload), {
      expiration: { type: "EX", value: CACHE_TTL_SECONDS },
    });
  } catch (error) {
    console.warn("Redis cache write failed", error);
  }
};
