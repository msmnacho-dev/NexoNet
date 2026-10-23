import { spawnSync } from 'node:child_process';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

// Keep the local build unchanged; publish a portable static beta at / or /repo/.
for (const args of [
  ['scripts/prepare-media.mjs'],
  ['node_modules/vite/bin/vite.js', 'build', '--base=./'],
  ['scripts/prerender.mjs'],
]) {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

async function makePortable(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) { await makePortable(file); continue; }
    if (!/\.(html|js|css)$/.test(entry.name)) continue;
    const original = await readFile(file, 'utf8');
    // Vite handles bundled assets. Public assets inside JS templates and the
    // prerendered HTML must resolve relative to the current document as well.
    const portable = original.replace(/(["'`(=])\/(images\/|videos\/|og-nexonet\.svg)/g, '$1./$2');
    if (portable !== original) await writeFile(file, portable);
  }
}
await makePortable('dist');
let html = await readFile('dist/index.html', 'utf8');
html = html.replace('</head>', '<meta name="robots" content="noindex, nofollow"></head>');
await writeFile('dist/index.html', html);
await writeFile('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
await writeFile('dist/.nojekyll', '');
console.log('Beta lista para GitHub Pages: dist/ (rutas relativas, sin indexación).');
