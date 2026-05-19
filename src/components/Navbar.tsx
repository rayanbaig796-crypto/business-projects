import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-3 left-1/2 z-50 w-[min(1100px,calc(100%-1.5rem))] -translate-x-1/2 rounded-2xl glass-strong px-4 py-3"
    >
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {[
            { to: "/templates", label: "Templates" },
            { to: "/editor", label: "Editor" },
            { to: "/invitation", label: "Demo" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/editor"
          className="rounded-full bg-gold-grad px-4 py-2 text-xs font-medium text-[hsl(0,0%,8%)] transition-transform hover:scale-[1.03]"
        >
          Create Invitation
        </Link>
      </div>
    </motion.header>
  );
}
