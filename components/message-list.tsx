"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/types";
import { MessageBubble } from "./message-bubble";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onFollowUpClick?: (question: string) => void;
}

function ApiInfoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="relative comic-bubble-ai max-w-sm w-full shadow-[4px_4px_0_#222] !p-0 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#FFDD44] border-b-2 border-[#222] px-4 py-3 flex items-center justify-between">
          <span className="font-bold text-[#222] text-sm">🔍 API 비밀 노트</span>
          <button onClick={onClose} className="text-[#222] font-bold text-lg leading-none hover:text-[#E8452E]">✕</button>
        </div>
        <div className="px-4 py-4 text-sm text-[#222] space-y-3">
          <div>
            <p className="font-bold mb-1">📡 사용 중인 API</p>
            <ul className="space-y-1.5 ml-1">
              <li className="flex items-start gap-2">
                <span className="shrink-0">🔎</span>
                <span><strong>종목 검색</strong> — 로컬 매핑 DB (주요 종목 100+)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">📊</span>
                <span><strong>시세 조회</strong> — 다음 금융 API (finance.daum.net)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">📰</span>
                <span><strong>뉴스 조회</strong> — 네이버 금융 뉴스 API (m.stock.naver.com)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">📈</span>
                <span><strong>시장 현황</strong> — 다음 금융 API (코스피/코스닥 지수 + 시총 랭킹)</span>
              </li>
            </ul>
          </div>
          <div className="border-t-2 border-dashed border-[#E8D5A3] pt-3">
            <p className="font-bold mb-1">📝 데이터 출처</p>
            <p className="text-xs text-[#5D4E37] leading-relaxed">
              시세/시장현황은 <strong>다음 금융(finance.daum.net)</strong> API를,
              뉴스는 <strong>네이버 금융(m.stock.naver.com)</strong> API를 사용합니다.
              AI 엔진은 <strong>Claude Haiku 4.5</strong>입니다.
            </p>
          </div>
          <p className="text-[10px] text-center text-[#A0906B] pt-1">🥜 이스터 에그를 찾으셨군요!</p>
        </div>
      </div>
    </div>
  );
}

export function MessageList({ messages, isLoading, onFollowUpClick }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [showApiInfo, setShowApiInfo] = useState(false);

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
        <button
          onClick={() => setShowApiInfo(true)}
          className="text-xs text-[#A0906B] comic-bubble-ai inline-block px-4 py-2 mt-2 cursor-pointer hover:bg-[#FFF3CD] active:bg-[#FFDD44] transition-colors"
          style={{ fontSize: '0.75rem' }}
        >
          다음 금융 데이터를 기반으로 답변합니다
        </button>
        {showApiInfo && <ApiInfoModal onClose={() => setShowApiInfo(false)} />}
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
