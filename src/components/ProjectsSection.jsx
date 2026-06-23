import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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

const MotionDiv = motion.div;

function ProjectCover({ from, to, initials }) {
  return (
    <div
      className="project-cover"
      style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
    >
      <span className="project-cover-initials">{initials}</span>
    </div>
  );
}

// Rail gauche (liste) + panneau charbon à coins inversés à droite.
// Le tab (numéro + type) déborde au-dessus du panneau, la plaque
// d'actions déborde en dessous : la silhouette dessine les "coins
// inversés", les congés concaves sont peints en CSS (voir le .css).
export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [storyOpen, setStoryOpen] = useState(false);

  const current = PROJECTS[currentIndex];
  const num = String(currentIndex + 1).padStart(2, "0");

  const selectProject = (i) => {
    setCurrentIndex(i);
    setStoryOpen(false);
  };

  return (
    <>
      <p className="section-intro">
        Six projets qui résument mon parcours : universitaires, personnels,
        professionnels. Sélectionnez-en un pour le détail.
      </p>

      <div className="projects-shell">
        <nav className="projects-rail" aria-label="Sélection du projet">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={`projects-rail-item ${i === currentIndex ? "is-active" : ""}`}
              onClick={() => selectProject(i)}
              aria-current={i === currentIndex ? "true" : undefined}
            >
              <span className="rail-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="rail-meta">
                <span className="rail-title">{p.title}</span>
                <span className="rail-sub">{p.subtitle}</span>
              </span>
            </button>
          ))}
        </nav>

        <div className="project-panel-wrap">
          <article className="project-panel" aria-live="polite">
            <div className="panel-tab">
              <span className="panel-tab-index">{num}</span>
              <span className="panel-tab-type">{current.type}</span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <MotionDiv
                key={current.id}
                className="panel-body"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <header className="panel-head">
                  <div className="panel-head-text">
                    <h3 className="panel-title">{current.title}</h3>
                    <p className="panel-tagline">{current.tagline}</p>
                    <div className="panel-role">
                      <span className="panel-role-label">Mon rôle</span>
                      <span className="panel-role-value">{current.role}</span>
                    </div>
                  </div>
                  <ProjectCover {...current.cover} />
                </header>

                <div className="panel-grid">
                  <div className="panel-mod panel-mod-desc">
                    <p className="panel-mod-label">Description</p>
                    <p className="panel-desc">{current.description}</p>
                  </div>

                  <div className="panel-mod">
                    <p className="panel-mod-label">Fonctionnalités clés</p>
                    <ul className="panel-features">
                      {current.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="panel-mod">
                    <p className="panel-mod-label">Stack technique</p>
                    <div className="panel-tags">
                      {current.stack.map((s) => (
                        <span key={s} className="stack-tag">{s}</span>
                      ))}
                    </div>
                    {current.learning && (
                      <>
                        <p className="panel-mod-label panel-mod-label-spaced">
                          Ce que j'ai appris
                        </p>
                        <p className="panel-learning">{current.learning}</p>
                      </>
                    )}
                  </div>
                </div>
              </MotionDiv>
            </AnimatePresence>

            <div className="panel-actions">
              {current.story && (
                <button
                  type="button"
                  className="panel-action"
                  onClick={() => setStoryOpen(true)}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5.5v13l11-6.5z" />
                  </svg>
                  Démo interactive
                </button>
              )}
              {current.github ? (
                <a
                  className="panel-action"
                  href={current.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.98 10.98 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                  Code source
                </a>
              ) : (
                <span className="panel-action is-muted">Code privé — démo sur demande</span>
              )}
            </div>
          </article>
        </div>
      </div>

      <AnimatePresence>
        {storyOpen && current.story && (
          <ProjectStory
            key={`story-${current.id}`}
            project={current}
            onClose={() => setStoryOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
