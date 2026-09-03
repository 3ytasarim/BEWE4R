import { useState, useEffect, useCallback } from "react";
import AdminLayout from "./AdminLayout";
import { getAdminAuthHeaders } from "./utils";

type SeoMeta = {
  pageSlug: string;
  title: string;
  description: string;
  keywords: string | null;
  updatedAt: string;
};

const PAGES = [
  { slug: "home", label: "Homepage" },
  { slug: "about", label: "About Us" },
  { slug: "contact", label: "Contact" },
  { slug: "print", label: "Print" },
  { slug: "label", label: "Label" },
  { slug: "sample", label: "Sample" },
  { slug: "zip-bags", label: "Zip Bags" },
  { slug: "katalog", label: "Catalog" },
  { slug: "privacy", label: "Privacy Policy" },
];

export default function AdminSeoPage() {
  const [items, setItems] = useState<SeoMeta[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<string>(PAGES[0].slug);
  const [form, setForm] = useState({ title: "", description: "", keywords: "" });
  const [message, setMessage] = useState("");

  const API = "/api/admin/seo";

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API, { headers: getAdminAuthHeaders() });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    const found = items.find((i) => i.pageSlug === selected);
    if (found) {
      setForm({
        title: found.title,
        description: found.description,
        keywords: found.keywords ?? "",
      });
    } else {
      setForm({ title: "", description: "", keywords: "" });
    }
  }, [selected, items]);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAdminAuthHeaders() },
        body: JSON.stringify({
          pageSlug: selected,
          title: form.title,
          description: form.description,
          keywords: form.keywords,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      await fetchAll();
      setMessage("Saved successfully.");
    } catch {
      setMessage("Error saving.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <h2 className="font-display text-2xl tracking-tight mb-6">SEO Meta</h2>

      {message && (
        <div className="mb-4 px-4 py-3 rounded-[6px] text-sm" style={{ backgroundColor: "rgba(15,15,15,0.04)" }}>
          {message}
        </div>
      )}

      <div className="flex gap-8">
        {/* Page list */}
        <div className="w-48 flex-shrink-0 space-y-1">
          {PAGES.map((p) => {
            const exists = items.some((i) => i.pageSlug === p.slug);
            const active = selected === p.slug;
            return (
              <button
                key={p.slug}
                onClick={() => setSelected(p.slug)}
                className="w-full text-left px-3 py-2 text-sm rounded-[6px] transition-colors flex items-center justify-between"
                style={
                  active
                    ? { backgroundColor: "#0f0f0f", color: "#ffffff" }
                    : { color: "rgba(15,15,15,0.65)" }
                }
                onMouseEnter={(e) => {
                  if (!active) (e.target as HTMLElement).style.backgroundColor = "rgba(15,15,15,0.05)";
                }}
                onMouseLeave={(e) => {
                  if (!active) (e.target as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                {p.label}
                {exists && (
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#22c55e" }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Form */}
        <div className="flex-1 max-w-xl space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: "rgba(15,15,15,0.5)" }}>
              Page
            </label>
            <div className="px-3 py-2 text-sm rounded-[6px]" style={{ backgroundColor: "rgba(15,15,15,0.04)", color: "#0f0f0f" }}>
              {selected}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: "rgba(15,15,15,0.5)" }}>
              Title
            </label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-[6px] border focus:outline-none focus:ring-2 focus:ring-[rgba(15,15,15,0.1)]"
              style={{
                borderColor: "rgba(15,15,15,0.12)",
                backgroundColor: "#fafafa",
                color: "#0f0f0f",
              }}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: "rgba(15,15,15,0.5)" }}>
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 text-sm rounded-[6px] border focus:outline-none focus:ring-2 focus:ring-[rgba(15,15,15,0.1)] resize-none"
              style={{
                borderColor: "rgba(15,15,15,0.12)",
                backgroundColor: "#fafafa",
                color: "#0f0f0f",
              }}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: "rgba(15,15,15,0.5)" }}>
              Keywords
            </label>
            <input
              value={form.keywords}
              onChange={(e) => setForm({ ...form, keywords: e.target.value })}
              placeholder="comma, separated, keywords"
              className="w-full px-3 py-2 text-sm rounded-[6px] border focus:outline-none focus:ring-2 focus:ring-[rgba(15,15,15,0.1)]"
              style={{
                borderColor: "rgba(15,15,15,0.12)",
                backgroundColor: "#fafafa",
                color: "#0f0f0f",
              }}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="mt-2 px-6 py-2.5 text-sm font-medium rounded-[6px] transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40"
            style={{ backgroundColor: "#0f0f0f", color: "#ffffff" }}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
