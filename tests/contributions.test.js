import test from 'node:test';
import assert from 'node:assert/strict';
import { discoverContributions } from '../scripts/contributions.mjs';

test('discovers all pages while excluding personal and private repositories and deduplicating paths', async () => {
  const cursors = [];
  const queryPage = async (username, after) => {
    assert.equal(username, 'yuyeol3');
    cursors.push(after);
    return { data: { user: { repositoriesContributedTo: {
      nodes: after ? [{ nameWithOwner: 'team/second', isPrivate: false }, { nameWithOwner: 'team/first', isPrivate: false }] : [
        { nameWithOwner: 'team/first', isPrivate: false },
        { nameWithOwner: 'yuyeol3/personal', isPrivate: false },
        { nameWithOwner: 'team/private', isPrivate: true },
      ],
      pageInfo: { hasNextPage: !after, endCursor: after ? null : 'next-page' },
    } } } };
  };
  assert.deepEqual(await discoverContributions('yuyeol3', queryPage), ['team/first', 'team/second']);
  assert.deepEqual(cursors, [null, 'next-page']);
});

test('missing pagination cursor fails instead of silently truncating the discovered list', async () => {
  await assert.rejects(discoverContributions('yuyeol3', async () => ({
    data: { user: { repositoriesContributedTo: { nodes: [], pageInfo: { hasNextPage: true, endCursor: null } } } },
  })), /cursor/);
});

test('partial GraphQL errors fail discovery rather than publishing an incomplete list', async () => {
  await assert.rejects(discoverContributions('yuyeol3', async () => ({
    errors: [{ message: 'rate limit' }],
    data: { user: { repositoriesContributedTo: { nodes: [], pageInfo: { hasNextPage: false } } } },
  })), /GitHub GraphQL/);
});
