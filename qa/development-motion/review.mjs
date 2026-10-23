import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';

const browser=await chromium.launch({headless:true,executablePath:'C:/Users/Nacho/AppData/Local/ms-playwright/chromium-1200/chrome-win64/chrome.exe'});
const errors=[],results=[];
await mkdir('qa/development-motion',{recursive:true});
try {
 for(const [width,height] of [[1440,900],[390,844],[320,568]]) {
  const page=await browser.newPage({viewport:{width,height}});
  page.on('pageerror',error=>errors.push(error.message));
  await page.route('**/videos/*.mp4',route=>route.fulfill({status:404,body:''}));
  await page.goto('http://127.0.0.1:4322');
  await page.evaluate(()=>document.fonts.ready);
  async function go(local) {
   const progress=(2+local)/6;
   await page.evaluate(p=>{const root=document.querySelector('.journey');scrollTo(0,root.offsetTop+(root.offsetHeight-innerHeight)*p);},progress);
   await page.waitForFunction(p=>Math.abs(Number(document.querySelector('.journey').dataset.progress)-p)<.001,progress);
   await page.waitForTimeout(150);
   return page.evaluate(()=>({
    offset:Number(document.querySelector('[data-build-progress]').getAttribute('stroke-dashoffset')),
    checks:[...document.querySelectorAll('[data-build-check]')].map(e=>Number(e.getAttribute('opacity'))),
    camera:document.querySelector('[data-world-camera]').getAttribute('transform')
   }));
  }
  assert.equal(await page.locator('[data-world-signal]').count(),0);
  const states=[];
  for(const local of [.05,.36,.66,.96]) {
   states.push(await go(local));
   assert.equal(await page.locator('.journey').getAttribute('data-scene'),'2');
   if(width!==320)await page.screenshot({path:`qa/development-motion/development-${width}-${local}.png`});
  }
  assert.equal(states[0].checks.filter(v=>v>.99).length,0);
  assert.equal(states[1].checks.filter(v=>v>.99).length,1);
  assert.equal(states[2].checks.filter(v=>v>.99).length,2);
  assert.equal(states[3].checks.filter(v=>v>.99).length,3);
  assert.ok(states.every((s,i)=>!i||s.offset<states[i-1].offset));
  const reverse=await go(.36);
  assert.ok(Math.abs(reverse.offset-states[1].offset)<.002);
  await page.waitForTimeout(700);
  const atRest=await page.evaluate(()=>document.querySelector('[data-build-progress]').getAttribute('stroke-dashoffset'));
  assert.equal(Number(atRest),reverse.offset);
  for(const local of [-.4,1.3]) {
   const s=await go(local);
   assert.equal(s.offset,local<0?1:0);
  }
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.evaluate(()=>document.documentElement.dataset.theme='dark');
  await go(.66);
  if(width!==320)await page.screenshot({path:`qa/development-motion/development-dark-${width}.png`});
  results.push({width,height,checksInSequence:true,reversible:true,stationaryAtRest:true,noOverflow:true});
  await page.close();
 }
 const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await reduced.goto('http://127.0.0.1:4322');
 assert.equal(await reduced.locator('.journey-copy').count(),6);
 assert.ok(await reduced.locator('.journey-copy[data-scene="2"] .scene-static').isVisible());
 await reduced.close();
 assert.deepEqual(errors,[]);
 await writeFile('qa/development-motion/results.json',JSON.stringify({results,reducedMotion:true,errors},null,2));
 console.log(JSON.stringify({results,reducedMotion:true,errors}));
} finally {await browser.close();}
