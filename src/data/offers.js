// Alcance y precio recuperados de nexonet-astro/src/data/services.ts (plans[0]
// y servicePages, entrada ecoweb) y src/components/EcoWebPromo.astro de esa versión.
// No hay cuota recurrente ni plazo de entrega confirmado en esas fuentes.
export const featuredOffers = [
  {
    id:'web-eco', number:'01', title:'Web Eco', price:'49 €', priceNote:'Precio de partida · + IVA',
    exclusions:'Dominio, alojamiento y servicios externos aparte.',
    summary:'Una presencia web sencilla para presentar tu pequeño negocio y facilitar que contacten contigo.',
    audience:'Para autónomos, profesionales y pequeños negocios que necesitan su primera web.',
    features:['Landing de hasta 4 secciones','Plantilla adaptada a tu negocio','Diseño adaptable a móvil','Botón de contacto'],
    terms:'Dominio, alojamiento y servicios externos aparte. El alcance y el importe final se confirman antes de empezar. Plazos y posibles costes recurrentes, a confirmar antes de contratar.',
    contactService:'Web Eco — 49 € + IVA', cta:'Me interesa la Web Eco',
    inquiry:'Hola, me interesa la Web Eco de 49 € + IVA. Quiero confirmar el alcance, el importe final, los servicios aparte y los plazos para mi negocio: ',
  },
  {
    id:'ia-negocio', number:'02', title:'IA aplicada a tareas reales de negocio',
    summary:'Una consulta que llega, una solicitud que hay que ordenar, una respuesta que preparar. Podemos conectar asistencia con IA a ese trabajo concreto.',
    examples:[
      {task:'Llegan consultas de distintos tipos',help:'Clasificar solicitudes para que puedas revisarlas y darles seguimiento.'},
      {task:'Hay que responder una pregunta habitual',help:'Preparar un borrador a partir de la información que definas.'},
      {task:'La misma tarea se repite cada día',help:'Valorar una automatización conectada a tus herramientas.'},
    ],
    terms:'Primero revisamos tus herramientas, los datos disponibles y la viabilidad. Tú revisas las respuestas y validas las acciones antes de usarlas.',
    contactService:'IA aplicada al negocio', cta:'Valorar una tarea con IA',
    inquiry:'Hola, me gustaría valorar una tarea con IA. La tarea que repetimos, las herramientas que usamos y la información disponible son: ',
  },
];
