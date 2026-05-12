import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProjectStory from "./ProjectStory";
import "./ProjectsSection.css";

// Six projets, des plus récents/à enjeu aux plus académiques.
// Chaque cover utilise un dégradé propre — placeholder artistique
// jusqu'à l'arrivée des vrais screenshots.
const PROJECTS = [
  {
    id: "aideo",
    title: "AidéO",
    subtitle: "Plateforme pour aidants familiaux",
    type: "Projet universitaire majeur — équipe",
    tagline: "Plateforme web & mobile pour faciliter le quotidien des aidants familiaux.",
    cover: { from: "#5c1f3a", to: "#1a0a14", initials: "Ao" },
    role: "Design & Front-end",
    description:
      "AidéO est une plateforme web et mobile conçue pour faciliter la vie des aidants familiaux en leur offrant un accès simplifié à l'organisation, aux ressources et aux partenaires d'aide. Ce projet a un fort impact social et vise à apporter une solution concrète à un besoin réel.",
    features: [
      "Système d'authentification sécurisé",
      "Gestion de profils utilisateurs (aidants, partenaires, administrateurs)",
      "Cartographie interactive avec Leaflet pour localiser les services",
      "Gestion des rôles et permissions",
    ],
    stack: ["React", "Tailwind CSS", "Symfony", "API REST", "PostgreSQL", "Leaflet"],
    learning:
      "Approfondi le travail collaboratif, le design produit et l'intégration front-end orientée utilisateur réel.",
    github: null,
  },
  {
    id: "sma-auto",
    title: "SMA Auto",
    subtitle: "Devis & facturation pour carrosserie",
    type: "Projet personnel — semi-pro",
    tagline: "Application de gestion répondant à un besoin réel d'une petite entreprise.",
    cover: { from: "#1f3a5c", to: "#0a1424", initials: "Sa" },
    role: "Conception & développement complet",
    description:
      "Application de gestion de devis et factures développée pour une petite entreprise de carrosserie automobile. Ce projet répond à un besoin réel et a été conçu avec une orientation produit et un potentiel de commercialisation.",
    features: [
      "Gestion complète des clients et des véhicules",
      "Génération automatique de devis et factures au format PDF",
      "Numérotation automatique et archivage des documents",
      "Interface intuitive adaptée aux besoins métier",
    ],
    stack: ["Backend structuré", "Base de données", "Génération PDF"],
    learning:
      "Conception de solutions logicielles fonctionnelles et professionnelles, adaptées aux besoins d'un client réel.",
    github: null,
    // Story interactive — séquence d'écrans + hotspots transparents.
    // Drop tes captures dans : public/projects/sma-auto/01.jpg, 02.jpg…
    // Coordonnées des hotspots en % de l'image (suivent le redimensionnement).
    // target = index de la frame suivante. Édite/ajoute des frames librement.
    story: {
      folder: "sma-auto",
      frames: [
        {
          src: "01.jpg",
          alt: "Tableau de bord",
          hotspots: [
            { x: 6, y: 18, w: 18, h: 7, target: 1, label: "Nouveau devis" },
            // Ajoute d'autres zones ici quand tu as la capture sous les yeux
          ],
        },
        {
          src: "02.jpg",
          alt: "Création d'un devis",
          hotspots: [
            { x: 6, y: 6, w: 6, h: 5, target: 0, label: "Retour" },
            { x: 78, y: 90, w: 18, h: 7, target: 2, label: "Valider" },
          ],
        },
        {
          src: "03.jpg",
          alt: "Devis généré",
          hotspots: [
            { x: 6, y: 6, w: 6, h: 5, target: 0, label: "Retour à l'accueil" },
          ],
        },
      ],
    },
  },
  {
    id: "portfolio",
    title: "Portfolio",
    subtitle: "Ce site",
    type: "Projet personnel",
    tagline: "Direction artistique cinématique, animations sur mesure, identité visuelle.",
    cover: { from: "#3a1f5c", to: "#140a24", initials: "Po" },
    role: "Conception & réalisation complète",
    description:
      "Portfolio personnel pour présenter mes projets, compétences et parcours. L'accent est mis sur la clarté de l'interface, l'expérience utilisateur, la lisibilité du contenu et une direction artistique cinématique avec animations sur mesure.",
    features: [
      "Intro animée avec frappe naturelle et reveal logo cinématique",
      "Identité visuelle cohérente (typographie, espace, lumière)",
      "Animations Framer Motion calibrées",
      "Responsive design mobile-first",
    ],
    stack: ["React", "Vite", "Framer Motion"],
    learning:
      "Calibrage des micro-interactions et direction artistique au-delà du fonctionnel.",
    github: null,
  },
  {
    id: "classification",
    title: "Classification de dépêches",
    subtitle: "Implémentation algorithmique",
    type: "Projet académique — besoin client",
    tagline: "Système de classification automatique de textes — comparaison d'approches.",
    cover: { from: "#1f5c3a", to: "#0a1f14", initials: "Cl" },
    role: "Conception & implémentation",
    description:
      "Développement d'un système de classification automatique de dépêches en plusieurs catégories en fonction du contenu textuel. Le projet impliquait la comparaison de différentes approches algorithmiques afin d'optimiser la précision et les performances.",
    features: [
      "Comparaison d'algorithmes de classification",
      "Évaluation de précision et performance",
      "Manipulation et nettoyage de données textuelles",
    ],
    stack: ["Java"],
    learning: "Approfondi l'algorithmique et le traitement de données.",
    github: null,
  },
  {
    id: "reseau",
    title: "Serveur Debian",
    subtitle: "Infrastructure & déploiement",
    type: "Projet académique — sysadmin",
    tagline: "Installation complète d'un serveur LAMP sur Debian 12.",
    cover: { from: "#5c3a1f", to: "#241409", initials: "Sd" },
    role: "Conception infra & déploiement",
    description:
      "Installation et configuration complète d'un serveur Debian 12 équipé d'Apache, PostgreSQL et PHP. Ce projet m'a permis de comprendre les principes de l'administration système et du déploiement d'applications web.",
    features: [
      "Installation Debian 12",
      "Configuration Apache + PHP + PostgreSQL",
      "Gestion des services et permissions",
      "Scripts d'automatisation",
    ],
    stack: ["Shell", "PHP", "Apache", "PostgreSQL", "Debian 12"],
    learning:
      "Compréhension des environnements de production et de la gestion d'infrastructures.",
    github: null,
  },
  {
    id: "nutriscore",
    title: "Analyse Nutriscore",
    subtitle: "Exploitation BDD & data viz",
    type: "Projet académique — data",
    tagline: "Rapport analytique en anglais sur une base de données Nutriscores.",
    cover: { from: "#5c5c1f", to: "#242409", initials: "Nu" },
    role: "Analyse, requêtes, rapport",
    description:
      "Création d'un rapport analytique en anglais basé sur l'exploitation d'une base de données contenant des informations sur les Nutriscores. Le projet incluait l'extraction, le traitement et la visualisation de données.",
    features: [
      "Requêtes SQL complexes",
      "Visualisation en R",
      "Rédaction du rapport en anglais",
    ],
    stack: ["SQL", "R", "Analyse de données"],
    learning: "Manipulation de bases de données et restitution d'analyse à l'écrit.",
    github: null,
  },
];

const ROTATION_MS = 3000;
const MotionDiv = motion.div;

function ProjectCover({ from, to, initials, size = "sm" }) {
  return (
    <div
      className={`project-cover ${size === "lg" ? "project-cover-lg" : ""}`}
      style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
    >
      <span className="project-cover-initials">{initials}</span>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <MotionDiv
      className="project-modal-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <MotionDiv
        className="project-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97, transition: { duration: 0.3 } }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-${project.id}-title`}
      >
        <button
          type="button"
          className="project-modal-close"
          onClick={onClose}
          aria-label="Fermer"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round">
            <path d="M6 6l12 12M6 18 18 6" />
          </svg>
        </button>

        <ProjectCover {...project.cover} size="lg" />

        <div className="project-modal-content">
          <p className="project-type">{project.type}</p>
          <h3 id={`project-${project.id}-title`}>{project.title}</h3>
          <p className="project-subtitle-text">{project.subtitle}</p>

          {project.role && (
            <div className="project-role-strip">
              <span className="project-role-label">Mon rôle</span>
              <span className="project-role-value">{project.role}</span>
            </div>
          )}

          <p>{project.description}</p>

          {project.features?.length > 0 && (
            <>
              <p className="project-subtitle">Fonctionnalités principales</p>
              <ul>
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </>
          )}

          {project.stack?.length > 0 && (
            <div className="project-stack-modal">
              {project.stack.map((s) => (
                <span key={s} className="stack-tag">{s}</span>
              ))}
            </div>
          )}

          {project.learning && (
            <p className="project-learning">{project.learning}</p>
          )}

          {project.github && (
            <a
              className="project-link"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir sur GitHub →
            </a>
          )}
        </div>
      </MotionDiv>
    </MotionDiv>
  );
}

export default function ProjectsSection() {
  const [openProject, setOpenProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const total = PROJECTS.length;
  const current = PROJECTS[currentIndex];

  useEffect(() => {
    if (isPaused || openProject) return;
    const id = setTimeout(() => {
      setDirection(1);
      setCurrentIndex((i) => (i + 1) % total);
    }, ROTATION_MS);
    return () => clearTimeout(id);
  }, [currentIndex, isPaused, openProject, total]);

  const goPrev = () => {
    setDirection(-1);
    setCurrentIndex((i) => (i - 1 + total) % total);
  };
  const goNext = () => {
    setDirection(1);
    setCurrentIndex((i) => (i + 1) % total);
  };
  const goTo = (i) => {
    setDirection(i > currentIndex ? 1 : -1);
    setCurrentIndex(i);
  };

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir * -60 }),
  };

  return (
    <>
      <p className="section-intro">
        Six projets qui résument mon parcours : universitaires, personnels, professionnels.
        Survolez pour mettre en pause, cliquez pour le détail.
      </p>

      <div
        className="project-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <button
          type="button"
          className="carousel-nav carousel-prev"
          onClick={goPrev}
          aria-label="Projet précédent"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>

        <div className="carousel-stage">
          <AnimatePresence mode="wait" custom={direction}>
            <MotionDiv
              key={current.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="carousel-card-wrapper"
            >
              <button
                type="button"
                className="project-card carousel-card"
                onClick={() => setOpenProject(current)}
                aria-label={`Voir le détail du projet ${current.title}`}
              >
                <ProjectCover {...current.cover} />
                <div className="project-card-body">
                  <p className="project-type">{current.type}</p>
                  <h3>{current.title}</h3>
                  <p className="project-tagline">{current.tagline}</p>
                  <div className="project-tags">
                    {current.stack.slice(0, 4).map((s) => (
                      <span key={s} className="stack-tag-sm">{s}</span>
                    ))}
                    {current.stack.length > 4 && (
                      <span className="stack-tag-sm">+{current.stack.length - 4}</span>
                    )}
                  </div>
                </div>
              </button>
            </MotionDiv>
          </AnimatePresence>
        </div>

        <button
          type="button"
          className="carousel-nav carousel-next"
          onClick={goNext}
          aria-label="Projet suivant"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="carousel-dots" role="tablist" aria-label="Navigation projets">
        {PROJECTS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={i === currentIndex}
            aria-label={`Voir ${p.title}`}
            className={`carousel-dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => goTo(i)}
          >
            <span
              className="carousel-dot-fill"
              style={{
                animationDuration: `${ROTATION_MS}ms`,
                animationPlayState:
                  i === currentIndex && !isPaused && !openProject ? "running" : "paused",
              }}
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {openProject && (
          <ProjectModal
            project={openProject}
            onClose={() => setOpenProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
