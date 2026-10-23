import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { journeyScenes, journeyFrame } from '../data/journey.js';
import { cameraPose } from '../components/journey-art.js';

export function createVideoJourney(lenis, reduced = false) {
  const root = document.querySelector('.journey');
  if (!root) return () => {};
  const copies = [...root.querySelectorAll('[data-scene]')];
  const links = [...root.querySelectorAll('[data-stop]')];
  const videos = [...root.querySelectorAll('[data-clip]')];
  const camera = root.querySelector('[data-world-camera]');
  const buildProgress = root.querySelector('[data-build-progress]');
  const buildChecks = [...root.querySelectorAll('[data-build-check]')];
  const status = root.querySelector('#media-status');
  const cleanups = [];
  let trigger, observer, progress = 0, inView = false, disposed = false;

  function visibleCopies(index) {
    copies.forEach((copy,i) => {
      copy.classList.toggle('is-active',i===index);
      copy.inert = !reduced && i!==index;
      if (reduced) copy.removeAttribute('aria-hidden');
      else copy.setAttribute('aria-hidden',String(i!==index));
    });
  }
  if (reduced) {
    visibleCopies(0);
    links.forEach(link=>link.removeAttribute('aria-current'));
    return () => { copies.forEach(copy=>{copy.inert=false;copy.removeAttribute('aria-hidden');}); };
  }

  // No play(): the only clock is scroll progress. Retain the last requested seek
  // while decoding, so a fast reverse scroll cannot leave an obsolete frame.
  const states = videos.map(video => ({ video, target:0, ready:false, failed:false, loaded:false }));
  const availableClips = new Set();
  let manifestRequested=false;
  function loadManifest() {
    if(manifestRequested)return;
    manifestRequested=true;
    fetch('/videos/available.json').then(response=>response.ok?response.json():[]).then(paths=>{
      if(disposed||!Array.isArray(paths))return;
      journeyScenes.forEach(scene=>{if(paths.includes(scene.video))availableClips.add(scene.video);});
      paint();
    }).catch(()=>{ /* Local artwork remains the complete experience. */ });
  }
  function seek(state) {
    const {video} = state;
    if (!state.loaded || !video.readyState || video.seeking || state.failed || !video.seekable.length || video.seekable.end(video.seekable.length-1)<.03) return;
    const duration = Number.isFinite(video.duration) ? video.duration : journeyScenes[Number(video.dataset.clip)].duration;
    const target = Math.min(Math.max(0,duration-.035), state.target * duration);
    if (Math.abs(video.currentTime-target)>.025) {
      try { video.currentTime=target; } catch { /* Wait for the next data event. */ }
    }
  }
  states.forEach(state => {
    const {video}=state;
    const ready=()=>{
      if(disposed)return;
      state.ready=state.ready || (video.readyState>=2 && video.seekable.length>0 && video.seekable.end(video.seekable.length-1)>.03);
      video.dataset.status=state.ready?'ready':'loading';
      seek(state); paint();
    };
    const failed=()=>{
      if(disposed||!state.loaded)return;
      state.failed=true;state.ready=false;video.dataset.status='missing';paint();
    };
    const sought=()=>{seek(state);};
    const readyEvents=['loadedmetadata','loadeddata','canplay','progress','durationchange'];
    readyEvents.forEach(event=>video.addEventListener(event,ready));
    video.addEventListener('error',failed); video.addEventListener('seeked',sought);
    cleanups.push(()=>{
      readyEvents.forEach(event=>video.removeEventListener(event,ready));
      video.removeEventListener('error',failed);video.removeEventListener('seeked',sought);
    });
  });
  function loadNearby(index,local) {
    if(!inView)return;
    states.forEach((state,i)=>{
      if(!availableClips.has(journeyScenes[i].video))return;
      const nearby=i===index || (i===index+1 && local>.52) || (i===index-1 && local<.25);
      if(nearby&&!state.loaded&&!state.failed){
        state.loaded=true;
        state.video.dataset.status='loading';
        state.video.preload='auto';
        state.video.src=journeyScenes[i].video;
        state.video.load();
      } else if(!nearby && Math.abs(i-index)>1 && state.loaded && !state.failed) {
        state.loaded=false;state.ready=false;
        state.video.removeAttribute('src');state.video.preload='none';state.video.load();
        state.video.dataset.status='idle';
      }
    });
  }
  let currentIndex=-1;
  function paint() {
    const {index,local}=journeyFrame(progress);
    root.dataset.scene=String(index);root.dataset.progress=progress.toFixed(5);
    const pose=cameraPose(progress);
    camera.setAttribute('transform',`translate(${pose.x} ${pose.y}) scale(${pose.zoom})`);
    camera.dataset.pose=`${pose.x.toFixed(2)},${pose.y.toFixed(2)},${pose.zoom.toFixed(3)}`;
    // A single build sequence tied to the Development stage, reversible on scroll.
    const build = Math.min(1,Math.max(0,progress*journeyScenes.length-2));
    buildProgress.setAttribute('stroke-dasharray','1');
    buildProgress.setAttribute('stroke-dashoffset',String(1-build));
    buildChecks.forEach((check,i)=>{
      const reveal=Math.min(1,Math.max(0,(build-(.18+i*.3))/.12));
      check.setAttribute('opacity',String(reveal*reveal*(3-2*reveal)));
    });
    if(currentIndex!==index){
      currentIndex=index;visibleCopies(index);
      links.forEach((link,i)=>{if(i===index)link.setAttribute('aria-current','step');else link.removeAttribute('aria-current');});
    }
    links.forEach((link,i)=>link.style.setProperty('--stop-progress',i<index?1:i===index?local:0));
    loadNearby(index,local);
    states[index].target=local;seek(states[index]);
    const mix=Math.min(1,Math.max(0,(local-.9)/.1));
    const next=states[index+1];
    if(next){next.target=0;seek(next);}
    states.forEach((state,i)=>{
      const opacity=state.ready?(i===index?1:i===index+1?mix:0):0;
      state.video.style.opacity=String(opacity);
      state.video.style.zIndex=i===index+1?'2':'1';
    });
    const hasVideo=states[index].ready;
    root.dataset.media=hasVideo?'video':'placeholder';
    const message='RECORRIDO NEXONET · CONTROLADO POR SCROLL';
    if(status.textContent!==message)status.textContent=message;
  }
  observer=new IntersectionObserver(entries=>{
    inView=entries[0].isIntersecting;
    if(inView){loadManifest();paint();}
  },{rootMargin:'240px'});
  observer.observe(root);
  trigger=ScrollTrigger.create({trigger:root,start:'top top',end:'bottom bottom',invalidateOnRefresh:true,onUpdate:self=>{progress=self.progress;paint();},onRefresh:self=>{progress=self.progress;paint();}});
  paint();

  links.forEach((link,i)=>{
    const go=event=>{
      event.preventDefault();
      const destination=trigger.start+(trigger.end-trigger.start)*(i+.18)/journeyScenes.length;
      lenis.scrollTo(destination,{duration:.85,onComplete:()=>{
        copies[i].querySelector('h1,h2').focus({preventScroll:true});
        history.replaceState(null,'',link.hash);
      }});
    };
    const key=event=>{
      let next;
      if(event.key==='ArrowRight')next=(i+1)%links.length;
      if(event.key==='ArrowLeft')next=(i+links.length-1)%links.length;
      if(event.key==='Home')next=0;
      if(event.key==='End')next=links.length-1;
      if(next!==undefined){event.preventDefault();links[next].focus();links[next].click();}
    };
    link.addEventListener('click',go);link.addEventListener('keydown',key);
    cleanups.push(()=>{link.removeEventListener('click',go);link.removeEventListener('keydown',key);});
  });
  // Deep links resolve to scroll positions rather than absolutely positioned text.
  const initial=links.findIndex(link=>link.hash===location.hash);
  if(initial>=0)lenis.scrollTo(trigger.start+(trigger.end-trigger.start)*(initial+.18)/journeyScenes.length,{immediate:true});
  return ()=>{
    disposed=true;trigger.kill();observer.disconnect();cleanups.forEach(fn=>fn());
    states.forEach(({video})=>{video.pause();video.removeAttribute('src');video.load();video.style.opacity='0';});
    copies.forEach(copy=>{copy.inert=false;copy.removeAttribute('aria-hidden');});
  };
}
