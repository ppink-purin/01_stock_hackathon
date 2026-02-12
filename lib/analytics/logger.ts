import { Redis } from "@upstash/redis";
import type { RawEvent } from "./types";

const REDIS_KEY = "analytics:events";
const MAX_EVENTS = 10_000; // 오래된 이벤트 자동 정리

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  redis = new Redis({ url, token });
  return redis;
}

export async function appendEvent(
  event: Record<string, unknown>,
): Promise<void> {
  try {
    const r = getRedis();
    if (!r) return;
    const line = JSON.stringify(event);
    await r.lpush(REDIS_KEY, line);
    // 최대 건수 초과 시 오래된 이벤트 자동 삭제
    await r.ltrim(REDIS_KEY, 0, MAX_EVENTS - 1);
  } catch {
    // fire-and-forget: logging failure should not break the app
  }
}

export async function readAllEvents(): Promise<RawEvent[]> {
  try {
    const r = getRedis();
    if (!r) return [];
    const items: string[] = await r.lrange(REDIS_KEY, 0, -1);
    // LPUSH 로 저장했으므로 최신이 앞에 있음 → 시간순으로 뒤집기
    const events = items
      .reverse()
      .map((line) => {
        try {
          return (typeof line === "string" ? JSON.parse(line) : line) as RawEvent;
        } catch {
          return null;
        }
      })
      .filter((e): e is RawEvent => e !== null);
    return events;
  } catch {
    return [];
  }
}
