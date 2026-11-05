import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

/**
 * Card grid with image, category badge, title, author · date, summary and a read-more link
 * ("Blog 7" pattern of shadcnblocks, adapted to this site).
 */
export interface BlogCardPost {
  id: string;
  title: string;
  summary?: string;
  href: string;
  image?: { src: string; alt: string } | null;
  category?: string | null;
  date?: string;
  author?: string;
  cta: string;
}

export function Blog7({ posts, className }: { posts: BlogCardPost[]; className?: string }) {
  return (
    <section className={cn("pb-24 pt-4 lg:pb-32", className)}>
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden bg-[#ffffff] transition-shadow hover:shadow-lg"
            >
              <Link href={post.href} tabIndex={-1} aria-hidden="true" className="relative block aspect-video w-full overflow-hidden bg-muted">
                {post.image ? (
                  <img
                    src={post.image.src}
                    alt={post.image.alt}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-opacity duration-300 hover:opacity-90"
                  />
                ) : (
                  <div className="flex h-full w-full items-end bg-gradient-to-br from-[#0f0f0f]/10 to-[#0f0f0f]/5 p-5">
                    <span className="font-display text-sm uppercase tracking-[0.18em] text-[#0f0f0f]/50">BEWE4R</span>
                  </div>
                )}
                {post.category && (
                  <span className="absolute left-4 top-4 rounded-full border border-[#0f0f0f]/30 bg-[#ffffff]/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0f0f0f] backdrop-blur">
                    {post.category}
                  </span>
                )}
              </Link>

              <CardHeader className="gap-3 space-y-0">
                <h3 className="font-sans text-lg font-semibold normal-case leading-snug tracking-normal text-balance">
                  <Link href={post.href} className="underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none">
                    {post.title}
                  </Link>
                </h3>
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  {post.author && <span className="font-medium text-foreground">{post.author}</span>}
                  {post.author && post.date && (
                    <span aria-hidden="true" className="text-muted-foreground/40">
                      ·
                    </span>
                  )}
                  {post.date && <time className="tabular-nums text-muted-foreground">{post.date}</time>}
                </p>
              </CardHeader>

              <CardContent>
                <p className="line-clamp-3 text-pretty text-sm leading-relaxed text-muted-foreground">{post.summary}</p>
              </CardContent>

              <CardFooter>
                <Link
                  href={post.href}
                  aria-label={`${post.cta}: ${post.title}`}
                  className="group/cue inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                >
                  {post.cta}
                  <ArrowRight className="size-4 text-muted-foreground transition-colors group-hover/cue:text-[#0f0f0f]" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
