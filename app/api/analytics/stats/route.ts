import { readAllEvents } from "@/lib/analytics/logger";
import { computeStats } from "@/lib/analytics/stats";

export async function GET() {
  const events = await readAllEvents();
  const stats = computeStats(events);
  return Response.json(stats);
}
