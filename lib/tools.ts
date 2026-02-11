import type Anthropic from "@anthropic-ai/sdk";
import {
  searchStock,
  getStockQuote,
  getStockNews,
  getMarketOverview,
} from "./daum-finance";

export const toolDefinitions: Anthropic.Tool[] = [
  {
    name: "searchStock",
    description:
      "종목명으로 종목코드와 기본 정보를 검색합니다. 종목코드를 모를 때 먼저 이 도구를 사용하세요.",
    input_schema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description: "검색할 종목명 (예: 삼성전자, 현대차, 카카오)",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "getStockQuote",
    description:
      "종목코드로 현재 시세, 등락률, 거래량, 시가총액, PER, PBR 등 상세 정보를 조회합니다",
    input_schema: {
      type: "object" as const,
      properties: {
        code: {
          type: "string",
          description: "종목코드 (예: 005930)",
        },
      },
      required: ["code"],
    },
  },
  {
    name: "getStockNews",
    description: "종목 관련 최신 뉴스를 가져옵니다",
    input_schema: {
      type: "object" as const,
      properties: {
        code: {
          type: "string",
          description: "종목코드 (예: 005930)",
        },
      },
      required: ["code"],
    },
  },
  {
    name: "getMarketOverview",
    description:
      "코스피, 코스닥 등 전체 시장 현황(지수, 등락률)을 조회합니다",
    input_schema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
];

export async function executeTool(
  name: string,
  input: Record<string, string>
): Promise<string> {
  switch (name) {
    case "searchStock":
      return JSON.stringify(await searchStock(input.query));
    case "getStockQuote":
      return JSON.stringify(await getStockQuote(input.code));
    case "getStockNews":
      return JSON.stringify(await getStockNews(input.code));
    case "getMarketOverview":
      return JSON.stringify(await getMarketOverview());
    default:
      return JSON.stringify({ error: `Unknown tool: ${name}` });
  }
}
