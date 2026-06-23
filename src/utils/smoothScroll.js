// Scroll programmé sur durée custom — le `scroll-behavior: smooth` natif
// ne laisse pas régler la durée, ce qui donne une transition trop rapide
// pour un site éditorial. easeInOutQuart pour une montée/descente posée.

const easeInOutQuart = (t) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

export function smoothScrollTo(targetY, duration = 1100) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 1) return;

  // ⚠️ scroll-snap-type: y mandatory (+ scroll-snap-stop: always) recrante la
  // page sur CHAQUE section traversée pendant qu'on scrolle frame par frame →
  // bagarre avec l'animation = défilement saccadé sur un saut long (ex: 1→4).
  // On coupe le snap le temps de l'animation, on le rétablit à l'arrivée : la
  // cible étant déjà centrée, le re-snap final est invisible.
  const root = document.documentElement;
  const prevSnap = root.style.scrollSnapType;
  root.style.scrollSnapType = "none";

  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    // behavior: 'instant' évite que le scroll-behavior:smooth global
    // ne re-lisse chaque frame et casse l'animation.
    window.scrollTo({ top: startY + distance * easeInOutQuart(t), behavior: "instant" });
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      root.style.scrollSnapType = prevSnap;
    }
  }
  requestAnimationFrame(step);
}

// Centre l'élément dans le viewport — cohérent avec scroll-snap-align: center.
export function smoothScrollToElement(element, duration = 1100) {
  if (!element) return;
  const rect = element.getBoundingClientRect();
  const targetY = window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2;
  smoothScrollTo(targetY, duration);
}
