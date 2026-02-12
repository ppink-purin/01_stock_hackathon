"use client";

import { useState, useCallback, useRef } from "react";
import type { ChatMessage } from "@/lib/types";
import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";
import { useAnalytics } from "@/lib/analytics/tracker";

function useAgentChat(sessionId: string, onResponseComplete?: (durationMs: number, toolCallCount: number, followupCount: number) => void, onResponseError?: (error: string) => void) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const messagesRef = useRef<ChatMessage[]>([]);
  messagesRef.current = messages;

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    const assistantId = crypto.randomUUID();

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setIsLoading(true);

    const responseStart = Date.now();

    try {
      const allMessages = [...messagesRef.current, userMessage];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: allMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          sessionId,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let toolCallCount = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop()!;

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));

            if (data.type === "text_delta") {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                updated[updated.length - 1] = {
                  ...last,
                  content: last.content + data.text,
                };
                return updated;
              });
            } else if (data.type === "tool_call") {
              toolCallCount++;
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                updated[updated.length - 1] = {
                  ...last,
                  toolCalls: [
                    ...(last.toolCalls ?? []),
                    { name: data.name, input: data.input },
                  ],
                };
                return updated;
              });
            } else if (data.type === "done") {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (!last.content && data.text) {
                  updated[updated.length - 1] = {
                    ...last,
                    content: data.text,
                  };
                }
                return updated;
              });
              // Count followup questions from final text
              const finalText = data.text || "";
              const followupMatch = /\[추천질문:\s*(.+?)\]\s*$/.exec(finalText);
              const followupCount = followupMatch
                ? followupMatch[1].split("|").filter(Boolean).length
                : 0;
              onResponseComplete?.(Date.now() - responseStart, toolCallCount, followupCount);
            } else if (data.type === "error") {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                updated[updated.length - 1] = {
                  ...last,
                  content:
                    last.content ||
                    `오류가 발생했습니다: ${data.message}`,
                };
                return updated;
              });
              onResponseError?.(data.message || "unknown error");
            }
          } catch {
            // Skip malformed JSON lines
          }
        }
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "알 수 없는 오류";
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        updated[updated.length - 1] = {
          ...last,
          content: `연결 오류: ${errorMsg}`,
        };
        return updated;
      });
      onResponseError?.(errorMsg);
    }

    setIsLoading(false);
  }, [sessionId, onResponseComplete, onResponseError]);

  const resetChat = useCallback(() => {
    setMessages([]);
    setInput("");
  }, []);

  return { messages, isLoading, input, setInput, sendMessage, resetChat };
}

export function Chat() {
  const analytics = useAnalytics();

  const { messages, isLoading, input, setInput, sendMessage, resetChat } =
    useAgentChat(
      analytics.sessionId,
      analytics.trackResponseComplete,
      analytics.trackResponseError
    );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    analytics.trackMessageSend(text.length, messages.length === 0);
    sendMessage(text);
    setInput("");
  };

  const handleExampleClick = (question: string) => {
    if (isLoading) return;
    analytics.trackExampleClick(question);
    sendMessage(question);
  };

  const handleFollowUpClick = (question: string) => {
    if (isLoading) return;
    analytics.trackFollowupClick(question);
    sendMessage(question);
  };

  const handleReset = () => {
    analytics.trackChatReset();
    resetChat();
  };

  return (
    <div className="flex h-dvh flex-col bg-surface">
      {/* Header — comic panel style */}
      <header className="shrink-0 border-b-[3px] border-[#222] bg-[#FFF8E7] pt-[env(safe-area-inset-top)]" style={{ boxShadow: '0 2px 0 #E8D5A3' }}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="w-9" />
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#222] bg-[#FFDD44] text-lg" role="img" aria-label="내비">
              🐶
            </span>
            <h1 className="text-lg font-bold text-[#222]">주식내비 키우Me</h1>
          </div>
          <a href="/analytics" className="block h-9 w-9 opacity-0" aria-label="Analytics" />
        </div>
      </header>

      {/* Messages */}
      <MessageList
        messages={messages}
        isLoading={isLoading}
        onFollowUpClick={handleFollowUpClick}
        onEasterEggClick={analytics.trackEasterEggClick}
      />

      {/* Input */}
      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        onExampleClick={handleExampleClick}
        showExamples={messages.length === 0}
        onReset={handleReset}
        showReset={messages.length > 0}
      />
    </div>
  );
}
