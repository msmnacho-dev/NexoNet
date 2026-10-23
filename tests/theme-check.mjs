import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Users/Nacho/AppData/Local/ms-playwright/chromium-1200/chrome-win64/chrome.exe'});
const base=process.env.BASE_URL||'http://127.0.0.1:4322';
await mkdir('qa/themes',{recursive:true});
const results=[],errors=[];
function luminance(color){return color.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);}
function contrast(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
try{
 for(const width of [1440,1024,768,601,390,320]){
  const page=await browser.newPage({viewport:{width,height:width<=390?844:900}});
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
  const button=page.locator('#theme-toggle');
  assert.equal(await button.locator('[data-theme-label]').textContent(),'Modo Claro');
  if(width<=800){
   assert.equal(await button.evaluate(e=>e.parentElement.id),'main-nav');
   assert.equal(await button.isVisible(),false);
   await page.locator('.menu-toggle').click();
  }
  assert.equal(await button.locator('.theme-sun').isVisible(),true);
  await button.click();
  assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
  assert.equal(await button.getAttribute('aria-label'),'Modo Oscuro. Cambiar a modo claro');
  assert.equal(await button.locator('[data-theme-label]').textContent(),'Modo Oscuro');
  assert.equal(await button.locator('.theme-moon').isVisible(),true);
  const boxes=await page.locator('.site-header .wordmark,.theme-toggle,.menu-toggle,.site-header nav > a,.site-header .nav-cta').evaluateAll(es=>es.filter(e=>e.getBoundingClientRect().width&&getComputedStyle(e).display!=='none').map(e=>({type:e.className,...Object.fromEntries(['left','right','top','bottom'].map(k=>[k,e.getBoundingClientRect()[k]]))})));
  boxes.forEach(box=>assert.ok(box.left>=0&&box.right<=width,`Header out of bounds: ${width} ${box.type}`));
  for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){
   const a=boxes[i],b=boxes[j];assert.ok(!(a.left<b.right-1&&a.right>b.left+1&&a.top<b.bottom-1&&a.bottom>b.top+1),`Header overlap ${width}: ${a.type} / ${b.type}`);
  }
  const colors=await page.evaluate(()=>({bg:getComputedStyle(document.documentElement).backgroundColor,text:getComputedStyle(document.querySelector('.journey-copy h2')).color,secondary:getComputedStyle(document.querySelector('.journey-copy p')).color,header:getComputedStyle(document.querySelector('.site-header')).backgroundColor,icon:getComputedStyle(document.querySelector('#theme-toggle')).color}));
  assert.ok(contrast(colors.text,colors.bg)>=4.5);assert.ok(contrast(colors.secondary,colors.bg)>=4.5);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  if(width===1440||width===390)await page.screenshot({path:`qa/themes/dark-${width}.png`});
  await page.reload();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
  if(width===390){
   await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
   await page.screenshot({path:'qa/themes/dark-mobile-menu.png'});await page.keyboard.press('Escape');
  }
  await page.locator('.nav-cta').click();await page.waitForFunction(()=>location.hash==='#contacto');
  assert.equal(await page.locator('#contact-form').isVisible(),true);
  if(width===390)await page.screenshot({path:'qa/themes/dark-mobile-form.png'});
  if(width<=800)await page.locator('.menu-toggle').click();
  await button.focus();await page.keyboard.press('Enter');assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
  assert.equal(await button.locator('[data-theme-label]').textContent(),'Modo Claro');
  await page.reload();assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
  results.push({width,persistence:true,keyboard:true,headerOverlap:false,contrast:{title:+contrast(colors.text,colors.bg).toFixed(2),paragraph:+contrast(colors.secondary,colors.bg).toFixed(2)}});
  await page.close();
 }
 const restricted=await browser.newPage({viewport:{width:390,height:844}});
 restricted.on('pageerror',e=>errors.push(e.message));
 await restricted.addInitScript(()=>{Storage.prototype.getItem=()=>{throw new Error('Storage unavailable');};Storage.prototype.setItem=()=>{throw new Error('Storage unavailable');};});
 await restricted.goto(base);await restricted.locator('.menu-toggle').click();await restricted.locator('#theme-toggle').click();assert.equal(await restricted.locator('html').getAttribute('data-theme'),'dark');await restricted.close();
 assert.deepEqual(errors,[]);
 await writeFile('qa/themes/results.json',JSON.stringify({results,restrictedStorage:true,errors},null,2));
 console.log(JSON.stringify({results,restrictedStorage:true,errors},null,2));
}finally{await browser.close();}
