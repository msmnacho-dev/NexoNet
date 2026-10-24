import {contactForm} from '../components/contact-form.js';

export function services() {
  return `<section id="contacto" class="contact contact-form-section section-pad" aria-labelledby="contact-form-title">
    <div class="contact-form-intro"><span class="eyebrow section-kicker">HABLEMOS DE TU PROYECTO</span><div class="contact-mascot" data-contact-mascot aria-hidden="true">
        <svg class="contact-cat-figure" viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M53 126C19 144 14 112 34 99" stroke="var(--brand-accent,#405bc1)" stroke-width="12" stroke-linecap="round"/>
          <path d="M48 143C44 124 59 111 83 110H119C143 110 157 126 154 147C152 160 141 166 128 166H68C55 166 49 158 48 143Z" fill="var(--lime,#b9c5ff)"/>
          <path d="M50 72C50 54 58 43 68 38L66 17L91 35C103 31 116 32 128 38L151 19L147 58C156 68 160 83 157 98C153 121 132 135 103 136C72 137 51 120 47 98C45 88 46 80 50 72Z" fill="var(--brand-accent,#405bc1)"/>
          <path d="M72 39L71 27L84 37M132 40L146 28L143 49" stroke="var(--brand-complement,#ffd166)" stroke-width="5" stroke-linejoin="round"/>
          <ellipse cx="80" cy="82" rx="8" ry="11" fill="#fff8e8"/><ellipse cx="125" cy="82" rx="8" ry="11" fill="#fff8e8"/>
          <circle cx="82" cy="84" r="3.5" fill="#252a33"/><circle cx="123" cy="84" r="3.5" fill="#252a33"/>
          <path d="M96 98L103 103L110 98C109 108 97 108 96 98Z" fill="#ff9a91"/><path d="M103 104C100 112 91 113 87 108M103 104C106 112 115 113 119 108" stroke="#fff8e8" stroke-width="3" stroke-linecap="round"/>
          <path d="M65 98L42 94M66 106L44 109M139 98L162 94M139 106L161 109" stroke="#fff8e8" stroke-width="2.5" stroke-linecap="round"/>
          <path class="contact-cat-paw" d="M132 130C144 124 153 119 166 112" stroke="var(--lime,#b9c5ff)" stroke-width="15" stroke-linecap="round"/>
          <path d="M54 149C54 138 65 133 75 138C81 129 97 130 102 140C111 131 127 136 130 147" stroke="var(--brand-accent,#405bc1)" stroke-width="9" stroke-linecap="round"/>
        </svg>
        <svg class="contact-yarn-ball" data-contact-yarn viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="32" fill="var(--brand-complement,#ffd166)" stroke="var(--brand-accent,#405bc1)" stroke-width="3"/>
          <path d="M16 30C30 31 49 52 61 59M25 13C28 34 53 48 68 43M12 47C30 39 49 22 52 10M28 70C32 51 49 35 68 28M18 19C36 20 54 15 61 21" stroke="var(--brand-accent,#405bc1)" stroke-width="3.5" stroke-linecap="round"/>
        </svg>
        <span class="contact-mascot-note">¡Miau! Tu idea ya está en buenas patas.</span>
      </div><h2 id="contact-form-title">Haz que tu negocio destaque y atraiga más clientes.</h2><p>Una web, posicionamiento, diseño o una tarea que quieras simplificar. Cuéntanos qué quieres conseguir y encontraremos contigo el siguiente paso.</p></div>
    <div class="contact-form-panel">${contactForm()}</div>
  </section>`;
}
