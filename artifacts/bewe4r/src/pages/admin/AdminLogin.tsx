import { useState } from "react";
import { adminLogin } from "./utils";

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(user, pass)) {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#f4f4f5" }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl tracking-tight" style={{ color: "#0f0f0f" }}>
            BEWE4R
          </h1>
          <p className="text-sm mt-1" style={{ color: "rgba(15,15,15,0.5)" }}>
            Admin Panel
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-[8px] border p-8 space-y-6"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "rgba(15,15,15,0.08)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)",
          }}
        >
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider" style={{ color: "rgba(15,15,15,0.5)" }}>
              Username
            </label>
            <input
              type="text"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
                setError(false);
              }}
              className="w-full px-3 py-2.5 text-sm rounded-[6px] border focus:outline-none focus:ring-2 focus:ring-[rgba(15,15,15,0.1)]"
              style={{
                borderColor: "rgba(15,15,15,0.12)",
                backgroundColor: "#fafafa",
                color: "#0f0f0f",
              }}
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider" style={{ color: "rgba(15,15,15,0.5)" }}>
              Password
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
                setError(false);
              }}
              className="w-full px-3 py-2.5 text-sm rounded-[6px] border focus:outline-none focus:ring-2 focus:ring-[rgba(15,15,15,0.1)]"
              style={{
                borderColor: "rgba(15,15,15,0.12)",
                backgroundColor: "#fafafa",
                color: "#0f0f0f",
              }}
            />
          </div>

          {error && (
            <div className="text-sm rounded-[6px] px-3 py-2" style={{ backgroundColor: "#fef2f2", color: "#dc2626" }}>
              Invalid username or password.
            </div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2.5 text-sm font-medium rounded-[6px] transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: "#0f0f0f", color: "#ffffff" }}
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: "rgba(15,15,15,0.35)" }}>
          BEWE4R Manufacturing · Istanbul
        </p>
      </div>
    </div>
  );
}
