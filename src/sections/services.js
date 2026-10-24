import {contactForm} from '../components/contact-form.js';

export function services() {
  return `<section id="contacto" class="contact contact-form-section section-pad" aria-labelledby="contact-form-title">
    <div class="contact-form-intro"><span class="eyebrow section-kicker">HABLEMOS DE TU PROYECTO</span><div class="contact-mascot" data-contact-mascot aria-hidden="true">
        <img class="contact-cat-figure" src="/images/contact-kitten.svg" alt="" width="180" height="228" loading="eager">
        <svg class="contact-yarn-ball" data-contact-yarn viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs><radialGradient id="contact-yarn-base" cx="35%" cy="28%" r="78%"><stop stop-color="#d9236d"/><stop offset="1" stop-color="#9d0645"/></radialGradient><clipPath id="contact-yarn-clip"><circle cx="42" cy="40" r="32"/></clipPath></defs>
          <circle cx="42" cy="40" r="32" fill="url(#contact-yarn-base)"/>
          <g clip-path="url(#contact-yarn-clip)" stroke="#f04c93" stroke-width="5" stroke-linecap="round">
            <path d="M15 12C14 29 22 43 38 53C50 61 65 66 78 67M28 7C27 25 34 39 50 49C61 56 72 60 84 60M43 6C41 22 47 35 62 44C70 49 78 51 87 51M58 9C55 21 60 31 72 38L88 43M9 27C16 37 24 44 34 48M8 42C16 53 25 60 37 64M14 58C24 66 34 70 46 73M21 74C32 68 44 62 58 59M35 76C47 68 62 64 80 64M50 76C62 69 76 68 89 70M8 51C20 48 28 40 32 28M19 14C25 31 36 44 49 54"/>
          </g>
          <path d="M23 61C13 68 9 79 15 86C21 94 44 94 69 91C85 89 96 85 94 80C93 76 86 75 77 76" stroke="#f45b9f" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="contact-mascot-note">¡Miau! Tu idea ya está en buenas patas.</span>
      </div><h2 id="contact-form-title">Haz que tu negocio destaque y atraiga más clientes.</h2><p>Una web, posicionamiento, diseño o una tarea que quieras simplificar. Cuéntanos qué quieres conseguir y encontraremos contigo el siguiente paso.</p></div>
    <div class="contact-form-panel">${contactForm()}</div>
  </section>`;
}
