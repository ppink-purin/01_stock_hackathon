// ── 다음 금융 API (시세, 시장현황) ──
const DAUM_API = "https://finance.daum.net";
const DAUM_HEADERS: HeadersInit = {
  Referer: "https://finance.daum.net/",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
};

async function fetchDaum(path: string) {
  const res = await fetch(`${DAUM_API}${path}`, {
    headers: DAUM_HEADERS,
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(
      `Daum Finance API error: ${res.status} ${res.statusText}`
    );
  }
  return res.json();
}

// ── 네이버 금융 API (뉴스 전용) ──
const NAVER_STOCK_API = "https://m.stock.naver.com/api";
const NAVER_HEADERS: HeadersInit = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
};

async function fetchNaver(path: string) {
  const res = await fetch(`${NAVER_STOCK_API}${path}`, {
    headers: NAVER_HEADERS,
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(
      `Naver Finance API error: ${res.status} ${res.statusText}`
    );
  }
  return res.json();
}

// ── 주요 종목 로컬 매핑 ──
const MAJOR_STOCKS = [
  // KOSPI 대형주
  { name: "삼성전자", code: "005930", market: "KOSPI" },
  { name: "SK하이닉스", code: "000660", market: "KOSPI" },
  { name: "LG에너지솔루션", code: "373220", market: "KOSPI" },
  { name: "삼성바이오로직스", code: "207940", market: "KOSPI" },
  { name: "현대자동차", code: "005380", market: "KOSPI" },
  { name: "현대차", code: "005380", market: "KOSPI" },
  { name: "기아", code: "000270", market: "KOSPI" },
  { name: "셀트리온", code: "068270", market: "KOSPI" },
  { name: "KB금융", code: "105560", market: "KOSPI" },
  { name: "신한지주", code: "055550", market: "KOSPI" },
  { name: "POSCO홀딩스", code: "005490", market: "KOSPI" },
  { name: "포스코홀딩스", code: "005490", market: "KOSPI" },
  { name: "네이버", code: "035420", market: "KOSPI" },
  { name: "NAVER", code: "035420", market: "KOSPI" },
  { name: "카카오", code: "035720", market: "KOSPI" },
  { name: "삼성SDI", code: "006400", market: "KOSPI" },
  { name: "LG화학", code: "051910", market: "KOSPI" },
  { name: "현대모비스", code: "012330", market: "KOSPI" },
  { name: "삼성물산", code: "028260", market: "KOSPI" },
  { name: "한국전력", code: "015760", market: "KOSPI" },
  { name: "한전", code: "015760", market: "KOSPI" },
  { name: "SK이노베이션", code: "096770", market: "KOSPI" },
  { name: "SK텔레콤", code: "017670", market: "KOSPI" },
  { name: "KT", code: "030200", market: "KOSPI" },
  { name: "LG전자", code: "066570", market: "KOSPI" },
  { name: "삼성전기", code: "009150", market: "KOSPI" },
  { name: "SK", code: "034730", market: "KOSPI" },
  { name: "하나금융지주", code: "086790", market: "KOSPI" },
  { name: "우리금융지주", code: "316140", market: "KOSPI" },
  { name: "삼성생명", code: "032830", market: "KOSPI" },
  { name: "삼성화재", code: "000810", market: "KOSPI" },
  { name: "한화에어로스페이스", code: "012450", market: "KOSPI" },
  { name: "한화오션", code: "042660", market: "KOSPI" },
  { name: "HD현대중공업", code: "329180", market: "KOSPI" },
  { name: "HD한국조선해양", code: "009540", market: "KOSPI" },
  { name: "하이브", code: "352820", market: "KOSPI" },
  { name: "카카오뱅크", code: "323410", market: "KOSPI" },
  { name: "크래프톤", code: "259960", market: "KOSPI" },
  { name: "두산에너빌리티", code: "034020", market: "KOSPI" },
  { name: "포스코퓨처엠", code: "003670", market: "KOSPI" },
  { name: "LG", code: "003550", market: "KOSPI" },
  { name: "한화솔루션", code: "009830", market: "KOSPI" },
  { name: "SK바이오팜", code: "326030", market: "KOSPI" },
  { name: "엔씨소프트", code: "036570", market: "KOSPI" },
  { name: "카카오페이", code: "377300", market: "KOSPI" },
  { name: "LG디스플레이", code: "034220", market: "KOSPI" },
  { name: "삼성중공업", code: "010140", market: "KOSPI" },
  { name: "한국항공우주", code: "047810", market: "KOSPI" },
  { name: "KAI", code: "047810", market: "KOSPI" },
  { name: "CJ제일제당", code: "097950", market: "KOSPI" },
  { name: "아모레퍼시픽", code: "090430", market: "KOSPI" },
  { name: "LG이노텍", code: "011070", market: "KOSPI" },
  { name: "한미반도체", code: "042700", market: "KOSPI" },
  { name: "SM엔터테인먼트", code: "041510", market: "KOSPI" },
  { name: "와이지엔터테인먼트", code: "122870", market: "KOSPI" },
  { name: "YG엔터", code: "122870", market: "KOSPI" },
  { name: "현대건설", code: "000720", market: "KOSPI" },
  { name: "대한항공", code: "003490", market: "KOSPI" },
  { name: "롯데케미칼", code: "011170", market: "KOSPI" },
  { name: "SK케미칼", code: "285130", market: "KOSPI" },
  { name: "한온시스템", code: "018880", market: "KOSPI" },
  { name: "키움증권", code: "039490", market: "KOSPI" },
  { name: "다우기술", code: "023590", market: "KOSDAQ" },
  { name: "다우데이타", code: "032190", market: "KOSDAQ" },
  // KOSDAQ 대형주
  { name: "에코프로비엠", code: "247540", market: "KOSDAQ" },
  { name: "에코프로", code: "086520", market: "KOSDAQ" },
  { name: "알테오젠", code: "196170", market: "KOSDAQ" },
  { name: "HLB", code: "028300", market: "KOSDAQ" },
  { name: "리가켐바이오", code: "141080", market: "KOSDAQ" },
  { name: "엘앤에프", code: "066970", market: "KOSDAQ" },
  { name: "레인보우로보틱스", code: "277810", market: "KOSDAQ" },
  { name: "JYP엔터테인먼트", code: "035900", market: "KOSDAQ" },
  { name: "JYP", code: "035900", market: "KOSDAQ" },
  { name: "펄어비스", code: "263750", market: "KOSDAQ" },
  { name: "씨젠", code: "096530", market: "KOSDAQ" },
  { name: "카카오게임즈", code: "293490", market: "KOSDAQ" },
];

// ── 종목 검색 (로컬 매핑) ──
export async function searchStock(query: string) {
  try {
    const q = query.trim().toLowerCase();
    const matches = MAJOR_STOCKS.filter(
      (s) => s.name.toLowerCase().includes(q) || s.code === q
    );

    const seen = new Set<string>();
    const unique = matches.filter((s) => {
      if (seen.has(s.code)) return false;
      seen.add(s.code);
      return true;
    });

    if (unique.length === 0) {
      return {
        success: false,
        error: `'${query}' 종목을 찾지 못했습니다. 종목코드를 직접 입력해 주세요 (예: 005930).`,
        results: [],
      };
    }

    return { success: true, results: unique.slice(0, 5) };
  } catch (error) {
    return {
      success: false,
      error: `종목 검색 실패: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
      results: [],
    };
  }
}

// ── 시세 조회 — 다음 금융 API ──
export async function getStockQuote(code: string) {
  try {
    const symbolCode = `A${code}`;
    const data = await fetchDaum(`/api/quotes/${symbolCode}`) as Record<string, unknown>;

    return {
      success: true,
      data: {
        name: data.name,
        code: data.symbolCode,
        market: data.market,
        tradePrice: data.tradePrice,
        change: data.change,
        changePrice: data.changePrice,
        changeRate: data.changeRate,
        openingPrice: data.openingPrice,
        highPrice: data.highPrice,
        lowPrice: data.lowPrice,
        prevClosingPrice: data.prevClosingPrice,
        accTradeVolume: data.accTradeVolume,
        accTradePrice: data.accTradePrice,
        marketCap: data.marketCap,
        foreignRatio: data.foreignRatio,
        per: data.per,
        pbr: data.pbr,
        eps: data.eps,
        bps: data.bps,
        dividendYield: data.dividendYield,
        high52wPrice: data.high52wPrice,
        low52wPrice: data.low52wPrice,
        marketCapRank: data.marketCapRank,
        companySummary: data.companySummary,
      },
      source: "다음 금융(finance.daum.net)",
    };
  } catch (error) {
    return {
      success: false,
      error: `시세 조회 실패: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
    };
  }
}

// ── 뉴스 조회 — 네이버 금융 API (유지) ──
export async function getStockNews(code: string) {
  try {
    const data = await fetchNaver(
      `/news/stock/${code}?page=1&pageSize=5`
    );

    const articles: {
      title: string;
      summary: unknown;
      date: unknown;
      source: unknown;
    }[] = [];
    if (Array.isArray(data)) {
      for (const group of data) {
        if (Array.isArray(group.items)) {
          for (const item of group.items as Record<string, unknown>[]) {
            articles.push({
              title: (item.titleFull as string) || (item.title as string),
              summary: item.body,
              date: item.datetime,
              source: item.officeName,
            });
          }
        }
      }
    }

    return {
      success: true,
      articles: articles.slice(0, 5),
      source: "네이버 금융(m.stock.naver.com)",
    };
  } catch (error) {
    return {
      success: false,
      error: `뉴스 조회 실패: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
      articles: [],
    };
  }
}

// ── 시장 현황 — 다음 금융 API ──
export async function getMarketOverview() {
  try {
    const data = await fetchDaum("/api/domestic/trend/market_capitalization") as Record<string, unknown>;

    const formatTop = (stocks: unknown[], marketName: string) => {
      const list = (stocks as Record<string, unknown>[]).slice(0, 5).map((s) => ({
        name: s.name,
        code: s.symbolCode,
        tradePrice: s.tradePrice,
        changeRate: s.changeRate,
        marketCap: s.marketCap,
        rank: s.rank,
      }));
      return { market: marketName, topStocks: list };
    };

    const kospiStocks = data.KOSPI as unknown[] | undefined;
    const kosdaqStocks = data.KOSDAQ as unknown[] | undefined;

    // 코스피/코스닥 지수도 함께 조회
    const [kospiIdx, kosdaqIdx] = await Promise.all([
      fetchDaum("/api/quotes/KOSPI") as Promise<Record<string, unknown>>,
      fetchDaum("/api/quotes/KOSDAQ") as Promise<Record<string, unknown>>,
    ]);

    return {
      success: true,
      indices: [
        {
          name: "코스피",
          tradePrice: kospiIdx.tradePrice,
          change: kospiIdx.change,
          changePrice: kospiIdx.changePrice,
          changeRate: kospiIdx.changeRate,
        },
        {
          name: "코스닥",
          tradePrice: kosdaqIdx.tradePrice,
          change: kosdaqIdx.change,
          changePrice: kosdaqIdx.changePrice,
          changeRate: kosdaqIdx.changeRate,
        },
      ],
      marketCap: [
        ...(kospiStocks ? [formatTop(kospiStocks, "KOSPI")] : []),
        ...(kosdaqStocks ? [formatTop(kosdaqStocks, "KOSDAQ")] : []),
      ],
      source: "다음 금융(finance.daum.net)",
    };
  } catch (error) {
    return {
      success: false,
      error: `시장 현황 조회 실패: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
      indices: [],
      marketCap: [],
    };
  }
}
