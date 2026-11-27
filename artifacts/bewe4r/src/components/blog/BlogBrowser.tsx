import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CATEGORY_IDS, CATEGORY_LABELS, type CategoryId } from "@/content/blog/categories";
import { getBlogList } from "@/content/blog/list";
import { BlogCardGrid } from "./BlogCards";

type Filter = "all" | CategoryId;

const PILL = "inline-flex h-11 items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f0f0f] focus-visible:ring-offset-2";

/**
 * The blog page body: category filter (with counts) and the card grid. Every post is in the first HTML (the filter only
 * hides cards in the browser), so all links stay crawlable.
 */
export function BlogBrowser() {
  const { t, i18n } = useTranslation();
  const ui = i18n.language === "de" ? "de" : "en";
  const [active, setActive] = useState<Filter>("all");

  const items = useMemo(() => getBlogList(ui), [ui]);
  const counts = useMemo(() => {
    const c: Partial<Record<CategoryId, number>> = {};
    for (const i of items) c[i.category] = (c[i.category] ?? 0) + 1;
    return c;
  }, [items]);
  const visible = active === "all" ? items : items.filter((i) => i.category === active);

  const filters: Array<{ id: Filter; label: string; count: number }> = [
    { id: "all", label: t("All"), count: items.length },
    ...CATEGORY_IDS.filter((id) => counts[id]).map((id) => ({ id, label: CATEGORY_LABELS[id][ui], count: counts[id]! })),
  ];

  return (
    <section className="pb-24 pt-2 lg:pb-32" aria-label={t("Blog")}>
      <div className="mx-auto max-w-[1280px] px-6">
        <div role="group" aria-label={t("Filter by category")} className="mx-auto mb-12 flex max-w-4xl flex-wrap justify-center gap-3">
          {filters.map((f) => {
            const on = f.id === active;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={on}
                data-testid={`blog-filter-${f.id}`}
                onClick={() => setActive(f.id)}
                className={`${PILL} ${on ? "border-[#0f0f0f] bg-[#0f0f0f] text-[#ffffff]" : "border-[#0f0f0f]/30 bg-[#ffffff] text-[#0f0f0f] hover:border-[#0f0f0f] hover:bg-[#0f0f0f]/5"}`}
              >
                {f.label}
                <span className={`text-xs font-medium tabular-nums ${on ? "text-[#ffffff]/70" : "text-[#0f0f0f]/55"}`}>{f.count}</span>
              </button>
            );
          })}
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {visible.length} {t("articles")}
        </p>

        <BlogCardGrid items={visible} cta={t("Read more")} />
      </div>
    </section>
  );
}
