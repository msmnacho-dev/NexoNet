# Identidad y animación: referencia y aplicación

Referencia revisada de nuevo: [Monos](https://monos.pro/). Se observaron escritorio (1440×900), móvil (390×844), entrada, puntero y varias posiciones de scroll. Evidencias de navegador en `reference-motion.json` y `reference-*.png`.

| Recurso observado | Aplicación en NexoNet |
| --- | --- |
| Marca a gran escala y acento de entrada en el titular. | Wordmark de ancho completo y N modular con volumen, construida a partir del símbolo existente. Entrada coordinada de letras y piezas. |
| Cintas repetidas; la lectura de animaciones CSS mostró ciclos de 15 segundos. | Cinta lima con contenido propio, ciclo de 26 segundos y control de pausa/reanudación con teclado. Se detiene fuera del viewport. |
| Transiciones de entrada y cambios de imagen en los servicios. | Revelado de títulos ligado al scroll y estudios vectoriales que aparecen al pasar el puntero o enfocar un servicio. |
| Recorrido horizontal de la metodología. | Se conserva la galería horizontal existente; el proceso mantiene lectura vertical y añade un indicador de avance. |

Interacción adicional propia: el monograma se inclina con el puntero en dispositivos con ratón (límites de 6°/9°) y cambia suavemente de pose al desplazar la página. No se observó un cambio de pose de la mascota de Monos en las dos muestras de puntero tomadas; esa interacción de NexoNet no se atribuye a la referencia.

## Identidad y funcionamiento

- Conservados verde bosque, lima, Geist y el símbolo N modular. El nombre y el símbolo ocupan el área principal del hero.
- Web Eco de 49 € + IVA e IA siguen accesibles desde el primer pantallazo. No cambian alcance, condiciones ni destinos de contacto.
- Las seis etapas del recorrido siguen completas y secundarias.
- La cinta es el único movimiento continuo añadido. Tiene pausa explícita; el resto procede de una entrada breve, scroll, foco o puntero.
- Movimiento reducido y versión sin JavaScript muestran una composición estática y legible. Los CTA no se ocultan ni esperan a que termine la introducción.
- Se reutilizan GSAP/ScrollTrigger y la instancia existente de Lenis. Sin otro bucle de JavaScript, motor 3D, dependencia ni API de pago.
- El monograma y los estudios de servicios son recursos vectoriales del proyecto. Las imágenes de la referencia permanecen solo en QA.

Implementación: `src/components/brand-theatre.js`, `src/animations/brand-motion.js`, `src/styles/brand-motion.css`. Respaldo: `.backups/before-brand-motion-2026-10-22.zip`. Trabajo en beta local; versión principal sin modificar.

## Validación final · 22 de octubre de 2026

- Compilación de producción y ocho pruebas unitarias correctas.
- `brand-motion-check`: cinco tamaños entre 320 y 1440 px; marca, ofertas visibles al inicio, inclinación con puntero, cinta y pausa con teclado, aparición de servicios, scroll, modo oscuro, movimiento reducido en vivo y versión sin JavaScript. Sin desbordamientos ni errores de consola.
- `offers-check` y `navigation-check`: ofertas, destinos honestos de contacto, fotografías, menú, teclado y anclas correctos; sin solicitudes de envío ni errores de consola.
- `v5-check`: seis tamaños entre 320 y 1440 px; seis etapas, cámara reversible, navegación, demostraciones locales y resumen descargable correctos. Comprobados también movimiento reducido, versión sin JavaScript y medios sintéticos exclusivos de QA.
- `theme-check`: seis tamaños entre 320 y 1440 px; persistencia, teclado, almacenamiento restringido y ausencia de solapamientos del encabezado correctos.

Capturas y resultados de las animaciones propias en `qa/brand-motion/`. Los informes restantes están en `qa/offers/`, `qa/navigation/`, `qa/v5/` y `qa/themes/`.
