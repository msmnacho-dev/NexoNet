import { contactChannel,contactHref,inquiryMessage } from './contact-action.js';
export function buildBrief(data) {
  return `NEXONET — CONSULTA DE PROYECTO\n\nNombre: ${data.name?.trim()||'Sin indicar'}\nEmail: ${data.email?.trim()||'Sin indicar'}\nÁrea: ${data.service}\nMayores de 18 años: ${data.ageConfirmed==='Sí'?'Sí, confirmado':'No confirmado'}\nNoticias y promociones: ${data.marketingConsent==='Sí'?'Acepta recibirlas':'No acepta / sin marcar'}\n\n${data.message}\n`;
}
export function initInteractions() {
  const menu=document.querySelector('.menu-toggle');
  const nav=document.querySelector('#main-nav');
  let lastScrollY=window.scrollY;
  function closeMenu({restoreFocus=false}={}){
    nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menú');
    if(restoreFocus)menu.focus({preventScroll:true});
  }
  menu.addEventListener('click',()=>{
    if(menu.getAttribute('aria-expanded')==='true'){closeMenu({restoreFocus:true});return;}
    lastScrollY=window.scrollY;
    nav.classList.add('open');menu.setAttribute('aria-expanded','true');menu.setAttribute('aria-label','Cerrar menú');
    nav.querySelector('a').focus({preventScroll:true});
  });
  window.addEventListener('scroll',()=>{
    const y=window.scrollY;
    const movingUp=y<lastScrollY-1;
    lastScrollY=y;
    if(movingUp&&menu.getAttribute('aria-expanded')==='true')closeMenu();
  },{passive:true});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu()));
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){
      e.preventDefault();closeMenu({restoreFocus:true});
    }
  });
  document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
  const header=document.querySelector('.site-header');
  header.addEventListener('focusout',event=>{
    if(event.relatedTarget){
      if(!header.contains(event.relatedTarget))closeMenu();
    }else requestAnimationFrame(()=>{
      if(!header.contains(document.activeElement))closeMenu();
    });
  });
  matchMedia('(max-width:800px)').addEventListener('change',event=>closeMenu({restoreFocus:event.matches&&nav.contains(document.activeElement)}));
  const dialogs=[...document.querySelectorAll('dialog')];
  dialogs.forEach(dialog=>{
    dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  });
  let generatedMessage='';
  const form=document.querySelector('#contact-form');
  const message=form.querySelector('[name=message]');
  const select=form.querySelector('[name=service]');
  function prepareMessage() {
    if(!message.value||message.value===generatedMessage){
      generatedMessage=inquiryMessage(select.value);message.value=generatedMessage;
    }
  }
  select.addEventListener('change',prepareMessage);
  document.querySelectorAll('[data-contact-service]').forEach(button=>button.addEventListener('click',()=>{
    const service=button.dataset.contactService;
    if(service&&[...select.options].some(option=>option.value===service))select.value=service;
    prepareMessage();
    form.querySelector('.form-status').textContent='';
  }));
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(form));
    const brief=buildBrief(data);
    if(contactChannel()){
      const link=document.createElement('a');link.href=contactHref(data.service,brief);link.target='_blank';link.rel='noopener noreferrer';link.click();
      form.querySelector('[role=status]').textContent='Se ha preparado el mensaje en tu aplicación. Revísalo y confirma allí el envío.';
      return;
    }
    const url=URL.createObjectURL(new Blob([brief],{type:'text/plain;charset=utf-8'}));
    const link=document.createElement('a');link.href=url;link.download='mi-proyecto-nexonet.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    form.querySelector('[role=status]').textContent='Consulta descargada. No se ha enviado ni guardado ningún dato en NexoNet. La preferencia de noticias tampoco se ha registrado.';
  });
}
