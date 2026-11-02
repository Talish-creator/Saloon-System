// Client-side favorites store (localStorage)

const FAVORITES_KEY = "saloon.favorites.v1";
const EVENT_NAME = "saloon:favorites-changed";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return ["zen-luxury-spa-dubai-1"];
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (!raw) {
      const defaults = ["zen-luxury-spa-dubai-1"];
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(defaults));
      return defaults;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function isFavorite(slug: string): boolean {
  return getFavorites().includes(slug);
}

export function toggleFavorite(slug: string): boolean {
  if (typeof window === "undefined") return false;
  const current = getFavorites();
  const exists = current.includes(slug);
  const updated = exists ? current.filter((s) => s !== slug) : [...current, slug];
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { slug, isFavorited: !exists } }));
  return !exists;
}

export function subscribeFavorites(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener("storage", handler);
  };
}
