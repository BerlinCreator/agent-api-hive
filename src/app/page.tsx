'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
  KeyRound,
  Layers3,
  Package,
  Sparkles,
  Zap,
  Check,
} from 'lucide-react';
import { API_CATEGORIES, ALL_APIS_BY_CATEGORY, PRICING_TIERS, API_ENDPOINTS } from '@/data/apis';
import { formatNumber } from '@/lib/utils';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const allApiListings = Object.values(ALL_APIS_BY_CATEGORY).flat();
const totalApis = API_CATEGORIES.reduce((sum, cat) => sum + cat.apis.length, 0);
const totalCategories = API_CATEGORIES.length;
const totalPlans = PRICING_TIERS.length;
const totalEndpoints = allApiListings.length;
const commodityCount = ALL_APIS_BY_CATEGORY.Commodity.length;

const stats = [
  { label: 'APIs', value: String(totalApis), icon: Package },
  { label: 'Categories', value: String(totalCategories), icon: Layers3 },
  { label: 'Pricing Tiers', value: String(totalPlans), icon: Zap },
  { label: 'Free Daily Requests', value: formatNumber(100), icon: KeyRound },
];

const featuredCategories = API_CATEGORIES.slice(0, 3);
const categoryHref = (name: string) => `/apis#${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;

export default function HomePage() {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-500/[0.02] rounded-full blur-[100px]" />
      </div>

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{totalApis} APIs. {totalEndpoints} endpoints. One key.</span>
            </motion.div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              The API Backbone<br />
              For AI Agents.
            </h1>

            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
              Image, PDF, translation, enrichment, search, OCR, code execution, and more.
              Agent API Hive gives builders one clean surface area for the messy jobs autonomous systems need in production.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group px-8 py-4 text-base font-medium bg-emerald-500 text-black rounded-xl hover:bg-emerald-400 transition-all hover:shadow-lg hover:shadow-emerald-500/20 flex items-center gap-2"
              >
                Get Your API Key
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/docs"
                className="px-8 py-4 text-base font-medium text-muted-foreground border border-border rounded-xl hover:bg-white/5 hover:text-foreground transition-all"
              >
                Explore Docs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={item} className="text-center">
                <stat.icon className="h-5 w-5 text-emerald-500 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-12"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Featured API Categories</h2>
              <p className="text-muted-foreground">The highest-utility surfaces for agent builders shipping real workflows.</p>
            </div>
            <Link
              href="/apis"
              className="mt-4 sm:mt-0 text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
            >
              View catalog <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category, i) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  href={categoryHref(category.name)}
                  className="group relative block h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-emerald-500/30 hover:bg-card/80"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="flex gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                        <Sparkles className="h-3 w-3" />
                        Featured
                      </span>
                    </div>

                    <p className="text-xs text-emerald-500/80 font-medium mb-2 uppercase tracking-wider">
                      {category.name}
                    </p>
                    <h3 className="text-base font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
                      {category.description}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      Includes {category.apis.join(', ')}.
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{category.apis.length} core surfaces</span>
                      <span>{ALL_APIS_BY_CATEGORY[category.name].length} endpoints</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {category.apis.slice(0, 3).map((api) => (
                        <span
                          key={api}
                          className="px-2 py-0.5 text-[11px] rounded-full bg-white/5 text-muted-foreground border border-white/5"
                        >
                          {api}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Browse by Category</h2>
            <p className="text-muted-foreground">Six buckets for the actual jobs agents do in production.</p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {API_CATEGORIES.map((cat) => (
              <motion.div key={cat.name} variants={item}>
                <Link
                  href={categoryHref(cat.name)}
                  className="group flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:border-emerald-500/30 hover:bg-card/80 transition-all"
                >
                  <div>
                    <h3 className="font-medium group-hover:text-emerald-400 transition-colors">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{ALL_APIS_BY_CATEGORY[cat.name].length} API endpoints</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-400 transition-colors" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-28 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">How It Works</h2>
            <p className="text-muted-foreground">Three steps. No duct tape circus.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Get one key', desc: `Create your account and unlock ${totalApis} production-ready APIs across ${totalEndpoints} endpoints behind one x-api-key. No feature gate roulette.` },
              { step: '02', title: 'Call any endpoint', desc: 'Use image, PDF, translation, search, enrichment, OCR, calendar, code execution, or social intelligence with the same response model.' },
              { step: '03', title: 'Scale agent volume', desc: 'Move from test traffic to real production loops with pricing tiers built around throughput instead of random product silos.' },
            ].map((s) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center md:text-left"
              >
                <span className="text-4xl font-bold text-emerald-500/20">{s.step}</span>
                <h3 className="text-lg font-semibold mt-2 mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center">Pricing Tiers</h2>
            <p className="text-muted-foreground text-center">Every tier includes every API. You are choosing volume, not capabilities.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRICING_TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className={`group relative h-full rounded-xl border bg-card p-6 transition-all duration-300 hover:bg-card/80 ${tier.highlighted ? 'border-emerald-500/30 glow-accent' : 'border-border hover:border-emerald-500/20'}`}>
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${tier.highlighted ? 'from-emerald-500/10 to-emerald-600/5 opacity-100' : 'from-emerald-500/10 to-emerald-600/5 opacity-0 group-hover:opacity-100'} transition-opacity duration-300`} />
                  <div className="relative">
                    {tier.highlighted && (
                      <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 mb-3">
                        Best for active agents
                      </span>
                    )}

                    <p className="text-xs text-emerald-500/80 font-medium mb-2 uppercase tracking-wider">{tier.dailyLimit}</p>
                    <h3 className="text-base font-semibold mb-2 group-hover:text-emerald-400 transition-colors">{tier.name}</h3>
                    <p className="text-3xl font-bold mb-4">
                      {tier.price}{' '}
                      {tier.priceNote && <span className="text-sm font-normal text-muted-foreground">{tier.priceNote}</span>}
                    </p>

                    <div className="space-y-2 mb-6">
                      {tier.features.slice(0, 4).map((feature) => (
                        <div key={feature} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Check className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/signup"
                      className={`inline-flex items-center gap-1 text-sm transition-colors ${tier.highlighted ? 'text-emerald-300 hover:text-emerald-200' : 'text-emerald-400 hover:text-emerald-300'}`}
                    >
                      Choose {tier.name} <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-border bg-card p-8 sm:p-12 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent" />
            <div className="relative max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to give your agents real tools?</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Start with the free plan, get access to {totalApis} production-ready APIs across {totalEndpoints} endpoints, and ship workflows that can resize, parse, search, enrich, translate, execute, and pull social data without vendor spaghetti.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <Link
                  href="/signup"
                  className="px-6 py-3 text-sm font-medium bg-emerald-500 text-black rounded-lg hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
                >
                  Start Free
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/docs"
                  className="px-6 py-3 text-sm font-medium text-muted-foreground border border-border rounded-lg hover:bg-white/5 hover:text-foreground transition-all flex items-center justify-center"
                >
                  Read the docs
                </Link>
              </div>
              <p className="text-xs text-muted-foreground mt-4">Includes {commodityCount} commodity endpoints on day one, plus the rest of the catalog when you need it.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
