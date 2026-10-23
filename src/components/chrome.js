export function header() {
  return `<header class="site-header"><a class="wordmark" href="#inicio" aria-label="${siteConfig.brandName}, inicio">${logo()}</a>
    <nav id="main-nav" aria-label="Principal"><a href="#inicio">Propuestas</a><a href="#proyectos">Muestras</a><a href="#proceso">Proceso</a><a href="#contacto">Contacto</a></nav>
    <div class="header-actions"><button type="button" id="theme-toggle" class="theme-toggle" aria-label="Modo Claro. Cambiar a modo oscuro" title="Cambiar a modo oscuro"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path class="theme-moon" d="M20.5 13.1A8.7 8.7 0 0 1 10.9 3.5 8.8 8.8 0 1 0 20.5 13.1Z"/><g class="theme-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4"/></g></svg><span data-theme-label>Modo Claro</span></button><a href="#contacto" class="nav-cta">Cuéntanos tu proyecto <span aria-hidden="true">↗</span></a><button class="menu-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Abrir menú"><span></span><span></span></button></div></header>`;
}
export function footer() {
  return `<footer class="site-footer"><div class="footer-brand"><a class="wordmark" href="#inicio" aria-label="${siteConfig.brandName}, inicio">${logo()}</a><p>Diseño y tecnología, conectados.</p></div><nav aria-label="Pie de página"><a href="#inicio">Propuestas</a><a href="#proyectos">Muestras</a><a href="#proceso">Proceso</a><a href="#contacto">Contacto</a></nav><div class="footer-contact"><span class="eyebrow">¿HABLAMOS DE TU PROYECTO?</span>${contactAction({label:'Cuéntanos tu proyecto',className:'footer-contact-link'})}<p>${contactNotice({compact:true})}</p></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} NexoNet</span><a href="#inicio">Volver arriba ↑</a></div></footer>`;
}
import { siteConfig } from '../data/siteConfig.js';
import { logo } from './logo.js';
import {contactAction,contactNotice} from './contact-action.js';
