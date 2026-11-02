// Client-side authentication store

export type SaloonUser = {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
};

const USER_KEY = "saloon.user.v1";
const AUTH_EVENT = "saloon:auth-changed";

export function getStoredUser(): SaloonUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: SaloonUser | null) {
  if (typeof window === "undefined") return;
  if (user) {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(USER_KEY);
  }
  window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: user }));
}

export function subscribeAuth(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener(AUTH_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(AUTH_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
