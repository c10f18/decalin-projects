// apps/hub/src/data/site.ts
// 사이트 소유자 / 소셜 링크 등 허브 전역 설정. 링크만 바꾸고 싶으면 여기만 고치면 됩니다.

export const site = {
  author: 'Decalin',
  year: 2026,
  // 헤더 우측에 아이콘으로 노출되는 소셜 링크들. id 는 아이콘 매칭용.
  social: [
    { id: 'blog', label: 'Blog', href: 'https://decalin.pages.dev/' },
    { id: 'github', label: 'GitHub', href: 'https://github.com/c10f18' },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/%EC%8A%B9%ED%98%84-%EC%9D%B4-861a88190/',
    },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/sseung00' },
    { id: 'email', label: 'Email', href: 'mailto:sallyiam@naver.com' },
  ] as const,
};

export type SocialId = (typeof site.social)[number]['id'];
