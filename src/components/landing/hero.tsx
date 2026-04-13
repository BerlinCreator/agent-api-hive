"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export function Hero() {
  const requestSnippet = `curl -X POST \
  https://agent-utility-belt-production.up.railway.app/v1/qr/generate \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{"text": "https://example.com"}'`;

  const responseSnippet = `{ "success": true, "data": { "url": "https://cdn.agenthive.dev/qr/example.png" } }`;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent/[0.03] rounded-full blur-[120px]" />
      <div className="absolute top-40 right-1/4 w-80 h-80 bg-blue-500/[0.02] rounded-full blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Badge variant="accent" className="mb-6">
            <Sparkles className="h-3 w-3" />
            AI agent APIs. One key. Production-ready.
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          The API Backbone for <span className="text-gradient-accent">AI Agents</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-3xl text-lg text-muted-foreground mb-10"
        >
          Agent API Hive is the agent API framework for builders shipping autonomous workflows. Image, PDF, translation, enrichment, search, OCR, code execution, and more behind one API key and one predictable response model.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <Link href="/signup">
            <Button variant="accent" size="lg">
              Get Your API Key
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/docs">
            <Button variant="secondary" size="lg">
              <Terminal className="h-4 w-4" />
              Explore Docs
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-sm text-muted-foreground mb-16"
        >
          Built for AI agent APIs, APIs for AI agents, and autonomous agent APIs that need to work the same way every single time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto max-w-3xl"
        >
          <div className="glass rounded-xl overflow-hidden glow-accent">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
              </div>
              <span className="text-xs text-muted-foreground font-mono">terminal</span>
            </div>
            <pre className="p-4 text-left text-sm font-mono overflow-x-auto">
              <code>
                <span className="text-muted-foreground">$ </span>
                <span className="text-foreground/90 whitespace-pre-wrap">{requestSnippet}</span>
                {"\n\n"}
                <span className="text-muted-foreground">// Response</span>
                {"\n"}
                <span className="text-foreground/70">{responseSnippet}</span>
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
