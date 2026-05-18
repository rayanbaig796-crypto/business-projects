import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { InvitationPreview, type InvitationData } from "@/components/InvitationPreview";
import { getTemplate, TEMPLATES } from "@/lib/templates";
import { Copy, Check, Link2, Image as ImageIcon } from "lucide-react";

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
  const [data, setData] = useState<InvitationData>(DEFAULT);
  const [templateId, setTemplateId] = useState<string>(TEMPLATES[0].id);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    const d = sp.get("d");
    if (d) {
      try {
        const parsed = JSON.parse(decodeURIComponent(d));
        const { template, ...rest } = parsed as InvitationData & { template?: string };
        setData(rest);
        if (template) setTemplateId(template);
        setShareUrl(`${window.location.origin}/invitation?d=${d}`);
      } catch {
        setShareUrl(`${window.location.origin}/invitation`);
      }
    } else {
      setShareUrl(`${window.location.origin}/invitation`);
    }
  }, []);

  const template = getTemplate(templateId);
  const message = `✨ You're Invited ✨\nJoin us for the wedding of ${data.bride} & ${data.groom} 💍\nOpen our animated invitation: ${shareUrl}`;

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
        </div>
      </div>
    </div>
  );
}
