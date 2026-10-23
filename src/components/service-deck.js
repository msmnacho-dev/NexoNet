import { entryServices } from '../data/entry-services.js';
import { contactAction, contactNotice } from './contact-action.js';
import { logoMark } from './logo.js';

// Local vector marks, also used in the ribbon. No third-party brand logos.
export function serviceMark(id) {
    const paths = {
        eco: '<rect x="6" y="9" width="36" height="29" rx="5"/><path d="M6 17h36M12 13h1m4 0h1M16 29l5 5 12-12"/>',
        ai: '<path d="M7 10h26a5 5 0 0 1 5 5v13a5 5 0 0 1-5 5H20l-10 7v-7a5 5 0 0 1-5-5V15a5 5 0 0 1 2-5Z"/><path d="m16 22 4 4 9-9M36 7h7m-3-3v7"/>',
        web: '<path d="m16 13-11 11 11 11m16-22 11 11-11 11M28 7l-8 34"/>',
        automation: '<rect x="4" y="17" width="12" height="14" rx="4"/><rect x="32" y="3" width="12" height="14" rx="4"/><rect x="32" y="31" width="12" height="14" rx="4"/><path d="M16 24h7V10h9M23 24v14h9"/>',
        seo: '<circle cx="20" cy="20" r="12"/><path d="m29 29 12 12M13 21h6l4-6 4 11 3-5h5"/>',
        design: '<path d="M7 36 31 6l11 9-24 29-13 1 2-9ZM27 11l11 9M7 36l11 8M14 6H5v9"/>',
    };
    return `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[id] || paths.web}</svg>`;
}

function ecoArt() {
    return `<div class="deck-browser"><div class="deck-browser-top"><i></i><i></i><i></i><span>WEB ECO / BROTE</span></div><div class="deck-brote"><div class="deck-brote-nav"><strong>brote<span>JARDINERÍA</span></strong><span>Jardines con vida. ↗</span></div><div class="deck-brote-hero"><div><span>JARDINES Y TERRAZAS</span><strong>Un poco<br>de verde.<br><em>Más hogar.</em></strong><span class="deck-brote-button">Hablemos de tu jardín ↗</span></div><img src="/images/demos/brote-jardin.jpg" alt="" width="640" height="800" fetchpriority="high"></div></div></div><div class="deck-mobile"><span>brote ↗</span><img src="/images/demos/brote-hojas.jpg" alt="" width="220" height="300"><strong>Verde,<br>también aquí.</strong><i></i></div>`;
}
function aiArt() {
    return `<div class="deck-ai-query"><span>01 / CONSULTA</span><p>Necesito una web para presentar<br>mi negocio y recibir consultas.</p></div><div class="deck-ai-route"><div><span>02 / CATEGORÍA</span><strong>Proyecto web</strong></div><b>↗</b><div><span>03 / TAREA</span><strong>Revisar la solicitud</strong></div></div><div class="deck-ai-draft"><div><span>04 / BORRADOR</span><b>REVISIÓN HUMANA</b></div><p>¡Hola! Cuéntanos qué hace tu negocio y qué te gustaría mostrar en tu web.</p><span class="deck-human">${serviceMark('ai')} Una persona revisa antes de responder.</span></div><div class="deck-ai-compact"><span><small>01 / CONSULTA</small><strong>Una nueva web ↗</strong></span><span><small>02 / CATEGORÍA</small><strong>Proyecto web ↓</strong></span><span><small>04 / BORRADOR</small><strong>Revisión humana ✓</strong></span><span><small>03 / TAREA</small><strong>Revisar solicitud ←</strong></span></div>`;
}
function webArt() {
    return `<div class="deck-app"><div class="deck-app-nav">${logoMark()}<span>TU ESPACIO DE TRABAJO</span><i></i></div><div class="deck-app-body"><aside><span>Consultas</span><span>Proyectos</span><span>Seguimiento</span></aside><div><span class="deck-art-kicker">GESTIÓN DE CONSULTAS</span><strong>Cada consulta,<br>en su sitio.</strong><div class="deck-app-row"><i></i><span>Una nueva web<small>Definir el proyecto</small></span><b>Por revisar</b></div><div class="deck-app-row"><i></i><span>Una integración<small>Revisar herramientas</small></span><b>En estudio</b></div><div class="deck-app-row"><i></i><span>Un nuevo diseño<small>Preparar la propuesta</small></span><b>Borrador</b></div></div></div></div><div class="deck-code">${serviceMark('web')}<span>Una interfaz clara.<br><b>Un sistema detrás.</b></span></div>`;
}
function automationArt() {
    return `<svg class="deck-network" viewBox="0 0 600 340" aria-hidden="true"><path d="M105 170H270V70H480M270 170H480M270 170V275H480" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="270" cy="170" r="8" fill="currentColor"/></svg><div class="deck-node deck-node-source">${serviceMark('eco')}<span>Una consulta</span></div><div class="deck-node deck-node-crm">${serviceMark('web')}<span>Un registro en CRM</span></div><div class="deck-node deck-node-task">${serviceMark('automation')}<span>Una tarea</span></div><div class="deck-node deck-node-follow">${serviceMark('ai')}<span>Un seguimiento</span></div><span class="deck-network-note">FORMULARIO → REGISTRO → SIGUIENTE PASO</span>`;
}
function designArt() {
    return `<div class="deck-design-sheet"><span>NEXONET / ESTUDIO DE IDENTIDAD</span><div class="deck-design-symbol">${logoMark()}</div><div class="deck-swatches"><i></i><i></i><i></i><i></i></div></div><div class="deck-type-sheet"><span>UNA VOZ VISUAL PROPIA.</span><strong>Aa</strong><b>Diseño que<br>conecta.</b><span>Forma · Color · Tipografía</span></div>`;
}
function seoArt() {
    return `<div class="deck-seo-search"><span>POSICIONAMIENTO ORGÁNICO</span><strong>Tu negocio,<br><em>fácil de encontrar.</em></strong><div class="deck-seo-searchbar"><i></i><span>Qué ofrece tu negocio</span><b>↗</b></div><div class="deck-seo-tags"><b>SEO</b><b>GEO</b><b>CONTENIDO</b></div></div><div class="deck-seo-social"><div class="deck-seo-social-head"><span class="deck-seo-avatar">N</span><span><b>Tu negocio</b><small>Una voz reconocible</small></span><i>•••</i></div><div class="deck-seo-social-art"><span>UNA IDEA.<br><b>UNA HISTORIA.</b></span><i></i></div><div class="deck-seo-social-foot"><b>ME GUSTA / GUARDAR / COMPARTIR</b><span>CONTENIDO PARA REDES</span></div></div>`;
}
const arts = { eco: ecoArt, ai: aiArt, seo: seoArt, web: webArt, automation: automationArt, design: designArt };

export function serviceDeck() {
    return `<div class="entry-proposals service-deck" data-service-deck aria-label="Seis formas de dar tu siguiente paso">
  <div class="deck-stack">${entryServices.map((s, i) => `<article id="entry-${s.id}" class="entry-offer deck-card deck-${s.id}${i === 0 ? ' is-current' : ''}" data-service-card aria-labelledby="entry-${s.id}-title">
   <div class="deck-copy"><span class="offer-index">0${i + 1} / ${s.kicker}</span><div class="deck-title-row"><h2 id="entry-${s.id}-title">${s.title}</h2>${i === 0 ? '<span class="entry-price">49 € <small>+ IVA</small></span>' : ''}</div>${i === 0 ? '<p class="entry-price-terms">Precio de partida. Dominio, alojamiento y servicios externos aparte.</p>' : ''}<p class="deck-summary">${s.summary}</p><p class="deck-detail">${s.detail}</p><div class="deck-cta">${contactAction({ service: s.service, label: s.cta })}</div><p class="deck-contact-note${i === 0 ? ' entry-notice' : ''}">${contactNotice({ compact: true })}</p></div>
   <div class="deck-art-wrap"><div class="deck-art deck-art-${s.id}" aria-hidden="true">${arts[s.id]()}</div><span class="deck-art-label">${s.visualLabel}</span></div>
  </article>`).join('')}</div>
  <div class="deck-controls"><nav class="deck-pager" aria-label="Cambiar de servicio">${entryServices.map((s, i) => `<button type="button" data-service-index="${i}" aria-controls="entry-${s.id}" aria-label="Ver ${s.name}"${i === 0 ? ' aria-current="true"' : ''}><span class="deck-page-number">0${i + 1}</span><span class="deck-page-name">${s.name}</span></button>`).join('')}</nav><span class="deck-scroll-hint">BAJA PARA CAMBIAR <span aria-hidden="true">↓</span></span></div>
 </div>`;
}
