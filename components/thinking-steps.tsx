"use client";

import { useState } from "react";

interface ThinkingStepsProps {
  steps: { label: string; icon: string; content: string }[];
  isStreaming: boolean;
}

export function ThinkingSteps({ steps, isStreaming }: ThinkingStepsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (steps.length === 0) return null;

  return (
    <div className="mb-2 space-y-1.5">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        const isActive = isLast && isStreaming;
        const isOpen = openIndex === i || isActive;

        return (
          <div
            key={i}
            className={`rounded-lg border-2 ${
              isActive
                ? "border-[#F0C040] bg-[#FFF3CD]"
                : "border-[#E8D5A3] bg-[#FFFDF5]"
            }`}
            style={{ boxShadow: '1px 1px 0 #E8D5A3' }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-bold text-[#222]"
            >
              <span>{step.icon}</span>
              <span className="flex-1">{step.label}</span>
              {isActive && (
                <span className="flex gap-0.5">
                  <span className="thinking-dot h-1.5 w-1.5 rounded-full bg-[#E8452E]" />
                  <span className="thinking-dot h-1.5 w-1.5 rounded-full bg-[#E8452E]" />
                  <span className="thinking-dot h-1.5 w-1.5 rounded-full bg-[#E8452E]" />
                </span>
              )}
              {!isActive && (
                <svg
                  className={`h-4 w-4 text-[#8B7355] transition-transform ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </button>
            <div className={`accordion-content ${isOpen ? "open" : ""}`}>
              <div>
                <div className="border-t border-[#E8D5A3] px-3 pb-2 pt-1 text-sm text-[#5D4E37] leading-relaxed whitespace-pre-wrap">
                  {step.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ToolCallIndicator({
  toolName,
  args,
}: {
  toolName: string;
  args: Record<string, unknown>;
}) {
  const toolLabels: Record<string, string> = {
    searchStock: "종목 검색",
    getStockQuote: "시세 조회",
    getStockNews: "뉴스 조회",
    getMarketOverview: "시장 현황 조회",
  };

  // MCP 도구명에서 접두사 제거 (mcp__stock-tools__searchStock → searchStock)
  const shortName = toolName.split("__").pop() || toolName;
  const label = toolLabels[shortName] || toolName;
  const detail = args.query || args.code || "";

  return (
    <div className="my-1.5 flex items-center gap-2 rounded-lg bg-[#FFF3CD] border-2 border-[#E8D5A3] px-3 py-2 text-sm" style={{ boxShadow: '1px 1px 0 #E8D5A3' }}>
      <span className="flex gap-0.5">
        <span className="thinking-dot h-1.5 w-1.5 rounded-full bg-[#E8452E]" />
        <span className="thinking-dot h-1.5 w-1.5 rounded-full bg-[#E8452E]" />
        <span className="thinking-dot h-1.5 w-1.5 rounded-full bg-[#E8452E]" />
      </span>
      <span className="font-bold text-[#222]">
        {label}
        {detail ? ` — ${detail}` : ""}
      </span>
    </div>
  );
}
