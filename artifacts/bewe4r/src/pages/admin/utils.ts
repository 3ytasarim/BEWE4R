const LS_KEY = "bewe4r_admin";
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123!";
const EXPECTED_TOKEN = btoa(`${ADMIN_USER}:${ADMIN_PASS}`);

export function getAdminAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem(LS_KEY);
  return token ? { Authorization: `Basic ${token}` } : {};
}

export function isAdminLoggedIn(): boolean {
  return localStorage.getItem(LS_KEY) === EXPECTED_TOKEN;
}

export function adminLogin(user: string, pass: string): boolean {
  const token = btoa(`${user}:${pass}`);
  if (token === EXPECTED_TOKEN) {
    localStorage.setItem(LS_KEY, token);
    return true;
  }
  return false;
}

export function adminLogout(): void {
  localStorage.removeItem(LS_KEY);
}
