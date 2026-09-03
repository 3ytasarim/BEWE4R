import { useState, useEffect } from "react";
import { isAdminLoggedIn } from "./utils";
import AdminLogin from "./AdminLogin";

export default function AdminWrapper({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isAdminLoggedIn());
    setReady(true);
  }, []);

  if (!ready) return null;

  if (!loggedIn) {
    return <AdminLogin onLogin={() => setLoggedIn(true)} />;
  }

  return <>{children}</>;
}
