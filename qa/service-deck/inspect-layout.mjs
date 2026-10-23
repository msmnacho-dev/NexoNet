import {chromium} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/Nacho/AppData/Local/ms-playwright/chromium-1200/chrome-win64/chrome.exe'});
const results=[];
try{
 for(const [width,height] of [[320,568],[390,844],[1440,900]]){
  const page=await browser.newPage({viewport:{width,height}});await page.goto('http://127.0.0.1:4322');await page.evaluate(()=>document.fonts.ready);
  await page.evaluate(()=>{const e=document.querySelector('[data-service-deck]');scrollTo(0,Number(e.dataset.scrollStart)+(Number(e.dataset.scrollEnd)-Number(e.dataset.scrollStart))/5);});await page.waitForTimeout(1000);
  results.push({width,height,boxes:await page.locator('.deck-ai').evaluate(card=>Object.fromEntries(['.deck-copy','.deck-art-wrap','.deck-art','.deck-art-label','.deck-ai-compact','.deck-ai-query','.deck-ai-draft'].map(selector=>{const e=card.querySelector(selector),r=e.getBoundingClientRect(),s=getComputedStyle(e);return[selector,{y:r.y,bottom:r.bottom,height:r.height,display:s.display,minHeight:s.minHeight,flex:s.flex,padding:s.padding}];})))});
  if(width===320){
   const compact=await page.locator('.deck-ai-compact').boundingBox(),label=await page.locator('.deck-ai .deck-art-label').boundingBox();
   for(const item of await page.locator('.deck-ai-compact>span').all()){
    const r=await item.boundingBox();assert.ok(r.y+r.height<=compact.y+compact.height+1);assert.ok(r.y+r.height<label.y);
    assert.ok(await item.evaluate(e=>e.scrollHeight<=e.clientHeight+1));
   }
   await page.screenshot({path:'qa/service-deck/service-2-320.png'});
  }
  if(width===1440){
   await page.screenshot({path:'qa/service-deck/service-2-1440.png'});
   await page.setViewportSize({width:390,height:844});await page.waitForTimeout(500);
   assert.equal(await page.locator('[data-service-deck]').getAttribute('data-mode'),'scroll');
   await page.setViewportSize({width:390,height:400});await page.waitForTimeout(500);
   assert.equal(await page.locator('[data-service-deck]').getAttribute('data-mode'),'static');assert.equal(await page.locator('[data-service-card][inert]').count(),0);
   await page.setViewportSize({width:1440,height:900});await page.waitForTimeout(500);
   assert.equal(await page.locator('[data-service-deck]').getAttribute('data-mode'),'scroll');assert.equal(await page.locator('[data-service-card]').count(),6);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   results.push({liveResize:true,mobileAndShortWindowFallback:true,sixUniquePanels:true});
  }
  await page.close();
 }
 await writeFile('qa/service-deck/layout.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
}finally{await browser.close();}
