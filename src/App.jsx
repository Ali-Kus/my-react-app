import Navbar from "./Navbar";
import "./App.css";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroAnimation from "./components/IntroAnimation";
import logoSvg from "./assets/logo2.svg";

const MotionDiv = motion.div;

const LogoSticker = ({ className }) => (
  <img src={logoSvg} alt="Ali Logo" className={className} />
);

function App() {
  const [introDone, setIntroDone] = useState(false);
  const [siteRevealed, setSiteRevealed] = useState(false);

  const handleRevealSite = useCallback(() => {
    setSiteRevealed(true);
  }, []);

  const handleFinishIntro = useCallback(() => {
    setIntroDone(true);
  }, []);

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
        transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          visibility: siteRevealed ? "visible" : "hidden",
          pointerEvents: siteRevealed ? "auto" : "none",
        }}
        aria-hidden={!siteRevealed}
      >
        <Navbar />

        {siteRevealed && (
          <>
            {/* 7. BACKGROUND WATERMARK */}
            <LogoSticker className="logo-watermark" />

            {/* 10. DIAGONAL CORNER BOTTOM-RIGHT */}
            <LogoSticker className="logo-diagonal-corner" />

            {/* 5. FLOATING BOTTOM LEFT (Sticky) */}
            <LogoSticker className="logo-floating-left" />

            <main>
              <section id="home">
                <h1>Développeur web</h1>
                <p>
                  Étudiant en BUT Informatique (2e année), parcours Développement d'applications à
                  l'Université Grenoble Alpes – IUT2 Grenoble. Je développe des projets web
                  concrets, côté front et back, avec une attention particulière à la qualité du
                  code, à la logique produit et à l'expérience utilisateur.
                </p>
                <p>
                  J'ai consolidé mes compétences techniques et mon autonomie au fil du cursus,
                  ce qui m'a permis de gagner en rigueur et en efficacité dans des contextes
                  de projet réels.
                </p>
                <p>
                  Je recherche un stage ou une première expérience professionnelle en
                  développement logiciel / web.
                </p>
              </section>

              {/* 4. ENTRE SECTIONS - SCROLLABLE */}
              <div className="logo-between-sections">
                <LogoSticker className="logo-between-sections-img" />
              </div>

              <section id="projects">
                <h2>Projets</h2>
                <div className="projects">
                  <article className="project">
                    <h3>AidéO – Plateforme pour aidants familiaux</h3>
                    <p className="project-type">Projet universitaire majeur (travail en équipe)</p>
                    <p>
                      AidéO est une plateforme web et mobile conçue pour faciliter la vie des aidants familiaux
                      en leur offrant un accès simplifié à l'organisation, aux ressources et aux partenaires d'aide.
                      Ce projet a un fort impact social et vise à apporter une solution concrète à un besoin réel.
                    </p>
                    <p className="project-subtitle">Fonctionnalités principales :</p>
                    <ul>
                      <li>Système d'authentification sécurisé</li>
                      <li>Gestion de profils utilisateurs (aidants, partenaires, administrateurs)</li>
                      <li>Cartographie interactive avec Leaflet pour localiser les services</li>
                      <li>Gestion des rôles et permissions</li>
                    </ul>
                    <p className="project-tech">React, Tailwind CSS, Symfony, API REST, PostgreSQL, Leaflet</p>
                    <p className="project-learning">
                      Ce projet m'a permis de développer mes compétences en développement full-stack,
                      en travail collaboratif et en conception orientée utilisateur.
                    </p>
                  </article>

                  {/* 8. ENTRE PROJETS - SÉPARATEUR */}
                  <div className="logo-project-separator">
                    <LogoSticker className="logo-project-separator-img" />
                  </div>

                  <article className="project">
                    <h3>Application de devis & facturation – SMA Auto</h3>
                    <p className="project-type">Projet personnel / semi-professionnel</p>
                    <p>
                      Application de gestion de devis et factures développée pour une petite entreprise
                      de carrosserie automobile. Ce projet répond à un besoin réel et a été conçu avec
                      une orientation produit et un potentiel de commercialisation.
                    </p>
                    <p className="project-subtitle">Fonctionnalités principales :</p>
                    <ul>
                      <li>Gestion complète des clients et des véhicules</li>
                      <li>Génération automatique de devis et factures au format PDF</li>
                      <li>Numérotation automatique et archivage des documents</li>
                      <li>Interface intuitive adaptée aux besoins métier</li>
                    </ul>
                    <p className="project-tech">Backend structuré, Base de données, Génération de PDF</p>
                    <p className="project-learning">
                      Ce projet illustre ma capacité à concevoir des solutions logicielles fonctionnelles
                      et professionnelles, adaptées aux besoins d'un client réel.
                    </p>
                  </article>

                  <article className="project">
                    <h3>Portfolio personnel</h3>
                    <p className="project-type">Projet personnel</p>
                    <p>
                      Développement de ce portfolio pour présenter mes projets, compétences et parcours.
                      L'accent a été mis sur la clarté de l'interface, l'expérience utilisateur et la
                      lisibilité du contenu.
                    </p>
                    <p className="project-tech">React, Vite</p>
                  </article>

                  <article className="project">
                    <h3>Classification automatique de dépêches</h3>
                    <p className="project-type">Projet académique – Implémentation d'un besoin client</p>
                    <p>
                      Développement d'un système de classification automatique de dépêches en plusieurs
                      catégories en fonction du contenu textuel. Ce projet impliquait la comparaison de
                      différentes approches algorithmiques afin d'optimiser la précision et les performances.
                    </p>
                    <p className="project-tech">Java</p>
                    <p className="project-learning">
                      Ce projet m'a permis d'approfondir mes connaissances en algorithmique et en
                      traitement de données.
                    </p>
                  </article>

                  <article className="project">
                    <h3>Installation et configuration de services réseau</h3>
                    <p className="project-type">Projet académique – Infrastructure et déploiement</p>
                    <p>
                      Installation et configuration complète d'un serveur Debian 12 équipé d'Apache,
                      PostgreSQL et PHP. Ce projet m'a permis de comprendre les principes de l'administration
                      système et du déploiement d'applications web.
                    </p>
                    <p className="project-tech">Shell, PHP, Apache, PostgreSQL, Debian 12</p>
                    <p className="project-learning">
                      Ce projet a renforcé ma compréhension des environnements de production et de la
                      gestion d'infrastructures.
                    </p>
                  </article>

                  <article className="project">
                    <h3>Analyse de données Nutriscore</h3>
                    <p className="project-type">Projet académique – Exploitation de base de données</p>
                    <p>
                      Création d'un rapport analytique en anglais basé sur l'exploitation d'une base de
                      données contenant des informations sur les Nutriscores. Le projet incluait l'extraction,
                      le traitement et la visualisation de données.
                    </p>
                    <p className="project-tech">SQL, R, Analyse de données</p>
                    <p className="project-learning">
                      Ce projet m'a permis de développer mes compétences en manipulation de bases de
                      données et en analyse de données.
                    </p>
                  </article>
                </div>
              </section>

              <section id="about">
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
                {/* 9. CONTACT SECTION */}
                <LogoSticker className="logo-contact" />

                <h2>Contact</h2>
                <p>ali.kus@outlook.fr</p>
                <p>Email, LinkedIn, GitHub.</p>
              </section>

              {/* 2. FOOTER */}
              <footer className="logo-footer-section">
                <LogoSticker className="logo-footer" />
                <p>&copy; 2026 Ali-KUS - Développeur Full-Stack</p>
              </footer>
            </main>
          </>
        )}

      </MotionDiv>
    </>
  );
}

export default App;