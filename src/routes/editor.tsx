import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { InvitationPreview, type InvitationData } from "@/components/InvitationPreview";
import { getTemplate, TEMPLATES } from "@/lib/templates";
import {
  Upload,
  Type,
  Palette,
  MapPin,
  CalendarDays,
  Clock,
  Heart,
  Sparkles,
  Save,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/editor")({ component: Editor });

const DEFAULT: InvitationData = {
  bride: "Aanya",
  groom: "Vihaan",
  date: "2026-12-12",
  time: "18:30",
  venue: "The Leela Palace, Udaipur, Rajasthan",
  mapsLink: "",
  brideImg: null,
  groomImg: null,
  font: "serif",
};

function Editor() {
  const [data, setData] = useState<InvitationData>(DEFAULT);
  const [templateId, setTemplateId] = useState<string>(() => {
    if (typeof window === "undefined") return TEMPLATES[0].id;
    const sp = new URLSearchParams(window.location.search);
    return sp.get("template") || TEMPLATES[0].id;
  });
  const [saved, setSaved] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const template = useMemo(() => getTemplate(templateId), [templateId]);

  // simulated autosave
  useEffect(() => {
    setSaved(false);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setSaved(true), 700);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [data, templateId]);

  const update = <K extends keyof InvitationData>(k: K, v: InvitationData[K]) =>
    setData((p) => ({ ...p, [k]: v }));

  const handleShare = () => {
    if (typeof window === "undefined") return;
    const payload = encodeURIComponent(JSON.stringify({ ...data, template: templateId }));
    window.location.href = `/share?d=${payload}`;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-12 lg:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-[oklch(0.85_0.13_85)]">
              Invitation Editor
            </div>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl">
              Design your <span className="text-gold-grad">moment</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <motion.div
              key={String(saved)}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 text-xs text-foreground/60"
            >
              <Save className="h-3.5 w-3.5" />
              {saved ? "Saved" : "Saving..."}
            </motion.div>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-full bg-gold-grad px-4 py-2 text-xs font-medium text-black transition-transform hover:scale-[1.03]"
            >
              Continue to share <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          {/* SIDEBAR */}
          <div className="space-y-4">
            <Panel icon={Heart} title="Couple">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Bride">
                  <input
                    value={data.bride}
                    onChange={(e) => update("bride", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </Field>
                <Field label="Groom">
                  <input
                    value={data.groom}
                    onChange={(e) => update("groom", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </Field>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <PhotoPicker
                  label="Bride photo"
                  value={data.brideImg ?? null}
                  onChange={(v) => update("brideImg", v)}
                />
                <PhotoPicker
                  label="Groom photo"
                  value={data.groomImg ?? null}
                  onChange={(v) => update("groomImg", v)}
                />
              </div>
            </Panel>

            <Panel icon={CalendarDays} title="When & Where">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date">
                  <input
                    type="date"
                    value={data.date}
                    onChange={(e) => update("date", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </Field>
                <Field label="Time" icon={Clock}>
                  <input
                    type="time"
                    value={data.time}
                    onChange={(e) => update("time", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </Field>
              </div>
              <Field label="Venue" className="mt-3">
                <input
                  value={data.venue}
                  onChange={(e) => update("venue", e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                />
              </Field>
              <Field label="Google Maps link" icon={MapPin} className="mt-3">
                <input
                  value={data.mapsLink}
                  onChange={(e) => update("mapsLink", e.target.value)}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/40"
                />
              </Field>
              {data.mapsLink && (
                <div className="mt-2 flex items-center gap-2 rounded-lg bg-[oklch(0.85_0.13_85)/0.1] px-2 py-1.5 text-[11px] text-[oklch(0.9_0.13_85)]">
                  <Sparkles className="h-3 w-3" />
                  QR code added to invitation
                </div>
              )}
            </Panel>

            <Panel icon={Type} title="Typography">
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { v: "serif", l: "Classic" },
                    { v: "display", l: "Display" },
                    { v: "script", l: "Script" },
                  ] as const
                ).map((f) => (
                  <button
                    key={f.v}
                    onClick={() => update("font", f.v)}
                    className={`rounded-xl px-2 py-3 text-center transition-all ${
                      data.font === f.v
                        ? "bg-gold-grad text-black"
                        : "glass hover:bg-white/10"
                    }`}
                  >
                    <div className={f.v === "script" ? "font-script text-xl" : "font-serif text-base"}>
                      Aa
                    </div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-widest">{f.l}</div>
                  </button>
                ))}
              </div>
            </Panel>

            <Panel icon={Palette} title="Theme">
              <div className="grid grid-cols-4 gap-2">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTemplateId(t.id)}
                    className={`group relative aspect-square overflow-hidden rounded-xl transition-all ${
                      templateId === t.id ? "ring-2 ring-[oklch(0.85_0.13_85)]" : "ring-1 ring-white/10"
                    }`}
                    style={{ background: t.palette.bg }}
                    title={t.title}
                  >
                    <div
                      className="absolute inset-2 rounded-md"
                      style={{
                        background: `linear-gradient(135deg, ${t.palette.accent}, transparent 60%)`,
                      }}
                    />
                    <div
                      className="absolute bottom-1 left-1 right-1 truncate text-[8px] font-medium uppercase tracking-widest"
                      style={{ color: t.palette.ink }}
                    >
                      {t.title.split(" ")[0]}
                    </div>
                  </button>
                ))}
              </div>
            </Panel>
          </div>

          {/* PREVIEW */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="rounded-3xl glass p-6 sm:p-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <InvitationPreview data={data} template={template} />
                </motion.div>
                <div className="mt-5 text-center text-xs text-foreground/60">
                  Live preview · changes appear instantly
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Panel({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl glass p-4">
      <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-foreground/70">
        <Icon className="h-3.5 w-3.5 text-[oklch(0.85_0.13_85)]" />
        {title}
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  className = "",
  children,
}: {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block rounded-xl bg-white/[0.04] px-3 py-2 ring-1 ring-white/10 transition-colors focus-within:ring-[oklch(0.85_0.13_85)] ${className}`}>
      <div className="mb-0.5 flex items-center gap-1 text-[10px] uppercase tracking-widest text-foreground/55">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </div>
      {children}
    </label>
  );
}

function PhotoPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onFile = (f?: File) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => onChange(typeof r.result === "string" ? r.result : null);
    r.readAsDataURL(f);
  };
  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="relative flex aspect-[1/1] items-center justify-center overflow-hidden rounded-xl bg-white/[0.04] ring-1 ring-white/10 transition-colors hover:ring-[oklch(0.85_0.13_85)]"
    >
      {value ? (
        <img src={value} alt={label} className="h-full w-full object-cover" />
      ) : (
        <div className="text-center text-[10px] text-foreground/60">
          <Upload className="mx-auto mb-1 h-4 w-4" />
          {label}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0])}
      />
    </button>
  );
}
