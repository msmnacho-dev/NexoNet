import {chromium} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/Nacho/AppData/Local/ms-playwright/chromium-1200/chrome-win64/chrome.exe'});
await mkdir('qa/commercial-entry',{recursive:true});
for(const [width,height] of [[1440,900],[1024,768],[768,900],[390,844],[375,667],[320,568]]){
 const page=await browser.newPage({viewport:{width,height}});
 await page.goto('http://127.0.0.1:4322');await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:`qa/commercial-entry/entry-${width}.png`});
 const buttons=await page.locator('.entry-offer>a').evaluateAll(es=>es.map(e=>({text:e.textContent,bottom:e.getBoundingClientRect().bottom})));
 console.log({width,height,buttons,overflow:await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)});
 await page.locator('#propuestas').evaluate(e=>scrollTo(0,e.offsetTop-105));await page.waitForTimeout(200);
 if([1440,390,320].includes(width))await page.screenshot({path:`qa/commercial-entry/offers-${width}.png`,fullPage:true});
 await page.locator('#proyectos').evaluate(e=>scrollTo(0,e.offsetTop-105));await page.waitForTimeout(800);
 if([1440,390,320].includes(width))await page.screenshot({path:`qa/commercial-entry/projects-${width}.png`});
 await page.close();
}
await browser.close();
