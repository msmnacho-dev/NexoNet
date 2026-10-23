import {stat,writeFile} from 'node:fs/promises';
import {journeyScenes} from '../src/data/journey.js';
const available=[];
for(const scene of journeyScenes) {
  try {if((await stat(`public${scene.video}`)).size>0)available.push(scene.video);}catch{ /* Use the original local artwork. */ }
}
await writeFile('public/videos/available.json',JSON.stringify(available));
console.log(`${available.length} clips locales disponibles; respaldo gráfico preparado.`);
