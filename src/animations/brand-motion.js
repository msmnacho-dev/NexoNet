import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

export function createBrandMotion(reduced=false){
 const theatre=document.querySelector('[data-brand-theatre]');
 const ribbon=document.querySelector('[data-brand-ribbon]');
 const disposers=[];
 document.documentElement.dataset.brandMotion=reduced?'reduced':'animated';
 let ribbonInView=false;
 const ribbonState=()=>{ribbon.dataset.running=String(!reduced&&ribbonInView);};
 const observer=new IntersectionObserver(entries=>{ribbonInView=entries[0].isIntersecting;ribbonState();});
 observer.observe(ribbon);disposers.push(()=>observer.disconnect());ribbonState();
 if(reduced)return ()=>{disposers.forEach(dispose=>dispose());};

 const context=gsap.context(()=>{
  const object=theatre.querySelector('[data-brand-object]');
  const tilt=theatre.querySelector('[data-brand-tilt]');
  const entrance=gsap.timeline({defaults:{ease:'power3.out'}});
  entrance.from('[data-brand-word]',{y:40,opacity:0,duration:.95,stagger:.12},0)
   .from('[data-brand-piece]',{x:i=>i?12:-12,y:i=>i?-8:8,opacity:0,duration:.95,stagger:.1},.1)
   .from('.brand-intent',{y:12,opacity:0,duration:.65},.4);
  gsap.fromTo(object,{y:0,rotation:-9},{y:36,rotation:9,scale:.94,ease:'none',scrollTrigger:{trigger:theatre,start:'top top',end:'bottom top',scrub:.45}});
  const fine=matchMedia('(hover:hover) and (pointer:fine)');
  const rotateX=gsap.quickTo(tilt,'rotationX',{duration:.6,ease:'power2.out'});
  const rotateY=gsap.quickTo(tilt,'rotationY',{duration:.6,ease:'power2.out'});
  const move=event=>{
   if(!fine.matches)return;
   const rect=theatre.getBoundingClientRect();
   rotateX(-((event.clientY-rect.top)/rect.height-.5)*12);
   rotateY(((event.clientX-rect.left)/rect.width-.5)*18);
  };
  const reset=()=>{rotateX(0);rotateY(0);};
  theatre.addEventListener('pointermove',move);theatre.addEventListener('pointerleave',reset);
  disposers.push(()=>{theatre.removeEventListener('pointermove',move);theatre.removeEventListener('pointerleave',reset);rotateX.tween.kill();rotateY.tween.kill();});
  document.querySelectorAll('.offers-heading h2,.projects-heading h2,.service-overview-heading h2,.philosophy h2,.services .section-intro h2,.faq h2,.contact h2').forEach(heading=>{
   gsap.fromTo(heading,{y:22,opacity:.35},{y:0,opacity:1,ease:'none',scrollTrigger:{trigger:heading,start:'top 94%',end:'top 69%',scrub:true}});
  });
  const contactMascot=document.querySelector('[data-contact-mascot]');
  const contactYarn=contactMascot?.querySelector('[data-contact-yarn]');
  const contactPanel=document.querySelector('.contact-form-panel');
  if(contactMascot&&contactYarn&&contactPanel){
   const hello=gsap.timeline({scrollTrigger:{trigger:contactPanel,start:'top 68%',once:true,invalidateOnRefresh:true}});
   hello.fromTo(contactMascot,{y:18,scale:.88,rotation:-4,opacity:0},{y:0,scale:1,rotation:0,opacity:1,duration:.65,ease:'back.out(1.6)'})
    .fromTo(contactMascot.querySelector('.contact-mascot-note'),{y:9,scale:.88,opacity:0},{y:0,scale:1,opacity:1,duration:.4,ease:'back.out(2)'},.25)
    .to(contactMascot.querySelector('.contact-cat-figure'),{y:-5,rotation:3,duration:.16,repeat:1,yoyo:true,ease:'power1.inOut',transformOrigin:'75% 85%'},.5)
    .fromTo(contactYarn,{x:0,y:0,rotation:0},{x:()=>{const ball=contactYarn.getBoundingClientRect(),panel=contactPanel.getBoundingClientRect();return panel.left+30-(ball.left+ball.width/2);},y:()=>{const ball=contactYarn.getBoundingClientRect(),panel=contactPanel.getBoundingClientRect();return panel.top-10-(ball.top+ball.height/2);},rotation:720,scale:.84,duration:.88,ease:'power2.in',immediateRender:false},.64)
    .to(contactPanel,{x:8,duration:.07,ease:'none'},1.5)
    .to(contactPanel,{x:-6,duration:.08,ease:'none'},1.57)
    .to(contactPanel,{x:3,duration:.07,ease:'none'},1.65)
    .to(contactPanel,{x:0,duration:.12,ease:'power2.out'},1.72);
  }
  const overview=document.querySelector('.service-overview');
  const runway=overview?.querySelector('.service-overview-runway');
  const heading=overview?.querySelector('.service-overview-heading');
  const stage=overview?.querySelector('[data-service-stack]');
  const cards=stage?[...stage.querySelectorAll('.service-overview-card')]:[];
  if(overview&&runway&&stage&&cards.length>1){
   overview.dataset.motion='stack';
   cards.forEach((card,i)=>{card.style.zIndex=String(i+1);card.inert=i!==0;if(i)card.setAttribute('aria-hidden','true');});
   const headerHeight=()=>document.querySelector('.site-header')?.getBoundingClientRect().height||0;
   const headingGap=()=>parseFloat(getComputedStyle(overview).paddingTop)||0;
   const startLead=0;
   const headingSpace=()=>{const style=getComputedStyle(heading);return heading.getBoundingClientRect().height+(parseFloat(style.marginBottom)||0);};
   const reservedSpace=()=>headerHeight()+headingGap()+headingSpace();
   const releaseOffset=()=>reservedSpace()+(parseFloat(stage.style.height)||0);
   const offscreenX=()=>Math.ceil(innerWidth-stage.getBoundingClientRect().left+64);
   const travel=()=>Math.round(innerHeight*.72*(cards.length-1));
   const measure=()=>{const reserved=reservedSpace();const height=Math.max(240,innerHeight-reserved-36);overview.style.setProperty('--service-heading-top',`${headerHeight()+headingGap()}px`);overview.style.setProperty('--service-stage-top',`${reserved}px`);stage.style.height=`${height}px`;runway.style.height=`${height+travel()}px`;};
   measure();
   gsap.set(cards.slice(1),{x:offscreenX,rotation:4});
   const timeline=gsap.timeline({scrollTrigger:{trigger:runway,start:()=>`top ${reservedSpace()+startLead}px`,end:()=>`+=${travel()+startLead}`,scrub:.5,invalidateOnRefresh:true,onRefreshInit:measure,onUpdate:self=>{
    const active=Math.min(cards.length-1,Math.floor(self.progress*(cards.length-1)+.2));
    cards.forEach((card,i)=>{const current=i===active;card.inert=!current;if(current)card.removeAttribute('aria-hidden');else card.setAttribute('aria-hidden','true');});
   }}});
   for(let i=1;i<cards.length;i++){
    cards.slice(0,i).forEach((card,j)=>{const depth=i-j;timeline.to(card,{x:-depth*14,y:-depth*16,scale:1-depth*.012,opacity:1-depth*.04,ease:'none',duration:.9},i-1);});
    timeline.fromTo(cards[i],{x:offscreenX,rotation:4},{x:0,rotation:0,ease:'power3.out',duration:.9},i-1);
   }
   gsap.fromTo(heading,{y:0},{y:()=>-(headingSpace()+headingGap()),ease:'none',scrollTrigger:{trigger:runway,start:()=>`bottom ${releaseOffset()}px`,end:()=>`+=${headingSpace()+headingGap()}`,scrub:true,invalidateOnRefresh:true}});
   disposers.push(()=>{delete overview.dataset.motion;overview.style.removeProperty('--service-heading-top');overview.style.removeProperty('--service-stage-top');stage.style.removeProperty('height');runway.style.removeProperty('height');cards.forEach(card=>{card.style.removeProperty('z-index');card.inert=false;card.removeAttribute('aria-hidden');});});
  }
  const steps=document.querySelector('.process-steps');
  const items=[...steps.children];
  const progress=ScrollTrigger.create({trigger:steps,start:'top 70%',end:'bottom 45%',onUpdate:self=>{
   steps.style.setProperty('--process-progress',self.progress);
   items.forEach((item,i)=>item.classList.toggle('is-current',i===Math.min(items.length-1,Math.floor(self.progress*items.length))));
  }});
  disposers.push(()=>{progress.kill();steps.style.removeProperty('--process-progress');items.forEach(item=>item.classList.remove('is-current'));});
 });
 return ()=>{disposers.forEach(dispose=>dispose());context.revert();};
}
