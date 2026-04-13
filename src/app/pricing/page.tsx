import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { PRICING_TIERS, TOTAL_APIS, TOTAL_ENDPOINTS } from "@/data/apis";

export default function PricingPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-emerald-500/[0.04] blur-[140px]" />
        <div className="absolute right-[10%] top-[24rem] h-[340px] w-[340px] rounded-full bg-white/[0.03] blur-[120px]" />
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-sm text-emerald-300">
            <ShieldCheck className="h-4 w-4" />
            Same {TOTAL_APIS} APIs, {TOTAL_ENDPOINTS}+ endpoints on every tier
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Pricing that scales with request volume, not product nonsense.</h1>
          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            Start free, move up when traffic is real, and skip the usual SaaS game where the useful endpoint hides behind a weird plan wall.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="grid gap-6 lg:grid-cols-5">
          {PRICING_TIERS.map((tier) => {
            const isEnterprise = tier.name === "Enterprise";
            return (
              <div
                key={tier.name}
                className={`relative flex h-full flex-col rounded-3xl border p-6 backdrop-blur-xl ${tier.highlighted ? "border-emerald-500/30 bg-emerald-500/[0.08] shadow-[0_0_80px_-26px_rgba(16,185,129,0.45)]" : "border-[hsl(150_3%_10%)] bg-[hsl(150_3%_6%)]/95"}`}
              >
                {tier.highlighted && (
                  <span className="absolute right-5 top-5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
                    Current sweet spot
                  </span>
                )}
                <div className="mb-6">
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-400/80">{tier.name}</p>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-4xl font-semibold tracking-tight">{tier.price}</span>
                    {tier.priceNote ? <span className="pb-1 text-sm text-muted-foreground">{tier.priceNote}</span> : null}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{tier.dailyLimit} requests included</p>
                </div>

                <ul className="space-y-3 text-sm text-muted-foreground">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-3 leading-6">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6">
                  {isEnterprise ? (
                    <Link href="mailto:hello@agentapihive.com?subject=Enterprise%20plan%20inquiry" className="inline-flex w-full items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/15">
                      Contact Us
                    </Link>
                  ) : (
                    <Link href="/signup" className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition ${tier.highlighted ? "bg-emerald-500 text-black hover:bg-emerald-400" : "border border-white/8 bg-white/[0.03] text-foreground hover:bg-white/[0.06]"}`}>
                      Choose {tier.name}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
