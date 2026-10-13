# yuyeol3 GitHub 공개 저장소 조사

조사일: 2026-10-14

대상: 요청에 지정된 저장소 19개 전부

조사 방식: 인증된 GitHub API의 저장소 메타데이터, 기본 브랜치의 recursive tree, README(루트 README가 없으면 트리에서 README 이름의 문서를 탐색)를 읽고, 유형 판별에 필요한 매니페스트·진입점·핵심 로직을 추가로 확인했다. 원격 저장소는 변경하지 않았고, 내려받은 코드는 실행하지 않았다. `fork` 메타데이터는 19개 모두 `false`였다. 아래 분류는 이름만으로 결정하지 않고 README와 파일 구성을 함께 반영했다.

## 분류 기준과 전체 판단

| category id | 사용 기준 |
|---|---|
| `ai-tools` | AI를 사용자 기능으로 표방하는 앱. 실제 AI 호출 여부와 시연용 Mock 여부를 별도로 표시 |
| `web` | 일반 웹앱, 프론트엔드·백엔드 웹서비스, 블로그 |
| `games` | 게임 자체와 그 멀티플레이 구성요소 |
| `learning` | 학습·연습·과제·개발자 교육 자료 |
| `data` | 데이터 분석·시각화가 중심인 결과물 |
| `presentations` | 발표 자료 |
| `other` | 독립 사용자 앱이 아닌 배포 산출물 등 |

제안된 분류는 대부분 충분하다. 이미지 시간표 생성기처럼 독립된 로컬 유틸리티를 `learning`이나 `web`에 섞지 않으려면 `tools`를 추가할 만하다. `yacht-dist`는 독립 작품으로 노출하기보다 관련 Yacht 항목의 배포 링크/산출물로 연결하는 편이 적절하다. `data`에 명확히 해당하는 독립 저장소는 이번 목록에서 확인되지 않았다.

## 저장소별 조사

### 1. [sw-problem-solving-presentation](https://github.com/yuyeol3/sw-problem-solving-presentation)

- **목적·유형:** Y-Fin 청년 예·적금 추천 서비스의 백엔드 개발 기여를 설명하는 Reveal.js 발표물. `index.html`의 제목·본문에 Y-Fin, 개인 기여 발표, 데이터 파이프라인·추천 로직·API가 명시되고 `reveal/` 런타임과 6개 화면 이미지가 있다. 실제 서비스 소스 저장소가 아니라 발표 자료다.
- **스택:** HTML/CSS/JavaScript, Reveal.js, Reveal highlight/notes 플러그인, PNG 화면 자료.
- **추천 분류:** `presentations`.
- **관련 저장소:** 이 발표가 설명하는 Y-Fin 백엔드 구현 저장소는 지정 목록에서 확인되지 않음.
- **근거:** [index.html](https://github.com/yuyeol3/sw-problem-solving-presentation/blob/main/index.html), [assets](https://github.com/yuyeol3/sw-problem-solving-presentation/tree/main/assets), [reveal](https://github.com/yuyeol3/sw-problem-solving-presentation/tree/main/reveal).
- **불확실성:** 트리에 README가 없다. 발표 HTML을 조사했으며 별도 소스 서비스 저장소와의 연결은 추정하지 않았다.

### 2. [tax-agent-prototype](https://github.com/yuyeol3/tax-agent-prototype)

- **목적·유형:** 프리랜서 카드 지출을 필요경비 후보·보류·불인정으로 보여주고, 사용자 답변에 따라 결과가 바뀌는 시연용 프론트엔드 프로토타입. README가 실제 인증·파일 파싱·AI 판정·법령 검색·이메일은 Mock이라고 명시한다. 화면의 단계 이름이 AI 흐름을 묘사해도 실제 AI 연동으로 분류할 근거는 없다.
- **스택:** Next.js 16, React 19, TypeScript, Lucide. `src/lib/expenses.ts`에는 상태 집계와 답변 분류의 결정적 로직 및 테스트 파일이 있다.
- **추천 분류:** `ai-tools` (단, 상세 설명에 **AI 미연동·Mock 프로토타입**을 명시). AI 구현 사례로 소개하면 안 된다.
- **관련 저장소:** 독립 저장소.
- **근거:** [README.md](https://github.com/yuyeol3/tax-agent-prototype/blob/main/README.md), [package.json](https://github.com/yuyeol3/tax-agent-prototype/blob/main/package.json), [src/app/page.tsx](https://github.com/yuyeol3/tax-agent-prototype/blob/main/src/app/page.tsx), [src/lib/expenses.ts](https://github.com/yuyeol3/tax-agent-prototype/blob/main/src/lib/expenses.ts).
- **불확실성:** README의 데모 설명과 코드의 클라이언트 상태 흐름을 확인했다. 실제 세무 판정 정확도나 외부 연동은 평가 대상이 아니며 구현되어 있지 않다고 README가 밝힌다.

### 3. [tdd-skill](https://github.com/yuyeol3/tdd-skill)

- **목적·유형:** Red→Green→Refactor의 실행 검증, 테스트 수준 선택, 기존 테스트 진단을 안내하는 Claude Code용 TDD 스킬과 참고 문서. 설치 가능한 프롬프트/지침 패키지이지 일반 웹앱은 아니다.
- **스택:** Markdown 기반 Claude Code Skill frontmatter 및 지침. 빌드 매니페스트는 없음.
- **추천 분류:** `learning`.
- **관련 저장소:** `test`와 주제가 테스트·학습이라는 점은 닿지만 저장소 간 의존성은 확인되지 않음.
- **근거:** [README.md](https://github.com/yuyeol3/tdd-skill/blob/main/README.md), [tdd/SKILL.md](https://github.com/yuyeol3/tdd-skill/blob/main/tdd/SKILL.md), [references](https://github.com/yuyeol3/tdd-skill/tree/main/tdd/references).
- **불확실성:** 스킬이 실제 Claude Code 환경에서 동작하는지는 실행하지 않았다. 저장소 문서와 파일 구조를 기준으로 분류했다.

### 4. [test](https://github.com/yuyeol3/test)

- **목적·유형:** README 설명상 Introduction to Unix 수업용 테스트 저장소. 트리는 README와 `hw.c` 두 파일뿐이므로 과제·연습 샘플로 보는 것이 타당하다.
- **스택:** C 소스 1개와 README. 별도 빌드 매니페스트 없음.
- **추천 분류:** `learning`.
- **관련 저장소:** 확인된 연결 없음.
- **근거:** [README.md](https://github.com/yuyeol3/test/blob/main/README.md), [hw.c](https://github.com/yuyeol3/test/blob/main/hw.c).
- **불확실성:** `hw.c`는 재귀 트리에서 확인했지만 이번 조사 환경의 GitHub 콘텐츠 API가 본문을 반환하지 않았다. 따라서 소스 내용·과제 기능은 주장하지 않는다.

### 5. [timetable-generator](https://github.com/yuyeol3/timetable-generator)

- **목적·유형:** 강의 시간표를 충돌 고려해 PNG 이미지로 그리는 Python 유틸리티. `Subject.py`가 강의 시간 변환·모델을, `TimeTableGenerator.py`가 PIL 이미지 생성과 과목 배치를 담당한다. README의 예제는 모듈을 직접 불러 시간표를 생성한다.
- **스택:** Python, Pillow, 폰트·이미지 자산. `requirements.txt`에는 pandas, NumPy, openpyxl 등도 포함되어 있다.
- **추천 분류:** `tools` (분류 추가 권고). 기존 ID만 써야 한다면 `other`; 학습 목적을 별도로 확인하지 않은 상태에서 `learning`으로 단정하지 않는 편이 맞다.
- **관련 저장소:** 확인된 연결 없음.
- **근거:** [README.md](https://github.com/yuyeol3/timetable-generator/blob/main/README.md), [TimeTableGenerator.py](https://github.com/yuyeol3/timetable-generator/blob/main/TimeTableGenerator.py), [Subject.py](https://github.com/yuyeol3/timetable-generator/blob/main/Subject.py), [requirements.txt](https://github.com/yuyeol3/timetable-generator/blob/main/requirements.txt), [images와 fonts](https://github.com/yuyeol3/timetable-generator/tree/main).
- **불확실성:** README에 CSV/엑셀 입력 흐름은 확인되지 않아 의존성 목록만으로 그런 기능을 주장하지 않는다. 실행 검증은 하지 않았다.

### 6. [vanilaJsRouting](https://github.com/yuyeol3/vanilaJsRouting)

- **목적·유형:** 해시와 History API를 이용한 바닐라 JavaScript 단일 페이지 라우팅 연습. 세 개의 간단한 페이지 함수와 404 라우트가 구현되어 있다.
- **스택:** 브라우저 JavaScript와 HTML. 프레임워크·빌드 매니페스트 없음.
- **추천 분류:** `learning`.
- **관련 저장소:** 확인된 연결 없음.
- **근거:** [index.html](https://github.com/yuyeol3/vanilaJsRouting/blob/main/index.html), [index.js](https://github.com/yuyeol3/vanilaJsRouting/blob/main/index.js), [route.js](https://github.com/yuyeol3/vanilaJsRouting/blob/main/route.js), [pages.js](https://github.com/yuyeol3/vanilaJsRouting/blob/main/pages.js).
- **불확실성:** README가 없고 규모가 작다. 기능 실험용 학습 샘플이라는 평가는 파일 구성에 근거한다.

### 7. [vibe-coding-practice-](https://github.com/yuyeol3/vibe-coding-practice-)

- **목적·유형:** 부산 축제 정보를 조회하는 “축제해, 부산” 웹앱. README는 create-next-app 기본 안내로 남아 있지만, 별도 PRD와 실제 페이지·API 라우트·필터/상세 UI 구성요소가 있어 빈 스타터로만 분류하면 부정확하다. 서버 페이지에서 축제 데이터를 가져와 클라이언트 페이지에 전달한다.
- **스택:** Next.js 16, React 19, TypeScript, Tailwind CSS 4 계열. 부산 축제 공공 API 연동을 위한 `src/lib/api.ts`, `src/app/api/festivals/route.ts` 존재.
- **추천 분류:** `web`.
- **관련 저장소:** `vibe-coding-practice-` 자체 독립 프로젝트. 다른 지정 저장소와의 코드 연결은 확인되지 않음.
- **근거:** [README.md](https://github.com/yuyeol3/vibe-coding-practice-/blob/main/README.md), [prd.md](https://github.com/yuyeol3/vibe-coding-practice-/blob/main/prd.md), [package.json](https://github.com/yuyeol3/vibe-coding-practice-/blob/main/package.json), [src/app/page.tsx](https://github.com/yuyeol3/vibe-coding-practice-/blob/main/src/app/page.tsx), [src/lib/api.ts](https://github.com/yuyeol3/vibe-coding-practice-/blob/main/src/lib/api.ts).
- **불확실성:** API 키·배포 환경과 실제 API 가용성은 확인하지 않았다. README의 기본 템플릿 문구는 현재 앱 설명으로 쓰지 않았다.

### 8. [web-youtube-transcript](https://github.com/yuyeol3/web-youtube-transcript)

- **목적·유형:** YouTube URL의 자막을 가져와 표시·복사하고, OpenAI API로 한국어 요약을 요청하는 브라우저 웹앱. 사용자가 API 키를 입력해 브라우저 localStorage에 저장하는 흐름이 코드에 보인다.
- **스택:** Vite, JavaScript ES modules, `youtube-transcript`, OpenAI Node SDK, Bulma.
- **추천 분류:** `ai-tools`.
- **관련 저장소:** `youtube-shortener-*`와 YouTube를 다룬다는 주제상 인접하나 기능은 별개이며 코드 연계 증거는 없음.
- **근거:** [package.json](https://github.com/yuyeol3/web-youtube-transcript/blob/main/package.json), [index.html](https://github.com/yuyeol3/web-youtube-transcript/blob/main/index.html), [main.js](https://github.com/yuyeol3/web-youtube-transcript/blob/main/main.js), [gptSummarize.js](https://github.com/yuyeol3/web-youtube-transcript/blob/main/gptSummarize.js), [utils.js](https://github.com/yuyeol3/web-youtube-transcript/blob/main/utils.js).
- **불확실성:** README가 없다. API 호출과 자막 흐름은 코드에서 확인했지만 실행 성공 여부는 검증하지 않았다.

### 9. [wigitback](https://github.com/yuyeol3/wigitback)

- **목적·유형:** Git 저장소를 문서 버전 저장소로 사용하는 WIGIT 위키의 Flask 백엔드. 문서 조회·추가·수정·삭제·이력·diff, 이미지, 로그인 및 검색 라우트가 보인다. SQLite 사용자 메타데이터와 GitPython 기반 문서 이력을 사용한다. 트리에는 대규모 빌드 프런트엔드 자산도 함께 들어 있다.
- **스택:** Python, Flask, Flask-Login, SQLite, GitPython/pygit2, bcrypt, Pillow, Bleach; 정적 번들 JavaScript/CSS.
- **추천 분류:** `web` (WIGIT을 하나의 프로젝트로 묶어 소개).
- **관련 저장소:** [wigitfront](https://github.com/yuyeol3/wigitfront)는 프런트엔드 소스. `wigitfront/package.json`의 build 스크립트가 번들을 `../wigitback/`에 복사하도록 되어 있어 직접적인 작업 연계가 확인된다.
- **근거:** [README.md](https://github.com/yuyeol3/wigitback/blob/main/README.md), [requirements.txt](https://github.com/yuyeol3/wigitback/blob/main/requirements.txt), [init.py](https://github.com/yuyeol3/wigitback/blob/main/init.py), [main.py](https://github.com/yuyeol3/wigitback/blob/main/main.py), [utils/documents.py](https://github.com/yuyeol3/wigitback/blob/main/utils/documents.py), [정적 자산](https://github.com/yuyeol3/wigitback/tree/main/assets).
- **불확실성:** README에 적힌 `templates/`와 일부 모듈 구성이 현재 트리에 그대로 나타나지 않고, 코드가 `env` 모듈을 가져오지만 트리에는 해당 파일이 보이지 않는다. 따라서 README의 설치 절차만으로 현재 상태의 재현 가능성을 보장할 수 없다.

### 10. [wigitfront](https://github.com/yuyeol3/wigitfront)

- **목적·유형:** WIGIT 위키 UI. 문서 라우팅·Markdown 렌더링, 추가/수정/삭제, 검색, 이미지, 로그인/사용자 관리 화면 호출이 구현되어 있다.
- **스택:** JavaScript ES modules, Vite, Marked, DOMPurify, KaTeX. 별도 UI 프레임워크는 매니페스트에서 확인되지 않음.
- **추천 분류:** `web` (wigitback과 통합).
- **관련 저장소:** [wigitback](https://github.com/yuyeol3/wigitback). `package.json`의 build/test 스크립트가 생성물을 백엔드 저장소로 복사한다.
- **근거:** [package.json](https://github.com/yuyeol3/wigitfront/blob/main/package.json), [index.html](https://github.com/yuyeol3/wigitfront/blob/main/index.html), [scripts/main.js](https://github.com/yuyeol3/wigitfront/blob/main/scripts/main.js), [scripts/routes.js](https://github.com/yuyeol3/wigitfront/blob/main/scripts/routes.js), [scripts/document.js](https://github.com/yuyeol3/wigitfront/blob/main/scripts/document.js).
- **불확실성:** README가 없고, 실제 백엔드 API 배포 주소·현행 호환 상태는 조사하지 않았다.

### 11. [yacht](https://github.com/yuyeol3/yacht)

- **목적·유형:** 브라우저에서 플레이하는 로컬 턴제 Yacht 주사위 게임. README는 React+Vite 스타터 안내지만, `Game`, `DiceBoard`, `ScoreBoard`, `Player`, `GameController`, 게임 화면과 점수 로직이 실제로 구현되어 있으므로 스타터 템플릿으로만 분류할 수 없다. 확인된 코드는 로컬 플레이어 상태를 직접 관리한다.
- **스택:** React 19, Vite 7, JavaScript, React Router.
- **추천 분류:** `games`.
- **관련 저장소:** 이후의 멀티플레이 프로젝트군인 `yacht-backend`, `yacht-frontend`, `yacht-online`과 주제가 같다. 코드 계보가 직접 이어진다는 것은 별도로 확인하지 않음. `yacht-dist`는 배포 결과물 후보.
- **근거:** [README.md](https://github.com/yuyeol3/yacht/blob/main/README.md), [package.json](https://github.com/yuyeol3/yacht/blob/main/package.json), [Game.js](https://github.com/yuyeol3/yacht/blob/main/src/js/Game/Game.js), [GameController.js](https://github.com/yuyeol3/yacht/blob/main/src/js/Game/GameController.js), [GameView.jsx](https://github.com/yuyeol3/yacht/blob/main/src/js/Game/GameView.jsx).
- **불확실성:** README는 기본 Vite 문구와 실제 코드의 목적이 일치하지 않는다. 제품 실행·점수 규칙 전반은 실행하지 않았다.

### 12. [yacht-backend](https://github.com/yuyeol3/yacht-backend)

- **목적·유형:** Yacht Online의 Spring Boot 백엔드 코드. 인증/JWT, 방 관리, 게임 규칙·턴 타이머, STOMP/WebSocket, Redis 기반 게임 서버 상태, MySQL/JPA, 테스트가 있다. 저장소 이름과 달리 루트 트리에는 `yacht-frontend/`도 함께 포함되어 있어 백엔드만 있는 단일 구성은 아니다.
- **스택:** Java 21, Spring Boot 4, Gradle, Spring Web/JPA/Security/WebSocket/Redis, MySQL, JWT, 프런트엔드는 React/Vite·STOMP/SockJS.
- **추천 분류:** `games` (백엔드 단독 카드보다 통합 Yacht Online 항목의 관련 저장소로 연결).
- **관련 저장소:** [yacht-frontend](https://github.com/yuyeol3/yacht-frontend), [yacht-online](https://github.com/yuyeol3/yacht-online). 현재 `yacht-online` README는 통합 결과물이라고 설명하며 두 저장소와 역할 구분이 겹친다.
- **근거:** [루트 README](https://github.com/yuyeol3/yacht-backend/blob/main/README.md), [중첩 백엔드 README](https://github.com/yuyeol3/yacht-backend/blob/main/yacht-backend/README.md), [build.gradle](https://github.com/yuyeol3/yacht-backend/blob/main/yacht-backend/build.gradle), [YachtBackendApplication.java](https://github.com/yuyeol3/yacht-backend/blob/main/yacht-backend/src/main/java/io/github/yuyeol3/yachtbackend/YachtBackendApplication.java), [GameService.java](https://github.com/yuyeol3/yacht-backend/blob/main/yacht-backend/src/main/java/io/github/yuyeol3/yachtbackend/game/GameService.java), [프런트엔드 package.json](https://github.com/yuyeol3/yacht-backend/blob/main/yacht-frontend/package.json).
- **불확실성:** README의 배포 설명은 문서상 주장이고 현재 AWS 환경은 조사하지 않았다. README에는 개별 서버 분리 설명이 있으나 코드에는 단일 Spring 앱에서 role 조건으로 API/game 구성요소를 선택하는 코드도 있어, 배포 시점별 구조는 문서만으로 완전히 확정하지 않았다.

### 13. [yacht-dist](https://github.com/yuyeol3/yacht-dist)

- **목적·유형:** `index.html`과 해시가 붙은 CSS/JS 번들로 구성된 정적 배포 결과물. 편집 가능한 원본 소스나 매니페스트는 트리에 없다.
- **스택:** 빌드된 HTML/CSS/JavaScript. 번들의 내부는 React production bundle을 포함한다.
- **추천 분류:** `other`; 단독 포트폴리오 프로젝트로 노출하지 말고 Yacht 관련 배포 산출물 링크로 취급.
- **관련 저장소:** 이름·앱 제목상 [yacht](https://github.com/yuyeol3/yacht) 또는 멀티플레이 Yacht 계열일 수 있으나, 번들과 원본을 대조하지 않아 어느 소스에서 빌드되었는지 확정할 수 없다.
- **근거:** [index.html](https://github.com/yuyeol3/yacht-dist/blob/main/index.html), [assets](https://github.com/yuyeol3/yacht-dist/tree/main/assets).
- **불확실성:** README·package manifest·소스 트리가 없다. 정확한 배포 대상·버전 불명.

### 14. [yacht-frontend](https://github.com/yuyeol3/yacht-frontend)

- **목적·유형:** 로그인·회원가입, 로비, 방, 인게임 화면을 제공하는 Yacht 멀티플레이 클라이언트. 앱 라우트, JWT 갱신, REST API, STOMP/SockJS 연결과 게임 UI가 구현되어 있다.
- **스택:** React 19, Vite 7, JavaScript, React Router, STOMP.js, SockJS, Three.js/React Three Fiber.
- **추천 분류:** `games`.
- **관련 저장소:** [yacht-backend](https://github.com/yuyeol3/yacht-backend) 및 통합 저장소 [yacht-online](https://github.com/yuyeol3/yacht-online).
- **근거:** [package.json](https://github.com/yuyeol3/yacht-frontend/blob/main/package.json), [APIS.md](https://github.com/yuyeol3/yacht-frontend/blob/main/APIS.md), [src/App.jsx](https://github.com/yuyeol3/yacht-frontend/blob/main/src/App.jsx), [src/lib/auth.js](https://github.com/yuyeol3/yacht-frontend/blob/main/src/lib/auth.js), [src/lib/wsClient.js](https://github.com/yuyeol3/yacht-frontend/blob/main/src/lib/wsClient.js).
- **불확실성:** README가 없다. API 명세와 클라이언트 코드를 확인했지만 현재 실행 서버와의 호환성은 확인하지 않았다.

### 15. [yacht-online](https://github.com/yuyeol3/yacht-online)

- **목적·유형:** Yacht Dice 온라인 실시간 멀티플레이 전체 프로젝트. README는 회원/방/게임/점수 흐름과 배포 구성을 기술하고, 트리에는 프런트엔드와 Spring Boot 백엔드 소스, 테스트, Docker 설정, 아키텍처·사용 화면 문서 이미지가 들어 있다. 백엔드는 README에 따르면 하나의 Spring Boot 코드베이스에서 프로필/Role로 API와 Game 역할을 분리한다.
- **스택:** Java 21, Spring Boot, Gradle, React/Vite, WebSocket STOMP/SockJS, JWT, Redis, MySQL, Docker Compose; README상 AWS S3/EC2/RDS/ALB 등 배포.
- **추천 분류:** `games` (지정 목록에서 독립 포트폴리오 대표작으로 가장 완결된 Yacht 항목).
- **관련 저장소:** [yacht-backend](https://github.com/yuyeol3/yacht-backend), [yacht-frontend](https://github.com/yuyeol3/yacht-frontend)는 코드·README 관점에서 겹치는 별도 저장소. `yacht`는 로컬 게임 구현, `yacht-dist`는 출처 미확정 배포 번들.
- **근거:** [README.md](https://github.com/yuyeol3/yacht-online/blob/main/README.md), [백엔드 Gradle](https://github.com/yuyeol3/yacht-online/blob/main/yacht-backend/build.gradle), [프런트엔드 package.json](https://github.com/yuyeol3/yacht-online/blob/main/yacht-frontend/package.json), [백엔드 소스 트리](https://github.com/yuyeol3/yacht-online/tree/main/yacht-backend/src/main/java), [화면·다이어그램 이미지](https://github.com/yuyeol3/yacht-online/tree/main/docs/images).
- **불확실성:** README는 서비스 운영과 클라우드 배포를 서술하지만 외부 서비스의 현재 가용성·인프라 상태를 검증하지 않았다. 문서에 일부 예시/초안 내용도 섞여 있으므로 배포·규모 주장은 그대로 포트폴리오에 옮기지 말고 재확인하는 것이 좋다.

### 16. [youtube-shortener-backend](https://github.com/yuyeol3/youtube-shortener-backend)

- **목적·유형:** YouTube 시청자 heatmap을 파싱·저장하고 영상 인기 구간 데이터를 제공하는 백엔드. URL에서 비디오 ID를 구하고 저장 데이터를 조회하거나, YouTube 응답 HTML에서 heatmap과 제목을 파싱해 저장하는 서비스 코드가 있다.
- **스택:** Java 21, Spring Boot 4, Gradle, Spring Web/JPA, Jsoup, MySQL.
- **추천 분류:** `web` (YouTube Shortener 서비스의 API 구성요소).
- **관련 저장소:** [youtube-shortener-frontend](https://github.com/yuyeol3/youtube-shortener-frontend), 이전 세대 구현으로 보이는 [youtube-shortener-legacy](https://github.com/yuyeol3/youtube-shortener-legacy). 기능·목적은 유사하지만 직접적인 코드 이관 여부는 확인하지 않았다.
- **근거:** [README.md](https://github.com/yuyeol3/youtube-shortener-backend/blob/main/README.md), [build.gradle](https://github.com/yuyeol3/youtube-shortener-backend/blob/main/build.gradle), [HeatmapService.java](https://github.com/yuyeol3/youtube-shortener-backend/blob/main/src/main/java/io/github/yuyeol/youtube_shortener/heatmap/HeatmapService.java), [HeatmapParser.java](https://github.com/yuyeol3/youtube-shortener-backend/blob/main/src/main/java/io/github/yuyeol/youtube_shortener/heatmap/HeatmapParser.java).
- **불확실성:** YouTube HTML 구조 변경에 대한 현재 동작 여부와 배포 상태는 검증하지 않았다.

### 17. [youtube-shortener-frontend](https://github.com/yuyeol3/youtube-shortener-frontend)

- **목적·유형:** heatmap 구간 표시, 임계값 조절, 자동 threshold, 비인기 구간 자동 스킵, 공유 링크/PWA 공유 진입을 구현한 프런트엔드 앱. README에 백엔드 저장소가 직접 연결되어 있다.
- **스택:** React 19, Vite 7, JavaScript, Chart.js, `ml-kmeans`, `yt-player`, React Router.
- **추천 분류:** `web`.
- **관련 저장소:** [youtube-shortener-backend](https://github.com/yuyeol3/youtube-shortener-backend); 개념적으로 [youtube-shortener-legacy](https://github.com/yuyeol3/youtube-shortener-legacy)와 같은 heatmap 서비스.
- **근거:** [README.md](https://github.com/yuyeol3/youtube-shortener-frontend/blob/main/README.md), [package.json](https://github.com/yuyeol3/youtube-shortener-frontend/blob/main/package.json), [WatchVideoPage.jsx](https://github.com/yuyeol3/youtube-shortener-frontend/blob/main/src/pages/WatchVideoPage.jsx), [heatmap.js](https://github.com/yuyeol3/youtube-shortener-frontend/blob/main/src/utils/heatmap.js), [playerSkipController.js](https://github.com/yuyeol3/youtube-shortener-frontend/blob/main/src/utils/playerSkipController.js).
- **불확실성:** README상 빌드 산출 경로가 `../deploy/frontend`로 설정되어 있으나, 해당 배포 저장소는 이번 지정 목록에서 확인되지 않았다. 운영 연결 상태는 미확인.

### 18. [youtube-shortener-legacy](https://github.com/yuyeol3/youtube-shortener-legacy)

- **목적·유형:** YouTube heatmap 인기 구간 조회의 이전/레거시 구현. Express API, YouTube HTML 파싱, 최근 영상·heatmap 데이터 모델이 있고, `public/`에 React/Vite 빌드 산출물과 PWA 파일도 포함되어 있어 서버와 프런트 빌드 자산이 한 저장소에 섞인 형태다.
- **스택:** Node.js, Express 5, Bun 실행 설정, Cheerio, Nunjucks, SQLite/MySQL 드라이버, 정적 React/Vite 번들 및 PWA 자산.
- **추천 분류:** `web` (메인 프런트·백엔드 프로젝트와 구분해 레거시/이전 버전으로 표시).
- **관련 저장소:** [youtube-shortener-backend](https://github.com/yuyeol3/youtube-shortener-backend), [youtube-shortener-frontend](https://github.com/yuyeol3/youtube-shortener-frontend). 직접적인 마이그레이션 커밋 계보는 확인되지 않음.
- **근거:** [readme.md](https://github.com/yuyeol3/youtube-shortener-legacy/blob/main/readme.md), [package.json](https://github.com/yuyeol3/youtube-shortener-legacy/blob/main/package.json), [app.js](https://github.com/yuyeol3/youtube-shortener-legacy/blob/main/app.js), [controllers/apis.js](https://github.com/yuyeol3/youtube-shortener-legacy/blob/main/controllers/apis.js), [services/youtubeService.js](https://github.com/yuyeol3/youtube-shortener-legacy/blob/main/services/youtubeService.js), [public 번들](https://github.com/yuyeol3/youtube-shortener-legacy/tree/main/public).
- **불확실성:** 저장소 이름의 `legacy`와 별도 최신 저장소의 존재는 확인되지만, 어느 시점에 어떤 코드가 이전되었는지는 증거가 없어 단정하지 않았다.

### 19. [yuyeol3.github.io](https://github.com/yuyeol3/yuyeol3.github.io)

- **목적·유형:** Next.js App Router와 GitHub Pages 정적 내보내기로 운영하도록 구성된 개인 블로그. 카테고리별 게시글, 검색, Markdown 게시글·수식 렌더링, 게시글 이미지 처리 코드와 다수의 글이 포함돼 있다.
- **스택:** Next.js 16, React 19, TypeScript, `gray-matter`, `react-markdown`, KaTeX 및 Remark/Rehype 플러그인, GitHub Actions.
- **추천 분류:** `web` (포트폴리오 소개 사이트와 개인 블로그를 별도 구분하려면 블로그 역할을 명시).
- **관련 저장소:** `youtube-shortener-legacy` 관련 글, 프로젝트·CS·알고리즘 글 등 다수의 지정 저장소와 주제상 연결. 게시글의 기술 내용은 구현 저장소의 독립 검증 근거로 대체할 수 없음.
- **근거:** [README.md](https://github.com/yuyeol3/yuyeol3.github.io/blob/main/README.md), [package.json](https://github.com/yuyeol3/yuyeol3.github.io/blob/main/package.json), [next.config.ts](https://github.com/yuyeol3/yuyeol3.github.io/blob/main/next.config.ts), [app/page.tsx](https://github.com/yuyeol3/yuyeol3.github.io/blob/main/app/page.tsx), [lib/posts.ts](https://github.com/yuyeol3/yuyeol3.github.io/blob/main/lib/posts.ts), [posts](https://github.com/yuyeol3/yuyeol3.github.io/tree/main/posts).
- **불확실성:** README의 GitHub Pages 자동 배포는 워크플로 파일과 설정에서 의도를 확인했으나, 실제 배포 성공·현재 페이지 상태는 확인하지 않았다.

## 포트폴리오 구성 제안

- **독립 대표 항목으로 묶기:** WIGIT은 `wigitback` + `wigitfront`; Yacht Online은 `yacht-online`을 대표 저장소로 삼고 `yacht-backend`·`yacht-frontend`를 관련 코드 저장소로 연결; YouTube Shortener는 `youtube-shortener-frontend` + `youtube-shortener-backend`를 한 서비스로 묶고 `youtube-shortener-legacy`는 이전 버전으로 표기.
- **프로젝트 성격을 정확히 표시:** `tax-agent-prototype`은 실제 AI 세무 서비스가 아닌 Mock 시연, `yacht`는 로컬 게임 구현, `vibe-coding-practice-`는 기본 스타터 문서와 달리 실제 축제 정보 앱 코드가 있음.
- **학습/보조 자료:** `tdd-skill`, `test`, `vanilaJsRouting`은 `learning`에 모으고, 발표 슬라이드는 `presentations`에 둔다. `yacht-dist`는 소스 프로젝트에 종속된 배포 산출물로 별도 작품 수에서 제외하는 편이 타당하다.
- **확인 한계:** 저장소 상태는 API·코드 정적 열람 기준이다. 어떤 앱도 실행·빌드·배포하거나 외부 서비스에 연결해 확인하지 않았다. 특히 `test/hw.c`, Yacht 배포 산출물의 원본, WIGIT의 현재 실행 가능성, 서비스의 운영 상태는 추가 확인이 필요하다.
