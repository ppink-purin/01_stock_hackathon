import { appendEvent } from "@/lib/analytics/logger";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let event: Record<string, unknown>;

    if (contentType.includes("application/json")) {
      event = await req.json();
    } else {
      // sendBeacon sends as text/plain
      const text = await req.text();
      event = JSON.parse(text);
    }

    await appendEvent(event);
    return new Response("ok", { status: 200 });
  } catch {
    return new Response("bad request", { status: 400 });
  }
}
