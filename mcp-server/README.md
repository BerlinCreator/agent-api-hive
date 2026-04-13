# @agentapihive/mcp-server

MCP server for [Agent API Hive](https://agentapihive.com) — 76 APIs for AI agent builders.

## Installation

```bash
npm install @agentapihive/mcp-server
```

## Configuration

Add to your MCP client config (e.g., Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "agent-api-hive": {
      "command": "npx",
      "args": ["-y", "@agentapihive/mcp-server"],
      "env": {
        "AGENT_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

Get your API key at [agentapihive.com/dashboard](https://agentapihive.com/dashboard).

## Available Tools

The server exposes 191 API endpoints as individual MCP tools, plus a discovery tool:

### `api_info`
Returns the full list of available APIs with operation IDs, methods, paths, and descriptions. **Call this first** to discover what's available.

### API Tools
Each endpoint is registered as a separate tool with its operation ID:

| Category | Tools | Examples |
|----------|-------|---------|
| Commodity | 18 | image resize, pdf merge, qr generate, email validate |
| Intelligence | 17 | currency convert, ip lookup, string hash, translate |
| Enrichment | 7 | web extract, lead enrich, serp search, price lookup |
| Advanced | 14 | sentiment analyze, resume parse, docgen, entity extract |
| Utility | 8 | ocr extract, calendar check, code execute, mock api |
| Agent Kernel | 30 | lock acquire, queue enqueue, checkpoint save, webhook register |
| Agent Utilities | 23 | diff compare, redact process, rank score, classify |
| Business Ops | 35 | invoice create, contract create, expense log, payroll calc |
| Social | 3 | twitter profile, reddit subreddit, youtube channel |

## Authentication

All API calls require the `AGENT_API_KEY` environment variable. Set it in your MCP client config.

## Rate Limits

| Tier | Price | Daily Limit |
|------|-------|-------------|
| Free | $0 | 100/day |
| Starter | $12/mo | 1,000/day |
| Plus | $36/mo | 5,000/day |
| Pro | $60/mo | 10,000/day |
| Enterprise | Contact Us | Unlimited |

## Links

- Website: https://agentapihive.com
- Docs: https://agentapihive.com/docs
- OpenAPI Spec: https://agentapihive.com/api/openapi.json
- llms.txt: https://agentapihive.com/llms.txt