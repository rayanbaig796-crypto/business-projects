import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import type { Template } from "@/lib/templates";

export type InvitationData = {
  bride: string;
  groom: string;
  date: string; // ISO yyyy-mm-dd
  time: string;
  venue: string;
  mapsLink: string;
  brideImg?: string | null;
  groomImg?: string | null;
  font?: "serif" | "display" | "script";
};

function MandalaSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 opacity-60">
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "100px 100px" }}
        stroke={color}
        fill="none"
        strokeWidth="0.6"
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <line key={i} x1="100" y1="100" x2="100" y2="20" transform={`rotate(${i * 15} 100 100)`} />
        ))}
        <circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="55" strokeDasharray="2 4" />
        <circle cx="100" cy="100" r="40" />
        <circle cx="100" cy="100" r="22" strokeDasharray="1 3" />
      </motion.g>
    </svg>
  );
}

function CornerFlourish({ color, className = "" }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={`absolute h-24 w-24 ${className}`} fill="none" stroke={color} strokeWidth="0.8">
      <path d="M5 60 C 25 60, 35 45, 40 25 M 60 5 C 60 25, 75 35, 95 40" />
      <circle cx="40" cy="25" r="2" fill={color} />
      <circle cx="95" cy="40" r="2" fill={color} />
      <path d="M15 75 C 28 70, 38 60, 45 50 M 50 45 C 60 38, 70 28, 75 15" strokeDasharray="1 3" />
    </svg>
  );
}

export function InvitationPreview({
  data,
  template,
  compact = false,
}: {
  data: InvitationData;
  template: Template;
  compact?: boolean;
}) {
  const { bg, ink, accent } = template.palette;
  const dateObj = data.date ? new Date(data.date + "T" + (data.time || "00:00")) : null;
  const fontClass =
    data.font === "script" ? "font-script" : data.font === "display" ? "font-serif" : "font-serif";

  return (
    <div
      className="relative mx-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10"
      style={{ backgroundColor: bg, color: ink }}
    >
      {/* Background sheen */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `radial-gradient(60% 40% at 50% 10%, ${accent}22, transparent 70%), radial-gradient(50% 30% at 50% 95%, ${accent}1a, transparent 70%)`,
        }}
      />
      <MandalaSVG color={accent} />
      <CornerFlourish color={accent} className="left-2 top-2" />
      <CornerFlourish color={accent} className="right-2 top-2 rotate-90" />
      <CornerFlourish color={accent} className="left-2 bottom-2 -rotate-90" />
      <CornerFlourish color={accent} className="right-2 bottom-2 rotate-180" />

      {/* Floating petals */}
      {!compact &&
        Array.from({ length: 8 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{
              left: `${10 + i * 11}%`,
              top: "-4%",
              background: accent,
              filter: "blur(0.5px)",
              boxShadow: `0 0 8px ${accent}`,
            }}
            animate={{ y: ["0%", "120%"], opacity: [0, 1, 0], x: [0, i % 2 ? 12 : -12, 0] }}
            transition={{ duration: 9 + i, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
          />
        ))}

      <div className="relative z-10 flex h-full flex-col items-center px-6 pt-20 text-center">
        <div className="text-[10px] uppercase tracking-[0.5em]" style={{ color: accent }}>
          Wedding Invitation
        </div>
        <div className="mt-1 text-[11px] italic opacity-80">together with their families</div>

        <motion.h1
          key={data.bride + data.groom}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`mt-6 ${fontClass} text-3xl leading-tight sm:text-4xl`}
        >
          {data.bride || "Aanya"}
        </motion.h1>
        <div
          className="my-2 font-script text-3xl"
          style={{ color: accent, textShadow: `0 0 18px ${accent}55` }}
        >
          &amp;
        </div>
        <motion.h1
          key={data.groom + data.bride}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className={`${fontClass} text-3xl leading-tight sm:text-4xl`}
        >
          {data.groom || "Vihaan"}
        </motion.h1>

        <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em]">
          <span className="h-px w-10" style={{ background: accent }} />
          <span style={{ color: accent }}>request your presence</span>
          <span className="h-px w-10" style={{ background: accent }} />
        </div>

        <div className="font-serif text-lg">
          {dateObj
            ? dateObj.toLocaleDateString(undefined, {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "Saturday, 12 December 2026"}
        </div>
        <div className="mt-1 text-xs opacity-80">{data.time || "6:30 PM"} onwards</div>

        <div className="mt-4 max-w-[80%] text-xs leading-relaxed opacity-90">
          {data.venue || "The Leela Palace, Udaipur, Rajasthan"}
        </div>

        {!compact && (
          <div className="mt-5 flex items-center gap-2 text-[11px]">
            <span
              className="rounded-full border px-3 py-1"
              style={{ borderColor: `${accent}66`, color: accent }}
            >
              RSVP
            </span>
            <span
              className="rounded-full px-3 py-1"
              style={{ background: `${accent}22`, color: ink }}
            >
              View Story
            </span>
          </div>
        )}
      </div>

      {/* QR Code */}
      {data.mapsLink && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-3 left-3 z-20 flex items-center gap-2 rounded-xl bg-white/95 p-1.5 ring-1"
          style={{ boxShadow: `0 8px 30px ${accent}33` }}
        >
          <div className="rounded-md p-1" style={{ border: `1px solid ${accent}66` }}>
            <QRCodeSVG value={data.mapsLink} size={44} bgColor="#ffffff" fgColor="#0a0a0a" />
          </div>
          <div className="pr-2 text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-700">
            Scan for
            <br />
            Venue
          </div>
        </motion.div>
      )}
    </div>
  );
}
