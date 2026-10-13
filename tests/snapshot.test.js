import test from 'node:test';
import assert from 'node:assert/strict';
import { createSnapshot } from '../scripts/snapshot.mjs';

test('published snapshot combines public repositories and strips API-only fields and credentials', () => {
  const repo = {
    name: 'project', full_name: 'team/project', owner: { login: 'team', email: 'not-published@example.com' },
    private: false, description: 'A project', language: 'Java', stargazers_count: 2,
    fork: false, archived: false, updated_at: '2026-10-14T00:00:00Z',
    permissions: { admin: true }, temp_clone_token: 'not-published',
  };
  const snapshot = createSnapshot('yuyeol3', [repo, repo, { ...repo, full_name: 'team/private', private: true }], '2026-10-14T01:00:00Z');
  assert.deepEqual(snapshot, {
    username: 'yuyeol3', generatedAt: '2026-10-14T01:00:00Z', repositories: [{
      name: 'project', full_name: 'team/project', owner: { login: 'team' },
      description: 'A project', language: 'Java', stargazers_count: 2,
      fork: false, archived: false, updated_at: '2026-10-14T00:00:00Z',
    }],
  });
});
