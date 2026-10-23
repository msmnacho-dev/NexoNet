import { landingConcepts } from '../data/landing-concepts.js';

export function projects() {
  return `<section id="proyectos" class="projects project-story" aria-labelledby="project-story-title">
    <div class="project-story-runway">
      <div class="projects-stage">
        <div class="gallery-controls"><p>6 diseños · sigue <span aria-hidden="true">↓</span></p><nav class="project-pager" aria-label="Elegir diseño">${landingConcepts.map((concept,index)=>`<button type="button" data-project-index="${index}" aria-label="Ver diseño ${index+1}: ${concept.name}"${index===0?' aria-current="true"':''}>0${index+1}</button>`).join('')}</nav></div>
        <div class="project-story-images" aria-hidden="true">${landingConcepts.map((concept,index)=>`<figure class="project-story-frame" data-story-frame data-concept-index="${index}" style="--story-index:${index}"><img src="${concept.image}" alt="" width="1200" height="1900" ${index===0?'fetchpriority="high"':'loading="lazy"'} decoding="async"><figcaption><span>0${index+1} / ${concept.name}</span><small>${concept.category}</small></figcaption></figure>`).join('')}</div>
        <div class="project-story-copy"><span class="eyebrow">UNA PRESENCIA QUE ABRE CAMINO</span><h2 id="project-story-title">Prepara tu negocio<br><em>para nuevas oportunidades.</em></h2><p>Una web clara ayuda a explicar lo que ofreces y facilita que potenciales clientes den el siguiente paso. Empecemos a construir esa presencia.</p><a class="button" href="#contacto">Quiero impulsar mi negocio <span aria-hidden="true">↗</span></a></div>
        <p class="project-story-caption" data-story-caption>01 / Brote · Jardinería</p>
      </div>
    </div>
  </section>`;
}
