import { useEffect, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: any; reset: () => void }) {
  console.error("Saloon System Route Error:", error);
  const router = useRouter();

  const handleReset = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("saloon_last_active_route");
      } catch {}
    }
    router.invalidate();
    reset();
  };

  const errorMessage =
    error?.message || (typeof error === "string" ? error : "An unexpected navigation error occurred.");

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200 shadow-xl text-center">
        <div className="h-12 w-12 rounded-2xl bg-stone-100 text-stone-700 mx-auto flex items-center justify-center mb-4 text-xl">
          ⚠️
        </div>
        <h1 className="text-xl font-bold tracking-tight text-stone-900">
          This page didn't load
        </h1>
        <p className="mt-2 text-xs text-stone-500 leading-relaxed font-mono bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-left overflow-x-auto break-words max-h-32">
          {errorMessage}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-xl bg-stone-900 px-4 py-2 text-xs font-semibold text-white hover:bg-stone-800 transition"
          >
            Try again
          </button>
          <a
            href="/marketplace"
            className="inline-flex items-center justify-center rounded-xl bg-stone-100 px-4 py-2 text-xs font-semibold text-stone-900 hover:bg-stone-200 transition"
          >
            Go to Marketplace
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
          >
            Business Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Saloon System for Business — The #1 software for Salons and Spas" },
      { name: "description", content: "Simple, flexible and powerful booking software for your business. Manage bookings, grow your clientele, and get paid — all in one platform." },
      { name: "author", content: "Saloon System" },
      { property: "og:title", content: "Saloon System for Business — The #1 software for Salons and Spas" },
      { property: "og:description", content: "Simple, flexible and powerful booking software for your business. Manage bookings, grow your clientele, and get paid — all in one platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Saloon System" },
      { name: "twitter:title", content: "Saloon System for Business — The #1 software for Salons and Spas" },
      { name: "twitter:description", content: "Simple, flexible and powerful booking software for your business. Manage bookings, grow your clientele, and get paid — all in one platform." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    // Proactively clean up any stale legacy redirect keys in visitor's localStorage
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("saloon_last_active_route");
      } catch {}
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster position="top-center" richColors closeButton />
    </QueryClientProvider>
  );
}
