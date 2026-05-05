import { useEffect, useRef } from "react";
import "./TechBackdrop.css";

// Pile technique — texte invisible par défaut (couleur du fond du footer),
// révélé en or chaud uniquement sous la "lampe" du curseur.
// L'effet repose sur background-clip: text + un radial gradient dont
// le centre est piloté en CSS via --tx / --ty.
const LINES = [
  "Python · Java · C++ · C# · C · PHP · JavaScript · TypeScript · Go · Rust · Kotlin · Swift",
  "React · Next.js · Vue · Svelte · Tailwind CSS · Sass · Framer Motion · Three.js · GSAP",
  "Symfony · Node.js · Express · NestJS · Django · Laravel · Spring Boot · FastAPI",
  "PostgreSQL · MySQL · MongoDB · Redis · SQLite · Supabase · Firebase · Prisma",
  "Git · GitHub · Docker · Kubernetes · GitHub Actions · Vercel · Linux · Bash · Vite",
  "REST · GraphQL · WebSockets · OAuth · JWT · OpenAPI · gRPC · Server-Sent Events",
  "Jest · Vitest · Playwright · Cypress · ESLint · Prettier · Storybook",
  "Figma · Adobe XD · Photoshop · Illustrator · Material Design · Apple HIG",
];

export default function TechBackdrop() {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    // Pas de "lampe" sur écran tactile : pas de pointeur, pas de sens.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let pendingFrame = false;
    let lastX = 0;
    let lastY = 0;

    const onMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (pendingFrame) return;
      pendingFrame = true;
      requestAnimationFrame(() => {
        pendingFrame = false;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--tx", `${lastX - rect.left}px`);
        el.style.setProperty("--ty", `${lastY - rect.top}px`);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={rootRef} className="tech-backdrop" aria-hidden="true">
      {LINES.map((line, i) => (
        <div className="tech-line" key={i}>
          {line}
        </div>
      ))}
    </div>
  );
}
