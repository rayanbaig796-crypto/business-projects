import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { FloatingParticles } from "@/components/FloatingParticles";
import { InvitationPreview } from "@/components/InvitationPreview";
import { CATEGORIES, TEMPLATES } from "@/lib/templates";
import {
  Sparkles,
  Heart,
  MapPin,
  Share2,
  Palette,
  Music2,
  Star,
  Check,
  ArrowRight,
  Search,
  Eye,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Landing });

const demoData = {
  bride: "Aanya",
  groom: "Vihaan",
  date: "2026-12-12",
  time: "18:30",
  venue: "The Leela Palace, Udaipur",
  mapsLink: "https://maps.google.com/?q=Leela+Palace+Udaipur",
};

function Landing() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [premium, setPremium] = useState<"all" | "free" | "premium">("all");
  const [sortBy, setSortBy] = useState<"trending" | "rating" | "alphabetical">("trending");

  // Community Votes state
  const [votesState, setVotesState] = useState<{ [key: string]: { count: number; voted: boolean } }>(() => {
    if (typeof window === "undefined") return {};
    const saved = localStorage.getItem("shubh_votes");
    if (saved) return JSON.parse(saved);
    
    const initial: { [key: string]: { count: number; voted: boolean } } = {};
    TEMPLATES.forEach((t) => {
      initial[t.id] = { count: t.votes, voted: false };
    });
    return initial;
  });

  const handleVote = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setVotesState((prev) => {
      const current = prev[id] || { count: TEMPLATES.find((t) => t.id === id)?.votes || 0, voted: false };
      const nextVoted = !current.voted;
      const nextCount = nextVoted ? current.count + 1 : current.count - 1;
      
      const nextState = {
        ...prev,
        [id]: { count: nextCount, voted: nextVoted }
      };
      
      localStorage.setItem("shubh_votes", JSON.stringify(nextState));
      return nextState;
    });
  };

  // Filter templates list
  const filteredList = useMemo(() => {
    return TEMPLATES.filter((t) => {
      if (cat !== "All" && t.category !== cat) return false;
      if (premium === "free" && t.premium) return false;
      if (premium === "premium" && !t.premium) return false;
      if (q && !`${t.title} ${t.category}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, cat, premium]);

  // Sort list based on community feedback (Trending = highest votes first)
  const sortedList = useMemo(() => {
    const listCopy = [...filteredList];
    if (sortBy === "trending") {
      return listCopy.sort((a, b) => {
        const votesA = votesState[a.id]?.count ?? a.votes;
        const votesB = votesState[b.id]?.count ?? b.votes;
        return votesB - votesA;
      });
    } else if (sortBy === "rating") {
      return listCopy.sort((a, b) => b.rating - a.rating);
    } else {
      return listCopy.sort((a, b) => a.title.localeCompare(b.title));
    }
  }, [filteredList, sortBy, votesState]);

  // Most Loved Spotlight (Top 3 highest voted overall)
  const mostLoved = useMemo(() => {
    return [...TEMPLATES]
      .sort((a, b) => {
        const votesA = votesState[a.id]?.count ?? a.votes;
        const votesB = votesState[b.id]?.count ?? b.votes;
        return votesB - votesA;
      })
      .slice(0, 3);
  }, [votesState]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-36 pb-24 sm:pt-44 sm:pb-32">
        <FloatingParticles count={28} />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs">
              <Sparkles className="h-3.5 w-3.5 text-[oklch(0.85_0.13_85)]" />
              <span className="text-foreground/80">Crafted for modern Indian weddings</span>
            </div>
            <h1 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Create <span className="text-gold-grad">Luxury Wedding</span>
              <br />
              Invitations in Minutes
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg">
              Design, customize, and share beautiful wedding invitations with animated microsites,
              Google Maps integration, and premium guest experiences.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/invitation"
                className="group inline-flex items-center gap-2 rounded-full bg-gold-grad px-6 py-3 text-sm font-medium text-[hsl(0,0%,8%)] ring-gold transition-transform hover:scale-[1.03]"
              >
                <Sparkles className="h-4 w-4 text-[hsl(0,0%,8%)]" />
                View Animated Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-8 -z-10 rounded-[40px] bg-[radial-gradient(ellipse_at_center,oklch(0.82_0.13_80/0.25),transparent_60%)] blur-2xl" />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <InvitationPreview data={demoData} template={TEMPLATES[0]} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MOST LOVED SHOWCASE */}
      <section className="mx-auto max-w-6xl px-5 py-10 border-t border-white/5">
        <div className="flex items-center gap-2 mb-6">
          <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
          <h2 className="font-serif text-xl sm:text-2xl tracking-wide text-foreground font-light">Most Loved Showpieces</h2>
          <span className="text-[9px] uppercase tracking-widest text-muted-foreground px-2 py-0.5 rounded-full border border-white/10 glass ml-2">Trending This Week</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mostLoved.map((t, idx) => (
            <motion.div
              key={`loved-${t.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-2xl glass-strong border border-white/10 p-4 transition-all hover:border-[oklch(0.85_0.13_85/0.3)] flex gap-4"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(212,175,55,0.02)] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

              <div 
                className="relative h-32 w-24 rounded-lg overflow-hidden shrink-0 border border-white/5"
                style={{ background: t.fallbackStyle.background }}
              >
                <div className="scale-90 pointer-events-none">
                  <InvitationPreview data={demoData} template={t} compact />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              <div className="flex flex-col justify-between py-1 w-full">
                <div>
                  <div className="inline-flex items-center gap-1 text-[8px] uppercase tracking-widest text-[oklch(0.85_0.13_85)] bg-[oklch(0.85_0.13_85/0.1)] px-2 py-0.5 rounded-full font-semibold">
                    Rank #{idx + 1}
                  </div>
                  <h3 className="mt-1 text-base font-serif text-foreground font-light">{t.title}</h3>
                  <p className="text-[10px] text-muted-foreground tracking-widest uppercase mt-0.5">{t.category}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2.5 text-[11px] text-foreground/75 mb-3">
                    <span className="flex items-center gap-0.5 text-amber-400">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {t.rating}
                    </span>
                    <span>•</span>
                    <span className="font-medium text-foreground">{votesState[t.id]?.count ?? t.votes} votes</span>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={`/editor?template=${t.id}`}
                      className="rounded-lg bg-gold-grad px-3 py-1.5 text-[10px] font-medium text-black transition-transform hover:scale-[1.03]"
                    >
                      Customize
                    </a>
                    <button 
                      onClick={(e) => handleVote(t.id, e)}
                      className={`rounded-lg px-2.5 py-1.5 text-[10px] border transition-all flex items-center gap-1 ${
                        votesState[t.id]?.voted
                          ? "bg-rose-500/20 border-rose-500/30 text-rose-500"
                          : "border-white/10 hover:bg-white/10 text-foreground"
                      }`}
                    >
                      <Heart className={`h-3 w-3 ${votesState[t.id]?.voted ? "fill-rose-500" : ""}`} />
                      {votesState[t.id]?.voted ? "Loved" : "Love"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TEMPLATE GALLERY SECTION */}
      <Section title="Browse Template Library" eyebrow="Cultural Elegance">
        {/* Controls Bar */}
        <div className="mt-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <div className="flex items-center gap-2 rounded-full glass px-4 py-2.5 flex-1 max-w-md">
              <Search className="h-4 w-4 text-foreground/60" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search templates, traditions, aesthetics..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/40"
              />
            </div>

            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
              <div className="flex gap-1 bg-white/5 border border-white/10 rounded-full p-0.5 shrink-0">
                {(["all", "free", "premium"] as const).map((k) => (
                  <button
                    key={k}
                    onClick={() => setPremium(k)}
                    className={`rounded-full px-3.5 py-1 text-xs transition-all ${
                      premium === k
                        ? "bg-gold-grad text-black font-medium shadow-md shadow-black/25"
                        : "text-foreground/70 hover:bg-white/5"
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-foreground/80 outline-none cursor-pointer hover:bg-white/10 transition-colors shrink-0"
              >
                <option value="trending" className="bg-neutral-950 text-foreground">Trending (Votes)</option>
                <option value="rating" className="bg-neutral-950 text-foreground">Highest Rated</option>
                <option value="alphabetical" className="bg-neutral-950 text-foreground">A - Z</option>
              </select>
            </div>
          </div>

          {/* Cultural Categories Navigation */}
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 no-scrollbar border-b border-white/5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs transition-all ${
                  cat === c
                    ? "bg-gold-grad text-black font-semibold shadow-md shadow-black/20"
                    : "glass text-foreground/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {sortedList.map((t, i) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-2xl glass transition-all hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] hover:ring-1 hover:ring-[oklch(0.85_0.13_85/0.3)]"
              >
                <button
                  onClick={(e) => handleVote(t.id, e)}
                  className={`absolute right-2 top-2 z-30 rounded-full p-2.5 backdrop-blur transition-all active:scale-95 ${
                    votesState[t.id]?.voted
                      ? "bg-rose-500/20 border border-rose-500/30 text-rose-500"
                      : "bg-black/40 border border-white/10 text-white/80 hover:bg-black/60 hover:text-white"
                  }`}
                  aria-label="Upvote this design"
                >
                  <Heart className={`h-3.5 w-3.5 ${votesState[t.id]?.voted ? "fill-rose-500" : ""}`} />
                </button>

                <div
                  className="relative aspect-[3/4] overflow-hidden"
                  style={{ background: t.fallbackStyle.background }}
                >
                  <div className="absolute inset-0 scale-[0.88] transition-transform duration-500 group-hover:scale-95 pointer-events-none">
                    <InvitationPreview data={demoData} template={t} compact />
                  </div>
                  
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a
                      href={`/invitation?template=${t.id}`}
                      className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                    >
                      <Eye className="h-3.5 w-3.5" /> Live Preview
                    </a>
                  </div>

                  <div className="absolute left-2.5 top-2.5 flex flex-col gap-1 pointer-events-none z-20">
                    {t.animated && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[8px] uppercase tracking-widest text-[oklch(0.9_0.13_85)] backdrop-blur border border-white/5">
                        <Sparkles className="h-2 w-2" /> Animated
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2 py-0.5 text-[8px] uppercase tracking-widest backdrop-blur border border-white/5 ${
                        t.premium ? "bg-gold-grad text-black font-semibold" : "bg-white/15 text-white"
                      }`}
                    >
                      {t.premium ? "Premium" : "Free"}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <h4 className="text-sm font-medium text-foreground">{t.title}</h4>
                      <p className="text-[9px] uppercase tracking-widest text-foreground/50 mt-0.5">
                        {t.category}
                      </p>
                    </div>
                    
                    <a
                      href={`/editor?template=${t.id}`}
                      className="rounded-full bg-gold-grad px-3.5 py-1 text-[10px] font-medium text-black transition-transform hover:scale-[1.03] shrink-0"
                    >
                      Customize
                    </a>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-foreground/55 font-sans">
                    <span className="flex items-center gap-0.5 text-amber-400">
                      <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" /> {t.rating}
                    </span>
                    <span>•</span>
                    <span>{votesState[t.id]?.count ?? t.votes} votes</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <Share2 className="h-2.5 w-2.5 opacity-60" /> {t.shares}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {sortedList.length === 0 && (
            <div className="col-span-full rounded-2xl glass p-16 text-center text-sm text-foreground/60 border border-white/5">
              No templates match your search. Try adjusting your filters.
            </div>
          )}
        </div>
      </Section>

      {/* FEATURES */}
      <Section title="Everything for a Cinematic Invite" eyebrow="Features">
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              i: Palette,
              t: "Live Editor",
              d: "Type and watch your invitation update with cinematic transitions.",
            },
            {
              i: MapPin,
              t: "Venue Directions",
              d: "Paste a Google Maps link — we generate premium navigation access.",
            },
            {
              i: Sparkles,
              t: "Animated SVG",
              d: "Floating petals, glowing mandalas, scroll-driven motion.",
            },
            {
              i: Heart,
              t: "RSVP & Countdown",
              d: "Guests RSVP and watch the day approach in real time.",
            },
            {
              i: Share2,
              t: "One-tap Sharing",
              d: "WhatsApp, Instagram, Telegram with auto-generated message.",
            },
            {
              i: Music2,
              t: "Microsite Mode",
              d: "A premium scrollable booklet that lives on its own URL.",
            },
          ].map(({ i: Icon, t, d }) => (
            <div
              key={t}
              className="rounded-2xl glass p-5 transition-all hover:bg-white/[0.06] hover:ring-gold"
            >
              <Icon className="h-5 w-5 text-[oklch(0.85_0.13_85)]" />
              <div className="mt-4 font-serif text-xl">{t}</div>
              <div className="mt-1 text-sm text-foreground/65">{d}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* PRICING */}
      <Section title="Simple, premium pricing" eyebrow="Pricing">
        <div className="mt-10 grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          <PriceCard
            name="Free"
            price="₹0"
            tagline="Try beautiful basics"
            features={[
              "Free static poster designs",
              "Watch advertisement before export",
              "Standard quality image download",
            ]}
            cta="Start free"
          />
          <PriceCard
            highlighted
            name="All Access Premium"
            price="₹49"
            tagline="Customize any template"
            features={[
              "Customize all premium animated designs",
              "Unlimited animated invitation microsites",
              "Priority rendering & high resolution",
              "Ad-free cinematic guest experience",
            ]}
            cta="Get All Access"
          />
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section title="Loved across India" eyebrow="Testimonials">
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              n: "Aanya & Vihaan",
              q: "Our guests opened the microsite and gasped. The Google Maps link was a hit.",
            },
            {
              n: "Meera & Arjun",
              q: "Looked like a luxury Canva. The animated invite went viral on family groups.",
            },
            {
              n: "Priya & Rohan",
              q: "Three minutes from sign-up to a shareable invitation. Wild.",
            },
          ].map((r) => (
            <div key={r.n} className="rounded-2xl glass p-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-[oklch(0.85_0.13_85)] text-[oklch(0.85_0.13_85)]"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">"{r.q}"</p>
              <div className="mt-4 font-serif text-base">{r.n}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section title="Frequently Asked Questions" eyebrow="FAQ">
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
          {[
            {
              q: "Do guests need an app to open the invitation?",
              a: "No! The microsite opens in any standard web browser on their phone or computer.",
            },
            {
              q: "Can I use my own music?",
              a: "Currently we offer a curated selection of premium tracks, but custom uploads are coming soon.",
            },
            {
              q: "How does the RSVP system work?",
              a: "Guests click RSVP on your microsite, and their responses are instantly sent directly to your email or WhatsApp.",
            },
            {
              q: "Is the QR code for Google Maps automatic?",
              a: "Yes. Just paste your venue's Google Maps link, and we instantly generate a scan-for-directions QR code on your poster.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="rounded-2xl glass p-6 transition-all hover:bg-white/[0.06] hover:ring-gold"
            >
              <h3 className="font-serif text-lg text-gold-grad">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-foreground/60">
            © {new Date().getFullYear()} ShubhVivah · Designed with love for Indian weddings.
          </div>
          <div className="flex gap-5 text-xs text-foreground/60">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-[10px] uppercase tracking-[0.4em] text-[oklch(0.85_0.13_85)]">
          {eyebrow}
        </div>
        <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}

function PriceCard({
  name,
  price,
  tagline,
  features,
  cta,
  highlighted,
}: {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`group relative overflow-hidden rounded-3xl p-6 transition-all ${
        highlighted ? "glass-strong ring-gold glow-gold" : "glass hover:ring-gold"
      }`}
    >
      {highlighted && (
        <div className="absolute right-4 top-4 rounded-full bg-gold-grad px-3 py-0.5 text-[10px] uppercase tracking-widest text-black">
          Most loved
        </div>
      )}
      <div className="text-xs uppercase tracking-[0.3em] text-foreground/60">{name}</div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="font-serif text-5xl text-gold-grad">{price}</span>
        {price !== "₹0" && <span className="text-xs text-foreground/60">one-time</span>}
      </div>
      <div className="mt-1 text-sm text-foreground/70">{tagline}</div>
      <ul className="mt-6 space-y-2 text-sm">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-[oklch(0.85_0.13_85)]" />
            <span className="text-foreground/85">{f}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/editor"
        className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:scale-[1.02] ${
          highlighted ? "bg-gold-grad text-black" : "glass hover:bg-white/10"
        }`}
      >
        {cta}
      </Link>
    </motion.div>
  );
}
