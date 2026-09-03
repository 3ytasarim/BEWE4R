import { Link, useLocation } from "wouter";
import { adminLogout } from "./utils";

const NAV = [
  { path: "/admin", label: "Dashboard" },
  { path: "/admin/seo", label: "SEO" },
  { path: "/admin/brands", label: "Brands" },
  { path: "/admin/contact", label: "Contact" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#f8f8f8", color: "#0f0f0f" }}>
      {/* Sidebar */}
      <aside
        className="w-56 flex-shrink-0 border-r"
        style={{ backgroundColor: "#ffffff", borderColor: "rgba(15,15,15,0.08)" }}
      >
        <div className="p-6">
          <h1 className="font-display text-xl tracking-tight" style={{ color: "#0f0f0f" }}>
            BEWE4R Admin
          </h1>
        </div>
        <nav className="px-3 pb-6 space-y-1">
          {NAV.map((item) => {
            const active = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <span
                  className="block px-3 py-2 text-sm rounded-[2px] cursor-pointer transition-colors"
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
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="px-6 pt-4 space-y-2" style={{ borderTop: "1px solid rgba(15,15,15,0.08)" }}>
          <Link href="/">
            <span
              className="text-sm cursor-pointer transition-colors block"
              style={{ color: "rgba(15,15,15,0.5)" }}
            >
              Exit Admin
            </span>
          </Link>
          <button
            onClick={() => {
              adminLogout();
              window.location.href = "/admin";
            }}
            className="text-sm cursor-pointer transition-colors"
            style={{ color: "rgba(15,15,15,0.4)" }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 md:p-12 overflow-auto">{children}</main>
    </div>
  );
}
