import {landingWall,landingPreview} from '../components/landing-wall.js';
export function offers() {
  return `<section id="propuestas" class="featured-offers landing-offers" aria-labelledby="offers-title">
    ${landingWall()}
    ${landingPreview()}
  </section>`;
}
