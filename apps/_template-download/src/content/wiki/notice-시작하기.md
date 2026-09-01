---
title: "이 템플릿 사용법"
date: 2026-01-01
tags: [안내]
pinned: true
summary: "복사 → 이름 변경 → 콘텐츠 교체 순서 안내"
---

이 폴더(`apps/_template-download`)는 **다운로드형(exe 등) 프로젝트 시작용 템플릿**입니다.
실행파일은 GitHub에 올리고, 이 사이트는 소개(광고) 랜딩 + 문서 역할만 합니다.

1. 폴더를 통째로 복사해서 `apps/새프로젝트명` 으로 이름 변경
2. `package.json`의 `name`, `astro.config.mjs`의 `site`, `wrangler.toml`의 `name`,
   `src/layouts/BaseLayout.astro`의 `SITE_NAME`, `src/pages/index.astro`의
   `SITE_NAME` / `REPO_URL` / `DOWNLOAD_URL` / `features` 를 실제 값으로 수정
3. `src/content/{changelog,wiki,devnote}` 의 예시 글과 `architecture.md` 를 실제 내용으로 교체
4. `apps/hub/src/data/projects.ts` 에 `kind: 'download'` 로 프로젝트 한 줄 추가
   (`url`=랜딩, `downloadUrl`=Releases 또는 dist 경로, `repoUrl`=저장소)
