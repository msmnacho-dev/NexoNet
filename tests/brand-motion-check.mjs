import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Users/Nacho/AppData/Local/ms-playwright/chromium-1200/chrome-win64/chrome.exe'});
const base=process.env.BASE_URL||'http://127.0.0.1:4322';
const results=[],errors=[],consoleErrors=[];
await mkdir('qa/brand-motion',{recursive:true});
try{
 for(const [width,height] of [[1440,900],[1024,768],[768,900],[390,844],[320,568]]){
  const page=await browser.newPage({viewport:{width,height},hasTouch:width<=768});
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text());});
  await page.goto(base);await page.evaluate(()=>document.fonts.ready);
  await page.waitForFunction(()=>[...document.querySelectorAll('[data-brand-word]')].every(e=>Number(getComputedStyle(e).opacity)>=.9999),null,{timeout:5000});
  assert.equal(await page.locator('html').getAttribute('data-brand-motion'),'animated');
  assert.equal((await page.locator('.site-header').boundingBox()).y,0);
  const title=page.locator('.brand-title');
  assert.ok((await title.boundingBox()).width>width*.8);
  for(const action of await page.locator('.deck-card.is-current .deck-cta>a,.entry-notice').all()){
   const r=await action.boundingBox();assert.ok(r.y>=60&&r.y+r.height<=height+1,`Commercial action hidden at ${width}: ${JSON.stringify(r)}`);
  }
  for(const word of await page.locator('[data-brand-word]').all())assert.ok(await word.evaluate(e=>Number(getComputedStyle(e).opacity))>=.999,'The brand words must finish their entrance visibly');
  if([1440,390,320].includes(width))await page.screenshot({path:`qa/brand-motion/hero-${width}.png`});
  if(width===1440){
   await page.mouse.move(200,160);await page.waitForTimeout(650);
   const left=await page.locator('[data-brand-tilt]').evaluate(e=>getComputedStyle(e).transform);
   await page.mouse.move(1200,340);await page.waitForTimeout(650);
   const right=await page.locator('[data-brand-tilt]').evaluate(e=>getComputedStyle(e).transform);
   assert.notEqual(left,right,'The brand sculpture should respond to the pointer');
   await page.mouse.move(10,800);await page.waitForTimeout(650);
  }
  const ribbon=page.locator('[data-brand-ribbon]');
  assert.equal(await page.locator('[data-ribbon-toggle]').count(),0,'No animation pause control should be present');
  await page.locator('.brand-ribbon').scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>document.querySelector('[data-brand-ribbon]').dataset.running==='true');
  const before=await ribbon.evaluate(e=>getComputedStyle(e).transform);await page.waitForTimeout(220);
  assert.notEqual(await ribbon.evaluate(e=>getComputedStyle(e).transform),before);
  const moving=await ribbon.evaluate(e=>getComputedStyle(e).transform);await page.waitForTimeout(220);
  assert.notEqual(await ribbon.evaluate(e=>getComputedStyle(e).transform),moving,'The ribbon should run without a pause control');
  await page.locator('#manifiesto').evaluate(e=>scrollTo(0,e.getBoundingClientRect().top+scrollY-innerHeight*.2));await page.waitForTimeout(650);
  const firstInk=await page.locator('[data-brand-ink]').first().evaluate(e=>Number(getComputedStyle(e).opacity));
  await page.locator('#manifiesto').evaluate(e=>scrollTo(0,e.getBoundingClientRect().bottom+scrollY-innerHeight*.5));await page.waitForTimeout(650);
  assert.ok((await page.locator('[data-brand-ink]').last().evaluate(e=>Number(getComputedStyle(e).opacity)))>.9);
  assert.ok(firstInk>.24);
  if(width===1440)await page.screenshot({path:'qa/brand-motion/ink-desktop.png'});
  if(width===1440){
   await page.locator('.service-card').first().hover();await page.waitForTimeout(450);
   assert.equal(await page.locator('.service-motion-art').first().evaluate(e=>getComputedStyle(e).opacity),'1');
   const art=await page.locator('.service-motion-art').first().boundingBox();
   const title=await page.locator('.service-card h3').first().evaluate(e=>{const range=document.createRange();range.selectNodeContents(e);const r=range.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height};});
   assert.ok(art.x>=title.x+title.width||art.y+art.height<=title.y,'The service artwork must not cover its heading');
   await page.screenshot({path:'qa/brand-motion/service-hover.png'});
  }
  const clipped=await page.locator('.brand-title,.entry-offer h2,.deck-cta>a').evaluateAll(es=>es.filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.className));
  assert.deepEqual(clipped,[],`Clipped brand or offers at ${width}`);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>document.documentElement.dataset.brandMotion==='reduced');
  assert.equal(await page.locator('[data-ribbon-toggle]').count(),0);
  assert.equal(await ribbon.evaluate(e=>getComputedStyle(e).animationName),'none');
  assert.equal(await page.locator('[data-brand-ink]').last().evaluate(e=>getComputedStyle(e).opacity),'1');
  assert.equal(await page.locator('.journey-copy:visible').count(),6);
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.waitForFunction(()=>document.documentElement.dataset.brandMotion==='animated');
  assert.equal(await page.locator('.project-runway').count(),1);
  if(width<=800)await page.locator('.menu-toggle').click();await page.locator('#theme-toggle').click();if(width<=800)await page.keyboard.press('Escape');
  await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(1400);
  if([1440,390].includes(width))await page.screenshot({path:`qa/brand-motion/dark-${width}.png`});
  results.push({width,height,brandDominant:true,ecoInFirstViewport:true,ribbonRunsAutomatically:true,noPauseControls:true,scrollInk:true,liveReducedMotion:true,noClipping:true});
  console.log(`OK brand motion ${width}x${height}`);await page.close();
 }
 const staticPage=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
 await staticPage.goto(base);
 assert.equal(await staticPage.locator('.brand-title').isVisible(),true);
 assert.equal(await staticPage.locator('[data-ribbon-toggle]').count(),0);
 assert.equal(await staticPage.locator('.brand-ribbon-track').evaluate(e=>getComputedStyle(e).animationName),'none');
 assert.ok(await staticPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await staticPage.close();
 assert.deepEqual(errors,[]);assert.deepEqual(consoleErrors,[]);
 await writeFile('qa/brand-motion/results.json',JSON.stringify({results,noJavaScript:true,errors,consoleErrors},null,2));
}finally{await browser.close();}
