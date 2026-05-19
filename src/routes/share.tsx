import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { InvitationPreview, type InvitationData } from "@/components/InvitationPreview";
import { getTemplate } from "@/lib/templates";
import { useInvitationStore } from "@/lib/store";
import {
  Copy,
  Check,
  Link2,
  Image as ImageIcon,
  Lock,
  Sparkles,
  ShieldCheck,
  Loader2,
} from "lucide-react";

export const Route = createFileRoute("/share")({ component: Share });

const DEFAULT: InvitationData = {
  bride: "Aanya",
  groom: "Vihaan",
  date: "2026-12-12",
  time: "18:30",
  venue: "The Leela Palace, Udaipur",
  mapsLink: "",
};

function Share() {
  const store = useInvitationStore();
  const [urlData, setUrlData] = useState<InvitationData | null>(null);
  const [urlTemplateId, setUrlTemplateId] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const data = urlData || store.data;
  const templateId = urlTemplateId || store.templateId;
  const template = getTemplate(templateId);

  const [isPaid, setIsPaid] = useState(false);
  const [payingOption, setPayingOption] = useState<"single" | "all" | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    const d = sp.get("d");
    if (d) {
      try {
        const parsed = JSON.parse(decodeURIComponent(d));
        const { template, ...rest } = parsed as InvitationData & { template?: string };
        setUrlData(rest);
        if (template) setUrlTemplateId(template);
        setShareUrl(`${window.location.origin}/invitation?d=${d}`);
      } catch {
        setShareUrl(`${window.location.origin}/invitation`);
      }
    } else {
      setShareUrl(`${window.location.origin}/invitation`);
    }
  }, []);

  useEffect(() => {
    if (!template.premium) {
      setIsPaid(true);
      return;
    }
    const unlockedSingle = localStorage.getItem(`shubh_unlocked_${template.id}`);
    const unlockedAll = localStorage.getItem(`shubh_all_access`);
    if (unlockedSingle || unlockedAll) {
      setIsPaid(true);
    } else {
      setIsPaid(false);
    }
  }, [template]);

  const handlePayment = (option: "single" | "all") => {
    setPayingOption(option);
    setTimeout(() => {
      if (option === "single") {
        localStorage.setItem(`shubh_unlocked_${template.id}`, "true");
      } else {
        localStorage.setItem(`shubh_all_access`, "true");
      }
      setIsPaid(true);
      setPayingOption(null);
    }, 1800);
  };

  const message = `💍 You're Invited 💍\nJoin us for our special day ✨\nClick below to view our animated invitation:\n${shareUrl}`;

  const copy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const shareLinks = [
    {
      name: "WhatsApp",
      color: "#25D366",
      href: `https://wa.me/?text=${encodeURIComponent(message)}`,
    },
    {
      name: "Telegram",
      color: "#26A5E4",
      href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(message)}`,
    },
    {
      name: "Instagram",
      color: "#E1306C",
      href: `https://www.instagram.com/`,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-5xl px-5 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[10px] uppercase tracking-[0.4em] text-[oklch(0.85_0.13_85)]">
            Almost there
          </div>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Your invitation is <span className="text-gold-grad">ready</span>
          </h1>
          <p className="mt-3 max-w-xl text-foreground/70">
            Share your invitation poster and animated microsite with family and friends.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl glass p-6"
          >
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground/60">
              <ImageIcon className="h-3.5 w-3.5 text-[oklch(0.85_0.13_85)]" />
              Poster preview
            </div>
            <InvitationPreview data={data} template={template} />
            <div className="mt-4 text-center text-[11px] text-foreground/55">
              Auto-attached when you share on WhatsApp & Telegram
            </div>
          </motion.div>

          {isPaid ? (
            <div className="space-y-4">
              <div className="rounded-2xl glass p-5">
                <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground/60">
                  <Link2 className="h-3.5 w-3.5 text-[oklch(0.85_0.13_85)]" />
                  Microsite link
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/[0.05] p-2 ring-1 ring-white/10">
                  <div className="flex-1 truncate px-2 text-sm text-foreground/85">{shareUrl}</div>
                  <button
                    onClick={copy}
                    className="inline-flex items-center gap-1 rounded-lg bg-gold-grad px-3 py-1.5 text-xs font-medium text-black transition-transform hover:scale-[1.03]"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="rounded-2xl glass p-5">
                <div className="mb-3 text-xs uppercase tracking-[0.3em] text-foreground/60">
                  Auto-generated message
                </div>
                <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-3 text-xs leading-relaxed text-foreground/85">
                  {message}
                </pre>
              </div>

              <div className="rounded-2xl glass p-5">
                <div className="mb-3 text-xs uppercase tracking-[0.3em] text-foreground/60">
                  Share via
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {shareLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex flex-col items-center gap-2 rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:ring-white/30"
                    >
                      <span
                        className="grid h-10 w-10 place-items-center rounded-full text-white"
                        style={{ background: s.color }}
                      >
                        {s.name[0]}
                      </span>
                      <span className="text-xs">{s.name}</span>
                    </a>
                  ))}
                </div>
                <a
                  href={shareUrl}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-gold-grad px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
                >
                  Open animated invitation
                </a>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl glass p-6 border border-white/10 relative overflow-hidden flex flex-col justify-between">
              {payingOption && (
                <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-3 animate-fade-in">
                  <Loader2 className="h-8 w-8 text-[oklch(0.85_0.13_85)] animate-spin" />
                  <span className="text-xs uppercase tracking-widest text-foreground/85">Processing Secure Payment...</span>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-rose-400">
                  <Lock className="h-3.5 w-3.5" />
                  Premium Design Locked
                </div>
                <h2 className="mt-3 font-serif text-2xl text-foreground font-light">Unlock Animated Invitation</h2>
                <p className="mt-2 text-xs text-foreground/60 leading-relaxed">
                  You customized a premium animated template. Choose one of our options below to activate the live wedding microsite and start sharing with guests.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Option 1: Single Design */}
                  <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 flex flex-col justify-between transition-colors hover:bg-white/[0.05]">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-foreground/50">Single Invite</div>
                      <div className="mt-1 font-serif text-3xl text-gold-grad">₹39</div>
                      <p className="mt-2 text-[11px] text-foreground/70 leading-relaxed">
                        Unlock only this customized wedding invitation. Perfect for a single use case.
                      </p>
                    </div>
                    <button
                      onClick={() => handlePayment("single")}
                      className="mt-5 w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-xs font-medium text-white transition-all hover:bg-white/15"
                    >
                      Unlock Single for ₹39
                    </button>
                  </div>

                  {/* Option 2: All Access */}
                  <div className="rounded-xl bg-gradient-to-br from-[rgba(212,175,55,0.06)] to-transparent border border-[oklch(0.85_0.13_85/0.25)] p-4 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute right-2 top-2 rounded-full bg-gold-grad px-2 py-0.5 text-[8px] uppercase tracking-widest text-black font-semibold animate-pulse">
                      Best Value
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[oklch(0.85_0.13_85)]">All Access Pass</div>
                      <div className="mt-1 font-serif text-3xl text-gold-grad">₹49</div>
                      <p className="mt-2 text-[11px] text-foreground/70 leading-relaxed">
                        Unlock ALL premium templates & designs. Edit and create unlimited links.
                      </p>
                    </div>
                    <button
                      onClick={() => handlePayment("all")}
                      className="mt-5 w-full rounded-lg bg-gold-grad px-3 py-2 text-xs font-semibold text-black transition-transform hover:scale-[1.02]"
                    >
                      Get All Access for ₹49
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-foreground/40 border-t border-white/5 pt-4">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>Secure payment processed instantly. Money-back guaranteed.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
