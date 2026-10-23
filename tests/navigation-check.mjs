import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.env.BASE_URL||'http://127.0.0.1:4322';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Users/Nacho/AppData/Local/ms-playwright/chromium-1200/chrome-win64/chrome.exe'});
const errors=[],consoleErrors=[],results=[];
await mkdir('qa/navigation',{recursive:true});
try {
 for(const [width,height,reducedMotion] of [[1440,900,'no-preference'],[1024,768,'no-preference'],[768,900,'no-preference'],[390,844,'no-preference'],[320,568,'no-preference'],[390,844,'reduce']]) {
  const page=await browser.newPage({viewport:{width,height},reducedMotion});
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text());});
  await page.goto(base);await page.evaluate(()=>document.fonts.ready);
  const header=page.locator('.site-header'),menu=page.locator('.menu-toggle'),nav=page.locator('#main-nav');
  async function flushHeader(){
   const r=await header.boundingBox();
   assert.equal(r.y,0);assert.equal(r.x,0);assert.ok(Math.abs(r.width-width)<1);
   assert.equal(await header.evaluate(e=>getComputedStyle(e).marginTop),'0px');
  }
  await flushHeader();
  if([1440,390,320].includes(width)&&reducedMotion!=='reduce')await page.screenshot({path:`qa/navigation/entry-${width}.png`});
  await page.evaluate(()=>scrollTo(0,600));await page.waitForTimeout(100);await flushHeader();
  if(width<=800){
   for(const key of ['Enter','Space']){
    await menu.focus();await page.keyboard.press(key);
    assert.equal(await menu.getAttribute('aria-expanded'),'true');
    assert.equal(await nav.locator('a').first().evaluate(e=>e===document.activeElement),true);
    await page.keyboard.press('Escape');
    assert.equal(await menu.getAttribute('aria-expanded'),'false');
    assert.equal(await menu.evaluate(e=>e===document.activeElement),true);
   }
  }
  for(const hash of ['#inicio','#proyectos','#proceso','#contacto']){
   if(width<=800){await menu.focus();await page.keyboard.press('Enter');}
   const link=nav.locator(`a[href="${hash}"]`);
   await link.focus();await page.keyboard.press('Enter');
   await page.waitForFunction(hash=>location.hash===hash&&document.querySelector(hash).contains(document.activeElement),hash);
   assert.equal(await menu.getAttribute('aria-expanded'),'false');
   const heading=page.locator(hash).locator('h1,h2').first();
   const r=await heading.boundingBox(),h=await header.boundingBox();
   assert.ok(r.y>=h.height+4,`Header covers ${hash} at ${width}: ${r.y}`);
   await flushHeader();
  }
  if(width<=800){
   await menu.click();await page.locator('#theme-toggle').click();await page.keyboard.press('Escape');
  }else await page.locator('#theme-toggle').click();
  assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
  await flushHeader();
  if(width<=800){
   const secondStep=page.locator('.deck-pager button:nth-child(2) .deck-page-number');
   assert.equal(await secondStep.evaluate(e=>getComputedStyle(e).display),'block');
   await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));await page.waitForTimeout(80);
   await menu.click();await page.evaluate(()=>scrollBy(0,-120));
   await page.waitForFunction(()=>document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='false');
   await menu.click();await nav.locator('a[href="#contacto"]').click();
  } else await page.locator('.nav-cta').click();
  await page.waitForFunction(()=>location.hash==='#contacto');
  assert.equal(await page.locator('#contact-form [name=ageConfirmed]').isVisible(),true);
  await page.locator('.footer-contact-link').click();
  await page.waitForFunction(()=>location.hash==='#contacto');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  results.push({width,height,reducedMotion,headerTop:0,keyboardMenu:true,sectionHeadingsUncovered:true,closingAndFooterCtas:true});
  console.log(`OK navigation ${width}x${height} ${reducedMotion}`);await page.close();
 }
 const short=await browser.newPage({viewport:{width:390,height:400}});
 await short.goto(base);await short.locator('.menu-toggle').click();
 await short.locator('#theme-toggle').focus();
 const button=await short.locator('#theme-toggle').boundingBox();
 assert.ok(button.y>=60&&button.y+button.height<=400);
 await short.keyboard.press('Escape');await short.close();
 const deep=await browser.newPage({viewport:{width:390,height:844}});
 await deep.goto(`${base}/#contacto`);await deep.evaluate(()=>document.fonts.ready);
 assert.ok((await deep.locator('#contacto h2').boundingBox()).y>=60);
 await deep.close();
 assert.deepEqual(errors,[]);assert.deepEqual(consoleErrors,[]);
 await writeFile('qa/navigation/results.json',JSON.stringify({results,shortMenuReachable:true,directHash:true,errors,consoleErrors},null,2));
}finally{await browser.close();}
