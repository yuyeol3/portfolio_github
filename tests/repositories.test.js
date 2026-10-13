import test from 'node:test';
import assert from 'node:assert/strict';
import { curateRepositories, resolveExternalRepositories, repositoryUrl } from '../src/repositories.js';

test('editorial metadata overrides descriptions without hiding newly added repositories', () => {
  const repos = [
    { name: 'known', description: 'API description', private: false },
    { name: 'new', description: null, private: false },
    { name: 'hidden', private: false },
    { name: 'private', private: true },
  ];
  const result = curateRepositories(repos, {
    categories: [{ id: 'web', label: '웹' }],
    repositories: { known: { category: 'web', description: '직접 쓴 설명', featured: true }, hidden: { hidden: true } },
  });
  assert.deepEqual(result.map(({ name, description, category, featured }) => ({ name, description, category, featured })), [
    { name: 'known', description: '직접 쓴 설명', category: 'web', featured: true },
    { name: 'new', description: '아직 설명이 등록되지 않았습니다.', category: 'uncategorized', featured: false },
  ]);
});

test('same-named external repositories use full owner/repo metadata', () => {
  const result = curateRepositories([
    { name: 'project', full_name: 'yuyeol3/project', owner: { login: 'yuyeol3' }, description: 'own' },
    { name: 'project', full_name: 'team/project', owner: { login: 'team' }, description: 'team' },
  ], {
    username: 'yuyeol3', categories: [{ id: 'web' }],
    repositories: { project: { description: '개인 설명', category: 'web' }, 'team/project': { description: '팀 설명', category: 'web', role: '백엔드' } },
  });
  assert.deepEqual(result.map(repo => [repo.description, repo.role]), [['개인 설명', ''], ['팀 설명', '백엔드']]);
});

test('unknown editorial categories fall back to uncategorized', () => {
  const result = curateRepositories([{ name: 'new' }], { categories: [], repositories: { new: { category: 'removed' } } });
  assert.equal(result[0].category, 'uncategorized');
});

test('automatically discovered projects are combined with manual pins without duplicate requests', () => {
  const names = resolveExternalRepositories({ username: 'yuyeol3', externalRepositories: ['Team/Pinned', 'Team/Shared'] }, {
    username: 'yuyeol3', repositories: ['team/shared', 'Team/Discovered'],
  });
  assert.deepEqual(names, ['Team/Pinned', 'Team/Shared', 'Team/Discovered']);
});

test('a discovery snapshot for another user is rejected', () => {
  assert.throws(() => resolveExternalRepositories({ username: 'yuyeol3', externalRepositories: [] }, {
    username: 'someone-else', repositories: ['team/project'],
  }), /사용자/);
});

test('student project links open the curated implementation branch instead of the shared starter', () => {
  const [repo] = curateRepositories([{ name: 'pusan-clone', full_name: 'team/pusan-clone', owner: { login: 'team' } }], {
    username: 'yuyeol3', categories: [{ id: 'ai-tools' }],
    repositories: { 'team/pusan-clone': { category: 'ai-tools', branch: 'choiyuyeol/final' } },
  });
  assert.equal(repositoryUrl(repo), 'https://github.com/team/pusan-clone/tree/choiyuyeol/final');
});
