"use client";

import { Package, Brain, TrendingUp, Zap, Wrench, MessageSquareShare, Shield, Cog, Building2 } from "lucide-react";
import { API_CATEGORIES } from "@/data/apis";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

export function ApiCategories() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Six categories built for <span className="text-gradient-accent">real agent workloads</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Organize your stack around the jobs agents actually perform: processing files, enriching records, searching the web, extracting structure, and taking action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {API_CATEGORIES.map((category, i) => {
            const Icon = CATEGORY_ICONS[category.name];
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full group hover:border-accent/30 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <span className="text-xs text-muted-foreground">{category.apis.length} core surfaces</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.apis.map((api) => (
                      <Badge key={api} variant="default">
                        {api}
                      </Badge>
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
