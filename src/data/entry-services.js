import {featuredOffers} from './offers.js';

// Cada tarjeta describe una l?nea de trabajo sin a?adir precios ni garant?as.
export const entryServices = [
 {id:'eco',name:'Web Eco',ribbon:'WEB ECO',kicker:'TU PRIMERA WEB',title:'Web Eco',summary:'Presenta lo que haces con claridad y ayuda a tus futuros clientes a dar el siguiente paso contigo.',service:featuredOffers[0].contactService,cta:featuredOffers[0].cta},
 {id:'ai',name:'IA aplicada',ribbon:'IA APLICADA',kicker:'UNA TAREA REAL. UN PUNTO DE PARTIDA.',title:'IA aplicada.<br><em>A tu día a día.</em>',summary:'Libera tiempo para lo importante y atiende cada consulta con respuestas preparadas para revisar.',service:featuredOffers[1].contactService,cta:featuredOffers[1].cta},
 {id:'seo',name:'SEO, GEO y redes',ribbon:'SEO / GEO / REDES',kicker:'MÁS VISIBILIDAD. UNA PRESENCIA COHERENTE.',title:'Que te encuentren.<br><em>Que te recuerden.</em>',summary:'Haz que tu negocio gane presencia y sea más fácil de encontrar y recordar.',service:'Posicionamiento SEO/GEO y redes sociales',cta:'Valorar mi posicionamiento'},
 {id:'web',name:'Webs y apps',ribbon:'WEBS & APPS',kicker:'DISEÑAR LA EXPERIENCIA. HACERLA FUNCIONAR.',title:'Tu web.<br><em>Tu herramienta.</em>',summary:'Convierte tu web en una herramienta útil para tus clientes y para tu día a día.',service:'Web o aplicación',cta:'Definir mi proyecto web'},
 {id:'automation',name:'Automatización',ribbon:'AUTOMATIZACIÓN',kicker:'MENOS COPIAR. MÁS CONECTAR.',title:'Todo, un poco<br><em>más conectado.</em>',summary:'Dedica menos tiempo a repetir tareas y más a hacer avanzar tu negocio.',service:'Automatización e integraciones',cta:'Valorar una automatización'},
 {id:'design',name:'Diseño e identidad',ribbon:'DISEÑO & IDENTIDAD',kicker:'UNA IDENTIDAD QUE SE RECONOCE.',title:'Dale forma.<br><em>Hazlo tuyo.</em>',summary:'Crea una identidad reconocible que transmita la esencia de tu negocio en cada canal.',service:'Diseño e imagen',cta:'Definir mi proyecto de diseño'},
];
