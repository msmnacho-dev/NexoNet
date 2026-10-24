import { logoMark } from '../components/logo.js';
export function manifesto() {
  const pillars=[
    {number:'01',title:'Diseño de marca',text:'Una identidad visual coherente presenta tu negocio con claridad en todos tus canales.',image:'/images/concepts/linea-landing.jpg',alt:'Diseño de marca para un estudio de arquitectura.',tag:'IDENTIDAD DE MARCA'},
    {number:'02',title:'Diseño web',text:'Páginas atractivas explican lo que ofreces y facilitan el contacto desde cualquier pantalla.',image:'/images/concepts/brote-landing.jpg',alt:'Diseño web para un negocio de jardinería.',tag:'DISEÑO WEB'},
    {number:'03',title:'Desarrollo',text:'Webs, aplicaciones e integraciones conectan herramientas y simplifican tareas cotidianas.',image:'/images/concepts/orbita-landing.jpg',alt:'Diseño web para una consultoría digital.',tag:'DESARROLLO WEB'},
    {number:'04',title:'IA aplicada',text:'Organiza consultas y prepara respuestas para atender con agilidad y mantener el control.',image:'/images/concepts/linea-landing.jpg',alt:'Diseño digital con herramientas de inteligencia artificial aplicadas al negocio.',tag:'INTELIGENCIA ARTIFICIAL'},
    {number:'05',title:'SEO, GEO y redes',text:'Aumenta tu presencia en buscadores y redes para que nuevos clientes te encuentren.',image:'/images/concepts/habita-landing.jpg',alt:'Diseño web y presencia digital para un estudio creativo.',tag:'PRESENCIA DIGITAL'},
    {number:'06',title:'Automatización',text:'Conecta herramientas, reduce tareas manuales y recupera tiempo para hacer crecer tu negocio.',image:'/images/concepts/rueda-landing.jpg',alt:'Diseño web para un taller de bicicletas con servicios conectados.',tag:'AUTOMATIZACIÓN'},
  ];
  return `<section id="manifiesto" class="manifesto service-overview" aria-labelledby="manifesto-title"><div class="service-overview-heading"><h2 id="manifesto-title">Diseño. Web.<br><span>Desarrollo.</span></h2><p>Diseño, web y tecnología conectados con lo que tu negocio necesita resolver.</p></div><div class="service-overview-runway"><div class="service-overview-grid service-overview-stage" data-service-stack>${pillars.map(item=>`<article class="service-overview-card"><div class="service-overview-visual"><img src="${item.image}" alt="${item.alt}" loading="lazy"><span>${item.number} / ${item.tag}</span></div><div class="service-overview-copy"><span class="service-overview-number">${item.number}</span><h3>${item.title}</h3><p>${item.text}</p></div></article>`).join('')}</div></div></section>`;
}
export function philosophy() {
  const steps=[
    {title:'Entender tu necesidad',action:'Nos cuentas qué quieres presentar, mejorar o conectar.',result:'Un objetivo concreto para el proyecto.'},
    {title:'Acordar lo que incluye',action:'Revisamos alcance, entregables y condiciones antes de empezar.',result:'Una propuesta que puedas valorar.'},
    {title:'Diseñar y construir',action:'Damos forma al contenido, la interfaz y las funciones acordadas.',result:'Una solución que puedes revisar.'},
    {title:'Publicar y generar oportunidades',action:'Ponemos en marcha lo acordado y dejamos tu solución preparada para conectar con tus clientes.',result:'Una herramienta lista para trabajar y abrir nuevas oportunidades.'},
  ];
  return `<section id="proceso" class="philosophy section-pad"><div class="philosophy-art" aria-hidden="true">${logoMark()}<span>UNA VISIÓN COMPARTIDA.</span></div><div class="philosophy-copy"><span class="eyebrow section-kicker">NUESTRA FORMA DE TRABAJAR</span><h2>Un proceso claro.<br>Un siguiente paso concreto.</h2><p>Antes de hablar de herramientas, entendemos el trabajo que necesitas resolver. Así puedes valorar cada paso y lo que vas a recibir.</p><ol class="process-steps">${steps.map((step,i)=>`<li><span class="process-number">0${i+1}</span><div><h3>${step.title}</h3><p>${step.action}</p><span class="process-output">Qué obtienes <span aria-hidden="true">↗</span> ${step.result}</span></div></li>`).join('')}</ol></div></section>`;
}
