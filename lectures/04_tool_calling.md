---
marp: true
theme: default
paginate: true
backgroundColor: "#1a1a2e"
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
<!-- _backgroundColor: #2D2926 -->
<!-- _color: #FFF8E7 -->

# 📋 Tool Calling 완전 정복

## 비서에게 업무 지시하는 법을 배워볼까요?

<br>

**주식내비 키우Me** 프로젝트로 배우는
도구 정의 · JSON Schema · executeTool · 오케스트레이션

xStudio Hackathon Lecture Series **#4**

---

## 오늘의 여행 코스 🗺️

### 🏢 Part 1 — 비서실 입문 (개념과 원리)
"비서에게 업무를 지시한다"는 게 뭔지부터!

### 🛠️ Part 2 — 업무 매뉴얼 작성 (도구 설계와 구현)
비서가 할 수 있는 업무를 정리하고, 데스크를 세팅!

### 🔄 Part 3 — 업무 지시 실전 (오케스트레이션)
실제로 주문서를 보내고, 영수증을 받는 과정!

### 🎉 Part 4 — 종합 실습 (마무리)
"삼성전자 주가 알려줘" 전체 흐름을 직접 따라가기!

---

<!-- _class: lead -->
<!-- _backgroundColor: #E8452E -->
<!-- _color: #FFF8E7 -->

# 🏢 Part 1
## 비서실 입문 — 개념과 원리

---

## 🎯 여러분은 이미 Tool Calling을 하고 있어요!

회사에서 이런 경험 있으시죠?

> 📞 "김비서님, **회의실 3층 A** 내일 오후 2시에 **예약**해주세요"

> 📦 "이비서님, 제 **택배** 어디쯤 왔는지 **조회**해주세요"

> 📰 "박비서님, 오늘 **조간 신문** 주요 기사 **요약**해주세요"

### 이것이 바로 Tool Calling입니다! 🎉

여러분(사람) = **Claude(AI)** / 비서 = **외부 도구(함수)** / 업무 지시 = **도구 호출 요청**

---

## 🔗 이것이 Tool Calling에서는...

| 일상 업무 📋 | Tool Calling 🤖 |
|-------------|-----------------|
| 여러분이 비서에게 말합니다 | 사용자가 Claude에게 질문합니다 |
| 비서가 업무를 파악합니다 | Claude가 어떤 도구를 쓸지 판단합니다 |
| 비서가 해당 부서에 연락합니다 | 서버가 외부 API를 호출합니다 |
| 비서가 결과를 보고합니다 | 도구 결과가 Claude에게 전달됩니다 |
| 여러분이 보고를 듣습니다 | 사용자가 최종 답변을 받습니다 |

> 💡 Tool Calling = AI가 **"이 업무를 이 정보로 처리해주세요"** 라고 요청하고,
> 서버가 실제로 처리한 결과를 다시 AI에게 돌려주는 패턴

---

## 😢 비서 없는 세계 vs 비서 있는 세계

### 비서가 없다면... (Tool Calling 없는 Claude)

```
👤 "삼성전자 현재 주가 알려줘"
         ↓
🤖 "죄송합니다. 저는 실시간 데이터에 접근할 수 없어서
     포털 사이트에서 직접 확인해 보시기 바랍니다..." 😥
```

### 비서가 있다면! (Tool Calling 있는 Claude)

```
👤 "삼성전자 현재 주가 알려줘"
         ↓
🤖 📞 비서에게: "삼성전자 종목코드 찾아줘" → 005930
   📊 비서에게: "005930 시세 알려줘"   → 72,400원, +1.2%
         ↓
🤖 "삼성전자(005930) 현재 주가는 72,400원, +1.2% 상승!" 🎉
```

---

## 🤖 Claude의 근본적 한계

Claude(AI)는 아무리 똑똑해도 **혼자서는 못 하는 일**이 있어요!

| 못 하는 일 🚫 | 이유 | 비유 🏢 |
|-------------|------|---------|
| 실시간 주가 확인 | 학습 이후 데이터를 모름 | 신문이 없는 사무실 |
| 최신 뉴스 조회 | 인터넷 접속 불가 | 전화가 없는 사무실 |
| 계산기 사용 | 텍스트 생성만 가능 | 계산기 없는 회계사 |
| API 호출 | 외부 시스템 접근 불가 | 밖에 못 나가는 직원 |

> 💡 Tool Calling이 해결합니다! 비서(도구)를 붙여주면,
> Claude는 **비서를 통해** 바깥 세계의 정보를 가져올 수 있어요!

---

## ✅ Part 1 첫 번째 개념 정리

> 📌 **Tool Calling** = AI가 혼자 못 하는 일을 **비서(외부 도구)에게 시켜서** 해결하는 방법
>
> 마치 여러분이 회사에서 비서에게 "회의실 예약해줘", "택배 조회해줘"라고
> 업무를 지시하는 것과 똑같습니다!

---

## 🎯 Tool Calling vs 다른 방법들

### 회사에서 정보를 얻는 3가지 방법 비유

| 방법 | 비유 🏢 | 기술 용어 |
|------|---------|----------|
| 📞 비서에게 전화하기 | 실시간으로 알려달라고 지시 | *Tool Calling* |
| 📚 사내 위키 찾아보기 | 이미 정리된 문서 검색 | RAG |
| 🎓 전문가 교육 받기 | 내가 직접 배워서 알기 | Fine-tuning |

| 방법 | 정보 시점 | 적합한 경우 |
|------|----------|------------|
| *Tool Calling* 📞 | **실시간!** | 주가, 날씨, 뉴스 |
| RAG 📚 | 문서 정리 시점 | 사내 매뉴얼, FAQ |
| Fine-tuning 🎓 | 교육 시점 | 전문 지식, 말투 |

---

## 🔗 우리 프로젝트는 왜 Tool Calling을 선택했을까?

### 주식내비 키우Me의 핵심 기능들

| 기능 | 왜 Tool Calling? 📞 |
|------|-------------------|
| 🔍 실시간 주가 조회 | 주가는 **매초** 변해요! 문서로 저장하면 이미 낡은 정보 |
| 📰 최신 뉴스 조회 | 뉴스는 **방금** 나온 것이 중요해요! |
| 🔎 종목 검색 | 사용자가 "삼성" 하면 "삼성전자? 삼성SDI?" 찾아야 해요 |
| 🌐 시장 현황 | 여러 API를 **조합**해서 브리핑을 만들어야 해요 |

> 💡 모두 **실시간 데이터**가 필요한 기능들이에요.
> 비서(Tool)가 바깥에서 최신 정보를 가져다 주는 거죠!

---

## 🎯 비서에게 업무 지시하는 전체 과정

사무실에서 비서에게 일을 시키는 과정을 떠올려 보세요! 📋

```
👤 사장님: "삼성전자 주가 알려줘"
     ↓
🤖 AI비서: (업무 매뉴얼을 펼칩니다 📖)
     ↓
📞 AI비서 → 종목검색부서: "삼성전자 코드 찾아주세요"
                         → "네, 005930입니다!"
     ↓
📊 AI비서 → 시세조회부서: "005930 시세 알려주세요"
                         → "72,400원, +1.2%입니다!"
     ↓
🤖 AI비서: "사장님, 삼성전자 현재가 72,400원, 1.2% 올랐습니다!"
```

---

## 🔗 이것이 Anthropic Tool Use API에서는...

```
[1] 👤 사용자 → 서버: "삼성전자 주가 알려줘"
[2] 🖥️ 서버 → Claude API: 메시지 + 📖 업무 매뉴얼(4개 도구 정의)
[3] 🤖 Claude 응답: "searchStock 부서에 연락해주세요!"
[4] 🖥️ 서버: 📞 searchStock("삼성전자") 실행 → 005930
[5] 🖥️ 서버 → Claude API: 📋 "결과: 005930이래요"
[6] 🤖 Claude: 추가 업무 지시 or 최종 보고
[7] 🖥️ 서버 → 👤 사용자: 실시간 스트리밍으로 답변 전달!
```

---

## 🎯 Tool Calling의 3가지 핵심 요소

비서 시스템에 꼭 필요한 3가지를 생각해 볼까요?

- **1️⃣ 업무 매뉴얼 = Tool Definition (도구 정의)**
  비서가 **할 수 있는 업무 목록** + 각 업무에 **필요한 정보**
- **2️⃣ 주문서 = tool_use Block (도구 호출 요청)**
  Claude가 보내는 **공식 주문서** — 주문번호(`id`) + 업무명(`name`) + 정보(`input`)
- **3️⃣ 영수증 = tool_result Block (도구 실행 결과)**
  비서가 보내는 **영수증** — 주문번호(`tool_use_id`) + 결과(`content`)

---

## 🔗 주문서 📝 ↔ 영수증 🧾 매칭 시스템

이건 마치 **음식 주문 시스템**과 같아요!

```
📝 주문서 (tool_use):
   주문번호: #A001
   메뉴: searchStock
   요청: {종목명: "삼성전자"}
                    ↕ 주문번호로 매칭!
🧾 영수증 (tool_result):
   주문번호: #A001  ← 같은 번호!
   결과: "005930번 종목을 찾았습니다"
```

> 💡 마치 카페에서 진동벨 번호로 내 음료를 찾듯이,
> **주문번호(id)**로 어떤 요청의 결과인지 정확하게 매칭해요!

---

## ✅ Tool Calling 3요소 정리

> 📌 Tool Calling에 필요한 것은 딱 **3가지**!
>
> 1. 📖 **업무 매뉴얼** (Tool Definition) — 비서가 할 수 있는 일 목록
> 2. 📝 **주문서** (tool_use) — Claude가 "이거 해줘!"라고 보내는 요청
> 3. 🧾 **영수증** (tool_result) — 비서가 "다 했어요!"라고 보내는 결과
>
> 이 3가지가 Tool Calling의 **전부**입니다!

---

## 퀴즈 타임! 🤔

### Q1. 다음 중 Tool Calling이 필요한 상황은?

A) "인공지능의 역사에 대해 설명해줘"
B) "삼성전자 현재 주가 알려줘" 📊
C) "영어로 이메일 번역해줘"
D) "파이썬이란 무엇인지 알려줘"

### 정답은...

**B)** 🎉 실시간 주가는 Claude가 혼자 알 수 없어요!
나머지는 Claude가 학습한 지식으로 답변 가능합니다.

> 💡 비서에게 시켜야 하는 일 = **외부 데이터가 필요한 일!**

---

## 🎯 JSON Schema = 택배 송장 양식

택배를 보내려면 **정해진 양식**에 맞춰 적어야 하죠! 📦

| 항목 | 필수? | 예시 |
|------|------|------|
| 보내는 사람 | ✅ 필수 | 홍길동 |
| 받는 사람 | ✅ 필수 | 김철수 |
| 주소 | ✅ 필수 | 서울시 강남구... |
| 연락처 | ✅ 필수 | 010-1234-5678 |
| 배송 메모 | ❌ 선택 | "문 앞에 놔주세요" |

> 💡 빈칸에 아무거나 쓰면 안 돼요!
> **정해진 칸에 맞는 정보**만 써야 택배가 제대로 갑니다! 📮

---

## 🔗 JSON Schema = 도구에 보내는 "송장 양식"

```
도구의 입력 양식 (input_schema):
  ┌─────────────────────────────────────┐
  │ 📦 양식 종류: "object" (서류 묶음)    │
  │                                     │
  │ 📝 기입 항목 (properties):           │
  │    ├── query (종목명)               │
  │    │     타입: "string" (글자)       │
  │    │     설명: "검색할 종목명"        │
  │ ⭐ 필수 항목 (required):            │
  │    └── ["query"]  ← 꼭 써야 해요!   │
  └─────────────────────────────────────┘
```

> 💡 `description`이 가장 중요해요!
> Claude가 이 설명을 읽고 **"아, 이 양식은 이럴 때 쓰는 거구나"** 판단합니다.

---

## 💻 JSON Schema 실제 코드 — 입력 있는 도구

```typescript
// 📦 택배 송장처럼, 정해진 양식에 맞춰 작성!
input_schema: {
  type: "object",           // 양식 종류: 서류 묶음
  properties: {             // 기입 항목들
    query: {
      type: "string",       // 글자를 적는 칸
      description: "검색할 종목명 (예: 삼성전자, 현대차, 카카오)",
    },
  },
  required: ["query"],      // ⭐ 필수 기입 항목!
}
```

---

## 💻 JSON Schema 실제 코드 — 입력 없는 도구

### 양식이 비어있는 도구도 있어요!

```typescript
// getMarketOverview: 시장 전체 현황은 추가 정보 없이 조회 가능!
input_schema: {
  type: "object",
  properties: {},     // 기입할 것 없음! 그냥 "시장 현황 알려줘"
  required: [],       // 필수 항목 없음!
}
```

> 📌 **JSON Schema** = 택배 송장 양식!
> `properties` = 기입 항목 / `required` = 필수 항목 / `description` = 항목 설명

---

## ✅ JSON Schema 정리

> 📌 **JSON Schema** = 택배 송장 양식!
>
> - 📋 `properties` = 기입 항목 (어떤 정보를 적어야 하는지)
> - ⭐ `required` = 필수 항목 (반드시 적어야 하는 칸)
> - 📝 `description` = 항목 설명 (이 칸에 뭘 적어야 하는지 안내)
>
> 양식에 맞게 적어야 택배(도구)가 제대로 작동합니다!

---

<!-- _class: lead -->
<!-- _backgroundColor: #E8452E -->
<!-- _color: #FFF8E7 -->

# 🛠️ Part 2
## 업무 매뉴얼 작성 — 도구 설계와 구현

---

## 🎯 비서의 업무 매뉴얼 📖

우리 회사(주식내비 키우Me)의 비서에게는 **4가지 업무**가 있어요!

| # | 업무 (도구) | 비유 🏢 | 필요한 정보 |
|---|-----------|---------|-----------|
| 1 | 🔍 `searchStock` | 전화번호부에서 이름으로 번호 찾기 | 종목명 |
| 2 | 📊 `getStockQuote` | 은행 전광판 보기 (현재 환율/주가) | 종목코드 |
| 3 | 📰 `getStockNews` | 비서가 신문 스크랩해 오기 | 종목코드 |
| 4 | 🌐 `getMarketOverview` | 아침 뉴스 브리핑 (오늘 시장 전체 요약) | 없음! |

> 💡 비서에게 업무 매뉴얼을 주면, 비서가 **스스로 판단**해서 필요한 업무를 수행해요!

---

## 🎯 도구 1: searchStock 🔍

### 전화번호부에서 이름으로 번호 찾기

여러분이 "김철수"한테 전화하고 싶으면?
→ 먼저 **전화번호부**에서 이름을 찾아 **번호**를 알아내야죠!

```
📞 전화번호부:
   "삼성전자" → 005930
   "현대차"   → 005380
   "카카오"   → 035720
   "네이버"   → 035420
```

> 🔑 종목명(이름)을 알지만 종목코드(번호)를 모를 때!
> **가장 먼저** 사용해야 하는 도구예요!

---

## 🔗 searchStock이 Tool Calling에서는...

```
사용자: "삼성전자 주가 알려줘"
             ↓
Claude: "삼성전자의 종목코드를 모르겠네...
         📞 전화번호부(searchStock)부터 찾자!"
             ↓
searchStock("삼성전자")
             ↓
결과: { 이름: "삼성전자", 코드: "005930", 시장: "KOSPI" }
             ↓
Claude: "좋아, 코드를 알았으니 시세를 조회하자!"
```

> ⭐ "종목코드를 모를 때 **먼저** 이 도구를 사용하세요"
> → 이 한 문장이 Claude의 **호출 순서**를 결정합니다!

---

## 💻 searchStock 코드 보기

```typescript
// 📖 비서의 업무 매뉴얼 — 종목 검색
{
  name: "searchStock",
  description:
    "종목명으로 종목코드와 기본 정보를 검색합니다. "
    + "종목코드를 모를 때 먼저 이 도구를 사용하세요.",
  input_schema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "검색할 종목명 (예: 삼성전자, 현대차, 카카오)",
      },
    },
    required: ["query"],
  },
}
```

---

## 🎯 도구 2: getStockQuote 📊

### 은행 전광판 보기 — 현재 시세 확인!

은행이나 증권사 로비에 가면 **전광판**이 있죠?
거기에 실시간으로 주가, 환율이 바뀌고 있어요!

```
📊 전광판:
  ┌─────────────────────────────────────┐
  │ 삼성전자(005930)                     │
  │ 현재가: 72,400원  📈 +1.2%          │
  │ 거래량: 12,345,678주                 │
  │ 시가총액: 432조원                     │
  └─────────────────────────────────────┘
```

> 🔑 종목코드(번호)를 알고 있을 때, **상세 시세**를 보는 도구!

---

## 🔗 getStockQuote이 Tool Calling에서는...

```
Claude: "005930 종목코드를 알았으니, 시세를 봐야지!"
             ↓
📊 전광판 보기: getStockQuote("005930")
             ↓
결과: {
  이름: "삼성전자", 현재가: 72,400원,
  변동: +1.2%, 거래량: 12,345,678
}
```

### 주의! 📌

입력이 **종목코드(005930)**이에요!
사용자가 "삼성전자"라고 물으면, **반드시 searchStock을 먼저** 거쳐야 해요!

---

## 💻 getStockQuote 코드 보기

```typescript
// 📖 비서의 업무 매뉴얼 — 시세 조회
{
  name: "getStockQuote",
  description:
    "종목코드로 현재 시세, 등락률, 거래량, "
    + "시가총액, PER, PBR 등 상세 정보를 조회합니다",
  input_schema: {
    type: "object",
    properties: {
      code: {
        type: "string",
        description: "종목코드 (예: 005930)",
      },
    },
    required: ["code"],
  },
}
```

---

## 🎯 도구 3: getStockNews 📰

### 비서가 신문 스크랩해 오기!

매일 아침 비서가 관련 뉴스를 **스크랩**해서 가져다 주는 모습을 상상해 보세요!

```
📰 오늘의 삼성전자 뉴스 스크랩:
  1. "삼성전자, AI반도체 투자 확대" — 한국경제
  2. "갤럭시 S26 출시 임박" — 매일경제
  3. "삼성전자 실적 전망 긍정적" — 조선비즈
  4. "반도체 수출 호조세 지속" — 뉴시스
  5. "외국인 매수세 유입" — 이데일리
```

> 🔑 종목코드를 알면, 해당 종목의 **최신 뉴스 5건**을 가져와요!

---

## 💻 getStockNews 코드 보기

```typescript
// 📖 비서의 업무 매뉴얼 — 뉴스 조회
{
  name: "getStockNews",
  description: "종목 관련 최신 뉴스를 가져옵니다",
  input_schema: {
    type: "object",
    properties: {
      code: {
        type: "string",
        description: "종목코드 (예: 005930)",
      },
    },
    required: ["code"],
  },
}
```

> 💡 설명이 간결해도 OK! Claude는 도구 이름(`getStockNews`)에서
> "아, 뉴스 가져오는 거구나"라고 이해해요.

---

## 🎯 도구 4: getMarketOverview 🌐

### 아침 뉴스 브리핑 — 오늘 시장 전체 요약!

마치 매일 아침 뉴스 앵커가 전해주는 **시장 브리핑**과 같아요!

```
🌐 오늘의 시장 브리핑:
  📈 코스피: 2,650 (+0.8%)
  📉 코스닥: 850 (-0.3%)
  🏆 시총 TOP 5 (KOSPI):
     1. 삼성전자  432조원
     2. SK하이닉스 180조원
     3. LG에너지솔루션 100조원
```

> ⭐ 이 도구는 **필요한 정보가 없어요!**
> 그냥 "시장 어때?"라고 물으면 자동으로 전체 브리핑을 해줘요!

---

## 💻 getMarketOverview 코드 보기

```typescript
// 📖 비서의 업무 매뉴얼 — 시장 현황
{
  name: "getMarketOverview",
  description:
    "코스피, 코스닥 등 전체 시장 현황(지수, 등락률)을 조회합니다",
  input_schema: {
    type: "object",
    properties: {},     // 📝 기입 항목 없음!
    required: [],       // ⭐ 필수 항목 없음!
  },
}
```

> 💡 "오늘 시장 어때?", "코스피 지수 알려줘" 같은 질문에
> Claude가 자동으로 이 도구를 선택해요!

---

## ✅ 4가지 도구 전체 정리

| 도구 🛠️ | 비유 🏢 | 입력 | 의존 관계 |
|---------|---------|------|----------|
| 🔍 `searchStock` | 전화번호부 | 종목명 | 없음 (진입점!) |
| 📊 `getStockQuote` | 전광판 | 종목코드 | 🔍 먼저! |
| 📰 `getStockNews` | 신문 스크랩 | 종목코드 | 🔍 먼저! |
| 🌐 `getMarketOverview` | 아침 브리핑 | 없음 | 없음 (독립!) |

> 💡 "삼성전자 주가와 뉴스 알려줘" 일 때:
> 🔍 searchStock → 코드 → 📊 getStockQuote + 📰 getStockNews 동시에!

---

## 퀴즈 타임! 🤔

### Q2. 사용자가 "카카오 주가 알려줘"라고 하면, 도구 호출 순서는?

A) getStockQuote("카카오") 바로 호출
B) searchStock("카카오") → getStockQuote("035720")
C) getMarketOverview() 호출
D) getStockNews("카카오") 호출

### 정답은...

**B)** 🎉 먼저 전화번호부(searchStock)에서 종목코드를 찾고,
그 다음 전광판(getStockQuote)에서 시세를 확인해요!

> 💡 getStockQuote는 **종목코드**가 필요하니까,
> searchStock이 **반드시 먼저** 실행되어야 해요!

---

## 🎯 좋은 업무 매뉴얼 vs 나쁜 업무 매뉴얼

비서가 **잘 알아듣는** 매뉴얼을 만들어야 해요!

### 나쁜 매뉴얼 ❌

```
업무명: 주식 조회
설명: "주식 정보를 가져옵니다"
```
→ 비서: "뭘 가져오라는 거지...? 시세? 뉴스? 뭘...?" 😵

### 좋은 매뉴얼 ✅

```
업무명: 시세 조회 (getStockQuote)
설명: "종목코드로 현재 시세, 등락률, 거래량,
       시가총액, PER, PBR 등 상세 정보를 조회합니다"
```
→ 비서: "아! 종목코드 주면 시세 상세 정보를 가져오면 되는구나!" 😊

---

## ✅ 좋은 도구 설명의 4가지 조건

> 📌 좋은 `description`의 체크리스트:
>
> 1. 🎯 **용도를 명확히** — "시세를 조회합니다" (뭘 하는지)
> 2. ⏰ **사용 시점 가이드** — "종목코드를 모를 때 먼저 사용하세요"
> 3. 📝 **입력 예시 포함** — "(예: 삼성전자, 현대차, 카카오)"
> 4. 📦 **반환 데이터 힌트** — "시세, 등락률, 거래량, PER, PBR"

---

## 🎯 executeTool = 비서의 업무 처리 데스크

비서가 앉아 있는 **접수 데스크**를 상상해 보세요! 🖥️

```
📋 주문서가 도착!
   업무명: "searchStock"
   입력: {query: "삼성전자"}
        ↓
🖥️ 데스크 직원이 확인:
   "searchStock이네? 종목검색부서로 연결!"
        ↓
📞 종목검색부서에 전달 → 결과 받음
        ↓
📦 결과를 포장(JSON 문자열)해서 돌려줌!
```

> 💡 모든 업무가 이 **한 곳(데스크)**을 거쳐요!

---

## 🔗 executeTool이 코드에서는...

### Dispatcher 패턴 — 교환원 역할!

```
       모든 업무가 여기로!
              ↓
      ┌── executeTool ──┐
      │                  │
      │  "searchStock"?  │ → 📞 종목검색부서
      │  "getStockQuote"?│ → 📊 시세조회부서
      │  "getStockNews"? │ → 📰 뉴스조회부서
      │  "getMarket..."? │ → 🌐 시장현황부서
      │  그 외?          │ → ❌ "그런 업무 없습니다"
      └──────────────────┘
```

> 💡 마치 **전화 교환원**처럼, 요청을 듣고 맞는 부서로 연결해 줘요!

---

## 💻 executeTool 실제 코드

```typescript
// 🖥️ 비서의 업무 처리 데스크 — 모든 요청이 여기로!
export async function executeTool(
  name: string, input: Record<string, string>
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
```

---

## ✅ executeTool 설계 원칙 정리

| 원칙 | 비유 🏢 | 이유 |
|------|---------|------|
| 📍 **단일 진입점** | 모든 민원은 1번 창구로 | 관리가 한 곳에서 됨 |
| 📦 **문자열 반환** | 보고서는 종이로 제출 | API가 문자열만 받음 |
| ❌ **Unknown 처리** | "그런 업무 없습니다" 안내 | 잘못된 요청에도 서버가 안 죽음 |
| ⏳ **비동기 처리** | "잠시만요, 확인 중..." | 외부 API 호출이라 시간이 걸림 |

> 📌 **모든 결과는 `JSON.stringify()`로 문자열 변환!**
> Claude에게 보고할 때는 **종이 보고서(문자열)**로 제출해야 해요!

---

## 🎯 HTTP 요청 = 편지 보내기 ✉️

외부 API 호출은 마치 **편지를 보내는 것**과 같아요!

```
✉️ 편지 보내기:
   📬 받는 주소 (URL):     finance.daum.net
   📝 편지 내용 (Path):    /api/quotes/A005930
   📋 봉투에 적는 정보:
      보낸 사람 (Referer): finance.daum.net
      신분증 (User-Agent): Chrome 브라우저
   ⏳ 답장 기다리기...
   📬 답장 도착! (Response):
      { 종목명: "삼성전자", 현재가: 72400, ... }
```

> 💡 편지에 **보낸 사람 주소**와 **신분증**을 적어야
> 상대방이 답장(데이터)을 보내줘요!

---

## 🔗 HTTP 클라이언트 — 2개의 우체통 📮

| 우체통 📮 | 받는 곳 | 어떤 편지? |
|----------|---------|----------|
| `fetchDaum` | 다음 금융 | 시세, 시가총액 |
| `fetchNaver` | 네이버 금융 | 뉴스, 지수 |

### 편지에 꼭 적어야 하는 3가지

| 항목 | 비유 | 왜 필요한가요? |
|------|------|-------------|
| `Referer` 📍 | "다음 금융에서 왔어요" | 출처 확인 |
| `User-Agent` 🪪 | "저 Chrome이에요" | 봇이 아님을 증명 |
| `cache: "no-store"` 🔄 | "항상 새 답장 줘" | 주가는 실시간! |

---

## 💻 fetchDaum 코드 보기

```typescript
// ✉️ 다음 금융에 편지 보내기
const DAUM_API = "https://finance.daum.net";
const DAUM_HEADERS = {
  Referer: "https://finance.daum.net/",
  "User-Agent": "Mozilla/5.0 (Macintosh...)",
};

async function fetchDaum(path: string) {
  const res = await fetch(`${DAUM_API}${path}`, {
    headers: DAUM_HEADERS,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Daum API error: ${res.status}`);
  return res.json();
}
```

---

## 🎯 전화번호부의 비밀 — 로컬 종목 매핑

비서의 책상에는 **종목 전화번호부**가 있어요! 📞

```
📞 종목 전화번호부 (MAJOR_STOCKS):
  삼성전자     → 005930 (KOSPI)
  SK하이닉스   → 000660 (KOSPI)
  현대자동차   → 005380 (KOSPI)
  현대차       → 005380 (KOSPI)  ← 별칭!
  네이버       → 035420 (KOSPI)
  NAVER       → 035420 (KOSPI)  ← 영문명!
  한국전력     → 015760 (KOSPI)
  한전         → 015760 (KOSPI)  ← 약칭!
```

> 💡 사람들이 같은 종목을 다양하게 부르니까,
> **별칭(다른 이름)**도 미리 등록해 두었어요!

---

## 🔗 종목 검색 — 부분 일치 검색

### "삼성"만 쳐도 다 나와요!

| 검색어 | 결과 🔍 |
|--------|---------|
| "삼성" | 삼성전자, 삼성SDI, 삼성바이오로직스 등 |
| "현대차" | 현대자동차 (코드: 005380, 중복 제거됨) |
| "005930" | 삼성전자 (코드로도 검색 가능!) |
| "카카오" | 카카오, 카카오뱅크, 카카오페이 등 |
| "테슬라" | ❌ 못 찾음 (해외 종목은 없어요) |

> 💡 🔤 대소문자 무시 · 📝 부분 일치 · 🚫 중복 제거 — 3가지 똑똑한 기능!

---

## 🎯 시세 조회 — 종목코드 변환 비밀

### 다음 금융의 특별한 규칙!

```
우리의 종목코드: "005930"
                  ↓
다음 금융 코드:  "A005930"  ← "A"를 앞에 붙여야 해요!
                  ↓
📬 편지 보내기: /api/quotes/A005930
                  ↓
📊 답장:
  { 종목명: "삼성전자", 현재가: 72,400,
    변동률: +1.2%, 거래량: 12,345,678 }
```

> 💡 `source` 필드를 포함해서, Claude가 "출처: 다음 금융"이라고 답변에 적을 수 있게 해요!

---

## 🎯 뉴스 조회 — 신문 스크랩의 비밀

### 네이버 금융의 뉴스 구조

```
📰 네이버 뉴스 API 응답:
  [그룹1]
    ├── 기사1: "삼성전자 AI반도체 투자" (한국경제)
    ├── 기사2: "갤럭시 S26 출시" (매일경제)
    └── 기사3: ...
  [그룹2]
    ├── 기사4: ...
    └── 기사5: ...
```

### 비서의 스크랩 방법 ✂️

- 📂 각 그룹 열기 — "기사가 있나 확인!"
- ✂️ 기사 5건만 스크랩 — "너무 많으면 사장님이 힘드시니까"
- 📋 정리해서 보고 — 제목, 요약, 날짜, 출처

---

## 🎯 시장 현황 — 멀티 소스 브리핑

### 아침 뉴스는 여러 채널에서 정보를 모아요!

```
🌐 아침 브리핑 만들기:
  📺 다음 금융 채널         📺 네이버 금융 채널
   └── 시총 TOP 5 정보       └── 코스피/코스닥 지수
        ↓                         ↓
        +────────+────────────────+
                 ↓
         🗞️ 통합 브리핑 완성!
```

> ⭐ 두 채널을 **동시에**(Promise.all) 확인해서 시간을 절약해요!
> 마치 TV 두 대를 동시에 보는 것과 같아요! 📺📺

---

## ✅ Part 2 전체 정리

> 📌 **비서의 업무 시스템 완성!**
>
> 📖 **업무 매뉴얼** = 4개 도구 정의 (`lib/tools.ts`)
> 🖥️ **업무 처리 데스크** = executeTool 디스패처
> ✉️ **편지 시스템** = fetchDaum / fetchNaver HTTP 클라이언트
> 📞 **전화번호부** = MAJOR_STOCKS 종목 매핑
>
> 이 모든 것이 `lib/tools.ts`와 `lib/daum-finance.ts`에 있어요!

---

<!-- _class: lead -->
<!-- _backgroundColor: #E8452E -->
<!-- _color: #FFF8E7 -->

# 🔄 Part 3
## 업무 지시 실전 — 오케스트레이션

---

## 🎯 오케스트레이션 = 지휘자의 역할 🎵

오케스트라에서 지휘자가 하는 일을 생각해 보세요!

```
🎵 오케스트라:
   🎻 바이올린 = searchStock
   🎺 트럼펫  = getStockQuote
   🥁 드럼    = getStockNews
   🎹 피아노  = getMarketOverview

🎵 지휘자 (route.ts):
   "자, 바이올린부터! 🎻 → 트럼펫과 드럼 동시에! 🎺🥁"
```

> 💡 **오케스트레이션** = 여러 도구를 **적절한 순서와 타이밍**으로
> 지휘하여 하나의 아름다운 답변을 만들어내는 것!

---

## 🔗 route.ts = 업무 지시 본부

### 이 파일이 모든 것을 관장해요!

```
📋 route.ts의 역할:
  1. 👤 사용자 요청 접수
  2. 🤖 Claude에게 전달 (+ 업무 매뉴얼 첨부)
  3. 📝 Claude의 주문서(tool_use) 접수
  4. 🖥️ executeTool로 업무 실행
  5. 🧾 결과(tool_result)를 Claude에게 전달
  6. 🔄 Claude가 더 필요하면 반복!
  7. ✅ 최종 답변을 사용자에게 전달
```

> 📁 파일: `app/api/chat/route.ts`

---

## 💻 Claude API 호출 — 업무 매뉴얼 전달

```typescript
// 🤖 Claude에게 업무 매뉴얼과 함께 메시지 전달!
const stream = anthropic.messages.stream({
  model: "claude-haiku-4-5-20251001",
  max_tokens: 4096,
  system: systemPrompt,
  messages: apiMessages,
  tools: toolDefinitions,  // 📖 업무 매뉴얼 4개!
});
```

| 항목 | 비유 🏢 |
|------|---------|
| `model` | 어떤 등급의 비서를 쓸까? |
| `system` | 비서의 업무 지침서 |
| `messages` | 지금까지의 대화 기록 |
| *`tools`* | *📖 업무 매뉴얼 (4개 도구 정의)* |

---

## 🎯 주문서(tool_use) 접수하기

Claude가 보내는 응답에는 **2가지**가 섞여 있어요!

```
🤖 Claude의 응답 (content 배열):
  [
    📝 "삼성전자의 주가를 확인해 보겠습니다."  (말하기)
    📋 주문서: searchStock("삼성전자")          (업무 지시)
  ]
```

### 마치 비서가 동시에 2가지를 하는 것!

> 🗣️ "사장님, 확인해 볼게요~" (말하면서)
> 📞 종목검색부서에 전화하기 (동시에 업무 시작)

---

## 🔗 tool_use 블록 수집 코드 (1/2)

```typescript
// 📋 Claude의 응답에서 주문서(tool_use)만 골라내기!
let fullText = "";
const toolUseBlocks = [];  // 📝 주문서 모음

// 🗣️ Claude가 말하는 부분 → 사용자에게 실시간 전달
stream.on("text", (text) => {
  fullText += text;
  send({ type: "text_delta", text });
});
```

> 💡 텍스트 부분은 실시간으로 사용자에게 스트리밍!

---

## 🔗 tool_use 블록 수집 코드 (2/2)

```typescript
// 📋 최종 응답에서 주문서 수집
const response = await stream.finalMessage();
for (const block of response.content) {
  if (block.type === "tool_use") {     // 주문서 발견!
    toolUseBlocks.push({
      id: block.id,        // 🏷️ 주문번호
      name: block.name,    // 📋 업무명
      input: block.input,  // 📝 필요 정보
    });
  }
}
```

> 💡 `tool_use` 타입의 블록만 골라서 주문서 배열에 모아요!

---

## 🎯 tool_use_id = 진동벨 번호 📟

카페에서 음료를 주문하면 **진동벨**을 받죠?

```
📟 카페 주문 시스템:
  주문: "아이스 아메리카노"
  진동벨 번호: #073
       ↓
  (바리스타가 만드는 중...)
       ↓
  "📟 073번 고객님~ 음료 나왔습니다!"
  → 번호로 내 음료를 정확히 찾음!
```

> 💡 Tool Calling에서도 **주문번호(tool_use_id)**로 1:1 매칭!
> `toolu_01ABC` ← 주문서와 영수증이 같은 번호!

---

## 🔗 주문서와 영수증의 매칭 규칙

```
📝 Claude가 보내는 주문서:          🧾 서버가 보내는 영수증:
┌─────────────────────┐        ┌─────────────────────┐
│ type: "tool_use"    │        │ type: "tool_result"  │
│ id: "toolu_01ABC"  ─┼────────┼─ tool_use_id         │
│ name: "searchStock" │        │ content: "결과..."    │
│ input: {query:...}  │        │                      │
└─────────────────────┘        └─────────────────────┘
```

- 🏷️ 모든 주문서에는 **고유 번호**(id)가 자동 부여
- 🔗 모든 영수증에는 **대응하는 번호**(tool_use_id)가 필수
- 1️⃣ **1:1 매칭**이 보장되어야 API가 정상 작동
- 🔀 **순서와 무관** — 번호로 찾으니까!

---

## 🎯 업무 실행과 결과 보고

비서가 주문서를 받으면, **실행하고 결과를 보고**해요!

```
📋 주문서 도착: searchStock("삼성전자")
     ↓
🖥️ executeTool 데스크:
     "searchStock이군! 종목검색부서에 연락!"
     ↓
📞 종목검색부서: "코드는 005930이에요!"
     ↓
📦 결과를 JSON 문자열로 포장
     ↓
🧾 영수증 발행: 주문번호 + 결과
```

---

## 💻 도구 실행 코드

```typescript
// 📋 모든 주문서를 처리하고 영수증 발행!
const toolResults = [];

for (const tool of toolUseBlocks) {
  let result;
  try {
    result = await executeTool(tool.name, tool.input);
  } catch (e) {
    result = JSON.stringify({ error: e.message });
  }
  // 🧾 영수증 발행 — 주문번호로 매칭!
  toolResults.push({
    type: "tool_result",
    tool_use_id: tool.id,     // 🏷️ 같은 주문번호!
    content: result,           // 📦 실행 결과
  });
}
```

---

## 🎯 결과를 Claude에게 돌려주기

비서가 결과를 보고하면, **다시 Claude에게 알려줘야** 해요!

```
📋 대화 기록에 추가:
  [대화 1] 👤 사용자: "삼성전자 주가 알려줘"
  [대화 2] 🤖 Claude: "확인해 볼게요" + 📝 주문서
  [대화 3] 👤 (도구 결과): 🧾 영수증
           ↑ 이것을 사용자(user) 메시지로 추가!
  [대화 4] 🤖 Claude: (결과를 보고 다음 행동 결정...)
```

> ⭐ 영수증(tool_result)은 반드시 **`role: "user"` 메시지**로 전달!
> Claude 입장에서 도구 결과는 **"사용자로부터 받은 정보"**예요!

---

## 💻 tool_result 주입 코드

```typescript
// 1️⃣ Claude의 응답을 대화 기록에 추가
apiMessages.push({
  role: "assistant",
  content: response.content,  // 텍스트 + 주문서 전체!
});
// 2️⃣ 업무 결과를 대화 기록에 추가
apiMessages.push({
  role: "user",               // 👤 사용자 역할로!
  content: toolResults,       // 🧾 영수증 배열
});
// 3️⃣ 다음 루프에서 Claude API 다시 호출!
```

> 💡 이 과정이 **while 루프** 안에서 반복돼요!
> Claude가 "더 할 일 없어요"라고 할 때까지!

---

## 퀴즈 타임! 🤔

### Q3. tool_result를 어떤 role로 보내야 할까요?

A) `role: "assistant"` — Claude가 보내는 거니까
B) `role: "user"` — 사용자 역할로 보내기
C) `role: "tool"` — 도구 역할로 보내기
D) `role: "system"` — 시스템 메시지로 보내기

### 정답은...

**B)** 🎉 `role: "user"`로 보내야 해요!
Claude 입장에서 도구 결과는 "사용자로부터 받은 정보"입니다.

> ⚠️ 이것은 가장 흔한 실수 중 하나예요! 기억해 두세요!

---

## 🎯 대화 메시지 구조 시각화

"삼성전자 주가 알려줘" 전체 대화 흐름을 볼까요? 📋

```
대화 기록 (apiMessages):
  [1] 👤 user:      "삼성전자 주가 알려줘"
  [2] 🤖 assistant: "확인해 볼게요~"
                     + 📝 searchStock("삼성전자")
  [3] 👤 user:      🧾 "005930 찾았습니다"
  [4] 🤖 assistant: 📝 getStockQuote("005930")
  [5] 👤 user:      🧾 "72,400원, +1.2%"
  [6] 🤖 assistant: "삼성전자 현재가 72,400원, +1.2%!" ✅
```

> 💡 user와 assistant가 **번갈아** 나타나요!
> 도구 결과도 user 메시지에 들어가는 것을 확인하세요!

---

## 🎯 병렬 호출 = 비서 여러 명에게 동시에!

### 한 명의 비서에게 여러 가지를 동시에 시킬 수 있어요!

```
👤 "삼성전자 주가와 뉴스 알려줘"

🤖 Claude (코드를 이미 알고 있을 때):
   📝 주문서 1: getStockQuote("005930")
   📝 주문서 2: getStockNews("005930")
   (두 주문서를 한 번에 보냄!)
```

> 🏃 비서 A에게: "삼성전자 시세 알려줘!"
> 🏃 비서 B에게: "삼성전자 뉴스 스크랩해줘!"
> → 두 비서가 **동시에** 일하니까 ⏱️ 시간 절약!

---

## 🔗 병렬 호출의 메시지 구조

```
📝 Claude의 응답 (주문서 2개 한번에!):
  ┌──────────────────────────────────┐
  │ 🤖 assistant:                    │
  │  📝 getStockQuote("005930")     │
  │  📝 getStockNews("005930")      │
  └──────────────────────────────────┘
               ↓ 실행 후
🧾 영수증 2개를 한번에 돌려줌:
  ┌──────────────────────────────────┐
  │ 👤 user:                         │
  │  🧾 시세 결과 (주문번호 #01)     │
  │  🧾 뉴스 결과 (주문번호 #02)     │
  └──────────────────────────────────┘
```

> 💡 `tool_use_id`로 1:1 매칭되므로 **순서와 무관**하게 정확히 매칭!

---

## 🎯 stop_reason = 비서의 보고 유형

비서가 일을 마치면 2가지 중 하나를 말해요!

- 🔄 **"아직 더 할 일이 있어요!"** (stop_reason = `"tool_use"`)
  → 도구를 더 호출해야 해요! 루프 계속!
- ✅ **"다 했습니다, 사장님!"** (stop_reason = `"end_turn"`)
  → 최종 답변 완성! 루프 종료!

```
while (계속 일하나?) {
  🤖 Claude에게 물어보기
       ↓
  📝 주문서 있으면? → 🖥️ 실행하고 돌아가기 🔄
  📝 주문서 없으면? → ✅ 최종 답변! break!
}
```

---

## 💻 종료 조건 코드

```typescript
// ✅ 일이 끝났는지 확인!
if (
  toolUseBlocks.length === 0 ||
  response.stop_reason === "end_turn"
) {
  send({ type: "done", text: fullText });
  break;    // 🛑 루프 종료!
}
```

| stop_reason | 비유 🏢 | 의미 |
|-------------|---------|------|
| `"end_turn"` | ✅ "보고 완료!" | 최종 답변, 루프 종료 |
| `"tool_use"` | 📝 "업무 지시서 있음" | 도구 실행 필요, 루프 계속 |
| `"max_tokens"` | ⚠️ "보고서 칸 부족" | 응답이 잘림 (비정상) |

---

## 🎯 maxTurns = 안전장치 🛡️

### 비서가 영원히 일하면 안 돼요!

```
😱 위험한 시나리오:
  Claude: searchStock("삼전") → 결과 없음
  Claude: searchStock("삼성전자주식") → 결과 없음
  Claude: searchStock("Samsung") → 결과 없음
  ... (영원히 반복! 💸 비용 폭탄!)
```

### 안전장치 설치! 🛡️

```typescript
let turnCount = 0;
const maxTurns = 10;  // 🛡️ 최대 10번까지만!
while (turnCount < maxTurns) { turnCount++; }
```

> 💡 마치 "업무 시간 제한: 10번 시도 후 자동 종료!"

---

## 🎯 에러 처리 = 택배 분실 시 대응! 📦❌

택배가 분실되면 어떻게 하나요?

```
📦 택배 배송 추적:
  ✅ 정상: 택배 도착! → 사장님께 전달
  ❌ 분실 시:
     [1단계] 📬 배송사에서 확인 → "배송 실패입니다"
     [2단계] 📋 비서가 정리 → "택배 분실, 재배송 요청 가능"
     [3단계] 🗣️ 사장님께 보고 → "죄송합니다, 현재 배송에..."
```

| 단계 | 위치 | 비유 |
|------|------|------|
| 1️⃣ HTTP 에러 | fetchDaum / fetchNaver | 배송사 오류 |
| 2️⃣ 도구 에러 | 각 도구 함수 try/catch | 비서가 정리 |
| 3️⃣ 라우트 에러 | route.ts 최외곽 try/catch | 사장님께 보고 |

---

## 🔗 에러도 Claude에게 전달해요!

### 왜 에러를 숨기지 않나요?

```
📦 시세 조회 실패:
  1. getStockQuote("005930") → 💥 HTTP 500 에러!
  2. result = { success: false, error: "시세 조회 실패" }
  3. 🧾 영수증으로 Claude에게 전달 (에러 내용 포함!)
  4. 🤖 Claude: "죄송합니다. 현재 시세 정보를 가져오는 데
                 일시적인 문제가 있습니다." 😊
```

- ⚠️ 에러를 무시하면 Claude가 혼란스러워해요
- 🤖 **에러도 정보!** Claude가 적절히 안내할 수 있게 해주세요!

---

## ✅ 에러 처리 정리

> 📌 **에러 처리 = 택배 분실 시 대응!**
>
> 1. 📬 배송사 오류 (HTTP 에러) → throw Error
> 2. 📋 비서가 정리 (도구 에러) → `{success: false, error: "..."}`
> 3. 🗣️ 사장님께 보고 (라우트 에러) → 사용자에게 안내 메시지
>
> **핵심:** 에러가 나도 서버가 죽지 않고, Claude가 사용자에게 친절하게 안내!

---

## 💻 에이전트 루프 — 전체 흐름도

```
🔄 에이전트 루프 (while):
  ┌──→ 🤖 Claude API 호출 (메시지 + 업무 매뉴얼)
  │              ↓
  │     🗣️ 텍스트 → 사용자에게 실시간 전달
  │     📝 주문서(tool_use) 수집
  │              ↓
  │     📝 주문서가 있나요?
  │      ╱          ╲
  │    Yes            No → ✅ break
  │    ╱
  │  🖥️ executeTool → 🧾 영수증
  │   ↓
  └──┘ (최대 10턴!)
```

---

## 🎯 토큰 비용 = 택시 미터기 💰

매 턴마다 비용이 **누적적으로 증가**해요!

```
🚕 택시 미터기 비유:
  Turn 1: 📋 대화 1통 → 💰 기본요금
  Turn 2: 📋 대화 2통 → 💰 기본요금 + 추가
  Turn 3: 📋 대화 3통 → 💰 기본요금 + 추가 + 추가
  → 턴이 늘수록 📋 대화가 길어져서 💰 비용 증가!
```

### 실제 비용 추적

```typescript
// 💰 비용 계산 (Claude Haiku 4.5)
// 입력: $1.00/100만 토큰, 출력: $5.00/100만 토큰
// 결과 예시: "입력 3,245토큰 + 출력 1,891토큰 = 18.49원"
```

> 💡 그래서 **maxTurns 안전장치**가 중요한 거예요!

---

## 퀴즈 타임! 🤔

### Q4. 에이전트 루프가 끝나는 조건 2가지는?

A) Claude가 에러를 반환하면 / 시간이 너무 오래 걸리면
B) 주문서(tool_use)가 없으면 / Claude가 end_turn을 보내면
C) 사용자가 취소하면 / 서버가 재시작하면
D) 10번 반복하면 / 메모리가 부족하면

### 정답은...

**B)** 🎉
1. 📝 주문서가 없으면 (= 더 할 일이 없음)
2. ✅ Claude가 `end_turn`을 보내면 (= "다 했어요!")

> 💡 D)의 10번 반복도 **안전장치**로 루프를 종료해요! (maxTurns)

---

## ✅ Part 3 전체 정리

> 📌 **오케스트레이션 = 지휘자가 오케스트라를 이끌듯!**
>
> 1. 🤖 Claude에게 **업무 매뉴얼(tools)**과 함께 질문 전달
> 2. 📝 Claude가 **주문서(tool_use)**를 보내면 실행
> 3. 🧾 **영수증(tool_result)**을 Claude에게 돌려줌
> 4. 🔄 "더 할 일 있어요!" → 반복 / "다 했어요!" → 종료
> 5. 🛡️ **maxTurns(10턴)** 안전장치로 무한 루프 방지!

---

<!-- _class: lead -->
<!-- _backgroundColor: #E8452E -->
<!-- _color: #FFF8E7 -->

# 🎉 Part 4
## 종합 실습 — 전체 흐름 따라가기!

---

## 🎯 End-to-End: "삼성전자 주가 알려줘"

### 📖 지금부터 처음부터 끝까지 따라갈 거예요!

이것은 마치 **한 편의 드라마**와 같습니다! 🎬

```
🎬 등장인물:
  👤 사용자 (사장님)
  🤖 Claude (AI 비서)
  🔍 searchStock (전화번호부 담당자)
  📊 getStockQuote (전광판 담당자)
  🖥️ route.ts (업무 지시 본부)
```

자, 시작합니다! 🎬 Action!

---

## 📖 Act 1: 사장님의 요청 (Turn 1 시작)

```
👤 사장님: "삼성전자 주가 알려줘"
     ↓
🖥️ 본부: "사장님 요청 접수! Claude에게 전달하겠습니다"
     ↓
🤖 Claude: (📖 업무 매뉴얼을 확인합니다...)
           "삼성전자... 종목코드를 모르겠네.
            🔍 전화번호부부터 찾아보자!"
     ↓
📝 주문서: searchStock({query: "삼성전자"})
🤖 stop_reason: "tool_use" ← "아직 할 일이 있어요!"
```

---

## 📖 Act 2: 전화번호부 조회 (Turn 1 완료)

```
🖥️ 본부: "주문서 접수! executeTool 데스크로!"
     ↓
🖥️ executeTool: "searchStock이군! 종목검색부서로!"
     ↓
🔍 searchStock("삼성전자"):
     📞 전화번호부 검색...
     "삼성전자" → 005930 (KOSPI) ✅
     ↓
🧾 영수증 발행:
   결과: '{"success":true,"results":[
     {"name":"삼성전자","code":"005930","market":"KOSPI"}
   ]}'
     ↓
🖥️ 본부: "결과를 Claude에게 전달합니다!"
```

---

## 📖 Act 3: 시세 조회 지시 (Turn 2)

```
🤖 Claude: (🧾 영수증을 읽습니다...)
           "좋아! 종목코드 005930을 찾았어!
            이제 시세를 알아봐야지!"
     ↓
📝 주문서: getStockQuote({code: "005930"})
🤖 stop_reason: "tool_use"
     ↓
🖥️ 본부: "또 주문서가! executeTool 데스크로!"
     ↓
📊 getStockQuote("005930"):
     ✉️ 다음 금융에 편지: /api/quotes/A005930
     📬 답장: {현재가: 72400, 변동률: +1.2%}
```

---

## 📖 Act 4: 최종 보고! (Turn 3 = 마지막)

```
🤖 Claude: (🧾 시세 영수증을 읽습니다...)
     ↓
🤖 최종 답변:
   "삼성전자(005930) 현재 주가는 72,400원이며,
    전일 대비 +1.2% 상승했습니다.
    📊 거래량: 12,345,678주 / 시가총액: 432조원
    ※ 다음 금융 데이터를 활용하였습니다."

🤖 stop_reason: "end_turn" ← "✅ 다 했습니다!"
👤 사장님: "고마워요~" 😊
```

---

## 📖 전체 드라마 요약 — 3턴 완성!

```
Turn 1: 👤 → 🤖 → 🔍 searchStock("삼성전자") → 005930
Turn 2: 🤖 → 📊 getStockQuote("005930") → 72,400원
Turn 3: 🤖 → ✅ "삼성전자 현재가 72,400원, +1.2% 상승!"
```

| 단계 | 누가 | 무엇을 | 비유 |
|------|------|--------|------|
| 1 | 👤 사용자 | 질문 | 사장님이 지시 |
| 2 | 🤖 Claude | searchStock 지시 | 전화번호부 찾기 |
| 3 | 🔍 도구 | 종목코드 반환 | 전화번호 알려주기 |
| 4 | 🤖 Claude | getStockQuote 지시 | 전광판 보기 |
| 5 | 📊 도구 | 시세 반환 | 현재 주가 알려주기 |

---

## 📖 다른 시나리오: "오늘 시장 어때?"

```
Turn 1:
  👤 "오늘 시장 어때?"
  🤖 Claude: "시장 전체 현황이군! getMarketOverview!"
     📝 getMarketOverview({})  ← 입력 없이 바로!
  🌐 결과: 코스피 2,650(+0.8%), 코스닥 850(-0.3%)

Turn 2:
  🤖 Claude: "오늘 시장 현황입니다!
    코스피 2,650포인트(+0.8%), 코스닥 850포인트(-0.3%)"
  ✅ stop_reason: "end_turn" → 2턴 만에 완료!
```

> 💡 `getMarketOverview`는 파라미터가 없으니까,
> `searchStock` 없이 **바로** 호출 가능! 더 빨라요! 🚀

---

## 🎯 도구 체이닝 패턴 3가지

### 1️⃣ 순차 체이닝 (가장 흔함)

```
🔍 searchStock → 📊 getStockQuote
    (이름 찾기 → 시세 보기)
```

### 2️⃣ 병렬 체이닝 (Claude가 판단!)

```
🔍 searchStock → 📊 getStockQuote + 📰 getStockNews
    (이름 찾기 → 시세 + 뉴스 동시에!)
```

### 3️⃣ 독립 호출 (체이닝 없음)

```
🌐 getMarketOverview (단독으로 바로!)
```

---

## 🎯 시스템 프롬프트와 도구의 팀워크

### 지침서와 매뉴얼이 서로 강화해요!

```
📋 업무 지침서 (system prompt):
   "종목명으로 질문하면 반드시 searchStock 도구로
    먼저 종목코드를 검색하세요"
        +
📖 업무 매뉴얼 (tool description):
   "종목코드를 모를 때 먼저 이 도구를 사용하세요"
        =
🤖 Claude가 확실히:
   searchStock → getStockQuote 순서를 지킴! ✅
```

> 💡 **지침서 + 매뉴얼** = 완벽한 업무 가이드!
> 두 곳에서 같은 규칙을 강조하면 Claude가 더 정확하게 따라요!

---

## 🎯 보안 = 비서실 출입 통제 🔒

### 화이트리스트 — 허가된 업무만!

```
🔒 비서실 출입 통제:
  ✅ "searchStock" → 입장 허가! 📞
  ✅ "getStockQuote" → 입장 허가! 📊
  ✅ "getStockNews" → 입장 허가! 📰
  ✅ "getMarketOverview" → 입장 허가! 🌐
  ❌ "deleteDatabase" → ⛔ 출입 금지!
  ❌ "hackSystem" → ⛔ 출입 금지!
```

> 💡 switch/case의 `default`가 **출입 통제 역할**!
> 등록되지 않은 도구는 **절대 실행되지 않아요!**

---

## ✅ 보안 체크리스트

| 항목 | 비유 🏢 | 구현 |
|------|---------|------|
| 🔒 도구 화이트리스트 | 출입 허가증 | switch/case + default |
| 🛡️ 무한 루프 방지 | 업무 시간 제한 | maxTurns = 10 |
| 🔑 API 키 보호 | 금고 비밀번호 | 서버에만 저장 (환경 변수) |
| 🛡️ 입력 검증 | 서류 심사 | 각 도구 try/catch |

---

## 📋 파일별 역할 총정리

| 파일 📁 | 역할 🏢 |
|---------|---------|
| `lib/tools.ts` | 📖 비서의 업무 목록과 접수 창구 |
| `lib/daum-finance.ts` | 📞 각 부서 (검색, 시세, 뉴스, 시장) |
| `app/api/chat/route.ts` | 🎵 지휘자 (오케스트레이션) |

```
👤 사용자 → 🖥️ route.ts (본부)
                ↓
            🤖 Claude + 📖 tools.ts (매뉴얼)
                ↓
            📞 daum-finance.ts (실행)
                ↓
            🤖 Claude (결과 해석) → 👤 사용자에게 답변!
```

---

## 🎯 자주 하는 실수 TOP 5 ⚠️

### 실수 1: 영수증을 잘못 된 사람에게 보내기

```
❌ WRONG: role: "assistant"에 tool_result 넣기
✅ CORRECT: role: "user"에 tool_result 넣기!
```

### 실수 2: 진동벨 번호 빠뜨리기

```
❌ WRONG: { type: "tool_result", content: "..." }
✅ CORRECT: { ..., tool_use_id: "toolu_01", content: "..." }
```

### 실수 3: 주문서를 기록하지 않기

```
❌ WRONG: assistant 메시지에 텍스트만 저장
✅ CORRECT: response.content 전체 저장 (텍스트 + 주문서)
```

---

## ⚠️ 자주 하는 실수 TOP 5 (계속)

### 실수 4: 결과를 종이가 아닌 것으로 제출

```
❌ WRONG: return { success: true, data: {...} }
✅ CORRECT: return JSON.stringify({ success: true, data: {...} })
```
→ 보고서는 반드시 **종이(문자열)**로!

### 실수 5: 업무 시간 제한 누락

```
❌ WRONG: while (true) { ... }
✅ CORRECT: while (turnCount < 10) { ... }
```
→ 10번까지만! 무한 루프 방지!

---

## 퀴즈 타임! 🤔

### Q5. 다음 중 올바른 코드는?

**A)**
```typescript
apiMessages.push({ role: "assistant", content: toolResults });
```

**B)**
```typescript
apiMessages.push({ role: "user", content: toolResults });
```

**C)**
```typescript
apiMessages.push({ role: "tool", content: toolResults });
```

### 정답은...

**B)** 🎉 tool_result는 **항상 `role: "user"`** 메시지로 전달!

---

## 🔑 핵심 코드 3줄 요약

### Tool Calling의 전부를 3줄로!

```typescript
// 1️⃣ 업무 매뉴얼 전달: "비서야, 이런 일을 할 수 있어"
tools: toolDefinitions

// 2️⃣ 업무 실행: "주문서대로 실행!"
const result = await executeTool(tool.name, tool.input);

// 3️⃣ 결과 보고: "영수증 여기 있습니다"
apiMessages.push({
  role: "user",
  content: [{ type: "tool_result", tool_use_id: tool.id, content: result }]
});
```

> 📌 **이 3가지가 Tool Calling의 전부입니다.**
> 📖 도구를 정의하고, 🖥️ 실행하고, 🧾 결과를 돌려준다. 그게 전부예요!

---

## 🎯 Tool Calling 5단계 패턴 — 최종 정리

```
📖 1. Define (정의)   → 업무 매뉴얼 작성
                         lib/tools.ts
📋 2. Invoke (호출)   → 매뉴얼과 함께 Claude에게 전달
                         app/api/chat/route.ts
📝 3. Parse (파싱)    → Claude의 주문서(tool_use) 수집
                         app/api/chat/route.ts
🖥️ 4. Execute (실행) → 비서 데스크에서 업무 처리
                         lib/tools.ts → lib/daum-finance.ts
🧾 5. Inject (주입)   → 영수증을 Claude에게 전달
                         app/api/chat/route.ts
```

---

## 🎉 오늘의 비유 총정리 (1/2)

| 기술 용어 | 비유 🏢 |
|-----------|---------|
| Tool Calling | 📋 비서에게 업무 지시하기 |
| Tool Definition | 📖 업무 매뉴얼 |
| JSON Schema | 📦 택배 송장 양식 |
| executeTool | 🖥️ 비서의 업무 처리 데스크 |
| searchStock | 📞 전화번호부에서 이름으로 번호 찾기 |

---

## 🎉 오늘의 비유 총정리 (2/2)

| 기술 용어 | 비유 🏢 |
|-----------|---------|
| getStockQuote | 📊 은행 전광판 보기 |
| getStockNews | 📰 비서가 신문 스크랩해 오기 |
| getMarketOverview | 🌐 아침 뉴스 브리핑 |
| tool_use / tool_result | 📝 주문서 ↔ 🧾 영수증 |
| HTTP 요청 | ✉️ 편지 보내기 |
| 에러 처리 | 📦❌ 택배 분실 시 대응 |
| 병렬 호출 | 🏃🏃 비서 여러 명에게 동시에! |

---

## 🎉 여러분은 이제 Tool Calling 전문가!

### 오늘 배운 것

1. ✅ Tool Calling = **비서에게 업무 지시하기!**
2. ✅ 도구 정의 = **업무 매뉴얼 작성!**
3. ✅ JSON Schema = **택배 송장 양식!**
4. ✅ executeTool = **업무 처리 데스크!**
5. ✅ 오케스트레이션 = **지휘자의 역할!**

> 💪 이미 여러분은 회사에서 비서에게 업무를 지시하는 것처럼,
> AI에게 도구를 사용하도록 지시하는 방법을 완벽히 이해했습니다!

---

## 📚 참고 자료

### Anthropic 공식 문서

- Tool Use 가이드: docs.anthropic.com/en/docs/build-with-claude/tool-use
- API Reference: docs.anthropic.com/en/api/messages
- TypeScript SDK: github.com/anthropics/anthropic-sdk-typescript

### 이 프로젝트의 소스 코드

| 파일 | 내용 |
|------|------|
| `lib/tools.ts` | 📖 업무 매뉴얼 + 🖥️ 접수 데스크 |
| `lib/daum-finance.ts` | ✉️ 편지 시스템 + 📞 4개 부서 |
| `app/api/chat/route.ts` | 🎵 지휘자 (오케스트레이션) |

---

<!-- _class: lead -->
<!-- _backgroundColor: #2D2926 -->
<!-- _color: #FFF8E7 -->

# 🙋 Q&A

## 궁금한 점이 있으신가요?

<br>

비서에게 업무를 지시하듯이, 편하게 질문해주세요! 😊

**주식내비 키우Me** 프로젝트
Tool Calling (도구 호출) 실전 강의
xStudio Hackathon Lecture Series #4
