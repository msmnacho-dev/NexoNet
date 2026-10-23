export const siteConfig = {
  brandName: 'NexoNet',
  versionLabel: 'V5',
  tagline: 'Diseñamos. Programamos. Automatizamos.',
  accent: '#b42332',
  accentOptions: { leaf: '#b42332', lime: '#f6a6a8' },
  url: '', // URL pública HTTPS: activa canonical y og:url.
  schema: null, // Añadir datos verificados de ProfessionalService antes de publicar.
  contact: { heading: '¿Cuál es tu siguiente paso?', description: 'Una primera web, un nuevo diseño o una tarea que quieres simplificar. Pon tu idea en palabras y prepara un resumen para compartirlo.' },
  services: [
    { title: 'Programación', intro: 'Una web que recibe consultas. Un sistema que las organiza.', items: ['Webs y aplicaciones adaptadas a tu negocio', 'CRM, automatizaciones y seguimiento conectados', 'Integraciones que evitan copiar datos a mano', 'Rendimiento, mantenimiento y SEO técnico / local'], tools: 'Laravel · PHP · Python' },
    { title: 'Diseño', intro: 'Una identidad clara. Material listo para presentar y publicar.', items: ['Identidad visual y piezas gráficas coherentes', 'Imágenes editadas y preparadas para cada soporte', 'Planos comerciales y visualizaciones 3D', 'Material inmobiliario con textos para anuncios'], tools: 'Photoshop · AutoCAD · SketchUp' },
  ],
  projects: [
    { number: '01', title: 'Una primera web que cuenta lo esencial.', category: 'Web Eco / jardinería', need: 'Presentar un pequeño negocio y facilitar el contacto.', solution: 'Identidad, presentación de servicios, fotografías y botón de contacto.', details: 'Landing adaptable con el alcance de Web Eco.', type: 'web' },
    { number: '02', title: 'Cada consulta, en su sitio.', category: 'Sistema de consultas', need: 'Evitar que una consulta se quede sin siguiente paso.', solution: 'Del formulario al registro, clasificación, tarea, seguimiento y cierre.', details: 'Formulario conectado, estados y recorrido de seguimiento.', type: 'crm' },
    { number: '03', title: 'Un espacio mejor contado.', category: 'Presentación inmobiliaria', need: 'Explicar la distribución y las posibilidades de un espacio.', solution: 'Una presentación que reúne imagen, plano y texto.', details: 'Plano comercial, texto y visualización virtual.', type: 'estate' },
  ],
};

