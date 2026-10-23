import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const base=process.env.BASE_URL||'http://127.0.0.1:4322';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Users/Nacho/AppData/Local/ms-playwright/chromium-1200/chrome-win64/chrome.exe'});
const errors=[];
try {
  for(const [width,height] of [[1440,900],[390,844],[320,568]]) {
    const page=await browser.newPage({viewport:{width,height}});
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(base,{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>document.querySelectorAll('#proyectos [data-story-frame]').length===6);
    assert.equal(await page.locator('#proyectos [data-project-index]').count(),6);
    assert.equal(await page.locator('#proyectos [data-story-frame] img').count(),6);
    assert.match(await page.locator('.project-story-copy h2').innerText(),/Prepara tu negocio/);
    assert.equal(await page.locator('.project-story-copy a').getAttribute('href'),'#contacto');
    assert.equal(await page.locator('.site-footer .footer-contact-link').getAttribute('href'),'#contacto');
    assert.doesNotMatch(await page.locator('.footer-bottom').innerText(),/Prototipo|Beta|V5/);
    assert.equal(await page.locator('.site-header .brand-dot').count(),0);
    const renderedCopy=await page.locator('body').evaluate(body=>[
      body.innerText,
      ...[...document.querySelectorAll('[alt],[aria-label],[title]')].flatMap(node=>[node.getAttribute('alt'),node.getAttribute('aria-label'),node.getAttribute('title')])
    ].filter(Boolean).join(' '));
    assert.doesNotMatch(renderedCopy,/fictici|ilustrativ|conceptual|demostraci[oó]n|datos de ejemplo|ejemplo|simulad|no representa/i);
    assert.equal(await page.locator('#proyectos [data-story-frame]').first().getAttribute('data-concept-index'),'0');
    for(let index=0;index<6;index++) {
      await page.locator(`[data-project-index="${index}"]`).click();
      await page.waitForFunction(index=>document.querySelector('#proyectos [data-project-index][aria-current="true"]')?.dataset.projectIndex===String(index),index);
      assert.match(await page.locator('[data-story-caption]').innerText(),new RegExp(`0${index+1}`));
      assert.equal(await page.locator(`[data-project-index="${index}"]`).getAttribute('aria-current'),'true');
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Unexpected horizontal overflow');
    }
    if(width===390) await page.screenshot({path:'qa/project-scroll-mobile.png',fullPage:false});
    if(width===1440) await page.screenshot({path:'qa/project-scroll-desktop.png',fullPage:false});
    const footer=await page.locator('.site-footer').boundingBox();
    assert.ok(footer.width<=width+1,'Footer must fit viewport');
    await page.close();
    console.log(`OK project story ${width}x${height}`);
  }
  const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  reduced.on('pageerror',error=>errors.push(error.message));
  await reduced.goto(base,{waitUntil:'domcontentloaded'});
  await reduced.waitForFunction(()=>document.querySelector('#proyectos')?.classList.contains('is-story-static'));
  assert.equal(await reduced.locator('#proyectos [data-story-frame]').count(),6);
  assert.equal(await reduced.locator('#proyectos [data-story-frame]:visible').count(),6);
  assert.ok(await reduced.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await reduced.close();
  assert.deepEqual(errors,[],'Browser JavaScript errors');
  console.log('OK reduced motion and no browser errors');
} finally { await browser.close(); }
