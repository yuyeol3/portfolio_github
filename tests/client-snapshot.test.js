import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchRepositorySnapshot } from '../src/snapshot.js';

test('browser loads the deployed snapshot in one request without calling the rate-limited GitHub API', async () => {
  const snapshot = { username: 'yuyeol3', generatedAt: '2026-10-14T00:00:00Z', repositories: [{
    name: 'project', full_name: 'yuyeol3/project', owner: { login: 'yuyeol3' }, updated_at: '2026-10-13T00:00:00Z',
  }] };
  const urls = [];
  const fetcher = async url => {
    urls.push(String(url));
    assert.equal(String(url), 'https://yuyeol3.github.io/portfolio_github/content/repositories.json');
    return new Response(JSON.stringify(snapshot));
  };
  const result = await fetchRepositorySnapshot(new URL('https://yuyeol3.github.io/portfolio_github/content/repositories.json'), 'yuyeol3', fetcher);
  assert.deepEqual(result, snapshot);
  assert.equal(urls.length, 1);
});

test('a snapshot for a different user is rejected instead of replacing the cached list', async () => {
  await assert.rejects(fetchRepositorySnapshot('/content/repositories.json', 'yuyeol3', async () => new Response(JSON.stringify({
    username: 'someone-else', generatedAt: '2026-10-14T00:00:00Z', repositories: [],
  }))), /사용자/);
});
