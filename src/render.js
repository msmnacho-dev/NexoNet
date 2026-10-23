import { header, footer } from './components/chrome.js';
import { manifesto, philosophy } from './sections/editorial.js';
import { services } from './sections/services.js';
import { projects } from './sections/projects.js';
import { offers } from './sections/offers.js';
import { entry } from './sections/entry.js';
export function renderSite() {
  return `${header()}<main id="contenido">${entry()}${offers()}${manifesto()}${philosophy()}${services()}${projects()}</main>${footer()}`;
}
