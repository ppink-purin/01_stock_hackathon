"use client";

import type { ChatMessage } from "@/lib/types";
import { ThinkingSteps, ToolCallIndicator } from "./thinking-steps";

interface MessageBubbleProps {
  message: ChatMessage;
  isStreaming: boolean;
  isLast?: boolean;
  onFollowUpClick?: (question: string) => void;
}

interface ThinkingStep {
  label: string;
  icon: string;
  content: string;
}

function parseThinkingSteps(text: string): {
  steps: ThinkingStep[];
  finalAnswer: string;
} {
  const steps: ThinkingStep[] = [];
  const stepPatterns = [
    { pattern: /## 🔍 의도 ?분석\n([\s\S]*?)(?=## [📋📊💡]|$)/g, label: "의도 분석", icon: "🔍" },
    { pattern: /## 📋 탐색 ?계획\n([\s\S]*?)(?=## [🔍📊💡]|$)/g, label: "탐색 계획", icon: "📋" },
    { pattern: /## 📊 정보 ?수집 ?및 ?분석\n([\s\S]*?)(?=## [🔍📋💡]|$)/g, label: "정보 수집 및 분석", icon: "📊" },
  ];

  for (const { pattern, label, icon } of stepPatterns) {
    const match = pattern.exec(text);
    if (match) {
      steps.push({ label, icon, content: match[1].trim() });
    }
  }

  const finalMatch = /## 💡 최종 ?답변\n([\s\S]*)$/.exec(text);
  const finalAnswer = finalMatch ? finalMatch[1].trim() : "";

  if (steps.length === 0 && !finalMatch) {
    return { steps: [], finalAnswer: text };
  }

  return { steps, finalAnswer };
}

function parseFollowUpQuestions(text: string): {
  cleanText: string;
  questions: string[];
} {
  const match = /\[추천질문:\s*(.+?)\]\s*$/.exec(text);
  if (!match) return { cleanText: text, questions: [] };
  const questions = match[1]
    .split("|")
    .map((q) => q.trim())
    .filter(Boolean);
  const cleanText = text.slice(0, match.index).trimEnd();
  return { cleanText, questions };
}

function SimpleMarkdown({ content }: { content: string }) {
  const html = content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>")
    .replace(/^[•\-*] (.*$)/gm, "<li>$1</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>");

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: `<p>${html}</p>` }}
    />
  );
}

export function MessageBubble({ message, isStreaming, isLast, onFollowUpClick }: MessageBubbleProps) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end items-end gap-2 mb-3">
        <div className="comic-bubble-user max-w-[80%]">
          <p className="text-sm leading-relaxed font-medium">{message.content}</p>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#222] bg-[#FFB74D] text-sm" role="img" aria-label="사용자">
          😊
        </span>
      </div>
    );
  }

  const fullText = message.content;
  const toolCalls = message.toolCalls ?? [];
  const { steps, finalAnswer: rawFinalAnswer } = parseThinkingSteps(fullText);

  // Parse follow-up questions from the final answer (or raw text)
  const textToParse = rawFinalAnswer || (!steps.length ? fullText : "");
  const { cleanText: displayText, questions: followUpQuestions } =
    parseFollowUpQuestions(textToParse);
  const finalAnswer = rawFinalAnswer ? displayText : "";
  const fallbackText = !rawFinalAnswer && !steps.length ? displayText : "";

  const showFollowUps =
    isLast && !isStreaming && followUpQuestions.length > 0 && onFollowUpClick;

  return (
    <div className="flex justify-start items-start gap-2 mb-3">
      {/* AI Avatar - Snoopy style */}
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#222] bg-[#FFDD44] text-sm mt-5" role="img" aria-label="주식내비">
        🐶
      </span>

      <div className="max-w-[88%]">
        {/* Avatar label */}
        <div className="mb-1 ml-1">
          <span className="text-xs font-bold text-[#222]">주식내비</span>
        </div>

        {/* Thinking steps (collapsible) */}
        {steps.length > 0 && (
          <ThinkingSteps steps={steps} isStreaming={isStreaming && !finalAnswer} />
        )}

        {/* Tool call indicators */}
        {toolCalls.map((tc, i) => (
          <ToolCallIndicator key={i} toolName={tc.name} args={tc.input} />
        ))}

        {/* Final answer */}
        {finalAnswer && (
          <div className="comic-bubble-ai shadow-[2px_2px_0_#E8D5A3]">
            <SimpleMarkdown content={finalAnswer} />
          </div>
        )}

        {/* Streaming with no parsed content yet */}
        {fallbackText && (
          <div className="comic-bubble-ai shadow-[2px_2px_0_#E8D5A3]">
            <SimpleMarkdown content={fallbackText} />
          </div>
        )}

        {/* Loading state when there's no content at all */}
        {isStreaming && !fullText && toolCalls.length === 0 && (
          <div className="comic-bubble-ai shadow-[2px_2px_0_#E8D5A3]">
            <span className="flex gap-1">
              <span className="thinking-dot h-2 w-2 rounded-full bg-[#F0C040]" />
              <span className="thinking-dot h-2 w-2 rounded-full bg-[#F0C040]" />
              <span className="thinking-dot h-2 w-2 rounded-full bg-[#F0C040]" />
            </span>
          </div>
        )}

        {/* Follow-up question buttons */}
        {showFollowUps && (
          <div className="mt-3 flex flex-wrap gap-2">
            {followUpQuestions.map((q) => (
              <button
                key={q}
                onClick={() => onFollowUpClick(q)}
                className="rounded-full border-2 border-[#222] bg-[#FFDD44] px-3 py-1.5 text-xs font-bold text-[#222] shadow-[1px_1px_0_#C93A25] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all hover:bg-[#FFE566]"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
