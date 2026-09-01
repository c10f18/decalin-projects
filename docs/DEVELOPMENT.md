# 개발 가이드 (DEVELOPMENT)

이 저장소를 로컬에서 돌리고, 배포하고, 새 프로젝트를 추가하는 방법을 정리한 문서입니다.
전체 소개는 루트 [README](../README.md)를 참고하세요.

## 저장소 구조

```
decalin-projects/
├── apps/
│   ├── hub/                    # 포트폴리오 허브 (decalin-projects.pages.dev)
│   ├── _template-web/          # 🌐 웹 서비스형 시작 템플릿 (복사해서 사용)
│   ├── _template-download/     # ⬇ 다운로드형 시작 템플릿 (복사해서 사용)
│   ├── photo-fold/             # ⬇ 다운로드형 프로젝트
│   ├── download-redmine-wiki/  # ⬇ 다운로드형 프로젝트
│   └── qr-code-converter/      # ⬇ 다운로드형 프로젝트
│       └── src/
│           ├── pages/
│           │   ├── index.astro   # 웹형=서비스 본체 / 다운로드형=소개(광고) 랜딩
│           │   ├── info/         # 릴리즈 노트 (목록+상세)
│           │   ├── wiki/         # 위키(명세/문서, 목록+상세)
│           │   ├── arch.astro    # 아키텍처 1페이지 (단일 페이지)
│           │   └── devnote/      # 개발노트(회고/TIL, 목록+상세)
│           └── content/
│               ├── changelog/*.md    # info의 원본 글
│               ├── wiki/*.md
│               ├── devnote/*.md
│               └── architecture.md   # arch.astro가 렌더링하는 한 파일
├── packages/
│   └── docs-viewer/            # 릴리즈노트·위키·아키텍처·개발노트 공용 컴포넌트
├── pnpm-workspace.yaml
└── package.json
```

`apps/*` 하나 = Cloudflare Pages 프로젝트 하나 = 독립 주소(`xxx.pages.dev`) 하나. 같은 저장소
안에 있어도 서로 완전히 독립적으로 배포됩니다.

### 프로젝트는 두 가지 형태

| 형태 | 언제 | 앱 위치 | 랜딩(광고) 위치 | 시작 방법 |
|---|---|---|---|---|
| **🌐 웹 서비스** | 브라우저에서 바로 쓰는 앱 | `/` (index.astro = 서비스 화면) | `/intro` (선택) | `apps/_template-web` 복사 |
| **⬇ 다운로드형** | 실행파일(exe 등)을 GitHub Releases로 배포 | 없음 | `/` (index.astro = 랜딩, "내려받기" → Releases) | `apps/_template-download` 복사 |

- **`kind`는 허브 카드의 버튼만 결정**합니다 — `web`이면 "서비스 열기", `download`면 "내려받기".
- **랜딩(광고) 페이지는 형태와 무관한 선택 요소**입니다. 다운로드형은 앱이 없어 `/`가 곧 랜딩이고,
  웹형은 앱이 `/`를 쓰므로 랜딩을 `/intro`에 둡니다. 웹형에서 `projects.ts`의 `introUrl`을 채우면
  허브 카드에 "소개" 버튼이 자동으로 붙습니다.
- 두 형태 모두 릴리즈노트/위키/아키텍처/개발노트 문서 섹션은 동일하게 갖습니다.

## 로컬에서 실행

```bash
pnpm install          # 루트에서 한 번만
pnpm dev:hub          # http://localhost:4321 — 허브 페이지
pnpm dev:photo-fold   # 다른 터미널에서: 개별 프로젝트
```

사용 가능한 스크립트는 루트 `package.json`을 참고하세요 (`dev:*`, `build:*`, `build:all`).

## Cloudflare Pages 배포 (도메인 구매 없이)

1. 저장소를 GitHub에 push (모노레포 하나로 OK).
2. Cloudflare 대시보드 → Workers & Pages → **Create** → **Pages** → **Connect to Git** → 저장소 연결
   (처음 한 번만 Cloudflare의 GitHub 앱 권한을 승인하고 대상 repo를 고르면 됨).
3. 앱마다 Pages 프로젝트를 하나씩 생성합니다. **Root directory는 저장소 루트(비움)** 로 두고,
   `--filter`로 해당 앱만 빌드해 그 앱의 `dist`를 출력합니다 (루트 `package.json`의
   `packageManager: pnpm@…` 덕분에 Cloudflare가 pnpm을 사용):

   | Pages 프로젝트 이름 | Build command | Build output directory |
   |---|---|---|
   | `decalin-projects` | `pnpm install && pnpm build:hub` | `apps/hub/dist` |
   | `photo-fold` | `pnpm install && pnpm build:photo-fold` | `apps/photo-fold/dist` |
   | `download-redmine-wiki` | `pnpm install && pnpm build:redmine` | `apps/download-redmine-wiki/dist` |
   | `qr-code-converter` | `pnpm install && pnpm build:qr` | `apps/qr-code-converter/dist` |

   - Production branch: `main`
   - 프로젝트 이름이 곧 서브도메인이 됩니다 (`<이름>.pages.dev`).
   - `_template-web` / `_template-download` 는 배포하지 않습니다 (복사용 시드).
4. 이후로는 `git push`만 하면 모든 Pages 프로젝트가 각자 재배포됩니다.
   (Root directory를 루트로 두면 push마다 전체가 다시 빌드됩니다. 바뀐 앱만 빌드하려면 각
   프로젝트에서 Root directory를 `apps/<앱>`로 지정할 수 있는데, 그 경우 pnpm 감지를 위해 해당
   앱 `package.json`에도 `packageManager` 필드를 넣어줘야 합니다.)
5. 나중에 진짜 도메인을 사면 각 Pages 프로젝트의 "Custom domains" 탭에 연결만 추가하면 됩니다.

## 새 프로젝트를 추가하는 절차

1. 형태에 맞는 템플릿을 통째로 복사해서 `apps/새프로젝트명`으로 이름 변경
   - 웹 서비스 → `apps/_template-web` 복사
   - exe 등 다운로드형 → `apps/_template-download` 복사
2. `package.json`의 `name`, `astro.config.mjs`의 `site`, `wrangler.toml`의 `name`을 새 이름으로 수정
   (웹 템플릿은 `BaseLayout.astro`의 `SITE_NAME`도, 다운로드형은 `index.astro`의 `REPO_URL`도 함께 수정)
3. 루트 `package.json`에 빌드 스크립트 한 줄 추가: `"build:새이름": "pnpm --filter 새이름 build"`
4. `src/content/{changelog,wiki,devnote}`의 예시 글과 `architecture.md`는 지우고 새로 작성
5. Cloudflare Pages에서 새 프로젝트 생성 (Root directory=루트,
   Build command=`pnpm install && pnpm build:새이름`, Output=`apps/새이름/dist` — 위 표 참고)
6. `apps/hub/src/data/projects.ts`에 새 프로젝트 정보 한 줄(객체) 추가 → 허브에 카드 자동 생성
   - 웹: `kind: 'web'`, `url`(앱=`/`)만 채우면 됨. 소개 랜딩(`/intro`)을 만들었다면 `introUrl`도 채우면 "소개" 버튼이 붙음
   - 다운로드형: `kind: 'download'`, `url`(랜딩) + `downloadUrl`(Releases) + `repoUrl` 채우기

## 문서 글쓰기 규칙 (릴리즈노트 / 위키 / 개발노트 / 아키텍처)

네 섹션 모두 같은 frontmatter 규칙을 씁니다 (`packages/docs-viewer`가 공용으로 처리):

```md
---
title: "글 제목"
date: 2026-08-20
tags: [태그1, 태그2]   # 여러 개 가능, 카테고리 대신 자유 태그로 관리
pinned: true            # 공지처럼 상단 고정하고 싶을 때만 true
summary: "목록에서 보여줄 한 줄 요약 (선택)"
---

본문은 여기에 마크다운으로.
```

- **정렬**: `pinned: true`인 글이 항상 맨 위, 그 다음은 최신 날짜순
- **태그 필터**: 목록 페이지 상단에 태그 목록이 자동으로 뜨고 클릭하면 `?tag=xxx`로 필터링됨
- **섹션 구분**: `info`(릴리즈노트) / `wiki`(명세·구조 문서, 여러 글) / `devnote`(회고·TIL)는
  폴더만 다를 뿐 완전히 같은 컴포넌트를 씀 → 디자인이 자동으로 통일됨
- **아키텍처(`/arch`)**: wiki와 달리 목록이 아니라 **`content/architecture.md` 한 파일만** 렌더링하는
  단일 페이지. "이 프로젝트가 어떻게 굴러가는가"를 개발자용으로 1장에 정리하는 용도. 여러 문서로
  쪼개고 싶으면 wiki에 쓰면 됩니다.
- 새 서비스를 추가해도 `packages/docs-viewer`만 고치면 모든 서비스의 문서 디자인이 한 번에 바뀝니다.

## 허브 페이지 배지

`apps/hub/src/data/projects.ts`의 `status`, `updatedAt` 값으로 자동 계산됩니다.

- `status`: `active`(진행중) / `paused`(보류) / `done`(완료) / `archived`(중단)
- `updatedAt`이 14일 이내면 "업데이트됨" 배지가 자동으로 추가됨 (기준일은 `Badge.astro`의 `RECENT_DAYS`)

## Cloudflare Worker (Pages Functions)는 언제 쓰나

지금 구조는 전부 **정적 사이트**(빌드 시점에 HTML이 다 만들어짐)라서 Worker가 없어도 동작합니다.
Worker가 필요해지는 시점은 "요청이 올 때마다 서버에서 뭔가 계산/저장해야 할 때"입니다.

- 로그인 없이 쓰는 방명록/댓글 → Worker + D1(DB)
- 업로드 후 서버에서 리사이즈/변환 → Worker + R2(파일 저장소)
- 조회수 카운터 → Worker + KV
- 외부 API 키를 숨겨야 하는 호출(지도 API, 결제 등) → Worker를 프록시로 세워 키를 서버에 숨김

Cloudflare Pages 프로젝트 안에서는 `functions/` 폴더에 파일 하나만 추가해도 그게 곧 Worker입니다.
예: `apps/photo-fold/functions/api/hello.ts`

```ts
export const onRequestGet: PagesFunction = async () => {
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'content-type': 'application/json' },
  });
};
```

이 파일 하나로 별도 설정 없이 `photo-fold.pages.dev/api/hello`가 생깁니다.

## wrangler.toml은 왜 있나

GitHub 연동 자동배포만 쓸 거면 당장 필수는 아니지만, 넣어둔 이유:

1. `wrangler pages dev`로 로컬에서 Cloudflare 환경(바인딩 포함)과 거의 동일하게 미리보기 가능
2. KV/D1/R2 바인딩·환경변수·배포환경 설정을 코드로 관리 (저장소에 커밋되니 기록이 남음)
3. CLI로 직접 배포(`wrangler pages deploy dist`)할 때 프로젝트 이름/출력 폴더를 알려주는 설정

## 참고: devnote 네이밍

`wiki`는 명세/구조 문서, `devnote`는 공부할 것·어려움·회고를 담는 공간으로 나눴습니다.
이름을 바꾸고 싶으면 각 앱의 `src/pages/devnote` 폴더, `src/content/devnote` 폴더, 그리고
페이지 안의 문구만 바꾸면 됩니다. (후보였던 이름: 개발노트 / 개발자 노트 / 회고 / TIL)
