"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "How does authentication work?",
    a: "Sign up, generate your key from the dashboard, and send it as the x-api-key header on every request. One key works across the full Agent API Hive catalog.",
  },
  {
    q: "What makes this different from using separate API vendors?",
    a: "You get one agent-first API layer instead of a pile of mismatched auth schemes, rate limits, and payload formats. Less glue code, fewer brittle workflows.",
  },
  {
    q: "Are all APIs included on the Free plan?",
    a: "Yes. Every tier includes the entire catalog. The difference is daily request capacity, support, and scale readiness.",
  },
  {
    q: "What do errors look like?",
    a: 'Every endpoint returns structured JSON. Success looks like { "success": true, "data": {...} }. Errors look like { "success": false, "error": { "code": "...", "message": "...", "details": {...} } }.',
  },
  {
    q: "Can I use this in production agent workflows?",
    a: "Yes. The platform is positioned for production-grade AI agent APIs with rate limiting, predictable responses, and plans built around actual automation traffic.",
  },
  {
    q: "How fast can I get started?",
    a: "Usually a few minutes: sign up, generate a key, copy the curl example from the docs, and start calling endpoints immediately.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left cursor-pointer">
        <span className="text-sm font-medium pr-4">{q}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-muted-foreground">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Frequently asked <span className="text-gradient-accent">questions</span>
        </h2>

        <div className="glass rounded-xl px-6">
          {FAQS.map((faq) => (
            <FaqItem key={faq.q} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
