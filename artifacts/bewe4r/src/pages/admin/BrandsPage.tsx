import { useState, useEffect, useRef, useCallback } from "react";
import AdminLayout from "./AdminLayout";
import { getAdminAuthHeaders } from "./utils";

type Brand = {
  id: number;
  name: string;
  logoUrl: string;
  website: string | null;
  sortOrder: number | null;
};

const INPUT_STYLE = {
  borderColor: "rgba(15,15,15,0.12)",
  backgroundColor: "#fafafa",
  color: "#0f0f0f",
};

export default function AdminBrandsPage() {
  const [items, setItems] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [form, setForm] = useState({
    name: "",
    logoUrl: "",
    website: "",
    sortOrder: 0,
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const ADMIN_API = "/api/admin/brands";

  const refresh = async () => {
    setLoading(true);
    setFetchError("");
    try {
      const res = await fetch("/api/brands", { cache: "no-store" });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : "Failed to load brands.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const resetForm = () => {
    setForm({ name: "", logoUrl: "", website: "", sortOrder: 0 });
    setEditingId(null);
    if (fileRef.current) fileRef.current.value = "";
    setDragOver(false);
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    setMessage("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: getAdminAuthHeaders(),
        body: fd,
      });
      const data = await res.json();
      if (data.url) {
        setForm((f) => ({ ...f, logoUrl: data.url }));
        setMessage("Logo uploaded.");
      } else {
        setMessage(data.error || "Upload failed.");
      }
    } catch {
      setMessage("Upload error.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        setMessage("Please drop an image file.");
        return;
      }
      await uploadFile(file);
    },
    []
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleAdd = async () => {
    if (!form.name || !form.logoUrl) {
      setMessage("Name and logo are required.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(ADMIN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAdminAuthHeaders() },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      await refresh();
      resetForm();
      setMessage("Brand added.");
    } catch {
      setMessage("Error adding brand.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async () => {
    if (!editingId || !form.name || !form.logoUrl) {
      setMessage("Name and logo are required.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(`${ADMIN_API}/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...getAdminAuthHeaders() },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      await refresh();
      resetForm();
      setMessage("Brand updated.");
    } catch {
      setMessage("Error updating brand.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this brand?")) return;
    try {
      await fetch(`${ADMIN_API}/${id}`, { method: "DELETE", headers: getAdminAuthHeaders() });
      await refresh();
      if (editingId === id) resetForm();
    } catch {
      setMessage("Error deleting.");
    }
  };

  const startEdit = (brand: Brand) => {
    setEditingId(brand.id);
    setForm({
      name: brand.name,
      logoUrl: brand.logoUrl,
      website: brand.website ?? "",
      sortOrder: brand.sortOrder ?? 0,
    });
    setMessage("");
  };

  return (
    <AdminLayout>
      <h2 className="font-display text-2xl tracking-tight mb-6">Brand References</h2>

      {(message || fetchError) && (
        <div
          className="mb-4 px-4 py-3 rounded-[6px] text-sm"
          style={{
            backgroundColor: fetchError ? "#fef2f2" : "rgba(15,15,15,0.04)",
            color: fetchError ? "#dc2626" : "#0f0f0f",
          }}
        >
          {fetchError || message}
        </div>
      )}

      {/* Add / Edit form */}
      <div className="rounded-[8px] border p-6 mb-8" style={{ backgroundColor: "#ffffff", borderColor: "rgba(15,15,15,0.08)" }}>
        <h3 className="text-sm font-medium mb-4" style={{ color: "rgba(15,15,15,0.7)" }}>
          {editingId ? "Edit Brand" : "Add New Brand"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 max-w-3xl">
          <input
            placeholder="Brand name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-3 py-2.5 text-sm rounded-[6px] border focus:outline-none focus:ring-2 focus:ring-[rgba(15,15,15,0.1)]"
            style={INPUT_STYLE}
          />
          <input
            placeholder="Website (optional)"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            className="px-3 py-2.5 text-sm rounded-[6px] border focus:outline-none focus:ring-2 focus:ring-[rgba(15,15,15,0.1)]"
            style={INPUT_STYLE}
          />
          <input
            type="number"
            placeholder="Sort order"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
            className="px-3 py-2.5 text-sm rounded-[6px] border focus:outline-none focus:ring-2 focus:ring-[rgba(15,15,15,0.1)]"
            style={INPUT_STYLE}
          />
        </div>

        {/* Drag & drop upload zone */}
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        <div
          ref={dropRef}
          onClick={() => fileRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className="relative mb-4 rounded-[6px] border-2 border-dashed cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 p-6"
          style={{
            borderColor: dragOver ? "#0f0f0f" : "rgba(15,15,15,0.15)",
            backgroundColor: dragOver ? "rgba(15,15,15,0.03)" : form.logoUrl ? "#fafafa" : "transparent",
          }}
        >
          {uploading ? (
            <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(15,15,15,0.5)" }}>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Uploading...
            </div>
          ) : form.logoUrl ? (
            <div className="flex items-center gap-4">
              <img src={form.logoUrl} alt="Preview" className="h-16 w-auto object-contain rounded-[2px] border" style={{ borderColor: "rgba(15,15,15,0.1)" }} />
              <div className="text-sm" style={{ color: "rgba(15,15,15,0.5)" }}>
                <p style={{ color: "#0f0f0f" }} className="font-medium">Logo uploaded</p>
                <p className="text-xs mt-0.5">Click or drag to replace</p>
              </div>
            </div>
          ) : (
            <>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(15,15,15,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <div className="text-center text-sm">
                <p style={{ color: "#0f0f0f" }} className="font-medium">Drop logo here or click to select</p>
                <p className="text-xs mt-1" style={{ color: "rgba(15,15,15,0.4)" }}>PNG, JPG, WebP up to 5 MB</p>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={editingId ? handleEdit : handleAdd}
            disabled={saving || uploading}
            className="px-6 py-2.5 text-sm font-medium rounded-[6px] transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40"
            style={{ backgroundColor: "#0f0f0f", color: "#ffffff" }}
          >
            {saving ? (editingId ? "Saving..." : "Adding...") : (editingId ? "Save Changes" : "Add Brand")}
          </button>
          {editingId && (
            <button
              onClick={resetForm}
              className="px-6 py-2.5 text-sm font-medium rounded-[6px] border transition-all hover:opacity-80"
              style={{ borderColor: "rgba(15,15,15,0.15)", color: "rgba(15,15,15,0.6)" }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-sm" style={{ color: "rgba(15,15,15,0.5)" }}>Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-sm" style={{ color: "rgba(15,15,15,0.5)" }}>No brands yet. Add the existing brands above.</p>
      ) : (
        <div className="overflow-auto border rounded-[6px]" style={{ borderColor: "rgba(15,15,15,0.08)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(15,15,15,0.08)", backgroundColor: "rgba(15,15,15,0.02)" }}>
                <th className="px-4 py-3 text-left font-medium">Logo</th>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Website</th>
                <th className="px-4 py-3 text-left font-medium">Order</th>
                <th className="px-4 py-3 text-left font-medium" />
              </tr>
            </thead>
            <tbody>
              {items.map((b) => (
                <tr key={b.id} style={{ borderBottom: "1px solid rgba(15,15,15,0.06)" }}>
                  <td className="px-4 py-3">
                    <img src={b.logoUrl} alt={b.name} className="h-10 w-auto object-contain" />
                  </td>
                  <td className="px-4 py-3 font-medium">{b.name}</td>
                  <td className="px-4 py-3">
                    {b.website ? (
                      <a href={b.website} target="_blank" rel="noreferrer" className="underline" style={{ color: "#0f0f0f" }}>
                        {b.website}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-3">{b.sortOrder ?? "-"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => startEdit(b)}
                        className="text-xs uppercase tracking-wider hover:underline"
                        style={{ color: "#0f0f0f" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="text-xs uppercase tracking-wider hover:underline"
                        style={{ color: "#dc2626" }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
