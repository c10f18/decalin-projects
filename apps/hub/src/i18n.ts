// apps/hub/src/i18n.ts
//
// 다국어(i18n) 뼈대.
//   · 지금은 한국어(ko)가 기본이고, 영어(en)는 UI 문구만 채워둔 상태입니다.
//   · 프로젝트 설명(tagline)은 아직 KO 원문만 노출됩니다.
//     나중에 projects.ts의 각 항목에 tagline_en 을 채우면 EN에서도 번역이 보입니다.
//
// 새 UI 문구가 필요하면 아래 STRINGS 에 ko/en 한 쌍을 추가하고,
// 화면에서는 <T ko={t.xxx.ko} en={t.xxx.en} /> 형태로 쓰면 됩니다.

export type Lang = 'ko' | 'en';
export const LANGS: Lang[] = ['ko', 'en'];
export const DEFAULT_LANG: Lang = 'ko';

type Pair = { ko: string; en: string };

export const STRINGS = {
  headerTitle: { ko: 'Decalin의 사이드 프로젝트', en: "Decalin's Side Projects" },
  headerTagline: { ko: '필요와 흥미에 의한 사이드 프로젝트들.', en: 'Side projects born of need and curiosity.' },

  // 뷰 토글 (아이콘 버튼의 접근성 라벨)
  viewGrid: { ko: '갤러리 보기', en: 'Gallery view' },
  viewList: { ko: '리스트 보기', en: 'List view' },

  // 상태 배지
  statusActive: { ko: '진행중', en: 'Active' },
  statusPaused: { ko: '보류', en: 'Paused' },
  statusDone: { ko: '완료', en: 'Done' },
  statusArchived: { ko: '중단', en: 'Archived' },
  updated: { ko: '업데이트됨', en: 'Updated' },

  // 형태 칩
  kindDownload: { ko: '다운로드', en: 'Download' },
  kindWeb: { ko: '웹', en: 'Web' },

  // 1차 액션 버튼
  download: { ko: '다운로드', en: 'Download' },
  openApp: { ko: '서비스 열기', en: 'Open app' },
  intro: { ko: '소개 페이지', en: 'About' },
  github: { ko: 'GitHub', en: 'GitHub' },

  // 문서 버튼 (보조 그룹)
  releaseNotes: { ko: '릴리즈 노트', en: 'Release notes' },
  wiki: { ko: '위키', en: 'Wiki' },
  architecture: { ko: '아키텍처', en: 'Architecture' },
  devNote: { ko: '개발노트', en: 'Dev notes' },

  // 컨트롤 (접근성 라벨)
  themeToggle: { ko: '테마 전환', en: 'Toggle theme' },
  langToggle: { ko: '언어 전환', en: 'Toggle language' },

  // 소셜
  blog: { ko: '블로그', en: 'Blog' },
  linkedin: { ko: 'LinkedIn', en: 'LinkedIn' },
  instagram: { ko: 'Instagram', en: 'Instagram' },
  email: { ko: '이메일', en: 'Email' },

  // 푸터
  rights: { ko: 'All rights reserved.', en: 'All rights reserved.' },
} satisfies Record<string, Pair>;

export type StringKey = keyof typeof STRINGS;
