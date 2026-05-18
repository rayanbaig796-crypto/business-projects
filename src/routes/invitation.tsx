import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { FloatingParticles } from "@/components/FloatingParticles";
import { getTemplate, TEMPLATES } from "@/lib/templates";
import type { InvitationData } from "@/components/InvitationPreview";
import { MapPin, Heart, Calendar, Camera, Send, Sparkles } from "lucide-react";

export const Route = createFileRoute("/invitation")({ component: Microsite });

const DEFAULT: InvitationData = {
  bride: "Aanya",
  groom: "Vihaan",
  date: "2026-12-12",
  time: "18:30",
  venue: "The Leela Palace, Udaipur, Rajasthan",
  mapsLink: "https://maps.google.com/?q=Leela+Palace+Udaipur",
};

function useCountdown(target: Date | null) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!target) return null;
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function Microsite() {
  const [data, setData] = useState<InvitationData>(DEFAULT);
  const [templateId, setTemplateId] = useState<string>(TEMPLATES[0].id);
  const [opened, setOpened] = useState(false);
  const [rsvp, setRsvp] = useState<"yes" | "no" | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    const d = sp.get("d");
    const t = sp.get("template");
    if (d) {
      try {
        const parsed = JSON.parse(decodeURIComponent(d));
        const { template, ...rest } = parsed as InvitationData & { template?: string };
        setData(rest);
        if (template) setTemplateId(template);
      } catch {}
    }
    if (t) setTemplateId(t);
  }, []);

  const template = useMemo(() => getTemplate(templateId), [templateId]);
  const { bg, ink, accent } = template.palette;
  const dateObj = data.date ? new Date(data.date + "T" + (data.time || "00:00")) : null;
  const cd = useCountdown(dateObj);

  const events = [
    { name: "Mehndi", time: "Dec 10 · 4:00 PM" },
    { name: "Sangeet", time: "Dec 11 · 7:00 PM" },
    { name: "Wedding Ceremony", time: "Dec 12 · 6:30 PM" },
    { name: "Reception", time: "Dec 13 · 8:00 PM" },
  ];

  return (
    <div className="min-h-screen text-foreground" style={{ background: bg, color: ink }}>
      <AnimatePresence>
        {!opened && (
          <motion.button
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            onClick={() => setOpened(true)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: bg, color: ink }}
          >
            <FloatingParticles count={36} />
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-[10px] uppercase tracking-[0.5em]"
              style={{ color: accent }}
            >
              You are invited
            </motion.div>
            <div className="mt-6 font-serif text-5xl sm:text-6xl">
              {data.bride}
              <span className="font-script mx-3 text-4xl" style={{ color: accent }}>
                &amp;
              </span>
              {data.groom}
            </div>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs uppercase tracking-[0.3em]"
              style={{ border: `1px solid ${accent}66`, color: accent }}>
              <Sparkles className="h-3 w-3" /> Tap to open invitation
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative overflow-hidden px-5 pt-24 pb-20 text-center">
        <FloatingParticles count={20} />
        <div
          className="absolute inset-0 -z-10 opacity-50"
          style={{
            backgroundImage: `radial-gradient(50% 30% at 50% 10%, ${accent}33, transparent 70%)`,
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-[10px] uppercase tracking-[0.5em]" style={{ color: accent }}>
            with love, together with our families
          </div>
          <h1 className="mt-6 font-serif text-5xl leading-tight sm:text-7xl">{data.bride}</h1>
          <div className="my-3 font-script text-5xl" style={{ color: accent }}>
            &amp;
          </div>
          <h1 className="font-serif text-5xl leading-tight sm:text-7xl">{data.groom}</h1>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full px-5 py-2 text-xs uppercase tracking-[0.3em]"
            style={{ border: `1px solid ${accent}55`, color: accent }}>
            <Calendar className="h-3.5 w-3.5" />
            {dateObj?.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}
            · {data.time}
          </div>
        </motion.div>
      </section>

      {/* COUNTDOWN */}
      {cd && (
        <section className="px-5 pb-16">
          <div className="mx-auto grid max-w-md grid-cols-4 gap-2 text-center">
            {([
              ["Days", cd.days],
              ["Hours", cd.hours],
              ["Min", cd.minutes],
              ["Sec", cd.seconds],
            ] as const).map(([label, v]) => (
              <div
                key={label}
                className="rounded-2xl p-3"
                style={{ background: `${accent}14`, border: `1px solid ${accent}33` }}
              >
                <div className="font-serif text-3xl" style={{ color: ink }}>
                  {String(v).padStart(2, "0")}
                </div>
                <div className="text-[10px] uppercase tracking-widest" style={{ color: `${ink}99` }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* COUPLE STORY */}
      <Section title="Our Story" accent={accent}>
        <p className="mx-auto max-w-xl text-center text-sm leading-relaxed opacity-85">
          From a chance meeting in a Mumbai café to monsoon walks in Bandra and a sunrise proposal in Udaipur —
          our story has been a gentle, golden thread. We can't wait to begin the next chapter, with you by our side.
        </p>
      </Section>

      {/* EVENTS */}
      <Section title="Wedding Events" accent={accent}>
        <div className="mx-auto grid max-w-2xl gap-3">
          {events.map((e, i) => (
            <motion.div
              key={e.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center justify-between rounded-2xl px-5 py-4"
              style={{ background: `${accent}10`, border: `1px solid ${accent}25` }}
            >
              <div>
                <div className="font-serif text-xl">{e.name}</div>
                <div className="mt-0.5 text-xs opacity-70">{e.time}</div>
              </div>
              <Heart className="h-4 w-4" style={{ color: accent }} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* GALLERY */}
      <Section title="Moments" accent={accent}>
        <div className="mx-auto grid max-w-2xl grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${accent}33, ${bg})`,
                border: `1px solid ${accent}22`,
              }}
            >
              <Camera
                className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 opacity-40"
                style={{ color: accent }}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* VENUE + QR */}
      <Section title="Venue" accent={accent}>
        <div className="mx-auto max-w-md rounded-3xl p-6 text-center"
          style={{ background: `${accent}10`, border: `1px solid ${accent}30` }}>
          <MapPin className="mx-auto h-5 w-5" style={{ color: accent }} />
          <div className="mt-3 font-serif text-2xl">{data.venue}</div>
          {data.mapsLink && (
            <>
              <div className="mt-5 inline-flex items-center gap-3 rounded-2xl bg-white p-2">
                <div className="rounded-md p-1" style={{ border: `1px solid ${accent}55` }}>
                  <QRCodeSVG value={data.mapsLink} size={96} bgColor="#ffffff" fgColor="#0a0a0a" />
                </div>
                <div className="pr-3 text-left text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-700">
                  Scan for
                  <br />
                  Venue
                </div>
              </div>
              <div>
                <a
                  href={data.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium"
                  style={{ background: accent, color: bg }}
                >
                  Open in Google Maps
                </a>
              </div>
            </>
          )}
        </div>
      </Section>

      {/* RSVP */}
      <Section title="RSVP" accent={accent}>
        <div className="mx-auto max-w-md text-center">
          <p className="text-sm opacity-80">
            Your presence is our greatest gift. Please let us know if you can make it.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            {(["yes", "no"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setRsvp(v)}
                className="rounded-full px-6 py-2 text-sm transition-all"
                style={{
                  background: rsvp === v ? accent : "transparent",
                  color: rsvp === v ? bg : ink,
                  border: `1px solid ${accent}`,
                }}
              >
                {v === "yes" ? "Joyfully accepts" : "Regretfully declines"}
              </button>
            ))}
          </div>
          {rsvp && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 inline-flex items-center gap-2 text-xs"
              style={{ color: accent }}
            >
              <Send className="h-3.5 w-3.5" />
              Thank you — your response is on its way.
            </motion.div>
          )}
        </div>
      </Section>

      <footer className="py-12 text-center text-[10px] uppercase tracking-[0.4em]" style={{ color: `${ink}80` }}>
        Made with ❤ on ShubhVivah
      </footer>
    </div>
  );
}

function Section({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5 py-14">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center font-serif text-3xl sm:text-4xl"
      >
        <span
          className="mr-3 inline-block h-px w-8 align-middle"
          style={{ background: accent }}
        />
        {title}
        <span
          className="ml-3 inline-block h-px w-8 align-middle"
          style={{ background: accent }}
        />
      </motion.h2>
      {children}
    </section>
  );
}
