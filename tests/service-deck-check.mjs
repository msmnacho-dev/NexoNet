import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {entryServices} from '../src/data/entry-services.js';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Users/Nacho/AppData/Local/ms-playwright/chromium-1200/chrome-win64/chrome.exe'});
const base=process.env.BASE_URL||'http://127.0.0.1:4322';
const results=[],errors=[],consoleErrors=[],submissions=[];
await mkdir('qa/service-deck',{recursive:true});
async function frame(page,index){
 await page.evaluate(index=>{const d=document.querySelector('[data-service-deck]');scrollTo(0,Number(d.dataset.scrollStart)+(Number(d.dataset.scrollEnd)-Number(d.dataset.scrollStart))*index/5);},index);
 await page.waitForFunction(i=>document.querySelector('[data-service-deck]').dataset.activeService===String(i),index);
 await page.waitForTimeout(700);
}
async function fit(page,width,height,index){
 const card=page.locator('[data-service-card]').nth(index),r=await card.boundingBox();
 for(const element of await card.locator('.deck-copy,.deck-cta>a,.deck-contact-note,.deck-art-label').all()){
  const b=await element.boundingBox();
  assert.ok(b.y>=r.y-1&&b.y+b.height<=r.y+r.height+1,`Card content cut ${width}x${height} panel ${index}: ${JSON.stringify(b)} inside ${JSON.stringify(r)}`);
 }
 assert.ok(r.y>=60&&r.y+r.height<height,`Card outside viewport at ${width} panel ${index}`);
 assert.ok(await card.locator('.deck-art').evaluate(e=>e.clientHeight>35),'The service must retain a visual composition');
 const clipped=await card.locator('h2,.entry-price,.deck-summary,.deck-cta>a').evaluateAll(es=>es.filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.className));
 assert.deepEqual(clipped,[],`Text clipped ${width} panel ${index}`);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
}
try{
 for(const [width,height] of [[320,568],[390,844],[375,667],[1024,768],[768,900],[1440,900]]){
  const page=await browser.newPage({viewport:{width,height},hasTouch:width<=600});
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text());});page.on('request',r=>{if(r.method()==='POST')submissions.push(r.url());});
  await page.goto(base);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1250);
  assert.equal(await page.locator('[data-service-deck]').getAttribute('data-mode'),'scroll');
  assert.equal((await page.locator('.site-header').boundingBox()).y,0);
  const ribbon=await page.locator('.brand-ribbon').boundingBox();
  if([1440,390,320].includes(width))await page.screenshot({path:`qa/service-deck/opening-${width}.png`});
  assert.ok(Math.abs(ribbon.y+ribbon.height-height)<2,`The enlarged ribbon must finish the first viewport: ${JSON.stringify(ribbon)} at ${height}`);
  assert.ok(ribbon.height>=65);assert.equal(await page.locator('.ribbon-service-mark svg').count(),12);
  assert.equal(await page.locator('.brand-ribbon b').count(),0);
  if([1440,390,320].includes(width))await page.screenshot({path:`qa/service-deck/opening-${width}.png`});
  for(let i=0;i<6;i++){
   await frame(page,i);
   await page.screenshot({path:`qa/service-deck/service-${i+1}-${width}.png`});
   await fit(page,width,height,i);
   assert.equal(await page.locator('[data-service-card]:not([inert])').count(),1);
   assert.equal(await page.locator(`[data-service-index="${i}"]`).getAttribute('aria-current'),'true');
   if([1440,390,320].includes(width))await page.screenshot({path:`qa/service-deck/service-${i+1}-${width}.png`});
  }
  // Scroll back through every panel, preserving ordering and interaction state.
  for(const i of [4,3,2,1,0])await frame(page,i);
  await page.locator('[data-service-index="0"]').focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(1500);
  assert.equal(await page.locator('[data-service-deck]').getAttribute('data-active-service'),'1');
  const before=await page.evaluate(()=>scrollY);
  await page.locator('.deck-card.is-current .deck-cta>a').click();
  await page.waitForFunction(()=>location.hash==='#contacto');
  assert.equal(await page.locator('#contact-form [name=service]').inputValue(),entryServices[1].service);
  assert.ok(await page.evaluate(()=>scrollY)>before,'The CTA should navigate to the visible contact form');
  // Test all remaining CTA selections, not only the two commercial offers.
  for(let i=2;i<6;i++){
   await page.locator(`[data-service-index="${i}"]`).click();await page.waitForTimeout(1500);
   await page.locator('.deck-card.is-current .deck-cta>a').click();
   await page.waitForFunction(()=>location.hash==='#contacto');
   assert.equal(await page.locator('#contact-form [name=service]').inputValue(),entryServices[i].service);
  }
  await page.locator('.deck-skip').click();await page.waitForFunction(()=>location.hash==='#alcance-propuestas');
  assert.ok((await page.locator('#alcance-title').boundingBox()).y>60);
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(400);
  assert.equal(await page.locator('[data-service-deck]').getAttribute('data-mode'),'static');
  assert.equal(await page.locator('[data-service-card][inert]').count(),0);
  assert.equal(await page.locator('[data-ribbon-toggle]').isVisible(),false);
  for(const card of await page.locator('[data-service-card]').all())assert.equal(await card.evaluate(e=>getComputedStyle(e).transform),'none');
  await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForTimeout(700);
  assert.equal(await page.locator('[data-service-deck]').getAttribute('data-mode'),'scroll');
  if(width<=800)await page.locator('.menu-toggle').click();await page.locator('#theme-toggle').click();if(width<=800)await page.keyboard.press('Escape');
  await frame(page,0);if([1440,390].includes(width))await page.screenshot({path:`qa/service-deck/dark-${width}.png`});
  results.push({width,height,sixPanels:true,forwardAndReverse:true,ribbonAtViewportBottom:true,keyboardNavigation:true,serviceSpecificCtas:true,reducedMotion:true,noClipping:true});console.log(`OK visual service deck ${width}x${height}`);await page.close();
 }
 for(const options of [{viewport:{width:390,height:400}},{viewport:{width:1024,height:600}},{viewport:{width:390,height:844},javaScriptEnabled:false}]){
  const page=await browser.newPage(options);await page.goto(base);
  assert.equal(await page.locator('[data-service-card]').count(),6);
  assert.equal(await page.locator('[data-service-card][inert]').count(),0);
  for(const card of await page.locator('[data-service-card]').all()){
   const r=await card.boundingBox(),copy=await card.locator('.deck-copy').boundingBox();assert.ok(copy.y+copy.height<=r.y+r.height+1);
  }
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.close();
 }
 assert.deepEqual(errors,[]);assert.deepEqual(consoleErrors,[]);assert.deepEqual(submissions,[]);
 await writeFile('qa/service-deck/results.json',JSON.stringify({results,shortWindowsAndNoJavaScript:true,errors,consoleErrors,submissions},null,2));
}finally{await browser.close();}
