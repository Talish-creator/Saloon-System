import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Play, Star } from "lucide-react";
import { findIndustry, industries } from "@/lib/industries";

export const Route = createFileRoute("/business/$slug")({
  loader: ({ params }) => {
    const industry = findIndustry(params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found — Saloon System" }, { name: "robots", content: "noindex" }] };
    }
    const { industry } = loaderData;
    return {
      meta: [
        { title: `${industry.headline} — Saloon System` },
        { name: "description", content: industry.description },
        { property: "og:title", content: `${industry.headline} — Saloon System` },
        { property: "og:description", content: industry.description },
        { property: "og:type", content: "website" },
        { property: "og:image", content: industry.images[0] },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: IndustryPage,
});

function IndustryPage() {
  const { industry } = Route.useLoaderData();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="min-h-screen bg-white text-zinc-900" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
      {/* Simple header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/marketplace"
            className="text-3xl tracking-tight lowercase"
            style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: "-0.02em" }}
          >
            Saloon System
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/" className="hidden sm:inline-flex text-sm font-medium text-zinc-700 hover:text-zinc-900 px-3 py-2">
              Home
            </Link>
            <button className="inline-flex items-center rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white hover:bg-zinc-800">
              Sign up
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-100/60 via-white to-indigo-100/60" />
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            {industry.tagline}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.05]"
          >
            {industry.headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {industry.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-4 text-base font-semibold text-white hover:bg-zinc-800">
              Get started now
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 text-base font-semibold hover:bg-gray-50">
              <Play className="h-4 w-4 fill-current" /> Watch an overview
            </button>
          </motion.div>
        </div>
      </section>

      {/* Animated image gallery */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-gray-100 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={industry.images[activeImg]}
                alt={industry.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {industry.images.map((_: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  aria-label={`Image ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    activeImg === i ? "w-8 bg-white" : "w-2 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Built for {industry.name.toLowerCase()} professionals
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Every feature is designed around how you actually work.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {industry.features.map((f: {title:string;text:string}, i: number) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-gray-100 p-8 bg-white hover:shadow-lg transition-shadow"
              >
                <div className="h-10 w-10 rounded-full bg-zinc-900 text-white grid place-items-center">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-xl font-bold">{f.title}</h3>
                <p className="mt-2 text-gray-600 leading-relaxed">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats mini */}
      <section className="bg-zinc-50 border-y border-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { v: "4.8", l: "Average rating" },
            { v: "130k+", l: "Businesses" },
            { v: "1B+", l: "Bookings" },
            { v: "120+", l: "Countries" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-3xl md:text-4xl font-extrabold text-zinc-900">{s.v}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-gray-500">{s.l}</div>
              {s.v === "4.8" && (
                <div className="mt-2 flex justify-center gap-0.5">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <Star key={n} className="h-3.5 w-3.5 fill-zinc-900 text-zinc-900" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Everything you need to know about running your {industry.name.toLowerCase()} business on Saloon System.
          </p>
          <div className="mt-12 space-y-3">
            {industry.faqs.map((f: {q:string;a:string}, i: number) => {
              const open = openFaq === i;
              return (
                <div key={i} className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-zinc-900">{f.q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-gray-600 leading-relaxed">{f.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related industries */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold tracking-tight">Explore other business types</h3>
          <div className="mt-6 flex flex-wrap gap-2">
            {industries
              .filter((i) => i.slug !== industry.slug)
              .map((i) => (
                <Link
                  key={i.slug}
                  to="/business/$slug"
                  params={{ slug: i.slug }}
                  className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:border-zinc-400 hover:bg-gray-50"
                >
                  {i.name}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-950 text-white px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Ready to grow your {industry.name.toLowerCase()} business?
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
            Join hundreds of thousands of professionals worldwide who trust Saloon System.
          </p>
          <button className="mt-8 inline-flex items-center rounded-full bg-white text-zinc-900 px-8 py-4 text-base font-semibold hover:bg-zinc-100">
            Get started now
          </button>
        </div>
      </section>

      <footer className="bg-zinc-950 text-zinc-500 border-t border-zinc-900 py-8 px-4 text-center text-sm">
        © {new Date().getFullYear()} Saloon System. All rights reserved.
      </footer>
    </div>
  );
}
