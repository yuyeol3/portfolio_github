# Repository archive

`yuyeol3`의 공개 GitHub 저장소와 참여 프로젝트를 탐색하는 정적 사이트입니다. 프레임워크·패키지 설치·백엔드 없이 HTML/CSS/JavaScript로 동작합니다.

흰 배경과 선명한 글자, 얇은 구분선으로 구성하며 로고와 장식 요소를 사용하지 않습니다. 카테고리·검색·개인/참여 필터·Fork 표시 선택·추천/업데이트/스타/이름 정렬을 제공합니다. 작은 화면에서는 카테고리를 가로로 탐색하고 목록은 한 열로 표시합니다.

## 로컬 실행

Node.js 22 이상에서:

```sh
npm start
```

`http://127.0.0.1:4173`에서 확인합니다. 파일을 직접 열면 모듈과 설정 파일을 가져올 수 없으므로 HTTP 서버가 필요합니다.

```sh
npm test
npm run build
```

빌드 결과는 `dist/`입니다. 외부 의존성이 없어 `npm install`은 필요하지 않습니다.

## 설명과 분류 관리

`content/catalog.json` 한 파일을 편집합니다. JSON은 빌드 없이 브라우저에서 읽을 수 있어 별도 YAML/Markdown 파서를 두지 않았습니다. 설명은 일반 텍스트이며 HTML을 실행하지 않습니다.

```json
{
  "username": "yuyeol3",
  "title": "프로젝트 모음",
  "description": "사이트 소개",
  "categories": [{ "id": "web", "label": "웹 · 서비스" }],
  "externalRepositories": ["ApptiveDev/Fin-BE"],
  "repositories": {
    "my-repo": {
      "category": "web",
      "description": "GitHub 기본 설명 대신 표시할 설명",
      "tags": ["Spring Boot", "React"],
      "featured": true
    },
    "ApptiveDev/Fin-BE": {
      "category": "web",
      "description": "참여 프로젝트 소개",
      "role": "직접 작성한 참여 역할"
    }
  }
}
```

- 개인 저장소는 짧은 이름, 다른 소유자의 저장소는 `owner/repo`를 키로 씁니다. 개인 저장소에도 전체 경로를 쓸 수 있습니다.
- `description`이 없으면 GitHub 설명을 사용합니다. 둘 다 없으면 안내 문구를 표시합니다.
- 새 공개 레포는 다음 데이터 동기화 때 설정 없이 자동으로 나타납니다. 분류가 없거나 존재하지 않는 카테고리를 가리키면 **미분류**로 표시합니다.
- `featured: true`는 추천 배지와 추천순 우선 표시를 지정합니다.
- `hidden: true`는 해당 레포를 목록에서 제외합니다. Fork와 배포 산출물도 기본적으로 숨기지 않았습니다.
- 다른 소유자의 프로젝트는 자동 발견 목록과 `externalRepositories` 수동 목록을 합쳐 가져옵니다. 자동 조회에서 빠진 과거 프로젝트는 수동 등록으로 유지할 수 있습니다. 역할은 확인된 범위에서 직접 기록합니다.
- `role`, `tags`, `description`은 모두 선택 사항입니다.
- 실제 개인 구현이 기본 브랜치가 아닌 곳에 있다면 `branch`를 지정합니다. 예를 들어 `"branch": "choiyuyeol/final"`은 프로젝트 링크를 그 브랜치로 연결합니다.

현재 분류·설명의 조사 근거와 불확실성은 `docs/research-*.md`에 있습니다. 코드·문서를 정적으로 조사했으며, 소개하는 앱들의 실행 성공이나 운영 상태를 보장하지 않습니다.

## 데이터 조회

**모든 GitHub 조회는 Actions에서 인증된 상태로 실행합니다.** 개인 공개 목록은 REST API로, 참여 레포 목록은 GraphQL `repositoriesContributedTo`로 조회하고, 수동 등록 목록도 합쳐 레포별 정보를 수집합니다. 결과를 하나의 `content/repositories.json`으로 배포합니다. 브라우저는 이 JSON과 편집 설정만 읽으므로 방문자의 GitHub 비인증 요청 한도를 사용하지 않습니다.

워크플로는 `main`에 push할 때, 수동 실행할 때, **매시간 23분**에 동기화해 배포합니다. 예약 실행은 GitHub 상황에 따라 지연될 수 있습니다. Actions 기본 `GITHUB_TOKEN`을 사용하므로 별도의 개인 토큰 설정이나 브라우저 로그인은 필요하지 않습니다. API 조회 코드와 인증은 개발용 `scripts/`에만 있고 사이트 배포에는 포함되지 않습니다.

스냅샷에는 화면에서 사용하는 공개 필드와 생성 시각만 저장합니다. 인증 토큰, 접근 권한, 소유자 연락처 등 전체 API 응답을 그대로 공개하지 않습니다. 데이터는 **배포 아티팩트에 포함**하며 자동 커밋을 만들지 않습니다. 저장소에 체크인한 JSON은 로컬 실행용 초기 스냅샷입니다.

모든 페이지와 참여 레포 조회가 성공해야 새 스냅샷을 생성합니다. GitHub API 오류나 일부 조회 실패 시 배포를 중단해 기존 배포를 유지합니다. 따라서 일부 레포가 누락된 목록으로 교체하지 않습니다.

참여 발견 API는 최근 커밋·PR·PR 리뷰 기준이므로 모든 과거 참여를 보장하지 않습니다. 빠지는 과거 프로젝트는 `externalRepositories`로 보완합니다. 새로 발견된 레포에 설명·분류가 없으면 **미분류**와 GitHub 기본 설명으로 표시합니다. 조직 접근 권한만으로 모든 레포를 참여 프로젝트에 포함하지 않습니다.

사이트는 성공적으로 읽은 스냅샷을 localStorage에 저장합니다. 재방문 시 캐시를 먼저 표시한 뒤 배포된 파일을 확인합니다. 파일 조회 실패 시 기존 목록과 오류 안내를 유지하고, 데이터 갱신 시각도 원래 시각을 표시합니다. 브라우저 저장소를 사용할 수 없어도 사이트는 동작하지만 복원할 캐시는 없습니다. 화면의 **다시 불러오기**는 배포된 JSON을 다시 읽으며, 즉시 GitHub 동기화를 원하면 Actions 워크플로를 수동 실행합니다.

로컬에서 초기 스냅샷을 갱신하려면 GitHub CLI 설치와 `gh auth login` 후 실행합니다:

```sh
npm run sync
```

동기화 없이도 체크인한 데이터로 `npm start`와 `npm run build`를 실행할 수 있습니다.

## GitHub Pages 배포

기존 개인 블로그 `yuyeol3.github.io`와 별도의 **프로젝트 저장소**(예: `portfolio_github`)에 배포하면 기존 사이트를 유지하면서 `https://yuyeol3.github.io/portfolio_github/`로 접근할 수 있습니다. 모든 사이트 자산 경로는 상대 경로입니다.

1. 이 폴더의 파일을 해당 GitHub 저장소 `main` 브랜치에 올립니다.
2. 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 선택합니다.
3. `.github/workflows/pages.yml`이 전체 레포 데이터 동기화 → 테스트 → 정적 파일 빌드 → Pages 배포를 실행합니다.
4. Actions의 배포 결과 URL을 확인합니다. 다른 기본 브랜치를 쓰면 워크플로의 `branches`를 변경합니다.

배포 아티팩트에는 사이트 파일(`index.html`, `styles.css`, `src/`, `content/`)만 포함합니다. 조사 문서·테스트·개발 서버는 포함하지 않습니다. 저장소를 public으로 공개하면 조사 문서도 저장소에서 공개되므로 내용을 검토할 수 있습니다.

참고: [공개 사용자 저장소 API](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user), [참여 레포 GraphQL API](https://docs.github.com/en/graphql/reference/users#user), [예약 실행](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#onschedule), [API 요청 제한](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api), [GitHub Actions를 이용한 Pages 배포](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
