import AdminLayout from "./AdminLayout";

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <h2 className="font-display text-2xl tracking-tight mb-4">Dashboard</h2>
      <p className="text-sm text-[rgba(15,15,15,0.6)]">
        Use the sidebar to manage SEO meta tags and brand references.
      </p>
    </AdminLayout>
  );
}
