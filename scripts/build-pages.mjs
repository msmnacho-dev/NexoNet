import { spawnSync } from 'node:child_process';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
for (const args of [
  ['scripts/prepare-media.mjs'],
]) {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
const build = spawnSync(npm, ['exec', '--no', '--', 'vite', 'build', '--base=/NexoNet/'], {
  stdio: 'inherit', shell: process.platform === 'win32',
});
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);
const prerender = spawnSync(process.execPath, ['scripts/prerender.mjs'], { stdio: 'inherit' });
if (prerender.error) throw prerender.error;
if (prerender.status !== 0) process.exit(prerender.status ?? 1);

async function makePortable(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) { await makePortable(file); continue; }
    if (!/\.(html|js|css)$/.test(entry.name)) continue;
    const original = await readFile(file, 'utf8');
    const portable = original.replace(/(["'`(=])\/(images\/|videos\/|og-nexonet\.svg)/g, '$1./$2');
    if (portable !== original) await writeFile(file, portable);
  }
}
await makePortable('dist');
for (const [route, accent] of [['green','#41651b'],['red','#b42332'],['wine','#722f46']]) {
  const page = join('dist', route);
  await mkdir(page, { recursive: true });
  let html = await readFile('dist/index.html', 'utf8');
  html = html.replace('<head>', `<head><style>:root{--brand-accent:${accent}}</style>`);
  html = html.replace(/(src|href)="\.\/assets\//g, '$1="/NexoNet/assets/');
  html = html.replace(/\.\/images\//g, '/NexoNet/images/').replace(/\.\/videos\//g, '/NexoNet/videos/').replace('./favicon.svg', '/NexoNet/favicon.svg');
  await writeFile(join(page, 'index.html'), html);
}
let html = await readFile('dist/index.html', 'utf8');
html = html.replace('</head>', '<meta name="robots" content="noindex, nofollow"></head>');
await writeFile('dist/index.html', html);
await writeFile('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
await writeFile('dist/.nojekyll', '');
console.log('Beta lista para GitHub Pages: /green/, /red/ y /wine/.');
