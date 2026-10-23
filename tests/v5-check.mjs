import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
const base=process.env.BASE_URL||'http://127.0.0.1:4322';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Users/Nacho/AppData/Local/ms-playwright/chromium-1200/chrome-win64/chrome.exe'});
const results=[];
await mkdir('qa/v5',{recursive:true});
async function go(page,progress){
 await page.evaluate(p=>{const root=document.querySelector('.journey');scrollTo(0,root.offsetTop+(root.offsetHeight-innerHeight)*p);},progress);
 await page.waitForFunction(p=>Math.abs(Number(document.querySelector('.journey').dataset.progress)-p)<.005,progress);
 await page.waitForTimeout(240);
}
async function overflow(page){assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Horizontal page overflow');}
const errors=[];
try{
 for(const [width,height] of (process.env.MEDIA_ONLY?[]:[[1440,900],[1024,768],[768,900],[390,844],[375,667],[320,568]])){
  const page=await browser.newPage({viewport:{width,height}});
  page.on('pageerror',e=>errors.push(e.message));
  const requested=[];
  await page.route('**/videos/*.mp4',route=>{requested.push(route.request().url());return route.fulfill({status:404,body:''});});
  await page.goto(base);await page.evaluate(()=>document.fonts.ready);
  await page.waitForFunction(()=>document.querySelector('.journey').dataset.media==='placeholder');
  assert.ok(requested.length<=1,'All clips must not be requested at the start');
  for(let i=0;i<6;i++){
   await go(page,(i+.24)/6);
   assert.equal(await page.locator('.journey').getAttribute('data-scene'),String(i));
   assert.equal(await page.locator(`[data-stop="${i}"]`).getAttribute('aria-current'),'step');
   const copy=page.locator(`.journey-copy[data-scene="${i}"]`);
   assert.equal(await copy.getAttribute('aria-hidden'),'false');
   const rect=await copy.locator('h1,h2').boundingBox();
   const header=await page.locator('.site-header').boundingBox();
   const nav=await page.locator('.journey-navigation').boundingBox();
   const last=await copy.locator('.scene-deliverable').boundingBox();
   assert.ok(rect.y>=header.y+header.height+8,`Headline overlaps header at ${width}`);
   assert.ok(last.y+last.height<nav.y-20,`Copy overlaps navigation at ${width}, stage ${i}`);
   assert.ok(rect.x+rect.width<=width,`Headline box overflows at ${width}`);
   const clipped=await copy.locator('h1,h2').evaluate(e=>e.scrollWidth>e.clientWidth+1);
   assert.ok(!clipped,`Headline text overflows at ${width}, stage ${i}`);
   await overflow(page);
   if([1440,390].includes(width))await page.screenshot({path:`qa/v5/stage-${i+1}-${width}.png`});
  }
  await go(page,.23);
  const forward=await page.locator('[data-world-camera]').getAttribute('data-pose');
  await go(page,.77);
  const later=await page.locator('[data-world-camera]').getAttribute('data-pose');
  assert.notEqual(forward,later);
  await go(page,.23);
  assert.equal(await page.locator('[data-world-camera]').getAttribute('data-pose'),forward,'Fallback camera must reverse with scroll');
  await page.locator('[data-stop="5"]').click();
  await page.waitForFunction(()=>document.querySelector('.journey').dataset.scene==='5');
  await page.waitForTimeout(1000);
  assert.equal(await page.locator('.journey-copy[data-scene="5"] h2').evaluate(e=>e===document.activeElement),true);
  await page.locator('[data-stop="0"]').focus();await page.keyboard.press('ArrowRight');
  await page.waitForFunction(()=>document.querySelector('.journey').dataset.scene==='1');
  await page.waitForTimeout(1000);
  await page.locator('#proyectos').scrollIntoViewIfNeeded();
  await page.locator('[data-project-index="2"]').click();
  await page.waitForFunction(()=>document.querySelector('#proyectos').dataset.activeProject==='2');
  assert.equal(await page.locator('[data-project-index="2"]').getAttribute('aria-current'),'true');
  await page.locator('[data-project-index="0"]').click();
  await page.waitForFunction(()=>document.querySelector('#proyectos').dataset.activeProject==='0');
  await page.waitForTimeout(900);
  await page.locator('#proyectos [data-open-demo]').click();
  await page.locator('#web-demo-form input').fill('demo@example.com');
  await page.locator('#web-demo-form textarea').fill('Una consulta de demostración.');
  await page.locator('#web-demo-form button').click();
  assert.match(await page.locator('#web-demo-form [role=status]').textContent(),/Consulta de ejemplo registrada/);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.project-lab').count(),0);
  assert.equal(await page.locator('#demo,#comparison,#replay-demo,[data-crm-step]').count(),0);
  await page.locator('.nav-cta').click();
  await page.waitForFunction(()=>location.hash==='#contacto');
  await page.locator('#contact-form [name=name]').fill('Prueba V5');
  await page.locator('#contact-form [name=email]').fill('prueba@example.com');
  await page.locator('#contact-form [name=service]').selectOption({label:'Diseño e imagen'});
  await page.locator('#contact-form [name=message]').fill('Una web con diseño y seguimiento de consultas.');
  await page.locator('#contact-form [name=ageConfirmed]').check();
  const downloadPromise=page.waitForEvent('download');
  await page.locator('#contact-form button[type=submit]').click();
  const download=await downloadPromise;
  const content=await readFile(await download.path(),'utf8');
  assert.match(content,/Prueba V5/);assert.match(content,/Una web con diseño/);
  assert.match(await page.locator('#contact-form [role=status]').textContent(),/No se ha enviado/);
  if(width<601){
   await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
   await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
  }
  await overflow(page);
  results.push({viewport:`${width}×${height}`,sixStages:true,reverseCamera:true,navigation:true,localDemos:true,download:true,overflow:0});
  console.log(`OK ${width}×${height}`);
  await page.close();
 }
 // Reduced motion: no media request, all six stages remain semantic and readable.
 if(!process.env.MEDIA_ONLY){
 const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 const reducedRequests=[];reduced.on('request',r=>{if(r.url().endsWith('.mp4'))reducedRequests.push(r.url());});
 reduced.on('pageerror',e=>errors.push(e.message));
 await reduced.goto(base);await reduced.evaluate(()=>document.fonts.ready);
 assert.equal(reducedRequests.length,0);
 assert.equal(await reduced.locator('.journey-copy:visible').count(),6);
 assert.equal(await reduced.locator('.journey-copy[inert]').count(),0);
 await reduced.screenshot({path:'qa/v5/reduced-motion.png',fullPage:true});await overflow(reduced);
 await reduced.emulateMedia({reducedMotion:'no-preference'});
 await reduced.waitForFunction(()=>document.querySelector('.journey').dataset.progress!==undefined);
 await reduced.emulateMedia({reducedMotion:'reduce'});
 await reduced.waitForFunction(()=>document.documentElement.classList.contains('reduced-motion')&&!document.querySelector('.journey-copy[inert]'));
 assert.equal(await reduced.locator('.journey-copy[inert]').count(),0);
 results.push({reducedMotion:true,loadedVideos:0,readableStages:6,livePreferenceChange:true});await reduced.close();
 const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
 await nojs.goto(base);assert.equal(await nojs.locator('.journey-copy:visible').count(),6);await overflow(nojs);await nojs.close();
 results.push({noJavaScript:true,prerenderedStages:6});
 }
 // Real H.264 decoder/seek validation. This synthetic MP4 is QA only, never deployed.
 const fixturePage=await browser.newPage();
 await fixturePage.goto(base);
 const fixture=await fixturePage.evaluate(async()=>{
  const canvas=document.createElement('canvas');canvas.width=320;canvas.height=180;
  const ctx=canvas.getContext('2d'),stream=canvas.captureStream(15);
  const recorder=new MediaRecorder(stream,{mimeType:'video/mp4;codecs=avc1.42001E',videoBitsPerSecond:160000});
  const chunks=[];recorder.ondataavailable=e=>chunks.push(e.data);
  const done=new Promise(resolve=>recorder.onstop=resolve);recorder.start();
  const start=performance.now();
  await new Promise(resolve=>{const draw=()=>{const elapsed=performance.now()-start;ctx.fillStyle='#eef4df';ctx.fillRect(0,0,320,180);ctx.fillStyle='#41651b';ctx.fillRect(elapsed/2500*270,55,50,70);if(elapsed<2500)requestAnimationFrame(draw);else resolve();};draw();});
  recorder.stop();await done;stream.getTracks().forEach(t=>t.stop());
  const data=new Uint8Array(await new Blob(chunks,{type:'video/mp4'}).arrayBuffer());
  return btoa(String.fromCharCode(...data));
 });
 await fixturePage.close();
 const fixtureBytes=Buffer.from(fixture,'base64');await writeFile('qa/v5/seek-fixture.mp4',fixtureBytes);
 const mediaPage=await browser.newPage({viewport:{width:1440,height:900}});const mediaRequests=[];
 await mediaPage.route('**/videos/available.json',route=>route.fulfill({json:['idea','diseno','desarrollo','automatizacion','resultado','evolucion'].map((id,i)=>`/videos/nexonet-0${i+1}-${id}.mp4`)}));
 mediaPage.on('pageerror',e=>errors.push(e.message));
 await mediaPage.route('**/videos/*.mp4',route=>{
  mediaRequests.push(route.request().url());
  const range=route.request().headers().range;
  const start=Number(range?.match(/bytes=(\d+)/)?.[1]||0);
  const end=Math.min(fixtureBytes.length-1,Number(range?.match(/bytes=\d+-(\d+)/)?.[1]||fixtureBytes.length-1));
  return route.fulfill({status:range?206:200,contentType:'video/mp4',headers:{'Accept-Ranges':'bytes',...(range?{'Content-Range':`bytes ${start}-${end}/${fixtureBytes.length}`}:{})},body:fixtureBytes.subarray(start,end+1)});
 });
 await mediaPage.goto(base);await go(mediaPage,0);await mediaPage.waitForFunction(()=>document.querySelector('[data-clip="0"]').readyState>=2);
 assert.ok(new Set(mediaRequests).size<=1,'Initial lazy load');
 for(const local of [.25,.8,.15,.92,.05]){
  await go(mediaPage,local/6);
  await mediaPage.waitForFunction(local=>{const v=document.querySelector('[data-clip="0"]');return !v.seeking&&Math.abs(v.currentTime/v.duration-local)<.045;},local);
 }
 // Jump across stages, then reverse, checking the actual video clock each time.
 for(const [index,local] of [[1,.33],[3,.62],[5,.4],[4,.7],[2,.2],[0,.6]]){
  await go(mediaPage,(index+local)/6);
  await mediaPage.waitForFunction(({index,local})=>{const v=document.querySelector(`[data-clip="${index}"]`);return v.readyState>=2&&!v.seeking&&Math.abs(v.currentTime/v.duration-local)<.045;},{index,local});
 }
 assert.equal(await mediaPage.locator('.journey').getAttribute('data-media'),'video');
 await mediaPage.screenshot({path:'qa/v5/synthetic-video-test.png'});
 results.push({syntheticMedia:true,forwardAndReverseSeek:true,allSixSlots:true,fixture:'QA only; not deployed'});await mediaPage.close();
 assert.deepEqual(errors,[],'Browser JavaScript errors');
 await writeFile('qa/v5/results.json',JSON.stringify({results,errors},null,2));
 console.log(JSON.stringify({results,errors},null,2));
}finally{await browser.close();}
