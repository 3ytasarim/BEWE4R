import { useQuery } from "@tanstack/react-query";

type SeoMeta = {
  pageSlug: string;
  title: string;
  description: string;
  keywords: string | null;
};

export function useSeoMeta(slug: string) {
  return useQuery<SeoMeta | null>({
    queryKey: ["seo-meta", slug],
    queryFn: async () => {
      const res = await fetch(`/api/admin/seo/${slug}`);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch SEO meta");
      return res.json();
    },
  });
}
