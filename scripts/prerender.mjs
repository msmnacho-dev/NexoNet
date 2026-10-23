import { readFile, writeFile } from 'node:fs/promises';
import { renderSite } from '../src/render.js';
import { siteConfig } from '../src/data/siteConfig.js';
let html=await readFile('dist/index.html','utf8');
html=html.replace('<div id="app"></div>',()=>`<div id="app">${renderSite()}</div>`);
if(siteConfig.url) {
  const url=new URL(siteConfig.url);if(url.protocol!=='https:')throw new Error('Configura una URL HTTPS pública.');
  html=html.replace('</head>',`<link rel="canonical" href="${url.href}"><meta property="og:url" content="${url.href}"></head>`);
}
if(siteConfig.schema)html=html.replace('</head>',()=>`<script type="application/ld+json">${JSON.stringify(siteConfig.schema).replaceAll('<','\\u003c')}</script></head>`);
await writeFile('dist/index.html',html);console.log('HTML semántico prerenderizado para indexación y lectura sin JavaScript.');
