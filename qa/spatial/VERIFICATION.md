# Verificación de NexoNet V2 · Recorrido espacial

Se modificó la beta existente y se conservó el código previo en `.backups/before-spatial-2026-10-22.zip`. No se modificaron las otras versiones de NexoNet ni se publicó el sitio.

Validación sobre la compilación local de producción:

- `npm.cmd run build`: correcto; HTML prerenderizado.
- `npm.cmd test`: 3 pruebas correctas.
- `npm.cmd run test:browser`: 1440×900, 1024×900, 768×900 y 390×844. Cinco etapas, retroceso, enlaces por ratón y teclado, paginación de las tres muestras, CRM manual, descarga y cierre de formulario. Sin errores de JavaScript ni overflow de página.
- `node tests/resilience-check.mjs`: portfolio fijado dentro de 1440×768; controles del relato dentro de 390×667; cambios de movimiento reducido en tiempo de ejecución; contenido sin JavaScript; viaje sin WebGL; alternativa estática sin CSS 3D.
- Revisión visual de hero, etapas, servicios, tres muestras, CRM, estudio inmobiliario, contacto y modo estático mediante las capturas de esta carpeta. Se corrigieron el conflicto de anclas de Lenis, una capa de desarrollo ilegible, el exceso de altura del portfolio y un problema de escala 3D en móviles bajos.

Los resultados detallados están en `results.json` y `resilience.json`. La muestra de scroll de 100 frames en Chromium headless tuvo mediana de 16,7 ms y percentil 95 de 16,8 ms. Es una medida de laboratorio de esta máquina, no una garantía de FPS en dispositivos reales.

No se añadieron dependencias, modelos 3D, servicios externos ni costes de API. La cámara y las transformaciones usan CSS 3D y la única integración Lenis/GSAP existente. El CRM interactivo funciona por pulsación, sin automatismos que compitan con el scroll.

Pendiente: Safari, Firefox y dispositivos móviles físicos; contacto y dominio definitivos. El email sigue vacío: el CTA informa antes de completar el formulario de que descarga un resumen y no envía una consulta. Cerca Estates sigue como mención sin enlace al no existir una URL configurada en esta beta. Los proyectos, planos y visualizaciones son conceptuales.
