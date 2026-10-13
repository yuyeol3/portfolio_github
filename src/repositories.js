export function curateRepositories(repositories, config) {
  const categories = new Set(config.categories.map(category => category.id));
  const metadataFor = repo => {
    const fullNameMetadata = config.repositories?.[repo.full_name];
    if (fullNameMetadata) return fullNameMetadata;
    const owned = !repo.owner || repo.owner.login.toLowerCase() === config.username?.toLowerCase();
    return (owned ? config.repositories?.[repo.name] : undefined) ?? {};
  };
  return repositories.filter(repo => !repo.private && !metadataFor(repo).hidden).map(repo => {
    const metadata = metadataFor(repo);
    return {
      ...repo,
      description: metadata.description ?? repo.description ?? '아직 설명이 등록되지 않았습니다.',
      category: categories.has(metadata.category) ? metadata.category : 'uncategorized',
      featured: metadata.featured === true,
      tags: metadata.tags ?? [],
      role: metadata.role ?? '',
      branch: metadata.branch ?? '',
    };
  });
}

export function resolveExternalRepositories(config, snapshot) {
  if (snapshot && snapshot.username?.toLowerCase() !== config.username.toLowerCase()) {
    throw new Error('참여 목록의 사용자가 사이트 설정과 다릅니다.');
  }
  if (snapshot && !Array.isArray(snapshot.repositories)) throw new Error('참여 목록 형식이 올바르지 않습니다.');
  const names = new Map();
  for (const name of [...(config.externalRepositories ?? []), ...(snapshot?.repositories ?? [])]) {
    if (typeof name !== 'string' || !/^[\w.-]+\/[\w.-]+$/.test(name)) throw new Error('참여 레포는 owner/repo 형식이어야 합니다.');
    const key = name.toLowerCase();
    if (!names.has(key)) names.set(key, name);
  }
  return [...names.values()];
}

export function repositoryUrl(repo) {
  const root = `https://github.com/${repo.full_name}`;
  return repo.branch ? `${root}/tree/${repo.branch.split('/').map(encodeURIComponent).join('/')}` : root;
}
