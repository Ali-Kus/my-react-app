import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { PROJECTS } from "../data/projects";
import { navigate } from "../utils/navigation";
import ProjectStory from "./ProjectStory";
import "./ProjectsDetail.css";

const MotionDiv = motion.div;

// Icônes inline (héritées de la maquette projects-frame.html).
const I = {
  cal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  ),
  team: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8M18 20c0-2.4-1-4-3-4.6" />
    </svg>
  ),
  stack: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5M3 18l9 5 9-5" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
      <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.52.1.71-.23.71-.5v-1.96c-2.9.63-3.52-1.24-3.52-1.24-.48-1.2-1.16-1.53-1.16-1.53-.95-.65.07-.64.07-.64 1.05.08 1.6 1.08 1.6 1.08.93 1.6 2.45 1.14 3.05.87.1-.68.36-1.14.66-1.4-2.32-.26-4.76-1.16-4.76-5.16 0-1.14.4-2.07 1.07-2.8-.1-.26-.46-1.3.1-2.72 0 0 .88-.28 2.88 1.07a9.9 9.9 0 0 1 5.24 0c2-1.35 2.87-1.07 2.87-1.07.57 1.42.21 2.46.1 2.72.67.73 1.07 1.66 1.07 2.8 0 4.01-2.45 4.9-4.78 5.15.38.32.71.95.71 1.92v2.85c0 .28.19.61.72.5A10.5 10.5 0 0 0 12 1.5Z" />
    </svg>
  ),
  ext: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M14 4h6v6M20 4l-9 9M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  ),
  back: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M19 12H5M11 6 5 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

// Normalise une capture : string => objet { src, fit, portrait }.
const normShot = (s) =>
  typeof s === "string" ? { src: s, fit: "cover", portrait: false } : s;

const shotClasses = (s) => {
  const n = normShot(s);
  return `${n.fit === "contain" ? "fit-contain" : ""}${n.portrait ? " is-portrait" : ""}`.trim();
};

// Initiales d'équipe (ou "+3" tel quel).
const teamInitials = (m) =>
  m.startsWith("+") ? m : m.split(" ").map((s) => s[0]).join("").slice(0, 2);

// Index initial déduit du pathname /projets/<id>.
function indexFromPath() {
  const seg = window.location.pathname.replace(/^\/projets\/?/, "");
  if (!seg) return 0;
  const i = PROJECTS.findIndex((p) => p.id === seg);
  return i < 0 ? 0 : i;
}

export default function ProjectsDetail() {
  const [current, setCurrent] = useState(indexFromPath);
  const [shotIndex, setShotIndex] = useState(0);
  const [lightbox, setLightbox] = useState(null); // src ou null
  const [storyOpen, setStoryOpen] = useState(false);

  const stageRef = useRef(null);
  const wrapRef = useRef(null);

  const project = PROJECTS[current];

  // Ombres de scroll : haut si du contenu au-dessus, bas si en dessous.
  const updateShadows = useCallback(() => {
    const stage = stageRef.current;
    const wrap = wrapRef.current;
    if (!stage || !wrap) return;
    const max = stage.scrollHeight - stage.clientHeight;
    const t = stage.scrollTop;
    wrap.classList.toggle("show-top", t > 2);
    wrap.classList.toggle("show-bottom", t < max - 2);
  }, []);

  // Changement de projet : reset capture + scroll en haut + recalcul ombres.
  // replaceState garde l'URL partageable sans empiler l'historique à chaque clic.
  const select = useCallback((i) => {
    if (i === current) return;
    setCurrent(i);
    setShotIndex(0);
    setStoryOpen(false);
    const id = PROJECTS[i].id;
    window.history.replaceState({}, "", `/projets/${id}`);
  }, [current]);

  // Au montage : pose l'URL canonique /projets/<id> si on est arrivé sur /projets nu.
  useEffect(() => {
    const id = PROJECTS[current].id;
    if (window.location.pathname !== `/projets/${id}`) {
      window.history.replaceState({}, "", `/projets/${id}`);
    }
    // Détail = page autonome : on remet le scroll global en haut.
    window.scrollTo(0, 0);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Recalage des ombres après chaque swap (la hauteur du bento change).
  useEffect(() => {
    const stage = stageRef.current;
    if (stage) stage.scrollTop = 0;
    const id = requestAnimationFrame(updateShadows);
    return () => cancelAnimationFrame(id);
  }, [current, shotIndex, updateShadows]);

  // Esc ferme la lightbox.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox]);

  useEffect(() => {
    window.addEventListener("resize", updateShadows);
    return () => window.removeEventListener("resize", updateShadows);
  }, [updateShadows]);

  const shots = project.shots?.map(normShot) ?? [];
  const mainShot = shots[shotIndex] ?? shots[0];

  return (
    <div className="projects-detail">
      <div className="pd-page">
        <div className="pd-frame">
          {/* Colonne gauche : entête + rail (fixe) */}
          <aside className="pd-side">
            <div className="pd-head">
              <button
                type="button"
                className="pd-back"
                onClick={() => navigate("/")}
              >
                {I.back}
                Accueil
              </button>
              <p className="pd-eyebrow">Portfolio · Ali Kus</p>
              <h1>Projets en détail</h1>
            </div>

            <nav className="pd-rail" aria-label="Sélection du projet">
              <p className="pd-rail-title">Projets</p>
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  className={`pd-rail-item ${i === current ? "is-active" : ""}`}
                  onClick={() => select(i)}
                  aria-current={i === current ? "true" : undefined}
                >
                  <span
                    className="pd-rail-badge"
                    style={{
                      background: `linear-gradient(135deg, ${p.cover.from}, ${p.cover.to})`,
                    }}
                  >
                    {p.cover.initials}
                  </span>
                  <span className="pd-rail-meta">
                    <span className="pd-rail-name">{p.title}</span>
                    <span className="pd-rail-year">{p.year}</span>
                  </span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Colonne droite : contenu projet (défile) */}
          <div className="pd-stage-wrap" ref={wrapRef}>
            <div className="pd-stage" ref={stageRef} onScroll={updateShadows}>
              <AnimatePresence mode="wait" initial={false}>
                <MotionDiv
                  key={project.id}
                  className="pd-bento"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="pd-band-top">
                    {/* Aperçu : captures si dispo, sinon cover dégradé */}
                    <section className="pd-mod pd-visual">
                      <p className="pd-mod-label">Aperçu</p>
                      {shots.length > 0 ? (
                        <>
                          <button
                            type="button"
                            className={`pd-shot-main ${shotClasses(mainShot)}`}
                            onClick={() => setLightbox(mainShot.src)}
                            aria-label="Agrandir la capture"
                          >
                            <img src={mainShot.src} alt={`${project.title} — aperçu`} />
                          </button>
                          {shots.length > 1 && (
                            <div className="pd-shot-thumbs">
                              {shots.map((s, i) => (
                                <button
                                  type="button"
                                  key={s.src}
                                  className={`pd-thumb ${s.fit === "contain" ? "fit-contain" : ""} ${i === shotIndex ? "is-active" : ""}`}
                                  onClick={() => setShotIndex(i)}
                                  aria-label={`Capture ${i + 1}`}
                                >
                                  <img src={s.src} alt="" />
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <div
                          className="pd-cover"
                          style={{
                            background: `linear-gradient(135deg, ${project.cover.from} 0%, ${project.cover.to} 100%)`,
                          }}
                          aria-hidden="true"
                        >
                          <span className="pd-cover-initials">
                            {project.cover.initials}
                          </span>
                        </div>
                      )}
                    </section>

                    <div className="pd-info-col">
                      <section className="pd-mod pd-headmod">
                        <p className="pd-type">{project.type}</p>
                        <h2>{project.title}</h2>
                        <p className="pd-tagline">{project.tagline}</p>
                        <div className="pd-meta-row">
                          <span className="pd-chip">{I.cal}{project.period}</span>
                          <span className={`pd-chip pd-status pd-status--${project.status.kind}`}>
                            {project.status.label}
                          </span>
                        </div>
                      </section>

                      <div className="pd-info-grid">
                        <section className="pd-mod pd-role">
                          <p className="pd-mod-label">{I.user} Mon rôle</p>
                          <div className="pd-role-value">{project.role}</div>
                        </section>

                        <section className="pd-mod">
                          <p className="pd-mod-label">{I.team} Équipe</p>
                          {project.team.length > 0 ? (
                            <div className="pd-team-list">
                              {project.team.map((m) => (
                                <div className="pd-team-member" key={m}>
                                  <span className="pd-avatar">{teamInitials(m)}</span>
                                  {m}
                                </div>
                              ))}
                            </div>
                          ) : project.teamNote ? (
                            <p className="pd-team-solo">{project.teamNote}</p>
                          ) : (
                            <p className="pd-team-solo">
                              Projet solo — conçu et développé seul.
                            </p>
                          )}
                        </section>

                        <section className="pd-mod">
                          <p className="pd-mod-label">{I.stack} Stack technique</p>
                          <div className="pd-tags">
                            {project.stack.map((s) => (
                              <span className="pd-tag" key={s}>{s}</span>
                            ))}
                          </div>
                        </section>

                        <section className="pd-mod">
                          <p className="pd-mod-label">{I.link} Liens</p>
                          <div className="pd-links">
                            {project.story && (
                              <button
                                type="button"
                                className="pd-link-btn"
                                onClick={() => setStoryOpen(true)}
                              >
                                {I.play} Démo interactive
                              </button>
                            )}
                            <a
                              className={`pd-link-btn ${project.links.github ? "" : "disabled"}`}
                              href={project.links.github || undefined}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-disabled={project.links.github ? undefined : "true"}
                            >
                              {I.github} Code source
                            </a>
                            <a
                              className={`pd-link-btn ${project.links.demo ? "" : "disabled"}`}
                              href={project.links.demo || undefined}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-disabled={project.links.demo ? undefined : "true"}
                            >
                              {I.ext} {project.links.demo ? "Démo en ligne" : "Pas de démo"}
                            </a>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>

                  <div className="pd-band-bottom">
                    <section className="pd-mod pd-desc">
                      <p className="pd-mod-label">Description</p>
                      <p>{project.description}</p>
                    </section>

                    <section className="pd-mod">
                      <p className="pd-mod-label">Fonctionnalités clés</p>
                      <ul className="pd-feat-list">
                        {project.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    </section>

                    <section className="pd-mod pd-learn">
                      <p className="pd-mod-label">Ce que j'ai appris</p>
                      <p className="pd-learn-text">{project.learning}</p>
                    </section>
                  </div>
                </MotionDiv>
              </AnimatePresence>
            </div>

            <div className="pd-scroll-shadow pd-scroll-shadow-top" aria-hidden="true" />
            <div className="pd-scroll-shadow pd-scroll-shadow-bottom" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Lightbox plein écran */}
      {lightbox && (
        <div
          className="pd-lightbox open"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu plein écran"
        >
          <button
            type="button"
            className="pd-lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Fermer"
          >
            ✕
          </button>
          <img src={lightbox} alt="" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* Démo interactive (séquence d'écrans) */}
      <AnimatePresence>
        {storyOpen && project.story && (
          <ProjectStory
            key={`story-${project.id}`}
            project={project}
            onClose={() => setStoryOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
