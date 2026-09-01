// apps/hub/src/lib/github.ts
//
// 빌드 시(build-time) GitHub REST API에서 저장소 메타데이터를 가져온다.
//   · created_at            → 생성일(createdAt)
//   · pushed_at             → 최종 수정일(updatedAt, 마지막 코드 푸시)
//   · releases/latest tag   → 버전(version)
// 실패(네트워크/rate limit/릴리즈 없음)하면 undefined를 반환하고, 호출부에서 수동값으로 폴백한다.
//
// 인증 없이 60회/시간(IP당)이면 프로젝트 몇 개엔 충분. 더 필요하면 빌드 환경변수
// GITHUB_TOKEN 을 넣으면 5000회/시간으로 늘어난다(Cloudflare Pages → Settings → 환경변수).

export interface RepoMeta {
  createdAt?: string; // YYYY-MM-DD
  updatedAt?: string; // YYYY-MM-DD
  version?: string;
}

// dev 서버에서 매 요청마다 재조회하지 않도록 프로세스 단위로 캐시(서버 재시작 시 초기화).
const cache = new Map<string, RepoMeta>();

function parseRepo(repoUrl: string): { owner: string; repo: string } | null {
  try {
    const u = new URL(repoUrl);
    if (u.hostname !== 'github.com') return null;
    const [owner, repo] = u.pathname.replace(/^\/+/, '').split('/');
    if (!owner || !repo) return null;
    return { owner, repo: repo.replace(/\.git$/, '') };
  } catch {
    return null;
  }
}

function ghHeaders(): Record<string, string> {
  const h: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'decalin-hub',
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

async function getJson(url: string): Promise<any | null> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 5000);
    const res = await fetch(url, { headers: ghHeaders(), signal: ctrl.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchRepoMeta(repoUrl?: string): Promise<RepoMeta> {
  if (!repoUrl) return {};
  const cached = cache.get(repoUrl);
  if (cached) return cached;

  const parsed = parseRepo(repoUrl);
  if (!parsed) {
    cache.set(repoUrl, {});
    return {};
  }
  const { owner, repo } = parsed;
  const meta: RepoMeta = {};

  const repoJson = await getJson(`https://api.github.com/repos/${owner}/${repo}`);
  if (repoJson) {
    if (typeof repoJson.created_at === 'string') meta.createdAt = repoJson.created_at.slice(0, 10);
    if (typeof repoJson.pushed_at === 'string') meta.updatedAt = repoJson.pushed_at.slice(0, 10);
  }

  const relJson = await getJson(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);
  if (relJson && typeof relJson.tag_name === 'string') meta.version = relJson.tag_name;

  cache.set(repoUrl, meta);
  return meta;
}
