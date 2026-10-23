import {chromium} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
await mkdir('qa/v5',{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Users/Nacho/AppData/Local/ms-playwright/chromium-1200/chrome-win64/chrome.exe',headless:true});
for(const width of [1440,768,390]){
 const page=await browser.newPage({viewport:{width,height:width===390?844:900}});
 page.on('pageerror',error=>console.log('PAGE ERROR',error.message));
 await page.goto('http://127.0.0.1:4322');await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(500);
 await page.screenshot({path:`qa/v5/idea-${width}.png`});
 await page.evaluate(()=>{const root=document.querySelector('.journey');scrollTo(0,root.offsetTop+(root.offsetHeight-innerHeight)*.59);});await page.waitForTimeout(700);
 await page.screenshot({path:`qa/v5/automation-${width}.png`});
 await page.locator('#manifiesto').scrollIntoViewIfNeeded();await page.screenshot({path:`qa/v5/editorial-${width}.png`,fullPage:true});
 console.log(width,await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,scene:document.querySelector('.journey').dataset.scene})));
 await page.close();
}
await browser.close();
