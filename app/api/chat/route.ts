import { query } from "@anthropic-ai/claude-agent-sdk";
import { stockMcpServer } from "@/lib/tools";

export const runtime = "nodejs";
export const maxDuration = 120;

const systemPrompt = `당신은 '주식도령 키우Me'입니다. 주식 초보 투자자의 질문에 친절하고 이해하기 쉽게 답변합니다.
네이버 금융(m.stock.naver.com) 데이터를 활용하여 실시간 정보를 제공합니다.

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
- 답변 마지막에 반드시 다음 문구를 포함하세요: "※ 다음 금융(finance.daum.net)에서 데이터 제공이 불가한 관계로 대체 API(네이버 금융)를 사용하였습니다."
- 투자 권유가 아닌 정보 제공 목적임을 항상 마지막에 언급하세요
- 숫자는 읽기 쉽게 포맷하세요 (예: 1,234,567원)
- 전문 용어는 괄호 안에 쉬운 설명을 추가하세요 (예: PER(주가수익비율))
- 답변은 한국어로 작성하세요
- 최종 답변의 맨 마지막에 반드시 아래 형식으로 사용자가 이어서 물어볼 만한 후속 질문 3개를 추가하세요. 질문은 한 문장(15자 내외)으로 짧게, 우리 도구(종목검색, 시세조회, 뉴스조회, 시장현황)로 답변 가능한 수준이어야 합니다:
[추천질문: 질문1 | 질문2 | 질문3]`;

function formatPrompt(
  messages: { role: string; content: string }[]
): string {
  if (messages.length === 0) return "";
  if (messages.length === 1) return messages[0].content;

  const history = messages
    .slice(0, -1)
    .map(
      (m) =>
        `${m.role === "user" ? "사용자" : "주식도령"}: ${m.content}`
    )
    .join("\n\n");

  const current = messages[messages.length - 1].content;
  return `이전 대화:\n${history}\n\n현재 질문: ${current}`;
}

export async function POST(req: Request) {
  const { messages } = await req.json();
  const prompt = formatPrompt(messages);

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: Record<string, unknown>) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
        );
      };

      try {
        const conversation = query({
          prompt,
          options: {
            systemPrompt,
            model: "claude-sonnet-4-5-20250929",
            mcpServers: { "stock-tools": stockMcpServer },
            tools: [],
            includePartialMessages: true,
            permissionMode: "bypassPermissions",
            maxTurns: 10,
          },
        });

        let fullText = "";
        const sentToolCalls = new Set<string>();

        for await (const message of conversation) {
          // Real-time text streaming via stream events
          if (message.type === "stream_event") {
            const event = (message as Record<string, unknown>).event as
              | Record<string, unknown>
              | undefined;
            if (event?.type === "content_block_delta") {
              const delta = event.delta as
                | Record<string, unknown>
                | undefined;
              if (delta?.type === "text_delta" && typeof delta.text === "string") {
                fullText += delta.text;
                send({ type: "text_delta", text: delta.text });
              }
            }
          }

          // Complete assistant message - extract tool calls
          if (message.type === "assistant") {
            const msg = message as Record<string, unknown>;
            const content = (msg.message as Record<string, unknown>)
              ?.content as Array<Record<string, unknown>> | undefined;
            if (Array.isArray(content)) {
              for (const block of content) {
                if (
                  block.type === "tool_use" &&
                  typeof block.id === "string" &&
                  !sentToolCalls.has(block.id)
                ) {
                  sentToolCalls.add(block.id);
                  send({
                    type: "tool_call",
                    name: block.name,
                    input: block.input,
                  });
                }
              }

              // Fallback: if no stream_event delivered text, extract from assistant
              const msgText = content
                .filter((b) => b.type === "text" && typeof b.text === "string")
                .map((b) => b.text as string)
                .join("");
              if (msgText && msgText.length > fullText.length) {
                const delta = msgText.slice(fullText.length);
                send({ type: "text_delta", text: delta });
                fullText = msgText;
              }
            }
          }

          // Completion
          if (message.type === "result") {
            const result = message as Record<string, unknown>;
            if (result.is_error) {
              const errors = result.errors as string[] | undefined;
              send({
                type: "error",
                message: errors?.join(", ") ?? "Unknown error",
              });
            } else {
              send({
                type: "done",
                text: (result.result as string) ?? fullText,
              });
            }
          }
        }
      } catch (error) {
        send({
          type: "error",
          message:
            error instanceof Error
              ? error.message
              : "알 수 없는 오류가 발생했습니다",
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
