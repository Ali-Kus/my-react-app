import { useEffect, useState } from "react";
import logo2 from "./assets/logo2.svg";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Fermer au resize (si on repasse desktop)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Bloquer le scroll quand le menu mobile est ouvert.
  // Important: ne rien faire quand le menu est fermé pour ne pas écraser
  // un verrou posé ailleurs (ex: pendant l'IntroAnimation au montage).
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const items = [
    { label: "Home", href: "#home" },
    { label: "Projets", href: "#projects" },
    { label: "À propos", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header style={styles.header}>
        <div style={styles.navContainer}>
          {/* Logo positioned on the left, extending beyond navbar */}
          <div style={styles.logoContainer} data-intro-logo-target>
            <div style={styles.logoBox}>
              <img src={logo2} alt="Logo" style={styles.logo} />
            </div>
          </div>

          <nav style={styles.pill}>
            {/* Liens desktop */}
            <div style={styles.linksDesktop} className="nav-links">
              {items.map((it) => (
                <a key={it.href} href={it.href} style={styles.link}>
                  {it.label}
                </a>
              ))}
            </div>

            {/* Hamburger mobile */}
            <button
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((v) => !v)}
              style={styles.burgerBtn}
              className="nav-burger"
            >
              <span style={{ ...styles.burgerLine, transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
              <span style={{ ...styles.burgerLine, opacity: open ? 0 : 1 }} />
              <span style={{ ...styles.burgerLine, transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </button>
          </nav>
        </div>
      </header>

      {/* Menu mobile overlay */}
      {open && (
        <div style={styles.overlay} onClick={() => setOpen(false)}>
          <div style={styles.sheet} onClick={(e) => e.stopPropagation()}>
            {items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                style={styles.mobileItem}
                onClick={() => setOpen(false)}
              >
                {it.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  header: {
    position: "fixed",
    top: 16,
    left: 0,
    right: 0,
    zIndex: 50,
    display: "flex",
    justifyContent: "center",
    pointerEvents: "none",
  },
  navContainer: {
    position: "relative",
    width: "min(980px, calc(100% - 24px))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    position: "absolute",
    left: -15,
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    zIndex: 51,
    pointerEvents: "auto",
  },
  logoBox: {
    width: 150,
    height: 64,
    marginLeft: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    maxHeight: "100%",
    maxWidth: "100%",
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  pill: {
    pointerEvents: "auto",
    width: "100%",
    height: 56,
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 14px",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    background: "rgba(255,255,255,0.75)",
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.10)",
  },
  linksDesktop: {
    gap: 18,
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "rgba(0,0,0,0.75)",
    fontSize: 14,
    padding: "8px 10px",
    borderRadius: 999,
  },
  burgerBtn: {
    width: 44,
    height: 44,
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.10)",
    background: "rgba(255,255,255,0.60)",
    cursor: "pointer",
    position: "relative",
  },
  burgerLine: {
    width: 18,
    height: 2,
    background: "#111",
    display: "block",
    borderRadius: 999,
    transition: "transform 180ms ease, opacity 180ms ease",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.25)",
    zIndex: 49,
    display: "grid",
    placeItems: "start center",
    paddingTop: 84,
  },
  sheet: {
    width: "min(980px, calc(100% - 24px))",
    borderRadius: 20,
    background: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(0,0,0,0.08)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    padding: 10,
    display: "grid",
    gap: 6,
  },
  mobileItem: {
    textDecoration: "none",
    color: "#111",
    fontWeight: 600,
    padding: "14px 14px",
    borderRadius: 14,
    background: "rgba(0,0,0,0.04)",
  },
};

// Petit CSS responsive via JS: active les liens desktop et cache hamburger en desktop
// => on le fait simplement dans App.css ci-dessous.
