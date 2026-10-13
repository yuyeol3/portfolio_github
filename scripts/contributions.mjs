export async function discoverContributions(username, queryPage) {
  const repositories = new Map();
  let after = null;
  do {
    const response = await queryPage(username, after);
    if (response.errors?.length) throw new Error('GitHub GraphQL 응답에 오류가 있습니다. 목록을 갱신하지 않습니다.');
    const connection = response.data?.user?.repositoriesContributedTo;
    if (!Array.isArray(connection?.nodes) || typeof connection.pageInfo?.hasNextPage !== 'boolean') {
      throw new Error('GitHub GraphQL 응답 형식이 올바르지 않습니다.');
    }
    for (const repo of connection.nodes) {
      if (repo.isPrivate === false && repo.nameWithOwner.split('/')[0].toLowerCase() !== username.toLowerCase()) {
        repositories.set(repo.nameWithOwner.toLowerCase(), repo.nameWithOwner);
      }
    }
    const next = connection.pageInfo.hasNextPage ? connection.pageInfo.endCursor : null;
    if (connection.pageInfo.hasNextPage && (!next || next === after)) {
      throw new Error('GitHub GraphQL pagination cursor가 올바르지 않습니다.');
    }
    after = next;
  } while (after);
  return [...repositories.values()].sort((a, b) => a.localeCompare(b));
}
