import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, AnimatePresence, animate } from "framer-motion";
import logo2 from "./assets/logo.svg";
import { navigate } from "./utils/navigation";
import { smoothScrollToElement } from "./utils/smoothScroll";

const MotionSpan = motion.span;
const MotionButton = motion.button;
const MotionDiv = motion.div;

// Icône fiole (Material Symbols) utilisée pour le raccourci Labs.
function FlaskIcon({ size = 22 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 -960 960 960"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M200-120q-51 0-72.5-45.5T138-250l222-270v-240h-40q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760h-40v240l222 270q32 39 10.5 84.5T760-120H200Zm80-120h400L544-400H416L280-240Zm-80 40h560L520-492v-268h-80v268L200-200Zm280-280Z" />
    </svg>
  );
}

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
    let placed = false; // 1er positionnement = pose directe (pas de vol depuis 0,0)
    let raf = null;
    // Clic sur un lien : on PILOTE la pilule nous-mêmes (rebond) au lieu de la
    // laisser suivre la position de scroll. Tant que `pinnedId` est posé, la
    // boucle scroll ne touche plus à la pilule — elle reste là où l'animation
    // de clic l'a laissée. On dépose la pin dès que l'utilisateur scrolle
    // lui-même (molette / tactile / clavier) → le pilotage scroll reprend.
    let pinnedId = null;

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

    // Parent caché (display:none en mobile) ou pas encore mesuré.
    const isHidden = () =>
      sections.length === 0 ||
      navRects.length === 0 ||
      navRects.every((r) => r.width === 0);

    // Section active = celle dont le centre est le plus proche du centre du
    // viewport. Avec scroll-snap mandatory, le scroll s'arrête pile sur une
    // section → un seul gagnant net, pas d'interpolation continue.
    const computeActive = () => {
      const vc = window.scrollY + window.innerHeight / 2;
      let best = -1;
      let bestDist = Infinity;
      for (let i = 0; i < sections.length; i++) {
        const c = sections[i].top + sections[i].height / 2;
        const d = Math.abs(c - vc);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      return best;
    };

    // --- Paramètres du rebond (partagés clic + scroll) ---
    // Durée du voyage. Volontairement posée (~0.7 s).
    const TRAVEL = 0.72;
    // Easing par segment du keyframe de position : départ posé, retours amortis.
    const TRAVEL_EASE = ["easeOut", "easeInOut", "easeInOut"];
    const KEY_TIMES = [0, 0.42, 0.72, 1];

    // Pose la pilule instantanément (1er placement, resize, font swap…).
    const setPillImmediate = (rect) => {
      x.set(rect.x);
      y.set(rect.y);
      width.set(rect.width);
      height.set(rect.height);
      scaleX.set(1);
      scaleY.set(1);
    };

    // Anime la pilule vers `rect` avec le double dépassement élastique :
    // dépasse de 12 px dans le sens du trajet, revient en dépassant de 6 px de
    // l'autre côté, puis se pose pile — sans à-coup. + squash-stretch liquid.
    const bouncePillTo = (rect) => {
      const dir = rect.x >= x.get() ? 1 : -1;
      const over = rect.x + dir * 12;
      const back = rect.x - dir * 6;
      animate(x, [x.get(), over, back, rect.x], {
        duration: TRAVEL,
        times: KEY_TIMES,
        ease: TRAVEL_EASE,
      });
      animate(y, rect.y, { duration: TRAVEL * 0.7, ease: "easeOut" });
      animate(width, rect.width, { duration: TRAVEL * 0.7, ease: "easeOut" });
      animate(height, rect.height, { duration: TRAVEL * 0.7, ease: "easeOut" });
      animate(scaleX, [scaleX.get(), 1.12, 0.97, 1], {
        duration: TRAVEL,
        times: KEY_TIMES,
        ease: TRAVEL_EASE,
      });
      animate(scaleY, [scaleY.get(), 0.9, 1.02, 1], {
        duration: TRAVEL,
        times: KEY_TIMES,
        ease: TRAVEL_EASE,
      });
    };

    // Boucle scroll : on ne pilote plus la pilule en continu. On détecte le
    // changement de section active et on lance LE MÊME rebond que le clic.
    const update = () => {
      raf = null;
      if (pinnedId) return; // animation de clic en cours
      measure();
      if (isHidden()) {
        opacity.set(0);
        return;
      }
      const idx = computeActive();
      if (idx < 0) return;
      opacity.set(1);

      // Tout premier placement : pose directe, sans rebond depuis (0,0).
      if (!placed) {
        placed = true;
        lastActiveIdx = idx;
        setPillImmediate(navRects[idx]);
        if (onActiveChange) onActiveChange(sections[idx].id);
        return;
      }
      // Changement de section → rebond vers le nouvel item.
      if (idx !== lastActiveIdx) {
        lastActiveIdx = idx;
        bouncePillTo(navRects[idx]);
        if (onActiveChange) onActiveChange(sections[idx].id);
      }
    };

    // Recalage SANS rebond : layout qui bouge (resize, zoom, polices) — la
    // pilule doit juste re-coller à l'item courant, pas rejouer une animation.
    const reposition = () => {
      measure();
      if (pinnedId || isHidden()) return;
      const idx = computeActive();
      if (idx < 0) return;
      opacity.set(1);
      if (!placed) {
        placed = true;
        if (onActiveChange) onActiveChange(sections[idx].id);
      } else if (idx !== lastActiveIdx && onActiveChange) {
        onActiveChange(sections[idx].id);
      }
      lastActiveIdx = idx;
      setPillImmediate(navRects[idx]);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      reposition();
    };

    // Clic sur un lien de nav : même rebond que le scroll, mais on FIGE la
    // pilule (pinnedId) le temps du scroll programmé pour qu'elle aille
    // DIRECTEMENT à la cible (sans rebondir sur les sections traversées).
    const onLinkClick = (e) => {
      const a = e.target.closest("[data-navid]");
      if (!a || !parent.contains(a)) return;
      const id = a.getAttribute("data-navid");
      const section = document.getElementById(id);
      if (!section) return;

      e.preventDefault();
      measure();
      const idx = navRects.findIndex((r) => r.id === id);
      if (idx < 0) return;

      pinnedId = id;
      // On synchronise lastActiveIdx : quand l'utilisateur reprendra la main,
      // la boucle scroll ne rejouera pas un rebond inutile vers le même item.
      lastActiveIdx = idx;
      opacity.set(1);
      bouncePillTo(navRects[idx]);

      if (onActiveChange) onActiveChange(id);

      // Scroll de la page piloté (durée maîtrisée), cohérent avec le snap.
      smoothScrollToElement(section);
    };

    // L'utilisateur reprend la main dès qu'il scrolle lui-même → on relâche la
    // pin et la boucle scroll repilote la pilule à partir de sa position
    // courante (aucun saut puisqu'elle est déjà sur le bon item).
    const onUserScroll = () => {
      pinnedId = null;
    };
    const onKeyScroll = (e) => {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
          " ",
          "Spacebar",
        ].includes(e.key)
      ) {
        pinnedId = null;
      }
    };

    parent.addEventListener("click", onLinkClick);
    window.addEventListener("wheel", onUserScroll, { passive: true });
    window.addEventListener("touchmove", onUserScroll, { passive: true });
    window.addEventListener("keydown", onKeyScroll);

    measure();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // ResizeObserver : fire dès qu'un <a> (ou le parent) change de taille.
    // Plus fiable que `window.resize` pour les changements de layout dus
    // à un breakpoint, zoom navigateur, font swap, ou reflow indirect.
    const ro = new ResizeObserver(() => {
      reposition();
    });
    ro.observe(parent);
    items.forEach((it) => {
      const el = parent.querySelector(`[data-navid="${it.id}"]`);
      if (el) ro.observe(el);
    });

    // Polices chargées en différé → on recale les rects (sans rebond).
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        reposition();
      });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      parent.removeEventListener("click", onLinkClick);
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchmove", onUserScroll);
      window.removeEventListener("keydown", onKeyScroll);
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

  return (
    <MotionSpan
      aria-hidden="true"
      style={{
        ...indicatorStyle,
        left: 0,
        top: 0,
      }}
      // initial={false} : à l'apparition, la pilule se pose directement sur
      // l'item actif (aucun vol depuis 0,0, aucun drapeau à gérer). framer
      // anime ensuite chaque changement de position via le spring "liquid".
      initial={false}
      animate={{
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        // Le stretch : élargi en X, comprimé en Y au milieu du trajet.
        // null = part de la valeur courante, peak au milieu, retour à 1.
        scaleX: [null, 1.15, 1],
        scaleY: [null, 0.9, 1],
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

// Items de nav. Définis au niveau module → référence STABLE : sinon un nouveau
// tableau à chaque render relançait le useEffect de ScrollIndicator (cleanup +
// re-run), ce qui réinitialisait le pin de clic en plein milieu d'un scroll
// programmé → la pilule rejouait les rebonds des sections traversées.
const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Projets", href: "#projects" },
  { label: "À propos", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// Liste réduite (stable) passée à ScrollIndicator.
const NAV_INDICATOR_ITEMS = NAV_ITEMS.map((it) => ({ id: it.href.slice(1) }));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  // Labs : le logo révèle un raccourci en dessous (labsOpen) ; le clic dessus
  // ouvre une modale d'avertissement ludique (labsModal) avant la navigation.
  const [labsOpen, setLabsOpen] = useState(false);
  const [labsModal, setLabsModal] = useState(false);
  const desktopLinksRef = useRef(null);
  const mobileSheetRef = useRef(null);
  const logoZoneRef = useRef(null);

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

  // Fermer le raccourci Labs au clic en dehors (mais pas quand la modale est
  // ouverte — elle gère sa propre fermeture).
  useEffect(() => {
    if (!labsOpen) return;
    const onDocClick = (e) => {
      if (logoZoneRef.current && !logoZoneRef.current.contains(e.target)) {
        setLabsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [labsOpen]);

  // Échap ferme la modale Labs.
  useEffect(() => {
    if (!labsModal) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLabsModal(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [labsModal]);

  return (
    <>
      <header style={styles.header}>
        <div style={styles.navContainer}>
          {/* Logo positioned on the left, extending beyond navbar.
              Clic → révèle le raccourci Labs juste en dessous. */}
          <div
            style={styles.logoContainer}
            data-intro-logo-target
            ref={logoZoneRef}
          >
            <button
              type="button"
              style={styles.logoBox}
              onClick={() => setLabsOpen((v) => !v)}
              aria-label="Afficher le raccourci Labs"
              aria-expanded={labsOpen}
            >
              <img src={logo2} alt="Logo" style={styles.logo} />
            </button>

            <AnimatePresence>
              {labsOpen && (
                <MotionButton
                  key="labs-reveal"
                  type="button"
                  onClick={() => {
                    setLabsOpen(false);
                    setLabsModal(true);
                  }}
                  initial={{ opacity: 0, y: -10, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 340, damping: 24 }}
                  style={styles.labsButton}
                  aria-label="Visiter Labs"
                  title="Visiter Labs"
                >
                  <FlaskIcon size={20} />
                  <span style={styles.labsLabel}>labs</span>
                </MotionButton>
              )}
            </AnimatePresence>
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
                items={NAV_INDICATOR_ITEMS}
                indicatorStyle={styles.linkActiveBg}
                onActiveChange={setActiveId}
              />
              {NAV_ITEMS.map((it) => {
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
            {NAV_ITEMS.map((it) => {
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

      {/* Modale d'avertissement ludique avant d'entrer dans Labs */}
      <AnimatePresence>
        {labsModal && (
          <MotionDiv
            style={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLabsModal(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Avertissement avant d'entrer dans Labs"
          >
            <MotionDiv
              style={styles.modalCard}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={styles.modalIcon}>
                <FlaskIcon size={34} />
              </div>
              <h3 style={styles.modalTitle}>Bienvenue dans Labs ✨</h3>
              <p style={styles.modalText}>
                Attention, tu vas entrer dans <strong>Labs</strong> — une
                expérience ludique où je teste ma créativité et où je partage
                mes expérimentations. Ici, le bordel est assumé (dans le bon
                sens&nbsp;😄). Prêt·e à explorer&nbsp;?
              </p>
              <div style={styles.modalActions}>
                <button
                  type="button"
                  style={styles.modalCancel}
                  onClick={() => setLabsModal(false)}
                >
                  Pas maintenant
                </button>
                <button
                  type="button"
                  style={styles.modalConfirm}
                  onClick={() => {
                    setLabsModal(false);
                    navigate("/labs");
                  }}
                >
                  J'y vais&nbsp;!
                </button>
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
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
    cursor: "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    // <button> est en border-box par défaut dans le navigateur ; le <div>
    // d'origine était en content-box. Sans ça, padding + bordure rognent
    // l'intérieur et la pilule paraît plus mince. On rétablit content-box.
    boxSizing: "content-box",
  },
  // Raccourci Labs révélé sous le logo. Strictement la même pilule que le
  // logo (même taille, même peau "liquid glass") : icône + "labs" sur une
  // ligne pour tenir dans les 41 px de hauteur.
  labsButton: {
    position: "absolute",
    top: "calc(100% + 10px)",
    left: 20,
    width: 158,
    height: 41,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 5,
    borderRadius: 135,
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(22px) saturate(180%)",
    WebkitBackdropFilter: "blur(22px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.14)",
    boxShadow:
      "inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 8px 28px rgba(0, 0, 0, 0.28)",
    cursor: "pointer",
    color: "rgba(227, 227, 227, 0.95)",
    appearance: "none",
    WebkitAppearance: "none",
    boxSizing: "content-box",
  },
  labsLabel: {
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 0.5,
    color: "rgba(255, 255, 255, 0.85)",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 100,
    display: "grid",
    placeItems: "center",
    padding: 20,
    background: "rgba(0, 0, 0, 0.45)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    pointerEvents: "auto",
  },
  modalCard: {
    width: "min(400px, 100%)",
    borderRadius: 24,
    padding: "28px 26px",
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.92)",
    background: "rgba(20, 20, 24, 0.55)",
    backdropFilter: "blur(22px) saturate(180%)",
    WebkitBackdropFilter: "blur(22px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.14)",
    boxShadow:
      "inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 18px 50px rgba(0, 0, 0, 0.45)",
  },
  modalIcon: {
    display: "grid",
    placeItems: "center",
    width: 64,
    height: 64,
    margin: "0 auto 14px",
    borderRadius: 18,
    color: "rgba(227, 227, 227, 0.95)",
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.14)",
  },
  modalTitle: {
    margin: "0 0 10px",
    fontSize: 20,
    fontWeight: 700,
  },
  modalText: {
    margin: "0 0 22px",
    fontSize: 14.5,
    lineHeight: 1.6,
    color: "rgba(255, 255, 255, 0.72)",
  },
  modalActions: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
  },
  modalCancel: {
    flex: "1 1 0",
    padding: "11px 16px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    color: "rgba(255, 255, 255, 0.8)",
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.14)",
    appearance: "none",
    WebkitAppearance: "none",
  },
  modalConfirm: {
    flex: "1 1 0",
    padding: "11px 16px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    color: "#0a0a0a",
    background: "linear-gradient(135deg, #fff 0%, #cfd2ff 100%)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    appearance: "none",
    WebkitAppearance: "none",
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
