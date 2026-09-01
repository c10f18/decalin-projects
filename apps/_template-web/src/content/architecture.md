---
title: "아키텍처"
date: 2026-01-01
tags: [아키텍처]
summary: "이 서비스가 어떻게 굴러가는지 한 장으로 정리 (개발자용)"
---

> 이 프로젝트가 **어떻게 만들어지고 배포되는지**를 한 장에 정리하는 개발자용 문서입니다.
> 개별 기능 명세는 [위키](/wiki), 회고는 [개발노트](/devnote)에 씁니다.

## 한눈에 보는 구조

```
[브라우저]
   └─ 정적 사이트 (Astro build → HTML/CSS/JS)
        └─ Cloudflare Pages 에 배포

(서버 로직이 필요해지면)
   └─ Pages Functions(Worker) + KV/D1/R2 바인딩
```

## 구성 요소

| 레이어 | 무엇 | 왜 |
|---|---|---|
| **프론트엔드** | Astro 정적 사이트 | 빌드 시 HTML 완성 → 빠르고 저렴 |
| **배포** | Cloudflare Pages | `git push` 만으로 자동 재배포 |
| **문서** | docs-viewer 공용 컴포넌트 | 릴리즈노트·위키·개발노트를 같은 디자인으로 |

## 다음 단계 (필요해질 때)

- 방명록/댓글 → Pages Functions + D1
- 업로드/변환 → Worker + R2
- 조회수 → Worker + KV
