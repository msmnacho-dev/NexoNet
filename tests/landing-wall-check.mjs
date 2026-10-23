import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {landingConcepts} from '../src/data/landing-concepts.js';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Users/Nacho/AppData/Local/ms-playwright/chromium-1200/chrome-win64/chrome.exe'});
const base=process.env.BASE_URL||'http://127.0.0.1:4322';
const results=[],errors=[],consoleErrors=[],failedAssets=[],submissions=[];
await mkdir('qa/landing-wall',{recursive:true});
async function wallFrame(page,p){
 await page.evaluate(p=>{const wall=document.querySelector('.landing-wall-viewport'),top=wall.getBoundingClientRect().top+scrollY;scrollTo(0,top-innerHeight+(wall.offsetHeight+innerHeight)*p);},p);
 await page.waitForTimeout(650);
 return page.locator('.landing-wall-card').evaluateAll(es=>es.map(e=>new DOMMatrixReadOnly(getComputedStyle(e).transform).m42));
}
try{
 for(const [width,height] of [[1440,900],[1024,768],[768,900],[390,844],[320,568]]){
  const page=await browser.newPage({viewport:{width,height},hasTouch:width<=600});
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text());});page.on('response',r=>{if(r.status()>=400&&r.url().startsWith(base))failedAssets.push(r.url());});page.on('request',r=>{if(r.method()==='POST')submissions.push(r.url());});
  await page.goto(base);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1250);
  assert.equal(await page.locator('main>section').nth(1).getAttribute('id'),'propuestas');
  assert.equal(await page.locator('[data-landing-wall]').getAttribute('data-wall-motion'),'animated');
  assert.equal(await page.locator('.landing-wall-card').count(),6);
  const gap=await page.evaluate(()=>document.querySelector('#propuestas').getBoundingClientRect().top-document.querySelector('#inicio').getBoundingClientRect().bottom);assert.ok(Math.abs(gap)<1,'The wall must follow the ribbon without an intervening section');
  const first=await wallFrame(page,.25);
  for(const img of await page.locator('.landing-wall-card img').all())await img.evaluate(e=>e.decode());
  await page.screenshot({path:`qa/landing-wall/ours-${width}-start.png`});
  const second=await wallFrame(page,.65);
  assert.ok(second[0]>first[0]+8,'Outer columns must move down relative to scroll');
  assert.ok(second[1]<first[1]-8,'The middle/opposing column must move the other way');
  await page.screenshot({path:`qa/landing-wall/ours-${width}-middle.png`});
  const reverse=await wallFrame(page,.25);for(let i=0;i<6;i++)assert.ok(Math.abs(reverse[i]-first[i])<1,`Parallax must reverse: first ${JSON.stringify(first)}, reverse ${JSON.stringify(reverse)}`);
  const cards=page.locator('.landing-wall-card');
  await cards.first().focus();await page.keyboard.press('Enter');
  const dialog=page.locator('#landing-preview-dialog');assert.equal(await dialog.getAttribute('open'),'');
  assert.equal(await dialog.getAttribute('data-concept'),'brote');
  await page.keyboard.press('ArrowRight');assert.equal(await dialog.getAttribute('data-concept'),'bruma');
  await dialog.locator('[data-preview-zoom]').click();assert.equal(await dialog.locator('[data-preview-zoom]').getAttribute('aria-pressed'),'true');
  await page.screenshot({path:`qa/landing-wall/preview-${width}.png`});await page.keyboard.press('Escape');assert.equal(await dialog.getAttribute('open'),null);
  for(const [i,concept] of landingConcepts.entries()){
   const opener=page.locator('.landing-concept-picker [data-open-landing]').nth(i);await opener.click();
   assert.equal(await dialog.getAttribute('data-concept'),concept.id);assert.equal(await dialog.locator('[data-preview-title]').textContent(),concept.name);
   await dialog.locator('[data-preview-image]').evaluate(e=>e.decode());
   await page.keyboard.press('Escape');assert.equal(await opener.evaluate(e=>e===document.activeElement),true);
  }
  assert.equal(await page.locator('.offer-fold[open]').count(),0);
  await page.locator('#alcance-propuestas').scrollIntoViewIfNeeded();
  assert.ok((await page.locator('#alcance-title').boundingBox()).y>=60);
  await page.locator('.offer-fold>summary').first().focus();await page.keyboard.press('Enter');
  assert.equal(await page.locator('.offer-fold').first().getAttribute('open'),'');
  assert.equal(await page.locator('#web-eco .offer-includes li:visible').count(),4);
  assert.match(await page.locator('#web-eco').textContent(),/49 €|49/);assert.match(await page.locator('#web-eco .offer-terms').textContent(),/Dominio, alojamiento y servicios externos aparte/);
  await page.locator('.offer-fold>summary').nth(1).click();assert.equal(await page.locator('#ia-negocio .ai-demo-flow li:visible').count(),4);
  const clipped=await page.locator('.offer-fold>summary,.offer-details-heading h3,.landing-wall-bottom h3,.landing-concept-picker button').evaluateAll(es=>es.filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>({text:e.textContent.trim(),scroll:e.scrollWidth,width:e.clientWidth})));assert.deepEqual(clipped,[]);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(400);
  assert.equal(await page.locator('[data-landing-wall]').getAttribute('data-wall-motion'),'static');
  assert.equal(await page.locator('.landing-wall-card').first().evaluate(e=>getComputedStyle(e).transform),'none');
  const grid=await page.locator('.landing-wall-grid').boundingBox(),viewport=await page.locator('.landing-wall-viewport').boundingBox();assert.ok(grid.height<=viewport.height+1,'Reduced motion must show the complete grid');
  await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForTimeout(400);
  if(width<=800)await page.locator('.menu-toggle').click();await page.locator('#theme-toggle').click();if(width<=800)await page.keyboard.press('Escape');
  await wallFrame(page,.55);if([1440,390].includes(width))await page.screenshot({path:`qa/landing-wall/dark-${width}.png`});
  results.push({width,height,columns:width>800?3:2,opposingParallax:true,reverse:true,sixLocalConcepts:true,previewsAndKeyboard:true,commercialDetailsPreserved:true,reducedMotion:true,noClipping:true});console.log(`OK landing wall ${width}x${height}`);await page.close();
 }
 const staticPage=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:false});await staticPage.goto(base);assert.equal(await staticPage.locator('.landing-wall-card').count(),6);assert.equal(await staticPage.locator('.landing-wall-card').first().getAttribute('href'),landingConcepts[0].image);assert.equal(await staticPage.locator('.landing-wall-card').first().evaluate(e=>getComputedStyle(e).transform),'none');assert.ok(await staticPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await staticPage.close();
 const deep=await browser.newPage({viewport:{width:390,height:844}});await deep.goto(`${base}/#ia-negocio`);await deep.evaluate(()=>document.fonts.ready);await deep.waitForTimeout(500);assert.equal(await deep.locator('.offer-fold').nth(1).getAttribute('open'),'');const heading=await deep.locator('#ai-title').boundingBox();assert.ok(heading.y>=60&&heading.y<250);await deep.close();
 assert.deepEqual(errors,[]);assert.deepEqual(consoleErrors,[]);assert.deepEqual(failedAssets,[]);assert.deepEqual(submissions,[]);
 await writeFile('qa/landing-wall/results.json',JSON.stringify({results,noJavaScript:true,directDetailsLink:true,errors,consoleErrors,failedAssets,submissions},null,2));
}finally{await browser.close();}
