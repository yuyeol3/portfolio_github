import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { discoverContributions } from './contributions.mjs';
import { fetchPublicRepositories, fetchExternalRepositories } from './github.mjs';
import { createSnapshot } from './snapshot.mjs';
import { resolveExternalRepositories } from '../src/repositories.js';

const query = `query($login: String!, $after: String) {
  user(login: $login) {
    repositoriesContributedTo(first: 100, after: $after, includeUserRepositories: false,
      privacy: PUBLIC, contributionTypes: [COMMIT, PULL_REQUEST, PULL_REQUEST_REVIEW]) {
      nodes { nameWithOwner isPrivate }
      pageInfo { hasNextPage endCursor }
    }
  }
}`;

const config = JSON.parse(await readFile(new URL('../content/catalog.json', import.meta.url), 'utf8'));
const contributed = await discoverContributions(config.username, async (username, after) => {
  const args = ['api', 'graphql', '-f', `query=${query}`, '-F', `login=${username}`];
  if (after) args.push('-F', `after=${after}`);
  return JSON.parse(execFileSync('gh', args, { encoding: 'utf8', timeout: 30000 }));
});
const externalNames = resolveExternalRepositories(config, { username: config.username, repositories: contributed });
const authenticatedFetch = async url => {
  const endpoint = new URL(url);
  const body = execFileSync('gh', ['api', endpoint.pathname + endpoint.search], { encoding: 'utf8', timeout: 30000 });
  return new Response(body);
};
const owned = await fetchPublicRepositories(config.username, authenticatedFetch);
const external = await fetchExternalRepositories(externalNames, authenticatedFetch);
if (external.errors.length) throw new Error(external.errors.join('\n'));
const snapshot = createSnapshot(config.username, [...owned, ...external.repositories], new Date().toISOString());
// Publish only complete successful results, with explicit public fields and no credentials.
await writeFile(new URL('../content/repositories.json', import.meta.url), JSON.stringify(snapshot, null, 2) + '\n');
console.log(`Synced ${snapshot.repositories.length} public repositories (${owned.length} owned, ${external.repositories.length} participating).`);
