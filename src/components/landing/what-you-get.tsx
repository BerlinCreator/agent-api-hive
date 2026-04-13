"use client";

import { Package, Brain, TrendingUp, Zap, Wrench, MessageSquareShare, Shield, Cog, Building2 } from "lucide-react";
import { ALL_APIS_BY_CATEGORY } from "@/data/apis";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ApiCategory } from "@/types";

const CATEGORY_ICONS: Record<ApiCategory, typeof Package> = {
  Commodity: Package,
  Intelligence: Brain,
  Enrichment: TrendingUp,
  Advanced: Zap,
  Utility: Wrench,
  Social: MessageSquareShare,
  "Agent Kernel": Shield,
  "Agent Utilities": Cog,
  "Business Operations": Building2,
};

export function WhatYouGet() {
  const entries = Object.entries(ALL_APIS_BY_CATEGORY) as [ApiCategory, typeof ALL_APIS_BY_CATEGORY[ApiCategory]][];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What your agent actually <span className="text-gradient-accent">gets</span>
          </h2>
          <p className="text-muted-foreground">
            Not vague categories. Actual APIs for AI agents, grouped by the jobs autonomous systems need to do in production.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {entries.map(([category, apis], i) => {
            const Icon = CATEGORY_ICONS[category];
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="h-full border-accent/10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{category}</h3>
                      <p className="text-xs text-muted-foreground">{apis.length} APIs</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {apis.map((api) => (
                      <div key={api.name} className="border border-border rounded-lg px-4 py-3 bg-background/40">
                        <div className="text-sm font-semibold mb-1">{api.name}</div>
                        <p className="text-sm text-muted-foreground">{api.description}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
