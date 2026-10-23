import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

// The reference's staggered columns, rebuilt with NexoNet's own landing images.
// Uses page scroll only: no pin, autoplay, extra Lenis instance or RAF.
export function createLandingWall(reduced=false){
 const root=document.querySelector('[data-landing-wall]');
 const viewport=root.querySelector('.landing-wall-viewport');
 const cards=[...root.querySelectorAll('.landing-wall-card')];
 if(reduced){root.dataset.wallMotion='static';return ()=>{delete root.dataset.wallMotion;};}
 const media=gsap.matchMedia();
 media.add({wide:'(min-width:801px)',all:'(min-width:0px)'},context=>{
  const wide=context.conditions.wide;
  const columns=wide?3:2;
  root.dataset.wallMotion='animated';root.dataset.wallColumns=String(columns);
  const distance=i=>innerWidth*(i%columns===1?(wide?.15:.055):(wide?.12:.045));
  const direction=i=>i%columns===1?1:-1;
  const animation=gsap.timeline({scrollTrigger:{trigger:viewport,start:'top bottom',end:'bottom top',scrub:.35,invalidateOnRefresh:true,
   onUpdate:self=>{root.dataset.wallProgress=self.progress.toFixed(5);},
  }});
  cards.forEach((card,i)=>animation.fromTo(card,{y:()=>direction(i)*distance(i)},{y:()=>-direction(i)*distance(i),duration:1,ease:'none'},0));
  return ()=>{animation.scrollTrigger?.kill();animation.kill();gsap.set(cards,{clearProps:'transform'});['wallMotion','wallColumns','wallProgress'].forEach(key=>delete root.dataset[key]);};
 });
 return ()=>media.revert();
}
