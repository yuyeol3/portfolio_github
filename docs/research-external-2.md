# 추가 공개 참여 저장소 조사 — external-2

조사일: 2026-10-14 (KST). 범위: kakaotechcampus-4/pusan-clone, pnucse-capstone2026/capstone-2026-team-30 두 공개 원본만.

인증된 gh REST API로 메타데이터, 기본 브랜치 README, 재귀 트리, 매니페스트, 대표 진입점·구현, PR 작성자·병합 상태 및 커밋 작성자·변경 경로를 읽었다. pusan-clone은 개인 작업이 기본 브랜치가 아닌 choiyuyeol/final에 있어 해당 브랜치도 조사했다. 소스·테스트·설치 스크립트는 실행하지 않았다. 파일 개수는 디렉터리를 포함한 Git tree 항목 수다.

## 통합용 요약

| 원본 공개 경로 | 실제 성격 | 권장 category id | 사이트 표시 제목 | 신뢰도 |
|---|---|---|---|---|
| [kakaotechcampus-4/pusan-clone](https://github.com/kakaotechcampus-4/pusan-clone) | 공용 교육 기반 코드 + 개인 브랜치의 6주 일정 에이전트 구현 | ai-tools (보조: learning) | 일정관리 AI 에이전트 | 높음: 개인 PR·브랜치·구현 확인 |
| [pnucse-capstone2026/capstone-2026-team-30](https://github.com/pnucse-capstone2026/capstone-2026-team-30) | 실제 구현을 포함한 졸업과제 제출용 팀 모노레포 | web | Kyverno Governance Platform | 높음: README 역할·작성자 커밋·변경 파일 확인 |

두 저장소 모두 GitHub 메타데이터상 fork=false다. 조직 소유라는 사실과 사용자 기여 여부를 구분했다. 전체 코드를 사용자 단독 제작으로 소개할 근거는 없다.

## 1. kakaotechcampus-4/pusan-clone

### 목적과 starter/구현 구분

카카오테크캠퍼스 일정관리 Agent 실습용 공용 저장소다. 기본 브랜치 main의 README는 Week 1 수강생 실습, 제공된 fixed 공통 코드와 학생 구현 파일, 초기 TODO를 설명한다. 재귀 트리는 main 61개 항목, 개인 choiyuyeol/final은 87개 항목이며 두 응답 모두 truncated=false였다.

main만 보고 사용자의 완성 결과를 판단하면 잘못 분류하게 된다. 사용자 작성 PR의 base는 모두 choiyuyeol/final이고, 그 브랜치에는 개인 일정 CRUD, 자연어 요청 구조화, SQLite 저장, ChromaDB 검색, 외부 대화 MCP 조회, Supervisor와 Nana/Kana 하위 에이전트 및 테스트·평가 하네스가 있다. 따라서 원본은 교육 starter를 포함한 다수 학생 작업 공간이고, 포트폴리오 항목은 **제공 기반 코드 위에 구현한 개인 6주 학습 프로젝트**다.

개인 final의 README도 공용 Week 1 내용과 “테스트 하네스 없음” 문구를 유지하고 있다. 그러나 그 브랜치의 tests/evals와 pytest 설정은 실제로 존재한다. README보다 브랜치 트리와 소스를 우선하여 판단했다. 코드에 남은 TODO 주석만으로 미구현으로 간주하지 않았다. nana_agent, kana_agent, build_langchain_supervisor_agent 본문에 create_agent와 invoke 호출 및 trace 추출이 확인된다.

### 실제 스택과 주요 흐름

- Python >=3.11,<3.12, uv, Gradio UI, LangChain 1.x, langchain-openai, OpenAI 호환 chat/embedding proxy.
- ChromaDB, SQLite, MCP와 langchain-mcp-adapters, Pydantic, pytest.
- app.py가 Gradio와 AgentRuntime을 연결한다. fixed/week_agent_registry.py가 주차 번호를 student_parts 모듈에 매핑하고 build_week_agent를 호출한다.
- Week 6은 supervisor가 nana_agent/kana_agent 도구로 업무를 위임한다. Nana는 개인 일정·RAG, Kana는 외부 멤버 일정·공통 시간 조율을 맡는다.
- find_common_available_slots_dict는 멤버·날짜를 정규화하고 조회 결과 및 에이전트가 고른 후보를 제공된 검증 helper로 전달한다. 자동 최적화 엔진을 독자 구현했다고 주장할 근거는 없다.
- tests/evals/predicates.py는 도구 호출 여부·순서·인자·이전 도구 결과의 전달·후보 유효성을 trace로 검사한다. 평가 코드 존재는 확인했지만 이번 조사에서 통과율을 재측정하지 않았다.

### yuyeol3 참여 증거

REST PR 상세의 user.login=yuyeol3, base.ref=choiyuyeol/final 및 merged_at을 확인했다.

| PR | 개인 작업 브랜치 | 내용 | 병합일 (UTC) |
|---|---|---|---|
| [#20](https://github.com/kakaotechcampus-4/pusan-clone/pull/20) | choiyuyeol/week1 | 일정 CRUD tool | 2026-07-01 |
| [#62](https://github.com/kakaotechcampus-4/pusan-clone/pull/62) | choiyuyeol/week2 | 자연어 요청 구조화 | 2026-07-12 |
| [#92](https://github.com/kakaotechcampus-4/pusan-clone/pull/92) | choiyuyeol/week3 | 기록장·저장 | 2026-07-19 |
| [#125](https://github.com/kakaotechcampus-4/pusan-clone/pull/125) | choiyuyeol/week4 | 기억 검색 | 2026-07-27 |
| [#158](https://github.com/kakaotechcampus-4/pusan-clone/pull/158) | choiyuyeol/week5 | 이전 대화·MCP 연동 | 2026-08-04 |
| [#195](https://github.com/kakaotechcampus-4/pusan-clone/pull/195) | choiyuyeol/week6 | 하위 에이전트 위임·일정 조율 | 2026-08-09 |

기본 main에 대한 author=yuyeol3 커밋 조회에서는 결과가 없었으나, sha=choiyuyeol/final을 지정하면 작성자 커밋이 확인됐다. 기본 브랜치 이력만 조사하면 참여를 놓친다. 대표 근거는 [#195 병합 커밋 2d265874](https://github.com/kakaotechcampus-4/pusan-clone/commit/2d265874262dae9f3b6e2bd68ed398c83b3420fe), [Supervisor 프롬프트 단순화 b022a986](https://github.com/kakaotechcampus-4/pusan-clone/commit/b022a986e3f055877c14c72fec251cda9c5ccab8)다. #195 본문은 하위 에이전트, 도구 payload·trace 전달 보완과 평가 하네스 작업을 구체적으로 기술한다.

### 사이트에 사용할 제안

- 카테고리: ai-tools. 교육 맥락을 보존하려면 learning 태그 추가.
- 제목: **일정관리 AI 에이전트**
- 짧은 설명: **자연어 일정 관리에 RAG·MCP·하위 에이전트 위임을 연결하고, 도구 호출 trace를 평가하는 6주 개인 프로젝트.**
- 역할 표기: **개인 과제 구현 · 제공 공통 코드 활용**
- 대표 코드 링크: 루트 main보다 [choiyuyeol/final](https://github.com/kakaotechcampus-4/pusan-clone/tree/choiyuyeol/final)을 사용한다.

### 핵심 파일 근거와 불확실성

- [기본 README](https://github.com/kakaotechcampus-4/pusan-clone/blob/main/README.md): 공용 교육 기반 코드 성격.
- [개인 pyproject.toml](https://github.com/kakaotechcampus-4/pusan-clone/blob/choiyuyeol/final/pyproject.toml): 실제 의존성과 pytest 설정.
- [app.py](https://github.com/kakaotechcampus-4/pusan-clone/blob/choiyuyeol/final/app.py): Gradio 진입점.
- [week_agent_registry.py](https://github.com/kakaotechcampus-4/pusan-clone/blob/choiyuyeol/final/fixed/week_agent_registry.py): 주차별 실행 연결.
- [Week 6 구현](https://github.com/kakaotechcampus-4/pusan-clone/blob/choiyuyeol/final/student_parts/week06_kanamate_decides_schedule.py): 위임·시간 조율 구현.
- [trace 평가 predicates](https://github.com/kakaotechcampus-4/pusan-clone/blob/choiyuyeol/final/tests/evals/predicates.py): 도구 행동 평가 근거.

README의 일부 설명은 개인 브랜치의 최종 구현을 반영하지 않는다. PR 병합은 과제 제출·리뷰 근거이며 공용 main에 편입됐다는 뜻은 아니다. LLM 동작·성능·현재 proxy 가용성은 재실행하지 않았다. fixed 코드와 UI·저장 기반 전체를 사용자 고유 구현으로 소개하지 않아야 한다.

## 2. pnucse-capstone2026/capstone-2026-team-30

### 목적과 실제 구현 성격

Kubernetes 정책 위반을 조회하고 한시적 예외의 요청·승인·클러스터 적용·재시도·만료·취소·감사 이력을 관리하는 웹 기반 Kyverno Governance Platform이다. README가 부산대학교 졸업과제 30조, 3인 팀과 최유렬의 백엔드 역할을 명시한다.

main 재귀 트리 735개 항목, truncated=false. apps/backend, apps/frontend, packages/shared, Prisma migration, Kubernetes manifests, GitOps 설정, 테스트, 보고서·발표 자료가 함께 있다. 발표 전용 저장소나 기본 프레임워크 starter가 아니라 **실제 시스템 구현과 제출 자료를 포함한 팀 프로젝트**다.

정책 집행은 Kubernetes/Kyverno가 맡고 플랫폼은 후속 업무 상태와 외부 적용을 관리한다. README의 AI·MLOps 기능을 전부 사용자 개인 기여로 확대하지 않았다.

### 스택·주요 진입점·구현

- 프런트: Next.js 15, React 19, TypeScript, Tailwind CSS 4, TanStack Query, Zustand, shadcn/Radix UI.
- 백엔드: NestJS 11, TypeScript, Prisma 6, PostgreSQL, JWT/Passport, argon2, Zod, Swagger, Kubernetes client-node.
- Redis/ioredis, BullMQ, AWS Bedrock SDK, Octokit. pnpm workspace와 Docker/Kubernetes 구성.
- 테스트: Jest, Supertest, PostgreSQL Testcontainers.
- apps/backend/src/main.ts가 Nest AppModule을 부팅하고 validation pipe, API prefix, Swagger, 로깅을 설치한다.
- apps/frontend/src/app/page.tsx는 로그인 화면을 제공하고 admin/exception/violation/MLOps 경로의 페이지들이 실제 트리에 있다.
- exception-lifecycle.service.ts는 Serializable 트랜잭션 안에서 기대 상태·만료 조건을 만족하는 요청만 승인 갱신하고 실행 claim을 사용한다.
- exception-reconciler.service.ts는 10초 간격으로 최대 50건의 후보를 처리하고, 클러스터별 처리와 claim 갱신 후 lifecycle.reconcile을 호출한다.
- README의 보고서·포스터·PDF/PPTX는 구현에 부속된 제출 자료다. presentations를 주 카테고리로 쓰는 것은 부적절하다.

### yuyeol3 참여 증거

원본의 author=yuyeol3 커밋 API 결과에서 작성자 GitHub 계정 연결을 확인했다. README 팀 역할 표와 구현 변경 파일도 대조했다.

| 증거 | 직접 확인한 범위 |
|---|---|
| [6018d01b: 예외 처리 동시성 개선](https://github.com/pnucse-capstone2026/capstone-2026-team-30/commit/6018d01b3da5c5d488618c29a3db21b491925c9b) | author=yuyeol3. claim migration·Prisma schema, lifecycle/reconciler, 예외 서비스와 단위·통합 테스트 변경 파일 확인 |
| [f355ff13: logout 동시성 수정](https://github.com/pnucse-capstone2026/capstone-2026-team-30/commit/f355ff132fdfc03c49dbc9eb3764fedb3f44eda3) | author=yuyeol3. auth service, refresh-token-revocation, user service, auth refresh 통합 테스트 변경 확인 |
| [95dd69ed: 리컨실러 동작 개선](https://github.com/pnucse-capstone2026/capstone-2026-team-30/commit/95dd69ed2138529689e6dd0ac107d4adcea5582d) | 작성자 커밋 목록에서 연결 확인 |
| [a585b7cf: namespace 충돌 방지](https://github.com/pnucse-capstone2026/capstone-2026-team-30/commit/a585b7cf15f4d665f1542de1c7a5963b029ff066) | 작성자 커밋 목록에서 정책 위반 ID 보완 작업 확인 |
| [README 팀 구성](https://github.com/pnucse-capstone2026/capstone-2026-team-30#7-팀-구성) | 최유렬 역할: JWT/RBAC, 위반·예외 API, 상태 조정·재시도, 감사, Kubernetes API 연동 |

이 제출 저장소 자체에 대한 author:yuyeol3 PR 검색 결과는 0건이었다. PR 대신 보존된 작성자 커밋이 참여 근거다. [44d1d6fc](https://github.com/pnucse-capstone2026/capstone-2026-team-30/commit/44d1d6fc7b068a13c3a6c62599f9381f126d65d5)의 메시지는 개발 저장소 이력을 제출 저장소로 가져온 사실을 보여준다. 따라서 fork=false라도 최초부터 이 원본 경로에서만 개발됐다고 주장하지 않는다. 해당 개발 저장소는 이번 범위 밖이어서 별도로 조사하지 않았다.

### 사이트에 사용할 제안

- 카테고리: web. Kubernetes/DevOps 태그를 추가할 수 있다. AI 설명 기능은 부가 기능이므로 ai-tools보다 web을 우선한다.
- 제목: **Kyverno Governance Platform**
- 짧은 설명: **Kubernetes 정책 위반과 한시적 예외의 승인·적용·만료를 관리하는 팀 웹 플랫폼. 인증·인가와 예외 상태 조정 백엔드를 담당했습니다.**
- 역할 표기: **3인 졸업과제 · Backend**
- 대표 링크: [공개 제출 저장소](https://github.com/pnucse-capstone2026/capstone-2026-team-30).

### 핵심 파일 근거와 불확실성

- [README](https://github.com/pnucse-capstone2026/capstone-2026-team-30/blob/main/README.md): 목적, 역할, 시스템 구조, 팀 검증 결과와 제한.
- [루트 package.json](https://github.com/pnucse-capstone2026/capstone-2026-team-30/blob/main/package.json): workspace 실행·빌드·DB 명령.
- [backend manifest](https://github.com/pnucse-capstone2026/capstone-2026-team-30/blob/main/apps/backend/package.json), [frontend manifest](https://github.com/pnucse-capstone2026/capstone-2026-team-30/blob/main/apps/frontend/package.json): 실제 프레임워크와 의존성.
- [Nest 진입점](https://github.com/pnucse-capstone2026/capstone-2026-team-30/blob/main/apps/backend/src/main.ts), [Next 로그인 진입점](https://github.com/pnucse-capstone2026/capstone-2026-team-30/blob/main/apps/frontend/src/app/page.tsx).
- [예외 lifecycle](https://github.com/pnucse-capstone2026/capstone-2026-team-30/blob/main/apps/backend/src/exception-lifecycle/exception-lifecycle.service.ts), [reconciler](https://github.com/pnucse-capstone2026/capstone-2026-team-30/blob/main/apps/backend/src/exception-lifecycle/exception-reconciler.service.ts).

README는 단위·통합 테스트 및 EKS 성능 수치를 제시하지만 이번 조사에서는 실행·재현하지 않았다. 사이트 설명에 처리량·지연을 넣으려면 “팀 측정 결과”와 측정 조건을 함께 유지해야 한다. README는 멀티리전, 장기 운영 장애 복원력, 실 GPU/CPU 지표에 기반한 유휴 Notebook 판정이 추가 검증·보완 대상이라고 밝힌다. 전체 운영 성숙도나 현재 공개 배포 가용성을 소스 존재만으로 확정하지 않는다.

## 완료 점검

- 요청한 외부 공개 저장소 **2/2** 조사 완료.
- 공용 main과 개인 제출 브랜치를 구분했고, pusan-clone 작성자 PR 6건의 병합 상태를 확인했다.
- 졸업과제는 작성자 커밋과 대표 2개 커밋의 변경 경로를 확인했다.
- 소스 실행·원격 변경 없음. 작성 범위는 docs/research-external-2.md 한 파일이다.
