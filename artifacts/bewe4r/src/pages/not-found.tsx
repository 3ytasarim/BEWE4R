import { Link } from "wouter";
import { useTranslation } from "react-i18next";

/** Shown for unknown URLs. The server answers these with a real 404 status (see deploy/nginx). */
export default function NotFound() {
  const { t } = useTranslation();
  const links = [
    { href: "/", label: t("Home") },
    { href: "/blog", label: t("Blog") },
    { href: "/your-brand/sample", label: t("Start your sample") },
    { href: "/contact", label: t("Contact") },
  ];

  return (
    <div className="bg-[#ffffff] text-[#0f0f0f]">
      <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-40 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f0f0f]/50">404</p>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,5rem)] leading-[1.05]">{t("Page not found")}</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#0f0f0f]/70">
          {t("The page you are looking for does not exist or has moved. Here is where you can go next.")}
        </p>
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-flex min-h-12 items-center rounded-full border border-[#0f0f0f]/30 px-6 text-sm font-semibold transition-colors hover:bg-[#0f0f0f] hover:text-[#ffffff]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
