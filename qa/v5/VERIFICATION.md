# NexoNet V5 · Verificación local

Fecha: 22 de octubre de 2026. Proyecto: `D:/GITHUB_REP/nexonet-v2-beta`.

## Resultado

- `npm.cmd test`: 5 pruebas correctas.
- `npm.cmd run build`: compilación y prerenderizado correctos.
- `npm.cmd run test:browser`: correcto, sin errores de JavaScript.
- Preview existente en `http://127.0.0.1:4322`: HTTP 200.

## Navegador

Chromium local, pruebas automatizadas con Playwright. Tamaños: 1440×900, 1024×768, 768×900, 390×844, 375×667 y 320×568.

En cada tamaño se comprobaron las seis etapas, sincronización del indicador, cambio reversible de encuadre, salto directo y por teclado, foco en el titular seleccionado, separación entre titular/cabecera/controles y ausencia de desbordamiento horizontal. En móvil se revisó visualmente la navegación en dos filas.

Se probaron las tres muestras de la galería, la consulta simulada del proyecto web, el CRM manual, el comparador inmobiliario, la FAQ, apertura y cierre de diálogos, menú móvil y descarga del resumen con los datos introducidos. Estas acciones no envían comunicaciones.

Con movimiento reducido se muestran las seis etapas estáticas sin solicitudes MP4. Se comprobó el cambio de preferencia durante la sesión. Sin JavaScript, el HTML de producción mantiene seis etapas legibles, navegación y contenido editorial.

## Medios

Se interceptaron las seis rutas MP4 como 404 para verificar el respaldo local. La primera vista solo intenta cargar el clip actual, sin descargar todos los clips de golpe.

Para probar el controlador real se creó un MP4 H.264 sintético de aproximadamente 2,5 segundos con MediaRecorder. Playwright lo sirvió con soporte Range, exclusivamente durante la prueba. Se verificó el tiempo real del decodificador al avanzar y retroceder, en cada una de las seis rutas, incluyendo saltos entre escenas.

La primera versión del servidor simulado no anunciaba soporte Range; se corrigió el servidor de prueba para permitir seeks. El controlador mantiene el respaldo si todavía no existe un intervalo temporal navegable.

El archivo de prueba `seek-fixture.mp4` está en `qa/v5/`. No está incluido en `public/` o `dist/` y no se presenta como metraje de NexoNet. Los seis clips definitivos siguen pendientes. La continuidad y el rendimiento con ese metraje deben revisarse cuando esté disponible, incluyendo Safari, Firefox y móviles físicos.

## Recursos y límites

Identidad vectorial V5 propia, posters y escenario local. Ningún recurso de Arko utilizado. Sin APIs, servicios de envío ni costes externos añadidos. No hay email, endpoint, dominio público ni URL de Cerca Estates configurados.

La composición y el renderer anteriores se archivaron en `.backups/before-v5-2026-10-22.zip`. Se ha trabajado en la beta existente; no se ha promovido la versión principal.

El build emite aproximadamente 39,5 kB de CSS (9,5 kB gzip) y 170,7 kB de JS (64,0 kB gzip), además de fuentes locales y recursos vectoriales. No incluye un motor Three.js ni metraje de vídeo.

Detalle estructurado: `results.json`. Capturas por etapa y viewport: `stage-*.png`.
