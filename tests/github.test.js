import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchPublicRepositories, fetchExternalRepositories } from '../scripts/github.mjs';

test('loads every page so users with more than 100 repositories are not truncated', async () => {
  const urls = [];
  const fetcher = async url => {
    urls.push(url);
    const page = Number(new URL(url).searchParams.get('page'));
    return new Response(JSON.stringify(page === 1 ? Array.from({ length: 100 }, (_, id) => ({ id })) : [{ id: 100 }]));
  };
  const result = await fetchPublicRepositories('yuyeol3', fetcher);
  assert.equal(result.length, 101);
  assert.equal(urls.length, 2);
  assert.equal(new URL(urls[1]).searchParams.get('page'), '2');
});

test('an unavailable external repository does not hide other participating projects', async () => {
  const fetcher = async url => url.endsWith('/org/missing')
    ? new Response('{}', { status: 404 })
    : new Response(JSON.stringify({ full_name: 'org/project', private: false }));
  const result = await fetchExternalRepositories(['org/project', 'org/missing'], fetcher);
  assert.deepEqual(result.repositories.map(repo => repo.full_name), ['org/project']);
  assert.equal(result.errors.length, 1);
  assert.match(result.errors[0], /org\/missing/);
});

test('API rate limit failures are reported instead of becoming an empty repository list', async () => {
  await assert.rejects(fetchPublicRepositories('yuyeol3', async () => new Response('{}', { status: 403 })), /403/);
});

test('private external repository responses are never shown', async () => {
  const result = await fetchExternalRepositories(['org/private'], async () => new Response(JSON.stringify({ full_name: 'org/private', private: true })));
  assert.equal(result.repositories.length, 0);
  assert.equal(result.errors.length, 1);
});
