import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import logo2 from "./assets/logo2.svg";

const MotionSpan = motion.span;

// Pour le menu mobile : spring "liquid" (pas de scroll → pas de temps réel).
const liquidSpring = {
  type: "spring",
  stiffness: 220,
  damping: 24,
  mass: 0.5,
};

// Indicateur DESKTOP piloté par le scroll : la pilule est interpolée en
// continu entre l'item de la section précédente et celui de la section
// suivante, en fonction de la position du centre du viewport. Pas de spring,
// pas d'attente → aucune latence visible entre le scroll et la pilule.
function ScrollIndicator({
  parentRef,
  items,
  indicatorStyle,
  onActiveChange,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const width = useMotionValue(0);
  const height = useMotionValue(0);
  const scaleX = useMotionValue(1);
  const scaleY = useMotionValue(1);
  const opacity = useMotionValue(0);

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;

    let sections = [];
    let navRects = [];
    let lastActiveIdx = -1;
    let lastTime = performance.now();
    let lastTargetX = 0;
    let raf = null;

    const measure = () => {
      sections = items
        .map((it) => {
          const el = document.getElementById(it.id);
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { id: it.id, top: r.top + window.scrollY, height: r.height };
        })
        .filter(Boolean);

      const pr = parent.getBoundingClientRect();
      navRects = items
        .map((it) => {
          const el = parent.querySelector(`[data-navid="${it.id}"]`);
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return {
            id: it.id,
            x: r.left - pr.left,
            y: r.top - pr.top,
            width: r.width,
            height: r.height,
          };
        })
        .filter(Boolean);
    };

    const update = () => {
      raf = null;
      // Remesure à chaque frame → aucun cache figé, le déplacement et
      // la taille suivent EN PERMANENCE l'état actuel des <a> (resize,
      // zoom navigateur, changement de breakpoint…).
      measure();
      // Parent caché (display: none en mobile) ou pas encore prêt → pilule invisible
      if (
        sections.length === 0 ||
        navRects.length === 0 ||
        navRects.every((r) => r.width === 0)
      ) {
        opacity.set(0);
        return;
      }

      const vc = window.scrollY + window.innerHeight / 2;
      let prev = -1;
      let next = -1;
      for (let i = 0; i < sections.length; i++) {
        const c = sections[i].top + sections[i].height / 2;
        if (c <= vc) prev = i;
        else {
          next = i;
          break;
        }
      }

      let tx;
      let ty;
      let tw;
      let th;
      let activeIdx;

      if (prev >= 0 && next >= 0) {
        const pc = sections[prev].top + sections[prev].height / 2;
        const nc = sections[next].top + sections[next].height / 2;
        const p = (vc - pc) / (nc - pc);
        const pr2 = navRects[prev];
        const nr = navRects[next];
        tx = pr2.x + (nr.x - pr2.x) * p;
        ty = pr2.y + (nr.y - pr2.y) * p;
        tw = pr2.width + (nr.width - pr2.width) * p;
        th = pr2.height + (nr.height - pr2.height) * p;
        // L'item "activé" (texte agrandi) bascule au passage du milieu.
        activeIdx = p < 0.5 ? prev : next;
      } else if (prev >= 0) {
        const r = navRects[prev];
        tx = r.x;
        ty = r.y;
        tw = r.width;
        th = r.height;
        activeIdx = prev;
      } else if (next >= 0) {
        const r = navRects[next];
        tx = r.x;
        ty = r.y;
        tw = r.width;
        th = r.height;
        activeIdx = next;
      } else {
        return;
      }

      // Stretch liquid : on déforme la pilule en fonction de sa vitesse
      // horizontale. Scroll rapide → plus d'étirement. Inertie naturelle.
      const now = performance.now();
      const dt = now - lastTime;
      const dx = Math.abs(tx - lastTargetX);
      const velocity = dt > 0 ? dx / dt : 0;
      lastTime = now;
      lastTargetX = tx;
      const stretch = Math.min(velocity * 0.025, 0.18);

      x.set(tx);
      y.set(ty);
      width.set(tw);
      height.set(th);
      scaleX.set(1 + stretch);
      scaleY.set(1 - stretch * 0.5);
      opacity.set(1);

      if (activeIdx !== lastActiveIdx) {
        lastActiveIdx = activeIdx;
        if (onActiveChange) onActiveChange(sections[activeIdx].id);
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // ResizeObserver : fire dès qu'un <a> (ou le parent) change de taille.
    // Plus fiable que `window.resize` pour les changements de layout dus
    // à un breakpoint, zoom navigateur, font swap, ou reflow indirect.
    const ro = new ResizeObserver(() => {
      onScroll();
    });
    ro.observe(parent);
    items.forEach((it) => {
      const el = parent.querySelector(`[data-navid="${it.id}"]`);
      if (el) ro.observe(el);
    });

    // Polices chargées en différé → on recale les rects.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        measure();
        update();
      });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items, parentRef, onActiveChange, x, y, width, height, scaleX, scaleY, opacity]);

  return (
    <MotionSpan
      aria-hidden="true"
      style={{
        ...indicatorStyle,
        left: 0,
        top: 0,
        x,
        y,
        width,
        height,
        scaleX,
        scaleY,
        opacity,
        transformOrigin: "center",
      }}
    />
  );
}

// Composant indicateur : un seul nœud DOM, anime x/y/width/height
// + un pulse scaleX/scaleY pour le "stretch" liquide mid-transit.
function LiquidIndicator({ parentRef, activeId, indicatorStyle }) {
  const [rect, setRect] = useState(null);
  const firstRender = useRef(true);

  useLayoutEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;
    const measure = () => {
      const active = parent.querySelector(`[data-navid="${activeId}"]`);
      if (!active) return;
      const pr = parent.getBoundingClientRect();
      const ar = active.getBoundingClientRect();
      setRect({
        x: ar.left - pr.left,
        y: ar.top - pr.top,
        width: ar.width,
        height: ar.height,
      });
    };
    measure();
    // Resize → recale la position (largeur viewport, polices chargées tard…)
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeId, parentRef]);

  if (!rect) return null;

  // Au tout premier rendu, on saute l'animation initiale pour ne pas
  // voir la pilule "voler" depuis (0,0) jusqu'à l'item actif.
  const skipInitial = firstRender.current;
  firstRender.current = false;

  return (
    <MotionSpan
      aria-hidden="true"
      style={{
        ...indicatorStyle,
        left: 0,
        top: 0,
      }}
      initial={
        skipInitial
          ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
          : false
      }
      animate={{
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        // Le stretch : élargi en X, comprimé en Y au milieu du trajet.
        // null = part de la valeur courante, peak au milieu, retour à 1.
        scaleX: skipInitial ? 1 : [null, 1.15, 1],
        scaleY: skipInitial ? 1 : [null, 0.9, 1],
      }}
      transition={{
        x: liquidSpring,
        y: liquidSpring,
        width: liquidSpring,
        height: liquidSpring,
        scaleX: { duration: 0.55, ease: [0.34, 1.4, 0.64, 1] },
        scaleY: { duration: 0.55, ease: [0.34, 1.4, 0.64, 1] },
      }}
    />
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const desktopLinksRef = useRef(null);
  const mobileSheetRef = useRef(null);

  // Note : activeId est piloté par ScrollIndicator via onActiveChange.
  // Plus d'IntersectionObserver — on évite la double source de vérité.

  // Fermer au resize (si on repasse desktop)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Bloquer le scroll quand le menu mobile est ouvert.
  // Important: ne rien faire quand le menu est fermé pour ne pas écraser
  // un verrou posé ailleurs (ex: pendant l'IntroAnimation au montage).
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const items = [
    { label: "Home", href: "#home" },
    { label: "Projets", href: "#projects" },
    { label: "À propos", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header style={styles.header}>
        <div style={styles.navContainer}>
          {/* Logo positioned on the left, extending beyond navbar */}
          <div style={styles.logoContainer} data-intro-logo-target>
            <div style={styles.logoBox}>
              <img src={logo2} alt="Logo" style={styles.logo} />
            </div>
          </div>

          <nav style={styles.pill}>
            {/* Liens desktop */}
            <div
              ref={desktopLinksRef}
              style={{ ...styles.linksDesktop, position: "relative" }}
              className="nav-links"
            >
              <ScrollIndicator
                parentRef={desktopLinksRef}
                items={items.map((it) => ({ id: it.href.slice(1) }))}
                indicatorStyle={styles.linkActiveBg}
                onActiveChange={setActiveId}
              />
              {items.map((it) => {
                const id = it.href.slice(1);
                const isActive = activeId === id;
                return (
                  <a
                    key={it.href}
                    href={it.href}
                    data-navid={id}
                    style={{
                      ...styles.link,
                      ...(isActive ? styles.linkActiveText : null),
                    }}
                  >
                    <span
                      style={{
                        ...styles.linkLabel,
                        ...(isActive ? styles.linkLabelActive : null),
                      }}
                    >
                      {it.label}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Hamburger mobile */}
            <button
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((v) => !v)}
              style={styles.burgerBtn}
              className="nav-burger"
            >
              <span style={{ ...styles.burgerLine, transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
              <span style={{ ...styles.burgerLine, opacity: open ? 0 : 1 }} />
              <span style={{ ...styles.burgerLine, transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </button>
          </nav>
        </div>
      </header>

      {/* Menu mobile overlay */}
      {open && (
        <div style={styles.overlay} onClick={() => setOpen(false)}>
          <div
            ref={mobileSheetRef}
            style={{ ...styles.sheet, position: "relative" }}
            onClick={(e) => e.stopPropagation()}
          >
            <LiquidIndicator
              parentRef={mobileSheetRef}
              activeId={activeId}
              indicatorStyle={styles.mobileItemActiveBg}
            />
            {items.map((it) => {
              const id = it.href.slice(1);
              const isActive = activeId === id;
              return (
                <a
                  key={it.href}
                  href={it.href}
                  data-navid={id}
                  style={{
                    ...styles.mobileItem,
                    ...(isActive ? styles.mobileItemActiveText : null),
                  }}
                  onClick={() => setOpen(false)}
                >
                  <span style={styles.linkLabel}>{it.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  header: {
    position: "fixed",
    top: 16,
    left: 0,
    right: 0,
    zIndex: 50,
    display: "flex",
    justifyContent: "center",
    pointerEvents: "none",
  },
  navContainer: {
    position: "relative",
    width: "min(980px, calc(100% - 24px))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    position: "absolute",
    left: -15,
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    zIndex: 51,
    pointerEvents: "auto",
  },
  logoBox: {
    width: 158,
    height: 41,
    marginLeft: 20,
    padding: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 135,
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(22px) saturate(180%)",
    WebkitBackdropFilter: "blur(22px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.14)",
    boxShadow:
      "inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 8px 28px rgba(0, 0, 0, 0.28)",
  },
  logo: {
    maxHeight: "100%",
    maxWidth: "100%",
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  pill: {
    pointerEvents: "auto",
    width: "100%",
    height: 56,
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 14px",
    // Cross-browser : Chrome ne supportait que `backdropFilter`, Safari que
    // `WebkitBackdropFilter`. Les deux valeurs DOIVENT être identiques sinon
    // un des deux navigateurs reçoit un blur ridiculement faible (l'ancien
    // code avait blur(5px) côté Chrome et blur(1px) côté Safari → pilule
    // qui apparaissait "transparente" / vide).
    backdropFilter: "blur(22px) saturate(180%)",
    WebkitBackdropFilter: "blur(22px) saturate(180%)",
    background: "rgba(255, 255, 255, 0.08)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    boxShadow:
      "inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 10px 30px rgba(0, 0, 0, 0.28)",
  },
  linksDesktop: {
    gap: 18,
    alignItems: "center",
  },
  link: {
    position: "relative",
    isolation: "isolate",
    textDecoration: "none",
    color: "rgba(255, 255, 255, 0.75)",
    // Calcul : pilule 41 px de haut. À fontSize 14, le texte ne pèse que
    // ~41 % de la hauteur → impression de "pilule creuse". Bumper à 16 px
    // équilibre verticalement (texte ≈ 46 % de la pilule).
    fontSize: 16,
    // Padding horizontal aligné avec la respiration verticale :
    // (41 - texte 19) / 2 ≈ 11 px de respiration verticale.
    // Padding 20 - bord 1px - blur léger ≈ 18 px autour du texte horizontalement
    // → pilule visuellement équilibrée sur les deux axes.
    padding: "0 20px",
    minHeight: 41,
    borderRadius: 999,
    transition: "color 280ms ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },

  // Page courante : on change uniquement la couleur (aucun effet sur le
  // layout). Le "magnify" passe par un scale sur le label (voir linkLabel).
  linkActiveText: {
    color: "rgba(255, 255, 255, 0.98)",
  },
  // Indicateur visuel "liquid glass" partagé via layoutId. Posé en absolu
  // sous le texte, framer-motion l'anime d'un item à l'autre.
  linkActiveBg: {
    position: "absolute",
    // top/left/width/height sont pilotés par framer-motion (LiquidIndicator)
    top: 0,
    left: 0,
    borderRadius: 999,
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(14px) saturate(160%)",
    WebkitBackdropFilter: "blur(14px) saturate(160%)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    boxShadow:
      "inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 4px 14px rgba(0, 0, 0, 0.22)",
    // ⚠️ `filter: blur(0.3px)` retiré : ça crée un stacking context qui
    // dans Chrome empêchait backdrop-filter de capter le fond → la pilule
    // d'indicateur paraissait "vide". L'effet edge-softening était trop
    // marginal pour valoir le coût (un compositing layer supplémentaire).
    // ⚠️ Pas de `transform: translateZ(0)` ici : framer-motion compose son
    // propre transform (x/y/scaleX/scaleY) et un transform statique
    // override toute la composition → pilule clouée à (0,0).
    willChange: "transform",
    pointerEvents: "none",
  },
  linkLabel: {
    position: "relative",
    zIndex: 1,
    display: "inline-block",
    // transform: scale → grandit visuellement sans changer la place réservée
    // dans le flux (pas de relayout, donc pas de glissement des voisins).
    transform: "scale(1)",
    transformOrigin: "center",
    transition: "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
  },
  linkLabelActive: {
    transform: "scale(1.15)",
    fontWeight: 600,
  },
  burgerBtn: {
    width: 44,
    height: 44,
    borderRadius: 999,
    border: "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(255, 255, 255, 0.07)",
    backdropFilter: "blur(10px) saturate(160%)",
    WebkitBackdropFilter: "blur(10px) saturate(160%)",
    cursor: "pointer",
    position: "relative",
  },
  burgerLine: {
    width: 18,
    height: 2,
    background: "rgba(255, 255, 255, 0.7)",
    display: "block",
    borderRadius: 999,
    transition: "transform 180ms ease, opacity 180ms ease",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.25)",
    zIndex: 49,
    display: "grid",
    placeItems: "start center",
    paddingTop: 84,
    marginLeft: 10,
    marginRight: 10,
  },
  sheet: {
    width: "min(980px, calc(100% - 24px))",
    borderRadius: 20,
    background: "rgba(255, 255, 255, 0.08)",
    // L'ancienne bordure rgba(0,0,0,0.08) était invisible sur fond sombre
    border: "1px solid rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(22px) saturate(180%)",
    WebkitBackdropFilter: "blur(22px) saturate(180%)",
    boxShadow:
      "inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 12px 32px rgba(0, 0, 0, 0.32)",
    padding: 10,
    display: "grid",
    gap: 6,
  },
  mobileItem: {
    position: "relative",
    isolation: "isolate",
    textDecoration: "none",
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 15,
    fontWeight: 600,
    padding: "14px 14px",
    borderRadius: 14,
    background: "rgba(0, 0, 0, 0.04)",
    transition: "color 280ms ease, font-size 280ms ease",
    display: "flex",
    alignItems: "center",
  },
  // Page courante (mobile) : couleur seulement. Le scale du label fait l'agrandissement
  // sans bouger les voisins (linkLabel partagé entre desktop et mobile).
  mobileItemActiveText: {
    color: "rgba(255, 255, 255, 0.98)",
  },
  // Indicateur glass partagé via layoutId pour le menu mobile.
  mobileItemActiveBg: {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 14,
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(14px) saturate(160%)",
    WebkitBackdropFilter: "blur(14px) saturate(160%)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    boxShadow:
      "inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 4px 14px rgba(0, 0, 0, 0.22)",
    /* filter: blur(0.3px) retiré (cf. linkActiveBg) — créait un stacking
       context qui cassait backdrop-filter sous Chrome. */
    willChange: "transform",
    pointerEvents: "none",
  },
};

// Petit CSS responsive via JS: active les liens desktop et cache hamburger en desktop
// => on le fait simplement dans App.css ci-dessous.
