import {landingConcepts} from '../data/landing-concepts.js';

export function landingWall(){
 return `<div class="landing-wall" data-landing-wall>
  <div class="landing-wall-label"><h2 id="offers-title">Landings con identidad propia.</h2></div>
  <div class="landing-wall-viewport"><div class="landing-wall-grid">${landingConcepts.map((c,i)=>`<a class="landing-wall-card" href="${c.image}" data-open-landing="${i}" aria-label="Ampliar diseño ${c.name}, ${c.category.toLowerCase()}"><img src="${c.image}" width="1200" height="1900" alt="${c.alt}" loading="lazy" decoding="async"><span class="landing-card-caption"><span><b>${c.name}</b><small>${c.category}</small></span><span aria-hidden="true">↗</span></span></a>`).join('')}</div></div>
  <div class="landing-wall-bottom"><div><span class="eyebrow">DISEÑO WEB PARA DISTINTOS SECTORES</span><h3>Distintos negocios.<br><span>Una identidad propia.</span></h3></div><div class="landing-wall-explain"><nav class="landing-concept-picker" aria-label="Ampliar un diseño web">${landingConcepts.map((c,i)=>`<button type="button" data-open-landing="${i}" aria-haspopup="dialog" aria-controls="landing-preview-dialog">${c.name}<span aria-hidden="true">↗</span></button>`).join('')}</nav></div></div>
 </div>`;
}

export function landingPreview(){
 const c=landingConcepts[0];
 return `<dialog id="landing-preview-dialog" class="landing-preview" aria-labelledby="landing-preview-title"><div class="landing-preview-header"><div><span class="eyebrow">DISEÑO WEB / <span data-preview-category>${c.category}</span></span><h2 id="landing-preview-title" data-preview-title>${c.name}</h2></div><button type="button" class="dialog-close" aria-label="Cerrar vista de la landing">×</button></div><div class="landing-preview-image" data-preview-scroll tabindex="0" aria-label="Vista completa de la página. Desplázate para recorrerla."><img data-preview-image width="1200" height="1900" alt="${c.alt}"></div><div class="landing-preview-controls"><button type="button" data-preview-previous aria-label="Ver el diseño anterior">← <span>Anterior</span></button><span data-preview-count role="status">01 / 06</span><button type="button" data-preview-zoom aria-pressed="false">Ampliar</button><button type="button" data-preview-next aria-label="Ver el siguiente diseño"><span>Siguiente</span> →</button></div></dialog>`;
}

export function initLandingPreviews(){
 const dialog=document.querySelector('#landing-preview-dialog');
 const image=dialog.querySelector('[data-preview-image]');
 const scroll=dialog.querySelector('[data-preview-scroll]');
 const zoom=dialog.querySelector('[data-preview-zoom]');
 let active=0;
 function select(index){
  active=(index+landingConcepts.length)%landingConcepts.length;
  const concept=landingConcepts[active];
  image.src=concept.image;image.alt=concept.alt;
  dialog.querySelector('[data-preview-title]').textContent=concept.name;
  dialog.querySelector('[data-preview-category]').textContent=concept.category;
  dialog.querySelector('[data-preview-count]').textContent=`0${active+1} / 06`;
  dialog.dataset.concept=concept.id;
  scroll.classList.remove('is-zoomed');zoom.setAttribute('aria-pressed','false');zoom.textContent='Ampliar';scroll.scrollTo(0,0);
 }
 document.querySelectorAll('[data-open-landing]').forEach(button=>{
  button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls','landing-preview-dialog');
  button.addEventListener('click',event=>{event.preventDefault();select(Number(button.dataset.openLanding));dialog.showModal();});
 });
 dialog.querySelector('[data-preview-previous]').addEventListener('click',()=>select(active-1));
 dialog.querySelector('[data-preview-next]').addEventListener('click',()=>select(active+1));
 zoom.addEventListener('click',()=>{
  const zoomed=scroll.classList.toggle('is-zoomed');zoom.setAttribute('aria-pressed',String(zoomed));zoom.textContent=zoomed?'Ajustar':'Ampliar';
 });
 dialog.addEventListener('keydown',event=>{
  if(scroll.classList.contains('is-zoomed'))return;
  if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();select(active+(event.key==='ArrowRight'?1:-1));}
 });
}
