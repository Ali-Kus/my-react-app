import { useEffect, useState } from "react";
import App from "./App.jsx";
import LabsApp from "./labs/LabsApp.jsx";

// Aiguillage racine entre le portfolio (/) et le bac à sable Labs (/labs).
// On garde Labs strictement isolé dans src/labs/ : il ne partage avec le
// portfolio que le logo et l'helper navigate(). Tout son "bordel ludique"
// reste cloisonné là-bas.
export default function Root() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const isLabs = path === "/labs" || path.startsWith("/labs/");
  return isLabs ? <LabsApp /> : <App />;
}
