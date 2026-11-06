import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";
import { startAnimatedFavicon } from "./lib/animated-favicon";
import { preloadPath } from "./router/pages";

startAnimatedFavicon();

async function main() {
  const container = document.getElementById("root")!;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const path = window.location.pathname.slice(base.length) || "/";

  // Load the current route's chunk first, so hydration renders the page synchronously (no Suspense fallback).
  await preloadPath(path).catch(() => {});

  if (container.firstElementChild) {
    // Prerendered page (SSG): React takes over the existing HTML.
    hydrateRoot(container, <App />, {
      // React recovers from a mismatch by client-rendering; log where it happened so it can be fixed.
      onRecoverableError(error, info) {
        console.error("[hydration]", error, info.componentStack);
      },
    });
  } else {
    // Admin shell / dev server: nothing prerendered.
    createRoot(container).render(<App />);
  }
}

main();
