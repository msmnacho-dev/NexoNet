# NexoNet V5 · Beta local

Reconstrucción del proyecto existente `nexonet-v2-beta`. Se conserva el nombre histórico de carpeta y el puerto 4322. La versión principal no se ha modificado ni publicado. Copia completa anterior a V5: `.backups/before-v5-2026-10-22.zip`.

## Ejecución

Node.js 22.12 o posterior. Desde esta carpeta en VS Code:

```powershell
npm.cmd install
npm.cmd run dev
```

Vista local: http://127.0.0.1:4322. Si ya existe un servidor en ese puerto, reutilizarlo. Para comprobar el resultado de producción:

```powershell
npm.cmd run build
npm.cmd run preview
```

No ejecutar dev y preview simultáneamente en el mismo puerto. Las fuentes, ilustraciones y fotografías se sirven localmente; no se usan APIs de pago ni servicios externos en la landing. Las fotografías ilustrativas proceden de Unsplash; créditos en `public/images/demos/CREDITS.md` y `public/images/concepts/CREDITS.md`.

## Estructura V5

1. Entrada comercial `#inicio`: Web Eco desde 49 € + IVA a todo el ancho en el primer pantallazo. El scroll cambia a IA y otros cuatro servicios; la navegación permite ir directamente a cada uno. Justo debajo de la cinta, `#propuestas` presenta seis landings ficticias con parallax. El alcance comercial se conserva en desplegables de `#alcance-propuestas`.
2. Manifiesto y galería de tres demostraciones conceptuales animada por scroll vertical: 01 → 02 → 03. La primera presenta Brote, un negocio de jardinería ficticio. Los paneles desplegables conservan el CRM manual y el comparador inmobiliario.
3. Recorrido secundario `#recorrido`, con seis etapas: Idea, Diseño, Desarrollo, Automatización, Resultado y Evolución. La cabecera mantiene accesos a propuestas y contacto.
4. Filosofía editorial y cuatro pasos de trabajo.
5. Dos tarjetas de servicios: Programación y Diseño. Herramientas en segundo plano.
6. FAQ accesible mediante acordeones HTML nativos.
7. CTA de proyecto y pie con navegación y estado real del contacto.

La cabecera empieza en `top: 0`, ocupa el ancho de la ventana y mantiene su espacio interior. `src/styles/navigation.css` centraliza los márgenes de anclaje según su altura (72 px; 60 px en móvil). Los enlaces dejan visible el título de destino y trasladan allí el foco, también con movimiento reducido. En móvil, Enter/Espacio abren el menú, Escape lo cierra y devuelve el foco al control; los enlaces cierran el panel. El panel puede desplazarse en ventanas bajas. Verificación: `node tests/navigation-check.mjs`, con capturas y resultados en `qa/navigation/`. Respaldo: `.backups/before-flush-header-2026-10-22.zip`.

### Revisión comparativa con Monos

Se ha revisado `https://monos.pro/` en escritorio y móvil como referencia de presentación y movimiento. El análisis inicial está en `qa/monos-comparison/COMPARACION.md`. La revisión específica del muro bajo la banda está en `qa/landing-wall/ANALISIS.md`. La entrada mantiene Web Eco e IA; las propuestas detalladas se despliegan bajo la nueva galería, y el manifiesto incorpora contraste verde oscuro. La metodología conserva cuatro pasos y las seis etapas del recorrido permanecen secundarias.

Los CTA de Programación y Diseño conservan el servicio elegido. El resumen descargable requiere solo la propuesta y una descripción: nombre y email son opcionales y se pueden añadir desde un desplegable. No se envían datos. Implementación en `src/styles/refinement.css` y `src/components/brief-form.js`. Capturas y comprobaciones específicas: `node qa/monos-comparison/review-result.mjs`. Respaldo: `.backups/before-monos-comparison-2026-10-22.zip`.

### Identidad protagonista y movimiento

El hero da protagonismo al nombre NexoNet y a una versión con volumen del símbolo modular existente. Se recrean patrones de movimiento observados en Monos: entrada coordinada, cinta continua, revelados y transiciones visuales de servicios, con recursos propios y sin cambiar la marca verde/lima. Web Eco abre la secuencia y el acceso directo a IA aparece en su navegación. El recorrido de seis etapas se conserva. Análisis y capturas de referencia en `qa/monos-motion/ANALISIS.md`.

`src/animations/brand-motion.js` comparte GSAP/ScrollTrigger con el scroll existente; no crea otra instancia de Lenis ni otro reloj. La entrada es breve; el monograma responde con límites al ratón y al scroll. La cinta tiene pausa/reanudación y se detiene fuera de pantalla. `prefers-reduced-motion` desactiva el movimiento añadido y responde a cambios durante la sesión. Sin JavaScript se conserva una versión estática, sin controles de pausa inactivos. Recursos propios en `src/components/brand-theatre.js`; estilos en `src/styles/brand-motion.css`. Comprobación: `node tests/brand-motion-check.mjs`; resultados en `qa/brand-motion/`. Respaldo anterior: `.backups/before-brand-motion-2026-10-22.zip`.

### Apertura visual con seis servicios

El título y el monograma se conservan encima de una tarjeta de ancho completo. Orden: Web Eco, IA aplicada, webs y aplicaciones, automatización, diseño e identidad y presentación de espacios. Los cuatro últimos proceden del alcance ya descrito en `siteConfig.services`; no añaden paquetes ni precios. Cada tarjeta tiene una composición propia, una etiqueta que identifica la demostración y un CTA que conserva el servicio seleccionado.

La apertura ocupa la altura disponible bajo el encabezado y termina con una cinta más alta: nombres en negrita e iconos vectoriales propios en lugar de asteriscos. El scroll eleva la siguiente tarjeta sobre la anterior, y funciona en ambos sentidos. Los botones permiten saltar de servicio; admiten flechas, Inicio y Fin. El enlace de detalles evita tener que ver toda la secuencia. Solo la tarjeta activa admite foco e interacción. El formulario conserva la posición de scroll al abrirse.

Se utiliza `position: sticky`, GSAP/ScrollTrigger y el Lenis compartido. En ventanas demasiado bajas, con movimiento reducido o sin JavaScript, las seis tarjetas adoptan altura natural y se leen una detrás de otra. No se añaden APIs ni dependencias. En las pantallas móviles más cortas, el ejemplo de IA se condensa a sus cuatro pasos; la demostración completa permanece en las propuestas.

Contenido: `src/data/entry-services.js`. Recursos y marcado: `src/components/service-deck.js`. Movimiento: `src/animations/service-deck.js`. Estilos: `src/styles/service-deck.css`. Comprobación: `node tests/service-deck-check.mjs`; capturas y resultados en `qa/service-deck/`. Respaldo previo: `.backups/before-service-deck-2026-10-22.zip`.

### Segunda sección: muro de landings ficticias

La cinta enlaza directamente con un muro de seis diseños propios: Brote, Bruma, Línea, Órbita, Rueda y Habita. En escritorio se distribuyen en tres columnas desfasadas, con las laterales y la central desplazándose en sentidos opuestos según el scroll. Hasta 800 px se usan dos columnas con menor desplazamiento. Es lectura natural, sin otra sección fijada ni un segundo motor de scroll. Con movimiento reducido o sin JavaScript se muestra la retícula completa y estática.

Cada imagen abre una vista ampliada, con anterior/siguiente, flechas de teclado, zoom y cierre con Escape. Los nombres bajo el muro también abren las seis imágenes. Sin JavaScript las miniaturas enlazan directamente a los archivos locales. Las etiquetas distinguen marcas ficticias, fotos ilustrativas y escenas conceptuales.

Las dos tarjetas comerciales anteriores se sustituyen por desplegables: precio, alcance, exclusiones, ejemplos y CTA permanecen disponibles. El enlace **Ver los detalles** de la apertura lleva directamente a esos desplegables. Los enlaces a `#web-eco` y `#ia-negocio` abren sus antecesores antes de desplazarse, incluidos enlaces directos al cargar.

Contenido: `src/data/landing-concepts.js`. Marcado y visor: `src/components/landing-wall.js`. Movimiento: `src/animations/landing-wall.js`. Estilos: `src/styles/landing-wall.css`. Las imágenes se renderizan desde composiciones propias de HTML/CSS/SVG con `node scripts/render-concept-landings.mjs`. Las fotografías ya están incluidas; `prepare-concept-photos.mjs` es un helper opcional de mantenimiento, no se ejecuta en producción ni durante el build. Verificación: `node tests/landing-wall-check.mjs`, con evidencias en `qa/landing-wall/`. Respaldo previo: `.backups/before-landing-wall-2026-10-22.zip`.

### Propuestas comerciales destacadas

Antes del recorrido aparecen la entrada comercial y `#propuestas`, con **01 Web Eco** y **02 IA aplicada a tareas reales de negocio**. La etapa Idea no incluye un botón de Web Eco. Se mantienen las seis etapas originales, incluida Diseño, y todas las secciones existentes. El ejemplo conceptual de IA muestra una consulta ficticia, categoría, tarea y borrador pendiente de revisión humana; no ejecuta IA ni envía mensajes.

`src/data/offers.js` centraliza el contenido comercial. La oferta recupera datos de las fuentes anteriores de NexoNet: `../nexonet-astro/src/data/services.ts` (`plans`, EcoWeb y `servicePages`, ecoweb) y `../nexonet-astro/src/components/EcoWebPromo.astro`. Esas fuentes indican precio de partida de **49 € + IVA**, landing de hasta cuatro secciones sobre plantilla adaptada, diseño para móvil y botón de contacto. Dominio, alojamiento y servicios externos figuran aparte. No se han trasladado otros planes o complementos.

Antes de contratar deben confirmarse el alcance e importe final, los plazos y los posibles costes recurrentes. No se anuncia alojamiento, dominio, entrega en un plazo concreto ni otros servicios como incluidos.

La segunda propuesta ofrece valorar integraciones de IA para clasificar consultas, preparar borradores y apoyar tareas repetidas. La viabilidad depende de las herramientas y los datos disponibles; se indica revisión humana de respuestas y validación de acciones. No hay un asistente activo, proveedor o API conectado en esta beta, ni se activan servicios de pago.

`src/data/contactConfig.js` centraliza los destinos confirmados: `email` o `whatsappNumber` (internacional, solo dígitos). Los dos están vacíos. En este estado los CTA abren el formulario con la propuesta y un texto inicial seleccionados; el botón final se llama **Descargar mi resumen** y no envía consultas. La selección se conserva en el archivo. Los borradores editados por el visitante se conservan al reabrir. Si se añade un canal válido y se recompila, los CTA pasan a enlaces directos con un mensaje específico para cada propuesta; el visitante revisa y envía desde su aplicación. Si se configuran ambos, se prioriza WhatsApp. El cierre y el pie usan la misma configuración.

El formulario de resumen descarga siempre un archivo local, incluso si más adelante se configura un canal. En ese caso aparece un acceso alternativo **Preparar un resumen descargable** junto al CTA final de contacto. No se presenta la descarga como envío. Las exclusiones de Web Eco figuran junto al precio tanto en la entrada como en la propuesta detallada; no cambia el alcance confirmado.

Implementación: `src/sections/entry.js`, `src/sections/offers.js`, `src/components/service-demos.js`, `src/components/contact-action.js`, `src/styles/offers.css` y `src/styles/commercial.css`. Verificación comercial: `node tests/offers-check.mjs`; resultados en `qa/offers/`. Respaldo previo a esta reorganización: `.backups/before-commercial-entry-2026-10-22.zip`.

Se ha usado [Arko](https://arko-sushi.midudev.workers.dev/) como referencia de navegación y secuencia editorial. No se ha reutilizado su código, contenido, identidad ni recursos. La identidad V5 es una N modular de dos trazos, con wordmark y exportaciones vectoriales propias.

## Modo claro y oscuro

El botón indica el modo activo: **Modo Claro** con sol o **Modo Oscuro** con luna. En móvil y tableta (hasta 800 px) está dentro del menú responsive; en escritorio permanece en la cabecera. Permite alternar los dos temas. El claro es el modo inicial; la elección se guarda en `localStorage` con la clave `nexonet-theme` y se aplica desde la cabecera HTML al recargar. Si el navegador bloquea el almacenamiento, el botón sigue funcionando durante la sesión. La escena, los bloques editoriales, menús y formularios se adaptan al tema; las muestras de diseño mantienen su propia identidad dentro de sus marcos.

Implementación: `src/components/theme.js` y `src/styles/themes.css`. Comprobación específica: `node tests/theme-check.mjs`; resultados y capturas en `qa/themes/`. Respaldo previo: `.backups/before-theme-toggle-2026-10-22.zip`.

## Los seis vídeos: pendientes de incorporar

Los MP4 no están disponibles en el proyecto. La beta muestra un **estudio vectorial local animado de respaldo**, identificado en pantalla. Su cámara recorre un espacio continuo y responde al scroll en ambas direcciones; no se presenta como vídeo real.

Rutas preparadas:

```text
public/videos/nexonet-01-idea.mp4
public/videos/nexonet-02-diseno.mp4
public/videos/nexonet-03-desarrollo.mp4
public/videos/nexonet-04-automatizacion.mp4
public/videos/nexonet-05-resultado.mp4
public/videos/nexonet-06-evolucion.mp4
```

Objetivo por clip: aproximadamente 8 s, 1920 × 1080, 16:9, MP4/H.264. Ver `public/videos/README.md` para exportación, continuidad y encuadre. No crear MP4 vacíos. Añadir los archivos con estos nombres y volver a compilar activa su carga sin rehacer la landing.

`src/data/journey.js` centraliza rutas, duración orientativa, textos, posters y posición de encuadre. `scripts/prepare-media.mjs` genera `public/videos/available.json` antes de `dev` y `build`: solo se solicitan clips presentes. Sin clips se presenta el estudio vectorial propio, sin etiquetas de contenido pendiente ni peticiones MP4 fallidas. Al añadir archivos hay que reiniciar dev o volver a compilar. El controlador utiliza la duración real del vídeo. La carga comienza con el clip actual; la siguiente escena se aproxima pasado el 52 % del tramo. Los clips alejados se liberan. Un error de carga mantiene el respaldo local. El último 10 % permite mezclar con el siguiente clip si está listo.

Un único Lenis usa el ticker de GSAP; un ScrollTrigger convierte el progreso del recorrido en escena y tiempo local. No hay autoplay ni un segundo reloj de animación. Las peticiones de seek pendientes se conservan mientras el navegador decodifica para que el rebobinado termine en el tiempo solicitado.

La galería comparte el mismo Lenis y ticker. En pantallas de al menos 801 px de ancho y 860 px de alto, el bloque queda fijado bajo la cabecera mientras el scroll vertical desplaza los proyectos horizontalmente del 01 al 03. Al subir, el recorrido se invierte. En móvil y pantallas bajas se ofrece un recorrido vertical con aparición suave e indicador de proyecto fijo, dejando altura natural para que la muestra y sus controles se lean completos. Los botones 01/02/03 y las flechas de teclado navegan a la posición correspondiente. Con movimiento reducido, las tres fichas permanecen estáticas y legibles. No se añade otra instancia de Lenis.

El bloque animado de proyectos ocupa toda la altura disponible bajo la cabecera y amplía la visualización para llegar hasta el borde inferior de la pantalla. A continuación permanecen los dos desplegables originales `project-lab`: sistema de consultas y presentación de espacios. No hay botones de exploración añadidos ni accesos duplicados.

Con `prefers-reduced-motion` se muestran las seis etapas con sus posters estáticos y no se solicitan MP4. La preferencia responde a cambios durante la sesión. El HTML de producción está prerenderizado para conservar lectura, enlaces y FAQ sin JavaScript.

## Archivos principales

- `src/data/siteConfig.js`: negocio, servicios, muestras, dominio y datos SEO verificados.
- `src/data/contactConfig.js`: email o WhatsApp confirmados; vacíos en esta beta.
- `src/data/journey.js`: seis escenas y contrato de tiempo.
- `src/animations/video-journey.js`: medios, seek reversible, carga próxima, fallback y navegación.
- `src/animations/scroll.js`: única integración Lenis/GSAP y adaptación al movimiento reducido.
- `src/animations/project-gallery.js` y `src/styles/project-scroll.css`: recorrido de los proyectos, selección sincronizada, adaptación a pantallas pequeñas y limpieza al cambiar de modo.
- `src/components/journey-art.js`: escenario vectorial propio y cámara común.
- `src/components/logo.js`: identidad modular V5.
- `src/sections/`: recorrido, bloques editoriales, servicios, proyectos, demos y contacto.
- `src/styles/v5.css`: diseño claro y adaptación responsive. `showcases.css` conserva las ilustraciones y estructuras útiles de las demos anteriores.
- `scripts/prerender.mjs`: HTML estático de producción.
- `scripts/generate-posters.mjs` y `scripts/generate-brand.mjs`: exportación de recursos SVG propios.

El renderer Three.js y las capas de composición anteriores se han retirado de esta beta. Su código queda en el respaldo anterior a V5. La V5 no descarga un motor 3D ni recursos de la referencia.

## Contacto e integraciones pendientes

No hay email, teléfono, WhatsApp ni endpoint real configurados en la V5 ni en las variables públicas de contacto de las versiones Astro revisadas. `src/data/contactConfig.js` es el único lugar que hay que completar para email o WhatsApp. No hay un endpoint de formulario conectado. El CTA **Preparar y descargar resumen** abre el formulario; **Descargar mi resumen** valida y descarga un `.txt` local. Antes y después se explica que no se ha enviado una consulta. No hay persistencia, backend ni analítica.

No se ha encontrado una URL verificada de Cerca Estates; no se publica un enlace o colaboración nuevos. El estudio inmobiliario sigue siendo conceptual. No hay clientes, testimonios, métricas, precios ni condiciones inventadas.

Antes de publicar: configurar un canal real de contacto, dominio HTTPS (`url`), datos legales y, si procede, `schema` verificado y URL de Cerca Estates. El recurso vectorial existente sirve como recorrido; los seis clips propios son opcionales. Antes de contratar Web Eco siguen pendientes alcance e importe final, plazos y posibles costes recurrentes; dominio, alojamiento y servicios externos van aparte. La integración de IA necesita valorar herramientas, datos y viabilidad. Para difusión social conviene exportar el SVG de Open Graph a PNG/JPG.

## Verificación

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run test:browser
```

El test de navegador requiere el servidor local activo. `CHROME_PATH` permite indicar otro ejecutable Chromium; `BASE_URL` permite otro puerto. Las pruebas comprueban seis tamaños, todas las etapas, reversibilidad, saltos por enlace y teclado, ausencia de overflow, galería, CRM, comparador, FAQ, menú, diálogos y contenido del resumen descargado. También incluyen movimiento reducido y su cambio durante la sesión, ausencia de JavaScript y errores de vídeo.

Para verificar el controlador de medios, la prueba crea un MP4 H.264 sintético mediante MediaRecorder y lo sirve solo por interceptación de Playwright. Comprueba avance y rebobinado reales del decodificador. Ese archivo queda en `qa/v5/`, **no en `public/` ni en `dist/`**, y no es metraje del proyecto. Esta prueba requiere un Chromium con MediaRecorder H.264. Las capturas e informes están en `qa/v5/`.

El comportamiento y rendimiento con los seis clips definitivos sigue pendiente de validación en móviles físicos, Safari y Firefox. No se promete una tasa de frames ni resultados de negocio.

`node tests/project-scroll-check.mjs` verifica específicamente el recorrido 01 → 03 y su retroceso, selección por botones y teclado, encuadre, controles de las demos visibles, modos claro/oscuro, resize y movimiento reducido. Informes y capturas en `qa/project-scroll/`. Respaldo previo: `.backups/before-project-scroll-2026-10-22.zip`.

## Beta para GitHub Pages

Preparar: npm.cmd run build:pages. Comprobar: node tests/pages-check.mjs.
La salida dist/ usa rutas relativas para funcionar también bajo /nexonet-v2-beta/. Incluye .nojekyll y solicita no indexar la beta. El build local habitual se conserva.

Publicar con una sesión de GitHub disponible: powershell -ExecutionPolicy Bypass -File scripts/publish-pages.ps1.
El script crea un repositorio público dedicado y sube exclusivamente la web compilada a beta-pages, sin código fuente, backups ni archivos de trabajo. Se detiene si el nombre ya pertenece a un repositorio ajeno a esta preparación. No activa servicios de pago.

El formulario de esta beta mantiene el comportamiento existente: descarga un resumen y no envía consultas ni recoge feedback. Los comentarios se pueden recibir por el canal en que se comparta el enlace.

