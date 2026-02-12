---
marp: true
theme: default
paginate: true
style: |
  @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');
  section {
    font-family: 'Comic Neue', 'Apple SD Gothic Neo', 'Malgun Gothic', cursive, sans-serif;
    background: #1a1a2e;
    color: #e0e0e0;
    font-size: 28px;
  }
  h1 { color: #FF6B6B; border-bottom: 3px solid #4ECDC4; padding-bottom: 8px; font-size: 1.6em; }
  h2 { color: #c8c8d4; font-size: 1.25em; }
  h3 { color: #4ECDC4; font-size: 1.05em; }
  code { background: #2d2d44; border: 1px solid #444466; border-radius: 4px; padding: 2px 6px; font-size: 0.82em; color: #FF6B6B; }
  pre { background: #0d0d1a !important; border-radius: 12px; border: 2px solid #333355; box-shadow: 3px 3px 0 rgba(0,0,0,0.3); }
  pre code { background: transparent !important; border: none !important; color: #d4d4d4 !important; font-size: 0.78em; }
  a { color: #4ECDC4; text-decoration: underline; }
  table { font-size: 0.82em; border-collapse: collapse; }
  th { background: #2d2d44; color: #4ECDC4; border: 2px solid #444466; padding: 6px 10px; }
  td { border: 2px solid #333355; padding: 6px 10px; color: #d0d0d0; }
  blockquote { border-left: 4px solid #FF6B6B; background: #16162a; padding: 8px 16px; font-size: 0.92em; border-radius: 0 8px 8px 0; color: #c8c8d4; }
  section.lead { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; background: #16213e; color: #e0e0e0; }
  section.lead h1 { color: #FF6B6B; border-bottom: 3px solid #4ECDC4; font-size: 2em; }
  section.lead h2 { color: #e0e0e0; font-size: 1.3em; }
  section.lead h3 { color: #4ECDC4; font-size: 1.1em; }
  section.lead blockquote { border-left-color: #4ECDC4; background: rgba(255,255,255,0.05); color: #e0e0e0; }
  .columns { display: flex; gap: 24px; }
  .columns > * { flex: 1; }
  footer { color: #666680; font-size: 0.55em; }
  strong { color: #FF6B6B; }
  em { color: #4ECDC4; }
---

<!-- _class: lead -->

# 📊 User Analytics

## 우리 서비스의 건강을 진단하는 법

### 🏪 카페 사장님이 되어 고객을 이해해봅시다!

<br>

강의 시간: 60분
핵심 키워드: 이벤트 설계, 클라이언트 수집, Upstash Redis, KPI, 대시보드

---

# 🎬 오늘의 이야기 — "카페 사장님의 하루"

여러분이 **카페 사장님**이라고 상상해보세요! ☕

<div class="columns">
<div class="col">

### 😟 오픈 첫 달

- 손님이 몇 명 오는지 **모름**
- 어떤 메뉴가 인기인지 **감**으로만 판단
- 손님이 왜 나가는지 **모름**
- "아마... 잘 되고 있는 것 같은데?"

</div>
<div class="col">

### 😄 CCTV + POS 설치 후

- 하루 방문객 **47명** (정확한 숫자!)
- 아메리카노가 **63%** 차지
- 평균 체류 시간 **23분**
- "2시~3시에 사람이 몰리니까 알바생을 추가 배치하자!"

</div>
</div>

> 🎯 **오늘의 핵심**: 우리 앱에도 이런 CCTV와 POS 시스템을 만들 거예요!

---

# 📋 오늘 배울 것 — 목차 (1/2)

| 파트 | 주제 | 카페 비유 |
|:----:|------|:--------:|
| **Part 1** | 왜 사용자 분석인가? | 🏪 왜 CCTV가 필요한가? |
| **Part 2** | 전체 구조 | 📹 CCTV 시스템 설계도 |
| **Part 3** | 이벤트 타입 설계 | 🔔 어떤 센서를 달 것인가? |
| **Part 4** | 클라이언트 수집 | 📡 센서가 데이터를 보내는 방법 |
| **Part 5** | 서버 사이드 수집 | 👨‍🍳 주방에서 기록하는 것들 |

---

# 📋 오늘 배울 것 — 목차 (2/2)

| 파트 | 주제 | 카페 비유 |
|:----:|------|:--------:|
| **Part 6** | Upstash Redis 저장소 | 📝 메모판에 기록하기 |
| **Part 7** | KPI 설계 및 계산 | 💊 건강검진 수치 계산 |
| **Part 8** | 대시보드 구현 | 🚗 자동차 계기판 만들기 |
| **Part 9** | 정리 및 확장 | 🎓 졸업! |

---

<!-- _class: lead -->

# Part 1
## 🏪 왜 CCTV가 필요한가?
### (왜 사용자 분석이 필요한가?)

---

# 🎯 비유: 감(感) vs 데이터 📊

카페 사장님 두 분이 계세요:

<div class="columns">
<div class="col">

### 😵‍💫 "감" 사장님

- "손님이 좋아할 **것 같다**"
- "이 메뉴가 잘 나가는 **것 같다**"
- 매출이 떨어져도 **원인 모름**
- 성공해도 **왜 성공했는지 모름**
- 매일 불안... 😰

</div>
<div class="col">

### 🧠 "데이터" 사장님

- "하루 평균 **47명** 방문한다"
- "아메리카노가 **63%** 차지한다"
- 매출이 떨어지면 → **원인 즉시 파악**
- 성공 패턴을 **다음에도 재현** 가능
- 확신을 가지고 결정! 💪

</div>
</div>

---

# 🔗 이것이 Analytics에서는...

| 카페 🏪 | 우리 앱 (주식내비) 📊 |
|---------|---------------------|
| 하루 방문 손님 수 | 세션 수 (몇 명이 앱을 열었는가) |
| 인기 메뉴 | 자주 쓰는 기능 (예시 질문? 직접 입력?) |
| 평균 체류 시간 | 평균 세션 지속 시간 |
| 메뉴 추천 성공률 | 후속 질문 클릭률 |
| POS 오류 횟수 | 도구 호출 실패율 |

> 💡 **핵심 한마디**: "측정할 수 없으면 개선할 수 없다!"

---

# ☕ 우리 앱에서 알고 싶은 것

### 주식내비 키우Me — AI 주식 챗봇

| 궁금한 것 🤔 | 왜 중요한가요? | 카페 비유 🏪 |
|-------------|-------------|------------|
| **얼마나 자주** 대화하나? | 서비스 가치 검증 | 한 번 올 때 몇 잔 시키나? |
| **예시 질문**을 쓰나? | UX 설계 방향 결정 | 메뉴판을 보고 주문하나? |
| **후속 질문** 클릭하나? | 대화 유도 기능 효과 | 추천 메뉴를 시켜보나? |
| **도구 호출** 성공하나? | 외부 API 안정성 | 에스프레소 머신 고장 안 나나? |
| 세션이 **얼마나 오래**? | 사용자 참여도 | 매장에 얼마나 오래 있나? |

---

# ✅ Part 1 정리 — 한 줄 요약

## 📹 CCTV 없는 매장 = Analytics 없는 앱

<br>

### 3가지 원칙을 기억하세요:

| 원칙 | 설명 | 카페 비유 🏪 |
|------|------|------------|
| **비침투적** | 분석이 서비스를 방해하면 안 됨 | CCTV 때문에 커피맛이 변하면 안 됨! |
| **최소 수집** | 필요한 것만 수집 (개인정보 X) | 손님 얼굴 인식 안 함, 동선만 분석 |
| **실시간 가시성** | 바로 확인 가능해야 함 | 모니터에서 바로 볼 수 있어야 함 |

---

<!-- _class: lead -->

# Part 2
## 📹 CCTV 시스템 설계도
### (이벤트 추적 아키텍처)

---

# 🎯 비유: 매장 보안 시스템 전체 구조

카페의 보안/분석 시스템을 설계한다고 상상해보세요!

```
🏪 카페 매장                    📡 관제 센터                  📋 기록 보관소
+-------------------+          +------------------+          +------------------+
|                   |          |                  |          |                  |
| 📹 CCTV 카메라    |  ----→  | 🖥️ 관제 모니터   |  ----→  | 📁 녹화 저장소    |
| 🔔 출입문 센서    |          | 📊 집계 프로그램  |          | 📝 메모판        |
| 💰 POS 단말기    |          |                  |          |                  |
+-------------------+          +------------------+          +------------------+

  고객의 모든 행동을              데이터를 받아서               안전하게 저장하고
  감지하고 전송                    처리                       나중에 꺼내 봄
```

---

# 🔗 이것이 Analytics에서는... (구조도)

```
🌐 React 브라우저                ⚡ Next.js 서버               ☁️ Upstash Redis
+-------------------+          +------------------+          +------------------+
|                   |          |                  |          |                  |
| 📱 useAnalytics() |  ----→  | 📨 API Route     |  ----→  | 💾 Redis List    |
| 📡 sendBeacon()   |          | 🔧 도구 호출 추적 |          | 📊 LPUSH/LTRIM   |
|                   |          |                  |          |                  |
+-------------------+          +------------------+          +------------------+
```

> 🎯 카페 비유와 1:1 대응!

---

# 🔗 이것이 Analytics에서는... (매핑표)

| 카페 🏪 | 코드 💻 |
|---------|---------|
| CCTV 카메라 | `useAnalytics()` 훅 |
| 출입문 센서 | `sendBeacon()` 전송 |
| 녹화 저장소 | Upstash Redis |
| 관제 모니터 | Analytics 대시보드 |

> 고객(사용자)의 행동을 감지하고 전송 → 서버에서 받아서 추가 정보도 기록 → Redis에 저장하고 대시보드에서 조회

---

# 📁 파일 구조 — 우리가 만든 7개 파일

```
🏪 카페 비유로 보는 파일 구조:

lib/analytics/
  types.ts      ← 📋 "어떤 센서를 설치할지" 목록       (센서 설계도)
  tracker.ts    ← 📡 "센서가 데이터 보내는 방법"       (CCTV + 센서)
  logger.ts     ← 📝 "메모판에 기록하는 방법"          (녹화 저장소)
  stats.ts      ← 🧮 "건강검진 수치 계산하는 방법"     (분석 프로그램)

app/api/analytics/
  events/route.ts  ← 📨 "센서 데이터 접수 창구"        (관제 센터 입구)
  stats/route.ts   ← 📊 "분석 결과 조회 창구"          (보고서 출력기)
```

> 약 **850줄의 코드**로 완전한 분석 시스템이 만들어져요! ✨

---

# 📁 파일 구조 — 대시보드 파일

```
🏪 카페 비유로 보는 파일 구조 (계속):

app/analytics/
  page.tsx         ← 🖥️ "관제 모니터 화면"             (대시보드)
```

> 총 7개 파일로 이벤트 설계 → 수집 → 저장 → 계산 → 시각화 파이프라인 완성!

---

# 📊 데이터가 흐르는 6단계

### 카페에서 손님이 커피를 사는 과정처럼!

| 단계 | 카페 🏪 | 우리 앱 💻 |
|:----:|---------|----------|
| **1단계** | 손님이 문을 연다 🚪 | 사용자가 메시지를 보낸다 |
| **2단계** | 센서가 감지 → 관제실로 전송 📡 | sendBeacon으로 서버에 전송 |
| **3단계** | 관제실에서 데이터 접수 📨 | API Route에서 JSON 파싱 |
| **4단계** | 녹화 저장소에 보관 💾 | Redis에 LPUSH로 저장 |
| **5단계** | 월말 분석 보고서 작성 📋 | computeStats()로 KPI 계산 |

---

# 📊 데이터가 흐르는 6단계 (계속)

| 단계 | 카페 🏪 | 우리 앱 💻 |
|:----:|---------|----------|
| **6단계** | 사장님이 모니터로 확인 🖥️ | 대시보드에서 30초마다 확인 |

> 🎯 1~5단계에서 모은 데이터를 6단계에서 시각화!

---

# 🤔 퀴즈 타임! — Part 2

### Q: 아래 빈칸에 알맞은 것은?

카페에서 **CCTV 녹화 저장소**의 역할을 하는 것은 우리 앱에서 _____ 이다.

<br>

| 보기 | |
|:----:|---|
| ① | React 컴포넌트 |
| ② | **Upstash Redis** |
| ③ | TypeScript |
| ④ | 대시보드 |

> 💡 정답: ② Upstash Redis — 모든 이벤트 데이터를 보관하는 저장소예요!

---

<!-- _class: lead -->

# Part 3
## 🔔 어떤 센서를 달 것인가?
### (이벤트 타입 설계)

---

# 🎯 비유: 매장에 설치할 센서 종류

카페에 어떤 센서를 설치하면 좋을까요? 🤔

```
🏪 카페 매장의 센서 배치도

  🚪 출입문 센서           → 누가 들어오고 나갔는지
  ⏱️ 체류 시간 센서        → 얼마나 오래 있었는지
  💬 주문 카운터 센서       → 무엇을 주문했는지
  📋 메뉴판 터치 센서       → 메뉴판을 어디 눌렀는지
  👆 추천메뉴 터치 센서     → 추천 메뉴를 골랐는지
  ☕ 에스프레소 머신 센서   → 커피가 잘 나왔는지 / 고장났는지
  ✅ 주문 완료 센서         → 주문이 성공적으로 완료됐는지
  ❌ 에러 알람              → 뭔가 잘못됐을 때
```

> **총 10개의 센서** = 매장에서 일어나는 모든 일을 파악!

---

# 🔗 10개 이벤트 — 센서 1~5

| # | 센서 (카페) 🏪 | 이벤트 (앱) 💻 | 뭘 감지하나요? |
|---|-------------|------------|-------------|
| 1 | 🚪 출입문 센서 | `session_start` | 앱에 들어옴 |
| 2 | ⏱️ 퇴장 센서 | `session_end` | 앱을 나감 (체류 시간 기록) |
| 3 | 💬 주문 카운터 | `message_send` | 사용자가 직접 메시지 입력 |
| 4 | 📋 메뉴판 터치 | `example_click` | 예시 질문 클릭 |
| 5 | 👆 추천메뉴 터치 | `followup_click` | 후속 질문 클릭 |

---

# 🔗 10개 이벤트 — 센서 6~10

| # | 센서 (카페) 🏪 | 이벤트 (앱) 💻 | 뭘 감지하나요? |
|---|-------------|------------|-------------|
| 6 | ☕ 에스프레소 머신 | `tool_call` | 도구(API) 호출 결과 |
| 7 | ✅ 주문 완료 벨 | `response_complete` | AI 응답 완료 |
| 8 | ❌ 에러 알람 | `response_error` | 오류 발생 |
| 9 | 🧹 테이블 리셋 | `chat_reset` | 대화 초기화 |
| 10 | 🥚 이스터에그 | `easter_egg_click` | 숨겨진 기능 발견! |

---

# 🎯 비유: 모든 센서의 공통 기본 장비

모든 센서에는 **기본 장비 3가지**가 있어요:

```
📦 센서 기본 장비 (BaseEvent)
┌─────────────────────────────────────────┐
│                                         │
│  🏷️ 센서 이름    → "출입문 센서"         │  ← 어떤 종류의 센서?
│  🎫 방문 번호표  → "A-001"              │  ← 어떤 손님의 기록?
│  🕐 시간 도장    → "오후 2:30:15"       │  ← 언제 감지했는지?
│                                         │
└─────────────────────────────────────────┘
```

> 이 3가지만 있으면 **누가, 언제, 무엇을** 했는지 알 수 있어요!

---

# 🔗 이것이 코드에서는... BaseEvent

```typescript
// lib/analytics/types.ts — 모든 이벤트의 공통 뼈대

export interface BaseEvent {
  event: string;       // 🏷️ 센서 이름 (어떤 이벤트인지)
  sessionId: string;   // 🎫 방문 번호표 (어떤 손님인지)
  timestamp: string;   // 🕐 시간 도장 (언제 발생했는지)
}
```

| 카페 비유 🏪 | 코드 필드 💻 | 예시 |
|-------------|------------|------|
| 센서 이름 | `event` | `"message_send"` |
| 방문 번호표 | `sessionId` | `"a1b2c3d4-..."` |
| 시간 도장 | `timestamp` | `"2025-01-15T09:30:00Z"` |

---

# 🚪 센서 1-2: 출입문 센서 (세션 시작/종료)

### 카페 비유 🏪

손님이 **문을 열고 들어오면** 번호표 발급! 🎫
**나갈 때** 체류 시간과 주문 수 기록! ⏱️

```typescript
// 들어올 때 — 딩동! 🔔
interface SessionStartEvent extends BaseEvent {
  event: "session_start";
}
// 나갈 때 — 안녕히 가세요! 👋
interface SessionEndEvent extends BaseEvent {
  event: "session_end";
  durationMs: number;      // ⏱️ 몇 밀리초 동안 있었는지
  messageCount: number;    // 💬 몇 번 대화했는지
}
```

> ✅ **세션 = 한 번의 매장 방문** (들어오면 시작, 나가면 끝)

---

# 💬 센서 3: 주문 카운터 센서 (메시지 전송)

### 카페 비유 🏪

손님이 직접 입으로 **"아메리카노 한 잔이요!"** 라고 주문한 순간을 기록!

```typescript
interface MessageSendEvent extends BaseEvent {
  event: "message_send";
  messageLength: number;    // 📏 주문이 얼마나 길었는지 (글자 수)
  isFirstMessage: boolean;  // 🥇 첫 주문인지 아닌지
}
```

| 카페 🏪 | 코드 💻 | 왜 중요? |
|---------|---------|---------|
| 주문 길이 | `messageLength` | 상세 질문 vs 간단 질문 구분 |
| 첫 주문 여부 | `isFirstMessage` | 신규 고객 행동 패턴 분석 |

---

# 📋👆 센서 4-5: 메뉴판/추천 터치 센서 (클릭)

### 카페 비유 🏪

- **메뉴판 터치** 📋 = 벽에 붙은 인기메뉴를 손가락으로 가리키며 "이거 주세요!"
- **추천메뉴 터치** 👆 = 직원이 "이것도 드셔보세요" 했더니 실제로 선택!

```typescript
interface ExampleClickEvent extends BaseEvent {
  event: "example_click";
  question: string;          // 📋 어떤 예시 질문을 골랐는지
}

interface FollowupClickEvent extends BaseEvent {
  event: "followup_click";
  question: string;          // 👆 어떤 후속 질문을 골랐는지
}
```

> ✅ **question** 필드까지 저장해서 "가장 인기 있는 질문"을 알 수 있어요!

---

# ☕ 센서 6: 에스프레소 머신 센서 (도구 호출)

### 카페 비유 🏪

에스프레소 머신이 **잘 작동하는지** 체크하는 센서!
- 커피가 잘 나왔나? ✅ / 기계가 고장 났나? ❌ / 추출에 몇 초 걸렸나? ⏱️

```typescript
interface ToolCallEvent extends BaseEvent {
  event: "tool_call";
  toolName: string;      // ☕ 어떤 도구를 사용했나
  success: boolean;      // ✅/❌ 성공했나 실패했나
  durationMs: number;    // ⏱️ 몇 밀리초 걸렸나
  error?: string;        // 📝 실패했으면 왜? (선택사항)
}
```

> ☕ 에스프레소 머신이 고장 나면 카페 운영이 안 되듯, 🔧 도구가 실패하면 AI가 답변을 못 해요!

---

# ✅❌🧹🥚 센서 7-10: 나머지 센서들

### 간단 정리표

| 센서 | 이벤트 | 카페 비유 🏪 |
|------|--------|------------|
| ✅ 주문 완료 벨 | `response_complete` | "주문하신 커피 나왔습니다~" |
| ❌ 에러 알람 | `response_error` | "죄송합니다, 재료가 떨어졌습니다..." |
| 🧹 테이블 리셋 | `chat_reset` | 손님이 테이블 정리 후 새로 시작 |
| 🥚 이스터에그 | `easter_egg_click` | 매장 구석 숨겨진 장식 발견! |

> 💡 `chat_reset`은 "얼마나 대화 후 리셋하는가?"를 분석할 수 있어요

---

# 💻 전체 센서를 하나로 묶기 — Union Type

### 카페 비유 🏪

**"설치된 센서 전체 목록"** 을 만드는 것!

```typescript
// 우리 매장에 설치된 모든 센서 목록
export type AnalyticsEvent =
  | SessionStartEvent      // 🚪 출입문 센서
  | SessionEndEvent        // ⏱️ 퇴장 센서
  | MessageSendEvent       // 💬 주문 카운터
  | ExampleClickEvent      // 📋 메뉴판 터치
  | FollowupClickEvent     // 👆 추천 터치
  | ToolCallEvent          // ☕ 에스프레소 머신
  | ResponseCompleteEvent  // ✅ 완료 벨
  | ResponseErrorEvent     // ❌ 에러 알람
  | ChatResetEvent         // 🧹 리셋
  | EasterEggClickEvent;   // 🥚 이스터에그
```

> ✅ TypeScript가 "이 센서 목록에 없는 건 인정하지 않겠다!" 고 지켜줘요!

---

# 🤔 퀴즈 타임! — Part 3

### Q: 사용자가 AI의 후속 질문 "삼성전자 배당금은?"을 클릭했어요. 어떤 이벤트가 발생할까요?

| 보기 | |
|:----:|---|
| ① | `message_send` — 메시지를 보냈으니까 |
| ② | `example_click` — 예시 질문이니까 |
| ③ | **`followup_click`** — AI가 추천한 후속 질문이니까 |
| ④ | `tool_call` — 도구가 호출될 거니까 |

> 💡 **정답**: ③ `followup_click`!
> 예시 질문은 처음 화면의 추천, 후속 질문은 AI가 대화 중에 제안한 것이에요!

---

<!-- _class: lead -->

# Part 4
## 📡 센서가 데이터를 보내는 방법
### (클라이언트 이벤트 수집)

---

# 🎯 비유: 방문 번호표 시스템

카페에 들어오면 **번호표**를 받죠? 🎫

```
🎫 번호표 발급 시스템

  손님 A가 들어옴 → 번호표 "A-001" 발급!
  손님 A가 주문함 → 번호표 "A-001" 로 기록
  손님 A가 또 주문 → 번호표 "A-001" 로 기록 (같은 번호!)
  손님 A가 나감   → 번호표 "A-001" 반납
  손님 B가 들어옴 → 번호표 "B-002" 발급! (다른 번호)
```

### 핵심 규칙

- 같은 손님은 **나갈 때까지 같은 번호표** 사용
- 다시 오면 **새 번호표** 발급
- 번호표는 **랜덤** (이름이나 전화번호가 아님! → 개인정보 보호 🔒)

---

# 🔗 이것이 코드에서는... Session ID

```typescript
// lib/analytics/tracker.ts — 번호표 발급 시스템!

let _sessionId: string | null = null;  // 📦 번호표 보관함

export function getSessionId(): string {
  if (!_sessionId) {
    _sessionId = crypto.randomUUID();  // 🎫 새 번호표 발급!
  }
  return _sessionId;  // 🎫 기존 번호표 재사용
}
```

| 카페 🏪 | 코드 💻 | 설명 |
|---------|---------|------|
| 번호표 보관함 | `_sessionId` 변수 | 한 번 발급하면 계속 사용 |
| 번호표 발급 | `crypto.randomUUID()` | 랜덤 고유 번호 생성 |

---

# 🎯 비유: 퇴근길 우체통에 편지 넣기 ✉️

센서가 감지한 데이터를 어떻게 관제실로 보낼까요?

```
📬 두 가지 배달 방법

  방법 1: 퇴근길 우체통 📮 (sendBeacon)
  ┌──────────────────────────────────────────────┐
  │  퇴근하면서 우체통에 편지를 톡! 넣고 간다     │
  │  → 답장을 기다리지 않는다 (fire-and-forget)   │
  │  → 이미 퇴근해도 편지는 배달된다! 📮✅         │
  └──────────────────────────────────────────────┘

  방법 2: 직접 택배 📦 (fetch)
  ┌──────────────────────────────────────────────┐
  │  택배 기사를 불러서 직접 보낸다               │
  │  → 배달 완료 확인 가능 (Promise)              │
  └──────────────────────────────────────────────┘
```

> 🎯 **핵심**: 페이지를 닫아도 데이터가 전달되어야 해요!

---

# 🔗 이것이 코드에서는... sendBeacon + fetch

```typescript
// lib/analytics/tracker.ts — 3단계 배달 전략

function trackEvent(event: string, metadata?: Record<string, unknown>) {
  const payload = JSON.stringify({
    event,
    sessionId: getSessionId(),
    timestamp: new Date().toISOString(),
    ...metadata,
  });
  try {
```

> 📮 먼저 sendBeacon(우체통)으로 시도!

---

# 🔗 sendBeacon + fetch (계속)

```typescript
    // 1️⃣ 먼저 우체통에 넣기 시도! 📮
    if (navigator.sendBeacon) {
      const sent = navigator.sendBeacon("/api/analytics/events", payload);
      if (sent) return;  // 성공하면 끝!
    }
  } catch { /* 실패하면 다음 방법으로 */ }

  // 2️⃣ 안 되면 택배로 보내기 📦
  fetch("/api/analytics/events", {
    method: "POST", body: payload, keepalive: true,
  }).catch(() => {});  // 3️⃣ 그마저도 실패? 그냥 포기!
}
```

> ✅ **핵심 원칙**: Analytics가 실패해도 커피(앱)는 맛있어야 해요! ☕

---

# 📮 sendBeacon vs 📦 fetch — 비교표

| 특성 | 📮 sendBeacon (우체통) | 📦 fetch (택배) |
|------|---------------------|----------------|
| 페이지 닫을 때 | 편지는 **전달 보장**! ✅ | 배달 기사가 **멈출 수도** ⚠️ |
| 답장(응답) | 없음 (넣고 끝) | 있음 (배달 확인 가능) |
| 데이터 크기 | 약 64KB 제한 | 제한 없음 |
| 복잡도 | 매우 간단 | 좀 더 복잡 |

### 우리의 3단계 안전 전략 🛡️

1. 📮 **sendBeacon** 시도 → 페이지 닫힘에도 안전!
2. 📦 **fetch** + `keepalive` → 대안!
3. 🤷 **실패해도 OK** → `.catch(() => {})` 로 앱은 절대 멈추지 않음!

---

# 🎯 비유: 카페 직원의 하루 (useAnalytics 훅)

카페 직원이 출근해서 퇴근까지 하는 일을 상상해보세요!

```
👨‍💼 직원(useAnalytics)의 하루

  🌅 출근 (컴포넌트 마운트)
     → "출근했습니다!" 기록 (session_start)
     → 스톱워치 시작 ⏱️

  ☀️ 근무 중
     → 손님이 주문할 때마다 기록 (message_send)
     → 추천 메뉴 선택하면 기록 (followup_click)

  🌙 퇴근 (페이지 닫기 / 컴포넌트 언마운트)
     → "퇴근합니다!" (session_end)
```

---

# 🔗 이것이 코드에서는... useAnalytics 훅

```typescript
// lib/analytics/tracker.ts — 직원의 출퇴근 관리

export function useAnalytics() {
  const sessionStart = useRef<number>(Date.now());
  const messageCount = useRef(0);

  useEffect(() => {
    sessionStart.current = Date.now();
    trackEvent("session_start");  // 🌅 "출근했습니다!"

    const handleUnload = () => {
```

> ⏱️ 스톱워치 시작 + 출근 기록!

---

# 🔗 useAnalytics 훅 (계속)

```typescript
      trackEvent("session_end", {  // 🌙 "퇴근합니다!"
        durationMs: Date.now() - sessionStart.current,
        messageCount: messageCount.current,
      });
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => { handleUnload(); };
  }, []);
  // ...
}
```

> ✅ React 정리 시에도 퇴근 보고! `beforeunload`와 cleanup 양쪽에서 안전하게!

---

# 🛎️ 직원이 제공하는 기록 서비스 (반환 인터페이스)

```typescript
// lib/analytics/tracker.ts — 직원이 할 수 있는 일 목록

return {
  sessionId: getSessionId(),       // 🎫 손님 번호표
  trackMessageSend,                // 💬 "주문 기록합니다!"
  trackExampleClick,               // 📋 "메뉴판 터치 기록!"
  trackFollowupClick,              // 👆 "추천메뉴 선택 기록!"
  trackResponseComplete,           // ✅ "주문 완료 기록!"
  trackResponseError,              // ❌ "에러 발생 기록!"
  trackChatReset,                  // 🧹 "테이블 정리 기록!"
  trackEasterEggClick,             // 🥚 "이스터에그 발견 기록!"
};
```

> 💡 `analytics.trackMessageSend(...)` ← 이 한 줄이면 끝! ✨

---

# 🏪 실제 매장에서 사용하기 (Chat 컴포넌트 통합)

```typescript
// components/chat.tsx — 매장 운영 코드

export function Chat() {
  const analytics = useAnalytics();  // 👨‍💼 직원 배치!

  // 💬 손님이 직접 말로 주문할 때
  const handleSubmit = (e) => {
    const text = input.trim();
    analytics.trackMessageSend(text.length, messages.length === 0);
    sendMessage(text);
  };
```

> 핵심 코드에 1줄만 추가하면 기록 완료!

---

# 🏪 실제 매장에서 사용하기 (계속)

```typescript
  // 📋 메뉴판에서 골라 주문할 때
  const handleExampleClick = (question: string) => {
    analytics.trackExampleClick(question);
    sendMessage(question);
  };

  // 👆 추천 메뉴를 선택할 때
  const handleFollowUpClick = (question: string) => {
    analytics.trackFollowupClick(question);
    sendMessage(question);
  };
}
```

> ✅ 모든 사용자 행동을 **1줄씩** 추가해서 기록!

---

# ✅ Part 4 정리 — 클라이언트 수집의 핵심 패턴

### "1줄의 기록 = 1개의 이벤트 수집" ✨

```
🏪 카페 운영 코드에서:

  // 기존 코드 (커피 만드는 핵심 로직)
  sendMessage(text);

  // 추가한 코드 (Analytics 기록 — 딱 1줄!)
  analytics.trackMessageSend(text.length, isFirst);
```

### 이게 바로 **비침투적(Non-Intrusive)** 설계!

| 원칙 | 설명 |
|------|------|
| 1줄 추가 | 핵심 코드에 1줄만 추가 |
| 실패해도 OK | Analytics 에러 → 무시 |
| 자동 세션관리 | 마운트/언마운트로 자동 |

---

# 🤔 퀴즈 타임! — Part 4

### Q: 사용자가 앱을 사용하다가 브라우저 탭을 닫았어요. session_end 이벤트가 전송될까요?

| 보기 | |
|:----:|---|
| ① | 아니요, 탭을 닫으면 모든 게 사라져요 |
| ② | **네! sendBeacon이 퇴근길 우체통처럼 전달해요** |
| ③ | 서버에서 알아서 감지해요 |
| ④ | 새로고침해야만 전송돼요 |

> 💡 **정답**: ② sendBeacon은 **페이지가 닫혀도** 데이터를 전송해요!
> 퇴근길에 우체통에 편지 넣는 것처럼요! 📮✨

---

<!-- _class: lead -->

# Part 5
## 👨‍🍳 주방에서 기록하는 것들
### (서버 사이드 이벤트 수집)

---

# 🎯 비유: 주방 안의 기록 📝

카페에는 **손님 눈에 보이는 홀**과 **보이지 않는 주방**이 있어요!

<div class="columns">
<div class="col">

### 🛋️ 홀 (클라이언트)

손님이 직접 하는 행동:
- 🚪 입장/퇴장
- 💬 주문하기
- 📋 메뉴판 터치
- 👆 추천메뉴 선택

*→ 센서(sendBeacon)가 기록*

</div>
<div class="col">

### 👨‍🍳 주방 (서버)

손님 눈에 안 보이는 작업:
- ☕ 에스프레소 추출 (tool_call)
- ✅ 음료 완성 (response_complete)
- ❌ 재료 부족 에러 (response_error)
- 💰 원두 사용량 (API 비용)

*→ 주방장이 직접 기록*

</div>
</div>

> 🎯 **핵심**: 주방에서 일어나는 일은 주방장(서버)이 직접 기록해야 해요!

---

# 🔗 이벤트 수집 API — 관제실 접수 창구

### 카페 비유 🏪

홀에서 보낸 보고서든, 주방에서 보낸 보고서든, **관제실**에서 접수해요!

```typescript
// app/api/analytics/events/route.ts — 관제실 접수 창구

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    event = await req.json();
  } else {
    const text = await req.text();   // sendBeacon은 text/plain!
    event = JSON.parse(text);
  }
  await appendEvent(event);          // 📝 메모판에 기록!
}
```

---

# ☕ 서버에서 도구 호출 추적 (에스프레소 머신 모니터링)

### 카페 비유 🏪

주방장이 에스프레소를 추출할 때마다 **기록일지**를 써요:
- ☕ 어떤 머신을 썼나? / ✅❌ 잘 나왔나? / ⏱️ 몇 초 걸렸나?

### 2단계 성공/실패 판정

| 단계 | 카페 🏪 | 코드 💻 |
|:----:|---------|---------|
| 1단계 | 머신이 아예 작동 안 함 | try-catch 에러 (네트워크 실패) |
| 2단계 | 머신은 작동했지만 맛이 이상함 | API는 응답했지만 데이터 없음 |

> 🎯 에스프레소가 안 나와도, 맛이 이상해도, **둘 다 감지**해야 해요!

---

# 💰 API 비용 추적 — 원두 사용량 계산

### 카페 비유 🏪

```
☕ 원두 비용 계산

  아메리카노 1잔 = 원두 18g 사용
  하루 50잔 판매 = 원두 900g 사용
  원두 1kg = 15,000원
  → 하루 원두 비용 = 약 13,500원
```

### 이것이 코드에서는... 💻

```
🤖 AI API 비용 계산

  입력 토큰 비용 = (토큰 수 / 1,000,000) × $1.00 × 1,450원
  출력 토큰 비용 = (토큰 수 / 1,000,000) × $5.00 × 1,450원
```

> 💡 원두 사용량을 추적하듯, **API 토큰 사용량**을 추적해서 운영 비용을 관리해요!

---

# ✅ Part 5 정리 — 클라이언트 vs 서버 이벤트

| 구분 | 홀 (클라이언트) 🛋️ | 주방 (서버) 👨‍🍳 |
|------|----------------|-------------|
| **기록하는 사람** | 센서 (sendBeacon) | 주방장 (직접 호출) |
| **기록 방법** | 우체통 → 관제실 | 주방에서 직접 메모 |
| **신뢰도** | 네트워크에 의존 | 서버 안에서 직접 = 높음 |
| **비용 데이터** | 접근 불가 ❌ | 직접 계산 가능 ✅ |

### 둘을 연결하는 것은? 🎫 **번호표 (sessionId)**!

> 같은 번호표로 연결하면 전체 그림이 완성돼요! 🧩

---

<!-- _class: lead -->

# Part 6
## 📝 메모판에 기록하기
### (Upstash Redis 저장소)

---

# 🎯 비유: 포스트잇 메모판 📝

카페 관제실에 커다란 **포스트잇 메모판**이 있다고 상상해보세요!

```
📝 포스트잇 메모판 (Redis)
┌─────────────────────────────────────────────────┐
│  📌 10:03 — 손님A 아메리카노 주문    [최신]      │
│  📌 10:02 — 에스프레소 머신 정상 작동            │
│  📌 10:01 — 손님A 메뉴판 터치                    │
│  📌 10:00 — 손님A 입장                           │
│  ...                                            │
│  📌 09:00 — 손님Z 퇴장              [가장 오래됨] │
│  최대 10,000장! 넘치면 아래부터 떼어냄 🗑️        │
└─────────────────────────────────────────────────┘
```

> 📌 **빠르게 붙이기** (LPUSH), 👀 **빠르게 읽기**, 🗑️ **오래된 건 떼기** (LTRIM)

---

# 🔗 왜 포스트잇 메모판(Redis)인가?

### Serverless 환경의 한계 🚧

| 문제 | 카페 비유 🏪 | 해결 |
|------|------------|------|
| 파일에 못 씀 | 매장이 매번 리모델링됨 | **메모판(Redis)**은 벽에 고정! |
| 매번 새 연결 | 매번 전화해서 녹화실에 접속 | **HTTP 한 줄이면 OK** |
| 비용 | 녹화실 24시간 운영 비용 | **쓸 때만 비용**, 안 쓰면 무료 |

### Upstash Redis의 장점 ✨

| 장점 | 설명 |
|------|------|
| 🌐 HTTP 기반 | 커넥션 풀 불필요, 간편 접속 |
| 💰 무료 티어 | 하루 10,000 요청 무료 |

---

# 💻 메모판 연결하기 — Redis 연결 코드

```typescript
// lib/analytics/logger.ts — 메모판 연결

const REDIS_KEY = "analytics:events";  // 📝 메모판 이름
const MAX_EVENTS = 10_000;              // 📌 최대 메모 수

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  redis = new Redis({ url, token });
  return redis;
}
```

> 💡 `getRedis()` = 처음 한 번만 연결, 이후 재사용!

---

# 🎯 비유: 새 메모 붙이기 (LPUSH)

```
📝 LPUSH = 새 메모를 맨 위에 슥! 붙이기

  메모판                       새 메모 도착!
  ┌──────────┐               ┌──────────┐
  │ 2번 메모  │   ← LPUSH ←  │ 3번 메모  │
  │ 1번 메모  │               └──────────┘
  └──────────┘

  결과:
  ┌──────────┐
  │ 3번 메모  │  ← 최신이 맨 위!
  │ 2번 메모  │
  │ 1번 메모  │
  └──────────┘
```

---

# 🎯 비유: 오래된 메모 떼기 (LTRIM)

```
🗑️ LTRIM = 메모판이 꽉 차면 아래부터 떼기!

  메모판 (최대 3장이라면)     10,001번째 메모가 오면?
  ┌──────────┐               ┌──────────┐
  │ 3번 메모  │               │ 4번 메모  │  최신 3개만 유지!
  │ 2번 메모  │  → LTRIM →   │ 3번 메모  │
  │ 1번 메모  │               │ 2번 메모  │
  └──────────┘               └──────────┘
                               1번은 자동 삭제! 🗑️
```

> 💡 10,000장 넘으면 자동으로 오래된 메모부터 떼어냄!

---

# 🔗 이것이 코드에서는... LPUSH + LTRIM

```typescript
// lib/analytics/logger.ts — 메모 붙이기/떼기

export async function appendEvent(
  event: Record<string, unknown>
): Promise<void> {
  try {
    const r = getRedis();
    if (!r) return;
    const line = JSON.stringify(event);
    await r.lpush(REDIS_KEY, line);     // 📌 맨 위에 새 메모!
    await r.ltrim(REDIS_KEY, 0, MAX_EVENTS - 1);  // 🗑️ 초과분 삭제
  } catch {
    // 🤷 실패해도 OK — 앱은 계속 동작!
  }
}
```

| Redis 명령 | 카페 비유 🏪 | 속도 |
|-----------|------------|:----:|
| `LPUSH` | 📌 새 메모 맨 위에 붙이기 | ⚡ O(1) |
| `LTRIM` | 🗑️ 오래된 메모 떼기 | ⚡ 빠름 |

---

# 📖 메모 전부 읽기 — readAllEvents

```typescript
// lib/analytics/logger.ts — 메모판 전체 읽기

export async function readAllEvents(): Promise<RawEvent[]> {
  try {
    const r = getRedis();
    if (!r) return [];

    const items = await r.lrange(REDIS_KEY, 0, -1);
    const events = items
      .reverse()                        // 🔄 시간순으로 뒤집기
      .map((line) => {
```

> 📖 전체 메모를 한 번에 읽고 시간순 정렬!

---

# 📖 readAllEvents (계속)

```typescript
        try { return JSON.parse(line); }  // 📝 메모 해석
        catch { return null; }             // ❌ 못 읽으면 버리기
      })
      .filter((e) => e !== null);          // 🧹 정리

    return events;
  } catch {
    return [];                             // 🤷 실패? 빈 목록!
  }
}
```

> 💡 LPUSH로 저장하면 최신이 맨 위 → `.reverse()`로 **시간순 정렬**!

---

# 🛡️ 3중 방어! — 방어적 프로그래밍

### 카페 비유 🏪

```
"CCTV가 고장 나도, 메모판이 떨어져도, 커피는 계속 팔아야 한다!" ☕

  🛡️ 방어 1: Fire-and-Forget (발사 후 잊기)
     → 메모 붙이기 실패해도 아무 일 없는 척! catch { }

  🛡️ 방어 2: Graceful Degradation (우아한 저하)
     → 메모판이 없으면? 빈 결과 반환! if (!r) return [];

  🛡️ 방어 3: Defensive Parsing (방어적 해석)
     → 메모가 찢어져서 못 읽겠으면? 그 메모만 버리기!
```

> 📝 메모판(Redis) 연결 실패 → 앱 정상 ✅ / 메모 읽기 실패 → 빈 결과 반환, 앱 정상 ✅

---

# 🤔 퀴즈 타임! — Part 6

### Q: Redis에 이벤트가 10,001개 쌓이면 어떻게 될까요?

| 보기 | |
|:----:|---|
| ① | 에러가 발생하고 앱이 멈춘다 |
| ② | 10,001개 전부 유지된다 |
| ③ | **LTRIM이 가장 오래된 1개를 자동 삭제!** |
| ④ | 전부 삭제되고 처음부터 다시 시작 |

<br>

> 💡 **정답**: ③ LTRIM이 **자동 롤링**!
> 메모판이 꽉 차면 맨 아래(가장 오래된) 메모부터 떼어내요! 🗑️

---

<!-- _class: lead -->

# Part 7
## 💊 건강검진 수치 계산
### (KPI 설계 및 계산)

---

# 🎯 비유: 서비스의 건강검진 💊

여러분이 건강검진을 받으러 가면 어떤 **수치표**를 받죠?

```
💊 김건강 님의 건강검진 결과

  혈압:       120/80  ✅ 정상
  콜레스테롤: 195     ✅ 정상
  혈당:       105     ⚠️ 주의
  체중:       75kg    ✅ 정상
  심박수:     72      ✅ 정상
```

### 이걸 보면 한눈에 알 수 있어요:
- 어디가 **정상**이고 ✅
- 어디가 **주의**가 필요하고 ⚠️
- 어디가 **위험**한지 🔴

> 🎯 우리 앱도 이런 **건강검진 수치표(KPI)**가 필요해요!

---

# 🔗 이것이 Analytics에서는... 5개 KPI!

```
💊 주식내비 앱 건강검진 결과

  📊 세션당 대화 횟수:        3.25회  ✅ 적정 활용
  👆 후속질문 클릭률:          42.5%  ✅ 좋은 편
  🔧 도구 호출 성공률:        94.67%  ✅ 안정적
  ⏱️ 평균 세션 지속 시간:     03:45   ✅ 적정 참여
  📋 예시 질문 사용률:        65.0%   ✅ 온보딩 효과적
```

| KPI | 건강검진 비유 💊 |
|-----|----------------|
| 세션당 대화 횟수 | 하루 식사 횟수 🍽️ |
| 후속질문 클릭률 | 약 복용 준수율 💊 |
| 도구 호출 성공률 | 장기 기능 검사 🫀 |
| 세션 지속 시간 | 수면 시간 💤 |
| 예시 사용률 | 운동 빈도 🏃 |

---

# 🧮 모든 계산의 시작 — 세션별 그룹핑

### 카페 비유 🏪

건강검진 전에 먼저 **환자별로 기록을 분류**하죠?

```
📂 환자(세션)별 기록 분류

  🎫 손님 A (abc-123): [입장, 주문, 에스프레소, ...]
  🎫 손님 B (def-456): [입장, 메뉴터치, 에스프레소, ...]
  🎫 손님 C (ghi-789): [입장, 주문, 추천선택, ...]
```

### 코드 💻

```typescript
// lib/analytics/stats.ts — 환자별 기록 분류
const sessions = new Map<string, RawEvent[]>();
for (const e of events) {
  const sid = e.sessionId;
  if (!sessions.has(sid)) sessions.set(sid, []);
  sessions.get(sid)!.push(e);
}
```

---

# 📊 KPI 1: 세션당 대화 횟수 (messagesPerSession)

### 카페 비유 🏪

> **"한 번 매장에 올 때 평균 몇 잔 시키는가?"** 🍵

```
📊 계산 방법

  총 주문 수 = 직접 주문 + 메뉴판 주문 + 추천 메뉴 선택
  세션당 대화 횟수 = 총 주문 수 / 총 방문 횟수
```

### 해석 가이드 📖

| 수치 | 의미 | 카페 비유 🏪 |
|:----:|------|------------|
| < 1.5 | 한 잔만 시키고 감 😟 | 온보딩 개선 필요! |
| 2 ~ 4 | 적정 소비 😊 | 좋아요! 유지합시다! |
| > 5 | VIP 고객! 🌟 | 파워유저 분석 대상! |

---

# 👆 KPI 2: 후속질문 클릭률 (followupClickRate)

### 카페 비유 🏪

> **"직원이 '이것도 드셔보세요~' 하면 실제로 주문하는 비율"** 🛒

```
👆 계산 방법

  클릭률(%) = (추천메뉴 선택 수 / 추천메뉴 제안 횟수) × 100
```

### 왜 중요한가요? 🤔

| 높으면 ↑ | 낮으면 ↓ |
|----------|----------|
| AI 추천이 **유용하다**! 🎉 | AI 추천이 **별로다**... 😕 |
| 대화가 **자연스럽게** 이어짐 | 사용자가 **무시**하고 있음 |
| → 추천 로직 유지! | → 추천 질문 개선 필요! |

---

# 🔧 KPI 3: 도구 호출 성공률 (toolCallSuccessRate)

### 카페 비유 🏪

> **"직원이 고객 요청을 성공적으로 처리한 비율"** ✅

```
🔧 계산 방법

  전체 성공률(%) = (성공한 도구 호출 / 전체 도구 호출) × 100
  도구별 성공률(%) = 도구마다 따로 계산!
```

### 도구별 성공률 = 기계별 점검표 🔍

| 도구 (기계) | 성공률 | 상태 |
|-----------|:-----:|:----:|
| 종목 검색 (커피 머신) | 100% | ✅ 정상 |
| 현재가 조회 (에스프레소) | 94.7% | ✅ 양호 |
| 뉴스 검색 (블렌더) | 90.9% | ✅ 주시 |

---

# ⏱️ KPI 4: 평균 세션 지속 시간

### 카페 비유 🏪

> **"손님들이 평균적으로 매장에 얼마나 머무르는가?"** 🪑

```
⏱️ 계산 방법

  평균 체류 시간 = sum(퇴장 시 기록된 체류 시간) / 퇴장 기록 수
```

### 해석 가이드 📖

| 시간 | 의미 |
|:----:|------|
| < 1분 | 들어왔다 바로 나감 😟 → 첫인상 개선 필요 |
| 2~5분 | 적당한 이용 😊 → 적정 수준 |
| > 10분 | 깊이 있는 대화 🌟 → 높은 참여도! |

> ⚠️ 브라우저를 **강제 종료**하면 session_end가 전송 안 될 수도 있어요!

---

# 📋 KPI 5: 예시 질문 사용률 (exampleUsageRate)

### 카페 비유 🏪

> **"메뉴판을 보고 주문한 비율 vs 직접 입으로 말한 비율"** 📋

```
📋 계산 방법

  예시 사용률(%) = (메뉴판 터치한 손님 수 / 실제 주문한 손님 수) × 100
```

### 왜 중요한가요? 🤔

| 높으면 ↑ | 낮으면 ↓ |
|----------|----------|
| 메뉴판(예시 질문)이 **유용**하다! | 사용자가 **무시**하고 있다 |
| → 온보딩 UX가 효과적 🎉 | → 예시 질문 개선 필요 🔧 |

> 💡 **활성 세션** = 최소 1번이라도 대화한 세션만 카운트!

---

# 💻 결과를 예쁘게 반올림 — 최종 반환

```typescript
// lib/analytics/stats.ts — 건강검진 결과표 작성

return {
  messagesPerSession:  Math.round(값 * 100) / 100,
  followupClickRate:   Math.round(값 * 100) / 100,
  toolCallSuccessRate: { overall: {...}, byTool: {...} },
  avgSessionDurationMs: Math.round(값),
  exampleUsageRate:    Math.round(값 * 100) / 100,
  totalSessions:       sessions.size,
  totalEvents:         events.length,
  recentEvents:        events.slice(-20),
};
```

> 💡 `Math.round(94.6666 * 100) / 100` = 94.67 ← 소수점 2자리까지!

---

# 📡 통계 API — 건강검진 결과 조회

```typescript
// app/api/analytics/stats/route.ts — 건강검진 결과 출력기

export async function GET() {
  const events = await readAllEvents();   // 1️⃣ 메모판 전체 읽기
  const stats = computeStats(events);     // 2️⃣ 건강 수치 계산
  return Response.json(stats);            // 3️⃣ 결과표 전달!
}
```

### 3단계 파이프라인 🏭

```
📝 Redis → 📖 readAllEvents() → 🧮 computeStats() → 📋 결과!
```

> 💡 10,000건 이하 데이터는 밀리초 단위로 처리 가능! ⚡

---

# 🤔 퀴즈 타임! — Part 7

### Q: 세션당 대화 횟수가 1.2회로 나왔어요. 카페로 비유하면?

| 보기 | |
|:----:|---|
| ① | 손님들이 VIP 고객이다! 🌟 |
| ② | **한 잔만 시키고 나간다** 😟 → 온보딩 개선 필요! |
| ③ | 에스프레소 머신이 고장났다 |
| ④ | 매장이 너무 붐빈다 |

<br>

> 💡 **정답**: ② 대부분의 손님이 **첫 대화 후 바로 이탈**하고 있어요.
> 더 매력적인 첫 경험(예시 질문 개선 등)이 필요합니다!

---

<!-- _class: lead -->

# Part 8
## 🚗 자동차 계기판 만들기
### (대시보드 구현)

---

# 🎯 비유: 자동차 계기판 🚗

운전할 때 **계기판**을 보면 차의 상태가 한눈에 보이죠!

```
🚗 자동차 계기판

  ┌───────────────────────────────────────────┐
  │   ⛽ 연료: 75%    🏎️ 속도: 80km/h         │
  │   🌡️ 온도: 정상    🔧 엔진: OK             │
  │   📏 주행거리: 1,234km                     │
  └───────────────────────────────────────────┘
```

### 계기판의 특징

- 👀 **한눈에** 전체 상태 파악
- 🔴 **이상 징후** 즉시 감지 (빨간 불!)
- 🔄 **실시간** 갱신 (운전하면서 계속 변함)

> 🎯 우리도 이런 **대시보드**를 만들 거예요!

---

# 🔗 이것이 Analytics에서는... 대시보드!

### 자동차 계기판 → 우리 대시보드

| 계기판 🚗 | 대시보드 📊 |
|----------|-----------|
| ⛽ 연료 게이지 | 📊 세션당 대화 횟수 카드 |
| 🏎️ 속도계 | 👆 후속질문 클릭률 카드 |
| 🔧 엔진 상태 | 🔧 도구 호출 성공률 카드 |
| 🌡️ 온도계 | ⏱️ 평균 세션 시간 카드 |
| 📏 주행거리 | 📋 예시 사용률 카드 |

---

# 🎯 비유: 5분마다 우편함 확인하기 (폴링)

### 대시보드가 데이터를 새로고침하는 방법 🔄

```
📬 폴링(Polling) = 정기적으로 우편함 확인!

  30초마다 우편함 확인하러 나감 📬
  → 새 편지(데이터)가 있으면 읽음
  → 없으면 돌아감 → 30초 후 다시 확인...

  VS

  🔔 실시간 알림 (WebSocket) = 초인종이 울리면 나감
  → 항상 대기하고 있어야 함 (비용!)
```

### 왜 폴링을 선택했나요?

- 💰 30초마다 = 하루 약 2,880 요청 (무료 티어 충분!)
- 🎯 관리자 대시보드에 실시간(초 단위)은 불필요
- ⚡ `setInterval` 한 줄이면 끝!

---

# 🔗 이것이 코드에서는... 30초 폴링 (1/2)

```typescript
// app/analytics/page.tsx — 30초마다 우편함 확인!

const POLL_INTERVAL = 30_000;  // ⏱️ 30초

// 📬 우편함 확인 함수
const fetchData = useCallback(async () => {
  const res = await fetch("/api/analytics/stats");
  const json = await res.json();
  setData(json);
  setLastUpdated(new Date());
}, []);
```

> 📡 서버에 요청 → 결과 받기 → 대시보드 갱신!

---

# 🔗 이것이 코드에서는... 30초 폴링 (2/2)

```typescript
// ⏰ 처음에 한 번 확인
useEffect(() => { fetchData(); }, [fetchData]);

// 🔄 30초마다 자동 확인
useEffect(() => {
  if (!autoRefresh) return;
  const id = setInterval(fetchData, POLL_INTERVAL);
  return () => clearInterval(id);  // 🧹 정리!
}, [autoRefresh, fetchData]);
```

> ✅ autoRefresh OFF면 멈추고, ON이면 30초마다 자동!

---

# 📊 KPI 카드 — 계기판의 게이지들

### 카페 비유 🏪

계기판의 각 게이지처럼, 각 KPI를 **카드**로 표시해요!

| 카드 🃏 | 표시 내용 | 계기판 비유 🚗 |
|--------|----------|-------------|
| 📊 대화 횟수 | `3.25회` | ⛽ 연료 게이지 |
| 👆 클릭률 | `42.5%` | 🏎️ 속도계 |
| 🔧 성공률 | `94.67%` | 🔧 엔진 상태 |
| ⏱️ 세션 시간 | `03:45` | 🌡️ 온도계 |
| 📋 예시 사용률 | `65.0%` | 📏 주행거리 |

---

# 📊 경고등 시스템 🚦 (Traffic Light Pattern)

```
성공률 ≥ 90%  →  🟢 초록 (정상!)
성공률 ≥ 70%  →  🟡 주황 (주의!)
성공률 < 70%  →  🔴 빨강 (위험!)
```

> 🔴 경고등이 켜지면 즉시 확인! 자동차 계기판의 빨간 불처럼!

---

# 📋 이벤트 로그 — 주행 기록 (1/2)

### 최근 이벤트 20개를 **기록표**로 보여줘요!

| 이벤트 | 이모지 | 색상 | 카페 비유 🏪 |
|--------|:------:|:----:|------------|
| `session_start` | 🟢 | 초록 | 손님 입장! |
| `session_end` | 🔴 | 빨강 | 손님 퇴장! |
| `message_send` | 💬 | 파랑 | 직접 주문! |
| `example_click` | 💡 | 주황 | 메뉴판 터치! |
| `followup_click` | 👆 | 보라 | 추천메뉴 선택! |

---

# 📋 이벤트 로그 — 주행 기록 (2/2)

| 이벤트 | 이모지 | 색상 | 카페 비유 🏪 |
|--------|:------:|:----:|------------|
| `tool_call` | 🔧 | 회색 | 기계 작동! |
| `response_complete` | ✅ | 초록 | 주문 완성! |
| `response_error` | ❌ | 빨강 | 에러 발생! |
| `chat_reset` | 🧹 | 갈색 | 테이블 정리! |
| `easter_egg_click` | 🥚 | 핑크 | 이스터에그! |

> 💡 각 이벤트마다 **고유 이모지 + 색상** = 로그를 **한눈에** 구분! 👀

---

# 🎛️ 대시보드 컨트롤 — 운전석 버튼들

```
🖥️ 대시보드 상단 영역

  ┌────────────────────────────────────────────────────────┐
  │  📊 Analytics Dashboard          [⏱ 자동 갱신 ON]     │
  │  주식내비 사용 통계 대시보드       [🔄 새로고침]        │
  │                                   [💬 챗봇으로]        │
  └────────────────────────────────────────────────────────┘
```

| 버튼 | 기능 | 카페 비유 🏪 |
|------|------|------------|
| ⏱️ 자동 갱신 ON/OFF | 30초 폴링 켜기/끄기 | 자동 모니터링 ON/OFF |
| 🔄 새로고침 | 지금 바로 데이터 요청 | 수동으로 모니터 확인 |
| 💬 챗봇으로 | 메인 화면 이동 | 관제실에서 홀로 나가기 |

---

# ✅ Part 8 정리 — 대시보드 = 자동차 계기판

### 한눈에 보는 대시보드 구조

```
🖥️ 대시보드 구성

  1️⃣  헤더     → 제목 + 자동갱신 토글 + 버튼들
  2️⃣  KPI 카드  → 5개 건강검진 수치 (3열 그리드)
  3️⃣  도구 테이블 → 기계별 성공률 (Traffic Light 🚦)
  4️⃣  이벤트 로그 → 최근 20개 기록 (이모지 배지)
  5️⃣  통계 요약  → 총 세션 수, 총 이벤트 수
```

> 🚗 **자동차 계기판**처럼 — 운전 중에 **한눈에** 차 상태를 파악! ✨

---

# 🤔 퀴즈 타임! — Part 8

### Q: 대시보드에서 도구 성공률이 60%로 빨간색이에요. 카페로 비유하면?

| 보기 | |
|:----:|---|
| ① | 오늘 손님이 많다는 뜻 |
| ② | 메뉴판이 잘 디자인되었다는 뜻 |
| ③ | **에스프레소 머신이 고장 나기 시작했다는 뜻!** 🔴 |
| ④ | 직원이 친절하다는 뜻 |

> 💡 **정답**: ③ 60%는 빨간 경고등! 🔴
> 외부 API에 문제가 있거나 네트워크 장애일 수 있어요.
> 즉시 확인이 필요합니다! 🔧

---

<!-- _class: lead -->

# Part 9
## 🎓 졸업! 정리 및 확장
### 오늘 배운 것을 한눈에 정리해요!

---

# 📖 전체 이야기 복습 — 카페 사장님의 여정 (1/2)

```
☕ 카페 사장님(여러분!)의 성장 스토리

  1️⃣  "왜 CCTV가 필요하지?"     → 📹 데이터 기반 의사결정의 중요성

  2️⃣  "CCTV 시스템 설계도"       → 📐 전체 아키텍처 이해

  3️⃣  "어떤 센서를 달까?"        → 🔔 10개 이벤트 타입 설계

  4️⃣  "센서 데이터 보내기"       → 📡 sendBeacon + useAnalytics
```

---

# 📖 전체 이야기 복습 — 카페 사장님의 여정 (2/2)

```
☕ 카페 사장님(여러분!)의 성장 스토리 (계속)

  5️⃣  "주방 기록도 중요해!"      → 👨‍🍳 서버 사이드 이벤트

  6️⃣  "메모판에 기록!"          → 📝 Redis LPUSH/LTRIM

  7️⃣  "건강검진 수치 계산"       → 💊 5개 KPI 공식과 해석

  8️⃣  "자동차 계기판 완성!"      → 🚗 대시보드 (30초 폴링, KPI 카드)
```

---

# 🗺️ 전체 지도 — 파일과 비유 매핑 (1/2)

```
🏪 카페                          💻 코드

센서 설계도                       lib/analytics/types.ts
   ↓                                ↓
CCTV + 센서                      lib/analytics/tracker.ts
   ↓                                ↓
매장 운영                         components/chat.tsx
   ↓                                ↓
관제실 접수                       app/api/analytics/events/route.ts
   ↓                                ↓
주방 기록                         app/api/chat/route.ts
```

---

# 🗺️ 전체 지도 — 파일과 비유 매핑 (2/2)

```
🏪 카페                          💻 코드

메모판                            lib/analytics/logger.ts
   ↓                                ↓
건강검진                          lib/analytics/stats.ts
   ↓                                ↓
건강검진 결과 출력기                app/api/analytics/stats/route.ts
   ↓                                ↓
자동차 계기판                      app/analytics/page.tsx
```

---

# 🏆 핵심 설계 원칙 4가지 (1/2)

### 1. 🏷️ 타입 안전성 — 센서 목록표

10개 센서(이벤트)를 **TypeScript Union Type**으로 관리
→ 목록에 없는 센서 데이터는 **컴파일 시점에** 거부!

### 2. 🤫 비침투적 수집 — CCTV 때문에 커피맛이 변하면 안 됨

**fire-and-forget** + **sendBeacon** = Analytics 실패해도 앱은 정상!

---

# 🏆 핵심 설계 원칙 4가지 (2/2)

### 3. ☁️ Serverless 최적화 — 메모판은 벽에 고정

Upstash Redis **HTTP 기반** + **LPUSH/LTRIM** 자동 롤링 (10,000건)

### 4. 👀 실시간 가시성 — 계기판은 실시간이어야 의미 있다

30초 폴링 + **Traffic Light** 🚦 색상 = 이상 징후 **즉각 감지**

---

# 🌟 비유 총정리 표 (1/2)

| 기술 용어 | 일상 비유 | 이모지 |
|----------|----------|:------:|
| User Analytics | 매장 CCTV + 고객 동선 분석 | 📹 |
| 이벤트 | 매장 내 센서 | 🔔 |
| 세션 | 한 번의 매장 방문 | 🎫 |
| sendBeacon | 퇴근길 우체통에 편지 넣기 | 📮 |
| Redis | 포스트잇 메모판 | 📝 |

---

# 🌟 비유 총정리 표 (2/2)

| 기술 용어 | 일상 비유 | 이모지 |
|----------|----------|:------:|
| LPUSH/LTRIM | 새 메모 붙이고 오래된 건 떼기 | 📌🗑️ |
| KPI | 건강검진 수치표 | 💊 |
| 대시보드 | 자동차 계기판 | 🚗 |
| 폴링 (Polling) | 5분마다 우편함 확인 | 📬 |
| messagesPerSession | 한 번 올 때 평균 몇 잔 시키는지 | ☕ |
| followupClickRate | 추천 메뉴를 실제로 주문한 비율 | 👆 |

---

# 🔮 개선 방향 — 카페를 더 멋지게!

<div class="columns">
<div class="col">

### 🚀 성능 개선

- Redis **Sorted Set** 도입
- API 응답 **캐싱**
- 이벤트 **배치 전송**

### 📊 분석 고도화

- 퍼널 분석 (어디서 이탈하는가?)
- 코호트 분석 (신규 vs 재방문)
- **인기 질문 랭킹** (TOP 5 주문 메뉴!)

</div>
<div class="col">

### 🏗️ 인프라 확장

- 이벤트 스트림 → **Kafka**
- Data Warehouse (장기 보관 창고)
- Grafana/Datadog 연동

### 🔒 개인정보 보호

- GDPR/개인정보보호법 준수
- 사용자 동의(Consent) 배너
- 데이터 보존 기간 정책

</div>
</div>

---

# 📏 우리가 만든 것 — 숫자로 보기 (1/2)

| 파일 | 줄 수 | 역할 (카페 비유 🏪) |
|------|:-----:|---------------------|
| `types.ts` | 75줄 | 🔔 센서 설계도 |
| `tracker.ts` | 124줄 | 📡 CCTV + 센서 시스템 |
| `logger.ts` | 53줄 | 📝 메모판 읽기/쓰기 |
| `stats.ts` | 150줄 | 💊 건강검진 수치 계산기 |

---

# 📏 우리가 만든 것 — 숫자로 보기 (2/2)

| 파일 | 줄 수 | 역할 (카페 비유 🏪) |
|------|:-----:|---------------------|
| `events/route.ts` | 22줄 | 📨 관제실 접수 창구 |
| `stats/route.ts` | 8줄 | 📋 건강검진 결과 출력기 |
| `page.tsx` | 424줄 | 🚗 자동차 계기판 |
| **합계** | **~856줄** | **완전한 분석 시스템!** 🎉 |

> 약 **850줄** 으로 이벤트 설계 → 수집 → 저장 → 계산 → 시각화 **전체 파이프라인** 완성!

---

# ❓ Q&A — 자주 묻는 질문 (1/2)

### Q1: sendBeacon이 실패하면? 📮

→ fetch가 대신! 그마저도 실패? `.catch(() => {})` 로 앱은 정상! ✅

### Q2: Redis가 다운되면? 📝

→ 조용히 빈 배열 반환. 앱은 **아무 일도 없었다는 듯** 계속 동작! ✅

### Q3: 이벤트 10,000건 넘으면? 📌

→ LTRIM이 **자동으로** 오래된 것부터 삭제! (롤링 윈도우) 🗑️

---

# ❓ Q&A — 자주 묻는 질문 (2/2)

### Q4: 개인정보는 안전한가요? 🔒

→ sessionId = **랜덤 UUID** (이름, 전화번호 등 개인정보 미수집!)

### Q5: 비용 추적은 정확한가요? 💰

→ Anthropic API의 공식 `response.usage` 기반! (환율은 고정 $1=1,450원)

---

# 🎯 최종 퀴즈 — 전체 복습! (1/2)

### 빈칸을 채워보세요!

| # | 문제 | 정답 |
|---|------|------|
| 1 | Analytics = 매장 _____ + 고객 동선 분석 | 📹 CCTV |
| 2 | 이벤트 = 매장 내 _____ | 🔔 센서 |
| 3 | 세션 = 한 번의 매장 _____ | 🚪 방문 |
| 4 | sendBeacon = 퇴근길 _____ 에 편지 넣기 | 📮 우체통 |

---

# 🎯 최종 퀴즈 — 전체 복습! (2/2)

| # | 문제 | 정답 |
|---|------|------|
| 5 | Redis = _____ 메모판 | 📝 포스트잇 |
| 6 | KPI = _____ 수치표 | 💊 건강검진 |
| 7 | 대시보드 = 자동차 _____ | 🚗 계기판 |

> 🎉 7개 다 맞추셨으면 **오늘 강의 완벽 이해!** 축하합니다!

---

<!-- _class: lead -->

# 🎉 수고하셨습니다!

### 오늘 배운 것 요약

📹 **10개 센서(이벤트)** 설계 — TypeScript Union Type
📡 **sendBeacon** — 퇴근길 우체통처럼 안전한 전송
📝 **Redis LPUSH/LTRIM** — 포스트잇 메모판
💊 **5개 KPI** — 서비스 건강검진
🚗 **대시보드** — 자동차 계기판

> ☕ "CCTV 없는 매장은 감으로 운영하는 것이고,
> 📊 Analytics 없는 앱은 데이터 없이 개발하는 것이다."

### 💡 "측정할 수 없으면 개선할 수 없다"
*"What gets measured gets managed" — Peter Drucker*
