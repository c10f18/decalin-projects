---
title: "QR Code Converter 아키텍처"
date: 2026-08-31
tags: [아키텍처, Python]
summary: "엑셀 입력 → QR 일괄 생성 → 이미지 저장까지 한 장으로 (개발자용)"
---

> 이 도구가 **어떻게 동작하고 어떻게 배포되는지**를 한 장에 정리한 개발자용 문서입니다.
> 개별 기능 명세는 [위키](/wiki), 회고는 [개발노트](/devnote)를 참고하세요.

## 한눈에 보는 구조

```
[사용자 PC]  QR Code Converter (Python + tkinter GUI)
   ├─ 입력   : 엑셀(.xlsx) — 열 2개(URL, QR 이름)   ※ 앱이 템플릿 양식도 생성
   ├─ 읽기   : openpyxl 로 행 단위 파싱
   ├─ 생성   : qrcode 로 각 행을 QR 이미지로 (크기·테두리 옵션)
   └─ 저장   : PNG/JPG 로 출력, 중복 파일명 자동 처리 + 진행률/로그 표시
        │
        ▼
[GitHub]  소스 + 실행파일(Releases, PyInstaller 단일 exe)
[Cloudflare Pages]  이 소개/문서 사이트 (다운로드 버튼 → Releases)
```

## 구성 요소

| 레이어 | 무엇 | 왜 |
|---|---|---|
| **GUI** | Python 3.11+ · tkinter | 비개발자도 클릭만으로 대량 QR 생성 |
| **입력** | 엑셀(openpyxl) + 템플릿 생성기 | URL을 표로 관리 → 일괄 처리에 최적 |
| **생성** | qrcode 라이브러리 | 크기·테두리 등 QR 속성 커스터마이즈 |
| **출력** | PNG/JPG, 중복명 자동 처리 | 바로 쓸 수 있는 이미지 파일로 |
| **패키징** | PyInstaller → 단일 exe | 런타임 설치 없이 실행 |
| **배포** | GitHub Releases | 버전별 바이너리 + 안정적 다운로드 링크 |
