import Navbar from "./Navbar";
import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroAnimation from "./components/IntroAnimation";
import ProjectsSection from "./components/ProjectsSection";
import CursorFx from "./components/CursorFx";
import TechBackdrop from "./components/TechBackdrop";
import logoSvg from "./assets/logo2.svg";

const MotionDiv = motion.div;
const MotionA = motion.a;

// Micro-composant : "Ali Kus" écrit comme une signature.
// Le texte garde sa couleur normale partout — sauf dans le faisceau
// du curseur, où une couche superposée (::after) affiche l'or via
// background-clip: text + radial-gradient piloté par --cx/--cy.
// Le texte est dupliqué dans data-text pour le pseudo-élément.
const Signature = ({ children, className = "" }) => {
  const text = typeof children === "string" ? children : undefined;
  return (
    <span
      className={`signature-name ${className}`.trim()}
      data-text={text}
    >
      {children}
    </span>
  );
};

// Stagger d'entrée pour les cartes contact : peak-end rule, on travaille le finale.
const finaleContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const finaleCardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

const LogoSticker = ({ className }) => (
  <img src={logoSvg} alt="Ali Logo" className={className} />
);

// Un homme de valeur respecte le temps des autres : l'intro ne joue
// qu'une fois par session. Refresh ou retour direct → site immédiat.
const INTRO_SESSION_KEY = "introSeen";

function readIntroSeen() {
  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function App() {
  const [introDone, setIntroDone] = useState(readIntroSeen);
  const [siteRevealed, setSiteRevealed] = useState(readIntroSeen);

  const handleRevealSite = useCallback(() => {
    setSiteRevealed(true);
  }, []);

  const handleFinishIntro = useCallback(() => {
    try {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    } catch {
      /* sessionStorage indisponible — on continue */
    }
    setIntroDone(true);
  }, []);

  // Peak-end : quand #contact est suffisamment dans le viewport, on bascule
  // le body en mode "finale" → glow chaud en bas, vignettage léger,
  // léger zoom des cartes. Les sections précédentes s'effacent dans la marge.
  useEffect(() => {
    if (!siteRevealed) return;
    const el = document.getElementById("contact");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        document.body.classList.toggle("in-finale", entry.intersectionRatio > 0.45);
      },
      { threshold: [0, 0.45, 0.7] },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [siteRevealed]);

  return (
    <>
      <AnimatePresence>
        {!introDone && (
          <IntroAnimation onRevealSite={handleRevealSite} onFinish={handleFinishIntro} />
        )}
      </AnimatePresence>

      <MotionDiv
        initial={false}
        animate={{ opacity: siteRevealed ? 1 : 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          visibility: siteRevealed ? "visible" : "hidden",
          pointerEvents: siteRevealed ? "auto" : "none",
        }}
        aria-hidden={!siteRevealed}
      >
        <Navbar />

        {siteRevealed && (
          <>
            {/* Présence curseur — humble par défaut, lit comme une vibe ambiante */}
            <CursorFx />

            {/* Fades aux bords : pas de coupure nette top/bottom */}
            <div className="edge-fade edge-fade-top" aria-hidden="true" />
            <div className="edge-fade edge-fade-bottom" aria-hidden="true" />

            {/* Lueur du finale : se révèle quand #contact entre dans le viewport */}
            <div className="finale-glow" aria-hidden="true" />
            <div className="finale-vignette" aria-hidden="true" />

            {/* Watermark : signature très diluée, perçue à peine */}
            <LogoSticker className="logo-watermark" />

            <main>
              <section id="home">
                <span className="section-number" aria-hidden="true">01</span>

                <div className="status-pill">
                  <span className="status-dot" aria-hidden="true" />
                  <span>En recherche — alternance septembre 2026 - juillet 2027</span>
                </div>

                <h1 className="hero-name">
                  <Signature>Ali Kus</Signature>
                </h1>
                <p className="hero-role">
                  Développeur web — Étudiant en BUT Informatique, IUT2 Grenoble
                </p>

                <p className="hero-bio">
                  Je conçois des projets web concrets, côté front et back, avec une attention
                  particulière à la qualité du code, à la logique produit et à l'expérience
                  utilisateur. Mon parcours au BUT m'a permis de gagner en rigueur, en autonomie
                  et en efficacité dans des contextes de projet réels.
                </p>
              </section>

              <section id="projects">
                <span className="section-number" aria-hidden="true">02</span>
                <h2>Projets</h2>
                <ProjectsSection />
              </section>

              <section id="about">
                <span className="section-number" aria-hidden="true">03</span>
                <h2>À propos</h2>
                <p>
                  Profil orienté développement web (front + back), projets concrets et
                  amélioration continue. J'accorde de l'importance à la qualité du code,
                  à la logique métier et à la compréhension des besoins utilisateurs.
                </p>
                <h3>Compétences</h3>
                <ul>
                  <li>Front-end : HTML, CSS, JavaScript, React, Vue.js, Tailwind CSS</li>
                  <li>Back-end : PHP, Symfony, Java, C++</li>
                  <li>API REST, responsive design</li>
                  <li>Base de données : SQL, PostgreSQL, modélisation</li>
                  <li>Outils : Git / GitHub, Docker (bases), Figma</li>
                  <li>Travail en équipe, méthodologie projet</li>
                  <li>Lecture, correction et amélioration de code existant</li>
                </ul>
                <h3>Expérience</h3>
                <p>
                  Stage en entreprise BD. Participation à des projets informatiques dans
                  un contexte professionnel structuré, avec des contraintes et des délais.
                  Mise en pratique des compétences du BUT, apprentissage et adaptation au
                  fonctionnement d'une équipe.
                </p>
              </section>

              <section id="contact">
                <span className="section-number" aria-hidden="true">04</span>
                <h2>Contact</h2>
                <p className="contact-intro">
                  Disponible pour un stage ou un échange. Le moyen le plus rapide reste l'email.
                </p>

                <MotionDiv
                  className="contact-grid"
                  variants={finaleContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                >
                  <MotionA
                    className="contact-card"
                    href="mailto:ali.kus@outlook.fr"
                    aria-label="Envoyer un email à Ali Kus"
                    variants={finaleCardVariants}
                  >
                    <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                    <span className="contact-label">Email</span>
                    <span className="contact-value">
                      <Signature>ali.kus</Signature>@outlook.fr
                    </span>
                  </MotionA>

                  <MotionA
                    className="contact-card"
                    href="https://www.linkedin.com/in/ali-kus-fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Profil LinkedIn d'Ali Kus"
                    variants={finaleCardVariants}
                  >
                    <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                    </svg>
                    <span className="contact-label">LinkedIn</span>
                    <span className="contact-value">
                      <Signature>ali-kus</Signature>-fr
                    </span>
                  </MotionA>

                  <MotionA
                    className="contact-card"
                    href="https://github.com/ali-kus"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Profil GitHub d'Ali Kus"
                    variants={finaleCardVariants}
                  >
                    <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.98 10.98 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
                    </svg>
                    <span className="contact-label">GitHub</span>
                    <span className="contact-value">
                      @<Signature>ali-kus</Signature>
                    </span>
                  </MotionA>

                  <MotionA
                    className="contact-card"
                    href="/cv-ali-kus.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Télécharger le CV d'Ali Kus en PDF"
                    variants={finaleCardVariants}
                  >
                    <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                      <path d="M14 3v5h5" />
                      <path d="M12 12v6" />
                      <path d="m9 15 3 3 3-3" />
                    </svg>
                    <span className="contact-label">CV</span>
                    <span className="contact-value">Télécharger PDF</span>
                  </MotionA>
                </MotionDiv>
              </section>

              {/* 2. FOOTER */}
              <footer className="logo-footer-section">
                <TechBackdrop />
                <LogoSticker className="logo-footer" />
                <p>
                  &copy; 2026 <Signature>Ali-KUS</Signature> — Développeur Full-Stack
                </p>
              </footer>
            </main>
          </>
        )}

      </MotionDiv>
    </>
  );
}

export default App;