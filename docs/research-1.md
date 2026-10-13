# yuyeol3 포트폴리오 공개 저장소 조사

- 조사 기준일: 2026-10-14 (KST)
- 범위: 배정 저장소 20개 전부와 요청으로 추가한 외부 공개 저장소 `ApptiveDev/Fin-BE`, `ApptiveDev/Fin-API` 2개. 총 22개 저장소를 조사했다.
- 방법: 인증된 GitHub CLI/API로 저장소 메타데이터(소유자, 공개 여부, 기본 브랜치, fork/parent/source), 기본 브랜치 재귀 트리, README 또는 README가 없을 때 대표 중첩 문서, manifest·의존성·대표 엔트리포인트/구현을 읽었다. 저장소 코드는 실행하지 않았다.
- category id: 요청한 `ai-tools`, `web`, `games`, `learning`, `data`, `presentations`, `other`를 그대로 사용했다. 발표자료 저장소는 확인되지 않았다.
- 주의: 여기서 “포트폴리오 적합”은 구조와 파일 증거에 근거한 편집 제안이다. 코드 실행·빌드·테스트는 하지 않았으므로 실행 가능성이나 품질을 검증했다는 뜻은 아니다.

## 우선 결론

가장 강한 실무형 후보는 `Fin-BE-test`다. public fork라는 저장소 형태만으로 판단하지 않았다. GitHub contributor 응답에는 `yuyeol3`의 기여 59건이 있고, 사용자 귀속 커밋에서 인증·인가, 추천/검색, 상품 상세 API 및 테스트 변경을 확인했다. 공개 프론트엔드 `Fin-FE-test`와 함께 Fin 제품 작업으로 묶을 수 있어 보이나, 두 저장소 사이의 연동 상태는 별도 실행 검증하지 않았다.

두 AI 개발 도구 저장소 `explain-diff`, `codex-subagent`와 한국어 글쓰기 스킬 `claude-humanize-skill`은 명확한 설치/사용 문서가 있어 보조 포트폴리오로 제시할 수 있다. 게임 영역에서는 `death_chest`가 매니페스트와 실제 스크립트 진입점이 확인되는 Behavior Pack이다. 나머지 다수는 알고리즘 풀이, 수업/협업 연습, 작은 스크립트 또는 원본이 별도인 포크이므로 대표 프로젝트보다 학습 이력으로 묶는 편이 정확하다.

## 배정 저장소 20개

### 1. [2020OSS](https://github.com/yuyeol3/2020OSS)

- 목적/유형: C `main` 골격이 있는 매우 작은 저장소다. README는 인사말뿐이고 `hello.c`의 `main` 본문은 비어 있어, 완성된 프로그램보다 수업/실습용 시작점에 가깝다.
- 스택: C.
- 추천 category: `learning`. 포트폴리오 노출은 권하지 않는다.
- 관련 저장소: 같은 학습 기록 성격의 `algorithm_study`, `codeTree`, `bojsrc`와 느슨하게 묶을 수 있다.
- 근거: README와 `hello.c` (`main()` 빈 본문).
- 불확실성: 저장소에 실습 목표나 추가 과제 설명이 없어 의도는 파일 구조만으로 더 좁힐 수 없다.

### 2. [ai_data](https://github.com/yuyeol3/ai_data)

- 목적/유형: CSV 데이터와 파싱·분할 스크립트가 섞인 데이터 실험 저장소다. CPU 벤치마크 정리, 나무 분류 데이터, 국가 인구 회귀용 train/test CSV가 보인다. 학습/평가 코드나 모델·결과 보고서는 확인되지 않았다.
- 스택: Python, pandas, scikit-learn; CSV.
- 추천 category: `data`. 보조 학습/실험 자료로 노출한다.
- 관련 저장소: 현재 트리에서는 직접 연결되는 프로젝트를 확인하지 못했다.
- 근거: README 없음. `cpu_parser.py`, `trees_parser.py`, `split.py`, `cpu_benchmarks.csv`, `regression_train.csv`, `regression_test.csv`, `classification_train.csv`, `classification_test.csv`.
- 불확실성: 스크립트 입력 `CPU_BENCHMARKS.xlsx`, `baeume.csv`, `trees.csv`는 저장소 트리에서 찾지 못했다. 데이터 출처, 회귀 목적변수, 모델링 단계는 문서화되지 않았다. 현재 포함된 CSV와 각 스크립트의 재현 관계는 불명확하다.

### 3. [algorithm_study](https://github.com/yuyeol3/algorithm_study)

- 목적/유형: 강의/교재식 챕터별 알고리즘 예제와 문제 풀이를 모은 C++ 학습 저장소다. 설명 메타데이터는 `encrypted-def/basic-algo-lecture`를 가리키며, 트리는 배열·연결 리스트·스택·큐·덱·BFS 등으로 나뉜다.
- 스택: C++ 중심, 일부 Python 보조 파일.
- 추천 category: `learning`. 대표 서비스가 아닌 학습 이력으로 분류한다.
- 관련 저장소: `codeTree`, `bojsrc`와 알고리즘 학습 계열.
- 근거: `readme.md`는 0바이트, `ch1`–`ch11` 디렉터리, `ch9/bfs.cpp`, `ch4 - 연결 리스트/linked_list.cpp` 등.
- 불확실성: README 본문이 비어 있고 강의 진도나 독립적인 프로젝트 목적은 확인되지 않는다.

### 4. [backend-study-sns](https://github.com/yuyeol3/backend-study-sns)

- 목적/유형: 회원·게시글·댓글·좋아요·팔로우 기능을 갖춘 SNS 백엔드 구현이다. 기능별 controller/service/repository/domain과 통합·서비스 테스트가 있어 실제 애플리케이션 코드가 있다. 동시에 GitHub 메타데이터상 `ApptiveDev/backend-study-sns`의 fork다.
- 스택: Java 21, Spring Boot 3.5.6, Spring Web/Validation/Data JPA, JWT, MySQL runtime, Docker Compose.
- 추천 category: `web`. 학습/팀 포크 사실을 명확히 한 뒤 보조 프로젝트로 둔다.
- 관련 저장소: 원본 `ApptiveDev/backend-study-sns`; 제품 영역만 보면 금융 서비스 `Fin-BE-test`와는 별개다.
- 근거: `README.md`는 제목만 있음. `build.gradle`, `docker-compose.yml`, `src/main/java/com/example/devSns/controller/PostController.java`, `service/PostService.java`, `interceptor/JwtInterceptor.java`, `src/test/java/com/example/devSns/ApiIntegrationTest.java`.
- 불확실성: 포크라는 사실만으로 이 fork의 개별 코드 작성자를 판정하지 않았다. README에서 설계·기여 역할을 확인할 수 없다.

### 5. [bojsrc](https://github.com/yuyeol3/bojsrc)

- 목적/유형: README가 BaekjoonHub 자동 푸시 저장소라고 명시한다. 트리에 822개 파일과 백준·SWEA·프로그래머스 문제별 풀이/설명 파일이 있다. 다국어 문제풀이 아카이브이지 독립 애플리케이션은 아니다.
- 스택: Java, C++, C, Go, Python, SQL 등 혼합.
- 추천 category: `learning`. 전체를 대표 프로젝트처럼 제시하기보다 풀이 링크/학습 통계의 보조 자료로 둔다.
- 관련 저장소: `algorithm_study`, `codeTree`.
- 근거: 루트 `README.md`; 예시 `백준/Bronze/1000. A＋B/A＋B.java`, 문제별 README; 재귀 트리의 루트 `백준`, `SWEA`, `프로그래머스`.
- 불확실성: 자동 수집 저장소의 문제별 코드 전체를 직접 검토한 것은 아니다. README의 자동 푸시 설명과 트리 구조를 기준으로 유형을 분류했다.

### 6. [cc-hw5](https://github.com/yuyeol3/cc-hw5)

- 목적/유형: Nginx 설치·실행과 기본 HTML 배포를 수행하는 단일 셸 스크립트다. 이름과 달리 저장소에는 과제 설명이나 보고서가 없다.
- 스택: Bash, Debian/Ubuntu `apt-get`, systemd, Nginx.
- 추천 category: `learning`. 짧은 인프라 실습 코드로 기록한다.
- 관련 저장소: 직접 연결 근거 없음.
- 근거: README 없음. `automate_nginx.sh` 한 파일. 파일 머리말에 Microsoft Azure 저작권 및 MIT 라이선스 고지가 포함되어 있다.
- 불확실성: Azure 원본에서 가져온 범위와 변경 사항은 Git 이력 비교 없이는 말할 수 없다. 실행 환경/배포 산출물도 없다.

### 7. [claude-humanize-skill](https://github.com/yuyeol3/claude-humanize-skill)

- 목적/유형: 한국어 글을 의미 변경 없이 자연스럽게 다듬도록 Claude Code에 제공하는 설치형 skill이다. em dash, 이모지, 문장 흐름과 종결 표현에 관한 규칙과 검증 체크가 문서화되어 있다.
- 스택: Markdown 기반 Claude Code skill; 실행 코드나 외부 라이브러리는 확인되지 않았다.
- 추천 category: `ai-tools`. 설치/사용법이 구체적이라 보조 포트폴리오에 적합하다.
- 관련 저장소: `explain-diff`, `codex-subagent`와 에이전트/코딩 도구 지침 저장소.
- 근거: `README.md`, `humanize/SKILL.md`.
- 불확실성: 문서에 규칙과 자체 검증 방법은 있지만, 별도 평가 데이터나 정량 품질 결과는 저장소에서 확인되지 않았다.

### 8. [codeTree](https://github.com/yuyeol3/codeTree)

- 목적/유형: 날짜별로 정리한 CodeTree 문제 풀이 저장소다. 트리는 2025-07-31부터 2025-08-16까지의 날짜 폴더, 178개 파일, 문제별 README와 C++ 풀이로 구성된다. README들은 CodeTree 문제/학습 링크를 포함한다.
- 스택: C++.
- 추천 category: `learning`. 코딩테스트 학습 묶음으로만 제시한다.
- 관련 저장소: `algorithm_study`, `bojsrc`.
- 근거: 루트 README 없음. 중첩 `250805/그래프 탐색/README.md`, `250803/1이 3개 이상 있는 위치/place-more-than-3-ones.cpp`, `250804/크기가 N인 순열/n-permutation.cpp` 및 날짜별 문제 디렉터리.
- 불확실성: 여러 문제별 README가 있지만 독립 앱/배포물은 없다. 전체 178개 풀이를 한 줄씩 품질 검토한 것은 아니다.

### 9. [codex-subagent](https://github.com/yuyeol3/codex-subagent)

- 목적/유형: Sol을 주 에이전트로 두고 Terra/Luna에 범위가 제한된 작업을 위임하는 Codex skill이다. 작업 계약, 불확실성에 따른 라우팅, 읽기/쓰기와 검증 책임을 정의한다.
- 스택: Markdown 기반 Codex skill과 references.
- 추천 category: `ai-tools`. 내용과 대상 사용자가 명확해 보조 포트폴리오에 적합하다.
- 관련 저장소: `claude-humanize-skill`, `explain-diff`.
- 근거: 루트 `SKILL.md`, `references/model-routing.md`, `references/delegation-contracts.md`; recursive tree상 5개 파일.
- 불확실성: 실제 Codex 세션에서 설치·호출 검증은 하지 않았다. 문서에 적힌 동작과 저장소 구성만 확인했다.

### 10. [CoordinatesPlugin](https://github.com/yuyeol3/CoordinatesPlugin)

- 목적/유형: Minecraft 서버에서 플레이어 좌표를 Action Bar에 표시하고 `/displayCoordinate true|false` 명령으로 표시를 토글하려는 Bukkit 플러그인 소스다.
- 스택: Java, Bukkit/Spigot API 참조.
- 추천 category: `games`. 구현 아이디어를 보여주는 보조 자료.
- 관련 저장소: Minecraft 관련 `death_chest`(Bedrock Behavior Pack)와 게임 영역으로 함께 묶을 수 있지만 런타임은 서로 다르다.
- 근거: README 및 빌드 manifest 없음. `CoordinatesPlugin.java`, `commands/ToggleCommand.java`, `coordinatesHUD/CoordinatesHUD.java`, `event/ActionBarEvent.java`.
- 불확실성: 트리에 4개 Java 파일만 있고 `plugin.yml`, Gradle/Maven 설정, 테스트가 없다. 명령 등록과 실제 서버 호환/패키징 여부는 확인되지 않았다.

### 11. [death_chest](https://github.com/yuyeol3/death_chest)

- 목적/유형: Minecraft Bedrock에서 사망 이벤트를 받아 플레이어 아이템을 사망 위치의 상자에 옮기려는 Behavior Pack이다. README가 기능을 설명하고 manifest가 `scripts/main.js`를 진입점으로 지정한다. 스크립트는 사망 이벤트를 구독하고 세 차원에 `keepinventory true` gamerule을 설정한다.
- 스택: JavaScript, `@minecraft/server` 1.10 계열, Minecraft Bedrock Behavior Pack manifest.
- 추천 category: `games`. 현재 배정 중 실제 진입점과 패키지 구성이 확인되는 게임 프로젝트로 보조/중간 우선순위.
- 관련 저장소: `CoordinatesPlugin`은 같은 게임 분야지만 Java Bukkit 서버 플러그인으로 별도 런타임.
- 근거: `README.md`, `package.json`, `manifest.json`, `scripts/main.js`, `scripts/deadPlayerItemHandler.js`.
- 불확실성: 게임 서버에서 실행하거나 API 버전 호환을 확인하지 않았다. README의 기능 설명은 코드 동작 검증을 대신하지 않는다.

### 12. [explain-diff](https://github.com/yuyeol3/explain-diff)

- 목적/유형: Git 변경을 논리적 순서로 설명하고, 커밋 메시지·로그·테스트·규약에서 의도 근거를 추적하도록 설계한 Claude Code skill이다. 기본 범위 선택, 20커밋 초과 시 축소, 근거 추적 깊이 제한 및 확인 필요/참고 구분이 문서화되어 있다.
- 스택: Markdown 기반 Claude Code skill.
- 추천 category: `ai-tools`. README가 설치/사용 절차와 범위를 설명해 독립 도구형 자료로 제시할 만하다.
- 관련 저장소: `claude-humanize-skill`, `codex-subagent`.
- 근거: `README.md`, `skills/explain-diff/SKILL.md`.
- 불확실성: skill 실행을 통해 실제 diff 결과나 예외 처리를 검증하지 않았다. 문서가 약속하는 기능과 구현 환경의 성공 여부는 별개다.

### 13. [Fin-BE-test](https://github.com/yuyeol3/Fin-BE-test)

- 목적/유형: Y-FIN 청년 금융상품 검색·추천 서비스의 백엔드다. OAuth2 Google/Kakao, JWT 인증, 사용자/약관/카테고리, 개인 조건 기반 상품 추천·검색·상세·찜·계산기 등의 코드가 계층별로 있다. 단순 fork 표시와 별도로 GitHub가 `yuyeol3`의 contributor 기여 59건을 표시하며, 사용자 귀속 커밋의 파일 변경을 확인했다.
- 스택: Java 21, Spring Boot 3.5.6(이 저장소의 `build.gradle`), Spring Security/OAuth2/JPA, PostgreSQL 명시(README), Docker Compose, Gradle.
- 추천 category: `web`. **배정 저장소 중 핵심 포트폴리오 후보**. 팀 원본을 바탕으로 한 fork라는 출처와 본인 작업 영역을 함께 표기한다.
- 관련 저장소: 이 저장소의 GitHub `parent`와 `source`는 모두 외부 공개 저장소 `ApptiveDev/Fin-BE`. 제품 프론트엔드로 보이는 `Fin-FE-test`와 이름 및 README상 연계 후보. 별도 데이터 수집 저장소 `ApptiveDev/Fin-API`는 같은 조직의 sibling이며 이 fork의 parent/source가 아니다.
- 근거: `README.md`, `build.gradle`, `src/main/java/apptive/fin/FinApplication.java`, `search/controller/SearchController.java`, `search/service/SearchService.java`, `auth/security/SecurityConfig.java`, `src/test/java/...`; GitHub contributor API에서 `yuyeol3: 59`. 사용자 귀속 커밋 예시: [상품가입 링크 분리 및 테스트 변경](https://github.com/yuyeol3/Fin-BE-test/commit/7f273328c2a29601261b5edec717f371705d14b0), [API별 인증/인가와 탈퇴 기능 및 통합 테스트](https://github.com/yuyeol3/Fin-BE-test/commit/a34fcd752c30f337caf5a921b1918ba7efdea9dc), [상품 상세 API와 서비스/테스트 추가](https://github.com/yuyeol3/Fin-BE-test/commit/3139f90c6b9ecbbd9d767f0e8ada6cf1ae06f33e), [검색/추천 로직 변경](https://github.com/yuyeol3/Fin-BE-test/commit/2a58d084a2596486adedabf1670a7bc40fbc5664). 각 커밋 상세의 파일 목록에서 Java 구현과 테스트 파일 변경을 확인했다.
- 불확실성: contributor 수는 GitHub의 기여 집계이지 개인별 코드 품질/업무량 평가가 아니다. 테스트 소스는 있으나 실행하지 않았다. 현재 외부 parent의 build 설정과 이 fork의 build 설정이 다르므로 두 브랜치가 같은 시점/상태라고 간주하지 않는다.

### 14. [Fin-FE-test](https://github.com/yuyeol3/Fin-FE-test)

- 목적/유형: Fin 프론트엔드. 로그인·약관·추천 입력 흐름, 금융상품 목록/상세, 금리 계산기, 마이페이지 화면 및 라우팅 구현이 있다.
- 스택: JavaScript, React 19, Vite, React Router, Axios, Tailwind CSS, styled-components, Framer Motion.
- 추천 category: `web`. BE와 묶어 풀스택 제품 사례로 보여줄 수 있으나, README는 “Fin의 프론트엔드”라고만 하고 두 repo 간 실제 배포/통합은 확인하지 않았다.
- 관련 저장소: `Fin-BE-test`와 프로젝트 연결 후보. 해당 관계는 이름과 화면/API 구조를 통한 추론으로 표시한다.
- 근거: `README.md`, `package.json`, `src/App.jsx`, `src/pages/Recommend.jsx`, `src/pages/ProductList.jsx`, `src/pages/ProductRateCalculator.jsx`; 기본 브랜치는 `feat/backend-integration`.
- 불확실성: API 연결의 현재 성공 여부나 사용자 개별 커밋 기여량은 이번 조사에서 검증하지 않았다.

### 15. [forkPractice](https://github.com/yuyeol3/forkPractice)

- 목적/유형: README가 포크·클론·브랜치·커밋·푸시·PR 실습 저장소라고 명시한다. GitHub 메타데이터상 `yuyeol31/forkPractice`의 fork이며 파일은 README와 짧은 `newFile.md`뿐이다.
- 스택: Git/GitHub 절차 문서, Markdown.
- 추천 category: `learning`. 대표 프로젝트로 노출하지 않는다.
- 관련 저장소: `git-practice`, `git-collab-demo`와 Git 연습 계열.
- 근거: `README.md`, `newFile.md`; API의 `fork=true`, `parent=yuyeol31/forkPractice`.
- 불확실성: README의 일반 안내 외에 독자적인 구현/연습 결과는 보이지 않는다.

### 16. [fullstack-practice](https://github.com/yuyeol3/fullstack-practice)

- 목적/유형: 게시글 CRUD/검색 블로그를 위한 FastAPI 백엔드와 Next.js 프론트엔드 실습이다. ORM 모델/검증, 게시글 페이지와 API 라우트, CORS·서버 컴포넌트·Route Handler 학습 주석이 확인된다.
- 스택: Python FastAPI, SQLAlchemy, Pydantic, SQLite; TypeScript/Next.js 15, React 19, Tailwind, Axios.
- 추천 category: `web`. 풀스택 흐름을 보조적으로 설명할 수 있는 학습 프로젝트.
- 관련 저장소: `backend-study-sns`와 웹 백엔드 학습으로만 연관; 같은 제품이라는 근거는 없다.
- 근거: README 없음. `backend/main.py`, `backend/requirements.txt`, `frontend/package.json`, `frontend/app/posts/page.tsx`, `frontend/app/api/search/route.ts`, `frontend/app/api/posts/[postId]/route.ts`; 재귀 트리에는 `backend/blog.db`와 `__pycache__`도 포함된다.
- 불확실성: 코드 주석에 실습 단계가 남아 있고, DB/환경 설정이 트래킹된다. 배포 구성 및 완성도는 실행하지 않아 판단하지 않았다.

### 17. [git-collab-demo](https://github.com/yuyeol3/git-collab-demo)

- 목적/유형: 이름과 짧은 README 문구 외에 협업 절차 문서는 없다. `auth.js`는 username/password 유무를 확인하고 로그를 남긴 뒤 항상 성공 경로에서 `true`를 반환하는 작은 함수다. 실서비스 인증 구현은 아니다.
- 스택: JavaScript.
- 추천 category: `learning`. 포트폴리오 대표 프로젝트에서는 제외한다.
- 관련 저장소: `git-practice`, `forkPractice`와 연습 저장소 계열.
- 근거: `README.md`, `auth.js`.
- 불확실성: 왜 `git-collab-demo`인지 보여주는 PR/브랜치 안내나 동작 설명이 README에 없다.

### 18. [git-practice](https://github.com/yuyeol3/git-practice)

- 목적/유형: 동물 이름 팀의 관리자/멤버 이름을 담은 YAML 다섯 파일로 구성된 데이터 연습 저장소다. 실행 코드와 README는 없다.
- 스택: YAML.
- 추천 category: `learning`. 공개 포트폴리오 노출은 불필요하다.
- 관련 저장소: `forkPractice`, `git-collab-demo`.
- 근거: `jaguars.yaml`, `leopards.yaml`, `panthers.yaml`, `pumas.yaml`, `tigers.yaml`; 각 파일에 `team`, `manager`, `members` 필드.
- 불확실성: 연습 과제 지시나 협업 이력은 파일만으로 판단할 수 없다.

### 19. [gitController](https://github.com/yuyeol3/gitController)

- 목적/유형: `os.system`으로 Git init/add/commit/push/pull/log를 실행하는 간단한 Python 래퍼다. 제품 수준 Git 클라이언트보다는 프로토타입/학습 코드다.
- 스택: Python 표준 라이브러리 `os`.
- 추천 category: `other`. `developer-tools`로 분리할 정도의 완성도/독립성이 확인되지 않아 현재 category를 유지한다.
- 관련 저장소: `git-practice`, `git-collab-demo`, `forkPractice`와 Git 학습 맥락.
- 근거: README 없음. `git_controller.py`, `.gitignore`; `streams/` 디렉터리는 트리에 없다.
- 불확실성: 임의 인자를 셸 명령 문자열에 삽입하고, push/pull용 ID/token을 `streams/in.txt`에 기록하는 코드가 있다. 자격증명 취급과 명령 인자 안전성 때문에 공개 포트폴리오에서 사용 도구처럼 소개하지 않는 편이 정확하다. 실행하지 않았다.

### 20. [hanja-hangul](https://github.com/yuyeol3/hanja-hangul)

- 목적/유형: 한자음을 한국어 음으로 변환하려는 Python 도구와 문자별 JSON 자료 저장소다. 트리에 605개 파일과 `hangul_hanja` 데이터 디렉터리, 사용자/일반 선호도 JSON, 변환 관련 스크립트가 있다.
- 스택: Python, JSON, 일부 Selenium 수집 코드; `translate_for_js.py`는 clipboard 모듈을 참조한다.
- 추천 category: `other`. README가 짧고 실제 실행 상태가 불확실해 보조/아카이브 자료로 둔다.
- 관련 저장소: 직접 연결 근거 없음.
- 근거: `README.md`, `translate.py`, `translate_for_js.py`, `hanja_to_hangul.py`, `han_check.py`, `hangle_table_generator.py`, `preferences.json`, `user_preferences.json`, `hangul_hanja/`.
- 불확실성: 보이는 `han_check.py`는 `isHangul`을 정의하지만 번역 스크립트는 `ishanja`, `convert_hanja_to_hangul`, `initial_law` 이름을 호출하고, `hanja_to_hangul.py` 본문도 비어 있다. 해당 이름의 정의/가져오기가 현재 확인한 파일 경로에서 드러나지 않아 완전한 동작 여부를 단정할 수 없다. 실행하지 않았다.

## 추가 조사: 외부 팀 공개 저장소 2개

아래 두 저장소는 `ApptiveDev` 조직 경로의 공개 팀 저장소다. 배정된 개인 저장소 수나 `yuyeol3`의 개인 포트폴리오 기여 수에 합산하지 않는다. 인증된 `user/repos?visibility=public` 응답에서 실제 `full_name`과 `private=false`를 확인했고, 각 GitHub 저장소 메타데이터/트리도 읽었다. 조직 저장소 접근 권한은 소유권 또는 개별 코드 저자 증거로 해석하지 않았다.

### [ApptiveDev/Fin-BE](https://github.com/ApptiveDev/Fin-BE)

- 목적/유형: Y-FIN 금융상품 서비스 백엔드 원본 저장소. README는 OAuth2 로그인, JWT, 사용자·약관·카테고리, 개인 맞춤 금융상품 추천 등을 설명한다. 코드 트리에는 인증·검색·상품·계산기·사용자 모듈이 있다.
- 스택: Java 21, Spring Boot 4.0.3(현재 조사 시점의 `build.gradle`), Spring Security/OAuth2/JPA/Flyway, PostgreSQL, Docker Compose.
- category 제안: `web`. 단, **외부 팀 원본**으로 표시.
- `Fin-BE-test`와의 관계: GitHub fork API의 `parent.full_name`과 `source.full_name`은 모두 `ApptiveDev/Fin-BE`로 확인됐다. 따라서 `Fin-BE-test`의 원본 후보는 이 정확한 경로다. `Fin-BE-test`의 로컬 `build.gradle`과 parent의 현재 설정은 버전이 다르므로 fork와 현재 원본을 같은 스냅샷으로 보지 않는다.
- 근거: `README.md`, `build.gradle`, `src/main/java/apptive/fin/FinApplication.java`, `src/main/java/apptive/fin/search/controller/SearchController.java`, `src/main/resources/db/migration/`.
- 사용자 기여: 이 외부 원본에 대한 `yuyeol3`의 직접 기여는 이번 보고서의 증거로 주장하지 않는다. 확인된 직접 기여 증거는 `yuyeol3/Fin-BE-test`의 contributor/commit 기록이다.

### [ApptiveDev/Fin-API](https://github.com/ApptiveDev/Fin-API)

- 공개 여부/경로: `ApptiveDev/Fin-API`, GitHub API에서 `private=false`, `fork=false`, 공개 저장소로 확인했다. `Fin-BE-test`의 parent/source는 아니며 같은 조직의 별도 저장소다.
- 목적/유형: 저장소 설명은 Fin 프로젝트를 가리키고, 코드/의존성은 금융상품 API 수집 파이프라인을 나타낸다. `apicollector` Spring Batch 엔트리포인트, 은행별 URL 스크래퍼, Playwright/Jsoup, 금융감독원(FSS) client 코드가 있다.
- 스택: Java 21, Spring Boot 4.0.6, Spring Batch, JPA, Playwright, Jsoup, PostgreSQL/Flyway, Testcontainers.
- category 제안: `data`(수집/정규화 파이프라인 중심) 또는 팀 내 역할상 서비스 API가 강조되면 `web`. 코드 구조만으로 `data`를 우선 제안한다.
- 관련: `ApptiveDev/Fin-BE`와 같은 Fin 명칭/조직이고 BE README가 상품 데이터 공급과 관련 기능을 설명하지만, 이번 읽기만으로 두 저장소 간 현재 배포/호출 연결은 확인하지 못했다. 구조상 연계 후보로만 기록한다.
- 근거: README 없음. `build.gradle`의 Spring Batch/Playwright/Jsoup 의존성, `src/main/java/apptive/fin/apicollector/ApiCollectorApplication.java`, `bankurl/scraper/` 은행별 스크래퍼, `client/fss/`, `src/main/resources/application.yml`.
- 사용자 기여: 외부 팀 저장소. 여기서 개인 저자성/기여를 주장하지 않는다.

## 분류·노출 제안

- 먼저 보여줄 후보: `Fin-BE-test`(사용자 귀속 변경 근거 명확), `Fin-FE-test`(Fin 화면/API 흐름; BE와의 실연동은 별도 입증 필요), `death_chest`(게임 Behavior Pack 구현), `explain-diff`, `codex-subagent`, `claude-humanize-skill`(사용 목적과 문서가 분명한 도구).
- 보조로 둘 후보: `fullstack-practice`, `backend-study-sns`, `CoordinatesPlugin`, `hanja-hangul`, `ai_data`. 실습성·fork·실행 불확실성 등 성격을 카드 설명에 함께 표시한다.
- 학습/연습 아카이브: `2020OSS`, `algorithm_study`, `bojsrc`, `cc-hw5`, `codeTree`, `forkPractice`, `git-collab-demo`, `git-practice`.
- 대표 프로젝트에 두지 않을 작은/미완성 도구: `gitController`. 실행 가능한 도구로 소개하기 전에 안전한 인자 처리와 자격증명 흐름을 재검토할 필요가 있다.
- 제안한 category 집합은 현재 22개를 무리 없이 수용한다. 다만 `other`가 한자 변환 유틸과 Git 래퍼를 한데 담게 되므로, 향후 개발자 도구가 늘면 `developer-tools`를 추가하는 선택지가 있다. 현재 증거만으로 필수 변경은 아니다. `presentations`는 조사 범위에서 해당 저장소가 없어 사용되지 않았다.

## 한계와 불확실성

- 모든 확인은 GitHub 파일/메타데이터 읽기다. 코드 빌드·실행·테스트, 배포 URL 응답, API 연동 여부는 검증하지 않았다.
- README가 없는 저장소는 재귀 트리와 대표 코드/설정으로 목적을 분류했다. 문제 자동 업로드 아카이브(`bojsrc`)와 CodeTree의 개별 풀이 전체를 전수 검토했다고 주장하지 않는다.
- 외부 팀 저장소 `ApptiveDev/Fin-BE`, `ApptiveDev/Fin-API`와 개인 경로의 `Fin-BE-test`를 보고서에서 구분했다. 공개 접근 권한, fork 관계, contributor 집계는 저자성·소유권을 서로 대체하지 않는다.
