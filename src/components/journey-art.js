// Escenario vectorial original. Una única cámara recorre un pabellón continuo.
// El movimiento es una previsualización local; no pretende ser metraje de vídeo.
export function journeyArt(prefix='journey', progress=0) {
  return `<svg class="journey-art" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${prefix}-sky" x2="0" y2="1"><stop stop-color="#f7f7f1"/><stop offset="1" stop-color="#e0e7d7"/></linearGradient>
    <linearGradient id="${prefix}-stone" x2=".9" y2="1"><stop stop-color="#fff"/><stop offset=".65" stop-color="#e8eddf"/><stop offset="1" stop-color="#c0cbb1"/></linearGradient>
    <linearGradient id="${prefix}-green" x2="1" y2="1"><stop stop-color="#f7c9cb"/><stop offset="1" stop-color="#b84b55"/></linearGradient>
    <linearGradient id="${prefix}-glass" x2=".7" y2="1"><stop stop-color="#ffffff" stop-opacity=".96"/><stop offset="1" stop-color="#dce8cc" stop-opacity=".86"/></linearGradient>
    <radialGradient id="${prefix}-halo"><stop stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <filter id="${prefix}-shadow" x="-40%" y="-40%" width="180%" height="200%"><feDropShadow dx="10" dy="20" stdDeviation="18" flood-color="#4d6132" flood-opacity=".14"/></filter>
  </defs>
  <rect width="1600" height="900" fill="url(#${prefix}-sky)"/>
  <ellipse cx="1080" cy="230" rx="780" ry="510" fill="url(#${prefix}-halo)"/>
  <g data-world-camera transform="translate(0 0)">
    <path d="M-900 620 2000 400 3700 1060 -900 1450Z" fill="#e7ebdf"/>
    <g stroke="#b9c6ab" stroke-opacity=".34" fill="none"><path d="M-500 830 2400 575M-200 1010 2800 750M250 1220 3200 920M280 580 1620 1340M770 540 2300 1280M1280 500 2910 1180"/></g>
    <ellipse cx="1190" cy="652" rx="540" ry="65" fill="#9cae861f"/>
    <g filter="url(#${prefix}-shadow)">
      <path d="m660 614 460-91 536 150-449 107Z" fill="#c2ceb3"/><path d="m660 597 460-91 536 150-449 107Z" fill="#f8faf3"/><path d="m660 597 547 166v17L660 614Z" fill="#d2dcc6"/>
      <path d="M790 590V342c0-130 191-130 191 0v110h-58V342c0-52-75-52-75 0v248Z" fill="url(#${prefix}-stone)"/>
      <path d="m790 590 24 8V342c0-111 167-111 167 0-3-130-191-130-191 0Z" fill="#fff"/>
      <path d="M907 374h59v175c0 52 75 52 75 0V374h59v175c0 130-193 130-193 0Z" fill="url(#${prefix}-green)"/>
      <path d="m1100 374 18 8v167c0 141-208 141-211 0 0 130 193 130 193 0Z" fill="#bd6972"/>
      <g transform="translate(1170 260) rotate(8)">
        <rect x="15" y="18" width="290" height="260" rx="15" fill="#c7d1ba"/><rect width="290" height="260" rx="15" fill="url(#${prefix}-glass)" stroke="#fff" stroke-width="3"/>
        <path d="M25 44H265" stroke="#c8d3bd"/><circle cx="29" cy="24" r="4" fill="#8eac68"/>
        <rect x="26" y="69" width="90" height="8" rx="4" fill="#c56870"/><rect x="26" y="93" width="194" height="15" rx="5" fill="#374b2d"/>
        <rect x="26" y="119" width="145" height="15" rx="5" fill="#374b2d"/><rect x="26" y="162" width="237" height="36" rx="5" fill="#f9fcf5" stroke="#b7c8a4"/>
        <rect x="26" y="212" width="133" height="26" rx="5" fill="#f2a4a8"/>
      </g>
      <g transform="translate(1500 355) rotate(8)"><rect x="24" y="28" width="230" height="260" rx="13" fill="#d1dcc5" stroke="#adbf98"/><rect x="12" y="14" width="230" height="260" rx="13" fill="#e5edda" stroke="#b9cba5"/><rect width="230" height="260" rx="13" fill="#fafcf7" stroke="#fff" stroke-width="3"/>
        <path d="M25 52h180M25 117h180M25 182h180" stroke="#cfdbc2"/><g fill="#56743a"><rect x="25" y="24" width="85" height="8" rx="4"/><rect x="25" y="77" width="134" height="10" rx="4"/><rect x="25" y="142" width="112" height="10" rx="4"/><rect x="25" y="208" width="155" height="10" rx="4"/></g><g fill="#e58b91"><circle cx="194" cy="82" r="10"/><circle cx="194" cy="148" r="10"/><circle cx="194" cy="212" r="10"/></g>
        <g fill="none" stroke="#b42332" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          ${[82,148,212].map(y=>`<path data-build-check d="m190 ${y} 3 3 5-6"/>`).join('')}
        </g>
        <path d="M25 241H205" stroke="#e0e9d7" stroke-width="4" stroke-linecap="round"/>
        <path data-build-progress d="M25 241H205" pathLength="1" stroke="#7f9d5d" stroke-width="4" stroke-linecap="round"/>
      </g>
      <g fill="none" stroke="#7f9d5d" stroke-width="3"><path d="M1600 665Q1700 575 1810 610T2070 610"/><path d="M1800 610 1930 440 2130 465"/><path d="M1800 610 1950 765 2160 730"/></g>
      ${[[1800,610],[1930,440],[2070,610],[1950,765],[2160,730]].map(([x,y],i)=>`<g transform="translate(${x} ${y})"><ellipse rx="66" ry="25" fill="#b6c6a3"/><ellipse cy="-10" rx="66" ry="25" fill="${i===2?'#f0787d':'#fbfdf7'}"/><circle cy="-15" r="9" fill="#b42332"/></g>`).join('')}
      <g transform="translate(2290 410)"><path d="m-60 260 130-40 120 48-140 40Z" fill="#bdcba9"/><rect width="170" height="250" rx="16" fill="#fcfdf8" stroke="#fff" stroke-width="4"/><rect x="23" y="23" width="124" height="75" rx="7" fill="#d1eba8"/><path d="m70 60 14 13 27-30" fill="none" stroke="#557931" stroke-width="6"/><path d="M23 126h104M23 157h78M23 188h115M23 219h88" stroke="#a6bd8e" stroke-width="7" stroke-linecap="round"/></g>
      <g transform="translate(2590 420)"><path d="m0 200 120-35 130 45-122 40Z" fill="#c0ceb0"/><path d="M20 193V50c0-78 120-78 120 0v143h-38V50c0-29-44-29-44 0v143Z" fill="url(#${prefix}-stone)"/><path d="M100 120h37v106c0 30 44 30 44 0V120h38v106c0 79-119 79-119 0Z" fill="url(#${prefix}-green)"/></g>
      <g transform="translate(2820 500)"><ellipse cy="151" rx="67" ry="20" fill="#bacba3"/><path d="M-30 150V83h60v67" fill="#ebeedf"/><path d="M0 90C-100 19-42-26 0 49 40-42 108 13 0 90Z" fill="#90b563"/><path d="M0 90V25" stroke="#688b45" stroke-width="3"/></g>
    </g>
  </g>
  </svg>`;
}

export function cameraPose(progress) {
  const p=Math.min(1,Math.max(0,progress));
  // Cámara común a las seis secuencias: avance y apertura final del encuadre.
  const zoom=1.12 + .12*Math.sin(p*Math.PI) - .64*Math.max(0,(p-.66)/.34);
  const focus=1110 + 1540*Math.min(1,p/.82);
  const x=1120-focus*zoom;
  const y=460-470*zoom;
  return {x,y,zoom};
}
