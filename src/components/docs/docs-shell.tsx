"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { apiCategories, authSteps, errorResponseExample, rateLimitTiers, totalApis, totalEndpoints } from "@/data/docs-apis";
import { CodeBlock } from "@/components/docs/code-block";

function renderJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export function DocsShell() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    if (!normalizedQuery) return apiCategories;

    return apiCategories
      .map((category) => ({
        ...category,
        endpoints: category.endpoints.filter((endpoint) => {
          const haystack = [
            endpoint.name,
            endpoint.summary,
            endpoint.endpoint,
            endpoint.method,
            ...endpoint.tags,
            ...endpoint.parameters.map((parameter) => parameter.name),
          ]
            .join(" ")
            .toLowerCase();

          return haystack.includes(normalizedQuery);
        }),
      }))
      .filter((category) => category.endpoints.length > 0);
  }, [normalizedQuery]);

  const filteredCount = filteredCategories.reduce((count, category) => count + category.endpoints.length, 0);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-emerald-500/[0.05] blur-[140px]" />
        <div className="absolute left-[10%] top-[34rem] h-[280px] w-[280px] rounded-full bg-white/[0.03] blur-[120px]" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="grid gap-8 rounded-[28px] border border-border bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.14),transparent_30%),linear-gradient(180deg,rgba(15,20,16,0.98),rgba(9,12,10,0.98))] p-8 shadow-[0_0_0_1px_rgba(34,197,94,0.08),0_24px_80px_rgba(0,0,0,0.45)] lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-emerald-300">
              Agent API Hive · Documentation
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Full API docs for all {totalApis} APIs and {totalEndpoints}+ endpoints, without the usual archaeological dig.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
                Built for AI agent builders who want clean endpoints, predictable payloads, and examples you can copy without praying to undocumented edge cases.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl border border-border bg-black/25 p-5">
              <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">APIs indexed</div>
              <div className="mt-3 text-4xl font-semibold text-foreground">{totalApis}</div>
              <div className="mt-2 text-sm text-zinc-400">{totalEndpoints} endpoints grouped by category, each with parameters and example payloads.</div>
            </div>
            <div className="rounded-2xl border border-border bg-black/25 p-5">
              <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Auth model</div>
              <div className="mt-3 font-mono text-sm text-emerald-300">x-api-key: YOUR_API_KEY</div>
              <div className="mt-2 text-sm text-zinc-400">One header, every request. No query-string chaos. No weird handshake ritual.</div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[24px] border border-border bg-card p-6 shadow-[0_12px_48px_rgba(0,0,0,0.32)]">
            <div className="mb-5">
              <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground">How Authentication Works</div>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">Send the key. Get predictable JSON back. Move on with your life.</h2>
            </div>
            <ol className="grid gap-3 text-sm leading-6 text-zinc-300">
              {authSteps.map((step, index) => (
                <li key={step} className="flex gap-3 rounded-2xl border border-border bg-black/20 p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-500/25 bg-emerald-500/10 text-xs font-semibold text-emerald-300">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[24px] border border-border bg-card p-6 shadow-[0_12px_48px_rgba(0,0,0,0.32)]">
              <div className="mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">Rate limits by tier</div>
              <div className="grid gap-3">
                {rateLimitTiers.map((tier) => (
                  <div key={tier.name} className="rounded-2xl border border-border bg-black/20 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-semibold text-foreground">{tier.name}</span>
                      <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs text-emerald-300">{tier.limit}</span>
                    </div>
                    <p className="mt-2 text-sm text-zinc-400">{tier.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <CodeBlock title="Error response format" code={renderJson(errorResponseExample)} />
          </div>
        </section>

        <section className="grid gap-6 rounded-[24px] border border-border bg-card/90 p-6 shadow-[0_12px_48px_rgba(0,0,0,0.32)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Search the catalog</div>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">Filter by endpoint, method, API family, or parameter.</h2>
            </div>
            <div className="rounded-full border border-border bg-black/30 px-4 py-2 font-mono text-sm text-zinc-400">
              Showing {filteredCount} of {totalEndpoints}
            </div>
          </div>

          <label className="group flex items-center gap-3 rounded-2xl border border-border bg-[#0b0f0c] px-4 py-3 transition focus-within:border-emerald-500/40 focus-within:shadow-[0_0_0_1px_rgba(34,197,94,0.18)]">
            <svg className="h-5 w-5 text-zinc-500 group-focus-within:text-emerald-300" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M14.166 14.167 18 18" strokeLinecap="round" />
              <circle cx="8.75" cy="8.75" r="5.75" />
            </svg>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search /v1/string/hash, mock, OCR, patents..."
              className="w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-zinc-600"
            />
          </label>
        </section>

        <section className="grid gap-8">
          {filteredCategories.map((category) => (
            <div key={category.name} className="grid gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-foreground">{category.name}</h3>
                <p className="mt-1 text-sm text-zinc-400">{category.endpoints.length} endpoints in this lane.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {category.endpoints.map((endpoint) => (
                  <Link
                    key={endpoint.slug}
                    href={`/docs/${endpoint.slug}`}
                    className="group rounded-[22px] border border-border bg-[linear-gradient(180deg,rgba(15,20,16,0.98),rgba(11,14,12,0.98))] p-5 transition duration-200 hover:-translate-y-1 hover:border-emerald-500/35 hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-medium text-emerald-300">
                        {endpoint.method}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">{endpoint.tags[2]}</span>
                    </div>

                    <div className="mt-5 space-y-3">
                      <h4 className="text-xl font-semibold text-foreground transition group-hover:text-emerald-200">{endpoint.name}</h4>
                      <p className="text-sm leading-6 text-zinc-400">{endpoint.summary}</p>
                      <code className="block overflow-hidden text-ellipsis whitespace-nowrap rounded-xl border border-border bg-black/30 px-3 py-2 font-mono text-xs text-zinc-300">
                        {endpoint.endpoint}
                      </code>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {filteredCount === 0 ? (
            <div className="rounded-[22px] border border-dashed border-border bg-card p-10 text-center text-zinc-400">
              No matches. Try a path fragment, parameter name, or category. The endpoint is probably there; your search just got dramatic.
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
