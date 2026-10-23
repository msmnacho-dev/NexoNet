# NexoNet V3 — reconstrucción luminosa

Se reconstruyó la beta existente, sin crear otra aplicación ni modificar la versión principal. La copia anterior está en `.backups/before-luminous-rebuild-2026-10-22.zip`.

## Cambios

- Identidad predominantemente clara: blanco cálido, minerales, titanio, grafito y lima. El contraste oscuro queda reservado al cierre.
- Símbolo propio de dos arcos enlazados y nuevo wordmark; SVG de color, monocromo, composición completa y favicon. Uso consistente en cabecera, pie, muestras y escena.
- Hero reconstruido alrededor de la nueva identidad; acceso directo a contacto y proyectos.
- Mundo Three.js real: suelo abierto, plataformas redondeadas, arcos de identidad y un proyecto que evoluciona de necesidad a interfaz, web, CRM, tarea y seguimiento. No hay túnel ni cuadrícula decorativa.
- Una única integración Lenis/GSAP; renderer diferido y dirigido por el mismo progreso. No hay autoavance ni RAF paralelo. HTML accesible para titulares, explicaciones, entregables y controles.
- Oferta, muestras conceptuales, demo manual, comparación inmobiliaria, proceso y descarga conservados y adaptados visualmente. No se añadieron datos comerciales, canales ni integraciones ficticias.

## Comprobaciones

- Compilación de producción y 3 pruebas unitarias correctas.
- `tests/v3-check.mjs`: cinco estados con WebGL activo, retroceso, enlaces de etapa, teclado, cámara detenida en reposo y sin errores de JavaScript en 1440, 1024, 768 y 390 px. Alternativas sin WebGL, sin JavaScript y con movimiento reducido.
- `tests/spatial-check.mjs`: navegación móvil, las tres muestras, CRM manual con selección y reinicio, descarga del resumen y cierre de diálogo.
- `tests/light-check.mjs`: mismo conjunto de anchos; fondo claro, nuevo logo, SVG servidos, diálogos claros, cero desbordamiento horizontal y textos internos de las cinco superficies sin recortes. Los tres nodos del flujo quedan dentro del encuadre en escritorio y tablet.
- Contraste calculado sobre el fondo del hero: texto principal 12,54:1; secundario 5,48:1; acento tipográfico 6,23:1; CTA principal 10,20:1. Se ha revisado visualmente el resto de la landing; estas cifras no constituyen una auditoría WCAG completa.
- `tests/v3-lifecycle.mjs`: pérdida y recuperación real de WebGL con alternativa CSS, cambio de preferencia de movimiento sin duplicar renderers y controles visibles en 390×667. La muestra headless de 100 frames dio mediana 16,7 ms y p95 16,8 ms; no garantiza FPS en dispositivos físicos.
- Revisión de capturas de hero, cinco paradas, servicios, muestras, demo, estudio inmobiliario, contacto y formulario. Corregidos desbordes internos y encuadres del flujo en tablet.

Informes: `results.json`, `../v3/results.json`, `../v3/lifecycle.json` y `../spatial/results.json`.

## Pendiente

Email/canal real de contacto, dominio y datos legales definitivos, y URL verificada de Cerca Estates. Mientras no haya canal, la beta explica que solo descarga el resumen. Validación en Safari, Firefox y móviles físicos. No se han activado APIs de pago ni publicado la beta.
