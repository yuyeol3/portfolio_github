# 추가 외부 공개 저장소 조사 1

조사일: 2026-10-14. 이번 조사 범위는 아래 정확한 원본 경로 3개뿐이다. 모두 인증된 `gh api` 메타데이터에서 `private=false`를 확인했다. 저장소 메타데이터, README, 재귀 트리, 의존성 manifest, 주요 진입점, 사용자 작성 PR의 상태·대상 브랜치·변경 파일·관련 커밋을 읽었다. 저장소 소스·빌드·테스트·설치 명령은 실행하지 않았다. 다른 저장소로 추가 조사를 확장하지 않았다.

사용자가 제공한 자동 GraphQL 발견 기준은 COMMIT/PULL_REQUEST/PULL_REQUEST_REVIEW이며 전체 발견 수는 8개다. 이 보고서는 그중 요청받은 새 항목 3개를 조사한 결과다. 전체 8개 또는 review 이벤트 전체를 재검증한 보고서는 아니다. 자동 발견은 참여 이벤트의 존재를 의미하며, 기본 브랜치에 구현이 있거나 사용자 코드가 병합되었다는 뜻으로 해석하지 않았다.

## 요약

| 정확한 저장소 | 확인한 성격 | 추천 category | 사이트 노출 제안 |
|---|---|---|---|
| ApptiveDev/backend-study-sns | 기본 main은 스타터, 개인 학습 브랜치 및 PR에 SNS 구현 | learning (보조 web) | 학습 프로젝트로 노출, 구현 브랜치/PR 링크 제공 |
| PNU-2026-AI-Hackathon/StarterTemplate | README 가이드 문서 템플릿 | learning | 대표 프로젝트에서 제외; 참여 발견 기록으로만 유지 |
| PNU-2026-AI-Hackathon/pnuai-c-07-finfin2 | 템플릿 fork에서 발전한 실제 금융 추천 서비스·수집기 구현 | web (보조 data) | 핵심 팀 프로젝트 후보; 사용자 역할과 병합 PR 함께 노출 |

## 1. ApptiveDev/backend-study-sns

저장소: https://github.com/ApptiveDev/backend-study-sns

### 목적과 구현/학습 성격

기본 브랜치 `main`의 README는 저장소 제목만 있다. 재귀 트리에는 12개 파일, Spring Boot 시작 클래스와 기본 context 테스트, Gradle wrapper/config가 있다. main에는 SNS controller/service/domain 구현이 없다. 따라서 원본 main을 완성된 SNS 서비스로 소개하면 부정확하다.

다만 사용자 PR의 대상인 `최유렬` 브랜치에는 64개 파일이 있고, 게시글·댓글·회원·좋아요·팔로우의 controller/service/repository/domain과 테스트가 있다. 직접 읽은 `PostController`는 생성·조회·삭제·목록 API를 제공하고, `PostService`는 JPA repository로 저장/조회한다. 실질적인 SNS 백엔드 학습 구현은 이 브랜치와 PR 변경에서 확인된다.

### 스택과 진입점

- main: Java 21, Spring Boot 3.5.6, Spring Web, Gradle, Spring Boot Test.
- `최유렬` 브랜치: 위 구성에 Validation, Spring Data JPA, MySQL runtime, Docker Compose가 추가되어 있다.
- 진입점: `src/main/java/com/example/devSns/DevSnsApplication.java`의 `SpringApplication.run`.
- JWT/Refresh Token은 열린 PR #34의 변경이며, 확인한 병합 대상 브랜치에 이미 포함된 기능으로 간주하지 않았다.

### yuyeol3 참여 근거

모두 PR 작성자 `yuyeol3`를 API에서 확인했다.

| PR | 상태 | 확인한 내용 |
|---|---|---|
| [#4 Feat/week-1](https://github.com/ApptiveDev/backend-study-sns/pull/4) | closed, merged=false | 게시글 CRUD 학습 제출; controller/service/repository 변경 파일 확인 |
| [#16 Feat/week-2](https://github.com/ApptiveDev/backend-study-sns/pull/16) | merged, 2025-11-14 | 대상 `최유렬`; JPA/MySQL 전환, DTO/validation, 페이지네이션 및 피드백 반영 |
| [#28 Feat/week3](https://github.com/ApptiveDev/backend-study-sns/pull/28) | merged, 2025-11-23 | 대상 `최유렬`; 회원·좋아요·팔로우 구현 변경 |
| [#34 Feat/week4](https://github.com/ApptiveDev/backend-study-sns/pull/34) | open, merged=false | 대상 `최유렬`; JWT 인증/인가, Refresh Token, 팔로우 수정, 테스트 제출 |

#34의 PR commits API에서 `85fe43887bac`(JWT 관련 구성), `5f4585db0209`(AuthController/AuthService/RefreshTokens), `487bb6fc4b83`(refresh token 해시 저장)의 author login이 `yuyeol3`임을 확인했다. 기본 main을 대상으로 한 author-filtered commits 응답은 비어 있었다. 이것은 참여 부재가 아니라 기본 브랜치와 학습 브랜치의 차이를 보여준다.

### 카테고리와 간결한 사이트 설명

- 추천: `learning`; 웹 백엔드 기술 태그를 함께 붙인다.
- 설명 제안: **“Spring Boot SNS 백엔드 학습 프로젝트. 게시글·댓글·회원·좋아요·팔로우 구현과 JWT 인증 과제를 PR로 제출했습니다.”**
- 사이트에서 JWT는 미병합 과제임을 표시하고, main 링크와 함께 학습 브랜치/PR 링크를 제공하는 것이 정확하다.
- 이전 조사한 개인 fork와 같은 프로젝트 계열이므로 독립 대표 프로젝트를 중복 생성하기보다 학습 항목의 원본·PR 근거로 연결할 수 있다.

### 파일 증거와 불확실성

- main snapshot: `a607f02f266005fb9606af4214eb9cb5080eecee`, tree `truncated=false`, 12개 파일.
- 학습 브랜치 snapshot: `a7eba07a8f3ffba7bbdb9db2f7ea659b3ee3c140`, tree `truncated=false`, 64개 파일.
- [main README](https://github.com/ApptiveDev/backend-study-sns/blob/a607f02f266005fb9606af4214eb9cb5080eecee/README.md), [main build.gradle](https://github.com/ApptiveDev/backend-study-sns/blob/a607f02f266005fb9606af4214eb9cb5080eecee/build.gradle).
- [학습 브랜치 build.gradle](https://github.com/ApptiveDev/backend-study-sns/blob/a7eba07a8f3ffba7bbdb9db2f7ea659b3ee3c140/build.gradle), `src/main/java/com/example/devSns/controller/PostController.java`, `service/PostService.java`, `src/test/java/com/example/devSns/ApiIntegrationTest.java`.
- 실행/테스트 결과를 재현하지 않았다. PR 본문의 테스트 수행 설명은 작성자 기록이며 이번 검증 결과가 아니다.

## 2. PNU-2026-AI-Hackathon/StarterTemplate

저장소: https://github.com/PNU-2026-AI-Hackathon/StarterTemplate

### 목적과 스타터 성격

GitHub Classroom 설명과 README가 해커톤 참가자의 저장소 생성, 폴더 구성, README 작성법을 안내한다. 재귀 트리는 `README.md`, `SAMPLE_README1.md` 두 문서뿐이다. 코드 프로젝트용 dependency manifest나 실행 진입점은 없다.

샘플 문서의 Python/Django/Node/Vue 버전 표와 Online Judge 화면 설명은 작성 예시다. 이 저장소가 해당 스택으로 구현된 서비스라는 근거로 사용하지 않는다. 이미지도 문서 예시 링크이며 이 저장소의 실제 앱 기능으로 분류하지 않는다.

### 스택과 진입점

- 실제 자산: Markdown, README 가이드, 외부 이미지/링크.
- manifest/주요 실행 진입점: 없음.
- 추천 유형: 문서 템플릿/해커톤 안내 자료. 소프트웨어 스타터 코드는 없다.

### yuyeol3 참여 근거

[PR #44 Backend/fix/yuyeol3/bank rate matching](https://github.com/PNU-2026-AI-Hackathon/StarterTemplate/pull/44)의 작성자 `yuyeol3`, 상태 `closed`, `merged=false`, `merged_at=null`을 확인했다. PR base는 이 템플릿의 `main`, head repository는 `PNU-2026-AI-Hackathon/pnuai-c-07-finfin2`, head branch는 `backend/fix/yuyeol3/bank-rate-matching`이다.

PR 변경 파일에는 `api/`, `backend/` 등 Fin 프로젝트 코드가 나타나며, PR commits에는 여러 작성자의 106개 커밋이 포함된다. 일부 커밋의 author login은 `yuyeol3`이지만, 해당 PR 전체를 사용자가 독자 작성한 106개 커밋이라고 해석할 수 없다. 기본 브랜치의 `commits?author=yuyeol3` 응답은 비어 있다.

따라서 자동 참여 발견의 근거는 **이 원본을 대상으로 PR을 작성한 이벤트**다. 템플릿 본문 개발 기여 또는 원본에 병합된 금융 서비스 구현의 증거로 사용하지 않는다. 실수로 PR 대상을 선택했는지 여부는 기록만으로 단정하지 않는다.

### 카테고리와 간결한 사이트 설명

- 추천: `learning` 또는 내부 기록용 `other`. 대표 프로젝트 카드에는 제외 권고.
- 설명 제안: **“PNU AI 해커톤의 저장소 구성·README 작성 가이드 템플릿.”**
- 참여 표시가 필요하면 “관련 팀 프로젝트에서 미병합 PR 작성 기록”을 붙인다. 개인 프로젝트 소유/개발 기록으로 노출하지 않는다.

### 파일 증거와 불확실성

- snapshot: `6e906c95c0d1607835cc0c39b7fbc221bedae50c`, tree `truncated=false`, 2개 파일.
- [README](https://github.com/PNU-2026-AI-Hackathon/StarterTemplate/blob/6e906c95c0d1607835cc0c39b7fbc221bedae50c/README.md), [샘플 README](https://github.com/PNU-2026-AI-Hackathon/StarterTemplate/blob/6e906c95c0d1607835cc0c39b7fbc221bedae50c/SAMPLE_README1.md), PR #44 metadata/files/commits.
- PR 작성 의도는 설명 본문이 없어 확인하지 못했다. 자동 발견을 대표 프로젝트 선정으로 바로 연결하면 오분류될 수 있는 사례다.

## 3. PNU-2026-AI-Hackathon/pnuai-c-07-finfin2

저장소: https://github.com/PNU-2026-AI-Hackathon/pnuai-c-07-finfin2

### 목적과 실제 구현 성격

Y-Fin 청년 금융상품 비교·추천 서비스의 해커톤 팀 저장소다. GitHub `fork=true`이고 `parent`와 `source`는 모두 `PNU-2026-AI-Hackathon/StarterTemplate`이다. 그러나 현재 tree에는 531개 파일과 `frontend/`, `backend/`, `api/`, `database/`, `docs/` 등 구현·설명 자산이 있어 템플릿 그대로의 저장소가 아니다.

루트 README, `backend/README.md`, `frontend/README.md`, `docs/ai-usage.md`를 확인했다. 프론트 라우팅에는 로그인·약관·추천·상품 목록/상세·계산기·마이페이지가 있고, 백엔드 `SearchController`는 동적 입력 폼과 상품 검색/추천/상세 요청을 서비스에 전달한다. 수집기에는 Spring Batch, 은행별 Playwright URL 수집, FSS 데이터 정규화, Gemini LLM 보강 코드가 있다. 따라서 실제 구현이 있는 팀 웹 프로젝트로 분류한다.

README의 배포 완료·설문·정규화 상품 수·사업 지표·성과 수치는 팀의 문서상 주장이다. 이번 조사는 코드 구조와 사용자 참여 근거를 확인한 것이며, 해당 수치나 배포 서비스의 현재 응답은 확인하지 않았다. 개발 계획 PDF와 `docs/img/` 자산은 부속 기획·시각 자료로만 기록했고 PDF/이미지 본문은 별도 검토하지 않았다.

### 스택과 주요 진입점

- 프론트: React 19.2, Vite 7.3, React Router 7, Axios, Tailwind CSS, styled-components, Framer Motion; Node 22/pnpm 10 요구사항.
- 백엔드: Java 21, Spring Boot 4.0.3, Spring Web/Security/OAuth2/JPA/Validation/Cache, PostgreSQL, Flyway, Gradle.
- 수집기: Java 21, Spring Boot 4.0.6, Spring Batch, JPA, RestClient, Playwright 1.61, Jsoup, PostgreSQL/Flyway, Gemini API 호출 구현.
- 테스트 의존성: Spring Test/Security Test, Testcontainers. 소스/의존성 존재만 확인했고 실행하지 않았다.
- 엔트리포인트: `frontend/src/main.jsx` → `App.jsx`; `backend/src/main/java/apptive/fin/FinApplication.java`; `api/src/main/java/apptive/fin/apicollector/ApiCollectorApplication.java`.
- 관련 구현: `backend/.../search/controller/SearchController.java`; `api/.../llm/gemini/GeminiLlmProviderClient.java`. 후자는 출력 토큰 상한 설정을 주입하고 Gemini 요청을 전송한다.

### yuyeol3 참여 근거

기본 브랜치 author-filtered commits 응답에 `yuyeol3` 귀속 구현 커밋이 다수 존재한다. 사용자 작성 PR의 작성자, 병합 상태와 실제 변경 파일도 확인했다.

| 근거 | 확인한 참여 |
|---|---|
| [PR #28 URL 수집기 통합](https://github.com/PNU-2026-AI-Hackathon/pnuai-c-07-finfin2/pull/28) | author=yuyeol3, merged=true(2026-09-14). 은행 URL scraper/worker/persistence 및 batch 연동 변경 파일 확인 |
| [PR #40 LLM 출력 무한루프 방지](https://github.com/PNU-2026-AI-Hackathon/pnuai-c-07-finfin2/pull/40) | author=yuyeol3, merged=true(2026-09-20). Gemini client·프롬프트·enricher·설정·테스트 변경 확인 |
| [PR #41 원본/표시 상품명 분리](https://github.com/PNU-2026-AI-Hackathon/pnuai-c-07-finfin2/pull/41) | author=yuyeol3, merged=true(2026-09-13). 이름 분리와 정규화 후 표시 이름 처리에 관한 구현 제출 |
| [커밋 63cc1965](https://github.com/PNU-2026-AI-Hackathon/pnuai-c-07-finfin2/commit/63cc1965a7e22b5864298bd69cc70df9f6f5e008) | author login=yuyeol3. commit detail에서 GeminiLlmProviderClient, FssEnrichmentPromptBuilder, FssLlmProductDraftEnricher, 설정 및 테스트 파일 변경 확인 |
| [커밋 49e712d5](https://github.com/PNU-2026-AI-Hackathon/pnuai-c-07-finfin2/commit/49e712d57f4e2f73c5257e01672e2357b63ddf93) | author login=yuyeol3. URL 수집기 통합 커밋 기록 |
| [커밋 c3da8044](https://github.com/PNU-2026-AI-Hackathon/pnuai-c-07-finfin2/commit/c3da804426425a690841af1dd23e7b4a8a6108ca) | author login=yuyeol3. 인증/인가 및 사용자 탈퇴 구현·테스트 관련 기록 |

루트 README 팀 소개는 최유렬의 담당을 Auth·Data(OAuth2/JWT/외부 API 전처리·저장)로 적는다. 이 역할 설명은 실제 `yuyeol3` PR/커밋에서 보이는 인증·수집기 작업과 일치한다. 계정의 개인 신원 자체를 별도 외부 자료로 검증한 것은 아니다. 모든 팀 코드를 사용자의 단독 구현으로 소개하지 않는다.

### 카테고리와 간결한 사이트 설명

- 추천 primary: `web`; secondary/tag: `data`, AI 기반 정규화, 해커톤, 팀 프로젝트.
- 설명 제안: **“청년의 가입 조건과 우대금리를 반영해 금융상품을 비교·추천하는 Y-Fin. OAuth2/JWT 인증과 금융 데이터 수집·LLM 정규화 개발에 참여했습니다.”**
- 핵심 포트폴리오 후보로 권고한다. 단순 fork 여부보다 구현 트리와 사용자 귀속 병합 PR이 강한 근거다.
- 이전 Fin-BE/Fin-API/Fin-FE-test 조사와 같은 Y-Fin 계열로 묶는 것이 합리적이다. 이번 README가 `backend=Fin-BE`, `api=Fin-API`, `frontend=Fin-FE`를 명시하므로 같은 제품의 저장소/모듈 링크로 정리하고 프로젝트 수를 중복 집계하지 않는 편이 좋다. 이번에는 다른 경로를 다시 조사하지 않았다.

### 파일 증거와 불확실성

- snapshot: `63cc1965a7e22b5864298bd69cc70df9f6f5e008`, 기본 브랜치 `main`, tree `truncated=false`, blob 531개.
- [루트 README](https://github.com/PNU-2026-AI-Hackathon/pnuai-c-07-finfin2/blob/63cc1965a7e22b5864298bd69cc70df9f6f5e008/README.md).
- manifests: `frontend/package.json`, `backend/build.gradle`, `api/build.gradle`.
- 진입점/구현: `frontend/src/main.jsx`, `frontend/src/App.jsx`, `backend/src/main/java/apptive/fin/FinApplication.java`, `backend/src/main/java/apptive/fin/search/controller/SearchController.java`, `api/src/main/java/apptive/fin/apicollector/ApiCollectorApplication.java`, `api/src/main/java/apptive/fin/apicollector/llm/gemini/GeminiLlmProviderClient.java`.
- [AI 활용 문서](https://github.com/PNU-2026-AI-Hackathon/pnuai-c-07-finfin2/blob/63cc1965a7e22b5864298bd69cc70df9f6f5e008/docs/ai-usage.md)에는 temperature=0 설명이 남지만 PR #40은 0.3으로 변경했다고 기록한다. 문서와 최신 변경의 시점 차이를 주의해야 한다.
- PR #40의 시간·실패율 개선 수치는 작성자의 로컬 평가 기록이다. 이번 조사에서 재현하거나 미사용 데이터에 대한 일반화 효과를 확인하지 않았다.
- 기능 구현과 테스트 파일 존재를 확인했으나, 운영 보안·추천 정확도·데이터 최신성·LLM 성능·배포 성공을 검증한 것은 아니다.

## 완료 범위

추가 요청 3개 저장소 모두 조사 완료. 세 경로의 공개 여부, README/트리, manifest/진입점 존재 여부, 사용자 PR/커밋 참여 근거, category와 사이트 설명 제안을 기록했다. 저장 파일은 `docs/research-external-1.md` 한 개다.
