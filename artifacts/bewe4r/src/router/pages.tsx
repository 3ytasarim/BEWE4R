import { lazy, type ComponentType } from "react";
import { ALIASES } from "@/seo/pages";

type PageModule = { default: ComponentType<any> };
type Loader = () => Promise<PageModule>;

/**
 * A route-level code-split page that can also be rendered synchronously once it has been preloaded.
 * - client: the entry preloads the current route before hydrating, so hydration never suspends
 * - server (prerender): the script preloads each route before renderToString
 * - later in-app navigation: React.lazy + <Suspense> loads the chunk on demand
 */
function definePage(loader: Loader) {
  let Resolved: ComponentType<any> | null = null;
  const Lazy = lazy(() =>
    loader().then((m) => {
      Resolved = m.default;
      return m;
    }),
  );
  const preload = () =>
    loader().then((m) => {
      Resolved = m.default;
    });
  const Page = (props: any) => (Resolved ? <Resolved {...props} /> : <Lazy {...props} />);
  return { Page, preload };
}

function adminPage(loadPage: Loader): ReturnType<typeof definePage> {
  return definePage(async () => {
    const [{ default: Wrapper }, { default: Inner }] = await Promise.all([import("@/pages/admin/AdminWrapper"), loadPage()]);
    return {
      default: () => (
        <Wrapper>
          <Inner />
        </Wrapper>
      ),
    };
  });
}

export interface AppRoute {
  path: string;
  page: ReturnType<typeof definePage>;
}

export const APP_ROUTES: AppRoute[] = [
  { path: "/", page: definePage(() => import("@/pages/Home")) },
  { path: "/your-brand/print", page: definePage(() => import("@/pages/deine-brand/Print")) },
  { path: "/your-brand/label", page: definePage(() => import("@/pages/deine-brand/Label")) },
  { path: "/your-brand/sample", page: definePage(() => import("@/pages/deine-brand/Sample")) },
  { path: "/your-brand/moq", page: definePage(() => import("@/pages/deine-brand/Moq")) },
  { path: "/your-brand/pre-order", page: definePage(() => import("@/pages/deine-brand/PreOrder")) },
  { path: "/your-brand/storage", page: definePage(() => import("@/pages/deine-brand/Lager")) },
  { path: "/your-brand/delivery", page: definePage(() => import("@/pages/deine-brand/Lieferung")) },

  { path: "/brand-essentials", page: definePage(() => import("@/pages/weitere-produkte/Index")) },
  { path: "/brand-essentials/zip-bags", page: definePage(() => import("@/pages/weitere-produkte/ZipBags")) },
  { path: "/brand-essentials/boxes", page: definePage(() => import("@/pages/weitere-produkte/Kartonagen")) },
  { path: "/brand-essentials/marketing-essentials", page: definePage(() => import("@/pages/weitere-produkte/MarketingEssentials")) },

  { path: "/blog", page: definePage(() => import("@/pages/Blog")) },
  { path: "/blog/:slug", page: definePage(() => import("@/pages/BlogPost")) },

  { path: "/e-catalog", page: definePage(() => import("@/pages/Katalog")) },
  { path: "/about", page: definePage(() => import("@/pages/UeberUns")) },
  { path: "/about/prices-shipping", page: definePage(() => import("@/pages/PricesShipping")) },
  { path: "/contact", page: definePage(() => import("@/pages/Kontakt")) },
  { path: "/privacy", page: definePage(() => import("@/pages/PrivacyPolicy")) },
  { path: "/legal-notice", page: definePage(() => import("@/pages/LegalNotice")) },
  { path: "/terms", page: definePage(() => import("@/pages/Terms")) },

  { path: "/admin", page: adminPage(() => import("@/pages/admin/DashboardPage")) },
  { path: "/admin/seo", page: adminPage(() => import("@/pages/admin/SeoPage")) },
  { path: "/admin/brands", page: adminPage(() => import("@/pages/admin/BrandsPage")) },
  { path: "/admin/contact", page: adminPage(() => import("@/pages/admin/ContactPage")) },
];

/** Duplicate URLs (see seo/pages.ts): the server 301s them; in the browser they still render the target page. */
const ALIAS_ROUTES = Object.entries(ALIASES).map(([path, target]) => ({ path, target }));

function matches(pattern: string, path: string): boolean {
  const a = pattern.split("/");
  const b = path.split("/");
  return a.length === b.length && a.every((seg, i) => seg.startsWith(":") || seg === b[i]);
}

export function findRoute(rawPath: string): AppRoute | undefined {
  const path = rawPath.split(/[?#]/)[0]!.replace(/\/+$/, "") || "/";
  const target = ALIAS_ROUTES.find((a) => a.path === path)?.target ?? path;
  return APP_ROUTES.find((r) => matches(r.path, target));
}

/** Resolve the chunk of the route that is about to be rendered (no-op for unknown URLs). */
export async function preloadPath(path: string): Promise<void> {
  await findRoute(path)?.page.preload();
}
