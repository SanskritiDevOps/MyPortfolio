import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { navLinks, profile } from "../../data/portfolioData";
import Button from "../ui/Button";
import StatusDot from "../ui/StatusDot";
import { EASE } from "../ui/motion";

export default function MobileNav({ open, onClose, active }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav"
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-ink-950/90 p-3 shadow-2xl backdrop-blur-xl md:hidden"
        >
          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
          >
            {navLinks.map((link) => (
              <motion.li
                key={link.id}
                variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
              >
                <a
                  href={`#${link.id}`}
                  onClick={onClose}
                  className={`flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium transition-colors ${
                    active === link.id ? "bg-white/6 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  <ArrowUpRight size={16} className="text-zinc-600" />
                </a>
              </motion.li>
            ))}
          </motion.ul>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/6 px-1 pt-3">
            <span className="flex items-center gap-2 font-mono text-[11px] text-emerald-300">
              <StatusDot /> Open to work
            </span>
            <Button href={profile.resumeUrl} size="sm" download={profile.resumeFileName}>
              <Download size={14} /> Resume
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
