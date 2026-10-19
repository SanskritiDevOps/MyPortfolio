import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Send } from "lucide-react";
import { profile } from "../../data/portfolioData";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import SocialLinks from "../ui/SocialLinks";
import StatusDot from "../ui/StatusDot";

const FIELD =
  "w-full rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 " +
  "transition-colors focus:border-cyan-400/50 focus:bg-ink-950 focus:outline-none focus:ring-2 focus:ring-cyan-400/20";

function CopyEmail() {
  const [copied, copy] = useCopyToClipboard();

  return (
    <button
      type="button"
      onClick={() => copy(profile.email)}
      className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/3 p-2 pl-5 text-left transition-all hover:border-cyan-400/40 hover:bg-white/5"
    >
      <span className="min-w-0">
        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Email</span>
        <span className="block truncate font-medium text-zinc-100">{profile.email}</span>
      </span>
      <span
        className={`relative flex h-11 shrink-0 items-center gap-2 overflow-hidden rounded-xl px-4 text-sm font-medium transition-colors ${
          copied ? "bg-emerald-400 text-ink-950" : "bg-cyan-400 text-ink-950 group-hover:bg-cyan-300"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "copied" : "copy"}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2"
          >
            {copied ? <Check size={15} strokeWidth={2.5} /> : <Copy size={15} />}
            {copied ? "Copied!" : "Copy"}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </button>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // No backend required: opens the visitor's mail client with everything pre-filled.
  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-zinc-400">Name</span>
          <input required name="name" value={form.name} onChange={update} autoComplete="name" placeholder="Jane Doe" className={FIELD} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-zinc-400">Email</span>
          <input required type="email" name="email" value={form.email} onChange={update} autoComplete="email" placeholder="jane@company.com" className={FIELD} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-zinc-400">Message</span>
        <textarea required name="message" rows={5} value={form.message} onChange={update} placeholder="Tell me about your project or opportunity…" className={`${FIELD} resize-none`} />
      </label>
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Send message
        <Send size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Button>
    </form>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-ink-900/60 p-6 backdrop-blur-xl sm:p-10 lg:p-14">
          <div aria-hidden className="bg-dots absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
          <div aria-hidden className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px]" />
          <div aria-hidden className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-violet-500/15 blur-[100px]" />

          <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                index="06"
                eyebrow="Contact"
                title="Let's build something together."
                description="Have a project, internship or idea in mind? My inbox is always open — I usually reply within a day or two."
              />
              <Reveal delay={0.1} className="mt-8 space-y-6">
                <CopyEmail />
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <SocialLinks size="lg" />
                  <span className="flex items-center gap-2 font-mono text-xs text-emerald-300">
                    <StatusDot /> {profile.status}
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="rounded-3xl border border-white/7 bg-ink-950/40 p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-white">Send a quick message</h3>
              <p className="mb-6 mt-1 text-sm text-zinc-500">Opens your email app with the message ready to go.</p>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
