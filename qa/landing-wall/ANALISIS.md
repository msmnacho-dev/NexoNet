# Muro de landings: referencia y adaptación

Referencia revisada: [Monos](https://monos.pro/), escritorio de 1440×900 y móvil de 390×844. Capturas `monos-*` y mediciones en `reference.json`.

Debajo de su banda se observa una retícula oscura con tres columnas de imágenes y esquinas redondeadas. Las columnas laterales y central se desplazan en sentidos opuestos al avanzar por la sección. Por ejemplo, las mediciones de escritorio entre scroll 450 y 900 muestran una traslación lateral de −85,4 a +11,9 px y una central de +106,8 a −14,8 px. El contenedor recorta los extremos de las columnas. No es un carrusel horizontal.

## Aplicación en la beta

- La segunda sección `#propuestas` ocupa ahora ese lugar visual, inmediatamente bajo la cinta, con retícula a todo el ancho, fondo verde oscuro y tres columnas de landings propias. Eliminada la pequeña franja de enlaces que antes quedaba entre la cinta y las propuestas.
- Seis diseños ficticios diferentes: Brote, Bruma, Línea, Órbita, Rueda y Habita. Sus capturas se generan desde HTML/CSS/SVG propios. Nuevas fotografías ilustrativas descargadas de fuentes identificadas como gratuitas de Unsplash; créditos en `public/images/concepts/CREDITS.md`. Las fotografías de Brote conservan sus créditos anteriores. No se incorporan imágenes, código o marcas de Monos al producto.
- GSAP/ScrollTrigger controla las traslaciones con el scroll existente: laterales ±12 % del ancho de ventana y centro ±15 %. El recorte y la altura del muro permiten un cambio de velocidad cercano al observado en la referencia. Hasta 800 px, dos columnas y recorrido reducido a ±4,5/5,5 %. Sin fijar la sección ni añadir un reloj de animación.
- Con movimiento reducido y sin JavaScript, retícula estática completa. Las miniaturas sin JavaScript enlazan al archivo de imagen.
- Visor funcional con las seis imágenes completas, navegación anterior/siguiente, teclado, zoom y cierre con Escape. Los controles dibujados en cada imagen se identifican como parte del diseño conceptual.
- Precio, alcance, exclusiones, ejemplo de IA y CTA se mantienen en dos desplegables bajo la galería. El acceso de la apertura permite saltar directamente a ellos; los enlaces a una propuesta abren el desplegable correspondiente antes de navegar.
- La apertura con título y logo, sus seis tarjetas y las seis etapas narrativas originales se conservan. Contacto y condiciones comerciales no cambian.

Beta local: `http://127.0.0.1:4322`. Respaldo previo: `.backups/before-landing-wall-2026-10-22.zip`. La versión principal no se ha modificado.

## Validación

- Build de producción y ocho pruebas unitarias correctos.
- `landing-wall-check.mjs`: cinco tamaños entre 320×568 y 1440×900; seis imágenes locales, desplazamientos opuestos y reversibles, visor, zoom, teclado, cierre y retorno del foco, detalles comerciales y enlace directo a IA. Comprobados movimiento reducido y lectura sin JavaScript. Sin desbordamientos, errores de consola, recursos fallidos ni envíos. Resultados en `results.json` y capturas `ours-*`, `preview-*`, `dark-*`.
- `offers-check.mjs`: seis tamaños; precio, cuatro elementos incluidos, exclusiones, IA con revisión humana, CTA por propuesta y resumen local descargable correctos. Sin envíos ni errores de consola.
- `navigation-check.mjs`: escritorio, tableta, móvil y ventana baja; encabezado, teclado, menú, enlaces, anclas y CTA final correctos. Comprobados enlaces directos al cargar.
- `brand-motion-check.mjs`: cinco tamaños; apertura, puntero, cinta, pausa con teclado, modo oscuro, movimiento reducido en vivo y versión sin JavaScript correctos. La espera de entrada se basa en su estado visible, para evitar depender de un fotograma concreto durante las capturas.
- `v5-check.mjs`: seis tamaños entre 320 y 1440 px; seis etapas originales, cámara reversible, navegación, demostraciones, descarga y ausencia de desbordamientos correctas. Comprobados también movimiento reducido, versión sin JavaScript y medios sintéticos exclusivos de QA. Sin errores.
