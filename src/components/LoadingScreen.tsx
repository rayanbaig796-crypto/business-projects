import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { FloatingParticles } from "./FloatingParticles";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Preparing Your Invitation Experience");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Elegant text transitions based on loading progress
    const intervalText = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 12;
        if (next >= 100) {
          clearInterval(intervalText);
          return 100;
        }
        if (next > 40 && next <= 75) {
          setLoadingText("Loading Premium Wedding Designs");
        } else if (next > 75) {
          setLoadingText("Polishing Royal Themes");
        }
        return next;
      });
    }, 180);

    return () => clearInterval(intervalText);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const delay = setTimeout(() => {
        setIsFadingOut(true);
        const completeTimeout = setTimeout(() => {
          onComplete();
        }, 800); // Allow fade-out animation to finish
        return () => clearTimeout(completeTimeout);
      }, 500); // Small pause at 100% for completeness feel
      return () => clearTimeout(delay);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[oklch(0.08_0.02_20)] overflow-hidden"
        >
          {/* Subtle luxurious glowing gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.08),transparent_50%)] pointer-events-none" />
          <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(212,175,55,0.05),transparent_70%)] blur-[80px] pointer-events-none" />

          {/* Glowing Floating Particles */}
          <FloatingParticles quantity={40} />

          {/* Logo & Glow Ring Container */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Soft ambient lighting rotating behind logo */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="absolute h-48 w-48 rounded-full border border-dashed border-[oklch(0.82_0.13_80/0.15)] pointer-events-none flex items-center justify-center"
              style={{
                boxShadow: "0 0 40px rgba(212, 175, 55, 0.05), inset 0 0 20px rgba(212, 175, 55, 0.03)",
              }}
            >
              {/* Rotating orbital light spot */}
              <div className="absolute top-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gold-grad shadow-[0_0_12px_#d4af37]" />
            </motion.div>

            {/* Logo scaling in with blur-to-focus transition */}
            <motion.div
              initial={{ scale: 0.75, filter: "blur(12px)", opacity: 0 }}
              animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col items-center"
            >
              <Logo showText={false} className="h-28 w-auto filter drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]" />
              
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-6 font-serif text-3xl font-light tracking-wide text-gold-grad"
              >
                ShubhVivah
              </motion.h1>
            </motion.div>
          </div>

          {/* Subtext and Loader Section */}
          <div className="absolute bottom-20 flex flex-col items-center gap-4 w-[280px] sm:w-[320px]">
            {/* Elegant Loading Subtext */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-[11px] uppercase tracking-[0.25em] text-center text-foreground font-light min-h-[16px]"
            >
              {loadingText}
            </motion.div>

            {/* Premium Loader Progress Bar */}
            <div className="relative w-full h-[1px] bg-white/10 overflow-hidden rounded-full">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gold-grad"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Emotional Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-[10px] italic font-serif text-center text-foreground mt-1"
            >
              Creating Beautiful Wedding Experiences
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
