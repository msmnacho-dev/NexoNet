# Selector claro / oscuro

Verificado el 22 de octubre de 2026 en la beta local.

- Compilación y 5 pruebas de contenido correctas.
- Comprobaciones de tema en Chromium a 1440, 1024, 768, 601, 390 y 320 px.
- Selector dentro del menú responsive hasta 800 px; oculto cuando el menú está cerrado. En escritorio se mantiene en la cabecera.
- Texto e icono muestran el estado actual: Modo Claro con sol y Modo Oscuro con luna.
- Cambio claro/oscuro, vuelta a claro, activación por teclado y preferencia conservada tras recargar.
- Cabecera sin controles superpuestos ni desbordamiento horizontal.
- Contraste del titular principal oscuro: 15,43:1; párrafo: 9:1 sobre la base de texto.
- Menú y formulario revisados visualmente en móvil oscuro.
- Botón operativo cuando el navegador bloquea lectura y escritura de localStorage.
- Sin errores JavaScript en las comprobaciones.

Capturas: `dark-1440.png`, `dark-390.png`, `dark-mobile-menu.png`, `dark-mobile-form.png`. Datos: `results.json`.
