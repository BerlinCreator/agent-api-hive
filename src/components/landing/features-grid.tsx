"use client";

import { Zap, Shield, Code, Globe, BarChart3, Key } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: Zap,
    title: "One key, every workflow",
    description:
      "Image, PDF, search, translation, enrichment, OCR, calendar, and code execution APIs behind a single x-api-key.",
  },
  {
    icon: Shield,
    title: "Predictable for autonomous agents",
    description:
      "Consistent request shapes, structured error payloads, and machine-friendly responses your agents can retry and reason over.",
  },
  {
    icon: Code,
    title: "An agent API framework, not a random bundle",
    description:
      "Designed as a coherent system for AI agent builders instead of 10 separate vendors duct-taped together.",
  },
  {
    icon: Globe,
    title: "Built for production loops",
    description:
      "Use the same APIs for quick prototypes, scheduled jobs, multi-agent pipelines, and live customer-facing automations.",
  },
  {
    icon: BarChart3,
    title: "Clear usage and limits",
    description:
      "Track what your agents are calling, how often they call it, and which plan fits your traffic before you hit a wall.",
  },
  {
    icon: Key,
    title: "Start free, scale cleanly",
    description:
      "Free tier for testing, paid tiers for serious agent volume, and no category lockouts when you need a new capability tomorrow.",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            APIs for AI agents, without the <span className="text-gradient-accent">integration tax</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Agent API Hive gives autonomous agents one stable surface area for the messy jobs every production system eventually needs: files, documents, enrichment, search, extraction, translation, and execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full group hover:border-accent/30 transition-colors duration-300">
                <feature.icon className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
