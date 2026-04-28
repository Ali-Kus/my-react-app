import { AnimatePresence, animate, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import logo2 from "../assets/logo2.svg";
import "./IntroAnimation.css";

const TEXT = "Ceci est un portfolio d’un étudiant en informatique ...";

const INTRO_LOGO_WIDTH = 260;
const INTRO_LOGO_HEIGHT = 120;

const MotionDiv = motion.div;
const MotionP = motion.p; 

const MotionImg = motion.img;

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

export default function IntroAnimation({ onFinish, onRevealSite }) {
  const [typed, setTyped] = useState("");
  const [scene, setScene] = useState("typing");
  const [flyTo, setFlyTo] = useState({ x: 0, y: 0, scale: 1 });

  const BASE_CHAR_DELAY_MS = 28;
  const RANDOM_CHAR_DELAY_MS = 22;
  const SPACE_EXTRA_DELAY_MS = 140;
  const END_OF_TEXT_PAUSE_MS = 2000;

  const textVisible = scene === "typing";
  const glowVisible = scene === "reveal";
  const showLogo = scene !== "typing";
  const isFlying = scene === "fly";

  const overlayTransition = useMemo(
    () => ({ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }),
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

    let cancelled = false;

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const run = async () => {
      // Scene 1: type text character by character (extra pause on spaces)
      setScene("typing");
      setTyped("");

      for (let i = 1; i <= TEXT.length; i += 1) {
        if (cancelled) return;
        setTyped(TEXT.slice(0, i));

        const char = TEXT[i - 1];
        const jitter = Math.random() * RANDOM_CHAR_DELAY_MS;
        const extra = char === " " ? SPACE_EXTRA_DELAY_MS : 0;
        await sleep(BASE_CHAR_DELAY_MS + jitter + extra);
      }

      // Give visitors time to read the full message
      await sleep(END_OF_TEXT_PAUSE_MS);
      if (cancelled) return;

      setScene("reveal");
      await animate(0, 1, { duration: 0.5, ease: "linear" }).finished;
      if (cancelled) return;

      // Hold the luxury reveal for ~3s
      await animate(0, 1, { duration: 2.0, ease: "linear" }).finished;
      if (cancelled) return;

      // Reveal the site behind, then measure the navbar logo target
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
        // Fallback: roughly toward top-left where the navbar logo lives
        setFlyTo({ x: -500, y: -320, scale: 0.55 });
      }

      setScene("fly");
      await animate(0, 1, { duration: 1.05, ease: [0.22, 1, 0.36, 1] }).finished;
      if (cancelled) return;

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
      {/* Studio lighting */}
      <AnimatePresence>
        {glowVisible && (
          <MotionDiv
            key="glow"
            className="introGlowWrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="introGlowTop" />
            <div className="introGlowBottom" />
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* Scene 1: typing */}
      <MotionP
        className="introTyping"
        initial={false}
        animate={{ opacity: textVisible ? 1 : 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {typed}
        <span className="introCursor" aria-hidden>
          _
        </span>
      </MotionP>

      {/* Scene 2-4: logo reveal, fly */}
      <AnimatePresence>
        {showLogo && (
          <div className="introLogoWrap" style={{ width: INTRO_LOGO_WIDTH, height: INTRO_LOGO_HEIGHT }}>
            <MotionDiv
              key="logoMotion"
              className="introLogoMotion"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: isFlying ? flyTo.x : 0,
                y: isFlying ? flyTo.y : 0,
              }}
              transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "center" }}
            >
              <MotionDiv
                className="introLogoBox"
                initial={false}
                animate={{ scale: isFlying ? flyTo.scale : 1 }}
                transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <MotionImg
                  src={logo2}
                  alt="Logo"
                  className="introLogoImg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </MotionDiv>
            </MotionDiv>
          </div>
        )}
      </AnimatePresence>
    </MotionDiv>
  );
}