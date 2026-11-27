import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/content/blog/categories";
import type { BlogListItem } from "@/content/blog/list";
import { formatBlogDate } from "@/data/blogPosts";

/**
 * Text-only cards: title, category badge, author and date, teaser, read-more button.
 * Plain <li> elements (not <article>) so a page keeps exactly one <article>. Literal colours on purpose: on this site
 * the theme tokens (bg-white, text-black, ...) are inverted.
 */
export function BlogCardGrid({
  items,
  cta,
  headingLevel = "h2",
  className,
}: {
  items: BlogListItem[];
  /** Label of the button */
  cta: string;
  /** Level of the card titles; one below the heading that introduces the grid. */
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const Heading = headingLevel;
  return (
    <ul className={cn("grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((post) => (
        <li
          key={post.id}
          data-category={post.category}
          className="flex flex-col rounded-2xl border border-[#e5e7eb] bg-[#ffffff] p-6 shadow-[0_1px_2px_rgba(15,15,15,0.04)] transition-shadow duration-300 hover:shadow-[0_16px_36px_-16px_rgba(15,15,15,0.22)]"
        >
          <Heading className="font-sans text-[19px] font-semibold normal-case leading-snug tracking-normal text-[#0f0f0f] text-balance">
            <Link href={post.href} className="underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none">
              {post.title}
            </Link>
          </Heading>

          <span className="mt-4 inline-flex w-fit rounded-full border border-[#0f0f0f]/20 bg-[#0f0f0f]/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#0f0f0f]">
            {CATEGORY_LABELS[post.category][post.lang]}
          </span>

          <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="font-medium text-[#0f0f0f]">{post.author}</span>
            <span aria-hidden="true" className="text-[#0f0f0f]/30">
              ·
            </span>
            <time dateTime={post.date} className="tabular-nums text-[#6b7280]">
              {formatBlogDate(post.date, post.lang)}
            </time>
          </p>

          <p className="mt-4 line-clamp-3 text-pretty text-sm leading-relaxed text-[#6b7280]">{post.excerpt}</p>

          <div className="mt-auto pt-6">
            <Link
              href={post.href}
              aria-label={`${cta}: ${post.title}`}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#0f0f0f] px-5 text-sm font-semibold text-[#ffffff] transition-colors hover:bg-[#2b2b2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f0f0f] focus-visible:ring-offset-2"
            >
              {cta}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
