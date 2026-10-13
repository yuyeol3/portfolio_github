# yuyeol3 공개 저장소 조사 보고서

조사 기준일: 2026-10-14 (KST)

## 조사 방법과 판정 기준

배정된 공개 저장소 20개를 GitHub 인증 REST API의 읽기 전용 조회로 조사했다. 각 저장소의 메타데이터·기본 브랜치·재귀 트리·루트 README를 확인하고, README만으로 판단하기 어려운 저장소는 중첩 문서, 매니페스트, 진입점과 대표 구현 파일을 읽었다. README가 없으면 트리에서 문서와 소스 구조를 살폈다. 비어 있는 저장소는 GitHub API의 empty repository 응답으로 확인했다. 코드는 실행하지 않았고 원격 저장소를 변경하지 않았다.

pr-bot-sandbox의 parent 확인과 사용자 참여 근거를 위해 원본 kakaotechcampus-4/ktc4-pusan-4의 현재 기본 브랜치 develop도 읽기 전용으로 조사했다. 이 추가 조사는 원본 README·구현·stack·배포 상태, yuyeol3 작성자 PR 조회로 제한했다.

분류는 저장소 이름이 아니라 실제 파일과 문서에 근거한다. fork, 학습 예제, 목업, 발표물, 월드/에셋을 완성된 독립 제품으로 뭉뚱그리지 않았다.

## 분류 개요

| 저장소 | 확인된 성격 | 권장 category id | 확신 |
|---|---|---|---|
| helloWorld | C++ 한 줄 출력 예제, fork | learning | 내용 높음, 저자성 낮음 |
| hop | HWP/HWPX 데스크톱 앱, fork | other | 높음 |
| hyundai-autoever-portfolio | 직무 지원용 Markdown 포트폴리오 | portfolio 제안 | 높음 |
| iwb-term-chat | 빈 저장소, 설명만 채팅 기능 의도 | web (의도만) | 낮음 |
| kakao-assignment-1 | 제목만 있는 README | other / 보류 | 낮음 |
| kakaotech-learning-log | 빈 저장소 | other / 보류 | 낮음 |
| ktc4-pusan-4-progress | HTML 프레젠테이션 | presentations | 높음 |
| login-demo | OAuth2/JWT 학습용 앱 | learning | 높음 |
| maintain-code-map | Codex 개발용 skill과 검증기 | ai-tools | 높음 |
| mc-distributed | Minecraft 월드 공유 도구 | games | 높음 |
| merchant-category-classifier | 상호명 분류 실험 | data | 높음 |
| minecraftbe_world1 | Bedrock 월드·팩 자료 | games | 유형 높음 |
| plato-calendar3 | PLATO Chrome 확장 | web | 높음 |
| pr-bot-sandbox | KTC 팀 서비스의 fork 스냅샷 | web | 유형 높음, 완성도 중간 |
| random-busan-restaurants | 부산 맛집 추천 정적 웹앱 | web | 높음 |
| smart-trashbin | Arduino 펌웨어 및 웹서버 submodule | other | 높음 |
| smart-trashbin-server | 쓰레기통 관리 웹앱 | web | 높음 |
| software-engineer-portfolio | 직무 지원용 Markdown 포트폴리오 | portfolio 제안 | 높음 |
| Spring-Explore | Spring DI 학습 예제 | learning | 높음 |
| STL_study | 빈 저장소 | other / 보류 | 낮음 |

### 분류 체계 제안

기존 ai-tools, web, games, learning, data, presentations, other에 portfolio를 추가하는 것을 권한다. hyundai-autoever-portfolio와 software-engineer-portfolio는 문서형 포트폴리오이며, 일반 웹앱이나 발표 슬라이드와 성격이 다르다. 빈 저장소와 제목 외 내용이 없는 저장소는 이름만으로 학습 프로젝트로 단정하지 않고, 내용이 생길 때까지 other 또는 비노출로 두는 편이 정확하다.

## 저장소별 조사

### 1. helloWorld — learning

목적·유형: helloWorld.cc가 C++ 표준 출력으로 “Hello, World!”를 출력하는 최소 예제다. 실제 파일은 있지만 학습용 starter 수준이다.

기술: C++, 표준 입출력, Windows용 make.bat.

관계·근거: GitHub 메타데이터에서 yuyeol31/helloWorld의 fork로 확인했다. [README](https://github.com/yuyeol3/helloWorld/blob/main/README.md), [helloWorld.cc](https://github.com/yuyeol3/helloWorld/blob/main/helloWorld.cc), [fork 원본](https://github.com/yuyeol31/helloWorld).

불확실성: README는 제목뿐이다. fork 정보와 한 줄 코드만으로 별도 학습 목표나 독창적인 기여를 주장할 근거는 없다.

### 2. hop — other

목적·유형: HWP/HWPX 문서를 열고 편집·저장·PDF 내보내기·인쇄하는 다중 OS 데스크톱 애플리케이션이다. README 외에도 앱, 네이티브 코드, 테스트와 배포 워크플로가 있어 실제 구현 저장소다.

기술: Rust, Tauri 2, TypeScript 기반 studio host, macOS Quick Look용 Swift, Rust PDF/문서 어댑터. README는 문서 파싱·렌더링이 upstream rhwp 기반이라고 설명한다.

관계·근거: GitHub 메타데이터상 golbin/hop의 fork다. [README](https://github.com/yuyeol3/hop/blob/main/README.md), [개발 문서](https://github.com/yuyeol3/hop/blob/main/docs/DEVELOPMENT.md), [Tauri Cargo manifest](https://github.com/yuyeol3/hop/blob/main/apps/desktop/src-tauri/Cargo.toml), [host 진입점](https://github.com/yuyeol3/hop/blob/main/apps/studio-host/host/main.ts), [upstream](https://github.com/golbin/hop).

불확실성: fork에 들어 있는 모든 구현을 yuyeol3의 독자적 작업으로 볼 수 없다. 이 조사는 개별 커밋별 저자 기여량을 산정하지 않았다.

### 3. hyundai-autoever-portfolio — portfolio 제안

목적·유형: 현대오토에버 Backend Developer 지원용 README 한 파일로 된 문서형 포트폴리오다. Y-Fin, 카카오테크캠퍼스 팀 프로젝트, Yacht Online 경험과 역할·기술·검증 내용을 소개한다.

기술: 이 저장소에는 실행 코드나 빌드 매니페스트가 없다. README에 적힌 Java/Spring, PostgreSQL/JPA, Spring Batch, Redis, Docker/AWS는 연결된 프로젝트의 기술이다.

관계·근거: README가 [Y-Fin](https://github.com/ApptiveDev/Fin-BE), [데이터 수집기](https://github.com/ApptiveDev/Fin-API), [Yacht Online](https://github.com/yuyeol3/yacht-online), [KTC 팀 원본](https://github.com/kakaotechcampus-4/ktc4-pusan-4)을 연결한다. 트리에는 README 한 파일만 있다. [README](https://github.com/yuyeol3/hyundai-autoever-portfolio/blob/main/README.md).

불확실성: 성과와 수치는 포트폴리오가 서술한 내용이다. 이 저장소 자체가 외부 프로젝트 코드를 포함하거나 그 내용을 독립 검증하지 않는다.

### 4. iwb-term-chat — web (의도만)

목적·유형: 저장소 설명은 인웹기 텀프로젝트 채팅 기능 구현용이라고 밝힌다. 그러나 저장소가 비어 있어 채팅 구현이나 starter 파일은 없다.

기술: 확인할 매니페스트·진입점 없음.

근거: [저장소](https://github.com/yuyeol3/iwb-term-chat). GitHub API에서 empty repository로 응답했고 README도 없다.

불확실성: web은 설명에서 읽히는 의도 분류일 뿐, 구현이 존재한다는 뜻이 아니다. 구현 포트폴리오에는 현재 넣지 않는 편이 좋다.

### 5. kakao-assignment-1 — other / 보류

목적·유형: 재귀 트리에 README 한 파일만 있고 본문은 제목 kakao-assignment-1뿐이다. 과제 내용, starter 여부, 구현을 판별할 수 없다.

기술: 확인 가능한 소스나 매니페스트 없음.

근거: [README](https://github.com/yuyeol3/kakao-assignment-1/blob/main/README.md), [저장소](https://github.com/yuyeol3/kakao-assignment-1).

불확실성: 저장소 이름만으로 학습 과제라고 단정하지 않았다. README를 보강하거나 콘텐츠 목록에서 보류할 것을 권한다.

### 6. kakaotech-learning-log — other / 보류

목적·유형: README와 파일이 없는 빈 저장소다.

기술: 확인 불가.

근거: [저장소](https://github.com/yuyeol3/kakaotech-learning-log). GitHub API에서 empty repository로 응답했다.

불확실성: 이름 외의 학습 로그 증거가 없다. 내용 추가 전에는 learning 프로젝트로 소개하지 않는 것을 권한다.

### 7. ktc4-pusan-4-progress — presentations

목적·유형: 2026-10-04 작성일이 표시된 13장 팀 진행 보고 슬라이드다. 부산대 카카오테크캠퍼스 4팀의 9월 진행, 세무 경비 판정 서비스, 10월 계획과 위험을 설명한다.

기술: 단일 index.html 안에 CSS와 JavaScript 슬라이드 전환·키보드·터치 조작이 들어 있다. meeting.jpg가 포함되고 Google Fonts를 사용한다.

관계·근거: 설명 대상은 [kakaotechcampus-4/ktc4-pusan-4](https://github.com/kakaotechcampus-4/ktc4-pusan-4), 관련 사용자 fork는 [pr-bot-sandbox](https://github.com/yuyeol3/pr-bot-sandbox)다. [슬라이드 HTML](https://github.com/yuyeol3/ktc4-pusan-4-progress/blob/main/index.html), [미팅 이미지](https://github.com/yuyeol3/ktc4-pusan-4-progress/blob/main/meeting.jpg). 재귀 트리 파일 2개, README 없음.

불확실성: 팀 발표물이며 서비스 코드가 아니다. 슬라이드의 실적 수치를 원본 자료 전체와 별도로 대조하지는 않았다.

### 8. login-demo — learning

목적·유형: Google OAuth2 로그인 후 회원을 저장하고 JWT Access Token을 발급·검증하는 Spring Boot 데모 앱이다. 보안 설정, 필터, 예외 응답, DB 스키마와 테스트가 있어 실제 구현이 확인된다.

기술: Java 21, Spring Boot 4.0.3, Spring Security OAuth2 Client, Spring Data JPA, PostgreSQL, Gradle, Docker Compose.

근거: [README](https://github.com/yuyeol3/login-demo/blob/main/README.md), [SecurityConfig](https://github.com/yuyeol3/login-demo/blob/main/src/main/java/io/github/yuyeol3/logindemo/config/SecurityConfig.java), [OAuth2SuccessHandler](https://github.com/yuyeol3/login-demo/blob/main/src/main/java/io/github/yuyeol3/logindemo/auth/OAuth2SuccessHandler.java), [Gradle 설정](https://github.com/yuyeol3/login-demo/blob/main/build.gradle).

불확실성: 포트폴리오용 상용 서비스보다는 인증 학습·시연용 예제 성격이 강하다. 배포 여부나 실 OAuth 자격 증명은 확인하지 않았다.

### 9. maintain-code-map — ai-tools

목적·유형: Codex가 저장소 구조 지도(CODEMAP)를 만들고 갱신하도록 돕는 agent skill이다. 지침뿐 아니라 Python validator, 템플릿과 테스트가 포함된 개발 도구다.

기술: Markdown skill, Python 검증 스크립트, 템플릿과 테스트. 모델 호출이나 독립 서비스 실행 코드는 확인되지 않는다.

근거: 루트 README는 없다. [SKILL.md](https://github.com/yuyeol3/maintain-code-map/blob/main/SKILL.md), [agent metadata](https://github.com/yuyeol3/maintain-code-map/blob/main/agents/openai.yaml), [검증 스크립트](https://github.com/yuyeol3/maintain-code-map/tree/main/scripts), [템플릿](https://github.com/yuyeol3/maintain-code-map/tree/main/assets). 트리 파일 12개.

불확실성: Codex/agent 설치 환경에서의 배포나 사용 결과는 조사 과정에서 실행하지 않았다.

### 10. mc-distributed — games

목적·유형: 상시 서버 없이 친구들의 PC가 번갈아 Paper 호스트가 되어 Minecraft 월드를 공유하는 Java GUI/CLI 도구다. git push를 compare-and-swap 잠금으로 이용하고 세션 이관, 복구, 스냅샷과 네트워크 중계를 구현한다.

기술: Java 25, Gradle, JGit, Go Tailscale/tsnet helper, Node.js/Mineflayer E2E 봇, JUnit. CLI 진입점은 mcd.cli.Main이다.

관계·근거: Minecraft 생태계에서 [minecraftbe_world1](https://github.com/yuyeol3/minecraftbe_world1)과 주제는 닿지만, 두 저장소 사이 직접 의존이나 동일 월드 사용 근거는 확인되지 않았다. [README](https://github.com/yuyeol3/mc-distributed/blob/main/README.md), [아키텍처](https://github.com/yuyeol3/mc-distributed/blob/main/docs/ARCHITECTURE.md), [Gradle 빌드](https://github.com/yuyeol3/mc-distributed/blob/main/build.gradle.kts), [CLI 진입점](https://github.com/yuyeol3/mc-distributed/blob/main/src/main/java/mcd/cli/Main.java).

불확실성: README는 원격 친구 환경에서의 실사용은 아직 확인하지 않았다고 명시한다. 같은 PC VM·테스트 봇·일부 정품 클라이언트 확인과 구분해야 한다.

### 11. merchant-category-classifier — data

목적·유형: 공개 소상공인 상가 데이터로 카드 상호명의 업종·지출 카테고리를 분류하고 기존 규칙과 결합하는 실험 저장소다. 학습·예측 CLI, 32개 카테고리 매핑, 보고서와 평가 문서가 있다.

기술: Python, NumPy, scikit-learn HashingVectorizer(char n-gram), SGDClassifier(log-loss), joblib.

관계·근거: README와 mapping.py가 KTC 세무 판정 팀의 32개 카테고리 체계에 연결된다. 관련 저장소는 [KTC 원본](https://github.com/kakaotechcampus-4/ktc4-pusan-4)과 [yuyeol3 fork](https://github.com/yuyeol3/pr-bot-sandbox)다. [README](https://github.com/yuyeol3/merchant-category-classifier/blob/main/README.md), [실험 보고서](https://github.com/yuyeol3/merchant-category-classifier/blob/main/REPORT.md), [학습 진입점](https://github.com/yuyeol3/merchant-category-classifier/blob/main/train.py), [mapping.py](https://github.com/yuyeol3/merchant-category-classifier/blob/main/mapping.py).

불확실성: 보고서는 실제 카드셋의 명확 라벨 표본이 60건으로 작다고 밝힌다. in-domain 평가값을 실제 결제 도메인의 일반화 성능으로 소개하면 안 된다.

### 12. minecraftbe_world1 — games

목적·유형: 루트 README 없는 Minecraft Bedrock 월드와 게임 팩 자료다. Bedrock level 아래 LevelDB .ldb, NBT, 월드 데이터, behavior/resource pack manifest가 있다. 재귀 트리는 6,304개 항목으로, 코드 제품보다 월드·에셋 번들에 가깝다.

기술: Bedrock 월드 데이터, LevelDB, NBT, JSON 팩 정의, PNG 텍스처.

관계·근거: [저장소 트리](https://github.com/yuyeol3/minecraftbe_world1/tree/main), [화학 behavior pack manifest](https://github.com/yuyeol3/minecraftbe_world1/blob/main/Bedrock%20level/behavior_packs/chemistry/manifest.json), [Bedrock DB 디렉터리](https://github.com/yuyeol3/minecraftbe_world1/tree/main/Bedrock%20level/db). mc-distributed와는 주제가 같지만 직접 연결은 확인되지 않는다.

불확실성: 문서가 없어 월드 플레이 목적·제작자·기본 팩과 수정 팩의 구분을 확정할 수 없다. 대량의 기본 팩 파일도 있으므로 에셋 저작성을 주장하지 않는 편이 안전하다.

### 13. plato-calendar3 — web

목적·유형: 부산대 PLATO에서 과제·퀴즈·영상·Zoom 일정을 수집해 달력과 상세 UI를 제공하는 Chrome Extension Manifest V3다. 백그라운드 수집, 로컬 저장, 콘텐츠 스크립트 UI, 테스트와 빌드 파일이 있다.

기술: TypeScript, Chrome Extension MV3, esbuild, node-html-parser, chrome.storage.local, Vitest/jsdom.

관계·근거: [software-engineer-portfolio](https://github.com/yuyeol3/software-engineer-portfolio)가 기타 프로젝트로 링크한다. [README](https://github.com/yuyeol3/plato-calendar3/blob/main/README.md), [manifest](https://github.com/yuyeol3/plato-calendar3/blob/main/manifest.json), [일정 수집 진입점](https://github.com/yuyeol3/plato-calendar3/blob/main/src/background/updateSchedule.ts), [실제 자료와 검증 한계](https://github.com/yuyeol3/plato-calendar3/blob/main/tests/fixtures/README.md).

불확실성: 실제 학생 강좌 화면 일부를 확인했다는 설명과 함께 영상 출석의 상세 조건·Zoom 완료 결과는 확보하지 못했다고 기록돼 있다. 문서에 적힌 검증 범위를 넘겨서 소개하지 않는다.

### 14. pr-bot-sandbox — web

목적·유형: 이 저장소는 kakaotechcampus-4/ktc4-pusan-4의 fork다. README는 카카오테크캠퍼스 부산대 팀의 종합소득세 경비 판정 서비스를 소개한다. 사용자 fork 트리에는 프런트, Spring 백엔드, Python AI/RAG, 규칙 카드·평가셋·DB·배포 파일이 있어 이름과 달리 빈 sandbox 저장소가 아니다.

기술: Java 21/Spring Boot 3.5, JPA/PostgreSQL/Flyway; React/TypeScript/Vite; Python 3.12/FastAPI/OpenAI API 및 법령 검색·규칙 후보 파이프라인; Docker Compose와 AWS 배포 구성.

구현 상태: 원본 backend/README.md는 서비스 레이어 구현 전 API가 MockData의 고정 응답을 반환한다고 설명한다. 원본 docs/deployment.md는 프런트가 목업 데이터로 동작하고 주요 백엔드 API가 501을 반환하며 배포 완료 기준도 전체 스택 기동이라고 명시한다. 동시에 JudgmentEngine, 규칙 카드, 평가셋, persistence/API 코드와 Python 검색·초안 파이프라인도 실제 파일로 존재한다. 따라서 완성된 AI 서비스를 주장하기보다 “규칙 엔진과 일부 서비스 구현, 목업·미구현 API가 공존하는 개발 중 팀 제품”으로 소개하는 편이 정확하다. ai/app/main.py는 health 및 DB health 엔드포인트를 제공하고, AI 파이프라인은 별도 모듈로 있다.

yuyeol3 참여 근거: 원본 GitHub REST API에서 작성자 login이 yuyeol3인 병합 PR을 확인했다. [PR #89: 배포와 같은 Docker 이미지 빌드를 CI에 추가](https://github.com/kakaotechcampus-4/ktc4-pusan-4/pull/89), [PR #99: 공휴일 테이블 동기화](https://github.com/kakaotechcampus-4/ktc4-pusan-4/pull/99), [PR #105: 판정·질문 응답 필드 추가](https://github.com/kakaotechcampus-4/ktc4-pusan-4/pull/105), [PR #114: G2 확정 불가 조기 반환](https://github.com/kakaotechcampus-4/ktc4-pusan-4/pull/114), [PR #118: 판정 origin 및 UserFact batch 범위](https://github.com/kakaotechcampus-4/ktc4-pusan-4/pull/118). 다섯 건 모두 API상 작성자 yuyeol3, closed/merged로 확인했다.

근거: [배정 fork README](https://github.com/yuyeol3/pr-bot-sandbox/blob/develop/README.md), [fork parent 원본 README](https://github.com/kakaotechcampus-4/ktc4-pusan-4/blob/develop/README.md), [원본 backend README](https://github.com/kakaotechcampus-4/ktc4-pusan-4/blob/develop/backend/README.md), [실제 판정 엔진](https://github.com/kakaotechcampus-4/ktc4-pusan-4/blob/develop/backend/src/main/java/com/ktc4/pusan4/judgment/domain/JudgmentEngine.java), [배포 문서와 한계](https://github.com/kakaotechcampus-4/ktc4-pusan-4/blob/develop/docs/deployment.md), [AI 매니페스트](https://github.com/kakaotechcampus-4/ktc4-pusan-4/blob/develop/ai/pyproject.toml), [프런트 매니페스트](https://github.com/kakaotechcampus-4/ktc4-pusan-4/blob/develop/frontend/package.json).

불확실성: yuyeol3 fork의 마지막 push는 2026-10-05, 원본은 2026-10-13에 갱신되어 조사 시점의 최신 상태는 원본을 기준으로 삼았다. PR은 개인 참여 근거이지 팀 전체 결과의 개인 단독 소유 근거가 아니다. 서비스 완성도는 변할 수 있으므로 공개 시점에는 원본 배포 문서를 다시 확인할 필요가 있다.

### 15. random-busan-restaurants — web

목적·유형: 부산 지역 옵션을 적용해 맛집 5곳을 무작위로 뽑고 상세 정보·지도·즐겨찾기를 보여주는 정적 웹앱이다.

기술: Vanilla JavaScript, HTML/CSS, localStorage 기능, Naver Maps JavaScript API. npm 매니페스트는 없다.

구현 구분: result.js의 API 조회 코드는 주석 처리돼 있고, 실제 결과 데이터는 js/consts.js의 정적 RESTAURANTS 배열에서 온다. 현재 구현을 실시간 공공 API 연동이라고 설명하면 안 된다.

근거: README 없음. [메인 화면](https://github.com/yuyeol3/random-busan-restaurants/blob/main/main.html), [결과 선택 로직](https://github.com/yuyeol3/random-busan-restaurants/blob/main/js/result.js), [내장 데이터](https://github.com/yuyeol3/random-busan-restaurants/blob/main/js/consts.js), [결과 화면](https://github.com/yuyeol3/random-busan-restaurants/blob/main/result.html).

불확실성: 데이터 출처와 최신성, 지도 API 키의 운영 상태는 트리와 코드만으로 확인하지 않았다.

### 16. smart-trashbin — other

목적·유형: 캔·페트·일반 쓰레기 분류, 근접 자동 개폐, 적재 상태 측정 프로젝트의 Arduino 센서·모터 펌웨어다. README는 센서 판별과 UART 전달, 서버 보고 흐름을 설명한다.

기술: Arduino/C++ .ino, 초음파·ToF·로드셀·근접/광 센서, 서보 모터, UART와 Wi-Fi 모듈.

관계·근거: .gitmodules가 webserver를 [smart-trashbin-server](https://github.com/yuyeol3/smart-trashbin-server)에 연결한다. [README](https://github.com/yuyeol3/smart-trashbin/blob/main/readme.md), [submodule 설정](https://github.com/yuyeol3/smart-trashbin/blob/main/.gitmodules), [재질 센서](https://github.com/yuyeol3/smart-trashbin/blob/main/Module_MaterialSensor/Module_MaterialSensor.ino), [상태 센서](https://github.com/yuyeol3/smart-trashbin/blob/main/Module_StatusSensor/Module_StatusSensor.ino), [모터 코드](https://github.com/yuyeol3/smart-trashbin/blob/main/Module_Motors/Module_Motors.ino).

불확실성: 코드와 사진은 있지만 실제 분류 정확도나 하드웨어 측정 성능은 검증하지 않았다. 서버는 별도 저장소다.

### 17. smart-trashbin-server — web

목적·유형: 하드웨어 쓰레기통 상태 조회·검색, 관리자 로그인, 쓰레기통 CRUD와 관리자 등록을 제공하는 서버 및 관리 웹앱이다.

기술: Node.js, Express 4, Passport local/session, Nunjucks, MySQL/mysql2, HTML/CSS/JavaScript.

관계·근거: [smart-trashbin](https://github.com/yuyeol3/smart-trashbin)의 submodule이며 README도 장치 데이터 저장·조회 서버라고 설명한다. [README](https://github.com/yuyeol3/smart-trashbin-server/blob/main/readme.md), [package.json](https://github.com/yuyeol3/smart-trashbin-server/blob/main/package.json), [Express 진입점](https://github.com/yuyeol3/smart-trashbin-server/blob/main/app.js), [DB SQL](https://github.com/yuyeol3/smart-trashbin-server/blob/main/adventure_design.sql).

불확실성: 배포·운영 여부는 확인하지 않았다. README의 환경 파일 예시와 달리 공개 트리에는 실제 .env가 없다.

### 18. software-engineer-portfolio — portfolio 제안

목적·유형: CJ올리브네트웍스 Software Engineer 지원용 README 한 파일짜리 Markdown 포트폴리오다. Y-FIN, Yacht Online, Kyverno Governance Platform, 일정관리 AI 에이전트의 역할·문제·검증 근거와 링크를 정리한다.

기술: 이 저장소 자체에는 실행 코드나 빌드 매니페스트가 없다. Java/Spring, NestJS/Kubernetes, Python/RAG/MCP는 README가 연결 프로젝트의 기술로 소개한다.

관계·근거: 배정 저장소인 [plato-calendar3](https://github.com/yuyeol3/plato-calendar3), [maintain-code-map](https://github.com/yuyeol3/maintain-code-map)을 연결한다. 재귀 트리는 README 한 파일이다. [README](https://github.com/yuyeol3/software-engineer-portfolio/blob/main/README.md).

불확실성: README의 성과 주장은 연결된 PR·저장소에서 확인되는 범위와 문서의 자기 서술을 구분해야 한다. 이 저장소 자체를 코드 제품으로 분류하지 않는다.

### 19. Spring-Explore — learning

목적·유형: 자동차와 타이어 예제로 Spring IoC/DI를 실험하는 Java 학습 코드다. annotation 기반 component/constructor injection, XML bean 설정과 테스트가 있다.

기술: Java 21, Spring Boot 4.0.1, Gradle, Spring Context와 Boot test.

근거: README 없음. [Gradle manifest](https://github.com/yuyeol3/Spring-Explore/blob/main/build.gradle), [Driver 진입점](https://github.com/yuyeol3/Spring-Explore/blob/main/src/main/java/io/github/yuyeol3/spring_explore/Driver.java), [Car DI](https://github.com/yuyeol3/Spring-Explore/blob/main/src/main/java/io/github/yuyeol3/spring_explore/Car.java), [XML bean 설정](https://github.com/yuyeol3/Spring-Explore/blob/main/src/main/resources/beans.xml), [CarTest](https://github.com/yuyeol3/Spring-Explore/blob/main/src/test/java/io/github/yuyeol3/spring_explore/CarTest.java).

불확실성: 특정 개념을 보여주는 작은 학습 저장소이며 서비스 앱은 아니다.

### 20. STL_study — other / 보류

목적·유형: GitHub API에서 빈 저장소로 확인됐다. README, 파일, 매니페스트, 코드가 없다.

기술: 확인 불가.

근거: [저장소](https://github.com/yuyeol3/STL_study) (empty repository 응답).

불확실성: 이름은 분류 근거로 사용하지 않았다. 콘텐츠가 생기기 전에는 노출을 보류하는 것을 권한다.

## 전체 점검과 제한

- 배정 목록 **20/20**을 조회했다. 빈 저장소는 iwb-term-chat, kakaotech-learning-log, STL_study 3개다.
- README가 없거나 제목뿐인 저장소도 매니페스트·트리·진입점으로 확인했다. README 없음: ktc4-pusan-4-progress, maintain-code-map, minecraftbe_world1, random-busan-restaurants, Spring-Explore. 빈 저장소 3개에는 README가 없다.
- pr-bot-sandbox의 원본 parent는 kakaotechcampus-4/ktc4-pusan-4로 확인했다. 원본의 README·현재 구현·stack·배포 상태를 별도 조사하고 yuyeol3 작성자 병합 PR 5건을 검증했다.
- 코드 실행이나 성능 재현은 하지 않았다. 게임 월드 바이너리, 하드웨어, 외부 API, 비공개 사용자 자료는 저장소 파일 수준의 증거와 검증 한계를 함께 기록했다.
