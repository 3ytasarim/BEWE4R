import type { MouseEvent } from "react";
import { useLocation } from "wouter";

/**
 * The text of an article. The HTML is written by us and checked when the article files are generated
 * (scripts allow only headings, paragraphs, lists, tables, quotes and links; no scripts, images or event handlers),
 * it is never user input. Clicks on internal links are routed in the app instead of reloading the page.
 */
export function ArticleBody({ html }: { html: string }) {
  const [, navigate] = useLocation();

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = (e.target as HTMLElement).closest("a");
    const href = link?.getAttribute("href");
    if (!link || !href || !href.startsWith("/") || link.target === "_blank") return;
    e.preventDefault();
    navigate(href);
  };

  // eslint-disable-next-line react/no-danger
  return <div className="blog-html" onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />;
}
