import Anthropic from "@anthropic-ai/sdk";
import { toolDefinitions, executeTool } from "@/lib/tools";
import { appendEvent } from "@/lib/analytics/logger";

export const runtime = "nodejs";
export const maxDuration = 120;

const anthropic = new Anthropic();

const systemPrompt = `당신은 '주식내비 키우Me'입니다. 주식 초보 투자자의 질문에 친절하고 이해하기 쉽게 답변합니다.
다음 금융(finance.daum.net) 데이터를 주로 활용하고, 뉴스는 네이버 금융을 활용하여 실시간 정보를 제공합니다.

반드시 다음 4단계로 사고하고, 각 단계를 마크다운 형식으로 표시하세요:

## 🔍 의도 분석
사용자 질문의 의도를 파악합니다. 어떤 종목에 대한 질문인지, 어떤 정보를 원하는지 분석합니다.

## 📋 탐색 계획
질문에 답하기 위해 어떤 정보를 수집할지 계획합니다. 사용할 도구를 나열합니다.

## 📊 정보 수집 및 분석
도구를 호출하여 데이터를 수집합니다. 종목명으로 질문한 경우 먼저 searchStock으로 종목코드를 찾은 후, 필요한 정보를 조회하세요.

## 💡 최종 답변
수집한 정보를 바탕으로 초보 투자자가 이해하기 쉽게 답변합니다.

주의사항:
- 종목명으로 질문하면 반드시 searchStock 도구로 먼저 종목코드를 검색하세요
- 답변 마지막에 반드시 다음 문구를 포함하세요: "※ 시세/시장현황: 다음 금융(finance.daum.net), 뉴스: 네이버 금융 데이터를 활용하였습니다."
- 투자 권유가 아닌 정보 제공 목적임을 항상 마지막에 언급하세요
- 숫자는 읽기 쉽게 포맷하세요 (예: 1,234,567원)
- 전문 용어는 괄호 안에 쉬운 설명을 추가하세요 (예: PER(주가수익비율))
- 답변은 한국어로 작성하세요
- 최종 답변의 맨 마지막에 반드시 아래 형식으로 사용자가 이어서 물어볼 만한 후속 질문 3개를 추가하세요. 질문은 한 문장(15자 내외)으로 짧게, 우리 도구(종목검색, 시세조회, 뉴스조회, 시장현황)로 답변 가능한 수준이어야 합니다:
[추천질문: 질문1 | 질문2 | 질문3]`;

export async function POST(req: Request) {
  const { messages, sessionId } = await req.json();

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: Record<string, unknown>) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
        );
      };

      const responseStart = Date.now();
      let totalToolCalls = 0;
      let totalInputTokens = 0;
      let totalOutputTokens = 0;

      try {
        // Build conversation messages for Anthropic API
        const apiMessages: Anthropic.MessageParam[] = messages.map(
          (m: { role: string; content: string }) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })
        );

        let turnCount = 0;
        const maxTurns = 10;

        while (turnCount < maxTurns) {
          turnCount++;

          // Stream the response
          const stream = anthropic.messages.stream({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 4096,
            system: systemPrompt,
            messages: apiMessages,
            tools: toolDefinitions,
          });

          let fullText = "";
          const toolUseBlocks: {
            id: string;
            name: string;
            input: Record<string, string>;
          }[] = [];
          stream.on("text", (text) => {
            fullText += text;
            send({ type: "text_delta", text });
          });

          // Wait for the full message
          const response = await stream.finalMessage();

          // Accumulate token usage
          if (response.usage) {
            totalInputTokens += response.usage.input_tokens;
            totalOutputTokens += response.usage.output_tokens;
          }

          // Collect tool_use blocks from the final message
          for (const block of response.content) {
            if (block.type === "tool_use") {
              toolUseBlocks.push({
                id: block.id,
                name: block.name,
                input: block.input as Record<string, string>,
              });
            }
          }

          // If no tool calls, we're done
          if (toolUseBlocks.length === 0 || response.stop_reason === "end_turn") {
            // Calculate cost in KRW
            // Claude Haiku 4.5: Input $1.00/MTok, Output $5.00/MTok
            const USD_TO_KRW = 1450;
            const inputCostKRW = (totalInputTokens / 1_000_000) * 1.0 * USD_TO_KRW;
            const outputCostKRW = (totalOutputTokens / 1_000_000) * 5.0 * USD_TO_KRW;
            const totalCostKRW = inputCostKRW + outputCostKRW;
            const costText = `\n\n---\n💰 API 비용: 입력 ${totalInputTokens.toLocaleString()}토큰 + 출력 ${totalOutputTokens.toLocaleString()}토큰 = **${totalCostKRW.toFixed(2)}원**`;
            send({ type: "text_delta", text: costText });
            fullText += costText;

            const followupMatch = /\[추천질문:\s*(.+?)\]/.exec(fullText);
            const followupCount = followupMatch
              ? followupMatch[1].split("|").filter(Boolean).length
              : 0;
            appendEvent({
              event: "response_complete",
              sessionId: sessionId || "",
              timestamp: new Date().toISOString(),
              durationMs: Date.now() - responseStart,
              toolCallCount: totalToolCalls,
              followupCount,
              inputTokens: totalInputTokens,
              outputTokens: totalOutputTokens,
              costKRW: Math.round(totalCostKRW * 100) / 100,
            });
            send({ type: "done", text: fullText });
            break;
          }

          totalToolCalls += toolUseBlocks.length;

          // Execute tools and build tool results
          send({
            type: "tool_call",
            name: toolUseBlocks[0].name,
            input: toolUseBlocks[0].input,
          });

          // Add assistant message to conversation
          apiMessages.push({
            role: "assistant",
            content: response.content,
          });

          // Execute all tool calls and add results
          const toolResults: Anthropic.ToolResultBlockParam[] = [];
          for (const tool of toolUseBlocks) {
            const toolStart = Date.now();
            let success = true;
            let toolError: string | undefined;
            let result: string;
            try {
              result = await executeTool(tool.name, tool.input);
              const parsed = JSON.parse(result);
              if (parsed.success === false) {
                success = false;
                toolError = parsed.error;
              }
            } catch (e) {
              success = false;
              toolError = e instanceof Error ? e.message : "unknown";
              result = JSON.stringify({ error: toolError });
            }
            appendEvent({
              event: "tool_call",
              sessionId: sessionId || "",
              timestamp: new Date().toISOString(),
              toolName: tool.name,
              success,
              durationMs: Date.now() - toolStart,
              ...(toolError ? { error: toolError } : {}),
            });
            toolResults.push({
              type: "tool_result",
              tool_use_id: tool.id,
              content: result,
            });
          }

          apiMessages.push({
            role: "user",
            content: toolResults,
          });

          // Reset for next iteration
          toolUseBlocks.length = 0;
        }
      } catch (error) {
        const errorMsg = error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다";
        appendEvent({
          event: "response_error",
          sessionId: sessionId || "",
          timestamp: new Date().toISOString(),
          error: errorMsg,
        });
        send({
          type: "error",
          message: errorMsg,
        });
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
