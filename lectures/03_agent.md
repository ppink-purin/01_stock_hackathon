---
marp: true
theme: default
paginate: true
size: 16:9
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
footer: "주식내비 키우Me -- Agent 아키텍처 강의 | 2026"
---

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _footer: "" -->
<!-- _backgroundColor: #1a1a2e -->
<!-- _color: white -->

# 🤖 AI Agent 아키텍처

### 편의점 직원처럼 스스로 생각하고 행동하는 AI 만들기!

<br>

**주식내비 키우Me** 프로젝트로 배우는
Agentic Loop, stop_reason, Multi-turn, SSE 스트리밍

🍳 오늘의 키워드: **요리사 시뮬레이션**으로 이해하는 Agent!

xStudio Hackathon Lecture Series **#03**

---

# 📋 오늘 배울 내용 (1/2)

| 순서 | 비유 🎭 | 진짜 이름 🔧 |
|:---:|:---|:---|
| 1 | 자판기 vs 편의점 직원 | Chatbot vs Agent |
| 2 | 요리사의 반복 작업 | Agentic Loop |
| 3 | 비서에게 업무 지시하기 | Tool Use (도구 사용) |
| 4 | "완성!" vs "재료 더 필요해요" | stop_reason |
| 5 | 대화 녹음기 | Message History & Multi-turn |

---

# 📋 오늘 배울 내용 (2/2)

| 순서 | 비유 🎭 | 진짜 이름 🔧 |
|:---:|:---|:---|
| 6 | 요리 타이머 (안전장치) | maxTurns |
| 7 | 라디오 생방송 | SSE Streaming |
| 8 | 수학 풀이 과정 공개 | Thinking Steps |
| 9 | 통화료 실시간 표시 | Token Tracking |

---

# 🍳 오늘의 러닝메이트: 요리사 시뮬레이션!

오늘 강의 내내 **요리사 비유**가 함께합니다!

```
👨‍🍳 "손님이 김치찌개를 주문하셨어요!"

  📖 레시피 읽기 → 🥬 재료 확인 → 🔥 조리하기
       → 👅 맛보기 → 🤔 "완성인가?" → 🍲 서빙!
```

이 **반복 과정**이 바로 AI Agent의 핵심이에요!

> 💡 모든 기술 개념을 이 요리사 이야기로 먼저 이해하고,
> 그 다음에 코드를 살짝 볼 거예요. 걱정 마세요! 😊

---

<!-- _class: lead -->
<!-- _backgroundColor: #C93A25 -->
<!-- _color: white -->

# Part 1 🎭
## 자판기 vs 편의점 직원
### (Chatbot vs Agent)

---

# 🎯 자판기를 떠올려 보세요

```
  💰 동전 넣기 → 🔘 버튼 누르기 → 🥤 음료 나옴
         (질문)       (선택)          (답변)
```

**자판기의 특징:**
- 버튼을 누르면 **정해진 것만** 나와요
- 콜라 버튼 누르면 콜라만! 사이다는 절대 안 나와요
- "오늘 날씨가 더운데 시원한 거 추천해줘" → ❌ 불가능!
- 한 번 누르면 끝! 다시 동전 넣어야 해요

> 🎯 자판기 = **1회성 응답 기계**
> 정해진 버튼 → 정해진 결과. 그 이상도 이하도 없음!

---

# 🎯 편의점 직원을 떠올려 보세요

```
  🗣️ "배 고프고 목도 마른데 뭐가 좋을까요?"
       ↓
  👨‍💼 직원이 생각합니다... 🤔
       ↓
  👨‍💼 "삼각김밥이랑 물 어떠세요? 지금 1+1이에요!"
       → 진열대를 확인하고 (도구 사용! 🔧)
       → 프로모션을 파악하고 (정보 수집! 📊)
       → 맞춤 추천을 해줍니다 (자율 판단! 🧠)
```

**편의점 직원은:**
- 상황을 **스스로 판단**해요
- 필요하면 **여기저기 확인**해요 (재고, 할인 등)
- **한 번에 안 끝나면** 추가 행동을 해요

---

# 🔗 이것이 AI에서는...

| 자판기 🥤 | 편의점 직원 👨‍💼 |
|:---:|:---:|
| **Chatbot** | **Agent** |

| 구분 | 자판기 (Chatbot) | 편의점 직원 (Agent) |
|------|:---:|:---:|
| 응답 방식 | 버튼 → 결과 1회 | 상황 판단 → 여러 행동 |
| 외부 정보 | ❌ 접근 불가 | ✅ 실시간 확인 |
| 자율성 | ❌ 없음 | ✅ 스스로 판단 |
| 도구 사용 | ❌ 불가 | ✅ 가능 |

> 🎯 **Agent = LLM + 도구 사용 + 반복 루프 + 자율적 판단**

---

# 💻 실제로 어떻게 다를까요?

**자판기 (Chatbot):**
```
😊 "삼성전자 주가 알려줘"
🤖 "죄송합니다. 실시간 데이터에 접근할 수 없어요..."
     (끝! 😢)
```

**편의점 직원 (Agent):**
```
😊 "삼성전자 주가 알려줘"
🤖 [생각] 종목코드를 먼저 찾아야겠다 🔍
   → searchStock("삼성전자") 호출!
🤖 [확인] 코드 005930이구나! 시세를 봐야지 📊
   → getStockQuote("005930") 호출!
🤖 "삼성전자 현재가 72,400원(+1.2%)이에요!" ✅
```

---

# ✅ 정리: Chatbot vs Agent

> 🎯 **Chatbot은 자판기, Agent는 편의점 직원!**
> Agent는 스스로 생각하고, 도구를 쓰고, 반복해서 최선의 답을 찾아요.

---

<!-- _class: lead -->
<!-- _backgroundColor: #C93A25 -->
<!-- _color: white -->

# Part 2 🍳
## 요리사의 반복 작업
### (Agentic Loop)

---

# 🎯 요리사가 김치찌개를 만드는 과정

```
👨‍🍳 주문 접수: "김치찌개 하나요!"

   📖 레시피 읽기     "김치, 돼지고기, 두부가 필요하네"
        ↓
   🥬 재료 확인       "냉장고에 김치 있나?" → 확인!
        ↓
   🔥 조리            김치를 볶고 물을 넣고...
        ↓
   👅 맛보기 → 🧂 간 맞추기 → 👅 다시 맛보기
        ↓
   🍲 완성! 서빙!     "맛있게 드세요~"
```

---

# 🎯 핵심은 "반복"이에요!

요리사는 **한 번에 뚝딱** 만들지 않아요!

```
   🔄 레시피 읽기 → 재료 확인 → 조리 → 맛보기 → 완성?
                                              ↓
                                         아직이면?
                                              ↓
                                    🔄 다시 처음으로!
```

**맛보기** 단계에서:
- ✅ "완성이다!" → 서빙 (종료)
- 🔄 "아직이다!" → 다시 조리 (반복)

> 이 **반복 패턴**을 AI에서는 **Agentic Loop** 라고 불러요! 🔄

---

# 🔗 이것이 AI Agent에서는... (비유 매핑)

```
👨‍🍳 요리사                          🤖 AI Agent

📖 레시피 읽기            →    📨 사용자 질문 받기
🥬 재료 확인              →    🔧 도구(Tool) 호출
🔥 조리하기               →    📊 결과 분석
👅 맛보기                 →    🤔 "답변 완성인가?" 확인
🍲 서빙!                  →    💬 최종 답변 전달
```

> 💡 레시피=System Prompt, 재료 확인=Tool Use,
> 맛보기=stop_reason 확인, 서빙=최종 응답!

---

# 🔗 요리사 ↔ AI Agent 용어 정리

| 요리사 용어 | AI Agent 용어 | 설명 |
|:---:|:---:|:---|
| 레시피 | System Prompt | 행동 지침 |
| 재료 확인 | Tool Use | 외부 데이터 가져오기 |
| 맛보기 | stop_reason 확인 | 완료 여부 판단 |
| 서빙 | 최종 응답 | 사용자에게 답변 전달 |

> 💡 요리사의 반복 작업이 곧 AI Agent의 Agentic Loop!

---

# 💻 에이전트 루프의 큰 그림

```typescript
// app/api/chat/route.ts - 요리사의 반복 작업을 코드로!
let turnCount = 0;
const maxTurns = 10;      // 최대 10번까지만! (타이머)

while (turnCount < maxTurns) {      // 🔄 반복!
  turnCount++;
  const response = await callClaude(messages);  // 📖 레시피

  if (완성이면) {           // 👅 맛보기: 완성인가?
    sendFinalAnswer();    // 🍲 서빙! → break!
  }
  // 🥬 아직이면: 도구 실행 후 다시 루프
  const results = await executeTools(toolUseBlocks);
  messages.push(results);
}
```

---

# 🎯 요리사 시뮬레이션: 실제 시나리오 (1/2)

```
😊 손님: "삼성전자 주가랑 뉴스 알려줘!"

🍳 Turn 1: 📖 레시피 확인
   👨‍🍳 "종목코드를 먼저 찾아야겠다"
   🔧 searchStock("삼성전자") → "005930" 발견!
   👅 맛보기: "아직 시세와 뉴스가 없어!" → 🔄 계속!

🍳 Turn 2: 🥬 재료 추가
   👨‍🍳 "시세를 조회하자"
   🔧 getStockQuote("005930") → 72,400원 확인!
   👅 맛보기: "뉴스가 아직 없어!" → 🔄 계속!
```

---

# 🎯 요리사 시뮬레이션: 실제 시나리오 (2/2)

```
🍳 Turn 3: 🔥 추가 조리
   👨‍🍳 "뉴스도 가져오자"
   🔧 getStockNews("005930") → 뉴스 5건 확인!
   👅 맛보기: "다 모였다!" → ✅ 완성!

🍳 Turn 4: 🍲 서빙!
   👨‍🍳 "삼성전자 현재가 72,400원이며..."
```

> 🎯 4번의 턴을 거쳐 최종 답변 완성! 이것이 Agentic Loop!

---

# ✅ 정리: Agentic Loop

> 🎯 **Agentic Loop = 요리사가 레시피를 따라 반복 작업하는 것!**
> 읽기 → 재료 확인 → 조리 → 맛보기 → 완성될 때까지 반복! 🔄

---

<!-- _class: lead -->
<!-- _backgroundColor: #C93A25 -->
<!-- _color: white -->

# Part 3 🔧
## 비서에게 업무 지시하기
### (Tool Use — 도구 사용)

---

# 🎯 여러분에게 비서가 있다면?

업무 중에 이런 상황, 상상해 보세요:

```
👔 나:   "삼성전자 현재 주가 좀 찾아줘"
👩‍💼 비서: "네! 인터넷 검색해볼게요!" → 🔍 검색 (도구 1)
         "현재가 72,400원이에요!"

👔 나:   "관련 뉴스도 찾아줘"
👩‍💼 비서: "뉴스 사이트 확인할게요!" → 📰 뉴스 검색 (도구 2)
         "오늘 반도체 관련 기사가 3개 있어요!"

👔 나:   "고마워, 정리해서 보고서 써줘"
👩‍💼 비서: "네! 워드 프로세서 열게요!" → 📝 문서 작성 (도구 3)
```

**비서 = AI Agent, 업무 지시 = Tool Use!**

---

# 🔗 이것이 AI Agent에서는...

AI Agent의 **도구(Tool)** = 비서가 사용하는 **업무 도구**!

| 비서의 도구 👩‍💼 | AI Agent의 도구 🤖 | 하는 일 |
|:---:|:---:|:---|
| 인터넷 검색 | `searchStock` | 종목명으로 종목코드 검색 |
| 금융 사이트 확인 | `getStockQuote` | 시세, PER, PBR 조회 |
| 뉴스 사이트 확인 | `getStockNews` | 최신 뉴스 5건 가져오기 |
| 시장 리포트 읽기 | `getMarketOverview` | KOSPI/KOSDAQ 지수 확인 |

> 🎯 핵심: LLM(AI의 두뇌)이 **어떤 도구를 언제 쓸지 스스로 판단**해요!

---

# 💻 도구 정의: "비서에게 업무 목록 알려주기"

```typescript
// lib/tools.ts - 비서가 할 수 있는 업무 목록
export const toolDefinitions = [
  {
    name: "searchStock",           // 도구 이름
    description: "종목명으로 종목코드 검색",
    input_schema: {                // 어떤 정보가 필요한지
      properties: {
        query: { type: "string", description: "검색할 종목명" }
      }
    }
  },
];
```

> 💡 AI는 이 목록을 보고 필요한 도구를 **스스로 선택**합니다.

---

# 💻 도구 실행: "비서가 실제로 업무 수행"

```typescript
// lib/tools.ts - 비서가 실제로 업무를 하는 부분
export async function executeTool(name, input) {
  switch (name) {
    case "searchStock":         // "종목 검색해줘!"
      return await searchStock(input.query);
    case "getStockQuote":       // "시세 확인해줘!"
      return await getStockQuote(input.code);
    case "getStockNews":        // "뉴스 찾아줘!"
      return await getStockNews(input.code);
    case "getMarketOverview":   // "시장 현황 봐줘!"
      return await getMarketOverview();
  }
}
```

---

# ✅ 정리: Tool Use

> 🎯 **Tool Use = 비서에게 "인터넷 검색해줘", "뉴스 찾아줘" 지시하기!**
> AI가 필요한 도구를 스스로 골라서 사용하고, 결과를 가져옵니다. 🔧

---

# 퀴즈 타임! 🤔

**Q: 사용자가 "KOSPI 지수 알려줘"라고 물으면, AI Agent는 어떤 도구를 사용할까요?**

A) `searchStock` — 종목 검색
B) `getStockQuote` — 시세 조회
C) `getStockNews` — 뉴스 조회
D) `getMarketOverview` — 시장 현황 조회

<br>

> 🥁 정답은...

---

# 퀴즈 정답! 🎉

**정답: D) `getMarketOverview`!**

```
😊 "KOSPI 지수 알려줘"
       ↓
🤖 [생각] "KOSPI는 개별 종목이 아니라 시장 전체 지수네!"
       ↓
🔧 getMarketOverview() 호출!
       ↓
🤖 "KOSPI 현재 2,653.45 (+0.8%)입니다!"
```

> AI가 **스스로 판단**해서 적절한 도구를 선택했어요! 👏
> 이것이 바로 Agent의 힘입니다!

---

<!-- _class: lead -->
<!-- _backgroundColor: #C93A25 -->
<!-- _color: white -->

# Part 4 🛑
## "완성!" vs "재료 더 필요해요"
### (stop_reason)

---

# 🎯 요리사의 두 가지 외침

요리사가 맛을 봤을 때, **두 가지 경우**가 있죠:

```
👨‍🍳 👅 맛보기...

   경우 1: "완성이다! 서빙!" 🍲
           → 요리를 손님에게 내보냅니다

   경우 2: "재료가 더 필요해요!" 🥬
           → 냉장고를 다시 확인합니다
           → 추가 재료를 가져옵니다
           → 다시 조리를 계속합니다
```

> 이 **판단의 순간**이 AI Agent에서는 `stop_reason`이에요!

---

# 🔗 stop_reason: 요리사의 판단

| 요리사 외침 👨‍🍳 | stop_reason 값 | AI Agent 행동 |
|:---:|:---:|:---|
| "완성!" 🍲 | `"end_turn"` | 루프 종료, 최종 답변 전달 |
| "재료 더 필요해요!" 🥬 | `"tool_use"` | 도구 실행 후 다시 루프 |
| "접시가 작아서 담을 수 없어요!" | `"max_tokens"` | 응답이 잘림 (비정상) |

> 🎯 `stop_reason`은 에이전트 루프의 **분기점**!
> "end_turn"이면 서빙, "tool_use"면 도구 실행 후 계속!

---

# 🔗 stop_reason 흐름도

```
  Claude API 응답
       ↓
  stop_reason 확인 🤔
       ↓
  ┌────┴────┐
  ↓         ↓
"end_turn" "tool_use"
  ↓         ↓
🍲 서빙!   🔧 도구 실행 → 🔄 다시 루프!
```

> 💡 "end_turn" = 완성! / "tool_use" = 재료 더 필요!

---

# 💻 코드에서 stop_reason 확인하기

```typescript
// app/api/chat/route.ts - 맛보기 판단!

// 👅 맛보기: 완성인가?
if (
  toolUseBlocks.length === 0 ||         // 조건A: 도구 요청 없음
  response.stop_reason === "end_turn"    // 조건B: Claude가 "완성!" 선언
) {
  // 🍲 서빙! 최종 답변을 보냅니다
  send({ type: "done", text: fullText });
  break;   // while 루프 탈출!
}

// 🥬 "재료 더 필요해요!" → 도구 실행 후 다시 루프
```

> 💡 **이중 안전장치**: 두 조건 중 하나만 만족해도 종료!

---

# 🍳 요리사 시뮬레이션: stop_reason 추적

```
Turn 1: 👨‍🍳 → "종목코드를 검색하겠습니다"
               + tool_use: searchStock("삼성전자")
         🛑 stop_reason = "tool_use"    → "재료 더 필요!" → 🔄 계속!

Turn 2: 👨‍🍳 → "시세를 조회하겠습니다"
               + tool_use: getStockQuote("005930")
         🛑 stop_reason = "tool_use"    → "재료 더 필요!" → 🔄 계속!

Turn 3: 👨‍🍳 → "삼성전자 현재가는 72,400원입니다..."
         🛑 stop_reason = "end_turn"    → "완성!" → 🍲 서빙!
```

> Turn 3에서 도구 호출이 없고, stop_reason도 "end_turn"!
> 두 조건 모두 만족 → `break`로 루프 탈출! ✅

---

# ✅ 정리: stop_reason

> 🎯 **stop_reason = 요리사가 "완성!" 외치는 순간 vs "재료 더 필요해요"**
> `"end_turn"` = 루프 종료 🍲 / `"tool_use"` = 도구 실행 후 계속 🔄

---

<!-- _class: lead -->
<!-- _backgroundColor: #C93A25 -->
<!-- _color: white -->

# Part 5 🎙️
## 대화 녹음기
### (Message History & Multi-turn)

---

# 🎯 전화 상담을 떠올려 보세요

```
📞 고객: "제가 어제 주문한 건 있잖아요..."
👩‍💼 상담사: "네, 어떤 주문이셨나요?"
📞 고객: "파란색 티셔츠요!"
👩‍💼 상담사: "아, 파란색 티셔츠! 확인해볼게요."
📞 고객: "사이즈 교환하고 싶은데요"
👩‍💼 상담사: "파란색 티셔츠 사이즈 교환이시군요! (이전 대화 기억!)"
```

상담사가 **이전 대화를 기억하고 있기 때문에** 자연스러운 소통이 가능해요!

> 만약 상담사가 **매번 기억을 잃는다면**?
> "파란색 티셔츠요!" → "무슨 파란색 티셔츠요?" 😱

---

# 🎯 대화 녹음의 비밀

AI는 사실... **기억력이 없어요!** 😱

```
❌ AI의 진실:
   매 대화마다 "새 사람"처럼 시작합니다.
   이전에 뭘 말했는지 전혀 기억 못해요!

✅ 해결법: 대화 녹음! 🎙️
   이전 대화를 "녹음"해뒀다가,
   매번 AI에게 "녹음 내용을 다시 들려줘요!"
```

> 이것을 **Message History** (메시지 히스토리)라고 해요!

---

# 🔗 이것이 AI Agent에서는...

**대화 녹음기 = Message History 배열**

```
apiMessages = [
  { role: "user",      content: "삼성전자 주가 알려줘" },
  { role: "assistant", content: "검색하겠습니다" + 도구호출 },
  { role: "user",      content: [도구 실행 결과] },
  { role: "assistant", content: "시세를 확인합니다" + 도구호출 },
  { role: "user",      content: [도구 실행 결과] },
  { role: "assistant", content: "현재가 72,400원..." },
]
```

> 💡 매번 **전체 대화 녹음**을 보내야 해요!
> AI는 **stateless** (기억 없음)이니까요.

---

# 🎯 Multi-turn = 전화 상담 여러 번 주고받기

```
📞 전화 상담에서:
   고객 → 상담사 → 고객 → 상담사 → 고객 → 상담사
   (여러 번 주고받기 = Multi-turn!)

🤖 AI Agent에서:
   사용자 → Claude → (도구 결과) → Claude → (도구 결과) → Claude
   (여러 번 주고받기 = Multi-turn!)
```

**Turn(턴)**이란?
- Claude API를 **한 번 호출**하는 것 = 1턴
- "삼성전자 주가 + 뉴스" 질문 → **3~4턴** 필요!

> 🎯 Multi-turn = 한 질문을 답하기 위해 **여러 번 대화**하는 것!

---

# 💻 메시지 히스토리: 녹음하는 코드

```typescript
// app/api/chat/route.ts
// 📼 이전 대화 녹음을 Claude에게 전달
const apiMessages = messages.map(m => ({
  role: m.role,
  content: m.content,
}));

// 🔄 에이전트 루프 안에서 녹음 추가
apiMessages.push({
  role: "assistant",          // 👨‍🍳 요리사의 말
  content: response.content,  // 텍스트 + 도구 호출 전체!
});
```

> ⚠️ assistant의 `content`에는 **텍스트 + 도구호출 블록 전체**를 넣어야 해요!

---

# 💻 메시지 히스토리: 도구 결과 추가

```typescript
// 도구 결과도 녹음에 추가!
apiMessages.push({
  role: "user",           // 📋 도구 실행 결과
  content: toolResults,   // "재료가 이렇게 왔어요!"
});
```

> ⚠️ 턴이 늘수록 녹음 테이프가 길어져요! (= 토큰 비용 증가! 💰)

---

# 🍳 요리사 시뮬레이션: 대화 녹음 (1/2)

```
Turn 1 녹음: 📼
  [고객] "삼성전자 주가 알려줘"
  [요리사] "종목코드 검색합니다" + 🔧searchStock
  [결과] "005930 찾았어요!"

Turn 2 녹음: 📼📼 (점점 길어짐!)
  [고객] "삼성전자 주가 알려줘"
  [요리사] "종목코드 검색합니다" + 🔧searchStock
  [결과] "005930 찾았어요!"
  [요리사] "시세 조회합니다" + 🔧getStockQuote  ← 추가!
  [결과] "72,400원이에요!"                       ← 추가!
```

---

# 🍳 요리사 시뮬레이션: 대화 녹음 (2/2)

```
Turn 3 녹음: 📼📼📼 (더 길어짐!)
  ... (Turn 1~2 녹음 전부) ...
  [요리사] "최종 답변: 삼성전자 현재가 72,400원..."  ← 추가!
```

> ⚠️ 턴이 늘수록 녹음 테이프가 길어져요! (= 토큰 비용 증가! 💰)
> 이래서 **maxTurns** 안전장치가 필요한 거예요!

---

# ✅ 정리: Message History & Multi-turn

> 🎯 **Message History = 대화 녹음기! 🎙️**
> AI는 기억이 없어서, 매번 전체 녹음을 다시 들려줘야 해요.
>
> **Multi-turn = 전화 상담처럼 여러 번 주고받기! 📞**
> 하나의 질문에 여러 번 Claude API를 호출합니다.

---

# 퀴즈 타임! 🤔

**Q: 에이전트 루프 안에서 도구 실행 결과(tool_result)는 어떤 role로 메시지에 추가될까요?**

A) `role: "assistant"` — AI의 말
B) `role: "user"` — 사용자의 말
C) `role: "system"` — 시스템 메시지
D) `role: "tool"` — 도구 전용

<br>

> 🥁 정답은...

---

# 퀴즈 정답! 🎉

**정답: B) `role: "user"`!**

```typescript
// 도구 결과는 "user" 역할로 추가!
apiMessages.push({
  role: "user",        // ← 놀랍죠?
  content: toolResults,
});
```

**왜?** Claude 입장에서 도구 결과는 **"외부에서 받은 정보"**이에요!
마치 상담사가 **고객에게서 추가 정보를 받는 것**과 같아요.

```
👩‍💼 상담사: "주문번호 조회해볼게요" (tool_use)
📋 시스템: "주문번호 A1234, 파란 티셔츠" (tool_result → "user"로 전달)
```

---

<!-- _class: lead -->
<!-- _backgroundColor: #C93A25 -->
<!-- _color: white -->

# Part 6 ⏱️
## 요리 타이머 (안전장치)
### (maxTurns)

---

# 🎯 만약 요리사가 영원히 맛보기를 한다면?

```
👨‍🍳 "음... 아직 부족해!" → 재료 추가 → 맛보기
👨‍🍳 "음... 아직 부족해!" → 재료 추가 → 맛보기
👨‍🍳 "음... 아직 부족해!" → 재료 추가 → 맛보기
       ... (끝나지 않음! 😱)
```

**문제:**
- 🕐 손님이 한없이 기다려야 해요
- 💸 재료비가 무한정 들어요
- 🔥 가스비도 계속 나가요!

**해결책:** ⏱️ **타이머 설정!**
"30분 안에 완성 못 하면 그냥 서빙해!"

---

# 🔗 이것이 AI Agent에서는...

**왜 필요한가?**

| 위험 상황 | 요리사 비유 | Agent 비유 |
|:---:|:---:|:---:|
| 무한 반복 | 영원히 맛보기 | 무한 루프 |
| 비용 폭주 | 재료비 폭탄 💸 | 토큰 비용 폭탄 💸 |
| 응답 지연 | 손님 1시간 대기 | 사용자 무한 대기 |

> 🎯 `maxTurns = 10` → **최대 10번**까지만 Claude API 호출!
> 10번 안에 답을 못 찾으면 **강제 종료** (안전장치!)

---

# 💻 maxTurns: 간단하지만 강력한 안전장치

```typescript
// app/api/chat/route.ts
let turnCount = 0;
const maxTurns = 10;    // ⏱️ 타이머: 10턴!

while (turnCount < maxTurns) {   // 10번까지만!
  turnCount++;                    // 1, 2, 3... 카운트
  // Claude API 호출 + 도구 실행...
}  // turnCount >= 10이면 자동 종료!
```

| maxTurns 값 | 장단점 |
|:---:|:---|
| 3~5 | 💰 비용 절약, 🏃 빠른 응답, ❌ 복잡한 질문 불가 |
| **10 (우리 선택)** | **⚖️ 균형 잡힌 선택!** |
| 20+ | ✅ 복잡한 작업 가능, 💸 비용 증가, 🐢 느린 응답 |

> 실전 팁: 대부분의 주식 질문은 *3~4턴*이면 충분해요! 🏎️

---

# ✅ 정리: maxTurns

> 🎯 **maxTurns = 요리 타이머! ⏱️**
> 시간 초과되면 강제 종료 → 무한 루프와 비용 폭주를 막는 안전장치!

---

<!-- _class: lead -->
<!-- _backgroundColor: #C93A25 -->
<!-- _color: white -->

# Part 7 📻
## 라디오 생방송
### (SSE Streaming)

---

# 🎯 다운로드 vs 라디오 생방송

```
📥 다운로드 (기존 방식):
   노래 전체를 다 받아야 → 재생 가능
   "잠시만요... 로딩 중... 100%... 이제 들으세요!"
   😴 (기다리는 동안 지루...)

📻 라디오 생방송 (스트리밍):
   실시간으로 한 음절씩 들려와요!
   "안..." "녕..." "하..." "세..." "요!"
   😊 (바로바로 들을 수 있어서 좋다!)
```

> AI 답변도 마찬가지!
> **전체 답변을 기다릴 필요 없이**, 만들어지는 대로 바로바로 보여줘요! 📻

---

# 🔗 이것이 AI Agent에서는...

```
📻 라디오 생방송 = SSE (Server-Sent Events) 스트리밍!

  🖥️ 서버 (방송국)           📱 브라우저 (라디오)

  "삼..."                  →  "삼" 표시
  "성..."                  →  "삼성" 표시
  "전..."                  →  "삼성전" 표시
  "자..."                  →  "삼성전자" 표시
  "현재가는..."            →  "삼성전자 현재가는" 표시
```

**사용자에게는 "타이핑 효과"처럼 보여요!** ⌨️

> SSE = Server-Sent Events
> 서버가 **한쪽 방향으로 계속 데이터를 보내는** 기술이에요!

---

# 🎯 라디오 방송의 종류: SSE 이벤트 타입

라디오 방송에도 여러 종류가 있죠?

| 방송 종류 📻 | SSE 이벤트 | 언제 보내나? |
|:---:|:---:|:---|
| 🎵 노래 재생 | `text_delta` | Claude가 텍스트 생성할 때마다 |
| 📢 광고 안내 | `tool_call` | 도구 호출이 시작될 때 |
| 🎬 방송 종료 | `done` | 에이전트 루프 완료! |
| ⚠️ 긴급 속보 | `error` | 에러 발생! |

> 💡 이 4가지 이벤트로 에이전트의 모든 상태를 실시간 전달!

---

# 💻 SSE 이벤트 전송 예시

```typescript
// 실제 전송 순서 예시:
send({ type: "text_delta", text: "삼성전자를 " });     // 🎵
send({ type: "text_delta", text: "검색하겠습니다." }); // 🎵
send({ type: "tool_call", name: "searchStock" });      // 📢
// ... 도구 실행 중 ...
send({ type: "text_delta", text: "현재가는..." });     // 🎵
send({ type: "done", text: "전체 텍스트" });           // 🎬
```

> 💡 `text_delta`는 글자 단위, `tool_call`은 도구 시작,
> `done`은 전체 완료 시점에 전송!

---

# 💻 서버: 방송국 만들기 (ReadableStream)

```typescript
// app/api/chat/route.ts - 🏢 라디오 방송국!
const stream = new ReadableStream({
  async start(controller) {
    const send = (data) => {
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
      );
    };
    // 🍳 에이전트 루프 전체가 이 안에서 실행!
    controller.close();  // 📴 방송 종료
  },
});
return new Response(stream, {
  headers: { "Content-Type": "text/event-stream" },
});
```

---

# 💻 클라이언트: 라디오 수신기 (1/2)

```typescript
// components/chat.tsx - 📻 라디오 수신기!
const reader = response.body.getReader();  // 📻 라디오 켜기
let buffer = "";

while (true) {
  const { done, value } = await reader.read();  // 🎵 수신!
  if (done) break;  // 📴 방송 끝!

  buffer += decoder.decode(value);
  const lines = buffer.split("\n\n");     // 📦 이벤트 분리
  buffer = lines.pop()!;                   // 🔄 불완전한 건 보관
```

---

# 💻 클라이언트: 라디오 수신기 (2/2)

```typescript
  for (const line of lines) {
    const data = JSON.parse(line.slice(6)); // "data: " 제거

    if (data.type === "text_delta")  → 📝 텍스트 화면에 추가
    if (data.type === "tool_call")   → 🔧 도구 호출 표시
    if (data.type === "done")        → ✅ 완료!
  }
}
```

> 💡 `line.slice(6)`으로 "data: " 접두사를 제거하고 JSON 파싱!
> 이벤트 타입별로 화면 업데이트!

---

# 🍳 요리사 시뮬레이션: 실시간 중계

```
⏰ 시간 순서 ─────────────────────────────→

📻 Turn 1: 라디오 생방송!
  🎵 "🔍 의도..." "분석..." "📋 탐색..."
  📢 "도구 사용: 종목 검색 — 삼성전자"
  ⏳ (도구 실행 중... ●●●)

📻 Turn 2: 계속 생방송!
  🎵 "📊 정보..." "수집..."
  📢 "도구 사용: 시세 조회 — 005930"
```

> 사용자는 전체 답변을 기다리지 않고 **실시간으로** 볼 수 있어요! 👀

---

# ✅ 정리: SSE Streaming

> 🎯 **SSE Streaming = 라디오 생방송! 📻**
> 답변이 완성될 때까지 기다리지 않고, 실시간으로 한 글자씩 전달!

---

<!-- _class: lead -->
<!-- _backgroundColor: #C93A25 -->
<!-- _color: white -->

# Part 8 📝
## 수학 풀이 과정 공개
### (Thinking Steps)

---

# 🎯 수학 시험을 떠올려 보세요

```
📝 수학 시험 답안지:

  ❌ 나쁜 답안: "답: 42"  (과정 없이 답만!)

  ✅ 좋은 답안:
     1단계: 조건 정리  → "x + y = 10, x - y = 4"
     2단계: 풀이 계획  → "연립방정식으로 풀겠습니다"
     3단계: 계산 과정  → "두 식을 더하면 2x = 14..."
     4단계: 최종 답    → "답: x = 7, y = 3"
```

> 과정을 보여주면 **신뢰감**이 생겨요!
> AI도 마찬가지! 🤖

---

# 🔗 이것이 AI Agent에서는...

AI가 답변하는 과정을 **4단계로 보여줘요!**

| 수학 풀이 📝 | AI 사고 과정 🤖 | 아이콘 |
|:---:|:---:|:---:|
| 조건 정리 | 의도 분석 | 🔍 |
| 풀이 계획 | 탐색 계획 | 📋 |
| 계산 과정 | 정보 수집 및 분석 | 📊 |
| 최종 답 | 최종 답변 | 💡 |

> 💡 🔍→📋→📊→💡 순서로 사고 과정을 시각화!

---

# 🔗 4단계 사고 과정 예시

```
🔍 의도 분석      "삼성전자 주가와 뉴스를 알고 싶어하시는군요"
📋 탐색 계획      "1.종목검색 → 2.시세조회 → 3.뉴스조회"
📊 정보 수집      "현재가 72,400원 확인! 뉴스 5건 확인!"
💡 최종 답변      "삼성전자 현재가 72,400원이에요..."
```

> 💡 이 4단계 형식은 **System Prompt**에서 지정해요!
> Claude가 이 형식에 맞춰 자동으로 응답합니다.

---

# 🎯 왜 과정을 보여주나요?

AI가 **여러 도구를 사용하면서 시간이 걸려요**.
그 동안 사용자는 **뭘 하고 있는지 알아야 안심**해요!

```
❌ 과정을 안 보여주면:
   😊 "삼성전자 분석해줘"
       (10초... 20초...)  "고장 난 건가?" 😟

✅ 과정을 보여주면:
   😊 "삼성전자 분석해줘"
       🔍 의도 분석 중... ✓
       📋 탐색 계획 수립 중... ✓
       📊 종목 검색 중... → 시세 조회 중...
       💡 최종 답변 생성!  "열심히 일하고 있구나!" 😊
```

---

# 💻 System Prompt로 형식 강제! (1/2)

```typescript
// app/api/chat/route.ts
const systemPrompt = `...
반드시 다음 4단계로 사고하고,
마크다운 형식으로 표시하세요:

## 🔍 의도 분석
사용자 질문의 의도를 파악합니다.

## 📋 탐색 계획
어떤 정보를 수집할지 계획합니다.
...`;
```

> 💡 System Prompt로 **"이 형식으로 답변해!"**라고 지시하면,
> Claude가 그 형식에 맞춰 응답해요!

---

# 💻 System Prompt로 형식 강제! (2/2)

```typescript
// systemPrompt 계속...
`...
## 📊 정보 수집 및 분석
도구를 호출하여 데이터를 수집합니다.

## 💡 최종 답변
초보 투자자가 이해하기 쉽게 답변합니다.
...`;
```

> 💡 4단계 헤더(`## 🔍`, `## 📋`, `## 📊`, `## 💡`)를 기준으로
> 프론트엔드에서 각 단계를 **자동 파싱**합니다!

---

# 💻 파싱: 마크다운에서 단계 추출

```typescript
// components/message-bubble.tsx
function parseThinkingSteps(text) {
  // 🔍 "## 🔍 의도 분석" 부분 찾기
  // 📋 "## 📋 탐색 계획" 부분 찾기
  // 📊 "## 📊 정보 수집 및 분석" 부분 찾기
  // 💡 "## 💡 최종 답변" 부분 찾기
  return { steps, finalAnswer };
}
```

> 🎯 Claude 응답 텍스트에서 `## 🔍`, `## 📋` 등의 **헤더를 기준**으로
> 각 단계를 **자동으로 잘라내서** 아코디언 UI로 보여주는 거예요!

---

# 🎯 사용자가 보는 화면 (1/2)

```
┌───────────────────────────────────┐
│ 🐶 주식내비                         │
│                                   │
│ ┌── 🔍 의도 분석 ────── ▼ ──┐    │
│ │ 삼성전자의 현재 주가와      │    │
│ │ 최신 뉴스를 알고 싶어합니다 │    │
│ └─────────────────────────┘    │
│                                   │
│ ┌── 📋 탐색 계획 ────── ▼ ──┐    │
│ │ 1. searchStock으로 검색    │    │
│ │ 2. getStockQuote로 조회   │    │
│ └─────────────────────────┘    │
```

---

# 🎯 사용자가 보는 화면 (2/2)

```
│ ┌── 📊 정보 수집 ●●● ──────┐    │
│ │ (수집 중...)              │    │
│ └─────────────────────────┘    │
│                                   │
│ [종목 검색 — 삼성전자] ●●●        │
└───────────────────────────────────┘
```

> 💡 클릭하면 펼쳐지는 **아코디언 UI**!
> 진행 중인 단계는 ●●● 로딩 표시!

---

# ✅ 정리: Thinking Steps

> 🎯 **Thinking Steps = 수학 문제 풀이 과정 공개! 📝**
> 답만 보여주지 않고, 4단계 과정을 보여줘서 사용자가 안심할 수 있어요!

---

<!-- _class: lead -->
<!-- _backgroundColor: #C93A25 -->
<!-- _color: white -->

# Part 9 💰
## 통화료 실시간 표시
### (Token Tracking & 비용 투명성)

---

# 🎯 전화 통화료를 떠올려 보세요

```
📱 전화 통화할 때:

   ❌ 통화료가 안 보이면:
      (30분 통화 후 요금 청구서...)
      "이번 달 통화료가 5만원?! 😱"

   ✅ 통화료가 실시간으로 보이면:
      "현재 통화료: 120원... 240원... 360원..."
      "아, 이 정도면 괜찮겠네!" 😊
```

AI API도 **사용할수록 요금이 나가요!** (토큰 = 글자 수에 따른 요금)

> 우리 프로젝트는 **매 응답마다 비용을 계산해서 보여줘요!** 💰

---

# 🔗 이것이 AI Agent에서는...

**토큰이란?**
- 글자/단어를 잘게 쪼갠 조각 (대략 한글 1글자 = 2~3 토큰)
- **보낸 토큰** + **받은 토큰** = 총 비용!

| 항목 | 단가 (Claude Haiku 4.5) | 한화 환산 |
|------|:---:|:---:|
| 입력 100만 토큰 | $1.00 | 약 1,450원 |
| 출력 100만 토큰 | $5.00 | 약 7,250원 |

> 💡 에이전트는 **여러 턴**을 돌기 때문에
> 각 턴의 토큰을 **누적 합산**해야 해요!

---

# 💻 토큰 추적 코드

```typescript
// app/api/chat/route.ts
let totalInputTokens = 0;     // 📨 보낸 토큰 누적
let totalOutputTokens = 0;    // 📩 받은 토큰 누적

while (turnCount < maxTurns) {
  const response = await stream.finalMessage();
  // 💰 이번 턴 토큰 누적!
  totalInputTokens += response.usage.input_tokens;
  totalOutputTokens += response.usage.output_tokens;
}
```

> 💡 매 턴마다 `usage.input_tokens`와 `usage.output_tokens`를 누적!

---

# 💻 비용 계산 코드

```typescript
// 📊 최종 비용 계산 (원화)
const inputCostKRW =
  (totalInputTokens / 1_000_000) * 1.0 * 1450;
const outputCostKRW =
  (totalOutputTokens / 1_000_000) * 5.0 * 1450;
const totalCostKRW = inputCostKRW + outputCostKRW;

// 💬 사용자에게 비용 표시!
// "💰 API 비용: 입력 3,245토큰 + 출력 1,891토큰 = 18.49원"
```

> 💡 100만 토큰당 단가 x 환율(1,450원)로 원화 변환!

---

# 🍳 요리사 시뮬레이션: 비용 추적

```
🍳 주문: "삼성전자 주가 + 뉴스"

  Turn 1: 🔧 searchStock    💰 입력 850 + 출력 320
  Turn 2: 🔧 getStockQuote  💰 입력 1,200 + 출력 480
  Turn 3: 🔧 getStockNews   💰 입력 1,800 + 출력 520
  Turn 4: 💬 최종 답변       💰 입력 2,400 + 출력 890

  📊 합계: 입력 6,250 + 출력 2,210 토큰
  💰 비용: 약 25.13원
  🎉 한 잔의 커피보다 훨씬 저렴해요! ☕
```

---

# ✅ 정리: Token Tracking

> 🎯 **Token Tracking = 통화료 실시간 표시! 📱**
> 매 턴마다 토큰을 누적 추적하고, 비용을 원화로 환산해서 보여줘요!

---

<!-- _class: lead -->
<!-- _backgroundColor: #C93A25 -->
<!-- _color: white -->

# Part 10 🔄
## 에이전트 루프 구현: 전체 흐름
### (route.ts 코드 Step-by-Step)

---

# 🍳 전체 요리 과정: 한눈에 보기!

```
👨‍🍳 요리 시작! (POST /api/chat)
  │
  ├── 📻 방송국 오픈 (ReadableStream)
  ├── 📼 이전 대화 녹음 준비 (apiMessages)
  ├── 🔄 요리 루프 시작 (while < maxTurns)
  │     ├── 📖 Claude에게 레시피 전달
  │     ├── 📻 실시간 중계 (text_delta)
  │     ├── 👅 맛보기 (stop_reason)
  │     │     ├── 🍲 완성! → break
  │     │     └── 🥬 도구 실행 → 🔄
  │     └── 💰 토큰 누적
  └── 💰 최종 비용 → 📴 방송 종료
```

---

# 💻 Step 1: 방송국 오픈 + 도우미 준비

```typescript
// app/api/chat/route.ts
export async function POST(req: Request) {
  const { messages, sessionId } = await req.json();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
        );
      };
      let totalInputTokens = 0;
      let totalOutputTokens = 0;
      // ... 에이전트 루프 실행 ...
    },
  });
```

---

# 💻 Step 2: 대화 녹음 준비 + 루프 시작

```typescript
      // 📼 이전 대화 녹음을 Claude용으로 변환
      const apiMessages = messages.map(m => ({
        role: m.role,
        content: m.content,
      }));

      let turnCount = 0;
      const maxTurns = 10;    // ⏱️ 타이머!

      while (turnCount < maxTurns) {
        turnCount++;
```

| 변수 | 비유 | 역할 |
|:---:|:---:|:---|
| `apiMessages` | 📼 녹음 | 전체 대화 히스토리 |
| `turnCount` | 🔢 횟수 | 현재 턴 번호 |
| `maxTurns` | ⏱️ 타이머 | 무한 루프 방지 |

---

# 💻 Step 3: Claude API 호출 (레시피 전달!)

```typescript
        // 📖 Claude에게 레시피 + 녹음 + 도구 목록 전달!
        const stream = anthropic.messages.stream({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 4096,
          system: systemPrompt,       // 📖 레시피
          messages: apiMessages,      // 📼 대화 녹음
          tools: toolDefinitions,     // 🔧 도구 목록
        });

        let fullText = "";
        const toolUseBlocks = [];
```

> 💡 `stream`으로 호출하면 실시간 텍스트 중계가 가능해요!

---

# 💻 Step 3 (계속): 실시간 방송

```typescript
        // 📻 실시간 방송! (글자가 나올 때마다)
        stream.on("text", (text) => {
          fullText += text;
          send({ type: "text_delta", text });  // 🎵 방송!
        });

        const response = await stream.finalMessage();
```

> 💡 `stream.on("text")`로 글자 단위 수신 → `send()`로 즉시 방송!
> `finalMessage()`는 전체 응답이 끝날 때까지 기다립니다.

---

# 💻 Step 4: 맛보기! (종료 조건 확인)

```typescript
        // 💰 이번 턴 토큰 누적
        totalInputTokens += response.usage.input_tokens;
        totalOutputTokens += response.usage.output_tokens;

        // 🔧 도구 호출 블록 수집
        for (const block of response.content) {
          if (block.type === "tool_use")
            toolUseBlocks.push(block);
        }

        // 👅 맛보기: 완성인가?
        if (toolUseBlocks.length === 0 ||
            response.stop_reason === "end_turn") {
          send({ type: "done", text: fullText });
          break;    // 🛑 루프 종료!
        }
```

---

# 💻 Step 5: 재료 더 가져오기 — 도구 실행 (1/2)

```typescript
        // 🥬 "재료 더 필요해요!" → 도구 실행
        // 📻 도구 호출 중임을 방송
        send({
          type: "tool_call",
          name: toolUseBlocks[0].name
        });

        // 📼 녹음에 추가: Claude의 응답
        apiMessages.push({
          role: "assistant",
          content: response.content, // 텍스트+도구호출 전체!
        });
```

---

# 💻 Step 5: 재료 더 가져오기 — 도구 실행 (2/2)

```typescript
        // 🔧 도구 실행!
        const toolResults = [];
        for (const tool of toolUseBlocks) {
          const result = await executeTool(
            tool.name, tool.input
          );
          toolResults.push({
            type: "tool_result",
            tool_use_id: tool.id,
            content: result,
          });
        }

        // 📼 녹음에 추가: 도구 실행 결과
        apiMessages.push({ role: "user", content: toolResults });
```

---

# 💻 Step 6: 다시 루프! 그리고 방송 종료

```typescript
        // 🔄 toolUseBlocks 초기화 후 다시 while 처음으로!
        toolUseBlocks.length = 0;
      }
      // ⏱️ maxTurns 도달하면 여기로!

      controller.close();  // 📴 방송 종료!
```

> 🎉 요약하면:
> 1. 📻 방송국 열기 (ReadableStream)
> 2. 🔄 루프: Claude 호출 → 맛보기 → 도구 실행 → 반복
> 3. 🍲 완성되면 서빙 + 비용 표시
> 4. 📴 방송 종료

---

# 퀴즈 타임! 🤔

**Q: 에이전트 루프에서 루프가 종료되는 조건은 무엇인가요? (2가지!)**

<br>

힌트: 요리사가 "완성!"이라고 외치는 두 가지 신호를 떠올려 보세요! 🍳

> 🥁 정답은...

---

# 퀴즈 정답! 🎉

**정답: 2가지 조건 중 하나라도 만족하면 종료!**

```typescript
if (
  toolUseBlocks.length === 0 ||        // ① 도구 호출이 없음
  response.stop_reason === "end_turn"   // ② Claude가 "완성!" 선언
) {
  break;  // 🛑 루프 종료!
}
```

| 조건 | 비유 | 설명 |
|:---:|:---:|:---|
| ① 도구 없음 | 🥬 "재료 요청 안 함" | 더 이상 도구가 필요 없다! |
| ② end_turn | 🍲 "완성!" 외침 | Claude가 명시적으로 끝냄 |

> 🎯 `||` (OR)로 연결: 어느 쪽이든 만족하면 종료! ✅

---

<!-- _class: lead -->
<!-- _backgroundColor: #C93A25 -->
<!-- _color: white -->

# Part 11 🔮
## 한계와 개선 방향

---

# 현재 에이전트의 한계점 (1/2)

### 1. 🐢 순차적 도구 실행
```
현재:  검색 → (기다림) → 시세 → (기다림) → 뉴스
개선:  검색 → 시세 + 뉴스 (동시에!)
```

### 2. 📼 녹음 테이프가 계속 길어짐
- 턴이 늘수록 입력 토큰이 기하급수적으로 증가!
- Turn 5의 비용 >> Turn 1의 비용

---

# 현재 에이전트의 한계점 (2/2)

### 3. 🔄 에러 복구 한계
- 도구 실행 실패 시 재시도(retry) 로직 없음

### 4. 👤 기억력 없음
- 대화가 끝나면 사용자 정보를 잊어버림
- "관심 종목 목록" 같은 것을 기억 못 함

> 💡 이런 한계들은 다음 단계에서 개선할 수 있어요!

---

# 에이전트 진화 단계

```
Level 0: 🥤 자판기 (Chatbot)
  └── 단순 질의응답, 도구 없음

Level 1: 👨‍💼 편의점 직원 (우리 프로젝트!) ⭐
  └── Agentic Loop + Tool Use + SSE

Level 2: 🏢 팀 작업 (Multi-Agent System)
  └── 여러 Agent가 협업

Level 3: 🧑‍💼 자율 매니저 (Autonomous Agent)
  └── 스스로 목표 설정, 실행, 평가, 학습
```

> 우리는 **Level 1**을 만들었어요! 이것만으로도 대단한 거예요! 🎉

---

<!-- _class: lead -->
<!-- _backgroundColor: #C93A25 -->
<!-- _color: white -->

# Part 12 ✅
## 핵심 정리

---

# 🗺️ 전체 아키텍처: 한 장으로 보기!

```
😊 사용자 ── 질문 ──→ 🖥️ 서버 (route.ts)
                             │
                   ┌─────────┴─────────┐
                   │  🔄 Agent Loop    │
                   │  👨‍🍳 Claude API     │
                   │  👅 맛보기?        │
                   │  🍲완성 / 🥬도구   │
                   │  📼 녹음 추가      │
                   └─────────┬─────────┘
                        📻 SSE Stream
                             ↓
                   📱 브라우저 (React)
```

---

# 🎯 오늘 배운 핵심 개념 (1/2)

| # | 비유 🎭 | 개념 🔧 | 한 줄 요약 |
|:---:|:---:|:---:|:---|
| 1 | 자판기 vs 직원 | Chatbot vs Agent | Agent는 스스로 생각하고 행동! |
| 2 | 요리사 반복작업 | Agentic Loop | while 루프로 반복 실행! |
| 3 | 비서 업무지시 | Tool Use | AI가 외부 도구를 호출! |
| 4 | "완성!" 외침 | stop_reason | 루프 종료 판단 기준! |
| 5 | 대화 녹음기 | Message History | 전체 대화를 매번 전달! |

---

# 🎯 오늘 배운 핵심 개념 (2/2)

| # | 비유 🎭 | 개념 🔧 | 한 줄 요약 |
|:---:|:---:|:---:|:---|
| 6 | 요리 타이머 | maxTurns | 무한 루프 방지 안전장치! |
| 7 | 라디오 생방송 | SSE Streaming | 실시간 답변 전달! |
| 8 | 풀이과정 공개 | Thinking Steps | 4단계 사고 시각화! |
| 9 | 통화료 표시 | Token Tracking | 비용 투명 공개! |

---

# 📁 핵심 코드 파일 요약 (1/2)

```
🍳 app/api/chat/route.ts       ← 에이전트 루프의 심장!
│  while (turnCount < maxTurns)    🔄 요리 반복!
│  ├── anthropic.messages.stream() 📖 Claude에게 레시피
│  ├── stream.on("text")          📻 라디오 생방송
│  ├── stop_reason 확인           👅 맛보기
│  ├── executeTool() 실행         🔧 비서 업무 지시
│  └── apiMessages.push()         📼 대화 녹음 추가

🔧 lib/tools.ts                ← 비서의 업무 목록!
│  toolDefinitions[]              📋 도구 4가지 정의
│  executeTool()                  🔧 도구 실행
```

---

# 📁 핵심 코드 파일 요약 (2/2)

```
📻 components/chat.tsx          ← 라디오 수신기!
│  reader.read() 루프             📻 SSE 이벤트 수신

📝 components/message-bubble.tsx ← 풀이 과정 표시!
│  parseThinkingSteps()           🔍📋📊💡 단계 추출
│  parseFollowUpQuestions()       💬 추천 질문 추출

🎨 components/thinking-steps.tsx ← 아코디언 UI!
│  ThinkingSteps                  📝 접기/펼치기
│  ToolCallIndicator              🔧 도구 호출 표시
```

---

# 퀴즈 타임! 최종 확인 🤔

**다음 중 맞으면 O, 틀리면 X!**

1. Agent는 Claude API를 **한 번만** 호출한다 ( )
2. `stop_reason`이 `"tool_use"`이면 **루프를 계속** 돈다 ( )
3. `maxTurns`는 **무한 루프를 방지**하는 안전장치다 ( )
4. 도구 실행 결과는 `role: "assistant"`로 추가한다 ( )
5. SSE 스트리밍으로 **실시간** 답변을 볼 수 있다 ( )

> 🥁 정답은...

---

# 최종 퀴즈 정답! 🎉

1. Agent는 Claude API를 **한 번만** 호출한다 → **X!**
   → 여러 번! (Agentic Loop 🔄)

2. `stop_reason`이 `"tool_use"`이면 **루프를 계속** 돈다 → **O!**
   → 도구 실행 후 다시 Claude 호출! 🔧

3. `maxTurns`는 **무한 루프를 방지**하는 안전장치다 → **O!**
   → 요리 타이머! ⏱️

4. 도구 실행 결과는 `role: "assistant"`로 추가한다 → **X!**
   → `role: "user"`로 추가! 📋

5. SSE 스트리밍으로 **실시간** 답변을 볼 수 있다 → **O!**
   → 라디오 생방송! 📻

---

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _footer: "" -->
<!-- _backgroundColor: #1a1a2e -->
<!-- _color: white -->

# 🎉 수고하셨습니다!

### 여러분은 이제 AI Agent 아키텍처를 이해했어요!

<br>

### 🍳 실습 과제

1. `maxTurns`를 3으로 줄여보고 어떤 질문에서 답변이 잘리는지 확인하기
2. 새로운 도구 (예: `getStockChart`)를 추가해보기
3. `stop_reason`이 `"max_tokens"`인 경우를 처리하는 코드 추가하기

**핵심 파일:** `app/api/chat/route.ts` | `lib/tools.ts`

---

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _footer: "" -->
<!-- _backgroundColor: #1a1a2e -->
<!-- _color: white -->

# 🙋 Q&A

### 질문이 있으시면 언제든 물어보세요!

<br>

**오늘의 핵심 한 줄:**
> 🎯 AI Agent = **편의점 직원**처럼 스스로 생각하고,
> **요리사**처럼 반복 작업하며,
> **라디오 생방송**처럼 실시간으로 답변하는 AI!

<br>

**다음 강의 예고:**
Tool Calling (도구 호출) 실전 -- LLM이 외부 세계와 대화하는 방법
