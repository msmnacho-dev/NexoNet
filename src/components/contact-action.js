import {contactConfig} from '../data/contactConfig.js';
import {featuredOffers} from '../data/offers.js';

export function contactChannel(config=contactConfig) {
  if (/^[1-9]\d{7,14}$/.test(config.whatsappNumber||'')) return 'whatsapp';
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email||'')) return 'email';
  return null;
}
export function inquiryMessage(service) {
  return featuredOffers.find(offer=>offer.contactService===service)?.inquiry || `Hola, me gustaría valorar un proyecto${service?` de ${service.toLowerCase()}`:''} con NexoNet. Mi negocio y lo que necesito son: `;
}
export function contactHref(service='',body=inquiryMessage(service),config=contactConfig) {
  const channel=contactChannel(config);
  if(channel==='whatsapp')return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(body)}`;
  if(channel==='email')return `mailto:${config.email}?subject=${encodeURIComponent('Consulta NexoNet — '+(service||'Proyecto'))}&body=${encodeURIComponent(body)}`;
  return '';
}
export function contactNotice({compact=false}={}) {
  const channel=contactChannel();
  if(channel==='whatsapp')return 'Se abrirá WhatsApp con un mensaje preparado. Tú lo revisas y lo envías.';
  if(channel==='email')return 'Se abrirá tu aplicación de correo con un mensaje preparado. Tú lo revisas y lo envías.';
  return compact?'El envío directo está pendiente; puedes preparar la consulta en el formulario.':'El envío directo está pendiente de configurar. Sin un canal, el formulario prepara una descarga local y no envía consultas.';
}
export function contactAction({service='',label,className='button',id=''}) {
  return `<a ${id?`id="${id}"`:''} class="${className}" href="#contacto" ${service?`data-contact-service="${service}"`:''}>${label} <span aria-hidden="true">↗</span></a>`;
}
