// apps/_template-download/src/i18n.ts
// 템플릿 UI 크롬(버튼·내비·푸터 등) 다국어 문구. 마크다운 본문은 원문 유지.
// 새 문구가 필요하면 ko/en 한 쌍을 추가하고 <T ko=.. en=.. /> 로 쓰면 된다.

export type Lang = 'ko' | 'en';
export const DEFAULT_LANG: Lang = 'ko';

type Pair = { ko: string; en: string };

export const STRINGS = {
  download: { ko: '내려받기', en: 'Download' },
  viewOnGithub: { ko: 'GitHub에서 보기', en: 'View on GitHub' },
  learnMore: { ko: '더 알아보기', en: 'Learn more' },
  intro: { ko: '소개', en: 'Intro' },
  useNow: { ko: '지금 사용하기', en: 'Use it now' },
  openApp: { ko: '앱 열기', en: 'Open app' },

  releaseNotes: { ko: '릴리즈 노트', en: 'Release notes' },
  wiki: { ko: '위키', en: 'Wiki' },
  architecture: { ko: '아키텍처', en: 'Architecture' },
  devNote: { ko: '개발노트', en: 'Dev notes' },

  home: { ko: '홈', en: 'Home' },
  back: { ko: '목록으로', en: 'Back to list' },

  wikiDesc: { ko: '기능 명세와 구조 문서를 모아둔 곳입니다.', en: 'Specifications and structure documents.' },
  devNoteDesc: {
    ko: '공부할 것, 겪은 어려움, 예상 못하게 배운 것들을 기록하는 회고 공간입니다.',
    en: 'A place for notes on what I studied, struggled with, and learned along the way.',
  },

  themeToggle: { ko: '테마 전환', en: 'Toggle theme' },
  langToggle: { ko: '언어 전환', en: 'Toggle language' },
  rights: { ko: 'All rights reserved.', en: 'All rights reserved.' },
} satisfies Record<string, Pair>;
