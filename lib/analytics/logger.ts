import { appendFileSync, readFileSync, existsSync } from "fs";
import type { RawEvent } from "./types";

const LOG_PATH = "/tmp/analytics.jsonl";

export function appendEvent(event: Record<string, unknown>): void {
  try {
    const line = JSON.stringify(event) + "\n";
    appendFileSync(LOG_PATH, line, "utf-8");
  } catch {
    // fire-and-forget: logging failure should not break the app
  }
}

export function readAllEvents(): RawEvent[] {
  try {
    if (!existsSync(LOG_PATH)) return [];
    const content = readFileSync(LOG_PATH, "utf-8");
    return content
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => {
        try {
          return JSON.parse(line) as RawEvent;
        } catch {
          return null;
        }
      })
      .filter((e): e is RawEvent => e !== null);
  } catch {
    return [];
  }
}
