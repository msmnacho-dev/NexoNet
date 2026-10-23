# NexoNet V5 — entrada comercial

Comprobación local sobre la compilación de producción, 22 de octubre de 2026.

- `npm.cmd run build`: correcto.
- `npm.cmd test`: 6 comprobaciones correctas, incluida la generación de enlaces de correo y WhatsApp con mensaje contextual, sin contactar esos destinos.
- `node tests/offers-check.mjs`: Web Eco e IA y ambos CTA visibles en el primer pantallazo a 1440×900, 1024×768, 768×900, 390×844, 375×667 y 320×568. Aviso de descarga sin envío también visible. Alcance de Web Eco, propuesta de IA, fotografías locales, descargas, temas y contenido sin JavaScript comprobados. Sin errores de consola ni envíos POST.
- `node tests/v5-check.mjs`: seis etapas, avance/retroceso, navegación por teclado, muestras locales, formulario de resumen, FAQ, CRM y comparador correctos en seis tamaños. También movimiento reducido, cambio de preferencia y contenido sin JavaScript. El motor de vídeo se comprobó con un clip sintético exclusivo de QA.
- `node tests/project-scroll-check.mjs`: galería en siete tamaños, botones 01/02/03, teclado, avance/retroceso y botón real de la muestra Brote utilizables. Horizontal en escritorio alto; vertical en móvil y pantallas bajas. Sin controles tapados.
- `node tests/theme-check.mjs`: temas, persistencia, menú responsive, teclado y almacenamiento restringido correctos en seis tamaños.
- Revisión visual de entrada, propuestas, muestra Web Eco y escena final en escritorio y móvil. Conservados verde/lima, Geist y las seis etapas. Eliminadas las etiquetas de vídeo pendiente y las peticiones a clips ausentes.

No hay canal de contacto confirmado. Los CTA abren un resumen local, con servicio y texto inicial; la descarga no envía ni almacena datos en un servidor. El único destino se configura en `src/data/contactConfig.js` y se recompila.

Web Eco conserva exclusivamente el alcance previo: precio de partida 49 € + IVA, landing hasta cuatro secciones, plantilla adaptada, diseño móvil y botón de contacto. Dominio, alojamiento y servicios externos aparte. Alcance/importe final, plazos y posibles costes recurrentes pendientes de confirmar. La propuesta de IA requiere revisar herramientas, datos y viabilidad; la muestra es conceptual y no ejecuta una integración.

Respaldo anterior: `.backups/before-commercial-entry-2026-10-22.zip`. Versión principal sin modificar; sin publicación ni APIs de pago activadas.
