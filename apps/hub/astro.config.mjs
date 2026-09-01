import { defineConfig } from 'astro/config';

// 허브는 완전 정적 페이지라 어댑터 없이 기본 static 빌드로 충분합니다.
// Cloudflare Pages에는 dist/ 폴더만 그대로 배포됩니다.
export default defineConfig({
  site: 'https://decalin-projects.pages.dev', // 나중에 도메인 사면 여기만 바꾸면 됨
});
