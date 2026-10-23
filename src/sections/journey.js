import { journeyScenes } from '../data/journey.js';
import { journeyArt } from '../components/journey-art.js';
export function journey() {
  return `<section id="recorrido" class="journey" aria-label="De una idea a un sistema, recorrido en seis etapas">
    <div class="journey-stage" id="experiencia">
      <div class="journey-media" aria-hidden="true">${journeyArt()}${journeyScenes.map((s,i)=>`<video class="journey-video" data-clip="${i}" data-src="${s.video}" preload="none" muted playsinline tabindex="-1" style="object-position:${s.position}"></video>`).join('')}</div>
      <div class="journey-shade" aria-hidden="true"></div>
      <div class="journey-top"><span class="eyebrow section-kicker">04 / RECORRIDO EN SEIS ETAPAS</span><span class="journey-hint">UN PROYECTO. SEIS PERSPECTIVAS.</span></div>
      <div class="journey-narrative">${journeyScenes.map((s,i)=>`<article class="journey-copy ${i===0?'is-active':''}" data-scene="${i}" id="etapa-${s.id}">
        <div class="scene-index">0${i+1} / 06 <span>${s.label}</span></div>
        <h2 tabindex="-1">${s.title.replace('\n','<br>')}</h2><p>${s.copy}</p><span class="scene-deliverable">${s.deliverable}</span>
        ${i===0?'<a href="#proyectos" class="text-link">Explorar las posibilidades <span>↗</span></a>':''}
        ${i===5?'<a href="#contacto" class="text-link">Dar el primer paso <span>↗</span></a>':''}
        <img class="scene-static" src="${s.poster}" alt="Diseño visual de la etapa ${s.label.toLowerCase()}" loading="lazy" width="1600" height="900">
      </article>`).join('')}</div>
      <div class="journey-meta"><span id="media-status" role="status">RECORRIDO NEXONET · CONTROLADO POR SCROLL</span><a href="#propuestas">Volver a propuestas y contacto <span aria-hidden="true">↑</span></a></div>
      <nav class="journey-navigation" aria-label="Paradas del recorrido"><ol>${journeyScenes.map((s,i)=>`<li><a href="#etapa-${s.id}" data-stop="${i}" ${i===0?'aria-current="step"':''}><span class="stop-dot" aria-hidden="true"></span><span class="stop-number">0${i+1}</span><span class="stop-label">${s.label}</span><span class="stop-progress" aria-hidden="true"></span></a></li>`).join('')}</ol></nav>
    </div>
  </section>`;
}
