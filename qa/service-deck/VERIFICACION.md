# Apertura visual de servicios · 22 de octubre de 2026

Beta local: `http://127.0.0.1:4322`. Versión principal sin modificar. Respaldo previo: `.backups/before-service-deck-2026-10-22.zip`.

## Resultado

- Conservado el título NexoNet con el monograma modular con volumen.
- Web Eco abre la página en una tarjeta de ancho completo, con precio de partida de 49 € + IVA, exclusiones, CTA y composición de web en escritorio/móvil. Brote sigue identificado como negocio ficticio y las fotografías como ilustrativas.
- Al bajar se eleva la siguiente tarjeta: IA aplicada, webs y aplicaciones, automatización, diseño e identidad y presentación de espacios. Los cuatro últimos servicios proceden del alcance existente de Programación y Diseño en `src/data/siteConfig.js`.
- Cada propuesta tiene una composición propia. IA conserva consulta → categoría → tarea → borrador pendiente de revisión humana, etiquetado como conceptual. La vista más corta condensa esos cuatro pasos, sin conexión real.
- La cinta ocupa el borde inferior del primer pantallazo, tiene más altura, nombres en negrita e iconos vectoriales propios en lugar de asteriscos. Conserva pausa con teclado y parada fuera de pantalla.
- Navegación directa entre servicios con ratón, tacto y teclado; flechas, Inicio y Fin. Enlace directo a los detalles para saltar la secuencia. Solo la tarjeta activa admite foco e interacción durante el recorrido animado.
- En ventanas demasiado bajas, con movimiento reducido y sin JavaScript, las seis tarjetas usan altura natural. Las seis etapas narrativas originales permanecen en su sección independiente.

## Comprobaciones

- `npm.cmd run build`: producción compilada y HTML prerenderizado.
- `npm.cmd test`: ocho pruebas correctas.
- `tests/service-deck-check.mjs`: seis tamaños entre 320×568 y 1440×900; seis tarjetas en ambos sentidos, posición de cinta, contenido completo, selección con teclado, CTA de los seis servicios, modo oscuro y cambio de movimiento reducido. Comprobados además ventanas bajas y HTML sin JavaScript. Resultados en `results.json`; capturas `opening-*`, `service-*` y `dark-*`.
- `inspect-layout.mjs`: ajustado y comprobado el diagrama compacto de IA, sin intersección con su etiqueta. Cambio de tamaño en vivo: escritorio → móvil → ventana baja con lectura natural → escritorio, sin duplicar tarjetas. Geometría en `layout.json`.
- `tests/brand-motion-check.mjs`: cinco tamaños; marca, puntero, cinta y pausa con teclado, revelados, movimiento reducido en vivo y versión estática. Sin desbordamientos ni errores de consola.
- `tests/offers-check.mjs`: seis tamaños; Web Eco al inicio, acceso directo a IA, condiciones existentes, CTA y descarga de resumen, sin envío de consultas ni errores de consola.
- `tests/navigation-check.mjs`: escritorio, tableta y móvil; encabezado a ras de la ventana, menú, teclado, anclas y CTA final correctos.
- `tests/v5-check.mjs`: seis tamaños; etapas narrativas, cámara reversible, navegación, demostraciones locales y descarga correctas, sin desbordamientos. Comprobadas también lectura sin JavaScript, preferencia de movimiento reducido en vivo y carga/seek de medios sintéticos exclusivos de QA. Sin errores.

## Información comercial

No cambian precios, alcance ni condiciones. No se añaden clientes, resultados o paquetes. Email y WhatsApp siguen sin configurar en `src/data/contactConfig.js`; los CTA abren la preparación de un resumen local con el servicio seleccionado, y lo explican junto al botón. No se han añadido APIs, costes ni dependencias.
