import { motion } from "framer-motion";
import { useMemo } from "react";

export function FloatingParticles({ count = 24 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 4,
        dur: 6 + Math.random() * 8,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[oklch(0.9_0.13_85)]"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            filter: "blur(0.5px)",
            boxShadow: "0 0 12px 2px oklch(0.85 0.13 85 / 0.6)",
          }}
          animate={{ y: [-10, -40, -10], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
