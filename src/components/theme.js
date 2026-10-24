const storageKey='nexonet-theme';
const paletteKey='nexonet-palette';
const palettes=[['#b42332','#f6a6a8'],['#c84c43','#ffd1bd'],['#a96513','#f1cb79'],['#687a2e','#d5df8c'],['#28734a','#a6d8a8'],['#008875','#98ddd0'],['#087e91','#a6e3e8'],['#2269a5','#a8d5f0'],['#405bc1','#b9c5ff'],['#6650a4','#d0bdf2'],['#994b9c','#ecc1e5'],['#bd4279','#ffc1d4'],['#cf4a3e','#f3b7ae'],['#bf6329','#f5cfad'],['#9e7c17','#eddc9f'],['#718f2e','#d7e6aa'],['#448045','#b5d7ad'],['#2e9b88','#b3e0d4'],['#078b9e','#b1e3e9'],['#3d789b','#bcd6e4'],['#4e52ba','#c3c5ef'],['#7a65ae','#d2c8ef'],['#a44b9d','#e8c4e2'],['#bf427b','#f1b7ce']];

function complementaryColor(hex) {
  const value=hex.replace('#','');
  const [r,g,b]=[0,2,4].map(index=>parseInt(value.slice(index,index+2),16)/255);
  const max=Math.max(r,g,b),min=Math.min(r,g,b),delta=max-min;
  let hue=0;
  if(delta) {
    if(max===r) hue=60*(((g-b)/delta)%6);
    else if(max===g) hue=60*((b-r)/delta+2);
    else hue=60*((r-g)/delta+4);
  }
  hue=(hue+180+360)%360;
  const saturation=0.72,lightness=0.55;
  const chroma=(1-Math.abs(2*lightness-1))*saturation;
  const x=chroma*(1-Math.abs((hue/60)%2-1));
  const offset=lightness-chroma/2;
  const channels=hue<60?[chroma,x,0]:hue<120?[x,chroma,0]:hue<180?[0,chroma,x]:hue<240?[0,x,chroma]:hue<300?[x,0,chroma]:[chroma,0,x];
  return `#${channels.map(channel=>Math.round((channel+offset)*255).toString(16).padStart(2,'0')).join('')}`;
}

function contrastingInk(hex) {
  const channels=[0,2,4].map(index=>parseInt(hex.slice(index+1,index+3),16)/255).map(channel=>channel<=0.04045?channel/12.92:((channel+0.055)/1.055)**2.4);
  const luminance=channels[0]*0.2126+channels[1]*0.7152+channels[2]*0.0722;
  const darkInk=[33,28,36].map(channel=>channel/255).map(channel=>channel<=0.04045?channel/12.92:((channel+0.055)/1.055)**2.4);
  const darkLuminance=darkInk[0]*0.2126+darkInk[1]*0.7152+darkInk[2]*0.0722;
  const darkContrast=(luminance+0.05)/(darkLuminance+0.05);
  const lightContrast=1.05/(luminance+0.05);
  return lightContrast>darkContrast?'#ffffff':'#211c24';
}

export function initTheme() {
  const root=document.documentElement;
  const button=document.querySelector('#theme-toggle');
  function apply(theme) {
    const dark=theme==='dark';
    root.dataset.theme=dark?'dark':'light';
    const current=`Modo ${dark?'Oscuro':'Claro'}`;
    const action=`Cambiar a modo ${dark?'claro':'oscuro'}`;
    button.setAttribute('aria-label',`${current}. ${action}`);
    button.title=action;
    button.querySelector('[data-theme-label]').textContent=current;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',getComputedStyle(root).getPropertyValue('--bg').trim());
  }
  // The approved light design remains the default. A saved choice takes priority.
  apply(root.dataset.theme||'light');
  function applyPalette(id) {
    const index=Math.max(0,Math.min(23,Number(id?.slice(1))-1||0));
    const selected=`p${index+1}`;
    root.dataset.palette=selected;
    root.style.setProperty('--brand-accent',palettes[index][0]);
    const complement=complementaryColor(palettes[index][0]);
    root.style.setProperty('--brand-complement',complement);
    root.style.setProperty('--brand-ribbon-ink',contrastingInk(complement));
    root.style.setProperty('--lime',palettes[index][1]);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',getComputedStyle(root).getPropertyValue('--bg').trim());
    document.querySelectorAll('[data-palette-choice]').forEach(option=>option.setAttribute('aria-pressed',String(option.dataset.paletteChoice===selected)));
  }
  let savedPalette='p9';
  try { savedPalette=localStorage.getItem(paletteKey)||'p9'; } catch { /* Palette still works without storage. */ }
  applyPalette(savedPalette);
  const responsive=matchMedia('(max-width:800px)');
  const nav=document.querySelector('#main-nav');
  const actions=document.querySelector('.header-actions');
  const placeButton=()=>responsive.matches?nav.append(button):actions.prepend(button);
  placeButton();
  responsive.addEventListener('change',placeButton);
  button.addEventListener('click',()=>{
    const theme=root.dataset.theme==='dark'?'light':'dark';
    apply(theme);
    try { localStorage.setItem(storageKey,theme); } catch { /* Still works without storage access. */ }
  });
  const paletteDialog=document.querySelector('#palette-dialog');
  const paletteOpen=document.querySelector('#palette-open');
  if(paletteOpen)paletteOpen.addEventListener('click',()=>{
    nav.classList.remove('open');
    document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');
    paletteDialog.showModal();
  });
  paletteDialog.querySelector('.palette-close').addEventListener('click',()=>paletteDialog.close());
  paletteDialog.addEventListener('click',event=>{if(event.target===paletteDialog)paletteDialog.close();});
  paletteDialog.querySelectorAll('[data-palette-choice]').forEach(option=>option.addEventListener('click',()=>{
    applyPalette(option.dataset.paletteChoice);
    try { localStorage.setItem(paletteKey,option.dataset.paletteChoice); } catch { /* Still works without storage access. */ }
  }));
  window.addEventListener('storage',event=>{
    if(event.key===storageKey)apply(event.newValue==='dark'?'dark':'light');
    if(event.key===paletteKey)applyPalette(event.newValue||'p9');
  });
}
