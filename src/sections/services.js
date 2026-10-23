import {contactForm} from '../components/contact-form.js';

export function services() {
  return `<section id="contacto" class="contact contact-form-section section-pad" aria-labelledby="contact-form-title">
    <div class="contact-form-intro"><span class="eyebrow section-kicker">HABLEMOS DE TU PROYECTO</span><h2 id="contact-form-title">Cuéntanos qué necesitas resolver.</h2><p>Una web, posicionamiento, diseño o una tarea que quieras simplificar. Danos el contexto y veremos contigo el siguiente paso.</p></div>
    <div class="contact-form-panel">${contactForm()}</div>
  </section>`;
}
