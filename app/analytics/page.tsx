"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

/* ── Types ── */
interface ToolStats {
  total: number;
  success: number;
  rate: number;
}

interface RawEvent {
  event: string;
  sessionId: string;
  timestamp: string;
  [key: string]: unknown;
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

/* ── Constants ── */
const POLL_INTERVAL = 30_000;

const TOOL_NAME_LABELS: Record<string, string> = {
  searchStock: "종목 검색",
  getStockPrice: "현재가 조회",
  getStockHistory: "시세 이력",
  getMarketIndex: "시장 지수",
  getExchangeRate: "환율 조회",
  searchNews: "뉴스 검색",
  getStockFinancials: "재무 정보",
};

const EVENT_BADGES: Record<string, { emoji: string; color: string }> = {
  session_start: { emoji: "🟢", color: "#4CAF50" },
  session_end: { emoji: "🔴", color: "#f44336" },
  message_send: { emoji: "💬", color: "#2196F3" },
  example_click: { emoji: "💡", color: "#FF9800" },
  followup_click: { emoji: "👆", color: "#9C27B0" },
  tool_call: { emoji: "🔧", color: "#607D8B" },
  response_complete: { emoji: "✅", color: "#4CAF50" },
  response_error: { emoji: "❌", color: "#f44336" },
  chat_reset: { emoji: "🧹", color: "#795548" },
  easter_egg_click: { emoji: "🥚", color: "#E91E63" },
};

/* ── Helpers ── */
function formatDuration(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return iso;
  }
}

function eventDetail(e: RawEvent): string {
  switch (e.event) {
    case "message_send":
      return `길이: ${e.messageLength ?? "?"}`;
    case "example_click":
    case "followup_click":
      return String(e.question ?? "").slice(0, 30);
    case "tool_call":
      return `${TOOL_NAME_LABELS[e.toolName as string] ?? e.toolName} ${e.success ? "성공" : "실패"}`;
    case "response_complete":
      return `도구 ${e.toolCallCount ?? 0}회, ${formatDuration(Number(e.durationMs) || 0)}`;
    case "response_error":
      return String(e.error ?? "").slice(0, 40);
    case "session_end":
      return `${formatDuration(Number(e.durationMs) || 0)}, ${e.messageCount ?? 0}건`;
    case "chat_reset":
      return `${e.messageCount ?? 0}건 대화 초기화`;
    default:
      return "";
  }
}

/* ── Components ── */

function KPICard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div
      className="rounded-2xl border-[2.5px] border-[#222] bg-white p-5"
      style={{ boxShadow: "2px 2px 0 #E8D5A3" }}
    >
      <p className="text-sm font-bold text-[#888] mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#222]">{value}</p>
      {sub && <p className="text-xs text-[#aaa] mt-1">{sub}</p>}
    </div>
  );
}

/* ── Page ── */
export default function AnalyticsPage() {
  const [data, setData] = useState<KPIStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/analytics/stats");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: KPIStats = await res.json();
      setData(json);
      setError(null);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "데이터를 불러올 수 없습니다");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh polling
  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(fetchData, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [autoRefresh, fetchData]);

  /* ── Render ── */
  return (
    <div className="min-h-dvh bg-surface">
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-6">
        {/* ── Header ── */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#222]">
              📊 Analytics Dashboard
            </h1>
            <p className="text-sm text-[#888] mt-1">
              주식내비 사용 통계 대시보드
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Auto-refresh toggle */}
            <button
              onClick={() => setAutoRefresh((v) => !v)}
              className="rounded-full border-2 border-[#222] px-3 py-1.5 text-sm font-bold transition-colors"
              style={{
                background: autoRefresh ? "#FFDD44" : "#fff",
                boxShadow: "1px 1px 0 #C93A25",
              }}
            >
              {autoRefresh ? "⏱ 자동 갱신 ON" : "⏸ 자동 갱신 OFF"}
            </button>

            {/* Manual refresh */}
            <button
              onClick={() => {
                setLoading(true);
                fetchData();
              }}
              className="rounded-full border-2 border-[#222] bg-white px-3 py-1.5 text-sm font-bold active:translate-x-px active:translate-y-px"
              style={{ boxShadow: "1px 1px 0 #C93A25" }}
            >
              🔄 새로고침
            </button>

            {/* Back to chat */}
            <Link
              href="/"
              className="rounded-full border-2 border-[#222] bg-[#E8452E] px-3 py-1.5 text-sm font-bold text-white active:translate-x-px active:translate-y-px"
              style={{ boxShadow: "1px 1px 0 #C93A25" }}
            >
              💬 챗봇으로
            </Link>
          </div>
        </header>

        {/* ── Loading state ── */}
        {loading && !data && (
          <div className="flex justify-center py-20">
            <div className="flex gap-2">
              <span className="thinking-dot inline-block h-3 w-3 rounded-full bg-[#E8452E]" />
              <span className="thinking-dot inline-block h-3 w-3 rounded-full bg-[#E8452E]" />
              <span className="thinking-dot inline-block h-3 w-3 rounded-full bg-[#E8452E]" />
            </div>
          </div>
        )}

        {/* ── Error state ── */}
        {error && (
          <div
            className="mb-6 rounded-2xl border-[2.5px] border-[#f44336] bg-[#FFF0F0] p-4 text-center text-sm text-[#c62828]"
            style={{ boxShadow: "2px 2px 0 #E8D5A3" }}
          >
            ⚠️ {error}
          </div>
        )}

        {data && (
          <>
            {/* ── KPI Cards ── */}
            <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <KPICard
                label="세션당 대화 횟수"
                value={`${data.messagesPerSession}회`}
                sub="메시지 + 예시 + 후속질문"
              />
              <KPICard
                label="후속 질문 클릭률"
                value={`${data.followupClickRate}%`}
                sub="후속질문 클릭 / 후속질문 포함 응답"
              />
              <KPICard
                label="도구 호출 성공률"
                value={`${data.toolCallSuccessRate.overall.rate}%`}
                sub={`${data.toolCallSuccessRate.overall.success} / ${data.toolCallSuccessRate.overall.total}건`}
              />
              <KPICard
                label="평균 세션 지속 시간"
                value={formatDuration(data.avgSessionDurationMs)}
                sub="세션 종료 기준"
              />
              <KPICard
                label="예시 질문 사용률"
                value={`${data.exampleUsageRate}%`}
                sub="예시 클릭한 세션 비율"
              />
            </section>

            {/* ── Tool Success Rate Table ── */}
            {Object.keys(data.toolCallSuccessRate.byTool).length > 0 && (
              <section className="mb-8">
                <h2 className="mb-3 text-lg font-bold text-[#222]">
                  🔧 도구별 성공률
                </h2>
                <div
                  className="overflow-x-auto rounded-2xl border-[2.5px] border-[#222] bg-white"
                  style={{ boxShadow: "2px 2px 0 #E8D5A3" }}
                >
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-[#E8D5A3] bg-[#FFF8E7]">
                        <th className="px-4 py-3 text-left font-bold">도구명</th>
                        <th className="px-4 py-3 text-right font-bold">전체</th>
                        <th className="px-4 py-3 text-right font-bold">성공</th>
                        <th className="px-4 py-3 text-right font-bold">성공률</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(data.toolCallSuccessRate.byTool).map(
                        ([name, stats]) => (
                          <tr
                            key={name}
                            className="border-b border-[#E8D5A3] last:border-b-0"
                          >
                            <td className="px-4 py-2.5 font-bold">
                              {TOOL_NAME_LABELS[name] ?? name}
                            </td>
                            <td className="px-4 py-2.5 text-right">
                              {stats.total}
                            </td>
                            <td className="px-4 py-2.5 text-right">
                              {stats.success}
                            </td>
                            <td className="px-4 py-2.5 text-right font-bold">
                              <span
                                className="inline-block rounded-full px-2 py-0.5 text-xs text-white"
                                style={{
                                  background:
                                    stats.rate >= 90
                                      ? "#4CAF50"
                                      : stats.rate >= 70
                                        ? "#FF9800"
                                        : "#f44336",
                                }}
                              >
                                {Math.round(stats.rate * 100) / 100}%
                              </span>
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* ── Recent Events ── */}
            <section className="mb-8">
              <h2 className="mb-3 text-lg font-bold text-[#222]">
                📋 최근 이벤트 로그
              </h2>
              {data.recentEvents.length === 0 ? (
                <div
                  className="rounded-2xl border-[2.5px] border-[#222] bg-white p-8 text-center text-[#aaa]"
                  style={{ boxShadow: "2px 2px 0 #E8D5A3" }}
                >
                  아직 기록된 이벤트가 없습니다.
                </div>
              ) : (
                <div
                  className="overflow-x-auto rounded-2xl border-[2.5px] border-[#222] bg-white"
                  style={{ boxShadow: "2px 2px 0 #E8D5A3" }}
                >
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-[#E8D5A3] bg-[#FFF8E7]">
                        <th className="px-4 py-3 text-left font-bold">시간</th>
                        <th className="px-4 py-3 text-left font-bold">이벤트</th>
                        <th className="px-4 py-3 text-left font-bold">세션ID</th>
                        <th className="px-4 py-3 text-left font-bold">상세정보</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...data.recentEvents].reverse().map((evt, i) => {
                        const badge = EVENT_BADGES[evt.event] ?? {
                          emoji: "📌",
                          color: "#999",
                        };
                        return (
                          <tr
                            key={`${evt.timestamp}-${i}`}
                            className="border-b border-[#E8D5A3] last:border-b-0"
                          >
                            <td className="whitespace-nowrap px-4 py-2.5 text-[#888]">
                              {formatTime(evt.timestamp)}
                            </td>
                            <td className="px-4 py-2.5">
                              <span
                                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold text-white"
                                style={{ background: badge.color }}
                              >
                                {badge.emoji} {evt.event}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 font-mono text-xs text-[#aaa]">
                              {evt.sessionId?.slice(0, 6) ?? "-"}
                            </td>
                            <td className="px-4 py-2.5 text-[#666]">
                              {eventDetail(evt)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* ── Summary Footer ── */}
            <section
              className="rounded-2xl border-[2.5px] border-[#222] bg-[#FFF8E7] p-5"
              style={{ boxShadow: "2px 2px 0 #E8D5A3" }}
            >
              <h2 className="mb-3 text-lg font-bold text-[#222]">
                📈 전체 통계 요약
              </h2>
              <div className="flex flex-wrap gap-6 text-sm">
                <div>
                  <span className="font-bold text-[#888]">총 세션 수: </span>
                  <span className="font-bold text-[#222]">
                    {data.totalSessions}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-[#888]">총 이벤트 수: </span>
                  <span className="font-bold text-[#222]">
                    {data.totalEvents}
                  </span>
                </div>
                {lastUpdated && (
                  <div>
                    <span className="font-bold text-[#888]">
                      마지막 업데이트:{" "}
                    </span>
                    <span className="font-bold text-[#222]">
                      {lastUpdated.toLocaleTimeString("ko-KR")}
                    </span>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
