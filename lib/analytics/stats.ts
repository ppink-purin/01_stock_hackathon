import type { RawEvent } from "./types";

interface ToolStats {
  total: number;
  success: number;
  rate: number;
}

interface KPIStats {
  messagesPerSession: number;
  followupClickRate: number;
  toolCallSuccessRate: {
    overall: ToolStats;
    byTool: Record<string, ToolStats>;
  };
  avgSessionDurationMs: number;
  exampleUsageRate: number;
  totalSessions: number;
  totalEvents: number;
  recentEvents: RawEvent[];
}

export function computeStats(events: RawEvent[]): KPIStats {
  // ── Group events by session ──
  const sessions = new Map<string, RawEvent[]>();
  for (const e of events) {
    const sid = e.sessionId;
    if (!sid) continue;
    if (!sessions.has(sid)) sessions.set(sid, []);
    sessions.get(sid)!.push(e);
  }

  const totalSessions = sessions.size || 1; // avoid division by zero

  // ── KPI 1: Messages per session ──
  let interactionCount = 0;
  for (const e of events) {
    if (
      e.event === "message_send" ||
      e.event === "example_click" ||
      e.event === "followup_click"
    ) {
      interactionCount++;
    }
  }
  const messagesPerSession = interactionCount / totalSessions;

  // ── KPI 2: Follow-up click rate ──
  let followupClicks = 0;
  let responsesWithFollowups = 0;
  for (const e of events) {
    if (e.event === "followup_click") followupClicks++;
    if (
      e.event === "response_complete" &&
      typeof e.followupCount === "number" &&
      e.followupCount > 0
    ) {
      responsesWithFollowups++;
    }
  }
  const followupClickRate =
    responsesWithFollowups > 0
      ? (followupClicks / responsesWithFollowups) * 100
      : 0;

  // ── KPI 3: Tool call success rate (overall + by tool) ──
  const toolEvents = events.filter((e) => e.event === "tool_call");
  const byTool: Record<string, ToolStats> = {};

  let totalToolCalls = 0;
  let totalToolSuccess = 0;

  for (const e of toolEvents) {
    const name = (e.toolName as string) || "unknown";
    if (!byTool[name]) byTool[name] = { total: 0, success: 0, rate: 0 };
    byTool[name].total++;
    totalToolCalls++;
    if (e.success) {
      byTool[name].success++;
      totalToolSuccess++;
    }
  }

  for (const name of Object.keys(byTool)) {
    byTool[name].rate =
      byTool[name].total > 0
        ? (byTool[name].success / byTool[name].total) * 100
        : 0;
  }

  const overallToolRate =
    totalToolCalls > 0 ? (totalToolSuccess / totalToolCalls) * 100 : 0;

  // ── KPI 4: Average session duration ──
  const sessionDurations: number[] = [];
  for (const e of events) {
    if (
      e.event === "session_end" &&
      typeof e.durationMs === "number"
    ) {
      sessionDurations.push(e.durationMs);
    }
  }
  const avgSessionDurationMs =
    sessionDurations.length > 0
      ? sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length
      : 0;

  // ── KPI 5: Example usage rate ──
  const sessionsWithExample = new Set<string>();
  const activeSessions = new Set<string>();

  for (const e of events) {
    if (!e.sessionId) continue;
    if (
      e.event === "message_send" ||
      e.event === "example_click" ||
      e.event === "followup_click"
    ) {
      activeSessions.add(e.sessionId);
    }
    if (e.event === "example_click") {
      sessionsWithExample.add(e.sessionId);
    }
  }

  const activeCount = activeSessions.size || 1;
  const exampleUsageRate = (sessionsWithExample.size / activeCount) * 100;

  // ── Recent events (last 20) ──
  const recentEvents = events.slice(-20);

  return {
    messagesPerSession: Math.round(messagesPerSession * 100) / 100,
    followupClickRate: Math.round(followupClickRate * 100) / 100,
    toolCallSuccessRate: {
      overall: {
        total: totalToolCalls,
        success: totalToolSuccess,
        rate: Math.round(overallToolRate * 100) / 100,
      },
      byTool,
    },
    avgSessionDurationMs: Math.round(avgSessionDurationMs),
    exampleUsageRate: Math.round(exampleUsageRate * 100) / 100,
    totalSessions: sessions.size,
    totalEvents: events.length,
    recentEvents,
  };
}
