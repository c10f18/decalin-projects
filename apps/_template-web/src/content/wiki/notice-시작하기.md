---
title: "이 템플릿 사용법"
date: 2026-01-01
tags: [안내]
pinned: true
summary: "복사 → 이름 변경 → 콘텐츠 교체 순서 안내"
---

이 폴더(`apps/_template-web`)는 **웹 서비스형 프로젝트 시작용 템플릿**입니다.

1. 폴더를 통째로 복사해서 `apps/새프로젝트명` 으로 이름 변경
2. `package.json`의 `name`, `astro.config.mjs`의 `site`, `wrangler.toml`의 `name`,
   `src/layouts/BaseLayout.astro`의 `SITE_NAME` 을 새 이름으로 수정
3. `src/content/{changelog,wiki,devnote}` 의 예시 글과 `architecture.md` 를 실제 내용으로 교체
4. `apps/hub/src/data/projects.ts` 에 `kind: 'web'` 으로 프로젝트 한 줄 추가
