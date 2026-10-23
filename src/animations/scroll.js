import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { createVideoJourney } from './video-journey.js';
import { createBrandMotion } from './brand-motion.js';
import { createServiceDeck } from './service-deck.js';
import {createLandingWall} from './landing-wall.js';

gsap.registerPlugin(ScrollTrigger);
export function initScroll() {
  const media=gsap.matchMedia();
  let activeLenis=null;
  const revealDetails=target=>{
    let parent=target.closest('details');
    while(parent){parent.open=true;parent=parent.parentElement.closest('details');}
  };
  const anchors=[];
  document.querySelectorAll('a[href^="#"]:not([data-stop])').forEach(link=>{
    const go=event=>{
      if(event.defaultPrevented)return;
      const target=document.getElementById(link.hash.slice(1));
      if(!target)return;
      event.preventDefault();
      revealDetails(target);
      ScrollTrigger.refresh();
      const headerHeight=document.querySelector('.site-header').getBoundingClientRect().height;
      const gap=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--anchor-gap'))||12;
      const destination=Math.max(0,target.getBoundingClientRect().top+scrollY-(link.hash==='#inicio'?0:headerHeight+gap));
      const finish=()=>{
        history.replaceState(null,'',link.hash);
        const heading=target.querySelector('h1,h2,h3')||target;
        heading.tabIndex=-1;heading.focus({preventScroll:true});
      };
      if(activeLenis)activeLenis.scrollTo(destination,{duration:1,onComplete:finish});
      else {window.scrollTo({top:destination,behavior:'instant'});finish();}
    };
    link.addEventListener('click',go);anchors.push(()=>link.removeEventListener('click',go));
  });
  media.add({reduced:'(prefers-reduced-motion: reduce)',animated:'(prefers-reduced-motion: no-preference)'},context=>{
    const reduced=context.conditions.reduced;
    document.documentElement.classList.toggle('reduced-motion',reduced);
    const disposeBrand=createBrandMotion(reduced);
    const disposeWall=createLandingWall(reduced);
    if(reduced){
      const disposeDeck=createServiceDeck(null,true);
      const disposeJourney=createVideoJourney(null,true);
      return ()=>{disposeWall();disposeDeck();disposeBrand();disposeJourney();};
    }
    const lenis=new Lenis({duration:.8,smoothWheel:true,syncTouch:false,anchors:false,prevent:node=>node.tagName==='DIALOG'});
    activeLenis=lenis;
    lenis.on('scroll',ScrollTrigger.update);
    const tick=time=>lenis.raf(time*1000);
    gsap.ticker.add(tick);
    const disposeDeck=createServiceDeck(lenis);
    const disposeJourney=createVideoJourney(lenis);
    const visibility=()=>document.hidden?lenis.stop():lenis.start();
    document.addEventListener('visibilitychange',visibility);
    document.fonts.ready.then(()=>ScrollTrigger.refresh());
    const details=[...document.querySelectorAll('details')];
    const refresh=()=>ScrollTrigger.refresh();
    details.forEach(element=>element.addEventListener('toggle',refresh));
    return ()=>{activeLenis=null;disposeWall();disposeDeck();disposeBrand();disposeJourney();details.forEach(element=>element.removeEventListener('toggle',refresh));gsap.ticker.remove(tick);lenis.destroy();document.removeEventListener('visibilitychange',visibility);};
  });
  const initialTarget=document.getElementById(location.hash.slice(1));
  if(initialTarget){revealDetails(initialTarget);document.fonts.ready.then(()=>{
    ScrollTrigger.refresh();const header=document.querySelector('.site-header').offsetHeight;
    window.scrollTo({top:Math.max(0,initialTarget.getBoundingClientRect().top+scrollY-header-12),behavior:'instant'});
  });}
  return ()=>{media.revert();anchors.forEach(fn=>fn());};
}
