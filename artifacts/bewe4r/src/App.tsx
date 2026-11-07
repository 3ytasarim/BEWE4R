import { Suspense, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { restoreStoredLang } from "@/i18n";
import { applySeoToDocument } from "@/seo/head";
import { resolveSeo } from "@/seo/resolve";
import { APP_ROUTES } from "@/router/pages";
import { ALIASES } from "@/seo/pages";

// Layout
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedLinks } from "@/components/layout/RelatedLinks";
import { useTranslation } from "react-i18next";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);
  return null;
}

/** Keeps <title>, meta, canonical and JSON-LD in sync on in-app navigation (the server already wrote them). */
function RouteSeo() {
  const [location] = useLocation();
  useEffect(() => {
    let cancelled = false;
    resolveSeo(location).then((seo) => {
      if (!cancelled) applySeoToDocument(seo);
    });
    return () => {
      cancelled = true;
    };
  }, [location]);
  return null;
}

/**
 * Applies the visitor’s saved language. It lives inside the Suspense boundary on purpose: its effect only runs
 * once that boundary has hydrated, so the language never changes while server HTML is still being hydrated.
 */
function RestoreLang() {
  useEffect(() => {
    restoreStoredLang();
  }, []);
  return null;
}

/** First focusable element: lets keyboard and screen-reader users jump past the navigation. */
function SkipLink() {
  const { t } = useTranslation();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[2px] focus:bg-[#0f0f0f] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#ffffff]"
    >
      {t("Skip to content")}
    </a>
  );
}

function Router() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <RouteSeo />
      <SkipLink />
      {!isAdmin && <Navbar />}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Suspense fallback={null}>
          <Switch>
            {APP_ROUTES.map((r) => (
              <Route key={r.path} path={r.path} component={r.page.Page} />
            ))}
            {Object.entries(ALIASES).map(([from, to]) => {
              const target = APP_ROUTES.find((r) => r.path === to)!;
              return <Route key={from} path={from} component={target.page.Page} />;
            })}
            <Route component={NotFound} />
          </Switch>
          <RestoreLang />
        </Suspense>
        <RelatedLinks />
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

/** `ssrPath` is only passed by the prerender (server) entry; in the browser wouter reads the real location. */
export default function App({ ssrPath }: { ssrPath?: string }) {
  useEffect(() => {
    // Bone light theme — remove any legacy dark class
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")} ssrPath={ssrPath}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
