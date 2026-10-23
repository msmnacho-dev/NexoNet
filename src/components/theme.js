const storageKey='nexonet-theme';

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
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#131c17':'#f6f7f1');
  }
  // The approved light design remains the default. A saved choice takes priority.
  apply(root.dataset.theme||'light');
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
  window.addEventListener('storage',event=>{
    if(event.key===storageKey)apply(event.newValue==='dark'?'dark':'light');
  });
}
