import { createSdkMcpServer, tool } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";
import {
  searchStock,
  getStockQuote,
  getStockNews,
  getMarketOverview,
} from "./daum-finance";

export const stockMcpServer = createSdkMcpServer({
  name: "stock-tools",
  version: "1.0.0",
  tools: [
    tool(
      "searchStock",
      "종목명으로 종목코드와 기본 정보를 검색합니다. 종목코드를 모를 때 먼저 이 도구를 사용하세요.",
      {
        query: z
          .string()
          .describe("검색할 종목명 (예: 삼성전자, 현대차, 카카오)"),
      },
      async ({ query }) => {
        const data = await searchStock(query);
        return {
          content: [{ type: "text" as const, text: JSON.stringify(data) }],
        };
      }
    ),
    tool(
      "getStockQuote",
      "종목코드로 현재 시세, 등락률, 거래량, 시가총액, PER, PBR 등 상세 정보를 조회합니다",
      {
        code: z.string().describe("종목코드 (예: 005930)"),
      },
      async ({ code }) => {
        const data = await getStockQuote(code);
        return {
          content: [{ type: "text" as const, text: JSON.stringify(data) }],
        };
      }
    ),
    tool(
      "getStockNews",
      "종목 관련 최신 뉴스를 가져옵니다",
      {
        code: z.string().describe("종목코드 (예: 005930)"),
      },
      async ({ code }) => {
        const data = await getStockNews(code);
        return {
          content: [{ type: "text" as const, text: JSON.stringify(data) }],
        };
      }
    ),
    tool(
      "getMarketOverview",
      "코스피, 코스닥 등 전체 시장 현황(지수, 등락률)을 조회합니다",
      {},
      async () => {
        const data = await getMarketOverview();
        return {
          content: [{ type: "text" as const, text: JSON.stringify(data) }],
        };
      }
    ),
  ],
});
