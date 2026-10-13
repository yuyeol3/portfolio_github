import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { discoverContributions } from './contributions.mjs';

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
const repositories = await discoverContributions(config.username, async (username, after) => {
  const args = ['api', 'graphql', '-f', `query=${query}`, '-F', `login=${username}`];
  if (after) args.push('-F', `after=${after}`);
  return JSON.parse(execFileSync('gh', args, { encoding: 'utf8', timeout: 30000 }));
});
// Only write after every page succeeds. No credentials or private metadata are included.
await writeFile(new URL('../content/contributions.json', import.meta.url), JSON.stringify({
  username: config.username, generatedAt: new Date().toISOString(), repositories,
}, null, 2) + '\n');
console.log(`Discovered ${repositories.length} public participating repositories for ${config.username}.`);
