"use client";

import { type FormEvent, useRef } from "react";

const EXAMPLE_QUESTIONS = [
  "삼성전자 현재 주가",
  "코스피 현황",
  "카카오 관련 뉴스",
  "현대차 투자자 의견",
];

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

  return (
    <div className="shrink-0 border-t-[3px] border-[#222] bg-[#FFF8E7] pb-[env(safe-area-inset-bottom)]">
      {showExamples && (
        <div className="flex gap-2 overflow-x-auto px-4 pt-3 pb-1 scrollbar-hide">
          {EXAMPLE_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => onExampleClick(q)}
              className="shrink-0 rounded-full border-2 border-[#222] bg-[#FFDD44] px-3 py-1.5 text-sm font-bold text-[#222] shadow-[1px_1px_0_#C93A25] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all"
            >
              {q}
            </button>
          ))}
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
