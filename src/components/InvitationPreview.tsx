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
  font?: "serif" | "display" | "script" | "cinzel" | "bodoni" | "pinyon" | "allura";
};

function MandalaSVG({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 opacity-30 pointer-events-none"
    >
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "100px 100px" }}
        stroke={color}
        fill="none"
        strokeWidth="0.5"
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="100"
            x2="100"
            y2="20"
            transform={`rotate(${i * 15} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="55" strokeDasharray="2 4" />
        <circle cx="100" cy="100" r="40" />
      </motion.g>
    </svg>
  );
}

function CornerFlourish({ color, className = "" }: { color: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`absolute h-20 w-20 opacity-40 pointer-events-none ${className}`}
      fill="none"
      stroke={color}
      strokeWidth="0.8"
    >
      <path d="M5 60 C 25 60, 35 45, 40 25 M 60 5 C 60 25, 75 35, 95 40" />
      <circle cx="40" cy="25" r="2" fill={color} />
      <circle cx="95" cy="40" r="2" fill={color} />
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
  const { background: bg, inkColor: ink, accentColor: accent, borderColor } = template.fallbackStyle;
  const dateObj = data.date ? new Date(data.date + "T" + (data.time || "00:00")) : null;
  
  // Use user-selected override font or template default font
  const activeFont = data.font || template.fallbackStyle.fontFamily;
  const fontClass =
    activeFont === "script" ? "font-script" :
    activeFont === "display" ? "font-display" :
    activeFont === "cinzel" ? "font-cinzel" :
    activeFont === "bodoni" ? "font-bodoni" :
    activeFont === "pinyon" ? "font-pinyon" :
    activeFont === "allura" ? "font-allura" :
    "font-serif";

  return (
    <div
      className="relative mx-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-3xl shadow-2xl transition-all"
      style={{ 
        background: bg, 
        color: ink,
        border: `3px double ${borderColor}80`,
        boxShadow: `0 20px 40px rgba(0,0,0,0.5), inset 0 0 40px rgba(0,0,0,0.8)`
      }}
    >
      {/* LAYER 1: Static PNG Template Background from Admin */}
      <img
        src={template.pngBackground}
        alt=""
        className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none opacity-40 mix-blend-overlay"
        onError={(e) => {
          // If PNG is not found, we gracefully fallback to the premium double-borders & radial texture
          e.currentTarget.style.display = "none";
        }}
      />

      {/* Decorative Overlays (simulating card watermark & flourishes) */}
      <MandalaSVG color={accent} />
      <CornerFlourish color={accent} className="left-2 top-2" />
      <CornerFlourish color={accent} className="right-2 top-2 rotate-90" />
      <CornerFlourish color={accent} className="left-2 bottom-2 -rotate-90" />
      <CornerFlourish color={accent} className="right-2 bottom-2 rotate-180" />

      {/* Floating particles */}
      {!compact && template.animated && (
        Array.from({ length: 8 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full"
            style={{
              left: `${15 + i * 10}%`,
              top: "-5%",
              background: accent,
              filter: "blur(0.5px)",
              boxShadow: `0 0 6px ${accent}`,
            }}
            animate={{ y: ["0%", "125%"], opacity: [0, 0.8, 0], x: [0, i % 2 ? 10 : -10, 0] }}
            transition={{ duration: 10 + i, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          />
        ))
      )}

      {/* LAYER 2: Dynamic Editable Overlay Elements */}
      <div className="relative z-10 flex h-full flex-col items-center px-6 pt-16 text-center justify-between pb-10">
        
        {/* Header decoration */}
        <div className="flex flex-col items-center">
          <div className="text-[9px] uppercase tracking-[0.4em]" style={{ color: accent }}>
            Wedding Invitation
          </div>
          <div className="mt-0.5 text-[10px] italic opacity-75">together with their families</div>
        </div>

        {/* Couple Names Section */}
        <div className="w-full flex-1 flex flex-col justify-center py-2">
          <motion.h1
            key={data.bride}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`${fontClass} text-3xl sm:text-4xl leading-tight tracking-wide`}
          >
            {data.bride || "Bride"}
          </motion.h1>
          
          <div
            className="my-1.5 font-script text-2xl"
            style={{ color: accent, textShadow: `0 0 10px ${accent}40` }}
          >
            &amp;
          </div>

          <motion.h1
            key={data.groom}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className={`${fontClass} text-3xl sm:text-4xl leading-tight tracking-wide`}
          >
            {data.groom || "Groom"}
          </motion.h1>
        </div>

        {/* Couple Photo Overlays (Rendered dynamically if uploaded) */}
        {(data.brideImg || data.groomImg) && (
          <div className="my-2 flex justify-center items-center -space-x-3">
            {data.brideImg && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="h-12 w-12 rounded-full border border-white/20 overflow-hidden shadow-lg ring-2 ring-gold/20"
              >
                <img src={data.brideImg} alt="Bride" className="h-full w-full object-cover" />
              </motion.div>
            )}
            {data.groomImg && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="h-12 w-12 rounded-full border border-white/20 overflow-hidden shadow-lg ring-2 ring-gold/20 z-10"
              >
                <img src={data.groomImg} alt="Groom" className="h-full w-full object-cover" />
              </motion.div>
            )}
          </div>
        )}

        {/* Details Section */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em]">
            <span className="h-px w-6" style={{ background: `${accent}40` }} />
            <span style={{ color: accent }}>Save The Date</span>
            <span className="h-px w-6" style={{ background: `${accent}40` }} />
          </div>

          <div className="font-serif text-sm tracking-wide">
            {dateObj
              ? dateObj.toLocaleDateString(undefined, {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "Saturday, 12 Dec 2026"}
          </div>
          <div className="text-[11px] opacity-75">{data.time || "6:30 PM"} onwards</div>

          <div className="mt-2 max-w-[85%] text-[10px] leading-relaxed opacity-80 font-sans tracking-wide">
            {data.venue || "The Leela Palace, Udaipur, Rajasthan"}
          </div>
        </div>

        {/* Live Invitation Badges */}
        {!compact && (
          <div className="mt-3 flex items-center gap-2 text-[9px] tracking-wider uppercase">
            <span
              className="rounded-full border px-2.5 py-0.5"
              style={{ borderColor: `${accent}40`, color: accent }}
            >
              RSVP
            </span>
            <span
              className="rounded-full px-2.5 py-0.5"
              style={{ background: `${accent}20`, color: ink }}
            >
              Timeline
            </span>
          </div>
        )}
      </div>

      {/* QR CODE OVERLAY SYSTEM: Placed bottom-left when Google Maps link is pasted */}
      {data.mapsLink && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-3 left-3 z-20 flex flex-col items-center gap-1 rounded-lg p-1.5 backdrop-blur-md transition-all shadow-md"
          style={{ background: `${accent}0a`, border: `1px solid ${accent}20` }}
        >
          <div className="p-0.5 bg-white rounded-sm">
            <QRCodeSVG value={data.mapsLink} size={36} fgColor="#000" bgColor="#fff" />
          </div>
          <span className="text-[5px] font-bold uppercase tracking-[0.2em]" style={{ color: ink }}>
            Scan for Venue
          </span>
        </motion.div>
      )}
    </div>
  );
}
