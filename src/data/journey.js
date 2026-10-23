export const journeyScenes = [
  { id:'idea', label:'Idea', title:'Todo empieza\ncon una idea.', copy:'Una web para presentar tu negocio. Una forma mejor de gestionar las consultas. Un proyecto que empieza por lo que necesitas.', deliverable:'De una necesidad a una dirección clara.', video:'/videos/nexonet-01-idea.mp4', duration:8, poster:'/images/scenes/idea.svg', position:'65% center' },
  { id:'diseno', label:'Diseño', title:'Dar forma.\nEncontrar sentido.', copy:'Identidad, interfaz y recorrido de contacto. Ordenamos lo que cuentas y cómo lo vive quien llega a tu negocio.', deliverable:'Una identidad reconocible y una interfaz con intención.', video:'/videos/nexonet-02-diseno.mp4', duration:8, poster:'/images/scenes/diseno.svg', position:'65% center' },
  { id:'desarrollo', label:'Desarrollo', title:'Del diseño\na lo que funciona.', copy:'Construimos la web o aplicación que necesita tu proyecto. Una interfaz adaptable, con formularios y funciones que tienen un propósito.', deliverable:'Web o aplicación a medida, preparada para usarse.', video:'/videos/nexonet-03-desarrollo.mp4', duration:8, poster:'/images/scenes/desarrollo.svg', position:'65% center' },
  { id:'automatizacion', label:'Automatización', title:'Conectar también\nes simplificar.', copy:'Una consulta se convierte en un registro, una tarea y un siguiente paso. Menos información dispersa; más continuidad.', deliverable:'Formulario → CRM → tarea → seguimiento.', video:'/videos/nexonet-04-automatizacion.mp4', duration:8, poster:'/images/scenes/automatizacion.svg', position:'65% center' },
  { id:'resultado', label:'Resultado', title:'Las piezas juntas.\nEl proyecto en marcha.', copy:'La web presenta, el formulario recoge y el sistema organiza las consultas. Cada parte enlaza con la siguiente.', deliverable:'Formulario, sistema y seguimiento conectados.', video:'/videos/nexonet-05-resultado.mp4', duration:8, poster:'/images/scenes/resultado.svg', position:'65% center' },
  { id:'evolucion', label:'Evolución', title:'Listo para hoy.\nAbierto a lo siguiente.', copy:'El trabajo puede continuar con mantenimiento, mejoras de rendimiento, SEO técnico y nuevas conexiones. Crecer desde una base bien construida.', deliverable:'Mantenimiento y mejoras según el alcance acordado.', video:'/videos/nexonet-06-evolucion.mp4', duration:8, poster:'/images/scenes/evolucion.svg', position:'65% center' },
];

export function journeyFrame(progress, count = journeyScenes.length) {
  const scaled = Math.min(1, Math.max(0, progress)) * count;
  const index = Math.min(count - 1, Math.floor(scaled));
  return { index, local: Math.min(1, scaled - index) };
}
