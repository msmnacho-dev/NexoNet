# Cabecera, navegación y contacto de NexoNet V5

- Beta existente: `nexonet-v2-beta`. Respaldo anterior en `.backups/before-flush-header-2026-10-22.zip`. Sin cambios en la versión principal ni publicación.
- Cabecera fija de ancho completo en `top: 0`, sin margen ni esquinas superiores que dejen una franja. Conserva altura y espaciado interior.
- Destinos de anclaje calculados con la altura real de la cabecera y 12 px de separación; foco en el título de destino. También funciona con movimiento reducido.
- Menú móvil: apertura con Enter/Espacio, foco inicial en el primer enlace, cierre con Escape y retorno al botón, cierre al navegar o salir de la cabecera. Cambio de tema utilizable con ratón y teclado. El panel se desplaza cuando la ventana es baja.
- Web Eco: precio de partida 49 € + IVA y exclusiones junto al precio, tanto en la entrada como en el bloque detallado. Se mantienen los cuatro elementos del alcance confirmado.
- IA: consulta → categoría → tarea → borrador, con etiqueta de simulación sin IA conectada y revisión humana visible. No se activa ninguna API.
- Contacto: email y WhatsApp siguen vacíos en `src/data/contactConfig.js`; no hay endpoint conectado. Los CTA actuales abren un resumen descargable, sin envío. Con un canal configurado se mantienen los mensajes por propuesta y una alternativa separada para descargar el resumen; el formulario nunca se presenta como envío.

Validaciones realizadas:

- Compilación de producción y siete pruebas de contenido/configuración correctas.
- `tests/navigation-check.mjs`: escritorio, tableta y móvil desde 320 px; cabecera a ras al cargar y al desplazarse, enlaces de menú, foco, títulos visibles, contacto final, pie, ambos temas, movimiento reducido, enlace directo a una sección y menú en ventana baja. Consola sin errores.
- `tests/offers-check.mjs`: seis tamaños, ambas propuestas/CTA visibles al inicio, descarga con servicio seleccionado, condiciones, imágenes, texto sin recortes, temas y ausencia de envíos.
- `tests/theme-check.mjs`: seis tamaños, teclado, ratón, persistencia y almacenamiento restringido, sin errores.
- `tests/v5-check.mjs`: seis etapas, navegación, reversibilidad, demos, FAQ y descarga en seis tamaños; movimiento reducido, ausencia de JavaScript y prueba de medios sintéticos exclusiva de QA. Sin errores de JavaScript.

Pendiente de confirmar: canal real de contacto; alcance e importe final, plazos y posibles costes recurrentes de Web Eco; herramientas, datos y viabilidad de cualquier integración de IA. Dominio, alojamiento y servicios externos permanecen aparte.
