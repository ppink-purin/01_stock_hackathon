"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/lib/types";
import { MessageBubble } from "./message-bubble";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onFollowUpClick?: (question: string) => void;
}

export function MessageList({ messages, isLoading, onFollowUpClick }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-[#222] bg-[#FFDD44] text-4xl shadow-[3px_3px_0_#E8D5A3]">
          <span role="img" aria-label="주식도령">🐶</span>
        </div>
        <h1 className="mb-2 text-xl font-bold text-[#222]">주식도령 키우Me</h1>
        <p className="mb-1 text-sm text-[#8B7355] font-medium">
          AI 주식 길잡이에게 무엇이든 물어보세요!
        </p>
        <p className="text-xs text-[#A0906B] comic-bubble-ai inline-block px-4 py-2 mt-2" style={{ fontSize: '0.75rem' }}>
          네이버 금융 데이터를 기반으로 답변합니다
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
      <div className="mx-auto max-w-2xl space-y-4">
        {messages.map((message, i) => {
          const isLastAssistant =
            message.role === "assistant" && i === messages.length - 1;

          return (
            <MessageBubble
              key={message.id}
              message={message}
              isStreaming={isLastAssistant && isLoading}
              isLast={isLastAssistant}
              onFollowUpClick={onFollowUpClick}
            />
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
