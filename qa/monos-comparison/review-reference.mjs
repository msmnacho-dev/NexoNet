import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/Nacho/AppData/Local/ms-playwright/chromium-1200/chrome-win64/chrome.exe'});
await mkdir('qa/monos-comparison',{recursive:true});
const evidence=[];
try{
 for(const [width,height] of [[1440,900],[390,844]]) {
  const page=await browser.newPage({viewport:{width,height},ignoreHTTPSErrors:true});
  await page.goto('https://monos.pro/',{waitUntil:'domcontentloaded',timeout:45000});
  await page.waitForTimeout(1500);
  await page.screenshot({path:`qa/monos-comparison/reference-entry-${width}.png`});
  const sections=await page.locator('h1,h2,h3').evaluateAll(es=>es.map(e=>({text:e.textContent.trim().slice(0,120),top:Math.round(e.getBoundingClientRect().top+scrollY)})));
  evidence.push({width,height,sections});
  for(const fraction of [.25,.5,.75,1]){
   await page.evaluate(f=>scrollTo(0,(document.documentElement.scrollHeight-innerHeight)*f),fraction);
   await page.waitForTimeout(700);
   await page.screenshot({path:`qa/monos-comparison/reference-${width}-${fraction}.png`});
  }
  await page.close();
 }
 await writeFile('qa/monos-comparison/reference-layout.json',JSON.stringify(evidence,null,2));
 console.log('Reference captured on desktop and mobile. No forms submitted or assets reused.');
}finally{await browser.close();}
