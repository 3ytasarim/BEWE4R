import { Fragment } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";

export interface Crumb {
  label: string;
  href?: string;
}

/** Visible breadcrumb; the matching BreadcrumbList JSON-LD is written by seo/blogSeo.ts. */
export function BlogBreadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  const { t } = useTranslation();
  return (
    <nav aria-label={t("Breadcrumb")} className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#6b7280]">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              <li className={last ? "min-w-0 font-medium text-[#0f0f0f]" : undefined}>
                {item.href && !last ? (
                  <Link href={item.href} className="underline-offset-4 hover:text-[#0f0f0f] hover:underline">
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined}>{item.label}</span>
                )}
              </li>
              {!last && (
                <li aria-hidden="true" className="text-[#6b7280]/50">
                  /
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
