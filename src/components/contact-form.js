import {featuredOffers} from '../data/offers.js';
import {contactChannel,contactNotice} from './contact-action.js';

export function contactForm() {
  const connected=Boolean(contactChannel());
  return `<form id="contact-form" class="contact-form">
    <div class="contact-fields-pair">
      <label>Tu nombre<input name="name" autocomplete="name" required maxlength="120" placeholder="Cómo te llamas"></label>
      <label>Tu email<input name="email" type="email" autocomplete="email" required maxlength="254" placeholder="tu@email.com"></label>
    </div>
    <label>¿Qué necesitas?<select name="service" required><option value="" disabled selected>Elige una opción</option><option>Web o aplicación</option>${featuredOffers.map(offer=>`<option>${offer.contactService}</option>`).join('')}<option>Posicionamiento SEO/GEO y redes sociales</option><option>Automatización e integraciones</option><option>Diseño e imagen</option><option>Quiero definirlo contigo</option></select></label>
    <label>Cuéntanos un poco más<textarea name="message" required minlength="15" maxlength="5000" rows="5" placeholder="¿Qué necesita resolver tu negocio?"></textarea></label>
    <fieldset class="contact-consents"><legend>Antes de continuar</legend>
      <label class="contact-check"><input name="ageConfirmed" type="checkbox" value="Sí" required><span>Confirmo que tengo 18 años o más.</span></label>
      <label class="contact-check"><input name="marketingConsent" type="checkbox" value="Sí"><span>Acepto recibir noticias y promociones de NexoNet. <small>Opcional; no condiciona la consulta.</small></span></label>
    </fieldset>
    <p class="contact-form-note">${connected?contactNotice():'El envío directo está pendiente de configurar. Al continuar, se descargará una copia local; no se enviará ni guardará en NexoNet. La preferencia de noticias tampoco quedará registrada.'}</p>
    <button class="button" type="submit">${connected?'Continuar con mi consulta':'Preparar consulta'} <span aria-hidden="true">↗</span></button>
    <p class="form-status" role="status" aria-live="polite"></p>
  </form>`;
}
