import { BlogHero } from "@/components/blog/BlogHero";
import { BlogBrowser } from "@/components/blog/BlogBrowser";

/** Hero, category filter and the card grid. Single posts: BlogPost.tsx. Head tags: see seo/blogSeo.ts. */
export default function BlogPage() {
  return (
    <div className="bg-[#ffffff] text-[#0f0f0f]">
      <BlogHero />
      <BlogBrowser />
    </div>
  );
}
