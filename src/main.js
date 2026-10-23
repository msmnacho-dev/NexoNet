import '@fontsource-variable/geist';
import './styles/showcases.css';
import './styles/v5.css';
import './styles/themes.css';
import './styles/project-scroll.css';
import './styles/offers.css';
import './styles/commercial.css';
import './styles/navigation.css';
import './styles/refinement.css';
import './styles/brand-motion.css';
import './styles/service-deck.css';
import './styles/landing-wall.css';
import './styles/readability.css';
import './styles/project-story.css';
import './styles/footer.css';
import { renderSite } from './render.js';
import { initScroll } from './animations/scroll.js';
import { initInteractions } from './components/interactions.js';
import { siteConfig } from './data/siteConfig.js';
import { initTheme } from './components/theme.js';
import {initLandingPreviews} from './components/landing-wall.js';

document.documentElement.style.setProperty('--brand-accent', siteConfig.accent);
document.documentElement.classList.remove('no-js');
if (!document.querySelector('#app').children.length) document.querySelector('#app').innerHTML = renderSite();
if (siteConfig.url) {
  const canonical = document.createElement('link');
  canonical.rel = 'canonical'; canonical.href = siteConfig.url; document.head.append(canonical);
  const og = document.createElement('meta'); og.setAttribute('property','og:url'); og.content=siteConfig.url; document.head.append(og);
}
if (siteConfig.schema) {
  const schema = document.createElement('script'); schema.type='application/ld+json'; schema.textContent=JSON.stringify(siteConfig.schema); document.head.append(schema);
}
initTheme();
initInteractions();
initLandingPreviews();
initScroll();
