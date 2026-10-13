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
- 새 공개 레포는 설정 없이 자동으로 나타납니다. 분류가 없거나 존재하지 않는 카테고리를 가리키면 **미분류**로 표시합니다.
- `featured: true`는 추천 배지와 추천순 우선 표시를 지정합니다.
- `hidden: true`는 해당 레포를 목록에서 제외합니다. Fork와 배포 산출물도 기본적으로 숨기지 않았습니다.
- 다른 소유자의 프로젝트는 `externalRepositories`에 등록해야 API로 가져옵니다. 설정만으로 실제 기여를 자동 판단하지 않습니다. 역할은 확인된 범위에서 직접 기록합니다.
- `role`, `tags`, `description`은 모두 선택 사항입니다.

현재 분류·설명의 조사 근거와 불확실성은 `docs/research-*.md`에 있습니다. 코드·문서를 정적으로 조사했으며, 소개하는 앱들의 실행 성공이나 운영 상태를 보장하지 않습니다.

## 데이터 조회

페이지를 열 때마다 공개 GitHub REST API를 호출합니다. 개인 목록은 100개 단위로 끝까지 조회하며, 참여 프로젝트는 개별 조회합니다. 브라우저에 토큰을 넣지 않습니다. 토큰 없이 호출하므로 GitHub의 비인증 API 요청 제한을 적용받습니다. 레포 개수·태그·업데이트 시점은 API 응답 기준입니다.

성공적으로 조회한 전체 목록은 localStorage에 저장합니다. 재방문 시 캐시를 먼저 보여주고 최신 데이터를 조회하며, 네트워크나 API 오류 시 이전 목록과 오류 안내를 표시합니다. 참여 레포 하나의 조회 실패는 다른 목록의 표시를 막지 않습니다. 브라우저 저장소를 사용할 수 없어도 사이트는 동작하지만 오류 시 복원할 캐시는 없습니다.

## GitHub Pages 배포

기존 개인 블로그 `yuyeol3.github.io`와 별도의 **프로젝트 저장소**(예: `portfolio_github`)에 배포하면 기존 사이트를 유지하면서 `https://yuyeol3.github.io/portfolio_github/`로 접근할 수 있습니다. 모든 사이트 자산 경로는 상대 경로입니다.

1. 이 폴더의 파일을 해당 GitHub 저장소 `main` 브랜치에 올립니다.
2. 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 선택합니다.
3. `.github/workflows/pages.yml`이 테스트 → 정적 파일 빌드 → Pages 배포를 실행합니다.
4. Actions의 배포 결과 URL을 확인합니다. 다른 기본 브랜치를 쓰면 워크플로의 `branches`를 변경합니다.

배포 아티팩트에는 사이트 파일(`index.html`, `styles.css`, `src/`, `content/`)만 포함합니다. 조사 문서·테스트·개발 서버는 포함하지 않습니다. 저장소를 public으로 공개하면 조사 문서도 저장소에서 공개되므로 내용을 검토할 수 있습니다.

참고: [공개 사용자 저장소 API](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user), [API 요청 제한](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api), [GitHub Actions를 이용한 Pages 배포](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
