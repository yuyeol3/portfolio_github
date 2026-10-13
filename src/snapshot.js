export function validateSnapshot(snapshot, username) {
  if (snapshot?.username?.toLowerCase() !== username.toLowerCase()) throw new Error('저장소 데이터의 사용자가 사이트 설정과 다릅니다.');
  if (!Array.isArray(snapshot.repositories) || !Number.isFinite(Date.parse(snapshot.generatedAt))) {
    throw new Error('저장소 데이터 형식이 올바르지 않습니다.');
  }
  return snapshot;
}

export async function fetchRepositorySnapshot(url, username, fetcher = fetch) {
  const response = await fetcher(url, { cache: 'no-cache', signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`저장소 데이터 파일을 불러오지 못했습니다 (${response.status}).`);
  return validateSnapshot(await response.json(), username);
}
