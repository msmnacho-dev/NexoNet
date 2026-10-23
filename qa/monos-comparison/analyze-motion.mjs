import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/Nacho/AppData/Local/ms-playwright/chromium-1200/chrome-win64/chrome.exe'});
await mkdir('qa/monos-motion',{recursive:true});
const evidence=[];
try{
 for(const [width,height] of [[1440,900],[390,844]]){
  const page=await browser.newPage({viewport:{width,height},ignoreHTTPSErrors:true});
  await page.goto('https://monos.pro/',{waitUntil:'domcontentloaded',timeout:45000});
  const reject=page.getByRole('button',{name:'Rechazar',exact:true});
  if(await reject.count())await reject.first().click().catch(()=>{});
  await page.waitForTimeout(900);
  async function inspect(label){
   const state=await page.evaluate(()=>({
    scrollY,
    animations:document.getAnimations().map(a=>({name:a.animationName||a.constructor.name,state:a.playState,timing:a.effect?.getTiming(),element:a.effect?.target?.className})).slice(0,20),
    transformed:[...document.querySelectorAll('main *,header *,img,.elementor-widget-heading,.elementor-widget-image')].filter(e=>{const r=e.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight&&getComputedStyle(e).transform!=='none';}).slice(0,45).map(e=>({tag:e.tagName,class:String(e.className).slice(0,150),text:(e.alt||e.textContent.trim()).slice(0,55),transform:getComputedStyle(e).transform,opacity:getComputedStyle(e).opacity})),
    headings:[...document.querySelectorAll('h1,h2,h3')].map(e=>({text:e.textContent.trim().slice(0,70),y:e.getBoundingClientRect().top+scrollY})),
   }));
   evidence.push({width,label,...state});
   await page.screenshot({path:`qa/monos-motion/reference-${width}-${label}.png`});
  }
  await inspect('entry');
  for(const [label,x,y] of [['pointer-left',width*.2,height*.45],['pointer-right',width*.8,height*.6]]){
   await page.mouse.move(x,y,{steps:12});await page.waitForTimeout(500);await inspect(label);
  }
  for(const [label,top] of [['intro',height*.85],['services',height*2],['work',height*3.7],['process',height*5.8]]){
   await page.evaluate(y=>scrollTo(0,y),top);await page.waitForTimeout(700);await inspect(label);
  }
  await page.close();
 }
 await writeFile('qa/monos-motion/reference-motion.json',JSON.stringify(evidence,null,2));
 console.log(evidence.map(e=>({width:e.width,label:e.label,animations:e.animations.map(a=>({name:a.name,timing:a.timing})),transformed:e.transformed.slice(0,8)})));
}finally{await browser.close();}
