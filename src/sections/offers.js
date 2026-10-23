import {featuredOffers} from '../data/offers.js';
import {contactAction,contactNotice} from '../components/contact-action.js';
import {ecoDemo,aiDemo} from '../components/service-demos.js';
import {landingWall,landingPreview} from '../components/landing-wall.js';
export function offers() {
  const [eco,ai]=featuredOffers;
  const delivery=contactNotice();
  return `<section id="propuestas" class="featured-offers landing-offers" aria-labelledby="offers-title">
    ${landingWall()}
    <div id="alcance-propuestas" class="offer-details"><div class="offer-details-heading"><span class="eyebrow section-kicker">01 / ALCANCE DE LAS PROPUESTAS</span><h3 id="alcance-title">Antes de dar el paso,<br>las cosas claras.</h3><p>Consulta qué incluye Web Eco y cómo empezamos a valorar una tarea con IA.</p></div>
    <div class="offers-grid">
      <details class="offer-fold"><summary><span>01 / Web Eco</span><strong>49 € <small>+ IVA · Precio de partida</small></strong><b aria-hidden="true">+</b></summary>
      <article id="${eco.id}" class="offer offer-eco" aria-labelledby="eco-title">
        <span class="offer-index">${eco.number} / TU PRIMER PASO DIGITAL</span>
        <div class="eco-heading"><h3 id="eco-title">${eco.title}</h3><div class="offer-price"><strong>${eco.price}</strong><span>${eco.priceNote}</span></div></div>
        <p class="offer-price-terms">${eco.exclusions}</p>
        <p class="offer-summary">${eco.summary}</p><p class="offer-audience">${eco.audience}</p>
        <div class="offer-demo">${ecoDemo()}</div>
        <details class="offer-includes" open><summary>Qué incluye <span aria-hidden="true">+</span></summary><ul>${eco.features.map(item=>`<li>${item}</li>`).join('')}</ul></details>
        <p class="offer-terms">${eco.terms}</p>
        <div class="offer-action">${contactAction({service:eco.contactService,label:eco.cta})}<p>${delivery}</p></div>
      </article>
      </details>
      <details class="offer-fold"><summary><span>02 / IA aplicada a tareas reales</span><span class="fold-note">Nosotros lo preparamos y ella trabaja para ti.</span><b aria-hidden="true">+</b></summary>
      <article id="${ai.id}" class="offer offer-ai" aria-labelledby="ai-title">
        <span class="offer-index">${ai.number} / UNA MEJORA EN EL DÍA A DÍA</span><h3 id="ai-title">${ai.title.replace(' reales','<br>reales')}.</h3><p class="offer-summary">${ai.summary}</p>
        ${aiDemo()}
        <p class="offer-terms">${ai.terms}</p>
        <div class="offer-action">${contactAction({service:ai.contactService,label:ai.cta,className:'text-link'})}<p>${delivery}</p></div>
      </article>
      </details>
    </div>
    </div>${landingPreview()}
  </section>`;
}
