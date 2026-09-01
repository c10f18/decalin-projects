---
title: "Redmine Wiki Downloader 아키텍처"
date: 2026-08-31
tags: [아키텍처, Python]
summary: "인증 → 위키 수집 → Markdown 저장까지 한 장으로 (개발자용)"
---

> 이 도구가 **어떻게 동작하고 어떻게 배포되는지**를 한 장에 정리한 개발자용 문서입니다.
> 개별 기능 명세는 [위키](/wiki), 회고는 [개발노트](/devnote)를 참고하세요.

## 한눈에 보는 구조

```
[사용자 PC]  RedmineWikiDownloader (Python GUI)
   ├─ 인증        : API Key  또는  ID/PW
   ├─ 대상 선택   : 단일 프로젝트 / 여러 프로젝트 일괄
   ├─ 수집        : Redmine REST API 로 위키 페이지 조회
   └─ 저장        : 프로젝트명 폴더 아래 .md 파일로 기록 + 진행률/로그 표시
        │
        ▼  (HTTP)
[Redmine 서버]  /projects/*/wiki ... REST API

[GitHub]  소스 + 실행파일(Releases)
[Cloudflare Pages]  이 소개/문서 사이트 (다운로드 버튼 → Releases)
```

## 구성 요소

| 레이어 | 무엇 | 왜 |
|---|---|---|
| **GUI** | Python 데스크톱 앱 | 비개발자도 클릭만으로 위키를 백업 |
| **연동** | Redmine REST API | 표준 API로 위키 페이지를 안정적으로 수집 |
| **인증** | API Key / ID·PW 선택 | 환경에 따라 편한 방식으로 접속 |
| **출력** | Markdown(.md), 프로젝트별 폴더 | 그대로 문서 저장소·위키로 재활용 가능 |
| **패키징** | 단일 실행파일 (dist) | 런타임 설치 없이 실행 |

## 배포

- 실행파일은 GitHub **Releases**로 배포됩니다(현재 최신: v1.0.0).
- 이 사이트의 "내려받기" 버튼과 `projects.ts`의 `downloadUrl`은 `.../releases/latest`를 가리키므로
  새 릴리즈를 올리면 자동으로 최신 버전으로 연결됩니다.
