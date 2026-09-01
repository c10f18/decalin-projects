// apps/hub/src/data/projects.ts
//
// 새 사이드 프로젝트를 배포했으면 이 배열에 한 줄(객체) 추가하는 게 전부입니다.
// 허브 페이지, 배지, 갤러리/리스트 뷰가 전부 이 데이터 하나로 자동으로 그려집니다.

export type ProjectStatus = 'active' | 'paused' | 'done' | 'archived';

// 프로젝트의 "형태":
//   web      — 브라우저에서 바로 쓰는 웹 서비스 (url이 곧 서비스 화면)
//   download — 빌드된 실행파일(exe 등)을 GitHub Releases로 배포하는 프로젝트.
//              이때 url은 서비스가 아니라 "소개/광고 랜딩 페이지"를 가리킨다.
export type ProjectKind = 'web' | 'download';

export interface Project {
  name: string;
  slug: string;
  tagline: string;
  tagline_en?: string; // (i18n 뼈대) EN 선택 시 보여줄 영문 설명. 없으면 KO 원문으로 대체.
  kind: ProjectKind;

  // web:      서비스(앱) URL — 보통 사이트 루트 "/"  (예: my-app.pages.dev)
  // download: 소개/광고 랜딩 페이지 URL (앱이 없으니 "/"가 곧 랜딩)
  url: string;

  // 랜딩(광고) 페이지는 형태와 무관한 선택 요소.
  //   download: 랜딩이 곧 url("/")이라 별도로 둘 필요 없음
  //   web:      앱은 "/"에, 마케팅 랜딩은 "/intro"에 두는 걸 권장 → 그 주소를 여기 적으면
  //             허브 카드에 "소개" 버튼이 자동으로 붙음
  introUrl?: string;

  // download 전용 —
  downloadUrl?: string; // GitHub Releases 최신 배포 (예: .../releases/latest)
  repoUrl?: string; // GitHub 저장소 (선택)

  // 공통 문서 섹션 (없으면 카드에서 자동으로 숨겨짐)
  infoUrl?: string; // 릴리즈노트 목록
  wikiUrl?: string; // 위키(명세/문서) 목록
  archUrl?: string; // 아키텍처 1페이지 (개발자용 구조 설명)
  devNoteUrl?: string; // 개발노트/회고 목록

  // ▼ createdAt · updatedAt · version 은 빌드 시 GitHub(repoUrl)에서 자동으로 채워진다.
  //   (created_at / pushed_at / releases-latest 태그) — 아래 값들은 조회 실패 시 폴백용.
  status: ProjectStatus;
  createdAt: string; // ISO date, 생성일 폴백값 (평소엔 GitHub created_at)
  updatedAt: string; // ISO date, 수정일 폴백값 (평소엔 GitHub pushed_at) — "업데이트됨" 배지 계산에도 사용
  version?: string; // 버전 폴백값 (평소엔 GitHub releases/latest 태그). 없으면 카드에서 숨겨짐
  tags: string[];
  thumbnail?: string; // /images/xxx.png, 없으면 기본 카드로 표시
}

export const projects: Project[] = [
  {
    name: 'Photo Fold',
    slug: 'photo-fold',
    tagline: '사진을 이벤트/촬영일 기준으로 폴더링 해주는 개인용 사진 정리 도구',
    tagline_en: 'A personal photo organizer that sorts your photos into folders by event and shooting date.',
    kind: 'download',
    url: 'https://photo-fold.pages.dev', // 소개(광고) 랜딩 페이지
    downloadUrl: 'https://github.com/c10f18/photo-fold/releases/latest',
    repoUrl: 'https://github.com/c10f18/photo-fold',
    infoUrl: 'https://photo-fold.pages.dev/info',
    wikiUrl: 'https://photo-fold.pages.dev/wiki',
    archUrl: 'https://photo-fold.pages.dev/arch',
    devNoteUrl: 'https://photo-fold.pages.dev/devnote',
    status: 'active',
    createdAt: '2026-08-20', // 폴백값 (평소엔 GitHub에서 자동)
    updatedAt: '2026-08-29',
    version: 'v0.1.0', // 폴백값 (평소엔 GitHub에서 자동)
    tags: ['Image', 'Python', 'exe'],
  },
  {
    name: 'Redmine Wiki Downloader',
    slug: 'download-redmine-wiki',
    tagline: 'Redmine 프로젝트의 위키 페이지를 통째로 Markdown으로 내려받는 GUI 도구',
    tagline_en: 'A GUI tool that downloads an entire Redmine project wiki as Markdown.',
    kind: 'download',
    url: 'https://download-redmine-wiki.pages.dev',
    downloadUrl: 'https://github.com/c10f18/DownloadRedmineWiki/releases/latest',
    repoUrl: 'https://github.com/c10f18/DownloadRedmineWiki',
    infoUrl: 'https://download-redmine-wiki.pages.dev/info',
    wikiUrl: 'https://download-redmine-wiki.pages.dev/wiki',
    archUrl: 'https://download-redmine-wiki.pages.dev/arch',
    devNoteUrl: 'https://download-redmine-wiki.pages.dev/devnote',
    status: 'active',
    createdAt: '2026-08-24', // 폴백값 (평소엔 GitHub에서 자동)
    updatedAt: '2026-08-31',
    version: 'v0.1.0', // 폴백값 (평소엔 GitHub에서 자동)
    tags: ['Redmine', 'Python', 'exe'],
  },
  {
    name: 'QR Code Converter',
    slug: 'qr-code-converter',
    tagline: '엑셀의 URL 목록을 한 번에 QR 코드 이미지로 변환하는 Windows 유틸리티',
    tagline_en: 'A Windows utility that converts a list of URLs in Excel into QR code images in one go.',
    kind: 'download',
    url: 'https://qr-code-converter.pages.dev',
    downloadUrl: 'https://github.com/c10f18/QR_Code_Converter/releases/latest',
    repoUrl: 'https://github.com/c10f18/QR_Code_Converter',
    infoUrl: 'https://qr-code-converter.pages.dev/info',
    wikiUrl: 'https://qr-code-converter.pages.dev/wiki',
    archUrl: 'https://qr-code-converter.pages.dev/arch',
    devNoteUrl: 'https://qr-code-converter.pages.dev/devnote',
    status: 'active',
    createdAt: '2026-08-27', // 폴백값 (평소엔 GitHub에서 자동)
    updatedAt: '2026-08-31',
    version: 'v0.1.0', // 폴백값 (평소엔 GitHub에서 자동)
    tags: ['QR', 'Python', 'exe'],
  },
  // 다음 프로젝트를 배포하면 여기에 추가:
  //  · 웹 서비스라면      kind: 'web',      url 만 채우면 됨
  //  · exe 다운로드형이라면 kind: 'download', url(랜딩) + downloadUrl + repoUrl 채우기
  // {
  //   name: '프로젝트2',
  //   slug: 'project-2',
  //   kind: 'web',
  //   url: 'https://project-2.pages.dev',
  //   ...
  // },
];
