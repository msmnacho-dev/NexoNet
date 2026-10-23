import {mkdir,writeFile} from 'node:fs/promises';
import {request} from '@playwright/test';
const photos=[
 {file:'cafe.jpg',author:'Hanny Naibaho',url:'https://unsplash.com/photos/flat-lay-photography-of-coffee-latte-in-teacup-on-table-0YbeoQOX89k'},
 {file:'architecture.jpg',author:'Miguel Joya',url:'https://unsplash.com/photos/modern-white-building-with-curved-architectural-lines-f5gQ0_8DC0M'},
 {file:'cycling.jpg',author:'Rob Wingate',url:'https://unsplash.com/photos/cyclist-rides-a-bike-along-a-forest-road-MXl86dgC_js'},
];
await mkdir('public/images/concepts/photos',{recursive:true});
const client=await request.newContext({ignoreHTTPSErrors:true});
for(const photo of photos){
 const page=await client.get(photo.url);if(!page.ok())throw new Error(`Photo source ${page.status()}: ${photo.url}`);
 const html=await page.text();
 const encoded=html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/)?.[1];
 if(!encoded)throw new Error(`No public image metadata: ${photo.url}`);
 const source=new URL(encoded.replaceAll('&amp;','&'));
 if(source.hostname!=='images.unsplash.com')throw new Error('Unexpected photo host');
 source.search='';source.searchParams.set('auto','format');source.searchParams.set('fit','crop');source.searchParams.set('w','1600');source.searchParams.set('q','85');source.searchParams.set('fm','jpg');
 const image=await client.get(source.href);if(!image.ok())throw new Error(`Image ${image.status()}`);
 const bytes=await image.body();await writeFile(`public/images/concepts/photos/${photo.file}`,bytes);console.log(`${photo.file}: ${bytes.length} bytes`);
}
await client.dispose();
await writeFile('public/images/concepts/CREDITS.md',`# Landings conceptuales de NexoNet\n\nDiseños y marcas de ejemplo creados para esta beta. No son clientes, encargos ni resultados reales. Las fotografías son ilustrativas y no representan trabajos de las marcas ficticias.\n\n${photos.map(p=>`- \`photos/${p.file}\`: ${p.author}, [Unsplash](${p.url}).`).join('\n')}\n\nFotografías descargadas desde las páginas indicadas, identificadas como gratuitas bajo la [licencia Unsplash](https://unsplash.com/license). Se sirven localmente, sin API ni clave. Las fotos de Brote conservan sus créditos en \`../demos/CREDITS.md\`. La escena de Habita y los gráficos de Órbita son geometría propia de HTML/CSS/SVG.\n\nLos archivos \`*-landing.jpg\` se renderizan desde las composiciones propias de \`scripts/render-concept-landings.mjs\`; no son capturas de webs de terceros.\n`);
