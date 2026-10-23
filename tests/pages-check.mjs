import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

const root = resolve('dist');
const prefix = '/nexonet-v2-beta/';
const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.svg':'image/svg+xml', '.jpg':'image/jpeg', '.png':'image/png', '.woff2':'font/woff2', '.json':'application/json' };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (!pathname.startsWith(prefix)) { response.writeHead(404).end(); return; }
    const file = resolve(root, pathname.slice(prefix.length) || 'index.html');
    if (!file.startsWith(root + sep)) { response.writeHead(403).end(); return; }
    response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
    response.end(await readFile(file));
  } catch { if (!response.headersSent) response.writeHead(404); response.end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}${prefix}`;
let browser;
const errors = [], failures = [], results = [];
try {
  browser = await chromium.launch({ headless:true, ...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : process.platform === 'win32' ? {executablePath:'C:/Users/Nacho/AppData/Local/ms-playwright/chromium-1200/chrome-win64/chrome.exe'} : {}) });
  await mkdir('qa/pages', { recursive:true });
  for (const width of [1440,390]) {
    const page = await browser.newPage({ viewport:{width,height:900} });
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    await page.locator('[data-open-landing]').first().click();
    await page.locator('#landing-preview-dialog').waitFor({ state:'visible' });
    await page.waitForFunction(() => { const image = document.querySelector('[data-preview-image]'); return image.complete && image.naturalWidth > 0; });
    await page.keyboard.press('Escape');
    await page.evaluate(async () => {
      await Promise.all([...document.images].map(image => { image.loading = 'eager'; return image.decode().catch(() => {}); }));
    });
    assert.deepEqual(await page.locator('img[src]').evaluateAll(images => images.filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src)), []);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Horizontal overflow');
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow');
    await page.evaluate(() => window.scrollTo(0,0));
    await page.screenshot({ path:`qa/pages/pages-${width}.png` });
    results.push({width,images:'ok',gallery:'ok',overflow:'ok'});
    await page.close();
  }
  const page = await browser.newPage({ javaScriptEnabled:false });
  await page.goto(base);
  assert.ok(await page.locator('main').innerText());
  assert.ok(await page.locator('img').first().evaluate(image => image.complete && image.naturalWidth > 0));
  await page.close();
  assert.deepEqual(errors, []);
  assert.deepEqual(failures, []);
  await writeFile('qa/pages/results.json', JSON.stringify({results,noJavaScript:'ok',errors,failures},null,2));
  console.log('GitHub Pages: escritorio, móvil, imágenes, visor y HTML sin JavaScript correctos bajo /nexonet-v2-beta/.');
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
