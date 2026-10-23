# NexoNet V3 · Verificación

Se modificó el proyecto existente en `nexonet-v2-beta`, conservando V2 en `.backups/before-v3-2026-10-22.zip`. No se modificó ni publicó la versión principal.

## Resultado implementado

- Escenario de viewport completo con cámara Three.js, iluminación constante y geometría procedural de un mismo sistema de consultas. Una mesa finita sustituye el pasillo y los portales de V2.
- El material inicial se despliega como interfaz, se construyen sus capas y versión móvil, y la misma consulta conecta CRM, tarea y seguimiento. El cierre abre la cámara para mostrar las piezas construidas.
- Interfaces y textos en HTML; títulos, explicación y entregable accesibles fuera del canvas. Leyenda de sistema independiente de la perspectiva en móvil.
- Una sola instancia Lenis y una sola integración con el ticker GSAP. El renderer recibe el progreso de la timeline existente y actualizaciones de tamaño. No usa autoavance, controles orbitales ni RAF independiente.
- Módulo 3D diferido y sin modelos, texturas externas, postprocesado o gasto de API. Three.js es la única nueva dependencia de ejecución.
- Alternativas CSS 3D y HTML estático, con modo de movimiento reducido que no carga el renderer.
- Se conservan servicios, tres muestras conceptuales, CRM manual, estudio Cerca Estates, proceso y formulario de descarga. No se añadieron clientes, métricas ni un endpoint ficticio.

## Pruebas

- `npm.cmd run build`: correcto; HTML prerenderizado.
- `npm.cmd test`: 3 pruebas correctas.
- `node tests/v3-check.mjs`: Chromium 1440×900, 1024×900, 768×900 y 390×844; WebGL activo, cinco paradas, retroceso, saltos por enlace/teclado, cámara detenida en reposo y sin desbordamiento horizontal ni errores de JavaScript. Alternativa sin WebGL, modo reducido sin descargar Three.js y contenido sin JavaScript.
- `node tests/spatial-check.mjs`: regresión comercial en los cuatro anchos: galería, descripciones, CRM manual, navegación móvil y descarga/cierre del formulario.
- `node tests/v3-lifecycle.mjs`: resumen móvil, pérdida/restauración real del contexto WebGL, alternancia de movimiento reducido sin duplicar renderers y controles visibles a 390×667.
- Revisión visual de capturas de hero, paradas, visión general, alternativas y secciones comerciales. Se corrigieron distancia y encuadre móviles, capas de texto y conexiones superpuestas.

Informes: `results.json`, `lifecycle.json` y `../spatial/results.json`. La muestra WebGL de 100 frames headless tuvo mediana 16,7 ms, p95 16,9 ms y máximo 17 ms. Es un dato de esta máquina, no una garantía de FPS en dispositivos reales.

## Pendiente

Safari, Firefox, GPU y móviles físicos. Email/canal de envío, dominio público, datos legales y URL verificada de Cerca Estates. Mientras no haya canal, el CTA avisa que prepara y descarga un resumen y no envía una consulta. La imagen OG SVG sigue siendo provisional. No se ha promovido esta beta a producción.
