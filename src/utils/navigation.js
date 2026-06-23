// Mini-routeur maison : pas de dépendance (pas de react-router) pour rester
// fidèle au setup minimaliste du portfolio. On pousse l'URL dans l'historique
// puis on émet un `popstate` synthétique — le composant racine (Root) écoute
// `popstate` et re-render en conséquence. Vite sert index.html en fallback SPA
// par défaut, donc un accès direct à /labs fonctionne aussi.
export function navigate(to) {
  if (window.location.pathname === to) return;
  window.scrollTo(0, 0);
  window.history.pushState({}, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
