import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {featuredOffers} from '../src/data/offers.js';
const base=process.env.BASE_URL||'http://127.0.0.1:4322';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Users/Nacho/AppData/Local/ms-playwright/chromium-1200/chrome-win64/chrome.exe'});
await mkdir('qa/offers',{recursive:true});
const errors=[],unexpectedConsole=[],submissions=[],results=[];
try{
 for(const [width,height] of [[1440,900],[1024,768],[768,900],[390,844],[375,667],[320,568]]){
  const page=await browser.newPage({viewport:{width,height}});
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',msg=>{if(msg.type()==='error')unexpectedConsole.push(msg.text());});
  page.on('request',r=>{if(r.method()==='POST')submissions.push(r.url());});
  // Missing production clips are expected, and are tested separately by the V5 suite.
  await page.route('**/videos/*.mp4',route=>route.abort('aborted'));
  await page.goto(base);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.journey a[href="#web-eco"]').count(),0);
  assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.locator('body').getByText(/VÍDEOS? PENDIENTES?|Consultar una pieza/).count(),0);
  const earlyActions=page.locator('.deck-cta>a');
  for(const [i,offer] of featuredOffers.entries()){
   // The opening now presents one full-width offer at a time. Both are
   // immediately selectable, without traversing the six-stage journey.
   await page.locator(`[data-service-index="${i}"]`).click();
   await page.waitForFunction(i=>document.querySelector('[data-service-deck]').dataset.activeService===String(i),i);
   await page.waitForTimeout(1250);
   const action=earlyActions.nth(i),bounds=await action.boundingBox();
   assert.ok(bounds.y>=85&&bounds.y+bounds.height<=height,`Early CTA must fit in first viewport at ${width}`);
   await action.click();
   await page.waitForFunction(()=>location.hash==='#contacto');
   assert.equal(await page.locator('#contact-form [name=service]').inputValue(),offer.contactService);
   assert.match(await page.locator('#contact-form [name=message]').inputValue(),i===0?/49 € \+ IVA/:/tarea con IA/);
   if(i===0){
    await page.locator('#contact-form [name=name]').fill('Prueba temprana');
    await page.locator('#contact-form [name=email]').fill('prueba@example.com');
    await page.locator('#contact-form [name=ageConfirmed]').check();
    const pending=page.waitForEvent('download');
    await page.locator('#contact-form button[type=submit]').click();
    const download=await pending;
    assert.match(await readFile(await download.path(),'utf8'),/Nombre: Prueba temprana/);
   }
  }
  await page.locator('[data-service-index="0"]').click();await page.waitForTimeout(1250);
  const notice=await page.locator('.entry-notice').boundingBox();
  assert.ok(notice.y+notice.height<=height,`Honest delivery notice must fit in first viewport at ${width}`);
  if([1440,390,320].includes(width))await page.screenshot({path:`qa/offers/hero-${width}.png`});
  await page.locator('.offer-fold>summary').first().click();
  await page.locator('#web-eco').evaluate(e=>scrollTo(0,e.getBoundingClientRect().top+scrollY-100));
  const order=await page.locator('.offers-grid article').evaluateAll(es=>es.map(e=>e.id));
  assert.deepEqual(order,['web-eco','ia-negocio']);
  await page.locator('.offer-includes summary').click();
  assert.equal(await page.locator('.offer-includes li:visible').count(),0);
  await page.locator('.offer-includes summary').click();
  assert.equal(await page.locator('.offer-includes li:visible').count(),4);
  assert.match(await page.locator('.offer-price').textContent(),/49 €/);
  assert.match(await page.locator('.offer-eco .offer-terms').textContent(),/Dominio, alojamiento y servicios externos aparte/);
  assert.match(await page.locator('.offer-ai .offer-terms').textContent(),/Tú revisas/);
  for(const [index,offer] of featuredOffers.entries()){
   if(await page.locator('.offer-fold').nth(index).getAttribute('open')===null)await page.locator('.offer-fold>summary').nth(index).click();
   const button=page.locator(`.offer .offer-action [data-contact-service="${offer.contactService}"]`);
   await button.click();
   await page.waitForFunction(()=>location.hash==='#contacto');
   assert.equal(await page.locator('#contact-form [name=service]').inputValue(),offer.contactService);
   await page.locator('#contact-form [name=name]').fill('Prueba propuesta');
   await page.locator('#contact-form [name=email]').fill('prueba@example.com');
   await page.locator('#contact-form [name=ageConfirmed]').check();
   if(index===1)await page.locator('#contact-form [name=marketingConsent]').check();
   await page.locator('#contact-form [name=message]').fill('Quiero definir el alcance y las condiciones de mi proyecto.');
   const pending=page.waitForEvent('download');await page.locator('#contact-form button[type=submit]').click();
   const download=await pending;const content=await readFile(await download.path(),'utf8');
   assert.ok(content.includes(offer.contactService));
   if(index===1)assert.match(content,/Noticias y promociones: Acepta recibirlas/);
   assert.match(await page.locator('#contact-form [role=status]').textContent(),/No se ha enviado/);
  }
  await page.locator('#propuestas').evaluate(e=>scrollTo(0,e.offsetTop-105));await page.waitForTimeout(200);
  if(width===1440||width===390)await page.locator('#propuestas').screenshot({path:`qa/offers/proposals-${width}.png`});
  for(const theme of ['light','dark']){
   if(theme==='dark'){
    if(width<=800)await page.locator('.menu-toggle').click();
    await page.locator('#theme-toggle').click();
    if(width<=800)await page.keyboard.press('Escape');
   }
   const clipped=await page.locator('.offer h3,.offer-price strong,.offer-action a,.offer-terms,.entry-offer h2,.deck-cta>a,.eco-site-button,.ai-demo-flow li').evaluateAll(es=>es.filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.className));
   assert.deepEqual(clipped,[],`Clipped content at ${width} ${theme}`);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   if(theme==='dark'&&(width===1440||width===390))await page.screenshot({path:`qa/offers/dark-${width}.png`});
  }
  await page.locator('#proyectos').scrollIntoViewIfNeeded();
  assert.equal(await page.locator('#proyectos [data-story-frame]').count(),6);
  assert.equal(await page.locator('.ai-demo-flow li').count(),4);
  // Visit the proposal photos before checking lazy loading; unopened gallery
  // images are intentionally deferred and are covered by the journey suite.
  for(const image of await page.locator('.offer-demo .eco-demo img').all()){
   await image.scrollIntoViewIfNeeded();
   await image.evaluate(e=>e.decode());
   assert.ok(await image.evaluate(e=>e.complete&&e.naturalWidth>0),'Demo photograph must load');
  }
  results.push({width,height,ecoInFirstViewport:true,iaDirectlySelectable:true,proposalOrder:['Web Eco','IA'],includes:4,ctasAndDownloads:true,noClipping:true});console.log(`OK offers ${width}×${height}`);await page.close();
 }
 const staticPage=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await staticPage.goto(base);
 assert.equal(await staticPage.locator('#propuestas').count(),1);assert.match(await staticPage.locator('#web-eco').textContent(),/49 €/);await staticPage.close();
 const consoleFailures=unexpectedConsole.filter(message=>!message.includes('net::ERR_ABORTED'));
 assert.deepEqual(errors,[]);assert.deepEqual(consoleFailures,[]);assert.deepEqual(submissions,[]);
 await writeFile('qa/offers/results.json',JSON.stringify({results,noJavaScriptContent:true,errors,consoleErrors:consoleFailures,submittedRequests:submissions},null,2));
 console.log('Offer checks passed; no outgoing submissions or JavaScript errors.');
}finally{await browser.close();}
