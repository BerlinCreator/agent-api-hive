import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SPEC_PATH = join(__dirname, "..", "openapi-spec.json");

const API_BASE = "https://agent-utility-belt-production.up.railway.app";

// Load spec
let endpoints = [];
try {
  const spec = JSON.parse(readFileSync(SPEC_PATH, "utf8"));
  endpoints = Object.entries(spec.paths).flatMap(([path, methods]) =>
    Object.entries(methods)
      .filter(([m]) => ["get", "post", "put", "delete", "patch"].includes(m))
      .map(([method, op]) => ({
        path,
        method: method.toUpperCase(),
        operationId: op.operationId,
        summary: op.summary,
        description: op.description || op.summary,
        parameters: (op.parameters || []).filter(p => p.in !== "path"),
        requestBody: op.requestBody?.content?.["application/json"]?.schema,
        exampleRequest: op.requestBody?.content?.["application/json"]?.example,
      }))
  );
} catch (e) {
  console.error("Warning: could not load openapi-spec.json:", e.message);
}

function makeZodSchema(ep) {
  const props = {};
  const req = [];

  // Query/body params from spec
  for (const p of ep.parameters || []) {
    let type = "string";
    if (p.schema?.type === "integer") type = "number";
    props[p.name] = p.required
      ? z.string().describe(p.description || "")
      : z.string().optional().describe(p.description || "");
  }

  // Request body fields
  if (ep.requestBody?.properties) {
    for (const [name, prop] of Object.entries(ep.requestBody.properties)) {
      props[name] = z.string().describe(prop.description || "");
    }
  }

  return z.object(props).transform(v => v);
}

async function callAPI(ep, params, apiKey) {
  const url = new URL(API_BASE + ep.path);

  // Add query params for GET/DELETE
  if (ep.method === "GET" || ep.method === "DELETE") {
    for (const [k, v] of Object.entries(params || {})) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    }
  }

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
  };

  let body = null;
  if (ep.method !== "GET" && ep.method !== "DELETE") {
    body = JSON.stringify(params || {});
  }

  const resp = await fetch(url.toString(), {
    method: ep.method,
    headers,
    body,
  });

  const json = await resp.json().catch(() => null);
  if (!resp.ok) {
    throw new Error(`HTTP ${resp.status}: ${JSON.stringify(json?.error || resp.statusText)}`);
  }
  return json;
}

// Create server
const server = new McpServer(
  {
    name: "Agent API Hive",
    version: "1.0.0",
    description:
      "76 APIs for AI agent builders. One API key. One subscription. Covers image processing, PDF tools, currency conversion, IP lookup, web scraping, lead enrichment, SERP search, patents, papers, company lookup, sentiment, OCR, calendar, code execution, mock servers, and much more.",
  },
  {}
);

// Discovery tool
server.tool(
  "api_info",
  "Returns the full list of 76 available APIs with their operation IDs, HTTP methods, paths, and descriptions. Use this first to discover what's available.",
  {},
  async () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            service: "Agent API Hive",
            version: "1.0.0",
            total_endpoints: endpoints.length,
            base_url: API_BASE,
            authentication: "Include header x-api-key: YOUR_API_KEY",
            endpoints: endpoints.map(e => ({
              operationId: e.operationId,
              method: e.method,
              path: e.path,
              summary: e.summary,
              description: e.description,
              example_request: e.exampleRequest || null,
            })),
          },
          null,
          2
        ),
      },
    ],
  })
);

// Register each endpoint as a tool
for (const ep of endpoints) {
  const schema = makeZodSchema(ep);
  const name = ep.operationId.replace(/[^a-zA-Z0-9_]/g, "_");

  server.tool(
    name,
    `[${ep.method}] ${ep.path}\n\n${ep.description || ep.summary}`,
    schema,
    async (params) => {
      const apiKey = process.env.AGENT_API_KEY || params._apiKey || "";
      if (!apiKey) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                error: "No API key provided. Set AGENT_API_KEY environment variable or pass _apiKey in params.",
                hint: "Get your key at https://agentapihive.com/dashboard",
              }),
            },
          ],
        };
      }
      try {
        const result = await callAPI(ep, params, apiKey);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      } catch (e) {
        return { content: [{ type: "text", text: JSON.stringify({ error: e.message }) }] };
      }
    }
  );
}

// Start
const transport = new StdioServerTransport();
await server.connect(transport);