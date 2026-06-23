import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.svg";
import { navigate } from "../utils/navigation";
// Effet fire-cursor : le module s'auto-enregistre sur `window.FireCursor`
// au moment de l'import (IIFE). On le branche/débranche dans un effet.
import "./experiments/fire-cursor.js";
import "./LabsApp.css";

// =============================================================================
//  LABS — bac à sable créatif, volontairement isolé du portfolio.
//
//  Règle du coin : on peut foutre le bordel ICI. Rien de ce qui vit dans ce
//  dossier ne doit fuiter vers le portfolio (styles préfixés `.labs-…`, pas
//  d'import croisé).
// =============================================================================

// --- Galerie : on aspire toutes les images des sous-dossiers de experiments/ ---
// import.meta.glob est résolu au build ; on aplatit une fois pour toutes au
// niveau module (rien à recalculer à chaque render). Ordonnées par dossier,
// donc les essais d'un même répertoire restent voisins sur le mur.
const ARTWORK_MODULES = import.meta.glob(
  "./experiments/**/*.{png,svg,jpg,jpeg,gif,webp,avif}",
  { eager: true, query: "?url", import: "default" }
);

const naturalCompare = (a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

const ARTWORKS = Object.entries(ARTWORK_MODULES)
  .map(([path, url]) => {
    const rel = path.replace("./experiments/", "");
    const slash = rel.lastIndexOf("/");
    return {
      url,
      dir: slash === -1 ? "" : rel.slice(0, slash),
      file: slash === -1 ? rel : rel.slice(slash + 1),
    };
  })
  .filter((a) => a.dir) // on ignore les fichiers à la racine de experiments/
  .sort(
    (a, b) =>
      naturalCompare(a.dir, b.dir) || naturalCompare(a.file, b.file)
  );

// Choisit le nombre de colonnes pour que les tuiles soient ~carrées et que
// TOUT tienne dans l'espace dispo, sans scroll.
function gridShape(count, width, height) {
  if (count === 0 || width === 0 || height === 0) return { cols: 1, rows: 1 };
  let cols = Math.max(1, Math.round(Math.sqrt((count * width) / height)));
  cols = Math.min(cols, count);
  let rows = Math.ceil(count / cols);
  // Resserre : tant qu'on peut retirer une colonne sans ajouter de rangée.
  while (cols > 1 && Math.ceil(count / (cols - 1)) === rows) cols--;
  return { cols, rows };
}

export default function LabsApp() {
  const wallRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Labs — Ali Kus";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  // Fire-cursor : on remplace le curseur natif par la lame de feu, sauf si
  // l'utilisateur a demandé à réduire les animations.
  useEffect(() => {
    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !window.FireCursor) return;
    window.FireCursor.init();
    return () => window.FireCursor.destroy();
  }, []);

  // Mesure le mur pour calculer une grille qui remplit pile l'espace.
  useEffect(() => {
    const el = wallRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const r = entry.contentRect;
      setSize({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { cols, rows } = gridShape(ARTWORKS.length, size.w, size.h);

  return (
    <div className="labs-root">
      {/* Pilule logo (copie 1:1 du portfolio), haut-gauche → retour accueil. */}
      <button
        type="button"
        className="labs-logo"
        onClick={() => navigate("/")}
        aria-label="Retour au portfolio"
        title="Retour au portfolio"
      >
        <img src={logo} alt="Logo" />
      </button>

      <header className="labs-bar">
        <h1 className="labs-title">Mon terrain de jeu</h1>
        <p className="labs-hint">
          Tous mes essais &amp; dessins, en vrac — survole pour agrandir.
        </p>
      </header>

      <section
        className="labs-wall"
        ref={wallRef}
        aria-label="Essais et dessins"
      >
        {ARTWORKS.length === 0 ? (
          <p className="labs-empty">Rien d'accroché pour l'instant…</p>
        ) : (
          <div
            className="labs-mosaic"
            style={{
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
          >
            {ARTWORKS.map((art) => (
              <figure
                className="labs-tile"
                key={art.url}
                title={`${art.dir} — ${art.file}`}
              >
                <img
                  className="labs-art"
                  src={art.url}
                  alt={art.file}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
