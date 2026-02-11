"use client";

import { useEffect, useRef, useCallback } from "react";

// ── Session ID (module-level singleton) ──
let _sessionId: string | null = null;

export function getSessionId(): string {
  if (!_sessionId) {
    _sessionId = crypto.randomUUID();
  }
  return _sessionId;
}

// ── Low-level event sender ──
function trackEvent(
  event: string,
  metadata?: Record<string, unknown>
): void {
  const payload = JSON.stringify({
    event,
    sessionId: getSessionId(),
    timestamp: new Date().toISOString(),
    ...metadata,
  });

  try {
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const sent = navigator.sendBeacon("/api/analytics/events", payload);
      if (sent) return;
    }
  } catch {
    // fall through to fetch
  }

  fetch("/api/analytics/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}

// ── useAnalytics hook ──
export function useAnalytics() {
  const sessionStart = useRef<number>(Date.now());
  const messageCount = useRef(0);

  // session_start on mount, session_end on unmount/beforeunload
  useEffect(() => {
    sessionStart.current = Date.now();
    trackEvent("session_start");

    const handleUnload = () => {
      trackEvent("session_end", {
        durationMs: Date.now() - sessionStart.current,
        messageCount: messageCount.current,
      });
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      handleUnload();
    };
  }, []);

  const trackMessageSend = useCallback(
    (messageLength: number, isFirstMessage: boolean) => {
      messageCount.current++;
      trackEvent("message_send", { messageLength, isFirstMessage });
    },
    []
  );

  const trackExampleClick = useCallback((question: string) => {
    messageCount.current++;
    trackEvent("example_click", { question });
  }, []);

  const trackFollowupClick = useCallback((question: string) => {
    messageCount.current++;
    trackEvent("followup_click", { question });
  }, []);

  const trackResponseComplete = useCallback(
    (durationMs: number, toolCallCount: number, followupCount: number) => {
      trackEvent("response_complete", {
        durationMs,
        toolCallCount,
        followupCount,
      });
    },
    []
  );

  const trackResponseError = useCallback((error: string) => {
    trackEvent("response_error", { error });
  }, []);

  const trackChatReset = useCallback(() => {
    trackEvent("chat_reset", {
      messageCount: messageCount.current,
      sessionDurationMs: Date.now() - sessionStart.current,
    });
    messageCount.current = 0;
  }, []);

  const trackEasterEggClick = useCallback(() => {
    trackEvent("easter_egg_click");
  }, []);

  return {
    sessionId: getSessionId(),
    trackMessageSend,
    trackExampleClick,
    trackFollowupClick,
    trackResponseComplete,
    trackResponseError,
    trackChatReset,
    trackEasterEggClick,
  };
}
