import { useEffect } from "react";

export function useSeo(title: string, description?: string, keywords?: string) {
  useEffect(() => {
    if (title) document.title = `${title} | BEWE4R`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && description) metaDesc.setAttribute("content", description);
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && keywords) metaKeywords.setAttribute("content", keywords);
  }, [title, description, keywords]);
}
