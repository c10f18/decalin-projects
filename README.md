# Decalin Side Projects

여러 사이드 프로젝트를 **한 저장소에서 각각 독립적으로 배포**하고, 하나의 허브 페이지에서
모아 보는 포트폴리오 모노레포입니다. 프로젝트마다 릴리즈 노트·위키·아키텍처·개발노트를
**통일된 디자인**으로 함께 제공합니다.

- 🏠 **허브**: [decalin-projects.pages.dev](https://decalin-projects.pages.dev)
- ⚙️ 기술 스택: [Astro](https://astro.build) · pnpm workspace · Cloudflare Pages (정적 사이트)

> 각 `*.pages.dev` 주소는 Cloudflare Pages 배포가 완료되면 접속할 수 있습니다.

## 프로젝트

| 프로젝트 | 설명 | 형태 | 사이트 | 소스 |
|---|---|---|---|---|
| **Photo Fold** | 폴더 없이 사진을 자동 정리하는 도구 | ⬇ 다운로드 | [photo-fold.pages.dev](https://photo-fold.pages.dev) | [GitHub](https://github.com/c10f18/photo-fold) |
| **Redmine Wiki Downloader** | Redmine 위키를 통째로 Markdown으로 내려받는 GUI | ⬇ 다운로드 | [download-redmine-wiki.pages.dev](https://download-redmine-wiki.pages.dev) | [GitHub](https://github.com/c10f18/DownloadRedmineWiki) |
| **QR Code Converter** | 엑셀의 URL 목록을 QR 이미지로 일괄 변환 | ⬇ 다운로드 | [qr-code-converter.pages.dev](https://qr-code-converter.pages.dev) | [GitHub](https://github.com/c10f18/QR_Code_Converter) |

각 프로젝트 사이트에는 **소개 랜딩 · 릴리즈 노트(`/info`) · 위키(`/wiki`) · 아키텍처(`/arch`) ·
개발노트(`/devnote`)** 가 함께 있습니다.

## 저장소 구성

```
apps/
  hub/                    # 프로젝트를 모아 보는 허브 (갤러리/리스트)
  photo-fold/             # 개별 프로젝트 (각각 독립 배포)
  download-redmine-wiki/
  qr-code-converter/
  _template-web/          # 새 프로젝트용 템플릿 — 🌐 웹 서비스형
  _template-download/     # 새 프로젝트용 템플릿 — ⬇ 다운로드형
packages/
  docs-viewer/            # 릴리즈노트·위키·아키텍처·개발노트 공용 컴포넌트
```

- **웹 서비스형**: 브라우저에서 바로 쓰는 앱. `/`가 서비스 화면.
- **다운로드형**: 실행파일(exe 등)을 GitHub Releases로 배포하고, 사이트는 소개(랜딩) + 문서 역할.
- `apps/*` 하나 = Cloudflare Pages 프로젝트 하나 = 독립 주소 하나.

## 로컬 실행

```bash
pnpm install
pnpm dev:hub          # 허브
pnpm dev:photo-fold   # 개별 프로젝트
```

## 더 보기

- 개발 · 배포 · 새 프로젝트 추가 · 문서 작성 규칙 → **[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)**
