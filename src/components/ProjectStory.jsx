import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import "./ProjectStory.css";

const MotionDiv = motion.div;

// Visionneuse "story" : séquence d'écrans pré-rendus + zones cliquables
// transparentes posées dessus → illusion d'une vraie démo interactive,
// sans charger l'app complète. Plus rapide qu'un iframe ou une vidéo,
// et l'utilisateur sent qu'il "manipule" le produit.
//
// Format des frames (voir PROJECTS dans ProjectsSection.jsx) :
//   {
//     src: "01.jpg",
//     hotspots: [
//       { x: 12, y: 30, w: 22, h: 8, target: 1, label: "Bouton X" },
//       // x, y, w, h en % de l'image (pas en px) → ça suit le redimensionnement
//       // target : index de la frame suivante. Ou "back" pour revenir.
//     ],
//   }

const buildSrc = (folder, file) => `/projects/${folder}/${file}`;

export default function ProjectStory({ project, onClose }) {
  const story = project.story;
  const frames = useMemo(() => story?.frames ?? [], [story]);
  const [frameIndex, setFrameIndex] = useState(0);
  const [showHotspots, setShowHotspots] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const imgRef = useRef(null);

  const frame = frames[frameIndex];

  // Préchargement de la frame suivante et précédente — la transition
  // suivante part d'une image déjà en cache.
  useEffect(() => {
    [frameIndex + 1, frameIndex - 1].forEach((i) => {
      const f = frames[i];
      if (!f) return;
      const img = new Image();
      img.src = buildSrc(story.folder, f.src);
    });
  }, [frameIndex, frames, story?.folder]);

  // Clavier : Esc ferme, ←/→ navigue, "h" révèle les hotspots (dev).
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowRight") {
        setFrameIndex((i) => Math.min(frames.length - 1, i + 1));
      } else if (e.key === "ArrowLeft") {
        setFrameIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "h" || e.key === "H") {
        setShowHotspots((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, frames.length]);

  const goTo = (target) => {
    if (target === "back") {
      setFrameIndex((i) => Math.max(0, i - 1));
    } else if (target === "close") {
      onClose();
    } else if (typeof target === "number" && target >= 0 && target < frames.length) {
      setFrameIndex(target);
    }
  };

  if (!frame) return null;

  return (
    <MotionDiv
      className="project-story-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className="project-story-bar" onClick={(e) => e.stopPropagation()}>
        <div className="project-story-meta">
          <span className="project-story-type">{project.type}</span>
          <h2 className="project-story-title">{project.title}</h2>
        </div>
        <div className="project-story-actions">
          <button
            type="button"
            className={`project-story-toggle ${showHotspots ? "is-on" : ""}`}
            onClick={() => setShowHotspots((v) => !v)}
            aria-pressed={showHotspots}
            title="Révéler les zones cliquables (raccourci: H)"
          >
            <span className="project-story-toggle-dot" />
            Zones
          </button>
          <button
            type="button"
            className="project-story-close"
            onClick={onClose}
            aria-label="Fermer la démo"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round">
              <path d="M6 6l12 12M6 18 18 6" />
            </svg>
          </button>
        </div>
      </header>

      <div className="project-story-stage" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <MotionDiv
            key={frameIndex}
            className="project-story-frame"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.005 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              ref={imgRef}
              className="project-story-image"
              src={buildSrc(story.folder, frame.src)}
              alt={frame.alt ?? `${project.title} — étape ${frameIndex + 1}`}
              onLoad={() => setImageReady(true)}
              draggable={false}
            />

            {imageReady &&
              frame.hotspots?.map((h, i) => (
                <button
                  type="button"
                  key={i}
                  className={`project-story-hotspot ${showHotspots ? "is-visible" : ""}`}
                  style={{
                    left: `${h.x}%`,
                    top: `${h.y}%`,
                    width: `${h.w}%`,
                    height: `${h.h}%`,
                  }}
                  onClick={() => goTo(h.target)}
                  aria-label={h.label ?? "Zone interactive"}
                  title={showHotspots ? h.label : undefined}
                >
                  {showHotspots && <span className="project-story-hotspot-label">{h.label}</span>}
                </button>
              ))}
          </MotionDiv>
        </AnimatePresence>
      </div>

      <footer className="project-story-foot" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="project-story-step"
          onClick={() => setFrameIndex((i) => Math.max(0, i - 1))}
          disabled={frameIndex === 0}
          aria-label="Étape précédente"
        >
          ←
        </button>
        <div className="project-story-progress" role="tablist">
          {frames.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === frameIndex}
              aria-label={`Étape ${i + 1}`}
              className={`project-story-dot ${i === frameIndex ? "is-active" : ""}`}
              onClick={() => setFrameIndex(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="project-story-step"
          onClick={() => setFrameIndex((i) => Math.min(frames.length - 1, i + 1))}
          disabled={frameIndex === frames.length - 1}
          aria-label="Étape suivante"
        >
          →
        </button>
      </footer>
    </MotionDiv>
  );
}
