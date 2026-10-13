export async function fetchPublicRepositories(username, fetcher) {
  const repositories = [];
  for (let page = 1; ; page++) {
    const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?type=owner&sort=updated&per_page=100&page=${page}`;
    const response = await fetcher(url, { headers: { Accept: 'application/vnd.github+json' }, signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error(`GitHub API 오류 (${response.status}). 잠시 후 다시 시도해 주세요.`);
    const batch = await response.json();
    if (!Array.isArray(batch)) throw new Error('GitHub 응답 형식이 올바르지 않습니다.');
    repositories.push(...batch);
    if (batch.length < 100) return repositories;
  }
}

export async function fetchExternalRepositories(names, fetcher) {
  const results = await Promise.allSettled([...new Set(names)].map(async name => {
    if (!/^[\w.-]+\/[\w.-]+$/.test(name)) throw new Error(`${name}: owner/repo 형식이 필요합니다.`);
    const response = await fetcher(`https://api.github.com/repos/${name}`, {
      headers: { Accept: 'application/vnd.github+json' }, signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`${name}: 가져오지 못했습니다 (${response.status}).`);
    const repo = await response.json();
    if (!repo.full_name || repo.private) throw new Error(`${name}: 공개 저장소만 표시할 수 있습니다.`);
    return repo;
  }));
  return {
    repositories: results.filter(result => result.status === 'fulfilled').map(result => result.value),
    errors: results.filter(result => result.status === 'rejected').map(result => result.reason.message),
  };
}
