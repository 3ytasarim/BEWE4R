import { formatBlogDate, type BlogLang, type BlogPostData } from "@/data/blogPosts";
import type { BlogCardPost } from "./Blog7";

export function toCard(post: BlogPostData, lang: BlogLang, cta: string): BlogCardPost {
  const text = post[lang];
  return {
    id: post.slug,
    title: text.title,
    summary: text.excerpt,
    href: `/blog/${post.slug}`,
    image: { src: post.image, alt: text.title, width: post.imageWidth, height: post.imageHeight },
    category: text.category,
    date: formatBlogDate(post.publishedAt, lang),
    dateTime: post.publishedAt,
    author: post.author,
    cta,
  };
}
