import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/Nacho/AppData/Local/ms-playwright/chromium-1200/chrome-win64/chrome.exe'});
await mkdir('qa/landing-wall',{recursive:true});
const evidence=[];
try{
 for(const [width,height] of [[1440,900],[390,844]]){
  const page=await browser.newPage({viewport:{width,height},ignoreHTTPSErrors:true});
  await page.goto('https://monos.pro/',{waitUntil:'domcontentloaded',timeout:45000});
  const reject=page.getByRole('button',{name:'Rechazar',exact:true});if(await reject.count())await reject.first().click().catch(()=>{});
  await page.waitForTimeout(1200);
  const structure=await page.evaluate(()=>({
   headings:[...document.querySelectorAll('h1,h2,h3')].slice(0,20).map(e=>({text:e.textContent.trim().slice(0,65),top:e.getBoundingClientRect().top+scrollY})),
   images:[...document.querySelectorAll('img')].filter(e=>e.getBoundingClientRect().width>150).slice(0,35).map(e=>({alt:e.alt,src:e.currentSrc,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height,top:e.getBoundingClientRect().top+scrollY,ancestors:[e.parentElement,e.parentElement.parentElement,e.parentElement.parentElement.parentElement].map(p=>({tag:p.tagName,class:p.className,settings:p.getAttribute('data-settings')}))})),
  }));
  evidence.push({width,structure});
  for(const top of [0,450,900,1350,1800,2300]){
   await page.evaluate(y=>scrollTo(0,y),top);await page.waitForTimeout(650);
   evidence.push({width,scrollY:await page.evaluate(()=>scrollY),transforms:await page.evaluate(()=>[...document.querySelectorAll('main *, .elementor-element')].filter(e=>{const r=e.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight&&getComputedStyle(e).transform!=='none';}).slice(0,50).map(e=>({class:String(e.className).slice(0,100),transform:getComputedStyle(e).transform,position:getComputedStyle(e).position,text:(e.alt||'').slice(0,40)})))});
   await page.screenshot({path:`qa/landing-wall/monos-${width}-${top}.png`});
  }
  await page.close();
 }
 await writeFile('qa/landing-wall/reference.json',JSON.stringify(evidence,null,2));
 console.log(evidence.filter(e=>e.structure).map(e=>({width:e.width,...e.structure})));
}finally{await browser.close();}
