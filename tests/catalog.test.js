import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('editorial catalog uses unique categories and valid external repository paths', async () => {
  const config = JSON.parse(await readFile(new URL('../content/catalog.json', import.meta.url), 'utf8'));
  const ids = config.categories.map(category => category.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(!ids.includes('all') && !ids.includes('uncategorized'), 'Reserved category IDs must not be configured');
  for (const [name, metadata] of Object.entries(config.repositories)) {
    assert.ok(ids.includes(metadata.category), `${name}: unknown category ${metadata.category}`);
    assert.equal(typeof metadata.description, 'string', `${name}: description must be plain text`);
    if (metadata.tags) assert.ok(metadata.tags.every(tag => typeof tag === 'string'), `${name}: tags must be text`);
  }
  for (const name of config.externalRepositories) {
    assert.match(name, /^[\w.-]+\/[\w.-]+$/);
    assert.ok(config.repositories[name], `${name}: external editorial metadata missing`);
  }
});
