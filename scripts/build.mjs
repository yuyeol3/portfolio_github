import { mkdir, cp } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const output = new URL('../dist/', import.meta.url);
await mkdir(output, { recursive: true });
for (const path of ['index.html', 'styles.css', 'src', 'content']) {
  await cp(new URL(path, root), new URL(path, output), { recursive: true });
}
console.log('Static site built in dist/');
