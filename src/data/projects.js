// Source de vérité unique des projets, partagée par :
//   - ProjectsSummary  (grille de synthèse sur la home, section #projects)
//   - ProjectsDetail   (page détaillée /projets, frame rail + bento)
//
// Fusion des deux jeux de données historiques (le composant déjà en ligne +
// la maquette preview/projects-frame.html), SMA Auto dédupliqué. Le modèle
// retient les champs riches de la maquette (period, status, team, links,
// shots) tout en gardant le cover dégradé + initiales comme placeholder
// visuel tant que les vraies captures n'arrivent pas.
//
// shots : tableau optionnel. Chaque capture = { src }. Les fichiers vivent
//   dans public/projects/ (committables) et sont servis en /projects/<nom>.
//   La vue détaillée affiche l'image ENTIÈRE (object-fit: contain) dans un
//   cadre de taille fixe : paysage ou portrait, rien n'est rogné. Absent →
//   retombe sur le cover dégradé + initiales.
// story : objet optionnel (démo interactive ProjectStory). Voir SMA Auto.
// team  : tableau de noms. Vide + teamNote → projet d'équipe sans nominatif.
//         Vide sans teamNote → projet solo.
// status.kind : 'dot' (vert, projet vivant/livré) ou 'academic' (bleu).

export const PROJECTS = [
  {
    id: "aideo",
    title: "AidéO",
    subtitle: "Plateforme pour aidants familiaux",
    type: "Projet universitaire majeur — équipe",
    tagline:
      "Plateforme web & mobile pour faciliter le quotidien des aidants familiaux.",
    year: "2025",
    period: "2024 → 2025",
    status: { label: "Livré", kind: "dot" },
    role: "Design & Front-end",
    team: [],
    teamNote: "Projet d'équipe — BUT Informatique",
    stack: ["React", "Tailwind CSS", "Symfony", "API REST", "PostgreSQL", "Leaflet"],
    description:
      "AidéO est une plateforme web et mobile conçue pour faciliter la vie des aidants familiaux en leur offrant un accès simplifié à l'organisation, aux ressources et aux partenaires d'aide. Le projet a un fort impact social et vise à apporter une réponse concrète à un besoin réel.",
    features: [
      "Système d'authentification sécurisé",
      "Profils multi-rôles (aidants, partenaires, administrateurs)",
      "Cartographie interactive Leaflet pour localiser les services",
      "Gestion des rôles et permissions",
    ],
    learning:
      "Approfondi le travail collaboratif, le design produit et l'intégration front-end orientée utilisateur réel.",
    links: { github: null, demo: null },
    cover: { from: "#5c1f3a", to: "#1a0a14", initials: "Ao" },
    shots: [{ src: "/projects/aideo.png" }],
  },
  {
    id: "internship",
    title: "InternShip",
    subtitle: "Back-office de gestion des stages",
    type: "Projet de stage serveur — back-office",
    tagline:
      "Back-office de gestion des stages : étudiants, offres, candidatures, tableaux de bord.",
    year: "2026",
    period: "2025 → 2026",
    status: { label: "Livré", kind: "dot" },
    role: "Développement back-end & administration serveur",
    team: [],
    stack: ["Symfony", "PHP 8.1", "API Platform", "PostgreSQL", "Docker", "JWT"],
    description:
      "Back-office de gestion des stages : pilotage des comptes étudiants, des offres et des candidatures, avec un tableau de bord consolidé (taux de stage, candidatures par état, capacité du vivier). API REST sécurisée par JWT, base PostgreSQL en conteneur Docker.",
    features: [
      "Tableau de bord consolidé & indicateurs",
      "Gestion des étudiants, offres et candidatures",
      "API REST documentée (API Platform)",
      "Authentification JWT & gestion des rôles",
    ],
    learning:
      "Administration serveur, déploiement Docker et conception d'une API REST Symfony de bout en bout.",
    links: { github: null, demo: null },
    cover: { from: "#1f3a5c", to: "#0a1424", initials: "Is" },
    shots: [{ src: "/projects/internship-dashboard.png" }],
  },
  {
    id: "sma-auto",
    title: "SMA Auto",
    subtitle: "Devis & facturation pour carrosserie",
    type: "Projet personnel — semi-pro",
    tagline:
      "Application de gestion de devis & facturation répondant à un besoin réel d'une carrosserie.",
    year: "2026",
    period: "2026",
    status: { label: "En production", kind: "dot" },
    role: "Conception & développement complet",
    team: [],
    stack: ["Application mobile", "Base de données", "Génération PDF"],
    description:
      "Application de gestion de devis et factures développée pour une petite entreprise de carrosserie automobile. Saisie des véhicules (immatriculation, marque, modèle), calcul du total TTC et génération de documents — pensée pour un usage terrain réel et un potentiel de commercialisation.",
    features: [
      "Gestion complète des clients et des véhicules",
      "Devis & factures PDF avec total automatique",
      "Numérotation automatique et archivage des documents",
      "Interface adaptée aux besoins métier",
    ],
    learning:
      "Concevoir une solution logicielle professionnelle répondant au besoin réel d'un client.",
    links: { github: null, demo: null },
    cover: { from: "#1f3a5c", to: "#0a1424", initials: "Sa" },
    shots: [{ src: "/projects/sma-auto.png" }],
    // Démo interactive — séquence d'écrans + hotspots transparents.
    // Captures attendues dans public/projects/sma-auto/01.jpg, 02.jpg…
    story: {
      folder: "sma-auto",
      frames: [
        {
          src: "01.jpg",
          alt: "Tableau de bord",
          hotspots: [
            { x: 6, y: 18, w: 18, h: 7, target: 1, label: "Nouveau devis" },
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
    tagline:
      "Direction artistique cinématique, animations sur mesure, identité visuelle.",
    year: "2026",
    period: "2026",
    status: { label: "En ligne", kind: "dot" },
    role: "Conception & réalisation complète",
    team: [],
    stack: ["React", "Vite", "Framer Motion"],
    description:
      "Portfolio personnel pour présenter mes projets, compétences et parcours. L'accent est mis sur la clarté de l'interface, l'expérience utilisateur, la lisibilité du contenu et une direction artistique cinématique avec animations sur mesure.",
    features: [
      "Intro animée : frappe naturelle et reveal logo cinématique",
      "Identité visuelle cohérente (typographie, espace, lumière)",
      "Animations Framer Motion calibrées",
      "Responsive design mobile-first",
    ],
    learning:
      "Calibrage des micro-interactions et direction artistique au-delà du fonctionnel.",
    links: { github: null, demo: null },
    cover: { from: "#3a1f5c", to: "#140a24", initials: "Po" },
  },
  {
    id: "demographie",
    title: "Analyse Démographique",
    subtitle: "Data-viz sur l'API Census.gov",
    type: "Projet personnel — TP",
    tagline:
      "App JS qui interroge l'API Census.gov et visualise la démographie mondiale.",
    year: "2025",
    period: "Avril 2025",
    status: { label: "En ligne", kind: "dot" },
    role: "Conception & développement complet",
    team: [],
    stack: ["JavaScript", "ES Modules", "Chart.js", "MVC"],
    description:
      "Application vanilla JS (architecture MVC) interrogeant l'API Census.gov pour afficher indicateurs et visualisations Chart.js : pyramide des âges, évolution de population, fécondité…",
    features: [
      "Architecture MVC sans framework",
      "Pyramide des âges en Chart.js",
      "Favoris en LocalStorage",
      "Recherche par pays / année",
    ],
    learning:
      "Consommation d'API REST, séparation MVC propre en JS natif et data-visualisation.",
    links: {
      github: "https://github.com/ali-kus/Projet-JS-API",
      demo: "https://ali-kus.github.io/Projet-JS-API/",
    },
    cover: { from: "#1f5c3a", to: "#0a1f14", initials: "Dm" },
    shots: [{ src: "/projects/demographie.png" }],
  },
  {
    id: "notadomus",
    title: "NotaDomus",
    subtitle: "Carte des Maisons d'Illustres",
    type: "Projet universitaire — équipe",
    tagline:
      "Carte interactive des Maisons d'Illustres réparties à travers la France.",
    year: "2024",
    period: "2023 → 2024",
    status: { label: "Livré", kind: "dot" },
    role: "Développement (front & back) — équipe Teapot Studio",
    team: ["E. Dubief", "M. Rastelli", "A. Kus", "N. Rayot", "+3"],
    stack: ["PHP", "MVC", "JavaScript", "Google Maps API", "MySQL"],
    description:
      "NotaDomus permet de naviguer parmi les Maisons d'Illustres — bâtiments liés à des artistes, auteurs ou inventeurs — sur une carte interactive (Google Maps API). Filtrage et sélection via le panneau de gauche, dimension sociale (amis) à droite, recherche par mots-clés. Architecture MVC avec routeur en PHP.",
    features: [
      "Carte interactive Google Maps",
      "Filtres & sélection des maisons",
      "Dimension sociale (liste d'amis)",
      "Recherche par illustre ou œuvre",
    ],
    learning:
      "Travail d'équipe (Teapot Studio), architecture MVC avec routeur et intégration d'une API cartographique.",
    links: { github: null, demo: null },
    cover: { from: "#5c3a1f", to: "#241409", initials: "Nd" },
    shots: [{ src: "/projects/notadomus-map.png" }],
  },
  {
    id: "liveset",
    title: "LiveSet",
    subtitle: "Gestion de concerts live (GenEvent)",
    type: "Projet académique — équipe",
    tagline: "Application de création et gestion de concerts live.",
    year: "2024",
    period: "Mars → Juin 2024",
    status: { label: "Livré", kind: "dot" },
    role: "Développement & modèle métier",
    team: ["A. Kus", "Binôme"],
    stack: ["Java 11", "JavaFX", "FXML", "Maven", "MVC"],
    description:
      "LiveSet (GenEvent) est une application JavaFX qui guide l'organisation d'un concert via un assistant multi-étapes : concert, lieu, sous-traitance, artiste, puis récapitulatif financier. Données rendues persistantes par sérialisation.",
    features: [
      "Assistant de création multi-étapes",
      "Gestion des lieux & artistes",
      "Récapitulatif financier",
      "Persistance des données (sérialisation)",
    ],
    learning:
      "Architecture MVC, JavaFX et modélisation d'un domaine métier complet.",
    links: { github: null, demo: null },
    cover: { from: "#3a1f5c", to: "#140a24", initials: "Ls" },
    shots: [
      { src: "/projects/liveset-home.png" },
      { src: "/projects/liveset-recap.png" },
    ],
  },
  {
    id: "classification",
    title: "Classification de dépêches",
    subtitle: "Implémentation algorithmique",
    type: "Projet académique — besoin client",
    tagline:
      "Système de classification automatique de textes — comparaison d'approches.",
    year: "2024",
    period: "2024",
    status: { label: "Académique", kind: "academic" },
    role: "Conception & implémentation",
    team: [],
    stack: ["Java", "Algorithmique"],
    description:
      "Développement d'un système de classification automatique de dépêches en plusieurs catégories selon le contenu textuel. Le projet impliquait la comparaison de différentes approches algorithmiques pour optimiser la précision et les performances.",
    features: [
      "Comparaison d'algorithmes de classification",
      "Évaluation de précision et performance",
      "Manipulation et nettoyage de données textuelles",
    ],
    learning: "Approfondi l'algorithmique et le traitement de données.",
    links: { github: null, demo: null },
    cover: { from: "#1f5c3a", to: "#0a1f14", initials: "Cl" },
  },
  {
    id: "reseau",
    title: "Serveur Debian",
    subtitle: "Infrastructure & déploiement",
    type: "Projet académique — sysadmin",
    tagline: "Installation complète d'un serveur LAMP sur Debian 12.",
    year: "2024",
    period: "2024",
    status: { label: "Académique", kind: "academic" },
    role: "Conception infra & déploiement",
    team: [],
    stack: ["Shell", "PHP", "Apache", "PostgreSQL", "Debian 12"],
    description:
      "Installation et configuration complète d'un serveur Debian 12 équipé d'Apache, PostgreSQL et PHP. Le projet m'a permis de comprendre les principes de l'administration système et du déploiement d'applications web.",
    features: [
      "Installation Debian 12",
      "Configuration Apache + PHP + PostgreSQL",
      "Gestion des services et permissions",
      "Scripts d'automatisation",
    ],
    learning:
      "Compréhension des environnements de production et de la gestion d'infrastructures.",
    links: { github: null, demo: null },
    cover: { from: "#5c3a1f", to: "#241409", initials: "Sd" },
  },
  {
    id: "nutriscore",
    title: "Analyse Nutriscore",
    subtitle: "Exploitation BDD & data viz",
    type: "Projet académique — data",
    tagline:
      "Rapport analytique en anglais sur une base de données Nutriscores.",
    year: "2024",
    period: "2024",
    status: { label: "Académique", kind: "academic" },
    role: "Analyse, requêtes, rapport",
    team: [],
    stack: ["SQL", "R", "Analyse de données"],
    description:
      "Création d'un rapport analytique en anglais basé sur l'exploitation d'une base de données de Nutriscores. Le projet incluait l'extraction, le traitement et la visualisation de données.",
    features: [
      "Requêtes SQL complexes",
      "Visualisation en R",
      "Rédaction du rapport en anglais",
    ],
    learning:
      "Manipulation de bases de données et restitution d'analyse à l'écrit.",
    links: { github: null, demo: null },
    cover: { from: "#5c5c1f", to: "#242409", initials: "Nu" },
  },
];

export const getProjectById = (id) => PROJECTS.find((p) => p.id === id);
