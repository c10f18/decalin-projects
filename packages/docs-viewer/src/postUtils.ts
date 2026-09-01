// packages/docs-viewer/src/postUtils.ts
//
// 위키(wiki) / 개발노트(devnote) / 릴리즈노트(changelog) markdown 글들을
// 목록으로 만들 때 공통으로 쓰는 정렬/필터 유틸.
// 모든 글의 frontmatter는 아래 스키마를 따른다고 가정한다.
//
// ---
// title: "글 제목"
// date: 2026-08-20
// tags: [설계, 이미지처리]   # 다중 태그, 자유롭게
// pinned: true               # 공지처럼 상단 고정하고 싶을 때만 true
// ---

export interface PostFrontmatter {
  title: string;
  date: string | Date;
  tags?: string[];
  pinned?: boolean;
  summary?: string;
}

export interface PostModule extends PostFrontmatter {
  slug: string;
  Content: any;
}

/**
 * Astro의 `import.meta.glob('../content/xxx/*.md', { eager: true })` 결과를
 * 다루기 쉬운 배열로 바꿔준다.
 */
export function globToPosts(
  modules: Record<string, any>
): PostModule[] {
  return Object.entries(modules).map(([path, mod]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    return {
      slug,
      Content: mod.Content,
      ...(mod.frontmatter as PostFrontmatter),
    };
  });
}

interface SortFilterOptions {
  tag?: string;
}

/**
 * 정렬 규칙: 1) pinned(공지) 먼저, 2) 그 다음 날짜 최신순.
 * tag가 주어지면 해당 태그를 가진 글만 필터링.
 */
export function sortAndFilterPosts(
  posts: PostModule[],
  options: SortFilterOptions = {}
): PostModule[] {
  let result = [...posts];

  if (options.tag) {
    result = result.filter((p) => p.tags?.includes(options.tag!));
  }

  result.sort((a, b) => {
    const pinDiff = Number(!!b.pinned) - Number(!!a.pinned);
    if (pinDiff !== 0) return pinDiff;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return result;
}

/** 목록에 노출할 태그 전체(중복 제거)를 뽑아준다. */
export function collectTags(posts: PostModule[]): string[] {
  const set = new Set<string>();
  for (const p of posts) {
    for (const t of p.tags ?? []) set.add(t);
  }
  return [...set].sort();
}

/** 날짜를 "2026.08.20" 형태로 표시. */
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(
    d.getDate()
  ).padStart(2, '0')}`;
}
