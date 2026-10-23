import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

// Native sticky layout, driven by the existing page scroll / Lenis instance.
export function createServiceDeck(lenis=null,reduced=false){
 const root=document.querySelector('[data-service-deck]');
 const runway=document.querySelector('.entry-runway');
 const scene=runway.querySelector('.entry-scene');
 const cards=[...root.querySelectorAll('[data-service-card]')];
 const buttons=[...root.querySelectorAll('[data-service-index]')];
 const media=gsap.matchMedia();
 media.add({desktop:'(min-width:601px) and (min-height:700px)',mobile:'(max-width:600px) and (min-height:540px)',all:'(min-width:0px)'},context=>{
  const pinned=!reduced&&(context.conditions.desktop||context.conditions.mobile);
  root.dataset.mode=pinned?'scroll':'static';
  runway.classList.toggle('is-service-scroll',pinned);
  let timeline,trigger;
  const select=index=>{
   const previous=cards.find(card=>card.classList.contains('is-current'));
   // Keep keyboard focus usable if a wheel gesture changes the active panel.
   const restore=previous&&previous!==cards[index]&&previous.contains(document.activeElement);
   root.dataset.activeService=String(index);
   cards.forEach((card,i)=>{
    card.classList.toggle('is-current',i===index);
    card.inert=pinned&&i!==index;
    if(pinned&&i!==index)card.setAttribute('aria-hidden','true');
    else card.removeAttribute('aria-hidden');
   });
   buttons.forEach((button,i)=>i===index?button.setAttribute('aria-current','true'):button.removeAttribute('aria-current'));
   if(restore)buttons[index].focus({preventScroll:true});
  };
  select(0);
  const travel=()=>Math.round(innerHeight*.7)*(cards.length-1);
  const measure=()=>{runway.style.height=`${scene.offsetHeight+travel()}px`;};
  if(pinned){
   measure();
   gsap.set(cards.slice(1),{yPercent:110,rotation:3,scale:1.01});
   timeline=gsap.timeline({paused:true});
   cards.slice(1).forEach((card,i)=>{
    timeline.to(cards[i],{scale:.95,yPercent:-7,opacity:.3,ease:'none',duration:.65},i+.35)
     .to(card,{yPercent:0,rotation:0,scale:1,ease:'power2.inOut',duration:.65},i+.35);
   });
   trigger=ScrollTrigger.create({trigger:runway,start:()=>`top ${parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height'))}px`,end:()=>`+=${travel()}`,animation:timeline,scrub:.35,invalidateOnRefresh:true,onRefreshInit:measure,
    onRefresh:self=>{root.dataset.scrollStart=String(self.start);root.dataset.scrollEnd=String(self.end);},
    onUpdate:self=>{root.style.setProperty('--deck-progress',self.progress);select(Math.min(cards.length-1,Math.floor(self.progress*(cards.length-1)+.325)));},
   });
  }
  const go=index=>{
   const destination=pinned?trigger.start+(trigger.end-trigger.start)*index/(cards.length-1):cards[index].getBoundingClientRect().top+scrollY-sceneHeader()-12;
   if(lenis)lenis.scrollTo(destination,{duration:.85,onComplete:()=>select(index)});
   else {window.scrollTo({top:destination,behavior:'instant'});select(index);}
  };
  function sceneHeader(){return document.querySelector('.site-header').offsetHeight;}
  const disposers=[];
  buttons.forEach((button,i)=>{
   const click=()=>go(i);
   const key=event=>{
    let index;
    if(event.key==='ArrowRight')index=(i+1)%cards.length;
    if(event.key==='ArrowLeft')index=(i+cards.length-1)%cards.length;
    if(event.key==='Home')index=0;
    if(event.key==='End')index=cards.length-1;
    if(index!==undefined){event.preventDefault();buttons[index].focus({preventScroll:true});go(index);}
   };
   button.addEventListener('click',click);button.addEventListener('keydown',key);
   disposers.push(()=>{button.removeEventListener('click',click);button.removeEventListener('keydown',key);});
  });
  return ()=>{
   disposers.forEach(dispose=>dispose());trigger?.kill();timeline?.kill();
   gsap.set(cards,{clearProps:'transform,opacity'});
   cards.forEach(card=>{card.inert=false;card.removeAttribute('aria-hidden');});
   runway.style.removeProperty('height');runway.classList.remove('is-service-scroll');
   root.style.removeProperty('--deck-progress');
   ['mode','activeService','scrollStart','scrollEnd'].forEach(key=>delete root.dataset[key]);
  };
 });
 return ()=>media.revert();
}
