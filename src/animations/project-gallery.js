import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { landingConcepts } from '../data/landing-concepts.js';

gsap.registerPlugin(ScrollTrigger);

export function createProjectGallery(lenis, reduced = false) {
  const root = document.querySelector('.project-story');
  if (!root) return () => {};
  const runway = root.querySelector('.project-story-runway');
  const stage = root.querySelector('.projects-stage');
  const frames = [...root.querySelectorAll('[data-story-frame]')];
  const buttons = [...root.querySelectorAll('[data-project-index]')];
  const caption = root.querySelector('[data-story-caption]');
  if (!runway || !stage || frames.length !== landingConcepts.length) return () => {};

  let active = 0;
  const setActive = index => {
    active = Math.max(0, Math.min(frames.length - 1, index));
    buttons.forEach((button, i) => {
      if (i === active) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    const concept = landingConcepts[active];
    if (caption) caption.textContent = `0${active + 1} / ${concept.name} · ${concept.category}`;
  };

  const onPagerClick = event => {
    const button = event.target.closest('[data-project-index]');
    if (!button) return;
    const index = Number(button.dataset.projectIndex);
    if (reduced) {
      setActive(index);
      frames[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const trigger = ScrollTrigger.getById('project-story-scroll');
    if (!trigger) return;
    const destination = trigger.start + (trigger.end - trigger.start) * ((index + .30) / frames.length);
    if (lenis) lenis.scrollTo(destination, { duration: .8, onComplete: () => setActive(index) });
    else { setActive(index); window.scrollTo({ top: destination, behavior: 'smooth' }); }
  };
  root.querySelector('.project-pager')?.addEventListener('click', onPagerClick);

  if (reduced) {
    root.classList.add('is-story-static');
    frames.forEach((frame, index) => {
      gsap.set(frame, { clearProps: 'all' });
      frame.style.setProperty('--story-index', index);
    });
    return () => {
      root.querySelector('.project-pager')?.removeEventListener('click', onPagerClick);
      root.classList.remove('is-story-static');
    };
  }

  root.classList.add('is-story-scroll');
  const width = () => window.innerWidth;
  const height = () => window.innerHeight;
  const peakScale = frame => {
    const copy = root.querySelector('.project-story-copy');
    if (!copy || !frame.offsetWidth || !frame.offsetHeight) return 1.7;
    return Math.max((copy.offsetWidth + 28) / frame.offsetWidth, (copy.offsetHeight + 28) / frame.offsetHeight, 1.15);
  };
  const paths = [
    { fromX: -.27, fromY: -.76, toX: -.36, toY: -.32, fadeX: -.35, fadeY: -.28 },
    { fromX: .21, fromY: .88, toX: .28, toY: .18, fadeX: .31, fadeY: .25 },
    { fromX: -.08, fromY: -.61, toX: -.04, toY: .22, fadeX: .06, fadeY: .32 },
    { fromX: .32, fromY: .73, toX: .3, toY: -.16, fadeX: .34, fadeY: -.22 },
    { fromX: -.34, fromY: -.91, toX: -.27, toY: .08, fadeX: -.31, fadeY: .21 },
    { fromX: .09, fromY: .58, toX: .1, toY: .3, fadeX: .14, fadeY: .33 }
  ];
  frames.forEach((frame, index) => {
    const path = paths[index % paths.length];
    gsap.set(frame, {
      x: () => width() * path.fromX,
      y: () => height() * path.fromY,
      scale: .025,
      rotation: index % 2 ? 8 : -8,
      autoAlpha: 0,
      zIndex: 1
    });
  });

  const timeline = gsap.timeline({
    scrollTrigger: {
      id: 'project-story-scroll',
      trigger: runway,
      start: 'top top',
      end: () => `+=${Math.max(1, window.innerHeight * (frames.length - 1))}`,
      pin: stage,
      pinSpacing: false,
      scrub: .7,
      invalidateOnRefresh: true,
      onUpdate: self => setActive(Math.min(frames.length - 1, Math.floor(self.progress * frames.length)))
    }
  });

  frames.forEach((frame, index) => {
    const path = paths[index % paths.length];
    const start = index / frames.length;
    const exit = start + .075;
    timeline.fromTo(frame,
      { x: () => width() * path.fromX, y: () => height() * path.fromY, scale: .025, rotation: index % 2 ? 8 : -8, autoAlpha: 0, zIndex: 8 },
      { x: () => width() * path.toX, y: () => height() * path.toY, scale: () => peakScale(frame), rotation: 0, autoAlpha: 1, zIndex: 8, duration: .055, ease: 'power4.in' }, start
    );
    timeline.to(frame, { duration: .012 }, start + .055);
    timeline.to(frame, {
      x: () => width() * path.fadeX,
      y: () => height() * path.fadeY,
      autoAlpha: 0, duration: .09, ease: 'none'
    }, exit);
  });

  const onKeydown = event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key) || !event.target.matches('.project-pager button')) return;
    event.preventDefault();
    const next = (active + (event.key === 'ArrowRight' ? 1 : -1) + frames.length) % frames.length;
    buttons[next]?.focus();
    buttons[next]?.click();
  };
  root.querySelector('.project-pager')?.addEventListener('keydown', onKeydown);

  return () => {
    root.querySelector('.project-pager')?.removeEventListener('click', onPagerClick);
    root.querySelector('.project-pager')?.removeEventListener('keydown', onKeydown);
    timeline.scrollTrigger?.kill();
    timeline.kill();
    root.classList.remove('is-story-scroll');
    gsap.set(frames, { clearProps: 'all' });
  };
}
