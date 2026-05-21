import { AnimatePresence, animate, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import logo2 from "../assets/logo2.svg";
import "./IntroAnimation.css";

// Two-beat opening: greeting, then invitation. The pause between them is the work.
const SCRIPT = [
  { text: "Welcome.", holdAfterMs: 1500 },
  { text: "Let me introduce myself.", holdAfterMs: 2000 },
];

const INTRO_LOGO_WIDTH = 260;
const INTRO_LOGO_HEIGHT = 120;

const MotionDiv = motion.div;
const MotionP = motion.p;
const MotionImg = motion.img;

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

// Cadence d'un dactylographe pro, sans précipitation.
// ~50-65 mots/min avec respirations sur la ponctuation et hésitations rares.
function characterDelay(char, prevChar) {
  let delay = 78 + Math.random() * 55; // 78-133ms

  // Une majuscule prend une fraction de seconde de plus (Shift + intention).
  if (char && char >= "A" && char <= "Z") delay += 32;

  // Respirations après la ponctuation.
  if (prevChar === ".") delay += 460 + Math.random() * 280;
  else if (prevChar === ",") delay += 200 + Math.random() * 140;
  else if (prevChar === ";" || prevChar === ":") delay += 240 + Math.random() * 160;

  // Pause réflexive occasionnelle (~4%) — la personne choisit ses mots.
  if (Math.random() < 0.04) delay += 220 + Math.random() * 320;

  return delay;
}

export default function IntroAnimation({ onFinish, onRevealSite }) {
  const [typed, setTyped] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [lineOpacity, setLineOpacity] = useState(1);
  const [scene, setScene] = useState("typing");
  const [flyTo, setFlyTo] = useState({ x: 0, y: 0, scale: 1 });
  const [skipped, setSkipped] = useState(false);

  // Ref de cancellation lisible depuis l'extérieur du useEffect : permet au
  // bouton "Passer l'intro" d'interrompre la séquence async en cours.
  const cancelRef = useRef({ cancelled: false });
  const finishedRef = useRef(false);

  const handleSkip = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    cancelRef.current.cancelled = true;
    setSkipped(true);
    onRevealSite?.();
    onFinish?.();
  }, [onFinish, onRevealSite]);

  const textVisible = scene === "typing" && !skipped;
  const glowVisible = scene === "reveal" && !skipped;
  const showLogo = scene !== "typing" && !skipped;
  const isFlying = scene === "fly";

  const overlayTransition = useMemo(
    () => ({ duration: 0.9, ease: [0.22, 1, 0.36, 1] }),
    []
  );

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
    };

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    const preventScroll = (e) => e.preventDefault();
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    // Cancellation : DEUX niveaux. `cancelled` est scopé à CE run du useEffect
    // (closure), ce qui le rend immunisé au double-mount de React StrictMode —
    // le 1er run reste annulé même si le 2e remet à false un drapeau partagé.
    // `cancelRef.current.cancelled` reste accessible depuis l'extérieur (le
    // bouton "Passer l'intro" le flip), sans pouvoir ressusciter un run mort.
    let cancelled = false;
    cancelRef.current.cancelled = false;
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const isCancelled = () => cancelled || cancelRef.current.cancelled;

    const run = async () => {
      setScene("typing");

      // Phase 1 : chaque ligne est typée puis tenue, puis fondue avant la suivante.
      for (let li = 0; li < SCRIPT.length; li += 1) {
        if (isCancelled()) return;
        setLineIndex(li);
        setTyped("");
        setLineOpacity(1);

        // Petit temps avant que la ligne commence : le regard se pose.
        await sleep(li === 0 ? 700 : 280);
        if (isCancelled()) return;

        const { text, holdAfterMs } = SCRIPT[li];
        let prev = "";
        for (let i = 0; i < text.length; i += 1) {
          if (isCancelled()) return;
          await sleep(characterDelay(text[i], prev));
          if (isCancelled()) return;
          setTyped(text.slice(0, i + 1));
          prev = text[i];
        }

        // Tenue : la phrase reste à l'écran le temps qu'elle existe.
        await sleep(holdAfterMs);
        if (isCancelled()) return;

        // Fondu sortant avant la ligne suivante (ou avant le logo).
        setLineOpacity(0);
        await sleep(750);
      }
      if (isCancelled()) return;

      // Phase 2 : le logo émerge de l'ombre, la lumière chaude se construit.
      setScene("reveal");
      await animate(0, 1, { duration: 1.4, ease: [0.22, 1, 0.36, 1] }).finished;
      if (isCancelled()) return;

      // Phase 3 : on tient le logo. Le silence est volontaire.
      await sleep(2200);
      if (isCancelled()) return;

      // Phase 4 : on dévoile le site, on mesure la cible navbar, puis on vole.
      onRevealSite?.();
      await nextFrame();
      await nextFrame();

      const targetEl = document.querySelector("[data-intro-logo-target]");
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        const targetCenterX = rect.left + rect.width / 2;
        const targetCenterY = rect.top + rect.height / 2;
        const startCenterX = window.innerWidth / 2;
        const startCenterY = window.innerHeight / 2;
        const dx = targetCenterX - startCenterX;
        const dy = targetCenterY - startCenterY;
        const scale = Math.max(
          0.1,
          Math.min(rect.width / INTRO_LOGO_WIDTH, rect.height / INTRO_LOGO_HEIGHT)
        );
        setFlyTo({ x: dx, y: dy, scale });
      } else {
        setFlyTo({ x: -500, y: -320, scale: 0.55 });
      }

      setScene("fly");
      await animate(0, 1, { duration: 1.6, ease: [0.22, 1, 0.36, 1] }).finished;
      if (isCancelled()) return;

      finishedRef.current = true;
      onFinish?.();
    };

    run();

    return () => {
      cancelled = true;
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      html.style.overflow = previous.htmlOverflow;
      body.style.overflow = previous.bodyOverflow;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.left = previous.bodyLeft;
      body.style.right = previous.bodyRight;
      body.style.width = previous.bodyWidth;
      body.style.paddingRight = previous.bodyPaddingRight;
      window.scrollTo(0, scrollY);
    };
  }, [onFinish, onRevealSite]);

  return (
    <MotionDiv
      className="introOverlay"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={overlayTransition}
    >
      {/* Vignette cinéma : assombrit les bords pour cadrer le regard */}
      <div className="introVignette" aria-hidden />

      {/* Bouton "Passer l'intro" — discret en bas à droite, accessible clavier.
          Cliquer interrompt la séquence async et fait apparaître le site direct. */}
      {!skipped && (
        <button
          type="button"
          className="introSkip"
          onClick={handleSkip}
          aria-label="Passer l'intro"
        >
          <span>Passer l'intro</span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 4l8 8-8 8" />
            <path d="M14 4l5 8-5 8" />
          </svg>
        </button>
      )}

      {/* Lumière chaude pendant le reveal du logo */}
      <AnimatePresence>
        {glowVisible && (
          <MotionDiv
            key="glow"
            className="introGlowWrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="introGlowTop" />
            <div className="introGlowBottom" />
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* Texte typé : chaque caractère est un span pour le fondu individuel */}
      {textVisible && (
        <MotionP
          className="introTyping"
          initial={false}
          animate={{ opacity: lineOpacity }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {typed.split("").map((c, i) => (
            <span key={`${lineIndex}-${i}`} className="introChar">
              {c === " " ? " " : c}
            </span>
          ))}
          <span className="introCursor" aria-hidden />
        </MotionP>
      )}

      {/* Logo : reveal depuis l'ombre, hold, vol vers la navbar */}
      <AnimatePresence>
        {showLogo && (
          <div
            className="introLogoWrap"
            style={{ width: INTRO_LOGO_WIDTH, height: INTRO_LOGO_HEIGHT }}
          >
            <MotionDiv
              key="logoMotion"
              className="introLogoMotion"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: isFlying ? flyTo.x : 0,
                y: isFlying ? flyTo.y : 0,
              }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "center" }}
            >
              <MotionDiv
                className="introLogoBox"
                initial={false}
                animate={{ scale: isFlying ? flyTo.scale : 1 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <MotionImg
                  src={logo2}
                  alt="Logo"
                  className="introLogoImg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </MotionDiv>
            </MotionDiv>
          </div>
        )}
      </AnimatePresence>
    </MotionDiv>
  );
}
