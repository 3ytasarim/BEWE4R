import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { getAdminAuthHeaders } from "./utils";

type Submission = {
  id: number;
  name: string;
  email: string;
  brand: string | null;
  message: string;
  createdAt: string;
};

export default function AdminContactPage() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const ADMIN_API = "/api/admin/contacts";

  const refresh = async () => {
    setLoading(true);
    setFetchError("");
    try {
      const res = await fetch(ADMIN_API, { headers: getAdminAuthHeaders(), cache: "no-store" });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : "Failed to load submissions.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this submission?")) return;
    try {
      await fetch(`${ADMIN_API}/${id}`, { method: "DELETE", headers: getAdminAuthHeaders() });
      await refresh();
    } catch {
      setFetchError("Error deleting submission.");
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" }) +
      " " + d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl tracking-tight">Contact Submissions</h2>
        <button
          onClick={refresh}
          className="text-sm px-4 py-2 rounded-[6px] border transition-colors hover:opacity-80"
          style={{ borderColor: "rgba(15,15,15,0.15)", color: "rgba(15,15,15,0.6)" }}
        >
          Refresh
        </button>
      </div>

      {fetchError && (
        <div className="mb-4 px-4 py-3 rounded-[6px] text-sm" style={{ backgroundColor: "#fef2f2", color: "#dc2626" }}>
          {fetchError}
        </div>
      )}

      {loading ? (
        <p className="text-sm" style={{ color: "rgba(15,15,15,0.5)" }}>Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-sm" style={{ color: "rgba(15,15,15,0.5)" }}>No submissions yet. Form submissions will appear here.</p>
      ) : (
        <div className="overflow-auto border rounded-[6px]" style={{ borderColor: "rgba(15,15,15,0.08)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(15,15,15,0.08)", backgroundColor: "rgba(15,15,15,0.02)" }}>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Brand</th>
                <th className="px-4 py-3 text-left font-medium">Message</th>
                <th className="px-4 py-3 text-left font-medium" />
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id} style={{ borderBottom: "1px solid rgba(15,15,15,0.06)" }}>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: "rgba(15,15,15,0.5)" }}>
                    {formatDate(s.createdAt)}
                  </td>
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${s.email}`} className="underline" style={{ color: "#0f0f0f" }}>
                      {s.email}
                    </a>
                  </td>
                  <td className="px-4 py-3">{s.brand || "-"}</td>
                  <td className="px-4 py-3 max-w-xs">
                    <p className="truncate" title={s.message}>{s.message}</p>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-xs uppercase tracking-wider hover:underline"
                      style={{ color: "#dc2626" }}
                    >
                      Delete
                    </button>
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
