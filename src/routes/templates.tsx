import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { InvitationPreview } from "@/components/InvitationPreview";
import { CATEGORIES, TEMPLATES } from "@/lib/templates";
import { Search, Eye, Sparkles } from "lucide-react";

export const Route = createFileRoute("/templates")({ component: Templates });

const demoData = {
  bride: "Aanya",
  groom: "Vihaan",
  date: "2026-12-12",
  time: "18:30",
  venue: "The Leela Palace, Udaipur",
  mapsLink: "",
};

function Templates() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [premium, setPremium] = useState<"all" | "free" | "premium">("all");

  const list = useMemo(() => {
    return TEMPLATES.filter((t) => {
      if (cat !== "All" && t.category !== cat) return false;
      if (premium === "free" && t.premium) return false;
      if (premium === "premium" && !t.premium) return false;
      if (q && !`${t.title} ${t.category}`.toLowerCase().includes(q.toLowerCase()))
        return false;
      return true;
    });
  }, [q, cat, premium]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-6xl px-5 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[10px] uppercase tracking-[0.4em] text-[oklch(0.85_0.13_85)]">
            Template Gallery
          </div>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Find your <span className="text-gold-grad">forever</span> design
          </h1>
          <p className="mt-3 max-w-xl text-foreground/70">
            Browse handcrafted templates across heritage, floral, minimal and cinematic styles.
          </p>
        </motion.div>

        {/* Search + filters */}
        <div className="mt-8 flex flex-col gap-3">
          <div className="flex items-center gap-2 rounded-full glass px-4 py-2.5">
            <Search className="h-4 w-4 text-foreground/60" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search templates, styles, moods..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/40"
            />
            <div className="hidden gap-1 sm:flex">
              {(["all", "free", "premium"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setPremium(k)}
                  className={`rounded-full px-3 py-1 text-xs capitalize transition-colors ${
                    premium === k ? "bg-gold-grad text-black" : "text-foreground/70 hover:bg-white/10"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 no-scrollbar">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs transition-all ${
                  cat === c
                    ? "bg-gold-grad text-black"
                    : "glass text-foreground/80 hover:bg-white/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((t, i) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="group overflow-hidden rounded-2xl glass transition-all hover:-translate-y-1 hover:ring-gold"
            >
              <div className="relative aspect-[3/4] overflow-hidden" style={{ background: t.palette.bg }}>
                <div className="absolute inset-0 scale-90 transition-transform group-hover:scale-100">
                  <InvitationPreview data={demoData} template={t} compact />
                </div>
                <div className="absolute left-2 top-2 flex gap-1">
                  {t.animated && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[9px] uppercase tracking-widest text-[oklch(0.9_0.13_85)] backdrop-blur">
                      <Sparkles className="h-2.5 w-2.5" /> Animated
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] uppercase tracking-widest backdrop-blur ${
                      t.premium ? "bg-gold-grad text-black" : "bg-white/15 text-white"
                    }`}
                  >
                    {t.premium ? "Premium" : "Free"}
                  </span>
                </div>
                <a
                  href={`/invitation?template=${t.id}`}
                  className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-1.5 rounded-full bg-black/60 py-1.5 text-[10px] uppercase tracking-widest text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
                >
                  <Eye className="h-3 w-3" /> Live preview
                </a>
              </div>
              <div className="flex items-center justify-between gap-2 p-3">
                <div>
                  <div className="text-sm">{t.title}</div>
                  <div className="text-[10px] uppercase tracking-widest text-foreground/50">
                    {t.category}
                  </div>
                </div>
                <a
                  href={`/editor?template=${t.id}`}
                  className="rounded-full bg-gold-grad px-3 py-1 text-[10px] font-medium text-black"
                >
                  Customize
                </a>
              </div>
            </motion.div>
          ))}
          {list.length === 0 && (
            <div className="col-span-full rounded-2xl glass p-10 text-center text-sm text-foreground/60">
              No templates match your search. Try a different filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
