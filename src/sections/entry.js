import {brandTheatre,brandRibbon} from '../components/brand-theatre.js';
import {serviceDeck} from '../components/service-deck.js';

export function entry() {
  return `<section id="inicio" class="commercial-entry" aria-labelledby="entry-title">
    <div class="entry-runway"><div class="entry-scene">
    ${brandTheatre()}
    ${serviceDeck()}
    ${brandRibbon()}
    </div></div>
  </section>`;
}
