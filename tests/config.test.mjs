import { test } from 'node:test';
import assert from 'node:assert/strict';
import { siteConfig } from '../src/data/siteConfig.js';
import { buildBrief } from '../src/components/interactions.js';
import { journeyScenes, journeyFrame } from '../src/data/journey.js';
import { renderSite } from '../src/render.js';
import { readFile } from 'node:fs/promises';
import { contactConfig } from '../src/data/contactConfig.js';
import { contactHref,contactChannel,inquiryMessage } from '../src/components/contact-action.js';
test('contact remains unconfigured until verified data is provided',()=>{
  assert.equal(contactConfig.email,'');assert.equal(contactConfig.whatsappNumber,'');assert.equal(siteConfig.url,'');assert.equal(siteConfig.schema,null);
});

test('contact destinations require configuration and preserve the selected inquiry',()=>{
  assert.equal(contactHref('Web Eco'), '');
  assert.equal(contactChannel({email:'invalid',whatsappNumber:'123'}),null);
  const service='Web Eco — 49 € + IVA';
  const message=inquiryMessage(service);
  assert.match(message,/importe final/);
  const email=contactHref(service,message,{email:'demo@example.com'});
  assert.ok(email.startsWith('mailto:demo@example.com?'));
  assert.equal(new URLSearchParams(email.split('?')[1]).get('body'),message);
  const whatsapp=contactHref(service,message,{whatsappNumber:'34600000000'});
  assert.equal(new URL(whatsapp).searchParams.get('text'),message);
  const designMessage=contactHref('Diseño e imagen',undefined,{whatsappNumber:'34600000000'});
  assert.match(new URL(designMessage).searchParams.get('text'),/diseño e imagen/);
});
test('brief preserves the project and contact data in the downloaded text',()=>{
  const brief=buildBrief({name:'Nacho',email:'demo@example.com',service:'Diseño',message:'Un proyecto\ncon planos.'});
  assert.match(brief,/Nombre: Nacho/);assert.match(brief,/Email: demo@example.com/);assert.match(brief,/Área: Diseño/);assert.match(brief,/Un proyecto\ncon planos\./);
});

test('a configured contact channel is prepared from the visible contact form',()=>{
  // Rendering fixture only: no browser, network request or real contact is used.
  const original={...contactConfig};
  try{
    contactConfig.email='demo@example.com';
    const html=renderSite();
    assert.match(html,/Se abrirá tu aplicación de correo/);
    assert.match(html,/>Continuar con mi consulta /);
    assert.match(html,/<section id="contacto" class="contact contact-form-section/);
    assert.match(html,/name="ageConfirmed"[^>]*required/);
    assert.match(html,/name="marketingConsent"/);
    assert.doesNotMatch(html,/contact-dialog|data-prepare-brief/);
  }finally{Object.assign(contactConfig,original);}
});

test('the local form records adult confirmation and keeps marketing opt-in optional',()=>{
  const brief=buildBrief({name:'Nacho',email:'demo@example.com',service:'Web Eco',message:'Una primera web para mi negocio.',ageConfirmed:'Sí',marketingConsent:''});
  assert.match(brief,/Mayores de 18 años: Sí, confirmado/);assert.match(brief,/Noticias y promociones: No acepta \/ sin marcar/);
  const html=renderSite();
  assert.match(html,/name="name" autocomplete="name" required/);
  assert.match(html,/name="email" type="email" autocomplete="email" required/);
  assert.match(html,/name="ageConfirmed" type="checkbox" value="Sí" required/);
  assert.match(html,/name="marketingConsent" type="checkbox" value="Sí">/);
  assert.doesNotMatch(html,/name="marketingConsent"[^>]*required/);
});
test('six independent local media slots include evolution',async()=>{
  assert.deepEqual(journeyScenes.map(s=>s.label),['Idea','Diseño','Desarrollo','Automatización','Resultado','Evolución']);
  for(const [i,s] of journeyScenes.entries()){
    assert.match(s.video,new RegExp(`^/videos/nexonet-0${i+1}-[a-z]+\\.mp4$`));
    assert.equal(s.duration,8);assert.ok(s.title&&s.copy&&s.deliverable);
    assert.match(await readFile(`public${s.poster}`,'utf8'),/<svg/);
  }
  assert.equal(new Set(journeyScenes.map(s=>s.video)).size,6);
  assert.equal(siteConfig.projects.length,3);
});
test('scroll maps reversibly to bounded segment-local time',()=>{
  assert.deepEqual(journeyFrame(-1),{index:0,local:0});
  assert.deepEqual(journeyFrame(0),{index:0,local:0});
  assert.deepEqual(journeyFrame(.25),{index:1,local:.5});
  assert.deepEqual(journeyFrame(1),{index:5,local:1});
  assert.deepEqual(journeyFrame(2),{index:5,local:1});
  for(let i=0;i<6;i++)assert.equal(journeyFrame((i+.5)/6).index,i);
});
test('the contact form replaces services and the final FAQ section is removed',()=>{
  const html=renderSite();
  const ids=['inicio','propuestas','manifiesto','proceso','contacto','proyectos'];
  let previous=-1;
  for(const id of ids){const position=html.indexOf(`id="${id}"`);assert.ok(position>previous);previous=position;}
  assert.doesNotMatch(html,/id="recorrido"|data-clip=|data-stop=/);
  assert.equal((html.match(/class="service-card"/g)||[]).length,0);
  assert.doesNotMatch(html,/id="preguntas"|class="faq /);
  assert.match(html,/Cuéntanos qué necesitas resolver/);
  assert.match(html,/form id="contact-form"/);
  assert.doesNotMatch(html,/https?:\/\/.*arko/);
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.match(html,/no se enviará ni guardará en NexoNet/);
  assert.doesNotMatch(html,/VÍDEOS? PENDIENTES?|Consultar una pieza/);
});
