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
    };
  });
}
