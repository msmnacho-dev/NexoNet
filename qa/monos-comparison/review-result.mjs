import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {writeFile,readFile} from 'node:fs/promises';
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/Nacho/AppData/Local/ms-playwright/chromium-1200/chrome-win64/chrome.exe'});
const errors=[],consoleErrors=[],results=[];
try{
 for(const [width,height] of [[1440,900],[390,844],[320,568]]){
  const page=await browser.newPage({viewport:{width,height}});
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text());});
  await page.goto('http://127.0.0.1:4322');await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:`qa/monos-comparison/nexonet-entry-${width}.png`});
  for(const [selector,hash] of [['.proof-web','#proyectos'],['.proof-ai','#ia-negocio']]){
   await page.locator(selector).click();
   await page.waitForFunction(hash=>location.hash===hash&&document.querySelector(hash).contains(document.activeElement),hash);
   assert.ok((await page.locator(hash).locator('h2,h3').first().boundingBox()).y>=60);
  }
  for(const [i,service] of ['Web o aplicación','Diseño e imagen'].entries()){
   await page.locator('.service-card>.text-link').nth(i).click();
   assert.equal(await page.locator('#contact-form [name=service]').inputValue(),service);
   assert.equal(await page.locator('#contact-form [name=name]').getAttribute('required'),null);
   assert.equal(await page.locator('#contact-form [name=email]').getAttribute('required'),null);
   await page.locator('#contact-form [name=message]').fill('Quiero presentar mi negocio y definir qué necesita el proyecto.');
   const pending=page.waitForEvent('download');await page.locator('#contact-form button[type=submit]').click();
   const file=await pending,brief=await readFile(await file.path(),'utf8');
   assert.ok(brief.includes(service));assert.match(brief,/Nombre: Sin indicar/);
   if(i===0&&width!==320)await page.locator('#contact-dialog').screenshot({path:`qa/monos-comparison/nexonet-brief-${width}.png`});
   await page.keyboard.press('Escape');
  }
  assert.equal(await page.locator('.process-steps>li').count(),4);
  assert.equal(await page.locator('.process-output').count(),4);
  for(const section of ['manifiesto','proceso','servicios']){
   await page.locator(`#${section}`).evaluate(e=>scrollTo(0,e.getBoundingClientRect().top+scrollY-84));
   await page.waitForTimeout(100);
   if(width!==320)await page.locator(`#${section}`).screenshot({path:`qa/monos-comparison/nexonet-${section}-${width}.png`});
  }
  const clipped=await page.locator('.entry-proof a,.entry-intro h1,.process-steps h3,.process-output,.service-card>.text-link').evaluateAll(es=>es.filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.className));
  assert.deepEqual(clipped,[],`New content clipped at ${width}`);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  if(width<=800)await page.locator('.menu-toggle').click();
  await page.locator('#theme-toggle').click();if(width<=800)await page.keyboard.press('Escape');
  assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
  await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(100);
  if(width!==320)await page.screenshot({path:`qa/monos-comparison/nexonet-dark-${width}.png`});
  results.push({width,height,proofLinks:true,contextualServiceCtas:true,downloadWithoutPersonalData:true,processOutputs:4,noClipping:true});
  console.log(`OK refinement ${width}x${height}`);await page.close();
 }
 assert.deepEqual(errors,[]);assert.deepEqual(consoleErrors,[]);
 await writeFile('qa/monos-comparison/results.json',JSON.stringify({results,errors,consoleErrors},null,2));
}finally{await browser.close();}
