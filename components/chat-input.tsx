"use client";

import { type FormEvent, useRef, useMemo } from "react";

// 종목 풀 — MAJOR_STOCKS에서 대표 종목 추출
const STOCKS = [
  "삼성전자", "SK하이닉스", "현대차", "기아", "카카오", "네이버",
  "LG에너지솔루션", "셀트리온", "삼성SDI", "LG화학", "KB금융",
  "한화에어로스페이스", "크래프톤", "하이브", "카카오뱅크",
  "키움증권", "다우기술", "삼성바이오로직스", "포스코홀딩스",
  "현대모비스", "한국전력", "SK텔레콤", "LG전자", "엔씨소프트",
  "대한항공", "에코프로", "알테오젠", "HD현대중공업", "한화오션",
  "삼성물산", "삼성전기", "두산에너빌리티", "아모레퍼시픽",
  "한미반도체", "카카오페이", "CJ제일제당",
];

// 질문 템플릿 — API 4종(검색, 시세, 뉴스, 시장현황)에 맞는 다양한 패턴
const TEMPLATES = {
  quote: [
    (s: string) => `${s} 현재 주가`,
    (s: string) => `${s} 시세 조회`,
    (s: string) => `${s} 주가 알려줘`,
    (s: string) => `${s} 오늘 주가 어때?`,
    (s: string) => `${s} PER이랑 PBR 알려줘`,
    (s: string) => `${s} 시가총액 얼마야?`,
    (s: string) => `${s} 52주 최고가는?`,
    (s: string) => `${s} 외국인 보유 비율`,
  ],
  news: [
    (s: string) => `${s} 최신 뉴스`,
    (s: string) => `${s} 관련 뉴스`,
    (s: string) => `${s} 무슨 일 있어?`,
    (s: string) => `${s} 요즘 소식`,
  ],
  market: [
    () => "코스피 현황",
    () => "코스닥 시장 현황",
    () => "오늘 시장 어때?",
    () => "코스피 코스닥 지수",
    () => "시총 상위 종목은?",
    () => "오늘 주식시장 분위기",
  ],
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateExamples(): string[] {
  const shuffledStocks = shuffle(STOCKS);
  const questions: string[] = [];

  // 시세 질문 4개 (서로 다른 종목 + 서로 다른 템플릿)
  const quoteTemplates = shuffle(TEMPLATES.quote);
  for (let i = 0; i < 4; i++) {
    questions.push(quoteTemplates[i](shuffledStocks[i]));
  }

  // 뉴스 질문 3개
  const newsTemplates = shuffle(TEMPLATES.news);
  for (let i = 0; i < 3; i++) {
    questions.push(newsTemplates[i](shuffledStocks[4 + i]));
  }

  // 시장 현황 질문 3개
  const marketTemplates = shuffle(TEMPLATES.market);
  for (let i = 0; i < 3; i++) {
    questions.push(marketTemplates[i]());
  }

  return shuffle(questions);
}

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  onExampleClick: (question: string) => void;
  showExamples: boolean;
  onReset?: () => void;
  showReset?: boolean;
}

export function ChatInput({
  input,
  setInput,
  handleSubmit,
  isLoading,
  onExampleClick,
  showExamples,
  onReset,
  showReset,
}: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // showExamples가 true로 바뀔 때마다 (초기화 포함) 새로 생성
  const examples = useMemo(() => generateExamples(), [showExamples]);

  return (
    <div className="shrink-0 border-t-[3px] border-[#222] bg-[#FFF8E7] pb-[env(safe-area-inset-bottom)]">
      {showExamples && (
        <div className="overflow-hidden pt-3 pb-1">
          <div
            className="flex gap-2 w-max animate-marquee hover:[animation-play-state:paused]"
          >
            {/* 원본 + 복제본으로 이음새 없는 무한 루프 */}
            {[...examples, ...examples].map((q, i) => (
              <button
                key={`${q}-${i}`}
                onClick={() => onExampleClick(q)}
                className="shrink-0 rounded-full border-2 border-[#222] bg-[#FFDD44] px-3 py-1.5 text-sm font-bold text-[#222] shadow-[1px_1px_0_#C93A25] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3">
        {showReset && onReset && (
          <button
            type="button"
            onClick={onReset}
            disabled={isLoading}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#222] bg-white text-lg disabled:opacity-40 active:bg-[#FFF0CC] shadow-[1px_1px_0_#E8D5A3] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all"
            title="대화 초기화"
          >
            🧹
          </button>
        )}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="주식에 대해 무엇이든 물어보세요..."
          className="min-h-[44px] flex-1 rounded-full border-2 border-[#222] bg-white px-4 py-2 text-base outline-none focus:border-[#E8452E] focus:ring-2 focus:ring-[#FFDD44]"
          style={{ fontFamily: 'inherit' }}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#222] bg-[#E8452E] text-white disabled:opacity-40 active:bg-[#C93A25] shadow-[2px_2px_0_#222] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
