# Galería de proyectos por scroll

22 de octubre de 2026 · Beta local NexoNet V5.

Implementación en `src/animations/project-gallery.js`, integrada en el Lenis y ticker GSAP existentes. Sin instancias adicionales de Lenis ni nuevos servicios.

- Escritorio: galería fijada bajo la cabecera, desplazamiento horizontal reversible con scroll vertical e indicador 01/02/03 sincronizado.
- Móvil y pantallas bajas: recorrido vertical de las tres fichas, aparición suave e indicador fijo bajo la cabecera.
- Botones y flechas de teclado permiten navegar entre proyectos.
- Movimiento reducido: fichas estáticas; sin desplazamiento animado.
- Se conservan los textos de necesidad/solución/entregables, enlaces y demos locales.
- El bloque animado ocupa la altura disponible bajo la cabecera y llega al borde inferior del viewport. Las visualizaciones crecen con el espacio disponible.
- Se mantienen los dos desplegables `project-lab` originales a continuación del recorrido. Se eliminaron los dos botones de exploración añadidos por error, sus estilos y sus manejadores.

`node tests/project-scroll-check.mjs`: correcto en 1440×900, 1024×768, 801×760, 768×900, 390×844, 320×568 y 1024×600. Se comprobaron avance y retroceso 01 → 02 → 03 → 02 → 01, botones, teclado, ausencia de overflow, encuadre completo, controles de las demos visibles, temas claro/oscuro, cambios de tamaño y cambios de movimiento reducido. Sin errores JavaScript.

También pasaron la compilación, las 5 pruebas de contenido y la regresión funcional V5, con las aserciones de galería adaptadas a su nuevo comportamiento. Se revisaron visualmente las capturas de las tres paradas en escritorio y las vistas oscuras de escritorio y móvil.

Durante la revisión se ajustó la altura del encuadre para conservar visible el enlace de la demo CRM, se hizo idempotente la limpieza de ScrollTrigger al cambiar de tamaño y se calcularon los destinos de los botones desde la posición real del documento.

La comprobación verifica también que no existe ningún botón `data-explore-lab` ni `.project-explore`, que siguen existiendo exactamente dos desplegables originales y que el borde inferior del bloque coincide con el viewport durante la animación. Respaldo previo a la corrección: `.backups/before-project-viewport-fix-2026-10-22.zip`.

Resultados estructurados y capturas en esta carpeta. Respaldo anterior: `.backups/before-project-scroll-2026-10-22.zip`. Preview existente: HTTP 200 en `http://127.0.0.1:4322`.
