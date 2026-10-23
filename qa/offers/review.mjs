import {chromium} from '@playwright/test';
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/Nacho/AppData/Local/ms-playwright/chromium-1200/chrome-win64/chrome.exe'});
for(const width of [1440,390]){
 const page=await browser.newPage({viewport:{width,height:width===390?844:900}});
 await page.goto('http://127.0.0.1:4322');await page.evaluate(()=>document.fonts.ready);
 for(const id of ['manifiesto','proyectos','proceso','servicios','preguntas','contacto']){
  await page.locator(`#${id}`).evaluate((element,id)=>{
   const y=id==='proyectos'&&element.dataset.galleryMode==='horizontal'?Number(element.dataset.galleryStart)+1:element.getBoundingClientRect().top+scrollY-100;
   scrollTo(0,y);
  },id);
  await page.waitForTimeout(350);await page.screenshot({path:`qa/offers/review-${id}-${width}.png`});
 }
 await page.close();
}
await browser.close();
