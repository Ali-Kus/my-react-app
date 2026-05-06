import { useEffect, useRef, useState } from "react";
import "./CursorFx.css";

// "Présence" du curseur — inspiré du langage visuel Gemini :
//  - Curseur net (mix-blend difference) : la pointe nette qui guide.
//  - Halo qui traîne, plus mou : énergie qui se diffuse derrière le geste.
//  - Ripple radial au clic : motion rippling in a radial gradient.
// Le tout sur fond, en très basse opacité — humble par défaut, présent quand on regarde.
export default function CursorFx() {
  const dotRef = useRef(null);
  const haloRef = useRef(null);
  const stateRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, hx: 0, hy: 0, visible: false });
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    // Pas de curseur custom sur écran tactile : pas de pointeur fin = pas de sens.
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("has-cursor-fx");

    const onMove = (e) => {
      const s = stateRef.current;
      s.tx = e.clientX;
      s.ty = e.clientY;
      if (!s.visible) {
        s.x = s.hx = e.clientX;
        s.y = s.hy = e.clientY;
        s.visible = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (haloRef.current) haloRef.current.style.opacity = "1";
      }
    };
    const onLeave = () => {
      const s = stateRef.current;
      s.visible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (haloRef.current) haloRef.current.style.opacity = "0";
    };

    let rippleSeq = 0;
    const onDown = (e) => {
      // Ignore clic droit/molette : seulement clic gauche
      if (e.button !== 0) return;
      const id = ++rippleSeq;
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setRipples((r) => r.filter((p) => p.id !== id));
      }, 900);
    };

    // Hover sur élément interactif → curseur grossit, halo se réveille un peu
    const isInteractive = (el) =>
      !!el?.closest?.("a, button, [role='button'], input, textarea, select, [data-cursor-grow]");

    const onOver = (e) => {
      if (!dotRef.current) return;
      dotRef.current.classList.toggle("is-hovering", isInteractive(e.target));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseover", onOver);

    let raf;
    const tick = () => {
      const s = stateRef.current;
      // Pointe nette : amortissement court (suit vite)
      s.x += (s.tx - s.x) * 0.32;
      s.y += (s.ty - s.y) * 0.32;
      // Halo : amortissement long (traîne → leading edge net, queue diffuse)
      s.hx += (s.tx - s.hx) * 0.085;
      s.hy += (s.ty - s.hy) * 0.085;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%)`;
      }
      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${s.hx}px, ${s.hy}px, 0) translate(-50%, -50%)`;
      }
      // "Faisceau or" : projette la position du curseur en coordonnées locales
      // sur chaque <span class="signature-name">. Le ::after correspondant peint
      // l'or via background-clip: text et un radial-gradient anchored sur --cx/--cy.
      // querySelectorAll par frame est OK ici (≤ 5 nœuds).
      const sigs = document.getElementsByClassName("signature-name");
      for (let i = 0; i < sigs.length; i++) {
        const r = sigs[i].getBoundingClientRect();
        sigs[i].style.setProperty("--cx", `${s.tx - r.left}px`);
        sigs[i].style.setProperty("--cy", `${s.ty - r.top}px`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-cursor-fx");
    };
  }, []);

  return (
    <>
      <div ref={haloRef} className="cursor-halo" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      {ripples.map((r) => (
        <span
          key={r.id}
          className="cursor-ripple"
          style={{ left: r.x, top: r.y }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
