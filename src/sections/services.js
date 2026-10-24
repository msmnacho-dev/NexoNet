import {contactForm} from '../components/contact-form.js';

export function services() {
  return `<section id="contacto" class="contact contact-form-section section-pad" aria-labelledby="contact-form-title">
    <div class="contact-form-intro"><span class="eyebrow section-kicker">HABLEMOS DE TU PROYECTO</span><div class="contact-mascot" data-contact-mascot aria-hidden="true">
        <img class="contact-cat-figure" src="/images/contact-kitten.svg" alt="" width="180" height="228" loading="eager">
        <svg class="contact-yarn-ball" data-contact-yarn viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="32" fill="var(--brand-complement,#ffd166)" stroke="var(--brand-accent,#405bc1)" stroke-width="3"/>
          <path d="M16 30C30 31 49 52 61 59M25 13C28 34 53 48 68 43M12 47C30 39 49 22 52 10M28 70C32 51 49 35 68 28M18 19C36 20 54 15 61 21" stroke="var(--brand-accent,#405bc1)" stroke-width="3.5" stroke-linecap="round"/>
        </svg>
        <span class="contact-mascot-note">¡Miau! Tu idea ya está en buenas patas.</span>
      </div><h2 id="contact-form-title">Haz que tu negocio destaque y atraiga más clientes.</h2><p>Una web, posicionamiento, diseño o una tarea que quieras simplificar. Cuéntanos qué quieres conseguir y encontraremos contigo el siguiente paso.</p></div>
    <div class="contact-form-panel">${contactForm()}</div>
  </section>`;
}
