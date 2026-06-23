import { motion } from "framer-motion";
import { PROJECTS } from "../data/projects";
import { navigate } from "../utils/navigation";
import "./ProjectsSummary.css";

const MotionDiv = motion.div;

// Stagger discret à l'entrée dans le viewport — cohérent avec le finale contact.
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Vue SYNTHÈSE : une carte compacte par projet. Le clic ouvre la page
// détaillée /projets/<id> (frame rail + bento). Source de données partagée
// avec ProjectsDetail via data/projects.js.
export default function ProjectsSummary() {
  const open = (id) => navigate(`/projets/${id}`);

  return (
    <>
      <div className="summary-intro">
        <p className="summary-lead">
          Une sélection de projets — universitaires, personnels, professionnels.
          Cliquez une carte pour le détail complet.
        </p>
        <button
          type="button"
          className="summary-all"
          onClick={() => navigate("/projets")}
        >
          Tout voir en détail
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <MotionDiv
        className="summary-grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {PROJECTS.map((p) => (
          <motion.button
            key={p.id}
            type="button"
            className="summary-card"
            variants={cardVariants}
            onClick={() => open(p.id)}
            aria-label={`Voir le projet ${p.title} en détail`}
          >
            <div className="summary-card-top">
              <span
                className="summary-badge"
                style={{
                  background: `linear-gradient(135deg, ${p.cover.from} 0%, ${p.cover.to} 100%)`,
                }}
                aria-hidden="true"
              >
                {p.cover.initials}
              </span>
              <span className="summary-meta">
                <span className="summary-year">{p.year}</span>
                <span className={`summary-status summary-status--${p.status.kind}`}>
                  {p.status.label}
                </span>
              </span>
            </div>

            <h3 className="summary-title">{p.title}</h3>
            <p className="summary-type">{p.type}</p>
            <p className="summary-tagline">{p.tagline}</p>

            <div className="summary-foot">
              <div className="summary-tags">
                {p.stack.slice(0, 3).map((s) => (
                  <span key={s} className="summary-tag">{s}</span>
                ))}
                {p.stack.length > 3 && (
                  <span className="summary-tag summary-tag--more">
                    +{p.stack.length - 3}
                  </span>
                )}
              </div>
              <span className="summary-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </motion.button>
        ))}
      </MotionDiv>
    </>
  );
}
