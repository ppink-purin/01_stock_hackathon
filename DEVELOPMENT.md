# 주식도령 키우Me — 개발 문서

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | 주식도령 키우Me |
| 설명 | AI 기반 주식 상담 챗봇 (초보 투자자 대상) |
| 디자인 컨셉 | 피넛츠(Peanuts) 만화 스타일 |
| AI 모델 | Claude Haiku 4.5 (`claude-haiku-4-5-20251001`) |
| 데이터 소스 | 다음 금융 API (시세/시총) + 네이버 금융 API (뉴스/지수) |
| 배포 URL | https://01stockhackathon.vercel.app |
| GitHub | https://github.com/ppink-purin/01_stock_hackathon |

---

## 2. 기술 스택

| 구분 | 기술 | 버전 |
|------|------|------|
| 프레임워크 | Next.js (App Router) | 16.1.6 |
| UI 라이브러리 | React | 19.2.4 |
| 스타일링 | Tailwind CSS | 4.1.18 |
| 언어 | TypeScript | 5.9.3 |
| AI SDK | @anthropic-ai/sdk | 0.74.0 |
| 번들러 | Turbopack | (Next.js 내장) |
| 배포 | Vercel | Serverless |

---

## 3. 프로젝트 구조

```
01_stock_hackathon/
├── app/
│   ├── api/chat/
│   │   └── route.ts          # AI 챗 API 엔드포인트 (SSE 스트리밍)
│   ├── globals.css            # 전역 스타일 (만화 말풍선, 테마 컬러)
│   ├── layout.tsx             # 루트 레이아웃 (메타데이터, 폰트)
│   └── page.tsx               # 메인 페이지
├── components/
│   ├── chat.tsx               # 채팅 컨테이너 + useAgentChat 훅
│   ├── chat-input.tsx         # 입력창 + 예시 질문 생성기
│   ├── message-bubble.tsx     # 말풍선 컴포넌트 (사고과정 파싱, 후속질문)
│   ├── message-list.tsx       # 메시지 목록 + 이스터 에그 모달
│   └── thinking-steps.tsx     # 사고 과정 아코디언 + 도구 호출 표시
├── lib/
│   ├── daum-finance.ts        # 금융 데이터 API 클라이언트
│   ├── tools.ts               # AI 도구 정의 및 실행기
│   └── types.ts               # TypeScript 타입 정의
├── package.json
└── tsconfig.json
```

---

## 4. 핵심 기능

### 4.1 AI 채팅 (스트리밍)

- **SSE(Server-Sent Events)** 기반 실시간 스트리밍 응답
- **Multi-turn 도구 호출 루프**: 최대 10턴까지 도구 호출 → 결과 수집 → 재추론 반복
- **4단계 사고 과정 표시**: 의도 분석 → 탐색 계획 → 정보 수집 → 최종 답변
- **후속 질문 버튼**: AI 응답 마지막에 추천 질문 3개를 파싱하여 버튼으로 표시

### 4.2 금융 데이터 도구 (4종)

| 도구명 | 기능 | 데이터 소스 |
|--------|------|-------------|
| `searchStock` | 종목명 → 종목코드 검색 | 로컬 매핑 DB (100+ 종목) |
| `getStockQuote` | 종목 시세 상세 조회 | 다음 금융 API |
| `getStockNews` | 종목 관련 뉴스 5건 | 네이버 금융 API |
| `getMarketOverview` | 시장 현황 (지수 + 시총 랭킹) | 다음 + 네이버 금융 API |

### 4.3 예시 질문 랜덤 생성

- 36개 종목 풀 x 18개 질문 템플릿으로 조합
- 초기화할 때마다 10개 질문 랜덤 생성 (시세 4 + 뉴스 3 + 시장 3)
- Fisher-Yates 셔플 알고리즘 사용

### 4.4 이스터 에그

- 첫 화면 "다음 금융 데이터를 기반으로 답변합니다" 말풍선 클릭 시 API 정보 모달 표시

---

## 5. 아키텍처

### 5.1 데이터 흐름

```
[사용자 입력]
    │
    ▼
[chat.tsx] useAgentChat.sendMessage()
    │ POST /api/chat (메시지 히스토리)
    ▼
[route.ts] SSE 스트리밍 시작
    │
    ▼
[Anthropic API] Claude Haiku 4.5
    │ messages.stream()
    ▼
┌─────────────────────────────┐
│ 도구 호출 루프 (최대 10턴)   │
│                             │
│ ① 텍스트 스트리밍 → 클라이언트│
│ ② tool_use 블록 수집         │
│ ③ executeTool() 실행         │
│ ④ 결과를 대화에 추가          │
│ ⑤ 다시 Claude에 전송         │
└─────────────────────────────┘
    │
    ▼
[클라이언트] SSE 이벤트 처리
    │ text_delta → 텍스트 누적
    │ tool_call → 도구 호출 표시
    │ done → 완료
    │ error → 에러 표시
    ▼
[message-bubble.tsx]
    │ 사고 과정 파싱 (4단계)
    │ 후속 질문 파싱
    ▼
[렌더링] 말풍선 + 사고 아코디언 + 후속질문 버튼
```

### 5.2 API 통신 구조

```
┌──────────────────────────────────────────────┐
│               Vercel Serverless              │
│                                              │
│  route.ts                                    │
│    │                                         │
│    ├── Anthropic API ←→ Claude Haiku 4.5     │
│    │                                         │
│    └── tools.ts → daum-finance.ts            │
│              │                               │
│              ├── fetchDaum()                  │
│              │   └── finance.daum.net/api/    │
│              │       (Referer 헤더 필수)       │
│              │                               │
│              └── fetchNaver()                 │
│                  └── m.stock.naver.com/api/   │
└──────────────────────────────────────────────┘
```

---

## 6. 파일별 상세 설명

### 6.1 `app/api/chat/route.ts` — AI 채팅 API

- **런타임**: Node.js (Vercel Serverless)
- **최대 실행 시간**: 120초
- **시스템 프롬프트**: 4단계 사고 과정 + 후속 질문 3개 생성 지시
- **스트리밍 이벤트 타입**:

| 이벤트 | 설명 |
|--------|------|
| `text_delta` | 텍스트 조각 (스트리밍 중) |
| `tool_call` | 도구 호출 시작 (이름 + 입력값) |
| `done` | 응답 완료 |
| `error` | 오류 발생 |

### 6.2 `lib/daum-finance.ts` — 금융 API 클라이언트

**다음 금융 API** (`finance.daum.net`):
- 엔드포인트: `/api/quotes/A{종목코드}` (시세), `/api/domestic/trend/market_capitalization` (시총 랭킹)
- 필수 헤더: `Referer: https://finance.daum.net/`
- 반환 데이터: 현재가, 등락률, 거래량, 시가총액, PER, PBR, EPS, BPS, 배당수익률, 52주 최고/최저, 기업 요약 등

**네이버 금융 API** (`m.stock.naver.com`):
- 엔드포인트: `/api/news/stock/{코드}` (뉴스), `/api/index/KOSPI/basic` (지수)
- 뉴스 5건, KOSPI/KOSDAQ 지수 조회

**로컬 종목 매핑 DB**:
- 100개 이상 주요 종목 (KOSPI + KOSDAQ)
- 종목명 부분 일치 검색 + 종목코드 직접 검색 지원
- 중복 제거 (예: "현대자동차" / "현대차" → 동일 코드)

### 6.3 `components/chat.tsx` — 채팅 컨테이너

**`useAgentChat()` 커스텀 훅**:

| 반환값 | 타입 | 설명 |
|--------|------|------|
| `messages` | `ChatMessage[]` | 전체 대화 목록 |
| `isLoading` | `boolean` | 응답 대기 중 여부 |
| `input` | `string` | 현재 입력 텍스트 |
| `setInput` | `(v: string) => void` | 입력 변경 |
| `sendMessage` | `(text: string) => Promise<void>` | 메시지 전송 |
| `resetChat` | `() => void` | 대화 초기화 |

### 6.4 `components/message-bubble.tsx` — 말풍선

**사고 과정 파싱** (`parseThinkingSteps`):
- `## 🔍 의도 분석` → `## 📋 탐색 계획` → `## 📊 정보 수집 및 분석` → `## 💡 최종 답변`
- 최종 답변만 말풍선에 표시, 나머지는 접이식 아코디언으로 표시

**후속 질문 파싱** (`parseFollowUpQuestions`):
- 형식: `[추천질문: 질문1 | 질문2 | 질문3]`
- 파이프(`|`)로 구분된 질문을 추출하여 클릭 가능한 버튼으로 렌더링
- 마지막 AI 메시지에서만 표시

**마크다운 렌더링** (`SimpleMarkdown`):
- 볼드, 이탤릭, 인라인 코드, 제목(h1-h3), 인용, 리스트 지원

### 6.5 `components/chat-input.tsx` — 입력창 + 예시 질문

**예시 질문 생성 시스템**:

```
36개 종목 × 18개 템플릿 = 648가지 조합 가능
↓ Fisher-Yates 셔플
시세 질문 4개 (각각 다른 종목 + 다른 템플릿)
뉴스 질문 3개
시장현황 질문 3개
= 총 10개 랜덤 선정
```

템플릿 예시:
- 시세: `"{종목} 현재 주가"`, `"{종목} PER이랑 PBR 알려줘"`
- 뉴스: `"{종목} 최신 뉴스"`, `"{종목} 무슨 일 있어?"`
- 시장: `"코스피 현황"`, `"시총 상위 종목은?"`

### 6.6 `components/message-list.tsx` — 메시지 목록

- 자동 스크롤 (새 메시지 시 하단으로)
- 빈 화면: 환영 메시지 + API 이스터 에그 모달
- `ApiInfoModal`: 사용 중인 API 4종과 데이터 출처 표시

### 6.7 `components/thinking-steps.tsx` — 사고 과정 표시

- 접이식 아코디언 UI (클릭으로 펼침/접기)
- 스트리밍 중인 단계에 빨간 펄스 애니메이션
- 도구 호출 인디케이터: 호출 중인 도구명 + 인자 표시

---

## 7. 디자인 시스템

### 7.1 컬러 팔레트 (피넛츠 만화 테마)

| 변수명 | 색상 | 용도 |
|--------|------|------|
| `--color-primary` | `#E8452E` | 액센트 (찰리 브라운 빨강) |
| `--color-primary-dark` | `#C93A25` | 액센트 다크 |
| `--color-surface` | `#FFF8E7` | 배경 (크림색) |
| `--color-surface-dark` | `#FFF0CC` | 배경 다크 |
| `--color-bubble-user` | `#FFDD44` | 사용자 말풍선 (노랑) |
| `--color-bubble-ai` | `#FFFFFF` | AI 말풍선 (흰색) |
| `--color-thinking-bg` | `#FFF3CD` | 사고 과정 배경 |
| `--color-thinking-border` | `#F0C040` | 사고 과정 테두리 |

### 7.2 타이포그래피

- **주 폰트**: Comic Neue (Google Fonts) — 만화체 느낌
- **한글 폴백**: Apple SD Gothic Neo, Malgun Gothic
- **일반 폴백**: cursive, sans-serif

### 7.3 말풍선 스타일

- **사용자**: 노랑 배경 + 오른쪽 하단 꼬리 + 😊 아바타
- **AI**: 흰색 배경 + 왼쪽 하단 꼬리 + 🐶 아바타
- **테두리**: 2.5px 검정 실선 (만화 느낌)
- **그림자**: `box-shadow: 2px 2px 0 #E8D5A3`

### 7.4 배경 패턴

- 하프톤 도트 패턴 (`body::before`)
- `radial-gradient`, 12px 간격, opacity 0.18

---

## 8. 타입 정의

```typescript
// lib/types.ts
export interface ChatMessage {
  id: string;                                    // UUID
  role: "user" | "assistant";                    // 발화자
  content: string;                               // 텍스트 내용
  toolCalls?: {                                  // 도구 호출 목록 (선택)
    name: string;
    input: Record<string, unknown>;
  }[];
}
```

---

## 9. 환경 변수

| 변수명 | 설명 | 필수 |
|--------|------|------|
| `ANTHROPIC_API_KEY` | Anthropic API 키 | O |

Vercel 대시보드에서 설정: **Settings → Environment Variables**

---

## 10. 로컬 개발

```bash
# 의존성 설치
npm install

# 환경 변수 설정
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env.local

# 개발 서버 실행 (Turbopack)
npm run dev

# 빌드
npm run build

# 프로덕션 서버
npm start
```

---

## 11. 배포

### Vercel (GitHub 연동)

1. GitHub 저장소: `ppink-purin/01_stock_hackathon`
2. Vercel 대시보드에서 GitHub 연동 설정 완료
3. `main` 브랜치 push 시 자동 배포
4. 환경 변수 `ANTHROPIC_API_KEY` Vercel 대시보드에서 설정 필요

---

## 12. API 상세

### 12.1 다음 금융 API

**시세 조회**: `GET https://finance.daum.net/api/quotes/A{종목코드}`

```
필수 헤더:
  Referer: https://finance.daum.net/
  User-Agent: Mozilla/5.0 ...
```

응답 필드:

| 필드 | 설명 |
|------|------|
| `name` | 종목명 |
| `symbolCode` | 종목코드 |
| `tradePrice` | 현재가 |
| `change` | 등락 방향 (RISE/FALL/EVEN) |
| `changePrice` | 등락 금액 |
| `changeRate` | 등락률 |
| `openingPrice` | 시가 |
| `highPrice` | 고가 |
| `lowPrice` | 저가 |
| `prevClosingPrice` | 전일 종가 |
| `accTradeVolume` | 거래량 |
| `accTradePrice` | 거래대금 |
| `marketCap` | 시가총액 |
| `foreignRatio` | 외국인 보유 비율 |
| `per` | PER |
| `pbr` | PBR |
| `eps` | EPS |
| `bps` | BPS |
| `dividendYield` | 배당수익률 |
| `high52wPrice` | 52주 최고가 |
| `low52wPrice` | 52주 최저가 |

**시총 랭킹**: `GET https://finance.daum.net/api/domestic/trend/market_capitalization`

### 12.2 네이버 금융 API

**뉴스 조회**: `GET https://m.stock.naver.com/api/news/stock/{종목코드}?page=1&pageSize=5`

**시장 지수**: `GET https://m.stock.naver.com/api/index/KOSPI/basic`

---

## 13. 개발 히스토리

| 순서 | 작업 내용 |
|------|----------|
| 1 | 초기 프로젝트 구조 생성 (Next.js + TypeScript + Tailwind) |
| 2 | "주식도사" → "주식도령 키우Me" 리브랜딩 + 피넛츠 만화 UI 적용 |
| 3 | 후속 질문 버튼 (3개/응답) + 대화 초기화 버튼 추가 |
| 4 | Vercel 배포 (claude-agent-sdk → @anthropic-ai/sdk 마이그레이션) |
| 5 | AI 모델을 Claude Haiku 4.5 (최저가)로 변경 |
| 6 | 이스터 에그 모달 + 예시 질문 10종 확대 |
| 7 | 다음 금융 API 연동 (시세/시총 데이터) |
| 8 | 시장 지수 네이버 fallback 적용 (다음 지수 API 500 에러 대응) |
| 9 | 예시 질문 랜덤 생성 시스템 (36종목 x 18템플릿) |
| 10 | GitHub 저장소 생성 및 push |
| 11 | Vercel-GitHub 연동 (자동 배포) |
