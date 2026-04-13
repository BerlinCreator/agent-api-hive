import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent API Hive — For AI Agents",
  description: "Machine-readable API discovery page for AI agents. 76 APIs, one key, zero friction.",
  robots: { index: true, follow: true },
};

export default function AgentPage() {
  return (
    <article className="prose prose-invert max-w-4xl mx-auto px-6 py-12">
      <h1>Agent API Hive</h1>

      <p>
        Agent API Hive is a unified API suite with 76 APIs and 191 endpoints, built for AI agents.
        One API key gives you access to image processing, PDF tools, currency conversion, email validation,
        web scraping, lead enrichment, search, sentiment analysis, OCR, distributed locks, queues,
        invoicing, and 60+ more capabilities. No juggling multiple subscriptions — one key, one base URL.
      </p>

      <h2>Authentication</h2>
      <p>
        Include your API key in the <code>x-api-key</code> header on every request.
        Get a free key at <a href="https://agentapihive.com/dashboard">agentapihive.com/dashboard</a>.
      </p>
      <pre><code>x-api-key: YOUR_API_KEY</code></pre>

      <h2>Base URL</h2>
      <pre><code>https://agent-utility-belt-production.up.railway.app</code></pre>

      <h2>Top 10 Agent Use Cases</h2>

      <h3>1. Currency Conversion</h3>
      <pre><code>{`POST /v1/currency/convert
Content-Type: application/json
x-api-key: YOUR_KEY

{"from": "USD", "to": "EUR", "amount": 100}

→ {"success": true, "data": {"from": "USD", "to": "EUR", "amount": 100, "converted": 85.39, "rate": 0.8539}}`}</code></pre>

      <h3>2. Email Validation</h3>
      <pre><code>{`POST /v1/email/validate
{"email": "user@example.com"}

→ {"success": true, "data": {"email": "user@example.com", "valid": true, "mxRecords": true}}`}</code></pre>

      <h3>3. IP Geolocation</h3>
      <pre><code>{`POST /v1/ip/lookup
{"ip": "8.8.8.8"}

→ {"success": true, "data": {"ip": "8.8.8.8", "city": "Mountain View", "country": "US"}}`}</code></pre>

      <h3>4. Web Extraction</h3>
      <pre><code>{`POST /v1/extract/extract
{"url": "https://example.com", "selectors": {"title": "h1", "price": ".price"}}

→ {"success": true, "data": {"title": "Product Name", "price": "$29.99"}}`}</code></pre>

      <h3>5. Sentiment Analysis</h3>
      <pre><code>{`POST /v1/sentiment/analyze
{"text": "I love this product!"}

→ {"success": true, "data": {"sentiment": "positive", "score": 0.92}}`}</code></pre>

      <h3>6. PDF Merge</h3>
      <pre><code>{`POST /v1/pdf/merge
{"urls": ["https://a.com/doc1.pdf", "https://b.com/doc2.pdf"], "outputFilename": "merged.pdf"}`}</code></pre>

      <h3>7. Distributed Lock</h3>
      <pre><code>{`POST /v1/lock/acquire
{"resource": "order-4821", "holder": "agent-1", "ttlSeconds": 30}

→ {"success": true, "data": {"locked": true, "lockId": "lock_f8d3a1"}}`}</code></pre>

      <h3>8. Queue a Job</h3>
      <pre><code>{`POST /v1/queue/enqueue
{"queue": "email-notifications", "data": {"to": "user@example.com", "subject": "Welcome"}}

→ {"success": true, "data": {"jobId": "job_7d1a", "queue": "email-notifications", "position": 1}}`}</code></pre>

      <h3>9. Text Redaction</h3>
      <pre><code>{`POST /v1/redact/process
{"text": "Contact John at john@example.com or 555-867-5309. SSN: 123-45-6789.", "types": ["email", "phone", "ssn"]}

→ {"success": true, "data": {"redacted": "Contact [REDACTED] or [REDACTED]. SSN: [REDACTED]."}}`}</code></pre>

      <h3>10. Invoice Creation</h3>
      <pre><code>{`POST /v1/invoice/create
{"clientId": "usr_123", "lineItems": [{"description": "API Pro Plan", "quantity": 1, "unitPrice": 60}], "dueDate": "2026-05-13"}

→ {"success": true, "data": {"invoiceId": "inv_5e2a", "number": "INV-2026-0042", "total": 60}}`}</code></pre>

      <h2>Rate Limits</h2>
      <table>
        <thead><tr><th>Tier</th><th>Price</th><th>Daily Limit</th></tr></thead>
        <tbody>
          <tr><td>Free</td><td>$0</td><td>100/day</td></tr>
          <tr><td>Starter</td><td>$12/mo</td><td>1,000/day</td></tr>
          <tr><td>Plus</td><td>$36/mo</td><td>5,000/day</td></tr>
          <tr><td>Pro</td><td>$60/mo</td><td>10,000/day</td></tr>
          <tr><td>Enterprise</td><td>Contact Us</td><td>Unlimited</td></tr>
        </tbody>
      </table>

      <h2>Error Meanings</h2>
      <table>
        <thead><tr><th>Code</th><th>HTTP</th><th>What It Means</th></tr></thead>
        <tbody>
          <tr><td><code>AUTH_ERROR</code></td><td>401</td><td>Your API key is missing or invalid. Check the x-api-key header.</td></tr>
          <tr><td><code>VALIDATION_ERROR</code></td><td>400</td><td>Your request body is missing required fields or has invalid types. Check error.message for specifics.</td></tr>
          <tr><td><code>RATE_LIMIT_EXCEEDED</code></td><td>429</td><td>You have used all your daily requests. Upgrade your plan or wait for reset.</td></tr>
          <tr><td><code>INTERNAL_ERROR</code></td><td>500</td><td>Something broke on our side. Retry after a few seconds. If persistent, contact support.</td></tr>
        </tbody>
      </table>

      <h2>Machine-Readable Resources</h2>
      <ul>
        <li><strong>OpenAPI 3.0 Spec:</strong> <a href="/api/openapi.json">/api/openapi.json</a> or <a href="/api/openapi.yaml">/api/openapi.yaml</a></li>
        <li><strong>llms.txt:</strong> <a href="/llms.txt">/llms.txt</a></li>
        <li><strong>MCP Server:</strong> <code>npm install @agentapihive/mcp-server</code></li>
      </ul>
    </article>
  );
}