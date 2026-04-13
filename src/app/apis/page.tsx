"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Braces, CheckCircle2 } from "lucide-react";
import { ALL_APIS_BY_CATEGORY, API_CATEGORIES } from "@/data/apis";

const methodStyles = {
  GET: "border-sky-500/20 bg-sky-500/10 text-sky-300",
  POST: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  PUT: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  DELETE: "border-rose-500/20 bg-rose-500/10 text-rose-300",
} as const;

const slugifyCategory = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function ApisPage() {
  const totalEndpoints = Object.values(ALL_APIS_BY_CATEGORY).flat().length;
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash.replace("#", ""));
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const categories = useMemo(() => API_CATEGORIES.map((category) => ({
    ...category,
    slug: slugifyCategory(category.name),
    apis: ALL_APIS_BY_CATEGORY[category.name],
  })), []);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-emerald-500/[0.04] blur-[140px]" />
        <div className="absolute left-[12%] top-[28rem] h-[320px] w-[320px] rounded-full bg-white/[0.03] blur-[120px]" />
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-6 sm:pt-28 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-sm text-emerald-300">
            <Braces className="h-4 w-4" />
            Full API catalog · {totalEndpoints} endpoints
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Every endpoint, one page, zero treasure hunt.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            AgentAPI Hive bundles the boring-but-critical surfaces agents actually need in production: files, PDFs, lookup, enrichment, extraction, OCR, code execution, and now social intelligence too.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/pricing" className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-medium text-black transition hover:bg-emerald-400">
              See pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/docs" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm text-foreground transition hover:border-emerald-500/30 hover:bg-card/80">
              Read docs
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="grid gap-8">
          {categories.map((category) => {
            const isActive = activeHash === category.slug;
            return (
              <section
                key={category.name}
                id={category.slug}
                className={`scroll-mt-28 rounded-3xl border bg-[hsl(150_3%_6%)]/95 p-6 shadow-[0_0_60px_-24px_rgba(16,185,129,0.16)] backdrop-blur-xl transition-all duration-300 sm:p-8 ${isActive ? "border-emerald-400/60 ring-1 ring-emerald-400/40 shadow-[0_0_90px_-20px_rgba(16,185,129,0.38)]" : "border-[hsl(150_3%_10%)]"}`}
              >
                <div className="mb-6 flex flex-col gap-3 border-b border-white/6 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.28em] text-emerald-400/80">{category.name}</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">{category.apis.length} endpoints</h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{category.description}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    Included in every plan
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/6">
                  <div className="hidden grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)_110px_minmax(0,1.3fr)] gap-4 border-b border-white/6 bg-black/10 px-5 py-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground md:grid">
                    <div>API</div>
                    <div>Description</div>
                    <div>Method</div>
                    <div>Endpoint</div>
                  </div>

                  <div className="divide-y divide-white/6">
                    {category.apis.map((api) => (
                      <div key={api.name} className="grid gap-3 px-5 py-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)_110px_minmax(0,1.3fr)] md:items-center md:gap-4">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{api.name}</p>
                        </div>
                        <p className="text-sm leading-6 text-muted-foreground">{api.description}</p>
                        <div>
                          <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-[0.18em] ${methodStyles[api.method ?? "POST"]}`}>
                            {api.method}
                          </span>
                        </div>
                        <code className="text-xs text-emerald-300/90">{api.endpoint}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </div>
  );
}
