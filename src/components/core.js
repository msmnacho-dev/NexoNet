export function core(id = 'core') {
  return `<div class="core" id="${id}" aria-hidden="true">
    <div class="core-orbit orbit-one"></div><div class="core-orbit orbit-two"></div>
    <div class="core-body"><div class="core-face face-top"></div><div class="core-face face-left"></div><div class="core-face face-right"></div><div class="core-seam seam-one"></div><div class="core-seam seam-two"></div><div class="core-center"></div></div>
    <span class="core-mark mark-a">+</span><span class="core-mark mark-b">+</span>
  </div>`;
}

export function room(className = '') {
  return `<div class="room ${className}" role="img" aria-label="Composición geométrica de un salón.">
    <div class="room-window"></div><div class="room-light"></div><div class="room-floor"></div><div class="room-plinth"></div><div class="room-sofa"></div><div class="room-table"></div><div class="room-art"></div><span class="visual-caption">DISEÑO DE INTERIORES</span>
  </div>`;
}

export function plan() {
  return `<svg class="floor-plan" viewBox="0 0 500 340" role="img" aria-label="Plano de distribución interior"><g fill="none" stroke="currentColor" stroke-width="5"><path d="M55 35H445V300H55Z M55 180H225V35 M225 180V300 M225 140H445 M340 140V300"/><path stroke-width="1" d="M70 70h130v90H70z M250 55h170v60H250z M245 205h75v70h-75z M365 165h60v110h-60z"/><path stroke="#41651b" stroke-width="2" d="M225 150a35 35 0 0 1 35 35 M340 175a35 35 0 0 1 35 35"/></g><g fill="currentColor" font-size="12" font-family="inherit"><text x="93" y="125">SALÓN</text><text x="294" y="90">COCINA</text><text x="260" y="247">ESTUDIO</text><text x="366" y="225">DORM.</text></g></svg>`;
}
