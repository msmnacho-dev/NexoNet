# Web Eco e IA · NexoNet V5

22 de octubre de 2026. Cambios sobre la beta existente, sin publicación ni modificaciones en las otras versiones de NexoNet.

## Contenido y procedencia

- Web Eco es la primera propuesta comercial, seguida de IA aplicada a tareas reales de negocio.
- A petición posterior, se retiró el acceso a Web Eco de la etapa Idea. El bloque comercial completo sigue inmediatamente después del recorrido inicial, con su precio y CTA.
- Se conservan las seis etapas, incluida Diseño, y las secciones existentes. Los dos `project-lab` originales permanecen a continuación de proyectos; no se han recuperado los accesos duplicados eliminados.
- Alcance de Web Eco: landing de hasta cuatro secciones, plantilla adaptada, diseño para móvil y botón de contacto.
- Precio: 49 € como precio de partida, más IVA. Dominio, alojamiento y servicios externos aparte. Fuente: `nexonet-astro/src/data/services.ts`, entradas EcoWeb/ecoweb, y `nexonet-astro/src/components/EcoWebPromo.astro`. Los mismos datos aparecen en la versión Astro beta. No se han reutilizado otras tarifas.
- La propuesta IA plantea clasificación de solicitudes, preparación de borradores y valoración de tareas repetitivas. Se indica revisión humana y comprobación de viabilidad según herramientas y datos. No se promete autonomía ni resultados garantizados. No se ha conectado un modelo o servicio externo.

## Contacto

Los CTA abren el diálogo existente con la propuesta ya seleccionada. La selección y los datos introducidos se conservan en el archivo de resumen. El formulario no tiene email o endpoint configurados y sigue avisando de que no envía consultas. El flujo alternativo de correo permanece preparado mediante `siteConfig.email`.

Se ajustó la navegación por anclas para calcular una única separación respecto a la cabecera: Lenis ya aplicaba el scroll-margin del elemento además del offset anterior. Ahora los nuevos accesos llegan a la posición prevista y se mantienen los enlaces existentes.

## Comprobaciones

- `npm.cmd run build`: correcto, con HTML prerenderizado.
- `npm.cmd test`: cinco pruebas correctas, con el orden editorial actualizado.
- `node tests/offers-check.mjs`: correcto a 1440×900, 1024×768, 768×900, 390×844, 375×667 y 320×568. Comprueba precio visible al entrar, orden comercial, cuatro elementos del alcance, acordeón, preselección del formulario, contenido descargado, CTA final, seis etapas y ausencia de recortes/overflow en ambos temas.
- Sin errores JavaScript ni errores nuevos de consola. Las cargas de vídeos pendientes se interceptan en esa prueba; el respaldo de vídeo se verifica por separado.
- Ninguna petición POST al utilizar los formularios de las propuestas.
- `npm.cmd run test:browser`: regresión completa V5 correcta en seis medidas, incluidos recorrido, navegación, proyectos, demos, contacto, movimiento reducido, versión sin JavaScript y reproducción/búsqueda con el clip sintético de QA.
- Revisión visual de la landing completa en escritorio y móvil. Capturas por sección y composiciones en `qa/offers/`; también se revisaron el hero y los bloques comerciales en ambos temas.

## Información pendiente

Antes de contratar: concretar el alcance e importe final de Web Eco, los plazos y posibles costes recurrentes. El precio del dominio/alojamiento/servicios externos no está definido aquí. Para IA hay que revisar la tarea, herramientas, datos, viabilidad y condiciones de cualquier integración. Sigue pendiente un canal real de envío de contacto.

Datos comerciales centralizados en `src/data/offers.js`. Respaldo anterior: `.backups/before-eco-ai-offers-2026-10-22.zip`.
