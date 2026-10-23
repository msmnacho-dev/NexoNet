import { siteConfig } from '../data/siteConfig.js';

// V5: una N modular; dos trazos unidos en una misma dirección.
const paths = `<path class="logo-primary" d="M5 41V10a6 6 0 0 1 10.8-3.6L34 30.7V41h-7L14 24v17Z"/><path class="logo-secondary" d="M34 7h9v31a6 6 0 0 1-10.8 3.6L22 28.4l7.2-5.4 4.8 6.2Z"/>`;
export function logoMark() {
  return `<svg class="logo-mark" viewBox="0 0 48 48" aria-hidden="true">${paths}</svg>`;
}
export function logo() {
  return `<span class="logo-lockup">${logoMark()}<span class="logo-wordmark">${siteConfig.brandName}</span></span>`;
}
