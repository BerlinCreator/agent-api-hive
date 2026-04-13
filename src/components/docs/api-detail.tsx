import Link from "next/link";
import type { ApiEndpoint } from "@/data/docs-apis";
import { CodeBlock } from "@/components/docs/code-block";

const BASE_URL = "https://api.agentapihive.com";

function renderExample(value: unknown) {
  if (typeof value === "string") return value;
  return JSON.stringify(value, null, 2);
}

function isMultipart(endpoint: ApiEndpoint) {
  return endpoint.parameters.some((p) => p.type.includes("multipart/form-data") || p.type.startsWith("file"));
}

function buildCurl(endpoint: ApiEndpoint) {
  // If the request example is already a curl string, return it directly
  if (typeof endpoint.requestExample === "string") {
    return endpoint.requestExample;
  }

  const multipart = isMultipart(endpoint);
  const lines = [
    `curl -X ${endpoint.method} '${BASE_URL}${endpoint.endpoint}'`,
  ];

  if (!multipart) {
    lines.push("  -H 'Content-Type: application/json'");
  }
  lines.push("  -H 'x-api-key: YOUR_API_KEY'");

  if (endpoint.requestExample && !multipart) {
    lines.push(`  -d '${JSON.stringify(endpoint.requestExample, null, 2)}'`);
  }

  return lines.join(" \\\n");
}

function buildJavaScript(endpoint: ApiEndpoint) {
  if (isMultipart(endpoint)) {
    const fileParam = endpoint.parameters.find((p) => p.type === "file");
    const fieldName = fileParam?.name ?? "file";
    return `const formData = new FormData();\nformData.append("${fieldName}", fileBlob, "upload.jpg");\n\nconst response = await fetch("${BASE_URL}${endpoint.endpoint}", {\n  method: "${endpoint.method}",\n  headers: {\n    "x-api-key": "YOUR_API_KEY",\n  },\n  body: formData,\n});\n\n// Response may be raw bytes — check Content-Type header\nconst data = await response.arrayBuffer();\nconsole.log(data);`;
  }

  const config = endpoint.requestExample && typeof endpoint.requestExample !== "string"
    ? `,\n  body: JSON.stringify(${JSON.stringify(endpoint.requestExample, null, 2)})`
    : "";

  return `const response = await fetch("${BASE_URL}${endpoint.endpoint}", {\n  method: "${endpoint.method}",\n  headers: {\n    "Content-Type": "application/json",\n    "x-api-key": "YOUR_API_KEY",\n  }${config}\n});\n\nconst data = await response.json();\nconsole.log(data);`;
}

export function ApiDetail({ endpoint }: { endpoint: ApiEndpoint }) {
  return (
    <article className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Link href="/docs" className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-zinc-300 transition hover:border-emerald-500/35 hover:text-emerald-200">
        <span aria-hidden>←</span>
        Back to docs
      </Link>

      <section className="grid gap-6 rounded-[28px] border border-border bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.12),transparent_26%),linear-gradient(180deg,rgba(15,20,16,0.98),rgba(10,13,11,0.98))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">
              {endpoint.category}
            </span>
            <span className="rounded-full border border-border bg-black/25 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
              {endpoint.method}
            </span>
          </div>

          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{endpoint.name}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300 sm:text-lg">{endpoint.description}</p>
          </div>

          <div className="rounded-[20px] border border-border bg-black/30 p-4 font-mono text-sm text-zinc-200">
            <div className="mb-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">Endpoint</div>
            {endpoint.endpoint}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-[20px] border border-border bg-black/25 p-5">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Authentication</div>
            <div className="mt-3 font-mono text-sm text-emerald-300">x-api-key: YOUR_API_KEY</div>
            <p className="mt-3 text-sm leading-6 text-zinc-400">Every authenticated request expects the API key in the header. Blessedly boring. Exactly how it should be.</p>
          </div>
          <div className="rounded-[20px] border border-border bg-black/25 p-5">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Parameters</div>
            <div className="mt-3 text-3xl font-semibold text-foreground">{endpoint.parameters.length}</div>
            <p className="mt-2 text-sm leading-6 text-zinc-400">Required fields, optional inputs, and path params are laid out below with examples.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[24px] border border-border bg-card p-6 shadow-[0_12px_40px_rgba(0,0,0,0.28)]">
          <div className="mb-5">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Parameter reference</div>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">Inputs</h2>
          </div>

          <div className="grid gap-3">
            {endpoint.parameters.length ? (
              endpoint.parameters.map((parameter) => (
                <div key={parameter.name} className="rounded-[18px] border border-border bg-black/25 p-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <code className="font-mono text-sm text-emerald-300">{parameter.name}</code>
                    <span className="rounded-full border border-border px-2 py-0.5 font-mono text-xs text-zinc-400">{parameter.type}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${parameter.required ? "border border-emerald-500/25 bg-emerald-500/10 text-emerald-300" : "border border-zinc-700 bg-zinc-900 text-zinc-400"}`}>
                      {parameter.required ? "Required" : "Optional"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{parameter.description}</p>
                </div>
              ))
            ) : (
              <div className="rounded-[18px] border border-dashed border-border bg-black/20 p-4 text-sm text-zinc-400">
                This endpoint takes no request parameters.
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6">
          <CodeBlock title="cURL" code={buildCurl(endpoint)} />
          <CodeBlock title="JavaScript" code={buildJavaScript(endpoint)} />
          <CodeBlock title="Example response" code={renderExample(endpoint.responseExample)} />
          {endpoint.requestExample && typeof endpoint.requestExample !== "string" ? <CodeBlock title="Example request body" code={renderExample(endpoint.requestExample)} /> : null}
        </div>
      </section>
    </article>
  );
}
