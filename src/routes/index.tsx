import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { FloatingParticles } from "@/components/FloatingParticles";
import { InvitationPreview } from "@/components/InvitationPreview";
import { TEMPLATES } from "@/lib/templates";
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
              QR maps, and premium guest experiences.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/editor"
                className="group inline-flex items-center gap-2 rounded-full bg-gold-grad px-6 py-3 text-sm font-medium text-[hsl(0,0%,8%)] ring-gold transition-transform hover:scale-[1.03]"
              >
                Create Invitation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/invitation"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm text-foreground transition-colors hover:bg-white/10"
              >
                <Sparkles className="h-4 w-4 text-[oklch(0.85_0.13_85)]" />
                View Animated Demo
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-foreground/60">
              <div className="flex -space-x-2">
                {["#d4af37", "#e8a3b8", "#9bb6ff", "#bfe3c6"].map((c) => (
                  <span
                    key={c}
                    className="h-7 w-7 rounded-full border-2 border-background"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-foreground">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-[oklch(0.85_0.13_85)] text-[oklch(0.85_0.13_85)]" />
                  ))}
                </div>
                Loved by 12,400+ couples
              </div>
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

      {/* TRENDING TEMPLATES */}
      <Section title="Trending Templates" eyebrow="Crafted with care">
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {TEMPLATES.slice(0, 8).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <a
                href={`/editor?template=${t.id}`}
                className="group block overflow-hidden rounded-2xl glass transition-all hover:-translate-y-1 hover:ring-gold"
              >
                <div className="relative aspect-[3/4] overflow-hidden" style={{ background: t.palette.bg }}>
                  <div className="absolute inset-0 scale-90 transition-transform group-hover:scale-100">
                    <InvitationPreview data={demoData} template={t} compact />
                  </div>
                  <div className="absolute left-2 top-2 flex gap-1">
                    {t.animated && (
                      <span className="rounded-full bg-black/60 px-2 py-0.5 text-[9px] uppercase tracking-widest text-[oklch(0.9_0.13_85)] backdrop-blur">
                        Animated
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
                </div>
                <div className="flex items-center justify-between p-3">
                  <div className="text-sm">{t.title}</div>
                  <span className="text-[10px] uppercase tracking-widest text-foreground/50">
                    {t.category.split(" ")[0]}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm hover:bg-white/10"
          >
            Browse all templates <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* FEATURES */}
      <Section title="Everything for a Cinematic Invite" eyebrow="Features">
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { i: Palette, t: "Live Editor", d: "Type and watch your invitation update with cinematic transitions." },
            { i: MapPin, t: "QR Venue Maps", d: "Paste a Google Maps link — we generate a premium QR card." },
            { i: Sparkles, t: "Animated SVG", d: "Floating petals, glowing mandalas, scroll-driven motion." },
            { i: Heart, t: "RSVP & Countdown", d: "Guests RSVP and watch the day approach in real time." },
            { i: Share2, t: "One-tap Sharing", d: "WhatsApp, Instagram, Telegram with auto-generated message." },
            { i: Music2, t: "Microsite Mode", d: "A premium scrollable booklet that lives on its own URL." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="rounded-2xl glass p-5 transition-all hover:bg-white/[0.06] hover:ring-gold">
              <Icon className="h-5 w-5 text-[oklch(0.85_0.13_85)]" />
              <div className="mt-4 font-serif text-xl">{t}</div>
              <div className="mt-1 text-sm text-foreground/65">{d}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* PRICING */}
      <Section title="Simple, premium pricing" eyebrow="Pricing">
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <PriceCard
            name="Free"
            price="₹0"
            tagline="Try beautiful basics"
            features={["Free poster templates", "Watch ad before download", "Standard quality export"]}
            cta="Start free"
          />
          <PriceCard
            highlighted
            name="Single Animated"
            price="₹39"
            tagline="Perfect for one wedding"
            features={["1 animated invitation", "Premium microsite link", "QR venue card", "WhatsApp share"]}
            cta="Unlock for ₹39"
          />
          <PriceCard
            name="All Access"
            price="₹49"
            tagline="Unlock the full library"
            features={["All animated templates", "Premium microsites", "Priority renders", "No ads, ever"]}
            cta="Get All Access"
          />
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section title="Loved across India" eyebrow="Testimonials">
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { n: "Aanya & Vihaan", q: "Our guests opened the microsite and gasped. The QR map was a hit." },
            { n: "Meera & Arjun", q: "Looked like a luxury Canva. The animated invite went viral on family groups." },
            { n: "Priya & Rohan", q: "Three minutes from sign-up to a shareable invitation. Wild." },
          ].map((r) => (
            <div key={r.n} className="rounded-2xl glass p-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[oklch(0.85_0.13_85)] text-[oklch(0.85_0.13_85)]" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">"{r.q}"</p>
              <div className="mt-4 font-serif text-base">{r.n}</div>
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
          highlighted
            ? "bg-gold-grad text-black"
            : "glass hover:bg-white/10"
        }`}
      >
        {cta}
      </Link>
    </motion.div>
  );
}
