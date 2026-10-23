import {mkdir,writeFile} from 'node:fs/promises';
import {journeyScenes} from '../src/data/journey.js';
import {journeyArt,cameraPose} from '../src/components/journey-art.js';
await mkdir('public/images/scenes',{recursive:true});
for(let i=0;i<journeyScenes.length;i++){
  const scene=journeyScenes[i],pose=cameraPose((i+.35)/6);
  const svg=journeyArt(scene.id).replace('data-world-camera transform="translate(0 0)"',`data-world-camera transform="translate(${pose.x} ${pose.y}) scale(${pose.zoom})"`);
  await writeFile(`public${scene.poster}`,svg);
}
console.log('Seis posters SVG originales generados.');
