export function createSnapshot(username, repositories, generatedAt) {
  const unique = new Map();
  for (const repo of repositories) {
    if (repo.private !== false) continue;
    const { name, full_name, description, language, stargazers_count, fork, archived, updated_at } = repo;
    unique.set(full_name.toLowerCase(), {
      name, full_name, owner: { login: repo.owner.login },
      description, language, stargazers_count, fork, archived, updated_at,
    });
  }
  return { username, generatedAt, repositories: [...unique.values()] };
}
