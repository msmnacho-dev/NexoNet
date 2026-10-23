# Clips del recorrido NexoNet V5

Los seis MP4 todavía no están incluidos. No crear archivos vacíos con estas extensiones.
La web muestra un estudio vectorial local animado cuando no encuentra un clip.
`npm.cmd run dev` y `npm.cmd run build` generan `available.json` con los archivos presentes. Después de añadir clips, reinicia dev o recompila. El navegador solo solicita los MP4 incluidos en ese manifiesto; sin clips, el estudio vectorial es el recorrido completo.

Coloca aquí:

1. `nexonet-01-idea.mp4`
2. `nexonet-02-diseno.mp4`
3. `nexonet-03-desarrollo.mp4`
4. `nexonet-04-automatizacion.mp4`
5. `nexonet-05-resultado.mp4`
6. `nexonet-06-evolucion.mp4`

Objetivo: unos 8 s por clip, 1920 × 1080, 16:9, MP4 H.264, sin audio.
Exportar con fast start (moov al inicio) y fotogramas clave frecuentes (aprox. cada 0,25–0,5 s) para facilitar el seek.
Mantener cámara, dirección, exposición y composición entre el final de un clip y el principio del siguiente.
Reservar la zona izquierda para los textos en escritorio y la parte superior en móvil.
Usar metraje propio; no utilizar recursos de Arko.

Configuración: `src/data/journey.js`. La duración declarada es orientativa: el controlador utiliza la duración real del archivo cuando está disponible. Se carga la escena actual y se aproxima la siguiente, con una transición entre clips en el último 10 % del tramo.
El servidor definitivo debe servir los MP4 con `Content-Type: video/mp4` y peticiones Range. El rendimiento final del rebobinado depende de la codificación, el navegador y el dispositivo.
