import {chromium} from '@playwright/test';
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/Nacho/AppData/Local/ms-playwright/chromium-1200/chrome-win64/chrome.exe'});
try{
 const page=await browser.newPage({viewport:{width:320,height:568}});
 const pending=new Set();
 page.on('request',r=>pending.add(r.url()));
 page.on('requestfinished',r=>pending.delete(r.url()));
 page.on('requestfailed',r=>{pending.delete(r.url());console.log('FAILED',r.url(),r.failure());});
 page.on('console',m=>{if(m.type()==='error')console.log('CONSOLE',m.text());});
 page.on('pageerror',e=>console.log('JS',e.message));
 await page.goto('http://127.0.0.1:4322',{waitUntil:'domcontentloaded'});
 await page.waitForLoadState('load',{timeout:15000}).catch(e=>console.log(e.message));
 console.log({pending:[...pending],title:await page.title(),media:await page.locator('.journey').getAttribute('data-media')});
 console.log(await page.locator('.entry-offer>a,.entry-notice').evaluateAll(es=>es.map(e=>({className:e.className,text:e.textContent,y:e.getBoundingClientRect().y,height:e.getBoundingClientRect().height,bottom:e.getBoundingClientRect().bottom}))));
 await page.screenshot({path:'qa/commercial-entry/entry-current-320.png'});
 await page.locator('.journey').evaluate(e=>scrollTo(0,e.offsetTop));
 await page.waitForTimeout(1000);
 console.log({pending:[...pending]});
}finally{await browser.close();}
