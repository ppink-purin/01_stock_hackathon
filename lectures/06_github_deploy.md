---
marp: true
theme: default
paginate: true
backgroundColor: #1a1a2e
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

# 🎮 게임 세이브부터 신메뉴 출시까지
## Git, GitHub & Vercel 배포

**주식내비 키우Me** 프로젝트 실전 사례

강의 시간: 60분
핵심 기술: Git, GitHub, Vercel, 환경변수, CI/CD

---

# 🗺️ 오늘의 모험 지도

| 파트 | 주제 | 비유 | 시간 |
|------|------|------|------|
| **Part 1** | Git 기초 | 🎮 게임 세이브 시스템 | 15분 |
| **Part 2** | GitHub 활용 | ☁️ 클라우드 세이브 | 10분 |
| **Part 3** | 환경변수 관리 | 🔐 금고 비밀번호 | 10분 |
| **Part 4** | Vercel 배포 | 🍽️ 신메뉴 출시 | 15분 |
| **Part 5** | CI/CD | 🏭 자동 품질검사 컨베이어 벨트 | 10분 |

> 🎯 **오늘의 목표**: RPG 게임 개발자가 되어, 게임을 세이브하고, 클라우드에 올리고, 전 세계에 출시하는 전체 여정을 경험합니다!

---

# 🧑‍🎮 오늘의 주인공 소개

## RPG 게임 개발자 "민수" 이야기

```
🧑‍💻 민수 (신입 개발자)
   │
   ├── 📝 "주식내비 키우Me" 앱을 만들고 있어요
   ├── 💾 작업 내용을 안전하게 저장하고 싶어요
   ├── 👥 팀원들과 함께 작업하고 싶어요
   └── 🌐 전 세계 사용자에게 앱을 공개하고 싶어요
```

민수의 여정을 따라가면서
**Git → GitHub → 환경변수 → Vercel → CI/CD**
를 하나씩 배워봅시다! 🚀

---

<!-- _class: lead -->

# Part 1 🎮
## 게임 세이브 시스템
### = Git 기초

---

# 🎯 비유: 세이브 없는 게임 😰

## RPG 게임에서 세이브 없이 플레이한다고 상상해보세요

```
🎮 10시간 플레이...
💀 보스에게 당함!
😭 처음부터 다시...

🎮 또 10시간 플레이...
⚡ 정전!
😭😭 처음부터 다시...
```

- 실수하면 **전부 처음부터**
- 어디까지 했는지 **기억 안 남**
- 친구에게 진행상황 **공유 불가**

---

# 🎯 비유: 세이브 있는 게임 😎

## 세이브 시스템이 있다면?

```
🎮 마을 탈출 완료 → 💾 세이브!
🎮 던전 1층 클리어 → 💾 세이브!
🎮 보스전 도전 → 💀 실패!
⏪ 세이브 불러오기 → 다시 도전!
🎮 보스 격파! → 💾 세이브!
```

- 실수하면 **이전 세이브로 복귀**
- 모든 **진행 기록**이 남음
- 친구에게 **세이브 파일 공유** 가능

---

# 🔗 이것이 코딩에서는... Git!

## Git = 🎮 **코드를 위한 게임 세이브 시스템**

<div class="columns">
<div class="col">

### Git 없이 개발하면? 😰

```
📁 프로젝트_최종.zip
📁 프로젝트_최종_진짜.zip
📁 프로젝트_최종_진짜_최종.zip
📁 프로젝트_제발_최종.zip
📁 프로젝트_진짜마지막_v3.zip
```

</div>
<div class="col">

### Git을 사용하면! 😎

```
💾 세이브1: "채팅 UI 완성"
💾 세이브2: "API 연동 추가"
💾 세이브3: "버그 수정"
💾 세이브4: "배포 설정 추가"
```

</div>
</div>

> 💡 Git을 쓰면 **모든 변경 이력**이 기록되고, 언제든 **이전 세이브로 복구** 가능!

---

# 💻 Git의 핵심 흐름 — 세이브 3단계

```
 📂 작업 폴더              📋 세이브 준비함           💾 세이브 완료!
 (Working Directory)      (Staging Area)           (Repository)

   파일을 수정한다     →    세이브할 파일을 골라     →   세이브 확정!
                            준비함에 담는다              메모도 남김

        ✏️ 수정            📋 git add              💾 git commit
```

> 💡 수정 → `git add` → `git commit` 이 3단계가 Git의 핵심!

---

# 💻 Git 세이브 3단계 — 명령어 정리

## 게임 비유로 보는 Git 명령어

| 게임 비유 | Git 명령어 | 설명 |
|----------|-----------|------|
| 🎮 게임 플레이 | 파일 수정 | 코드를 작성하고 편집하는 단계 |
| 📋 세이브할 아이템 선택 | `git add` | 어떤 파일을 세이브할지 고르기 |
| 💾 세이브! | `git commit` | 현재 상태를 저장 + 메모 남기기 |
| 📜 세이브 기록 보기 | `git log` | 지금까지의 세이브 목록 확인 |

> 💡 **Git은 코드의 게임 세이브 시스템입니다.** 언제든 이전 세이브 포인트로 돌아갈 수 있어요!

---

# 🎯 비유: 세이브할 아이템 선택하기 🎒

## RPG 인벤토리에서 세이브할 아이템을 골라 담는 과정

```
🎒 내 인벤토리 (작업 폴더)
   ├── ⚔️ 전설의 검 (수정됨)      → 📋 세이브함에 담기!
   ├── 🛡️ 마법 방패 (수정됨)      → 📋 세이브함에 담기!
   ├── 🧪 실험용 포션 (수정됨)     → ❌ 아직 불안정... 이번엔 패스
   └── 📜 퀘스트 메모 (새 파일)    → 📋 세이브함에 담기!
```

**핵심**: 모든 걸 한꺼번에 세이브하지 않아도 돼요!
**원하는 것만 골라서** 세이브할 수 있어요 🎯

---

# 🔗 이것이 Git에서는... git add!

## `git add` = 세이브할 파일을 골라 담기 📋

```
📂 작업 폴더 (변경된 파일들)
   ├── app/page.tsx (수정됨)          → git add app/page.tsx ✅
   ├── components/chat.tsx (수정됨)   → git add components/chat.tsx ✅
   ├── lib/test.ts (실험 중)          → ❌ 이번엔 제외
   └── lib/analytics/tracker.ts (새 파일) → git add lib/analytics/tracker.ts ✅
```

> 💡 **`git add`는 세이브할 아이템을 고르는 과정입니다.** 준비가 된 파일만 골라서 세이브 준비함에 담으세요!

---

# 💻 실제 명령어: git add

```bash
# 🎒 특정 파일만 골라 담기
git add app/page.tsx
git add components/chat.tsx

# 📦 폴더 통째로 담기
git add app/ components/

# 🗂️ 변경된 모든 파일 한번에 담기
git add .
```

> 💡 **팁**: `git add .`은 편리하지만, 올리면 안 되는 파일이 섞일 수 있어요.
> 중요한 작업에서는 **파일을 하나씩 골라 담는 습관**을 들이세요!

---

# 🎯 비유: 게임 세이브 + 메모 남기기 💾

## 세이브할 때 항상 메모를 남기는 습관!

```
💾 세이브 슬롯 1: "마을 탈출 완료, 무기 업그레이드함"
💾 세이브 슬롯 2: "던전 1층 클리어, 보스 열쇠 획득"
💾 세이브 슬롯 3: "보스전 직전, 포션 10개 준비 완료"
💾 세이브 슬롯 4: "보스 격파! 전설의 검 획득! 🎉"
```

나중에 어떤 세이브를 불러올지 **메모를 보고 판단**할 수 있어요!

---

# 💻 나쁜 메모 vs 좋은 메모

## 커밋 메시지 작성법

| 나쁜 메모 😰 | 좋은 메모 😎 |
|-------------|------------|
| "세이브" | "마을 탈출 완료, 무기 업그레이드함" |
| "작업함" | "채팅 UI 말풍선 스타일 완성" |
| "수정" | "모바일에서 채팅 말풍선 깨지는 버그 수정" |

> 💡 **좋은 메모 = 미래의 나에게 보내는 편지!** ✉️

---

# 🔗 이것이 Git에서는... git commit!

## `git commit` = 💾 게임 세이브 + 메모

```bash
git commit -m "채팅 UI 컴포넌트 구현"
#              ^^^^^^^^^^^^^^^^^^^^^^^^
#              세이브에 붙이는 메모!
```

| 나쁜 예 😰 | 좋은 예 😎 |
|---------|---------|
| `수정` | `채팅 말풍선 스타일 수정: 모바일 반응형 대응` |
| `작업 중` | `예시 질문 마키 스크롤 애니메이션 추가` |
| `fix` | `다음 금융 API 500 에러 시 네이버 fallback 적용` |

> 💡 **`git commit`은 게임 세이브 버튼입니다.** 현재 상태가 영구 저장되고, 메모도 함께 남겨요!

---

# 💻 세이브의 전체 과정 (add → commit)

```bash
# 1️⃣ 현재 상태 확인 (인벤토리 점검)
git status

# 2️⃣ 세이브할 파일 선택 (아이템 골라 담기)
git add app/page.tsx
git add components/chat.tsx

# 3️⃣ 세이브 확정! (메모와 함께 저장)
git commit -m "채팅 UI 컴포넌트 구현"
```

```
📂 작업 폴더 ──git add──> 📋 세이브 준비함 ──git commit──> 💾 세이브 완료!
 (수정한 코드)          (골라 담은 파일)              (영구 저장 + 메모)
```

---

# 🎯 비유: 세이브 기록 돌아보기 📜

## 게임 세이브 목록을 열어보는 것처럼!

```
📜 세이브 기록 목록
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💾 슬롯 bbb1111 — "Upstash Redis로 저장소 교체"        ⬅️ 최신!
💾 슬롯 aaa2222 — "Analytics 대시보드 페이지 구현"
💾 슬롯 9998888 — "이벤트 로그 추적 시스템 구현"
💾 슬롯 7776666 — "예시 질문 랜덤 생성 시스템"
💾 슬롯 5554444 — "다음 금융 API 연동"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

> 💡 어떤 세이브로 돌아갈지 **메모를 보고 판단**할 수 있어요!

---

# 🔗 이것이 Git에서는... git log!

## `git log` = 📜 세이브 기록 목록 보기

```bash
# 세이브 기록 한 줄씩 보기
git log --oneline
```

```
bbb1111 Upstash Redis로 analytics 저장소 교체
aaa2222 Analytics 대시보드 페이지 구현
9998888 이벤트 로그 추적 시스템 구현
7776666 예시 질문 랜덤 생성 시스템
5554444 다음 금융 API 연동
```

앞의 `bbb1111`은 **세이브 슬롯 번호** (커밋 해시)예요!
이 번호로 특정 세이브를 불러올 수 있어요 🕹️

---

# 💻 세이브 기록 관련 명령어

```bash
# 📜 세이브 기록 목록 (한 줄씩)
git log --oneline

# 🔍 현재 변경사항 확인 (아직 세이브 안 한 변경)
git diff

# 📋 현재 상태 확인 (가장 자주 사용!)
git status
```

> 💡 **`git status`는 습관적으로 자주 실행하세요!**
> 현재 상태를 정확히 파악하는 것이 실수를 줄이는 첫걸음이에요 🧭

---

# ✅ 정리: git log = 세이브 기록 보기

> 💡 **`git log`는 세이브 기록 목록을 보는 명령어입니다.**
> 언제, 무엇을 세이브했는지 한눈에 확인할 수 있어요!

---

# 🤔 퀴즈 타임! — Git 기초

### Q1. "세이브 준비함에 담기"에 해당하는 명령어는?

```
A) git commit    B) git add    C) git log    D) git push
```

### Q2. 좋은 커밋 메시지는 어느 쪽?

```
A) "수정"
B) "채팅 말풍선 모바일 반응형 스타일 수정"
```

### Q3. 세이브 기록 목록을 보는 명령어는?

```
A) git status    B) git diff    C) git log    D) git add
```

> 정답: Q1 → **B**, Q2 → **B**, Q3 → **C** 🎉

---

# 🎯 비유: "이건 세이브하지 마!" 목록 🚫

## RPG 게임에서 세이브하면 안 되는 것들

```
🎒 인벤토리 (작업 폴더)
   │
   ├── ⚔️ 전설의 검           → ✅ 세이브!
   ├── 🛡️ 마법 방패           → ✅ 세이브!
   ├── 📜 퀘스트 기록          → ✅ 세이브!
   │
   ├── 🔑 치트키 비밀번호      → 🚫 절대 세이브 금지!
   ├── 🗑️ 임시 버프 아이템     → 🚫 세이브 불필요
   └── 📦 게임 엔진 파일       → 🚫 너무 큼 (500MB+)
```

> 💡 **비밀 정보, 자동 생성되는 것, 거대한 파일**은 세이브에서 제외해야 해요!

---

# 🔗 이것이 Git에서는... .gitignore!

## `.gitignore` = 🚫 "이건 세이브하지 마" 목록

```
📂 프로젝트 폴더
   │
   ├── app/page.tsx           → ✅ Git에 저장
   ├── package.json           → ✅ Git에 저장
   │
   ├── .env.local             → 🚫 API 키! → .gitignore에 등록!
   ├── node_modules/          → 🚫 너무 큼  → .gitignore에 등록!
   └── .next/                 → 🚫 자동 생성 → .gitignore에 등록!
```

> 💡 **`.gitignore`는 "이건 절대 세이브하지 마!"라고 적어둔 목록입니다.**

---

# 💻 우리 프로젝트의 실제 .gitignore

```gitignore
# 📦 의존성 폴더 — 너무 큼! (npm install로 복원 가능)
/node_modules

# 🏗️ 빌드 결과물 — 자동 생성됨
/.next/
/out/

# 🖥️ OS 시스템 파일 — 불필요
.DS_Store

# 🔐 환경변수 파일 — API 키 등 비밀 정보!
.env*.local
```

> ⚠️ **경고**: `.env.local`에 있는 `ANTHROPIC_API_KEY`가 GitHub에 올라가면,
> 누구나 여러분의 API 키로 과금을 발생시킬 수 있어요! 💸

---

# 🎯 비유: 평행 우주 🌌

## 같은 게임에서 두 가지 길을 동시에 탐험하기!

```
🌍 메인 세계 (안정된 버전)
   │
   │── 💾 마을 완성
   │── 💾 상점 구현
   │── 💾 NPC 대화 추가
   │
   ├──────── 🌌 평행 우주 A: "전투 시스템 실험"
   │            └── ⚔️ 전투 시스템 개발 중...
   │
   └──────── 🌌 평행 우주 B: "낚시 미니게임 실험"
                └── 🎣 낚시 시스템 개발 중...
```

메인 세계는 **안전하게 유지**하면서
평행 우주에서 **자유롭게 실험**할 수 있어요! 🧪

---

# 🔗 이것이 Git에서는... Branch!

## Branch(브랜치) = 🌌 평행 우주

```
main ──💾──💾──💾──💾──💾──────────💾── (안정된 배포 버전)
                  │                   │
                  └──💾──💾──💾──💾──┘
                  feature/analytics
                  (새 기능 개발하는 평행 우주)
```

| 게임 비유 | Git 개념 | 설명 |
|----------|---------|------|
| 🌍 메인 세계 | `main` 브랜치 | 안정된 배포 버전 |
| 🌌 평행 우주 | `feature/*` 브랜치 | 새 기능을 실험하는 공간 |
| 🔀 우주 합치기 | `merge` | 실험 성공한 기능을 메인에 합침 |

---

# 💻 브랜치 명령어

```bash
# 🌌 새 평행 우주 만들고 이동하기
git checkout -b feature/analytics

# ✏️ 평행 우주에서 자유롭게 작업 + 세이브
git add .
git commit -m "Analytics 대시보드 구현"

# 🌍 메인 세계로 돌아가기
git checkout main

# 🔀 평행 우주의 성과를 메인 세계에 합치기!
git merge feature/analytics
```

> 💡 **Branch는 평행 우주입니다.** 메인 세계를 안전하게 지키면서 실험할 수 있어요!

---

# 💻 브랜치 이름 규칙 🏷️

## 어떤 이름을 붙여야 할까?

| 브랜치 이름 | 용도 |
|-----------|------|
| `main` | 🌍 배포 가능한 안정 버전 |
| `feature/기능이름` | 🌟 새 기능 개발 |
| `fix/버그이름` | 🔧 버그 수정 |

> 💡 브랜치 이름만 봐도 **무슨 작업인지** 알 수 있게 짓는 것이 중요해요!

---

<!-- _class: lead -->

# Part 2 ☁️
## 클라우드 세이브
### = GitHub 활용

---

# 🎯 비유: 로컬 세이브만 하면 위험해요! 😰

## 내 컴퓨터에만 세이브하면...

```
🖥️ 내 컴퓨터
   └── 💾 세이브 파일들

😱 컴퓨터 고장!
😱 커피 쏟음!
😱 도난!
→ 세이브 전부 소실...
```

> 💡 로컬 세이브만으로는 **안전하지 않아요!** 클라우드 백업이 필요합니다.

---

# 🎯 비유: 클라우드 세이브 있으면 😎

## 클라우드에 백업하면 안전!

```
🖥️ 내 컴퓨터
   └── 💾 세이브 파일들
          │
          │ ☁️ 자동 업로드
          ▼
   ☁️ 클라우드 (구글 드라이브)
   └── 💾 세이브 백업!

😱 컴퓨터 고장! → ☁️ 클라우드에서 복원!
🧑‍🤝‍🧑 팀원 → ☁️ 같은 세이브 공유!
```

> 💡 클라우드 세이브 = 안전한 백업 + 팀 공유!

---

# 🔗 이것이 코딩에서는... GitHub!

## Git = 로컬 세이브 / GitHub = ☁️ 클라우드 세이브

<div class="columns">
<div class="col">

### Git (내 컴퓨터) 🖥️

- 내 컴퓨터에서 실행
- 버전 관리 **도구**
- 오프라인에서도 작동

```
🖥️ 내 컴퓨터
└── .git/ (로컬 세이브 저장소)
    ├── 💾 커밋들
    └── 📜 기록
```

</div>
<div class="col">

### GitHub (인터넷) ☁️

- 클라우드 서비스
- Git 세이브를 **온라인 저장**
- 협업 + 코드 리뷰 기능

```
☁️ github.com
└── ppink-purin/01_stock_hackathon
    ├── 📂 소스 코드
    └── ⚙️ Actions (자동화)
```

</div>
</div>

---

# ✅ 정리: GitHub = 클라우드 세이브

> 💡 **GitHub은 코드의 구글 드라이브입니다.**
> 내 세이브 파일을 안전하게 온라인에 보관하고, 팀원과 공유할 수 있어요!

---

# 🎯 비유: 클라우드에 업로드/다운로드 📤📥

## 게임 세이브를 클라우드에 올리고 내려받기

```
🖥️ 내 컴퓨터                    ☁️ 클라우드 (GitHub)
┌──────────────┐              ┌──────────────┐
│  💾 세이브들  │   📤 Push    │  💾 세이브들  │
│              │ ──────────> │              │
│  (내 작업)   │              │  (온라인 백업)│
│              │   📥 Pull    │              │
│              │ <────────── │              │
└──────────────┘              └──────────────┘
```

| 게임 비유 | Git 명령어 | 설명 |
|----------|-----------|------|
| 📤 클라우드에 업로드 | `git push` | 내 세이브를 GitHub에 올리기 |
| 📥 클라우드에서 다운로드 | `git pull` | GitHub의 최신 세이브를 내려받기 |
| 📦 통째로 복사해오기 | `git clone` | 프로젝트 전체를 처음 가져오기 |

---

# 💻 Push / Pull / Clone 명령어

```bash
# 📤 처음 GitHub에 연결하고 업로드하기
git remote add origin https://github.com/ppink-purin/01_stock_hackathon.git
git push -u origin main

# 📤 이후 업로드 (간단!)
git push

# 📥 최신 변경사항 다운로드
git pull origin main
```

> 💡 **Push는 업로드, Pull은 다운로드입니다.** `git push`로 내 작업을 클라우드에 올려요!

---

# 💻 Clone — 프로젝트 통째로 가져오기

```bash
# 📦 다른 컴퓨터에서 프로젝트 통째로 가져오기
git clone https://github.com/ppink-purin/01_stock_hackathon.git
cd 01_stock_hackathon
npm install    # 의존성 설치 (node_modules는 .gitignore라 안 따라옴!)
```

> 💡 `git clone`은 프로젝트 전체를 **처음** 가져올 때 사용해요.
> 이후에는 `git pull`로 최신 변경사항만 받으면 됩니다!

---

# 🎯 비유: "내 작업 확인해주세요" 요청서 📋

## RPG 게임 길드에서 새 기술을 제안하는 과정

```
🧑‍🎮 민수: "길드장님, 새 전투 스킬을 개발했어요!"

📋 길드 제안서 작성 (Pull Request)
   ├── 제목: "신규 전투 스킬 추가"
   └── 설명: "화염 마법 스킬을 추가했습니다"

👀 길드장 검토 (Code Review)
   └── "밸런스 조정 부탁해요"

✏️ 수정 후 재제출
✅ 길드장 승인 → 🔀 메인 게임에 적용! (Merge)
```

---

# 🔗 이것이 GitHub에서는... Pull Request!

## Pull Request(PR) = 📋 "내 작업 확인해주세요" 요청서

```
[내 평행 우주]                     [메인 세계]
feature/analytics 브랜치    →     main 브랜치
      │                            │
      │   📋 Pull Request 생성     │
      │──────────────────────────>│
      │   👀 팀원들이 코드 리뷰     │
      │<──────────────────────────│
      │   ✏️ 수정 후 업데이트       │
      │──────────────────────────>│
      │   ✅ 승인! 🔀 Merge!      │
      └──────────────────────────>│
```

> 💡 **PR = "제가 이런 변경을 했는데, 한번 봐주시고 합쳐주세요!"**

---

# ✅ 정리: Pull Request = 검토 요청서

> 💡 **Pull Request는 "내 작업을 확인해주세요" 요청서입니다.**
> 코드 리뷰를 거쳐 승인되면 메인 브랜치에 합쳐져요!

---

# 🤔 퀴즈 타임! — GitHub

### Q1. GitHub은 어떤 비유에 해당하나요?

```
A) 게임 세이브    B) 클라우드 세이브    C) 치트키    D) 게임 엔진
```

### Q2. 내 코드를 GitHub에 올리는 명령어는?

```
A) git pull    B) git clone    C) git push    D) git add
```

### Q3. Pull Request의 역할은?

```
A) 파일 삭제    B) 코드 검토 요청    C) 서버 재시작    D) 세이브 삭제
```

> 정답: Q1 → **B**, Q2 → **C**, Q3 → **B** 🎉

---

<!-- _class: lead -->

# Part 3 🔐
## 금고 비밀번호
### = 환경변수 관리

---

# 🎯 비유: 금고 비밀번호는 메모장에 적지 않는다! 🔐

## RPG 게임의 금고 시스템

```
🏦 길드 금고
   │
   ├── 🔑 비밀번호: "dragon1234"
   │
   │   ❌ 이렇게 하면 안 돼요!
   │   → 📋 길드 게시판에 "금고 비밀번호: dragon1234" 공개 게시
   │   → 😱 도둑이 비밀번호를 알게 됨!
   │
   │   ✅ 이렇게 해야 해요!
   │   → 🗝️ 길드장만 아는 금고에 비밀번호를 따로 보관
   │   → 🔒 권한 있는 사람만 접근!
```

---

# 🔗 이것이 코딩에서는... 환경변수!

## 환경변수 = 🔐 금고 비밀번호 (코드에 직접 쓰지 않음!)

<div class="columns">
<div class="col">

### ❌ 코드에 직접 쓰면 위험!

```typescript
// 절대 이렇게 하지 마세요!
const client = new Anthropic({
  apiKey: "sk-ant-abc123..."
  // ↑ 비밀번호가 코드에! 😱
});
```

- 🕵️ 누구나 API 키 확인 가능
- 💸 무단 과금 발생 가능

</div>
<div class="col">

### ✅ 환경변수로 분리하면 안전!

```typescript
// 안전한 방법!
const client = new Anthropic();
// ANTHROPIC_API_KEY를 자동으로
// 금고(환경변수)에서 읽어옴!
```

- 🔒 코드에 비밀 정보 없음
- 🚫 `.gitignore`로 제외

</div>
</div>

---

# 💻 환경변수 파일: .env.local

```bash
# 🔐 .env.local (이 파일은 절대 Git에 올리지 않음!)

# 🤖 Anthropic AI API 키 — 서버 전용
ANTHROPIC_API_KEY=sk-ant-api03-...

# 📊 Upstash Redis — 서버 전용
UPSTASH_REDIS_REST_URL=https://flowing-emu-12345.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXfaAbcd1234...
```

> ⚠️ **원칙**: API 키에는 절대 `NEXT_PUBLIC_`을 붙이지 않아요! 붙이면 전 세계 누구나 볼 수 있게 돼요! 😱

---

# 💻 Next.js 환경변수 규칙 📏

## 접두어에 따라 접근 범위가 달라집니다

| 접두어 | 누가 볼 수 있나? | 예시 |
|--------|--------------|------|
| (접두어 없음) | 🔒 **서버만** (route.ts 등) | `ANTHROPIC_API_KEY` |
| `NEXT_PUBLIC_` | 🌐 **모두** (브라우저에서도!) | `NEXT_PUBLIC_SITE_URL` |

> ⚠️ API 키에는 절대 `NEXT_PUBLIC_`을 붙이지 마세요!

---

# 🎯 비유: 금고 보안 구역 🏦

## 서버 = 금고 안쪽 / 브라우저 = 금고 바깥

```
┌─────────────────────────────────────────────┐
│  🏦 금고 안쪽 (서버 = Vercel)                 │
│                                              │
│  🔑 ANTHROPIC_API_KEY        ← 서버만 접근!  │
│  🔑 UPSTASH_REDIS_REST_URL   ← 서버만 접근!  │
│  🔑 UPSTASH_REDIS_REST_TOKEN ← 서버만 접근!  │
│                                              │
├──────────── 🚧 보안 경계선 🚧 ───────────────┤
│                                              │
│  🌐 금고 바깥 (브라우저 = 사용자 컴퓨터)       │
│  NEXT_PUBLIC_* ← 누구나 볼 수 있음!           │
└─────────────────────────────────────────────┘
```

---

# 💻 우리 프로젝트에서 환경변수 사용 패턴

## 1. Anthropic API 키 — 자동 인식 🤖

```typescript
// app/api/chat/route.ts
const anthropic = new Anthropic();
// SDK가 ANTHROPIC_API_KEY를 자동으로 금고에서 꺼내 씀!
```

## 2. Upstash Redis — 명시적 사용 📊

```typescript
// lib/analytics/logger.ts
function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}
```

---

# 😱 실수로 비밀번호를 공개하면...

## API 키가 GitHub에 올라갔을 때 벌어지는 일

```
1️⃣ 개발자가 .env.local을 실수로 git add 😰
2️⃣ git push → GitHub에 API 키 노출! 😱
3️⃣ GitHub을 24시간 스캔하는 봇들이 감지 🤖
4️⃣ 수 분 내에 API 키가 탈취됨! 🕵️
5️⃣ 누군가 탈취한 키로 대량 API 호출 💣
6️⃣ 수십~수백만 원의 과금 발생! 💸💸💸
```

> 💡 `.gitignore` 규칙 `.env*.local`이 이 실수를 방지해줘요!

---

# 😱 만약 실수로 올렸다면? 🆘

## 즉시 대응 방법

- **즉시** 해당 API 키를 무효화 (대시보드에서 revoke)
- 새 API 키를 발급
- `.gitignore`에 `.env.local` 추가 확인

> 💡 **환경변수는 금고 비밀번호처럼, 코드에 직접 쓰지 않고 따로 보관합니다.**
> `.env.local` 파일에 저장하고, `.gitignore`로 GitHub 업로드를 차단해요!

---

# 🤔 퀴즈 타임! — 환경변수

### Q1. API 키를 코드에 직접 쓰면 안 되는 이유는?

```
A) 코드가 느려져서    B) GitHub에 올라가면 노출되니까
C) 파일이 커져서      D) 컴파일 에러가 나서
```

### Q2. .env.local 파일은 Git에 올라가나요?

```
A) 네, 항상 올라갑니다    B) 아니요, .gitignore가 차단합니다
```

### Q3. 브라우저에서도 볼 수 있는 환경변수 접두어는?

```
A) SECRET_    B) PRIVATE_    C) NEXT_PUBLIC_    D) SERVER_
```

> 정답: Q1 → **B**, Q2 → **B**, Q3 → **C** 🎉

---

<!-- _class: lead -->

# Part 4 🍽️
## 신메뉴 출시
### = Vercel 배포

---

# 🎯 비유: 레스토랑 신메뉴 출시 과정 🍽️

## 요리를 개발해서 손님에게 제공하기까지

```
👨‍🍳 주방 (로컬 개발)
   │
   │ 1️⃣ 새 레시피 개발 (코드 작성)
   │ 2️⃣ 주방에서 시식 (npm run dev)
   │
   ▼
📋 레시피 등록 (GitHub Push)
   │
   ▼
🏭 대량 조리 준비 (빌드) → 🍽️ 손님에게 서빙! (배포 완료!)
```

> 💡 주방에서 개발 → 레시피 등록 → 자동 조리 → 전 세계 서빙!

---

# 🔗 이것이 코딩에서는... Vercel 배포!

## Vercel = 🍽️ 전 세계 체인 레스토랑

- Next.js **공식** 배포 플랫폼
- 🌐 **글로벌 CDN** (전 세계 배달)
- GitHub 연동 → **자동 배포**
- 🔒 HTTPS 기본 제공
- 💰 **무료 티어** (Hobby Plan)

> 🌐 우리 프로젝트 배포 URL: **https://01stockhackathon.vercel.app**

---

# 🔗 서버리스란? 🏪

## Vercel의 핵심 실행 방식

```
🏪 기존 방식 (24시간 편의점):
→ 손님 없어도 직원 대기
→ 항상 비용 발생 💸

🛎️ 서버리스 (콜택시):
→ 호출할 때만 차가 옴
→ 사용한 만큼만 비용! 💰
```

우리의 `route.ts`가 바로 서버리스!
요청이 올 때만 실행되고 끝남

> 💡 서버리스 = 요청이 올 때만 실행 → 비용 절약!

---

# 💻 Vercel 무료 티어로 충분해요!

| 항목 | 무료 제한 | 우리 프로젝트 |
|------|---------|-------------|
| ⏱️ 서버리스 함수 실행 | 최대 60초 (기본) | `maxDuration = 120` 설정 |
| 📊 대역폭 | 월 100GB | 학습/데모용으로 충분 |
| 🏗️ 빌드 시간 | 월 6,000분 | 1회 빌드 1-2분 |
| 🔄 프리뷰 배포 | 무제한 | 마음껏 테스트 가능! |
| 🌐 HTTPS | 자동 | 보안 걱정 없음 |

> 💡 학습/데모/소규모 프로젝트에는 무료 티어로 **충분합니다!** 🎉

---

# 🎯 비유: 신메뉴 자동 출시 시스템 🤖🍽️

## 레시피를 등록하면 자동으로 전 세계에 출시!

```
👨‍🍳 주방 (로컬)          📋 레시피북 (GitHub)      🍽️ 레스토랑 (Vercel)
      │                        │                     │
      │  📤 레시피 등록         │                     │
      │  (git push)           │                     │
      │──────────────────────>│                     │
      │                        │  🔔 "새 레시피!"     │
      │                        │────────────────────>│
      │                        │           📦 재료 준비  │
      │                        │           🏭 대량 조리  │
      │                        │           🍽️ 서빙 개시! │
```

**한번 설정하면, `git push`만 하면 자동 배포!** 🚀

---

# 💻 Vercel 자동 배포 설정 (한 번만!)

### 설정 방법 (5단계)

```
1️⃣ Vercel 대시보드 → New Project
2️⃣ Import Git Repository → GitHub 계정 연결
3️⃣ ppink-purin/01_stock_hackathon 선택
4️⃣ 환경변수 3개 설정:
    🔑 ANTHROPIC_API_KEY
    🔑 UPSTASH_REDIS_REST_URL
    🔑 UPSTASH_REDIS_REST_TOKEN
5️⃣ Deploy 클릭! 🚀
```

> 💡 이후부터는 `git push`만 하면 끝! 나머지는 Vercel이 알아서 해줘요!

---

# ✅ 정리: Vercel 배포 = 신메뉴 출시

> 💡 **Vercel 배포는 레시피를 등록하면 자동으로 전 세계에 출시되는 시스템입니다.**
> `git push`만 하면 빌드부터 배포까지 전부 자동!

---

# 🎯 비유: 레고 조립 설명서대로 완성품 만들기 🧱

## "빌드"란 뭘까요?

```
📝 레고 설명서 (소스 코드)
   │
   │  🏭 조립 공정 (빌드 과정)
   │  ├── 1️⃣ 부품 확인 (npm install)
   │  ├── 2️⃣ 설명서 검증 (TypeScript 타입 체크)
   │  ├── 3️⃣ 조립 시작 (코드 변환 + 최적화)
   │  └── 4️⃣ 완성품 포장 (번들링)
   │
   ▼
🏗️ 완성된 레고 성 (배포 가능한 앱!)
```

> 💡 **빌드 = 사람이 쓴 코드를 컴퓨터가 이해할 수 있는 완성품으로 조립하는 과정**

---

# 🔗 이것이 코딩에서는... npm run build!

## `npm run build` = 🧱 레고 조립!

```bash
# 레고 조립 시작!
npm run build
```

| 검증 항목 | 레고 비유 |
|----------|---------|
| TypeScript 타입 체크 | 🧩 부품 모양이 맞는지 확인 |
| Import 경로 확인 | 📋 부품 번호가 맞는지 확인 |
| 환경변수 참조 | 🔑 필요한 열쇠가 있는지 확인 |
| 페이지 렌더링 | 🏗️ 설명서대로 조립 가능한지 확인 |

> 💡 **원칙**: `npm run build`가 로컬에서 성공해야 Vercel에서도 성공해요!

---

# 🎯 비유: 시식 코너 (프리뷰 배포) 🍴

## 정식 출시 전에 먼저 맛보기!

```
🍽️ 정식 메뉴 (Production)
   https://01stockhackathon.vercel.app
   → 😊 손님들이 먹고 있는 현재 메뉴

🍴 시식 코너 (Preview)
   https://01-stock-hackathon-git-feature-xxx.vercel.app
   → 🧑‍🍳 "이 새 메뉴 맛 좀 봐주세요~"
   → 정식 메뉴에 영향 없이 시식 가능!
```

> 💡 **프리뷰 배포 = 정식 서비스를 건드리지 않고 안전하게 테스트하는 환경!**

---

# 🔗 프리뷰 배포 워크플로우 🍴

## feature 브랜치 → 시식 → 정식 출시

```
1️⃣ feature/analytics 브랜치에서 작업
2️⃣ git push → Vercel이 자동으로 시식 코너(프리뷰) 만듦
3️⃣ 시식 코너 URL로 테스트 🍴
4️⃣ 문제 없으면 main에 merge
5️⃣ main merge → 정식 메뉴로 자동 출시! 🍽️
```

> 💡 **프리뷰 배포는 정식 출시 전 시식 코너입니다.**
> 현재 서비스에 영향 없이, 새 기능을 안전하게 테스트할 수 있어요!

---

# 🎯 비유: 이전 세이브 불러오기 (롤백) ⏪

## 새 메뉴가 실패했을 때... 이전 메뉴로 복귀!

```
🍽️ 배포 기록 (세이브 목록)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💾 3시간 전   "Analytics 대시보드 추가"    ⬅️ 현재 (문제!)
💾 1일 전     "예시 질문 마키 스크롤"      ⬅️ 이걸로 롤백!
💾 2일 전     "다음 금융 API 연동"
💾 3일 전     "초기 배포"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

> 💡 Vercel 대시보드에서 이전 배포를 선택하고 **"Promote to Production"** 클릭 → 즉시 복원!

---

# 🔗 이것이 Vercel에서는... Rollback!

## 롤백이 빠른 이유 ⚡

```
🎮 게임 세이브 불러오기처럼 빠릅니다!

✅ Vercel은 모든 배포를 보관함
✅ 이전 배포로 전환 = 트래픽 방향만 바꿈 (재빌드 없음!)
✅ 수 초 내에 복원 완료!
```

| 롤백 비유 | 설명 |
|----------|------|
| 🎮 이전 세이브 불러오기 | 문제 발생 시 즉시 이전 상태로 복구 |
| ⏱️ 로딩 시간 | 수 초 (재빌드 필요 없음!) |
| 🛡️ 안전망 | 실패해도 언제든 돌아갈 수 있다는 안심감 |

---

# 🎯 비유: Vercel 환경변수 = 레스토랑 금고 🏦🍽️

## 주방(서버)에만 있는 비밀 레시피

```
🍽️ 레스토랑 (Vercel)
   │
   ├── 🏦 주방 금고 (환경변수 설정)
   │      ├── 🔑 ANTHROPIC_API_KEY = sk-ant-...
   │      ├── 🔑 UPSTASH_REDIS_REST_URL = https://...
   │      └── 🔑 UPSTASH_REDIS_REST_TOKEN = AXfa...
   │
   ├── 🍽️ 정식 메뉴 (Production) → 금고 접근 가능
   ├── 🍴 시식 코너 (Preview) → 금고 접근 가능
   └── 🧪 연습 주방 (Development) → 금고 접근 가능
```

> 💡 Vercel 대시보드 → Settings → Environment Variables에서 설정!

---

# 💻 Vercel 환경변수 주의사항

| 문제 | 증상 | 해결 |
|------|------|------|
| 🔤 값에 따옴표 포함 | API 인증 실패 | 따옴표 없이 값만 입력 |
| ↵ 줄바꿈 포함 | `Invalid API key` 에러 | 줄바꿈 제거하고 입력 |
| 🔄 변경 후 반영 안 됨 | 이전 값으로 동작 | **재배포(Redeploy)** 필요! |

```bash
# ❌ 잘못된 예 (따옴표가 값에 포함됨)
"sk-ant-api03-..."

# ✅ 올바른 예 (따옴표 없이!)
sk-ant-api03-...
```

> ⚠️ **중요**: 환경변수를 변경한 후에는 **반드시 재배포**해야 반영돼요!

---

# 🤔 퀴즈 타임! — Vercel 배포

### Q1. Vercel에서 "빌드"란 무엇인가요?

```
A) 코드 삭제    B) 레고 설명서대로 완성품 만들기
C) 서버 재시작  D) 파일 다운로드
```

### Q2. 프리뷰 배포는 어떤 비유에 해당하나요?

```
A) 정식 메뉴    B) 시식 코너    C) 레시피    D) 금고
```

### Q3. 배포 후 문제가 생기면 어떻게 하나요?

```
A) 컴퓨터 재시작    B) 처음부터 다시 만들기
C) 이전 세이브 불러오기 (롤백)    D) 아무것도 안 함
```

> 정답: Q1 → **B**, Q2 → **B**, Q3 → **C** 🎉

---

<!-- _class: lead -->

# Part 5 🏭
## 자동 품질검사 컨베이어 벨트
### = CI/CD

---

# 🎯 비유: 자동 품질검사 컨베이어 벨트 🏭

## 공장에서 제품이 자동으로 검사되고 출하되는 시스템

```
🏭 자동화 공장 (CI/CD 파이프라인)

📦 원재료 투입     🔍 품질 검사       📤 출하!
  (코드 제출)    (자동 빌드+테스트)   (자동 배포)
     │               │                │
     ▼               ▼                ▼
  ┌─────┐       ┌─────────┐      ┌──────┐
  │ 📝  │ ───> │  🔍🔍🔍  │ ──> │  📤  │
  │코드  │       │ 자동 검사 │      │ 출하! │
  └─────┘       └─────────┘      └──────┘
```

**사람이 일일이 검사하지 않아도, 컨베이어 벨트가 자동으로!** 🤖

---

# 🔗 이것이 코딩에서는... CI/CD!

## CI = 지속적 통합 🔍 / CD = 지속적 배포 📤

<div class="columns">
<div class="col">

### CI (Continuous Integration)

1. 개발자가 코드 변경
2. `git push`
3. **자동으로 빌드 & 검사** 🏭
4. 문제 있으면 즉시 알림 🚨

**핵심**: 문제를 **빨리** 발견!

</div>
<div class="col">

### CD (Continuous Deployment)

1. CI 통과 (검사 합격!) ✅
2. **자동으로 배포** 🚀
3. 사용자가 바로 새 버전 이용

**핵심**: 빠르고 **안정적인** 배포!

</div>
</div>

---

# 💻 GitHub + Vercel = 자동 CI/CD!

## 우리 프로젝트의 자동화 흐름

```
👨‍🍳 개발자 ──git push──> 📋 GitHub ──🔔──> 🏭 Vercel
                                              │
                                    ┌─────────┴─────────┐
                                    │ 1️⃣ npm install     │
                                    │ 2️⃣ npm run build   │
                                    │ 3️⃣ TypeScript 검증  │
                                    │ 4️⃣ CDN 배포        │
                                    └─────────┬─────────┘
                                              │
                                    ✅ 성공 → 자동 배포! 🎉
                                    ❌ 실패 → 이전 버전 유지
```

> 💡 `git push`만 하면 **나머지는 전부 자동!** 🤖

---

# 🎯 비유: 빌드 에러 = 레고 부품 불량 🧱❌

## 조립할 때 부품이 안 맞으면 완성 불가!

```
🧱 빌드 에러 상황
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ 부품 모양 안 맞음 = TypeScript 타입 에러
❌ 부품 번호 틀림   = Import 경로 에러
❌ 부품 누락       = 패키지 미설치
❌ 설명서 모순     = 설정 파일 오류
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

```bash
# 배포 전에 반드시 로컬에서 먼저 조립 테스트!
npm run build
# ✅ 성공 → git push → Vercel 배포 OK!
# ❌ 실패 → 에러 메시지 확인 → 수정 → 다시 빌드
```

---

# 💻 자주 만나는 빌드 에러와 해결법

| 에러 메시지 | 레고 비유 | 해결 방법 |
|------------|---------|----------|
| `Type error` | 🧩 부품 모양 안 맞음 | 타입 수정 |
| `Module not found` | 📦 부품 누락 | `npm install 패키지명` |
| `FUNCTION_INVOCATION_TIMEOUT` | ⏱️ 조립 시간 초과 | `maxDuration` 값 증가 |
| `500 Internal Server Error` | 🔑 열쇠 분실 | 환경변수 확인 |
| `Build failed` | 🏗️ 설명서 오류 | `npm run build`로 로컬 확인 |

> 💡 **이상한 에러가 나면?** Vercel 대시보드에서 **"캐시 없이 재배포"**를 먼저 시도!

---

# 🗺️ Next.js 서버리스 설정 이해하기

## 우리 프로젝트의 route.ts 핵심 설정

```typescript
// app/api/chat/route.ts

export const runtime = "nodejs";     // 🏪 실행 환경 지정
export const maxDuration = 120;      // ⏱️ 최대 실행 시간 (120초)
```

### 왜 maxDuration이 120초인가? ⏱️

```
🤖 AI 채팅 응답 과정:
   1️⃣ 사용자 질문 수신
   2️⃣ Claude API 호출 (생각 중...)
   3️⃣ 금융 데이터 도구 호출 (최대 10번 반복!)
   4️⃣ 최종 답변 전달
→ 복잡한 질문은 60초로 부족! → 120초로 설정 ✅
```

---

# 📋 배포 전 체크리스트

## 출시 전 최종 점검표 ✅

```
🚀 배포 전 체크리스트
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[ ] 1️⃣ 로컬 빌드 성공 확인
      $ npm run build → "Build completed" ✅

[ ] 2️⃣ 환경변수 설정 확인 (Vercel 대시보드)
      → 🔑 ANTHROPIC_API_KEY
      → 🔑 UPSTASH_REDIS_REST_URL
      → 🔑 UPSTASH_REDIS_REST_TOKEN
```

> 💡 배포 전에 반드시 로컬 빌드와 환경변수를 확인하세요!

---

# 📋 배포 전 체크리스트 (계속)

## 추가 점검 항목

```
[ ] 3️⃣ .gitignore 확인
      → 🚫 .env.local 포함되어 있는지?
      → 🚫 node_modules 포함되어 있는지?

[ ] 4️⃣ git status 깨끗한지?
      → 커밋 안 한 파일이 없는지?

[ ] 5️⃣ 기능 테스트
      → 💬 채팅이 작동하는지?
      → 📊 금융 데이터가 조회되는지?
```

> 💡 체크리스트를 하나씩 확인하면 배포 실패를 예방할 수 있어요!

---

# 🔐 보안 체크리스트

## 배포 시 반드시 확인할 보안 사항

| ✅ | 항목 | 설명 |
|------|------|------|
| [ ] | `.env.local`이 `.gitignore`에 포함 | 🔐 API 키 보호 |
| [ ] | API 키에 `NEXT_PUBLIC_` 없음 | 🌐 클라이언트 노출 방지 |
| [ ] | Vercel 환경변수 올바르게 설정됨 | 🏦 금고 열쇠 확인 |
| [ ] | route.ts에서만 환경변수 접근 | 🔒 서버 전용 확인 |
| [ ] | 에러 메시지에 민감 정보 없음 | 🛡️ 내부 정보 보호 |

> 💡 보안 체크리스트를 꼭 확인하고 배포하세요!

---

# 🔐 우리 프로젝트 보안 구조

## 브라우저에서는 API 키를 절대 알 수 없음!

```
🔒 우리 프로젝트 보안 구조:
  서버 (안전): route.ts → ANTHROPIC_API_KEY (자동 읽기)
  서버 (안전): logger.ts → UPSTASH_* (명시적 읽기)
  브라우저: chat.tsx → fetch("/api/chat") (API 키 없이 호출!)
  → 브라우저에서는 API 키를 절대 알 수 없음! 🔒
```

> 💡 클라이언트는 `/api/chat`만 호출하고, 실제 API 키는 서버에만 존재합니다.

---

# 🌐 전체 배포 파이프라인 한눈에 보기

```
[1] 👨‍🍳 로컬 개발 (주방)
    코드 작성 → npm run dev → 브라우저에서 테스트
         │
[2] 💾 게임 세이브 (Git 커밋)
    git add . → git commit -m "기능 추가"
         │
[3] 🧱 레고 조립 테스트 (빌드 검증)
    npm run build → TypeScript + 번들 검증
         │
[4] ☁️ 클라우드 업로드 (GitHub Push)
    git push → GitHub에 업로드
```

> 💡 로컬 개발 → 세이브 → 빌드 검증 → 클라우드 업로드 순서를 기억하세요!

---

# 🌐 전체 배포 파이프라인 (계속)

```
[5] 🏭 자동 품질검사 (Vercel CI/CD)
    GitHub 감지 → 자동 빌드 → 자동 검사
         │
[6] 🍽️ 신메뉴 출시! (배포 완료)
    빌드 성공 → 글로벌 CDN 배포
         │
[7] 🌐 손님 방문!
    https://01stockhackathon.vercel.app
```

> 💡 `git push` 이후는 Vercel이 자동으로 처리합니다!

---

# 📝 핵심 명령어 모음 — Git 기본 🎮

```bash
# ── 🎮 게임 세이브 (Git 기본) ──
git status                      # 📋 인벤토리 점검
git add app/ components/        # 🎒 세이브할 아이템 선택
git commit -m "채팅 UI 개선"     # 💾 세이브! (메모 포함)
git log --oneline               # 📜 세이브 기록 보기
git diff                        # 🔍 변경사항 확인
```

> 💡 `git status` → `git add` → `git commit` 이 흐름을 습관화하세요!

---

# 📝 핵심 명령어 모음 — GitHub & 브랜치 ☁️🌌

```bash
# ── ☁️ 클라우드 세이브 (GitHub) ──
git push origin main            # 📤 클라우드에 업로드
git pull origin main            # 📥 클라우드에서 다운로드
git clone <URL>                 # 📦 통째로 가져오기

# ── 🌌 평행 우주 (브랜치) ──
git checkout -b feature/xxx     # 🌌 새 평행 우주 만들기
git checkout main               # 🌍 메인 세계로 돌아가기
git merge feature/xxx           # 🔀 평행 우주 합치기
```

> 💡 `npm run build` 성공 확인 후 `git push` → Vercel 자동 배포! 🚀

---

# 🗺️ 오늘 배운 비유 총정리

| 기술 개념 | 일상 비유 | 핵심 |
|----------|---------|------|
| **Git** | 🎮 게임 세이브 시스템 | 이전 세이브로 돌아갈 수 있음 |
| **git add** | 🎒 세이브할 아이템 선택 | 원하는 파일만 골라 담기 |
| **git commit** | 💾 게임 세이브 + 메모 | 현재 상태 저장 |
| **git log** | 📜 세이브 기록 보기 | 지금까지의 기록 확인 |
| **Branch** | 🌌 평행 우주 | 메인을 안전하게 유지하며 실험 |

> 💡 Git = 게임 세이브, GitHub = 클라우드 세이브로 기억하세요!

---

# 🗺️ 오늘 배운 비유 총정리 (계속)

| 기술 개념 | 일상 비유 | 핵심 |
|----------|---------|------|
| **GitHub** | ☁️ 클라우드 세이브 | 온라인 백업 + 팀 공유 |
| **Push/Pull** | 📤📥 업로드/다운로드 | 클라우드와 동기화 |
| **.gitignore** | 🚫 세이브 제외 목록 | 비밀번호, 큰 파일 제외 |
| **환경변수** | 🔐 금고 비밀번호 | 코드에 직접 쓰지 않음 |
| **Pull Request** | 📋 검토 요청서 | 코드 리뷰 후 승인 |

> 💡 이 비유들을 기억하면, Git과 배포가 더 이상 무섭지 않아요!

---

# 🗺️ 오늘 배운 비유 총정리 (완료)

| 기술 개념 | 일상 비유 | 핵심 |
|----------|---------|------|
| **Vercel 배포** | 🍽️ 신메뉴 출시 | 전 세계에 서비스 공개 |
| **빌드** | 🧱 레고 조립 | 설명서대로 완성품 만들기 |
| **프리뷰 배포** | 🍴 시식 코너 | 정식 출시 전 테스트 |
| **롤백** | ⏪ 이전 세이브 불러오기 | 문제 시 즉시 복원 |
| **CI/CD** | 🏭 자동 품질검사 벨트 | 자동 검사 + 자동 배포 |

> 🎉 **이 비유들을 기억하면, Git과 배포가 더 이상 무섭지 않아요!**

---

# ❓ 자주 묻는 질문 (FAQ) — Part 1

### Q1: GitHub에 올린 코드를 누구나 볼 수 있나요?

Public Repository는 누구나 볼 수 있지만, **Private으로 설정하면 초대한 사람만** 접근 가능해요.

### Q2: Vercel 무료 티어로 실제 서비스를 운영할 수 있나요?

학습/데모/소규모에는 충분해요! 대규모 트래픽에는 Pro Plan이 필요합니다.

> 💡 우리 프로젝트처럼 학습 목적이라면 무료 티어로 충분합니다!

---

# ❓ 자주 묻는 질문 (FAQ) — Part 2

### Q3: 환경변수를 변경하면 바로 반영되나요?

아니요! **재배포(Redeploy)** 해야 반영돼요. 🔄

### Q4: 빌드가 실패하면 기존 배포는 어떻게 되나요?

**기존 배포는 그대로 유지**돼요! Vercel은 빌드 성공 시에만 교체합니다. (안전!) 🛡️

> 💡 Vercel은 빌드 실패 시 이전 버전을 유지하므로 안심하세요!

---

# 🤔 최종 퀴즈 타임!

### 민수의 하루를 올바른 순서로 나열해보세요!

```
A) git push origin main
B) npm run build
C) git add app/ components/
D) 코드 작성 (파일 수정)
E) git commit -m "새 기능 추가"
F) Vercel이 자동으로 배포!
```

### 정답:

```
D → C → E → B → A → F
코드작성 → 파일선택 → 세이브 → 빌드테스트 → 클라우드업로드 → 자동배포!
  ✏️        🎒       💾       🧱          📤             🚀
```

---

<!-- _class: lead -->

# 🎉 수고하셨습니다!
## 질문 & 답변

<br>

오늘 배운 핵심:

🎮 **Git**으로 게임 세이브하고
☁️ **GitHub**으로 클라우드에 올리고
🔐 **환경변수**로 비밀번호를 지키고
🍽️ **Vercel**로 전 세계에 출시하고
🏭 **CI/CD**로 자동 품질검사한다!

🌐 배포 URL: https://01stockhackathon.vercel.app
📂 GitHub: https://github.com/ppink-purin/01_stock_hackathon
