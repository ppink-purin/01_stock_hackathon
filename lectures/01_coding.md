---
marp: true
theme: default
paginate: true
size: 16:9
style: |
  @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');
  section {
    font-family: 'Comic Neue', 'Apple SD Gothic Neo', 'Malgun Gothic', cursive, sans-serif;
    background: #FFF8E7;
    color: #222;
    font-size: 28px;
  }
  h1 { color: #E8452E; border-bottom: 3px solid #FFDD44; padding-bottom: 8px; font-size: 1.6em; }
  h2 { color: #222; font-size: 1.25em; }
  h3 { color: #C93A25; font-size: 1.05em; }
  code { background: #FFF3CD; border: 1px solid #F0C040; border-radius: 4px; padding: 2px 6px; font-size: 0.82em; }
  pre { background: #1e1e1e !important; border-radius: 12px; border: 2.5px solid #222; box-shadow: 3px 3px 0 #E8D5A3; }
  pre code { background: transparent; border: none; color: #d4d4d4; font-size: 0.78em; }
  a { color: #E8452E; text-decoration: underline; }
  table { font-size: 0.82em; border-collapse: collapse; }
  th { background: #FFDD44; border: 2px solid #222; padding: 6px 10px; }
  td { border: 2px solid #E8D5A3; padding: 6px 10px; }
  blockquote { border-left: 4px solid #E8452E; background: #FFFDF5; padding: 8px 16px; font-size: 0.92em; border-radius: 0 8px 8px 0; }
  section.lead { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; background: #E8452E; color: #FFF8E7; }
  section.lead h1 { color: #FFDD44; border-bottom: 3px solid #FFF8E7; font-size: 2em; }
  section.lead h2 { color: #FFF8E7; font-size: 1.3em; }
  section.lead h3 { color: #FFDD44; font-size: 1.1em; }
  section.lead blockquote { border-left-color: #FFDD44; background: rgba(255,255,255,0.12); color: #FFF8E7; }
  .columns { display: flex; gap: 24px; }
  .columns > * { flex: 1; }
  footer { color: #A0906B; font-size: 0.55em; }
  strong { color: #C93A25; }
  em { color: #8B7355; }
footer: "주식내비 키우Me -- 웹 코딩 기초 강의 | 2026"
---

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _footer: "" -->

# 🏠 웹 코딩 기초
## 코딩을 처음 만나는 여러분을 위한 안내서

Next.js · React · TypeScript · Tailwind CSS

<br>

> 🐶 프로젝트 **주식내비 키우Me** 코드를 함께 읽어봐요!

---

<!-- _class: lead -->
<!-- _paginate: false -->

# 잠깐! 걱정 마세요 😊

### 코딩을 한 번도 안 해봐도 괜찮습니다
### 오늘은 **비유**와 **그림**으로 이해하는 시간이에요

<br>

> 🎯 목표: "아, 이 코드가 이런 뜻이구나!" 라는 느낌만 잡으면 성공!

---

# 📋 오늘의 여정

| 순서 | 주제 | 일상 비유 |
|:---:|:---|:---|
| 1 | **프로젝트 소개** | 🏠 우리가 만들 집 구경하기 |
| 2 | **HTML / CSS / JS** | 🏗️ 집의 뼈대, 인테리어, 가전제품 |
| 3 | **컴포넌트 (React)** | 🧱 레고 블록 조립하기 |
| 4 | **Next.js 라우팅** | 🏢 건물 층별 안내도 |
| 5 | **서버 vs 클라이언트** | 🍳 주방 vs 식당 홀 |
| 6 | **TypeScript** | 📦 택배 송장 양식 |
| 7 | **Tailwind CSS** | 👕 옷 코디 스티커 |
| 8 | **State & Props** | 📺 전광판 & 설명서 |
| 9 | **SSE 스트리밍** | 📡 실시간 방송 |
| 10 | **환경 변수** | 🔐 금고 비밀번호 |

---

<!-- _class: lead -->

# 섹션 1
## 🏠 우리가 만들 집 구경하기
### 프로젝트 소개

---

# 🐶 주식내비 키우Me — 이런 앱이에요!

### 여러분이 만들 AI 주식 상담 챗봇

- 📈 **실시간 주가 조회** — "삼성전자 주가 얼마야?"
- 📰 **뉴스 검색** — "카카오 무슨 일 있어?"
- 🤖 **AI 상담** — 초보자에게 친절한 설명
- 💬 **실시간 대화** — AI가 글자 하나하나 타이핑하듯 답변

<br>

> 💡 마치 **카카오톡에서 주식 전문가와 대화**하는 느낌이에요!

---

# 🧰 우리 프로젝트의 도구 상자

| 도구 | 역할 | 일상 비유 |
|:---|:---|:---|
| **Next.js** | 웹사이트 뼈대 만들기 | 🏗️ 건설 회사 (설계+시공) |
| **React** | 화면 블록 조립하기 | 🧱 레고 조립 시스템 |
| **TypeScript** | 실수 방지 검사기 | 📋 택배 송장 양식 체크 |
| **Tailwind CSS** | 예쁘게 꾸미기 | 👕 옷 코디 스티커 |
| **Claude AI** | 똑똑한 AI 두뇌 | 🧠 주식 전문가 |

<br>

> 🎯 이 도구들이 어떻게 함께 동작하는지, 오늘 하나씩 알아볼 거예요!

---

# 이미 여러분은 알고 있어요! 🎉

### 웹사이트를 매일 사용하고 있잖아요

- 🛒 **쿠팡**에서 장보기 = 웹 앱 사용
- 💬 **카카오톡 웹**으로 채팅 = 실시간 통신
- 🔍 **네이버 검색** = 서버에 요청 보내기
- 📱 **인스타그램 스크롤** = 데이터 스트리밍

<br>

> 오늘은 이런 것들이 **어떻게 만들어지는지** 살짝 들여다볼 거예요!
> 마치 **자동차 보닛을 열어보는 것**처럼요 🚗

---

<!-- _class: lead -->

# 섹션 2
## 🏗️ 집의 뼈대, 인테리어, 가전제품
### HTML, CSS, JavaScript

---

# 🎯 비유: 웹사이트는 집이에요! 🏠

```
🏗️ HTML (뼈대)          🎨 CSS (인테리어)        ⚡ JavaScript (가전제품)
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│              │      │  🖼️ 벽지      │      │  💡 조명 스위치 │
│  벽, 기둥     │      │  🪑 가구 배치  │      │  📺 TV 리모컨  │
│  방, 문, 창문  │      │  🎨 페인트 색상 │      │  🔔 초인종     │
│  계단         │      │  💡 조명 위치  │      │  🌡️ 에어컨 제어 │
│              │      │              │      │              │
│  구조를 만든다  │      │  예쁘게 꾸민다  │      │  동작하게 한다  │
└──────────────┘      └──────────────┘      └──────────────┘
```

> 집에 **뼈대만** 있으면? → 콘크리트 벽만 보여요 😢
> **인테리어**를 하면? → 예쁘지만 버튼을 눌러도 아무 일도 안 일어나요
> **가전제품**까지 있으면? → 버튼 누르면 불 켜지고, TV가 나와요! 🎉

---

# 🔗 이것이 코딩에서는...

### HTML = 구조 (이것은 제목, 이것은 버튼, 이것은 입력칸)
### CSS = 스타일 (빨간색, 둥근 모서리, 가운데 정렬)
### JavaScript = 동작 (클릭하면 메시지 보내기, 데이터 불러오기)

<br>

```
🏗️ HTML                    🎨 CSS                    ⚡ JavaScript
"여기에 버튼 하나!"          "버튼을 빨갛게!"           "버튼 누르면 AI에게 질문!"
"여기에 입력칸!"            "입력칸을 둥글게!"          "엔터 치면 전송!"
"여기에 말풍선!"            "말풍선을 노랗게!"          "답변이 오면 표시!"
```

---

# 💻 우리 프로젝트에서 보면...

```tsx
// 🏗️ HTML 구조 — 버튼 하나를 만든다
<button>삼성전자 주가 알려줘</button>

// 🎨 CSS 스타일 — 예쁘게 꾸민다
<button className="rounded-full bg-[#FFDD44] border-2 font-bold">
  삼성전자 주가 알려줘
</button>

// ⚡ JavaScript 동작 — 클릭하면 일이 일어난다!
<button onClick={() => sendMessage("삼성전자 주가 알려줘")}>
  삼성전자 주가 알려줘
</button>
```

> 💡 React에서는 HTML + CSS + JS를 **한 파일에** 같이 쓸 수 있어요!

---

# ✅ 정리: HTML / CSS / JS

| | 비유 | 역할 | 한 줄 요약 |
|:---:|:---:|:---|:---|
| 🏗️ | 집의 **뼈대** | HTML | "여기에 뭐가 있다" (구조) |
| 🎨 | 집의 **인테리어** | CSS | "이렇게 생겼다" (스타일) |
| ⚡ | 집의 **가전제품** | JS | "이렇게 동작한다" (기능) |

<br>

> 🎯 **웹사이트 = HTML(뼈대) + CSS(인테리어) + JS(가전제품)**

---

<!-- _class: lead -->

# 섹션 3
## 🧱 레고 블록 조립하기
### React 컴포넌트

---

# 🎯 비유: 레고 블록으로 집 짓기 🧱

```
레고 블록 하나하나 = 컴포넌트

🧱 지붕 블록
🧱 창문 블록      →  조립하면  →   🏠 완성된 집!
🧱 문 블록
🧱 벽 블록

똑같은 🧱 창문 블록을 여러 개 써도 OK!
다른 집을 만들 때도 같은 블록을 재사용!
```

<br>

> 💡 **컴포넌트** = 재사용 가능한 UI 레고 블록
> 한 번 만들면 **어디서든** 조립해서 사용할 수 있어요!

---

# 🔗 우리 프로젝트의 레고 블록들

```
          🏠 전체 앱 (Chat)
         ┌─────────────────────┐
         │   🧱 헤더 (타이틀바)  │
         │                     │
         │   🧱 메시지 목록      │  ← 이 안에 여러 🧱 말풍선이!
         │     🧱 말풍선 1       │
         │     🧱 말풍선 2       │
         │     🧱 말풍선 3       │
         │                     │
         │   🧱 입력창           │  ← 예시 질문 버튼 + 텍스트 입력
         └─────────────────────┘
```

### 각 🧱 블록 = 각각의 파일

| 블록 | 파일 | 역할 |
|:---|:---|:---|
| 🧱 채팅 전체 | `chat.tsx` | 모든 블록을 조립하는 메인 블록 |
| 🧱 입력창 | `chat-input.tsx` | 질문 입력 + 전송 버튼 |
| 🧱 말풍선 | `message-bubble.tsx` | 대화 내용 표시 |

---

# 💻 레고 조립 코드 — 정말 간단해요!

```tsx
// 📄 app/page.tsx — 메인 페이지
// 레고 블록(Chat)을 하나 가져와서 놓기만 하면 끝!

import { Chat } from "@/components/chat";  // 🧱 블록 가져오기

export default function Home() {
  return <Chat />;  // 🧱 블록 놓기! 끝!
}
```

<br>

> 🤯 이 5줄이 **메인 페이지 전체**예요!
> `Chat` 블록 안에 입력창, 말풍선, 메시지 목록이 다 들어있거든요!

---

# 💻 큰 레고 블록 안에 작은 블록 넣기

```tsx
// 📄 components/chat.tsx — 채팅 전체를 조립하는 블록
export function Chat() {
  return (
    <div>
      <header>🐶 주식내비 키우Me</header>    {/* 🧱 헤더 */}

      <MessageList />                        {/* 🧱 메시지 목록 블록 */}

      <ChatInput />                          {/* 🧱 입력창 블록 */}
    </div>
  );
}
```

> 💡 `<MessageList />`와 `<ChatInput />`은 **다른 파일에서 만든 블록**이에요!
> 큰 블록 안에 작은 블록을 **끼워 넣는** 구조랍니다 🧱

---

# ✅ 정리: 컴포넌트 = 레고 블록

| 비유 | 코딩 | 설명 |
|:---|:---|:---|
| 🧱 레고 블록 하나 | **컴포넌트** | 재사용 가능한 화면 조각 |
| 🧱 블록 조립하기 | **컴포넌트 합성** | 작은 블록을 큰 블록에 넣기 |
| 🧱 같은 블록 여러 개 | **재사용** | 한 번 만든 블록을 여러 곳에서 사용 |
| 📦 블록 상자 (파일) | `.tsx` **파일** | 각 블록은 별도 파일로 관리 |

<br>

> 🎯 **React = 레고 블록(컴포넌트)을 만들고 조립하는 시스템**

---

# 퀴즈 타임! 🤔

### Q: 아래 코드에서 레고 블록은 몇 개일까요?

```tsx
function MyPage() {
  return (
    <div>
      <Header />
      <ChatList />
      <Footer />
    </div>
  );
}
```

<br>

**A) 1개** &nbsp;&nbsp;&nbsp; **B) 3개** &nbsp;&nbsp;&nbsp; **C) 4개**

---

# 퀴즈 정답! 🎉

### 정답: **C) 4개!**

```
MyPage 자체도 블록이에요! (큰 블록)
  └── Header   (작은 블록 1)
  └── ChatList  (작은 블록 2)
  └── Footer   (작은 블록 3)
```

> `MyPage`는 다른 3개 블록을 **조립하는 큰 블록**이에요!
> 레고에서 큰 조립품도 결국 하나의 블록이 되는 것과 같아요 🧱

---

<!-- _class: lead -->

# 섹션 4
## 🏢 건물 층별 안내도
### Next.js 파일 기반 라우팅

---

# 🎯 비유: 건물 층별 안내도 🏢

```
🏢 우리 건물 (app 폴더)
│
├── 1층: 로비 (page.tsx)         → 주소: oursite.com/
│
├── 2층: 분석실 (analytics/)     → 주소: oursite.com/analytics
│   └── 안내데스크 (page.tsx)
│
└── 지하: 주방 (api/)           → 주소: oursite.com/api/chat
    └── 채팅 주방 (chat/)
        └── 요리사 (route.ts)    ← 손님은 못 들어가요! (서버 전용)
```

<br>

> 💡 **폴더 = 층**, **파일 = 방**
> 폴더 구조가 곧 **웹사이트 주소**가 돼요!

---

# 🔗 폴더 이름 = 웹 주소!

```
파일 위치                        웹 주소
─────────────────────────────    ──────────────────────
app/page.tsx                 →   oursite.com/
app/analytics/page.tsx       →   oursite.com/analytics
app/api/chat/route.ts        →   oursite.com/api/chat
```

### 특수 파일 이름들

| 파일명 | 역할 | 비유 |
|:---|:---|:---|
| `page.tsx` | 그 층의 **안내 데스크** | 🛎️ 손님이 볼 수 있는 화면 |
| `layout.tsx` | **건물 외벽** (모든 층 공통) | 🏗️ 건물 전체 틀 |
| `route.ts` | **주방** (서버 전용) | 🍳 손님은 못 들어감 |

---

# 💻 layout.tsx — 건물의 외벽 🏗️

```tsx
// 📄 app/layout.tsx — 모든 페이지를 감싸는 건물 외벽
export default function RootLayout({
  children,   // 👈 여기에 각 층의 내용이 들어와요!
}) {
  return (
    <html lang="ko">
      <body>
        {children}   {/* 🏠 1층 page.tsx 또는 2층 analytics가 여기에! */}
      </body>
    </html>
  );
}
```

> 💡 `children`은 **"여기에 각 페이지 내용을 넣어주세요"** 라는 빈 칸이에요!
> 1층에 가면 1층 내용이, 2층에 가면 2층 내용이 자동으로 들어와요.

---

# ✅ 정리: 파일 기반 라우팅

| 비유 | 코딩 | 설명 |
|:---|:---|:---|
| 🏢 건물 | `app/` 폴더 | 웹사이트 전체 |
| 🏗️ 건물 외벽 | `layout.tsx` | 모든 페이지 공통 틀 |
| 🛎️ 각 층 안내데스크 | `page.tsx` | 각 페이지 화면 |
| 🍳 주방 | `route.ts` | 서버 전용 API |
| 📫 건물 주소 | URL | 폴더 경로 = 웹 주소 |

<br>

> 🎯 **Next.js = 폴더 구조가 곧 웹사이트 주소인 건물 안내도**

---

<!-- _class: lead -->

# 섹션 5
## 🍳 주방 vs 식당 홀
### 서버 컴포넌트 vs 클라이언트 컴포넌트

---

# 🎯 비유: 식당의 주방과 홀 🍽️

```
🍳 주방 (Server)                        🍽️ 식당 홀 (Client = 브라우저)
┌──────────────────┐                   ┌──────────────────┐
│                  │                   │                  │
│  👨‍🍳 요리사         │                   │  😊 손님들         │
│  🔪 칼, 도구들     │    ──음식 전달──>   │  🍽️ 테이블, 의자   │
│  📦 식재료 창고    │                   │  📋 메뉴판         │
│  🔑 비밀 레시피    │                   │  🛎️ 주문 벨        │
│                  │                   │                  │
│  손님 출입 금지!   │                   │  누구나 입장 가능!   │
└──────────────────┘                   └──────────────────┘
```

> 🔑 **비밀 레시피(API 키)**는 주방에만 있어요! 손님이 보면 안 됩니다!
> 🛎️ 손님은 **주문 벨**을 눌러서 요리를 요청해요 (API 호출)

---

# 🔗 이것이 코딩에서는...

```
🍳 Server Component (주방)               🍽️ Client Component (식당 홀)
─────────────────────────               ─────────────────────────────
서버에서만 실행                           브라우저에서 실행
API 키, DB 접근 가능 🔑                  클릭, 입력, 애니메이션 🖱️
손님(사용자)이 볼 수 없음                  손님(사용자)이 직접 상호작용
빠르고 안전함                            화려하고 인터랙티브함
```

### 우리 프로젝트에서는?

| 파일 | 유형 | 왜? |
|:---|:---|:---|
| `layout.tsx` | 🍳 서버 (주방) | 정적 틀만 제공, 상호작용 없음 |
| `page.tsx` | 🍳 서버 (주방) | 블록 조립만 함 |
| `route.ts` | 🍳 서버 (주방) | AI API 키 사용 (비밀 레시피!) |
| `chat.tsx` | 🍽️ 클라이언트 (홀) | 버튼 클릭, 입력, 실시간 대화 |

---

# 💻 "이건 식당 홀에서 쓸 거예요!" 선언

```tsx
// 📄 components/chat.tsx
"use client";   // ← 🍽️ "이 블록은 식당 홀(브라우저)에서 동작해요!"

// 이제 손님(사용자)과 상호작용하는 기능을 쓸 수 있어요!
import { useState } from "react";   // 상태 관리 (전광판)
```

<br>

### 판단 기준 — 아주 간단해요!

```
❓ 이 블록이 사용자와 상호작용(클릭, 입력)을 하나요?

   ✅ YES → "use client" 선언 → 🍽️ 식당 홀에서 동작
   ❌ NO  → 선언 안 함 (기본값) → 🍳 주방에서 동작
```

---

# ✅ 정리: Server vs Client

| 비유 | 코딩 | 핵심 |
|:---|:---|:---|
| 🍳 주방 | **Server** Component | 비밀 레시피(API 키) 보관, 안전 |
| 🍽️ 식당 홀 | **Client** Component | 손님과 상호작용 (클릭, 입력) |
| "손님 출입 금지" 표지판 | 선언 없음 (기본값) | 서버에서만 실행 |
| "영업 중" 표지판 | `"use client"` | 브라우저에서 실행 |

<br>

> 🎯 **서버 = 주방 (비밀 보관), 클라이언트 = 식당 홀 (손님 상호작용)**

---

<!-- _class: lead -->

# 섹션 6
## 📦 택배 송장 양식
### TypeScript

---

# 🎯 비유: 택배 송장 양식 📦

```
📦 택배 보낼 때 송장을 쓰잖아요?

┌─ 택배 송장 ──────────────────────┐
│                                  │
│  보내는 사람: [이름 적는 칸]        │  ← 이름만 OK (숫자 X)
│  받는 사람:   [이름 적는 칸]        │  ← 이름만 OK
│  전화번호:   [숫자 적는 칸]        │  ← 숫자만 OK (이름 X)
│  주소:       [주소 적는 칸]        │  ← 주소 형식만 OK
│  물품:       [물품명 적는 칸]       │
│  배송메모:   [적어도 되고 안 적어도 됨] │  ← 선택사항!
│                                  │
└──────────────────────────────────┘

만약 전화번호 칸에 "김철수"를 쓰면?
→ ❌ "전화번호는 숫자만 입력하세요!" 오류!
```

> 💡 **정해진 양식에 맞는 정보만** 넣을 수 있어요!

---

# 🔗 이것이 코딩에서는... TypeScript!

```
📦 택배 송장 양식                    💻 TypeScript interface

보내는 사람: [이름]                   name: string (문자열)
전화번호: [숫자]                      phone: number (숫자)
배송메모: [선택]                      memo?: string (선택사항)
```

### JavaScript vs TypeScript

```
JavaScript (양식 없는 택배):          TypeScript (양식 있는 택배):
  아무거나 넣어도 됨                    양식에 맞는 것만 넣을 수 있음
  "전화번호에 김철수" → OK??            "전화번호에 김철수" → ❌ 빨간줄!
  실행해봐야 오류 발견 😱               실행 전에 오류 발견 😊
```

> 🎯 TypeScript = **실수를 미리 잡아주는 송장 양식 검사기!**

---

# 💻 우리 프로젝트의 송장 양식

```tsx
// 📄 lib/types.ts — 채팅 메시지의 "송장 양식"
export interface ChatMessage {
  id: string;                    // 📌 메시지 고유번호 (문자)
  role: "user" | "assistant";    // 👤 보낸 사람: 사용자 또는 AI만 가능!
  content: string;               // 💬 메시지 내용 (문자)
  toolCalls?: { ... }[];         // 🔧 도구 호출 정보 (없어도 OK!)
}
//           ↑ 물음표(?) = 선택사항 = "배송메모처럼 없어도 되는 칸"
```

### `"user" | "assistant"` = 보기 중 택 1!

> 시험 문제의 **객관식**과 같아요!
> role 칸에는 "user" 또는 "assistant" **둘 중 하나만** 쓸 수 있어요.
> "admin"을 쓰면? → ❌ **빨간 줄!**

---

# 💻 컴포넌트에도 송장 양식이 있어요!

```tsx
// 📄 components/chat-input.tsx — 입력창 블록의 "송장 양식"
interface ChatInputProps {
  input: string;              // 현재 입력된 텍스트 (문자)
  setInput: (value: string) => void;   // 텍스트 변경 함수
  isLoading: boolean;         // 로딩 중인지 (참/거짓)
  showExamples: boolean;      // 예시 질문 보여줄지 (참/거짓)
  onReset?: () => void;       // 초기화 함수 (선택사항)
}
```

> 💡 이 양식 덕분에 `ChatInput` 블록에 **잘못된 정보를 넘기면 빨간 줄**이 떠요!
> 마치 택배 송장에 전화번호 칸에 이름을 쓰면 경고가 뜨는 것처럼요 📦

---

# ✅ 정리: TypeScript = 택배 송장 양식

| 비유 | 코딩 | 설명 |
|:---|:---|:---|
| 📦 송장 양식 | `interface` | 데이터의 형태를 미리 정의 |
| ✏️ 이름 칸 | `string` | 문자만 입력 가능 |
| 🔢 숫자 칸 | `number` | 숫자만 입력 가능 |
| ☑️ 체크박스 | `boolean` | 참/거짓만 가능 |
| 📝 선택사항 칸 | `?` (물음표) | 없어도 되는 정보 |
| 객관식 문제 | `"A" \| "B"` | 정해진 보기 중에서만 선택 |

<br>

> 🎯 **TypeScript = 잘못된 데이터를 넣으면 미리 경고해주는 양식 검사기**

---

# 퀴즈 타임! 🤔

### Q: 아래 코드에서 에러가 나는 줄은?

```tsx
interface User {
  name: string;
  age: number;
  email?: string;
}

const user1: User = { name: "김신입", age: 25 };          // A
const user2: User = { name: "이사원", age: "스물다섯" };   // B
const user3: User = { name: "박대리", age: 30, email: "park@x.com" }; // C
```

---

# 퀴즈 정답! 🎉

### 정답: **B줄!** ❌

```tsx
const user2: User = { name: "이사원", age: "스물다섯" };
//                                        ^^^^^^^^^^
//            ❌ age는 number(숫자)인데 string(문자)을 넣었어요!
```

- **A줄** ✅ — email은 `?`라서 없어도 OK!
- **B줄** ❌ — age에 문자를 넣으면 안 돼요! (송장에 전화번호 칸에 이름 쓴 격)
- **C줄** ✅ — 모든 칸을 올바르게 채웠어요!

---

<!-- _class: lead -->

# 섹션 7
## 👕 옷 코디 스티커
### Tailwind CSS

---

# 🎯 비유: 옷 코디 스티커 👕

```
👕 옷에 스티커를 붙이면 스타일 완성!

┌─────────────────────────────────────┐
│                                     │
│  "둥글게"  스티커를 붙이면 → 둥근 모서리 │
│  "빨간색"  스티커를 붙이면 → 빨간 배경   │
│  "굵게"    스티커를 붙이면 → 굵은 글씨   │
│  "가운데"  스티커를 붙이면 → 가운데 정렬  │
│                                     │
│  스티커 이름만 알면 디자이너 없이도 코디 가능! │
│                                     │
└─────────────────────────────────────┘
```

> 💡 **Tailwind CSS** = 미리 만들어진 **스타일 스티커**를 이름만 붙이면 완성!

---

# 🔗 이것이 코딩에서는...

### Before: 옛날 방식 (CSS 파일 따로 작성) 📄

```css
/* styles.css 파일을 따로 만들어서... */
.my-button {
  background-color: #FFDD44;
  border-radius: 9999px;
  padding: 6px 12px;
  font-weight: bold;
}
```

### After: Tailwind 방식 (스티커 붙이기!) 🏷️

```tsx
{/* HTML에 스티커 이름만 쭉 나열! */}
<button className="bg-[#FFDD44] rounded-full px-3 py-1.5 font-bold">
```

> 🎉 CSS 파일을 따로 안 만들어도 돼요! **이름만 붙이면** 끝!

---

# 💻 스티커 사전 — 자주 쓰는 것들

| 스티커 이름 | 효과 | 비유 |
|:---|:---|:---|
| `rounded-full` | 완전히 둥글게 | 🟡 동그라미 모양 |
| `bg-[#FFDD44]` | 노란 배경 | 🎨 노란 물감 칠하기 |
| `text-sm` | 작은 글씨 | 🔍 글씨 크기 줄이기 |
| `font-bold` | 굵은 글씨 | **이렇게!** |
| `flex` | 가로로 나란히 배치 | 📏 한 줄로 정렬 |
| `p-3` | 안쪽 여백 | 📦 상자 안쪽 공간 |
| `border-2` | 테두리 | 🖼️ 액자 테두리 |

<br>

> 💡 스티커를 **여러 개** 붙이면 스타일이 **합쳐져요!**
> `rounded-full bg-[#FFDD44] font-bold` = 둥글고 + 노랗고 + 굵은!

---

# 💻 우리 프로젝트의 예시 질문 버튼

```tsx
// 📄 components/chat-input.tsx — 예시 질문 버튼의 스티커들
<button className="
  rounded-full          // 👕 둥글게!
  border-2 border-[#222]  // 🖼️ 테두리 있게!
  bg-[#FFDD44]          // 🎨 노란 배경!
  px-3 py-1.5           // 📦 안쪽 여백!
  text-sm font-bold     // ✏️ 작은 글씨 + 굵게!
  shadow-[1px_1px_0_#C93A25]  // 🌑 빨간 그림자!
  active:shadow-none    // 👆 누르면 그림자 사라짐!
">
  삼성전자 주가 알려줘
</button>
```

> 🎮 `active:` = "**누르는 동안**" 적용되는 스티커예요!
> 버튼을 꾹 누르면 그림자가 사라지고, 떼면 다시 나타나요!

---

# 💻 @theme — 우리만의 스티커 세트 만들기

```css
/* 📄 app/globals.css — 우리 프로젝트만의 색상 스티커 세트! */
@theme {
  --color-primary: #E8452E;       /* 🔴 메인 빨간색 */
  --color-surface: #FFF8E7;       /* 🟡 따뜻한 배경색 */
  --color-bubble-user: #FFDD44;   /* 💛 사용자 말풍선 노란색 */
  --color-bubble-ai: #FFFFFF;     /* ⬜ AI 말풍선 흰색 */
}
```

### 사용할 때는 이름만!

```tsx
<div className="bg-surface">      {/* 🟡 따뜻한 배경색 적용! */}
<div className="bg-primary">      {/* 🔴 메인 빨간색 적용! */}
```

> 💡 색상을 **한 곳에서** 바꾸면 → 전체 프로젝트에 **자동 반영**!

---

# ✅ 정리: Tailwind CSS = 옷 코디 스티커

| 비유 | 코딩 | 설명 |
|:---|:---|:---|
| 👕 스티커 한 장 | 유틸리티 **클래스** | `rounded-full`, `bg-red` 등 |
| 🏷️ 스티커 여러 장 | `className="..."` | 스티커를 나열하면 스타일 합성 |
| 🎨 우리만의 색 세트 | `@theme { }` | 커스텀 색상 정의 |
| 🖱️ "누르면" 스티커 | `active:`, `hover:` | 상태별 다른 스타일 |

<br>

> 🎯 **Tailwind = 스티커 이름만 붙이면 스타일 완성!**

---

<!-- _class: lead -->

# 섹션 8
## 📺 전광판과 설명서
### State (useState) & Props

---

# 🎯 비유: 전광판 숫자 📺

```
🏟️ 야구장 전광판을 상상해 보세요!

    ┌──────────────────────┐
    │   ⚾ 홈팀  3 : 2  원정팀  │  ← 점수가 바뀌면
    │      7회초              │     전광판이 자동 업데이트!
    └──────────────────────┘

    홈런이 나오면?
    → 점수가 3에서 4로 변경!
    → 전광판이 자동으로 새 점수 표시! ✨

    여러분이 전광판을 직접 바꿀 필요 없어요!
    점수(state)만 바꾸면 화면은 알아서 바뀝니다!
```

> 💡 **State(상태)** = 바뀔 수 있는 전광판 숫자
> 숫자가 바뀌면 **화면이 자동으로 업데이트**되는 마법! ✨

---

# 🔗 이것이 코딩에서는... useState!

```tsx
// 📄 components/chat.tsx
const [messages, setMessages] = useState([]);
//     ^^^^^^^^  ^^^^^^^^^^^          ^^
//     전광판 숫자  숫자 바꾸는 리모컨   초기값(빈 배열)

const [isLoading, setIsLoading] = useState(false);
//     ^^^^^^^^^  ^^^^^^^^^^^^          ^^^^^
//     전광판 숫자  숫자 바꾸는 리모컨   초기값(꺼짐)
```

### 전광판 업데이트하기

```tsx
setIsLoading(true);    // 📺 전광판: "로딩 중..." 표시!
setMessages([...]);    // 📺 전광판: 새 메시지 추가 표시!
```

> 🎯 `set____`(리모컨)를 누르면 → 값이 바뀌고 → **화면 자동 업데이트!**

---

# 🎯 비유: 레고 블록 설명서 📋

```
🧱 레고를 조립할 때 설명서가 있잖아요?

부모 블록이 자식 블록에게 설명서(props)를 전달해요!

┌─── 🧱 Chat (부모) ──────────┐
│                             │
│  "현재 메시지 목록은 이거야"    │ ── 설명서 전달 ──>  🧱 MessageList
│  "로딩 중이야"               │                    (자식)
│                             │
│  "입력값은 이거야"            │ ── 설명서 전달 ──>  🧱 ChatInput
│  "전송 버튼 누르면 이거 해"    │                    (자식)
│                             │
└─────────────────────────────┘
```

> 💡 **Props** = 부모가 자식에게 전달하는 **설명서(정보)**
> 자식 블록은 설명서대로 자기 역할을 수행해요!

---

# 🔗 이것이 코딩에서는... Props 전달!

```tsx
// 📄 components/chat.tsx — 부모가 자식에게 설명서(props) 전달
<MessageList
  messages={messages}           // 📋 "메시지 목록은 이거야"
  isLoading={isLoading}         // 📋 "로딩 중이야 (참/거짓)"
  onFollowUpClick={handleClick} // 📋 "후속 질문 클릭하면 이거 해"
/>

<ChatInput
  input={input}                 // 📋 "현재 입력값은 이거야"
  setInput={setInput}           // 📋 "입력값 바꿀 때 이 리모컨 써"
  isLoading={isLoading}         // 📋 "로딩 중이야 (참/거짓)"
  showExamples={messages.length === 0} // 📋 "메시지 없으면 예시 보여줘"
/>
```

> 💡 `=` 왼쪽은 **설명서 항목 이름**, 오른쪽은 **전달할 정보**!

---

# 💻 자식이 설명서(props) 받아서 사용하기

```tsx
// 📄 components/chat-input.tsx — 자식이 설명서 받기
export function ChatInput({
  input,          // 📋 부모가 알려준 현재 입력값
  setInput,       // 📋 부모가 준 리모컨 (입력값 변경용)
  isLoading,      // 📋 부모가 알려준 로딩 상태
  showExamples,   // 📋 부모가 알려준 예시 표시 여부
}: ChatInputProps) {

  return (
    <input
      value={input}                          // 입력칸에 현재값 표시
      onChange={(e) => setInput(e.target.value)} // 타이핑하면 리모컨 눌러서 업데이트
      disabled={isLoading}                    // 로딩 중이면 입력 잠금!
    />
  );
}
```

---

# 📊 State와 Props의 흐름 — 한눈에!

```
┌── 🧱 Chat (부모) ────────────────────────┐
│                                          │
│  📺 state: messages, isLoading, input     │
│  🎮 리모컨: setMessages, setIsLoading...  │
│                                          │
│       │ props ↓           │ props ↓       │
│       │                   │               │
│  ┌────▼─────┐        ┌───▼──────┐       │
│  │ MessageList │        │ ChatInput  │       │
│  │ (messages   │        │ (input     │       │
│  │  isLoading) │        │  setInput  │       │
│  └────────────┘        │  isLoading)│       │
│                        └──────────┘       │
│       ↑ 이벤트 콜백                        │
│   "후속질문 클릭!"  →  부모가 처리!           │
└──────────────────────────────────────────┘
```

> 💡 데이터는 **위에서 아래로** ↓, 이벤트는 **아래에서 위로** ↑

---

# ✅ 정리: State & Props

| 비유 | 코딩 | 설명 |
|:---|:---|:---|
| 📺 전광판 숫자 | **State** (`useState`) | 바뀌면 화면 자동 업데이트 |
| 🎮 전광판 리모컨 | **setState** 함수 | 상태를 바꾸는 도구 |
| 📋 레고 설명서 | **Props** | 부모→자식 정보 전달 |
| ↓ 위에서 아래로 | **데이터 흐름** | 부모가 자식에게 전달 |
| ↑ 아래에서 위로 | **이벤트 콜백** | 자식이 부모에게 알림 |

<br>

> 🎯 **State = 바뀌는 전광판, Props = 부모가 주는 설명서**

---

# 퀴즈 타임! 🤔

### Q: 전광판(State)을 바꾸면 어떤 일이 일어날까요?

```tsx
const [count, setCount] = useState(0);  // 전광판: 0

setCount(5);  // 리모컨으로 5로 변경!
```

**A)** 아무 일도 안 일어난다
**B)** 콘솔에 로그만 찍힌다
**C)** 화면에 5가 자동으로 표시된다 ✨

---

# 퀴즈 정답! 🎉

### 정답: **C) 화면에 5가 자동으로 표시된다!** ✨

```
setCount(5) 실행!
    ↓
전광판(state) 값: 0 → 5 로 변경
    ↓
React가 "값이 바뀌었네?" 감지!
    ↓
화면 자동 업데이트! 📺 → 5 표시!
```

> 🎯 이것이 React의 핵심이에요!
> **state가 바뀌면 화면이 알아서 바뀐다!** 개발자가 직접 화면을 조작할 필요 없어요!

---

<!-- _class: lead -->

# 섹션 9
## 📮 식당 주문 창구
### API Route (route.ts)

---

# 🎯 비유: 식당 주문 창구 📮

```
😊 손님 (브라우저)              📮 주문 창구                🍳 주방 (서버)
                             (API Route)

1. "삼성전자 주가 알려줘"   →   📝 주문서 접수!        →   👨‍🍳 요리 시작!
                                                        🔪 재료 준비 (AI 호출)
                                                        🥘 조리 중... (데이터 수집)
                             📮 음식 전달!            ←   🍽️ 요리 완성!
2. 답변 수신!             ←   "삼성전자 현재 주가는..."
```

<br>

> 💡 손님은 **주문서(요청)**만 넘기면 돼요!
> 주방에서 어떻게 요리하는지는 **몰라도 됩니다!**
> API Route = 손님과 주방을 연결하는 **주문 창구** 📮

---

# 🔗 이것이 코딩에서는...

```
😊 브라우저 (chat.tsx)              📮 API Route (route.ts)           🧠 AI (Claude)

1. fetch("/api/chat", {        →   POST 함수가 실행!
     messages: [대화내용]              ↓
   })                               const { messages } = req.json()
                                     ↓
                                    anthropic.messages.stream(...)  →  🧠 AI에게 질문!
                                     ↓
                                    AI 답변 수신                   ←  "삼성전자는..."
                                     ↓
2. 답변 수신!                  ←   send({ type: "text_delta" })
```

---

# 💻 주문 창구 코드 (핵심만!)

```tsx
// 📄 app/api/chat/route.ts — 주문 창구

// 📮 POST 주문이 들어오면 실행!
export async function POST(req: Request) {
  const { messages } = await req.json();  // 📝 주문서 읽기

  // 🍳 주방에서 AI에게 요리 시키기
  const stream = anthropic.messages.stream({
    model: "claude-haiku-4-5-20251001",   // 👨‍🍳 어떤 요리사(AI 모델)
    messages: apiMessages,                // 📝 주문 내용
    tools: toolDefinitions,               // 🔧 사용 가능한 도구들
  });

  // 📮 요리가 되는 대로 손님에게 전달!
  stream.on("text", (text) => {
    send({ type: "text_delta", text });   // 한 글자씩 실시간 전달!
  });
}
```

---

# ✅ 정리: API Route = 주문 창구

| 비유 | 코딩 | 설명 |
|:---|:---|:---|
| 📮 주문 창구 | `route.ts` | 요청을 받고 응답을 보내는 곳 |
| 📝 주문서 | `req.json()` | 브라우저가 보낸 데이터 |
| 🍳 요리하기 | AI API 호출 | 서버에서 처리하는 로직 |
| 🍽️ 음식 전달 | `send(data)` | 결과를 브라우저에 보내기 |
| 🔑 비밀 레시피 | API 키 | 서버에서만 안전하게 사용 |

<br>

> 🎯 **API Route = 손님(브라우저)과 주방(서버)을 연결하는 주문 창구!**

---

<!-- _class: lead -->

# 섹션 10
## 📡 유튜브 실시간 방송
### SSE (Server-Sent Events) 스트리밍

---

# 🎯 비유: 영화 다운로드 vs 유튜브 실시간 방송 📡

```
🎬 영화 다운로드 (일반 HTTP)         📡 유튜브 실시간 방송 (SSE)
┌──────────────────┐              ┌──────────────────┐
│                  │              │                  │
│  1. 다운로드 시작  │              │  1. 재생 버튼 클릭  │
│  2. ............  │              │  2. 바로 시청 시작! │
│  3. ............  │              │  3. 계속 시청 중... │
│  4. 다운로드 완료! │              │  4. 새 장면 계속... │
│  5. 이제야 시청!   │              │  5. 방송 종료!     │
│                  │              │                  │
│  ⏳ 다 받을 때까지 │              │  ⚡ 바로바로 보여줌! │
│     기다려야 함!   │              │     기다릴 필요 없음 │
└──────────────────┘              └──────────────────┘
```

> 💡 AI 답변도 **글자가 하나하나 생성**되니까,
> 다 기다리지 말고 **실시간으로 보여주는** 게 좋겠죠?

---

# 🔗 이것이 코딩에서는... SSE!

```
😊 브라우저                    🖥️ 서버

1. "삼성전자 주가 알려줘"  →   요청 접수!
                              AI 응답 생성 시작...
2. "삼"                  ←   첫 번째 글자 전송!
3. "성"                  ←   두 번째 글자 전송!
4. "전"                  ←   세 번째 글자 전송!
5. "자"                  ←   ...
6. " 현재 주가는..."      ←   계속 전송!
7.                       ←   📡 "방송 종료!" (done)
```

### ChatGPT처럼 글자가 타타타타 나오는 이유!
> 이게 바로 **SSE 스트리밍**이에요!
> AI가 **글자를 만들 때마다** 즉시 보내는 거예요 📡

---

# 💻 서버 코드 — 방송국 📡

```tsx
// 📄 app/api/chat/route.ts — 방송 시작!

// 📡 방송 채널 만들기
const stream = new ReadableStream({
  async start(controller) {   // 🎬 방송 시작!

    // 📡 한 글자씩 시청자에게 전달하는 함수
    const send = (data) => {
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
      );  // 📺 시청자 화면에 표시!
    };

    // AI 글자 생성할 때마다 → 바로 전송!
    stream.on("text", (text) => {
      send({ type: "text_delta", text });  // 📡 "한 글자 보냅니다!"
    });

    controller.close();  // 📡 "방송 종료!"
  },
});
```

---

# 💻 클라이언트 코드 — 시청자 📺

```tsx
// 📄 components/chat.tsx — 방송 수신!

// 📡 방송 채널에 접속
const reader = response.body.getReader();

// 📺 방송 계속 수신 (끝날 때까지 반복)
while (true) {
  const { done, value } = await reader.read();  // 📡 데이터 수신
  if (done) break;  // 📡 방송 끝!

  // 수신한 데이터 처리
  if (data.type === "text_delta") {
    // 📺 전광판에 글자 추가!
    setMessages(prev => /* 기존 텍스트 + 새 글자 */);
  } else if (data.type === "done") {
    // 📡 방송 종료 처리
  }
}
```

---

# 📊 SSE 전체 흐름 — 한눈에!

```
📺 시청자 (브라우저)           📡 방송국 (서버)             🧠 AI

   "질문 전송!"         →    📮 접수!
                              ↓
                             🧠 AI에게 질문 전달     →    생각 중...
                              ↓
   📺 "삼" 표시          ←    📡 text_delta           ←    "삼"
   📺 "삼성" 표시        ←    📡 text_delta           ←    "성"
   📺 "삼성전" 표시      ←    📡 text_delta           ←    "전"
                              ...                         ...
   📺 "도구 사용 중!" 표시 ←   📡 tool_call            ←    "시세 조회할게요"
                              ↓
                             🔧 다음 금융 API 호출
                              ↓
   📺 답변 계속 표시     ←    📡 text_delta           ←    답변 계속...
   📺 "완료!" 표시       ←    📡 done                 ←    끝!
```

---

# ✅ 정리: SSE 스트리밍 = 실시간 방송

| 비유 | 코딩 | 설명 |
|:---|:---|:---|
| 📡 방송국 | **서버** (route.ts) | 데이터를 실시간 전송 |
| 📺 시청자 | **브라우저** (chat.tsx) | 데이터를 실시간 수신 |
| 🎬 방송 시작 | `new ReadableStream()` | 스트림 채널 생성 |
| 📡 장면 전송 | `send({ type: "text_delta" })` | 글자 하나씩 전송 |
| 📺 화면에 표시 | `setMessages(...)` | 전광판(state) 업데이트 |
| 📡 방송 종료 | `send({ type: "done" })` | 스트림 종료 |

<br>

> 🎯 **SSE = 서버가 실시간 방송하고, 브라우저가 시청하는 구조!**

---

<!-- _class: lead -->

# 섹션 11
## ⏰ 알람 시계
### useEffect

---

# 🎯 비유: 알람 시계 설정 ⏰

```
⏰ 알람 시계를 설정해 보세요!

"아침 7시가 되면 알람 울려줘!"          → 특정 조건에서 자동 실행
"매주 월요일마다 회의 알림!"           → 특정 값이 바뀔 때마다 실행
"앱 켤 때 한 번만 인사말 보여줘!"      → 처음에 한 번만 실행

┌──────────────────────────────┐
│  ⏰ useEffect 알람 설정       │
│                              │
│  언제?  → [messages 바뀔 때]   │  ← 조건 설정
│  뭘 해? → 맨 아래로 스크롤!     │  ← 실행할 동작
│                              │
└──────────────────────────────┘
```

> 💡 **useEffect** = "특정 조건이 되면 자동으로 이것을 해줘!" 알람 시계

---

# 🔗 이것이 코딩에서는...

```tsx
// 📄 message-list.tsx — 새 메시지 오면 자동 스크롤!

useEffect(() => {
  // ⏰ 알람이 울리면 할 일: 맨 아래로 스크롤!
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, isLoading]);
// ↑ [조건]: messages 또는 isLoading이 바뀔 때마다 실행!
```

### 조건 설정 방법

| 조건 | 의미 | 비유 |
|:---|:---|:---|
| `[messages]` | messages가 바뀔 때 | ⏰ "새 메시지 올 때마다" |
| `[]` (빈 배열) | 처음 한 번만 | ⏰ "앱 켤 때 한 번만" |
| (배열 없음) | 매번 | ⏰ "항상" (보통 실수!) |

---

# ✅ 정리: useEffect = 알람 시계

| 비유 | 코딩 | 설명 |
|:---|:---|:---|
| ⏰ 알람 설정 | `useEffect(() => {...}, [...])` | 조건+동작 설정 |
| 🔔 알람 조건 | 의존성 배열 `[a, b]` | a나 b가 바뀌면 실행 |
| 📋 할 일 | 콜백 함수 `() => {...}` | 조건 만족 시 실행할 코드 |
| 🧹 정리하기 | `return () => {...}` | 알람 해제 (정리) |

<br>

> 🎯 **useEffect = "이 조건이 되면 이걸 자동 실행해줘!" 알람 시계** ⏰

---

<!-- _class: lead -->

# 섹션 12
## 🔐 금고 비밀번호
### 환경 변수

---

# 🎯 비유: 금고 비밀번호 🔐

```
🔐 회사 금고 비밀번호를 어디에 보관하나요?

  ❌ 포스트잇에 적어서 모니터에 붙이기     → 아무나 볼 수 있음!
  ❌ 카톡으로 동료에게 보내기             → 유출 위험!
  ❌ 소스 코드에 직접 적기               → GitHub에 올라감!

  ✅ 금고 안 비밀 노트에만 보관           → .env.local 파일!
  ✅ 아는 사람만 접근 가능               → 서버에서만 사용!
```

<br>

> 💡 **환경 변수** = 코드에 직접 쓰면 안 되는 비밀 정보
> API 키, 비밀번호 같은 것들을 **안전하게 보관**하는 금고예요! 🔐

---

# 🔗 이것이 코딩에서는...

```bash
# 📄 .env.local — 비밀 금고 (이 파일은 절대 GitHub에 안 올림!)
ANTHROPIC_API_KEY=sk-ant-api03-...     # 🔑 AI API 키
UPSTASH_REDIS_REST_URL=https://...     # 🔑 DB 주소
UPSTASH_REDIS_REST_TOKEN=AXxxxx...     # 🔑 DB 비밀번호
```

### ⚠️ 절대 하면 안 되는 것!

```tsx
// ❌ 이렇게 하면 안 돼요! (코드에 직접 비밀번호 쓰기)
const apiKey = "sk-ant-api03-secret-key-here";

// ✅ 이렇게 해야 해요! (금고에서 꺼내 쓰기)
const anthropic = new Anthropic();  // .env.local에서 자동으로 읽음!
```

---

# 💡 서버 전용 vs 공개 가능

```
🔑 서버 전용 (기본)                    🌍 공개 가능 (NEXT_PUBLIC_)
─────────────────                    ─────────────────────
ANTHROPIC_API_KEY=...                NEXT_PUBLIC_SITE_URL=...

→ 서버(주방)에서만 사용 가능!            → 브라우저(식당 홀)에서도 사용 가능!
→ 브라우저에서 접근 불가!               → 사용자도 볼 수 있음!
→ API 키, DB 비밀번호에 사용            → 사이트 URL 등 공개 정보에 사용
```

<br>

> ⚠️ **API 키에 절대 `NEXT_PUBLIC_` 접두사를 붙이지 마세요!**
> 마치 금고 비밀번호를 포스트잇에 적어 붙이는 것과 같아요! 😱

---

# ✅ 정리: 환경 변수 = 금고 비밀번호

| 비유 | 코딩 | 설명 |
|:---|:---|:---|
| 🔐 비밀 금고 | `.env.local` 파일 | 비밀 정보 보관 장소 |
| 🔑 비밀번호 | 환경 변수 값 | API 키, DB 비밀번호 등 |
| 🍳 주방에서만 사용 | 접두사 없는 변수 | 서버에서만 접근 가능 |
| 🌍 공개 가능 | `NEXT_PUBLIC_` 접두사 | 브라우저에서도 접근 가능 |
| 📋 메모장에 적지 않기 | `.gitignore`에 등록 | GitHub에 올리지 않기! |

<br>

> 🎯 **환경 변수 = 절대 코드에 직접 쓰지 않는 비밀 정보 금고** 🔐

---

<!-- _class: lead -->

# 섹션 13
## 🗺️ 전체 지도
### 지금까지 배운 것 한눈에 보기!

---

# 🗺️ 전체 아키텍처 — 식당 비유로!

```
🍽️ 식당 홀 (브라우저)                    🍳 주방 (서버)

  😊 손님이 질문 입력
  📮 주문 창구로 전달 ──────────────────>  📮 route.ts가 주문 접수
                                           ↓
                                         🧠 AI 요리사에게 전달
                                           ↓
  📺 글자 하나씩 표시 <─── 📡 SSE ──────  📡 답변 실시간 전송
  📺 글자 하나씩 표시 <─── 📡 SSE ──────  📡 계속 전송...
  📺 "완료!" <──────── 📡 SSE ──────    📡 요리 완성!

  🧱 레고 블록들이 화면 구성:
    🧱 Chat → MessageList → MessageBubble
    🧱 Chat → ChatInput
```

---

# 🧰 오늘 배운 도구 상자 — 최종 정리!

| # | 개념 | 비유 | 한 줄 요약 |
|:---:|:---|:---|:---|
| 1 | HTML/CSS/JS | 🏠 뼈대/인테리어/가전 | 구조 + 스타일 + 동작 |
| 2 | 컴포넌트 | 🧱 레고 블록 | 재사용 가능한 화면 조각 |
| 3 | 파일 라우팅 | 🏢 건물 층별 안내도 | 폴더 = 주소 |
| 4 | Server/Client | 🍳 주방 / 🍽️ 식당 홀 | 안전 처리 / 상호작용 |
| 5 | TypeScript | 📦 택배 송장 양식 | 잘못된 데이터 미리 방지 |
| 6 | Tailwind CSS | 👕 옷 코디 스티커 | 이름 붙이면 스타일 완성 |
| 7 | State | 📺 전광판 숫자 | 바뀌면 화면 자동 업데이트 |
| 8 | Props | 📋 레고 설명서 | 부모→자식 정보 전달 |
| 9 | API Route | 📮 주문 창구 | 브라우저↔서버 연결 |
| 10 | SSE | 📡 실시간 방송 | 서버→브라우저 실시간 전송 |
| 11 | useEffect | ⏰ 알람 시계 | 조건 되면 자동 실행 |
| 12 | 환경 변수 | 🔐 금고 비밀번호 | 비밀 정보 안전 보관 |

---

# 핵심 개념 체크리스트 ✅

### 이것만 기억하세요!

- [ ] 🧱 **컴포넌트** = 재사용 가능한 레고 블록
- [ ] 📺 **State** = 바뀌면 화면이 자동 업데이트되는 전광판
- [ ] 📋 **Props** = 부모가 자식에게 전달하는 설명서
- [ ] 📦 **TypeScript** = 실수를 미리 잡아주는 송장 양식
- [ ] 👕 **Tailwind** = 이름만 붙이면 스타일 완성되는 스티커
- [ ] 🍳 **Server** = 비밀을 지키는 주방 / 🍽️ **Client** = 손님과 만나는 홀
- [ ] 📮 **API Route** = 주방과 홀을 연결하는 주문 창구
- [ ] 📡 **SSE** = AI 답변을 실시간 방송처럼 한 글자씩 보내기
- [ ] 🔐 **환경 변수** = 절대 코드에 직접 쓰면 안 되는 금고 비밀번호

---

# 🚀 더 공부하고 싶다면?

### 공식 문서 (북마크 추천!)

- 📘 **Next.js**: [nextjs.org/docs](https://nextjs.org/docs/app)
- 📘 **React**: [react.dev/learn](https://react.dev/learn)
- 📘 **TypeScript**: [typescriptlang.org/docs](https://www.typescriptlang.org/docs/)
- 📘 **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

### 프로젝트에서 더 살펴볼 파일

- 📂 `lib/tools.ts` — AI 도구 정의 (식당 메뉴판!)
- 📂 `lib/daum-finance.ts` — 외부 API 통신 (식재료 주문!)
- 📂 `components/thinking-steps.tsx` — AI 사고 과정 표시

---

# 마지막 퀴즈! 🤔

### Q: 우리 프로젝트에서 사용자가 "삼성전자 주가"를 입력하면 어떤 순서로 일이 일어날까요?

**순서를 맞춰보세요!**

- A) 📡 SSE로 답변이 글자 하나씩 전달됨
- B) 😊 사용자가 입력칸에 타이핑
- C) 🧠 AI가 답변 생성 시작
- D) 📮 route.ts가 요청을 접수
- E) 📺 화면에 답변이 실시간 표시
- F) 🧱 ChatInput에서 전송 버튼 클릭

---

# 마지막 퀴즈 정답! 🎉

### 정답: **B → F → D → C → A → E**

```
B) 😊 사용자가 입력칸에 타이핑          (ChatInput → State 업데이트)
    ↓
F) 🧱 전송 버튼 클릭                   (ChatInput → handleSubmit)
    ↓
D) 📮 route.ts가 요청을 접수            (API Route → POST 함수)
    ↓
C) 🧠 AI가 답변 생성 시작               (Claude API 호출)
    ↓
A) 📡 SSE로 답변이 글자 하나씩 전달됨     (ReadableStream → send)
    ↓
E) 📺 화면에 답변이 실시간 표시           (setMessages → 전광판 업데이트!)
```

> 🎉 축하해요! 전체 흐름을 이해하신 거예요!

---

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _footer: "" -->

# 🎉 수고하셨습니다!

### 오늘 배운 비유를 기억하면 코드가 읽힐 거예요!

<br>

> 🏠 웹사이트 = **집** (뼈대 + 인테리어 + 가전)
> 🧱 컴포넌트 = **레고 블록** (조립하면 앱 완성!)
> 📺 State = **전광판** (바뀌면 화면 자동 업데이트!)
> 📡 SSE = **실시간 방송** (AI 답변을 한 글자씩!)

<br>

### 🐶 주식내비 키우Me 프로젝트와 함께 성장해요!

---

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _footer: "" -->

# 감사합니다 🙏

### 질문이 있으신가요?

<br>

**프로젝트:** 주식내비 키우Me
**배포:** https://01stockhackathon.vercel.app
**스택:** Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4
**AI:** Claude Haiku 4.5

<br>

> "비유를 기억하면, 코드가 보입니다." 💡
