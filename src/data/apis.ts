import { ApiCategory, ApiEndpoint, PricingTier } from "@/types";

export interface ApiListing {
  name: string;
  description: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  endpoint?: string;
}

export interface ApiGroup {
  name: ApiCategory;
  description: string;
  icon: string;
  apis: string[];
}

export const API_CATEGORIES: ApiGroup[] = [
  {
    name: "Commodity",
    description: "File, document, QR, email, and short-link APIs for upload, transform, extraction, and delivery flows.",
    icon: "Package",
    apis: ["Image", "PDF", "QR", "Email", "URL Shortener"],
  },
  {
    name: "Intelligence",
    description: "Conversion, lookup, string, translation, extraction, and social signal APIs for normalization, enrichment, and utility-heavy workflows.",
    icon: "Brain",
    apis: ["Currency", "IP", "String", "Translate", "Extract", "Social"],
  },
  {
    name: "Enrichment",
    description: "APIs that turn raw inputs into company, search, monitoring, pricing, and review intelligence.",
    icon: "TrendingUp",
    apis: ["Enrich", "SERP", "Monitor", "Price", "Reviews", "Rate Oracle"],
  },
  {
    name: "Advanced",
    description: "Specialized APIs for research, extraction, sentiment, and resume workflows.",
    icon: "Zap",
    apis: ["Patents", "Papers", "Company", "Product", "Sentiment", "Resume", "DocGen", "Handoff", "Escalation", "Dispute", "Verify", "Entity Extract", "Watermark", "Attest"],
  },
  {
    name: "Utility",
    description: "Operational APIs for OCR, salary, tax, calendar, code execution, and mocks.",
    icon: "Wrench",
    apis: ["Salary", "Tax", "OCR", "Calendar", "Code", "Mock"],
  },
  {
    name: "Social",
    description: "Social graph and channel APIs for profiles, communities, and creator intelligence.",
    icon: "MessageSquareShare",
    apis: ["Twitter/X", "Reddit", "YouTube"],
  },
  {
    name: "Agent Kernel",
    description: "Production primitives for agents: heartbeat monitoring, audit logging, distributed locks, feature flags, quotas, checkpoints, key-value stores, secret management, job queues, policy enforcement, webhooks, and scheduling.",
    icon: "Shield",
    apis: ["Heartbeat", "Audit", "Lock", "Gate", "Quota", "Checkpoint", "Store", "Secret", "Queue", "Policy", "Webhook", "Schedule"],
  },
  {
    name: "Agent Utilities",
    description: "Text and data processing utilities for agent workflows: diffing, redaction, ranking, deduplication, classification, tracing, annotations, feedback, conversion, summarization, forms, and context management.",
    icon: "Wrench",
    apis: ["Diff", "Redact", "Rank", "Dedupe", "Classify", "Trace", "Annotation", "Feedback", "Convert", "Summarize", "Form", "Context"],
  },
  {
    name: "Business Operations",
    description: "Full commerce and operations stack for agents: invoicing, contracts, expenses, subscriptions, double-entry ledger, payroll, coupons, carts, checkout, refunds, inventory management, and approval workflows.",
    icon: "Building2",
    apis: ["Invoice", "Contract", "Expense", "Subscription", "Ledger", "Payroll", "Coupon", "Cart", "Checkout", "Refund", "Inventory", "Approval"],
  },
];

export const ALL_APIS_BY_CATEGORY: Record<ApiCategory, ApiListing[]> = {
  Commodity: [
    { name: "Image Resize", description: "Resize uploaded images with query params and return binary output. Multipart file upload; returns raw image bytes.", method: "POST", endpoint: "/v1/image/resize" },
    { name: "Image Compress", description: "Compress images to reduce file size. Multipart file upload; returns raw image bytes.", method: "POST", endpoint: "/v1/image/compress" },
    { name: "Image Convert", description: "Convert uploaded images into another format and return binary output. Multipart file upload; returns raw image bytes.", method: "POST", endpoint: "/v1/image/convert" },
    { name: "Image Watermark", description: "Add text watermarks to images. Multipart file upload; returns raw image bytes.", method: "POST", endpoint: "/v1/image/watermark" },
    { name: "Image Metadata", description: "Extract dimensions, format, and EXIF data. Multipart file upload; returns JSON.", method: "POST", endpoint: "/v1/image/metadata" },
    { name: "PDF Merge", description: "Merge multiple PDF URLs into one document. JSON body with 'urls' array.", method: "POST", endpoint: "/v1/pdf/merge" },
    { name: "PDF Split", description: "Split a PDF by page selection. JSON body with 'url' and 'pages' fields.", method: "POST", endpoint: "/v1/pdf/split" },
    { name: "PDF Info", description: "Return metadata (title, author, page count) for a PDF file.", method: "POST", endpoint: "/v1/pdf/info" },
    { name: "PDF Extract Text", description: "Extract text content from a PDF for indexing or LLM use. JSON body with 'url' field.", method: "POST", endpoint: "/v1/pdf/extract-text" },
    { name: "QR Generate", description: "Generate QR codes from text or URLs. JSON body with 'data' field; returns raw image bytes.", method: "POST", endpoint: "/v1/qr/generate" },
    { name: "QR Barcode", description: "Generate barcodes (Code128, EAN-13, UPC-A, etc.). JSON body with 'data' field; returns raw image bytes.", method: "POST", endpoint: "/v1/qr/barcode" },
    { name: "QR Decode", description: "Read QR codes from uploaded images. Multipart file upload.", method: "POST", endpoint: "/v1/qr/decode" },
    { name: "Email Validate", description: "Verify email syntax, DNS, MX records, and detect disposable providers.", method: "POST", endpoint: "/v1/email/validate" },
    { name: "Email Validate Bulk", description: "Validate up to 100 emails in one request.", method: "POST", endpoint: "/v1/email/validate/bulk" },
    { name: "URL Shorten", description: "Create short redirect links with optional custom codes and expiration.", method: "POST", endpoint: "/v1/url/shorten" },
    { name: "URL Stats", description: "Get click count and last-clicked timestamp for a short URL.", method: "GET", endpoint: "/v1/url/stats/{code}" },
    { name: "URL Delete", description: "Delete a short URL by its code.", method: "DELETE", endpoint: "/v1/url/{code}" },
  ],
  Intelligence: [
    { name: "Currency Convert", description: "Convert an amount between currencies at real-time exchange rates.", method: "POST", endpoint: "/v1/currency/convert" },
    { name: "Currency Rates", description: "Get live exchange rates for a base currency.", method: "GET", endpoint: "/v1/currency/rates" },
    { name: "Currency Supported", description: "List all supported currency codes.", method: "GET", endpoint: "/v1/currency/supported" },
    { name: "IP Lookup", description: "Geolocate an IP address to country, city, and ISP.", method: "POST", endpoint: "/v1/ip/lookup" },
    { name: "IP Me", description: "Get geolocation info for the caller's own IP.", method: "GET", endpoint: "/v1/ip/me" },
    { name: "IP Bulk", description: "Geolocate up to 50 IP addresses in one request.", method: "POST", endpoint: "/v1/ip/bulk" },
    { name: "String Encode", description: "Encode a string using base64, URL, HTML, or hex. Uses 'input' field.", method: "POST", endpoint: "/v1/string/encode" },
    { name: "String Decode", description: "Decode base64, URL, HTML, or hex encoded strings. Uses 'input' field.", method: "POST", endpoint: "/v1/string/decode" },
    { name: "String Hash", description: "Hash a string with MD5, SHA-1, SHA-256, or SHA-512. Uses 'input' field.", method: "POST", endpoint: "/v1/string/hash" },
    { name: "String Slugify", description: "Convert input text into URL-safe slugs. Uses 'input' field.", method: "POST", endpoint: "/v1/string/slugify" },
    { name: "String Truncate", description: "Truncate text to a max length with optional suffix. Uses 'input' field.", method: "POST", endpoint: "/v1/string/truncate" },
    { name: "String Generate", description: "Generate random strings from various character sets.", method: "POST", endpoint: "/v1/string/generate" },
    { name: "String Case", description: "Convert between camelCase, snake_case, kebab-case, PascalCase, CONSTANT, Title. Uses 'input' and 'to' fields.", method: "POST", endpoint: "/v1/string/case" },
    { name: "Translate", description: "Translate text between languages. Uses 'text', 'target', and optional 'source' fields.", method: "POST", endpoint: "/v1/translate/" },
    { name: "Translate Detect", description: "Auto-detect the language of a text sample.", method: "POST", endpoint: "/v1/translate/detect" },
    { name: "Translate Languages", description: "List all supported translation language codes and names.", method: "GET", endpoint: "/v1/translate/languages" },
    { name: "Structured Extract", description: "Extract structured fields from a web page using CSS selectors. JSON body with 'url' and 'selectors' map.", method: "POST", endpoint: "/v1/extract/extract" },
  ],
  Enrichment: [
    { name: "Enrich Email", description: "Look up person data from an email address.", method: "POST", endpoint: "/v1/enrich/email" },
    { name: "Enrich Domain", description: "Get company firmographic data from a domain.", method: "POST", endpoint: "/v1/enrich/domain" },
    { name: "SERP Search", description: "Fetch structured search engine results.", method: "POST", endpoint: "/v1/serp/search" },
    { name: "Monitor", description: "Check website uptime, status, and latency.", method: "POST", endpoint: "/v1/monitor/check" },
    { name: "Price Lookup", description: "Find product prices by URL or search query.", method: "POST", endpoint: "/v1/price/lookup" },
    { name: "Reviews Fetch", description: "Collect product reviews, ratings, and highlights.", method: "POST", endpoint: "/v1/reviews/fetch" },
    { name: "Rate Oracle", description: "Get rate limiting advice for third-party APIs.", method: "POST", endpoint: "/v1/rate-oracle/check" },
  ],
  Advanced: [
    { name: "Patents Search", description: "Search global patent databases by keyword.", method: "POST", endpoint: "/v1/patents/search" },
    { name: "Papers Search", description: "Search academic papers across arXiv and Semantic Scholar.", method: "POST", endpoint: "/v1/papers/search" },
    { name: "Company Lookup", description: "Look up company data by name or domain.", method: "POST", endpoint: "/v1/company/lookup" },
    { name: "Product Extract", description: "Extract structured product details from a URL.", method: "POST", endpoint: "/v1/product/extract" },
    { name: "Sentiment Analyze", description: "Analyze text sentiment with score, confidence, and word breakdown.", method: "POST", endpoint: "/v1/sentiment/analyze" },
    { name: "Resume Parse", description: "Parse resumes into structured candidate data.", method: "POST", endpoint: "/v1/resume/parse" },
    { name: "DocGen", description: "Generate PDF/DOCX documents from templates and data. JSON body with 'template', 'data', and 'format' fields.", method: "POST", endpoint: "/v1/docgen/generate" },
    { name: "Handoff", description: "Transfer tasks between agents with context. Create, accept, reject, and list handoffs.", method: "POST", endpoint: "/v1/handoff/create" },
    { name: "Escalation", description: "Route tasks through escalation levels with deadlines. Create, escalate, resolve, and list.", method: "POST", endpoint: "/v1/escalation/create" },
    { name: "Dispute", description: "Manage disputes through state machine lifecycle (open → review → resolved).", method: "POST", endpoint: "/v1/dispute/create" },
    { name: "Watermark", description: "Add text watermarks to images using sharp. POST multipart or JSON with image URL + text overlay.", method: "POST", endpoint: "/v1/watermark/image" },
    { name: "Attest", description: "Cryptographic signing and verification using HMAC-SHA256. Sign data with a key, then verify signatures.", method: "POST", endpoint: "/v1/attest/sign" },
    { name: "Verify", description: "Validate email, phone, and address formats. Three endpoints for RFC 5322 email, libphonenumber phone, and address normalization.", method: "POST", endpoint: "/v1/verify/email" },
    { name: "Entity Extract", description: "Extract named entities from text using regex patterns and dictionary matching. Returns entities with types.", method: "POST", endpoint: "/v1/entity/extract" },
  ],
  Utility: [
    { name: "Salary Lookup", description: "Get salary benchmarks by role, location, and experience level.", method: "POST", endpoint: "/v1/salary/lookup" },
    { name: "Tax Lookup", description: "Look up tax rates by country, state, and city.", method: "POST", endpoint: "/v1/tax/lookup" },
    { name: "OCR Extract", description: "Extract text from images via OCR. Multipart file upload.", method: "POST", endpoint: "/v1/ocr/extract" },
    { name: "Calendar Check", description: "Check time-slot availability with timezone and working-hours constraints.", method: "POST", endpoint: "/v1/calendar/check" },
    { name: "Code Execute", description: "Run JavaScript or Python code in a sandboxed runtime.", method: "POST", endpoint: "/v1/code/execute" },
    { name: "Mock Create", description: "Create mock API endpoints with configurable method, status, body, and delay.", method: "POST", endpoint: "/v1/mock/create" },
    { name: "Mock List", description: "List all mock API endpoints you have created.", method: "GET", endpoint: "/v1/mock/mocks" },
    { name: "Mock Serve", description: "Call a mock endpoint and receive its predefined response.", method: "GET", endpoint: "/v1/mock/serve/{id}" },
    { name: "Verify Email", description: "Validate email format (RFC 5322). Returns valid/syntax/normalized.", method: "POST", endpoint: "/v1/verify/email" },
    { name: "Verify Phone", description: "Validate phone numbers via libphonenumber-js. Returns valid/country/formatted.", method: "POST", endpoint: "/v1/verify/phone" },
    { name: "Verify Address", description: "Validate address format and normalize structure.", method: "POST", endpoint: "/v1/verify/address" },
    { name: "Entity Extract", description: "Extract named entities from text using regex patterns and dictionary matching. Returns entities with types.", method: "POST", endpoint: "/v1/entity/extract" },
  ],
  Social: [
    { name: "Twitter/X Profile", description: "Fetch profile bio, follower counts, tweet volume, verification, and account creation date by username.", method: "POST", endpoint: "/v1/social/twitter/profile" },
    { name: "Reddit Subreddit", description: "Pull subreddit post feeds with limit and sort controls for community and trend intelligence.", method: "POST", endpoint: "/v1/social/reddit/subreddit" },
    { name: "YouTube Channel", description: "Fetch channel subscriber and view counts plus a structured list of recent videos.", method: "POST", endpoint: "/v1/social/youtube/channel" },
  ],
  "Agent Kernel": [
    { name: "Heartbeat Register", description: "Register an agent heartbeat with interval and metadata.", method: "POST", endpoint: "/v1/heartbeat/register" },
    { name: "Heartbeat Status", description: "Get agent heartbeat status by ID.", method: "GET", endpoint: "/v1/heartbeat/status/:id" },
    { name: "Heartbeat Check", description: "Check if agent is alive based on heartbeat.", method: "GET", endpoint: "/v1/heartbeat/check/:id" },
    { name: "Audit Log", description: "Log an audit event with action, actor, and metadata.", method: "POST", endpoint: "/v1/audit/log" },
    { name: "Audit List", description: "List audit logs with pagination and filtering.", method: "GET", endpoint: "/v1/audit/logs" },
    { name: "Lock Acquire", description: "Acquire a distributed lock on a resource with TTL.", method: "POST", endpoint: "/v1/lock/acquire" },
    { name: "Lock Release", description: "Release a distributed lock by resource key.", method: "POST", endpoint: "/v1/lock/release" },
    { name: "Lock Status", description: "Check lock status for a resource.", method: "GET", endpoint: "/v1/lock/status/:resource" },
    { name: "Gate Flag", description: "Create a feature flag with conditions and rollout percentage.", method: "POST", endpoint: "/v1/gate/flag" },
    { name: "Gate Evaluate", description: "Evaluate a feature flag for a given context.", method: "GET", endpoint: "/v1/gate/evaluate/:flagId" },
    { name: "Gate Update", description: "Update a feature flag's conditions or rollout.", method: "PUT", endpoint: "/v1/gate/flag/:flagId" },
    { name: "Gate Delete", description: "Delete a feature flag.", method: "DELETE", endpoint: "/v1/gate/flag/:flagId" },
    { name: "Quota Check", description: "Check remaining quota for a key.", method: "POST", endpoint: "/v1/quota/check" },
    { name: "Quota Consume", description: "Consume quota units for a key.", method: "POST", endpoint: "/v1/quota/consume" },
    { name: "Quota Status", description: "Get quota status and usage for a key.", method: "GET", endpoint: "/v1/quota/status/:key" },
    { name: "Checkpoint Save", description: "Save agent state checkpoint with metadata.", method: "POST", endpoint: "/v1/checkpoint/save" },
    { name: "Checkpoint Latest", description: "Get latest checkpoint for an agent.", method: "GET", endpoint: "/v1/checkpoint/latest/:agentId" },
    { name: "Checkpoint List", description: "List all checkpoints for an agent.", method: "GET", endpoint: "/v1/checkpoint/list/:agentId" },
    { name: "Checkpoint Get", description: "Get a specific checkpoint by ID.", method: "GET", endpoint: "/v1/checkpoint/:checkpointId" },
    { name: "Store KV Set", description: "Set a key-value pair with optional TTL.", method: "POST", endpoint: "/v1/store/kv" },
    { name: "Store KV Get", description: "Get a value by key.", method: "GET", endpoint: "/v1/store/kv/:key" },
    { name: "Store KV Delete", description: "Delete a key-value pair.", method: "DELETE", endpoint: "/v1/store/kv/:key" },
    { name: "Store KV List", description: "List all keys with optional prefix filter.", method: "GET", endpoint: "/v1/store/kv/list" },
    { name: "Store Blob Put", description: "Upload binary data with metadata.", method: "POST", endpoint: "/v1/store/blob" },
    { name: "Store Blob Get", description: "Download binary data by ID.", method: "GET", endpoint: "/v1/store/blob/:id" },
    { name: "Store Blob Delete", description: "Delete binary data by ID.", method: "DELETE", endpoint: "/v1/store/blob/:id" },
    { name: "Secret Create", description: "Create an encrypted secret with rotation schedule.", method: "POST", endpoint: "/v1/secret/create" },
    { name: "Secret Get", description: "Retrieve a secret by ID (masked unless masked=false).", method: "GET", endpoint: "/v1/secret/:id" },
    { name: "Secret Rotate", description: "Rotate a secret with a new value.", method: "POST", endpoint: "/v1/secret/rotate/:id" },
    { name: "Secret Delete", description: "Delete a secret permanently.", method: "DELETE", endpoint: "/v1/secret/:id" },
    { name: "Queue Enqueue", description: "Add a job to a named queue with optional priority and delay.", method: "POST", endpoint: "/v1/queue/enqueue" },
    { name: "Queue Dequeue", description: "Dequeue jobs from a named queue.", method: "POST", endpoint: "/v1/queue/dequeue" },
    { name: "Queue Peek", description: "Peek at pending jobs without removing them.", method: "GET", endpoint: "/v1/queue/peek/:queue" },
    { name: "Queue Size", description: "Get queue depth (pending job count).", method: "GET", endpoint: "/v1/queue/size/:queue" },
    { name: "Queue Ack", description: "Acknowledge a completed job.", method: "POST", endpoint: "/v1/queue/ack/:jobId" },
    { name: "Queue Retry", description: "Retry a failed job.", method: "POST", endpoint: "/v1/queue/retry/:jobId" },
    { name: "Policy Create", description: "Create an access/allow/block policy with rules.", method: "POST", endpoint: "/v1/policy/policy" },
    { name: "Policy Evaluate", description: "Evaluate a request against policies.", method: "POST", endpoint: "/v1/policy/evaluate" },
    { name: "Policy Get", description: "Get a policy by ID.", method: "GET", endpoint: "/v1/policy/policy/:id" },
    { name: "Policy Update", description: "Update a policy's rules.", method: "PUT", endpoint: "/v1/policy/policy/:id" },
    { name: "Policy Delete", description: "Delete a policy.", method: "DELETE", endpoint: "/v1/policy/policy/:id" },
    { name: "Webhook Register", description: "Register a webhook endpoint with events and secret.", method: "POST", endpoint: "/v1/webhook/register" },
    { name: "Webhook Deliver", description: "Deliver a webhook event to a registered endpoint.", method: "POST", endpoint: "/v1/webhook/deliver" },
    { name: "Webhook Logs", description: "Get delivery logs for a webhook.", method: "GET", endpoint: "/v1/webhook/logs/:webhookId" },
    { name: "Webhook Delete", description: "Delete a webhook registration.", method: "DELETE", endpoint: "/v1/webhook/:webhookId" },
    { name: "Schedule Create", description: "Create a scheduled task with cron expression and handler.", method: "POST", endpoint: "/v1/schedule/create" },
    { name: "Schedule Get", description: "Get a scheduled task by ID.", method: "GET", endpoint: "/v1/schedule/:id" },
    { name: "Schedule List", description: "List all scheduled tasks.", method: "GET", endpoint: "/v1/schedule/list" },
    { name: "Schedule Update", description: "Update a scheduled task's cron or handler.", method: "PUT", endpoint: "/v1/schedule/:id" },
    { name: "Schedule Delete", description: "Delete a scheduled task.", method: "DELETE", endpoint: "/v1/schedule/:id" },
    { name: "Schedule Pause", description: "Pause a scheduled task.", method: "POST", endpoint: "/v1/schedule/pause/:id" },
    { name: "Schedule Resume", description: "Resume a paused scheduled task.", method: "POST", endpoint: "/v1/schedule/resume/:id" },
  ],
  "Agent Utilities": [
    { name: "Diff Compare", description: "Compare two text or JSON inputs and return additions, deletions, and changes.", method: "POST", endpoint: "/v1/diff/compare" },
    { name: "Redact", description: "Redact sensitive data (emails, phones, SSNs, IPs) from text with configurable masking.", method: "POST", endpoint: "/v1/redact/process" },
    { name: "Rank Score", description: "Score and rank items by weighted criteria. Returns sorted results with scores.", method: "POST", endpoint: "/v1/rank/score" },
    { name: "Dedupe Match", description: "Find duplicate records using fuzzy string matching and optional field-level comparison.", method: "POST", endpoint: "/v1/dedupe/match" },
    { name: "Classify", description: "Classify text into categories using keyword/pattern matching with confidence scores.", method: "POST", endpoint: "/v1/classify/classify" },
    { name: "Trace Start", description: "Start a new execution trace with metadata.", method: "POST", endpoint: "/v1/trace/start" },
    { name: "Trace Span", description: "Add a span to an existing trace.", method: "POST", endpoint: "/v1/trace/span" },
    { name: "Trace Get", description: "Get full trace with all spans by trace ID.", method: "GET", endpoint: "/v1/trace/:traceId" },
    { name: "Annotation Create", description: "Create an annotation on content with type and metadata.", method: "POST", endpoint: "/v1/annotation/create" },
    { name: "Annotation Get", description: "Get an annotation by ID.", method: "GET", endpoint: "/v1/annotation/:id" },
    { name: "Annotation Update", description: "Update an annotation.", method: "PUT", endpoint: "/v1/annotation/:id" },
    { name: "Annotation Delete", description: "Delete an annotation.", method: "DELETE", endpoint: "/v1/annotation/:id" },
    { name: "Annotation List", description: "List all annotations.", method: "GET", endpoint: "/v1/annotation/list" },
    { name: "Feedback Submit", description: "Submit feedback (thumbs up/down, rating) for an entity.", method: "POST", endpoint: "/v1/feedback/submit" },
    { name: "Feedback Aggregate", description: "Get aggregated feedback for an entity.", method: "GET", endpoint: "/v1/feedback/aggregate/:entityId" },
    { name: "Feedback List", description: "List all feedback entries.", method: "GET", endpoint: "/v1/feedback/list" },
    { name: "Convert Transform", description: "Convert between formats: JSON↔YAML, XML↔JSON, CSV↔JSON, markdown↔HTML.", method: "POST", endpoint: "/v1/convert/transform" },
    { name: "Summarize", description: "Extract summaries from long text. Returns key points, summary, and word counts.", method: "POST", endpoint: "/v1/summarize/extract" },
    { name: "Form Validate", description: "Validate form fields against schemas (email, phone, required, pattern, etc.).", method: "POST", endpoint: "/v1/form/validate" },
    { name: "Form Generate", description: "Generate form schemas from field definitions.", method: "POST", endpoint: "/v1/form/generate" },
    { name: "Context Truncate", description: "Truncate text to fit a token limit with optional sliding window.", method: "POST", endpoint: "/v1/context/truncate" },
    { name: "Context Count", description: "Count tokens/chars in text for budget planning.", method: "POST", endpoint: "/v1/context/count" },
    { name: "Context Slice", description: "Slice text with overlap for chunking long documents.", method: "POST", endpoint: "/v1/context/slice" },
  ],
  "Business Operations": [
    { name: "Invoice Create", description: "Create an invoice with line items, due date, and client info.", method: "POST", endpoint: "/v1/invoice/create" },
    { name: "Invoice Get", description: "Get an invoice by ID.", method: "GET", endpoint: "/v1/invoice/:id" },
    { name: "Invoice List", description: "List invoices with pagination.", method: "GET", endpoint: "/v1/invoice/list" },
    { name: "Contract Create", description: "Create a contract with parties, terms, and expiry date.", method: "POST", endpoint: "/v1/contract/create" },
    { name: "Contract Get", description: "Get a contract by ID.", method: "GET", endpoint: "/v1/contract/:id" },
    { name: "Contract List", description: "List contracts with pagination.", method: "GET", endpoint: "/v1/contract/list" },
    { name: "Expense Create", description: "Log an expense with category, amount, and receipt.", method: "POST", endpoint: "/v1/expense/create" },
    { name: "Expense Get", description: "Get an expense by ID.", method: "GET", endpoint: "/v1/expense/:id" },
    { name: "Expense Update", description: "Update expense details or status.", method: "PUT", endpoint: "/v1/expense/:id" },
    { name: "Expense Delete", description: "Delete an expense.", method: "DELETE", endpoint: "/v1/expense/:id" },
    { name: "Expense List", description: "List expenses with pagination.", method: "GET", endpoint: "/v1/expense/list" },
    { name: "Expense Summary", description: "Get expense summary by category and date range.", method: "GET", endpoint: "/v1/expense/summary" },
    { name: "Subscription Create", description: "Create a subscription with plan, interval, and price.", method: "POST", endpoint: "/v1/subscription/create" },
    { name: "Subscription Get", description: "Get a subscription by ID.", method: "GET", endpoint: "/v1/subscription/:id" },
    { name: "Subscription Update", description: "Update subscription plan or status.", method: "PUT", endpoint: "/v1/subscription/:id" },
    { name: "Subscription Cancel", description: "Cancel a subscription.", method: "POST", endpoint: "/v1/subscription/cancel/:id" },
    { name: "Subscription List", description: "List subscriptions with pagination.", method: "GET", endpoint: "/v1/subscription/list" },
    { name: "Ledger Entry", description: "Create a double-entry journal transaction with debit/credit lines.", method: "POST", endpoint: "/v1/ledger/entry" },
    { name: "Ledger Balance", description: "Get account balance by account ID.", method: "GET", endpoint: "/v1/ledger/balance/:accountId" },
    { name: "Ledger Entries", description: "List ledger entries with pagination.", method: "GET", endpoint: "/v1/ledger/entries" },
    { name: "Ledger Trial Balance", description: "Get trial balance across all accounts.", method: "GET", endpoint: "/v1/ledger/trial-balance" },
    { name: "Payroll Calculate", description: "Calculate gross/net pay with deductions and hours.", method: "POST", endpoint: "/v1/payroll/calculate" },
    { name: "Payroll Get", description: "Get a payroll run by ID.", method: "GET", endpoint: "/v1/payroll/:id" },
    { name: "Payroll List", description: "List payroll runs with pagination.", method: "GET", endpoint: "/v1/payroll/list" },
    { name: "Coupon Create", description: "Create a coupon with code, type (percentage/fixed), value, and limits.", method: "POST", endpoint: "/v1/coupon/create" },
    { name: "Coupon Validate", description: "Validate a coupon code and calculate discount.", method: "POST", endpoint: "/v1/coupon/validate" },
    { name: "Coupon Get", description: "Get a coupon by ID.", method: "GET", endpoint: "/v1/coupon/:id" },
    { name: "Coupon Update", description: "Update coupon details.", method: "PUT", endpoint: "/v1/coupon/:id" },
    { name: "Coupon Delete", description: "Delete a coupon.", method: "DELETE", endpoint: "/v1/coupon/:id" },
    { name: "Cart Create", description: "Create an empty cart.", method: "POST", endpoint: "/v1/cart/create" },
    { name: "Cart Add Item", description: "Add an item to a cart.", method: "POST", endpoint: "/v1/cart/:id/item" },
    { name: "Cart Update Item", description: "Update item quantity in a cart.", method: "PUT", endpoint: "/v1/cart/:id/item/:itemId" },
    { name: "Cart Remove Item", description: "Remove an item from a cart.", method: "DELETE", endpoint: "/v1/cart/:id/item/:itemId" },
    { name: "Cart Get", description: "Get a cart by ID with items and totals.", method: "GET", endpoint: "/v1/cart/:id" },
    { name: "Checkout Process", description: "Process checkout: create invoice, record ledger entries, deduct inventory.", method: "POST", endpoint: "/v1/checkout/process" },
    { name: "Refund Request", description: "Request a refund for an invoice with reason.", method: "POST", endpoint: "/v1/refund/request" },
    { name: "Refund Update", description: "Update refund status (approved/rejected/completed).", method: "PUT", endpoint: "/v1/refund/:id/status" },
    { name: "Refund Get", description: "Get a refund by ID.", method: "GET", endpoint: "/v1/refund/:id" },
    { name: "Refund List", description: "List refunds with pagination.", method: "GET", endpoint: "/v1/refund/list" },
    { name: "Inventory Add", description: "Add an inventory item with SKU, quantity, and reorder point.", method: "POST", endpoint: "/v1/inventory/item" },
    { name: "Inventory Update Stock", description: "Adjust stock levels for an item.", method: "PUT", endpoint: "/v1/inventory/:id/stock" },
    { name: "Inventory Get", description: "Get an inventory item by ID.", method: "GET", endpoint: "/v1/inventory/:id" },
    { name: "Inventory List", description: "List inventory items with pagination.", method: "GET", endpoint: "/v1/inventory/list" },
    { name: "Inventory Reserve", description: "Reserve stock for an order.", method: "POST", endpoint: "/v1/inventory/reserve" },
    { name: "Inventory Release", description: "Release previously reserved stock.", method: "POST", endpoint: "/v1/inventory/release" },
    { name: "Approval Request", description: "Create an approval request with level, context, and deadline.", method: "POST", endpoint: "/v1/approval/request" },
    { name: "Approval Approve", description: "Approve a pending request.", method: "POST", endpoint: "/v1/approval/:id/approve" },
    { name: "Approval Reject", description: "Reject a pending request with reason.", method: "POST", endpoint: "/v1/approval/:id/reject" },
    { name: "Approval Get", description: "Get an approval request by ID.", method: "GET", endpoint: "/v1/approval/:id" },
    { name: "Approval List", description: "List approval requests with pagination.", method: "GET", endpoint: "/v1/approval/list" },
  ],
};

export const API_ENDPOINTS: ApiEndpoint[] = [
  {
    id: "image",
    name: "Image",
    description: "Resize, compress, convert, watermark, and extract metadata from images. All endpoints accept multipart file uploads (field name 'file'). Resize, Compress, Convert, and Watermark return raw image bytes. Metadata returns JSON.",
    category: "Commodity",
    basePath: "/v1/image",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/image/resize \\
  -H "x-api-key: YOUR_KEY" \\
  -F "file=@photo.jpg" \\
  -F "width=800" \\
  -F "height=600" \\
  -F "fit=cover"`,
    exampleResponse: `# Resize/Compress/Convert/Watermark: raw image bytes (check Content-Type header)
# Metadata endpoint returns JSON:
{
  "width": 1920,
  "height": 1080,
  "format": "jpeg",
  "size_bytes": 284331
}`,
  },
  {
    id: "pdf",
    name: "PDF",
    description: "Merge, split, inspect, and extract text from PDF files. All endpoints accept JSON with PDF URLs. Merge and Split return file references; Info returns metadata; Extract-Text returns text content.",
    category: "Commodity",
    basePath: "/v1/pdf",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/pdf/merge \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_KEY" \\
  -d '{"urls": ["https://example.com/one.pdf", "https://example.com/two.pdf"]}'`,
    exampleResponse: `{
  "output_url": "https://cdn.agentapihive.com/pdf/merged.pdf",
  "page_count": 18
}`,
  },
  {
    id: "qr",
    name: "QR",
    description: "Generate QR codes, barcodes, and decode QR images. Generate and Barcode accept JSON with a 'data' field (not 'text') and return raw image bytes. Decode accepts a multipart file upload.",
    category: "Commodity",
    basePath: "/v1/qr",
    methods: ["POST"],
    exampleRequest: `# Generate QR (JSON body, returns raw image bytes):
curl -X POST \\
  https://api.agentapihive.com/v1/qr/generate \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"data": "https://agentapihive.com", "size": 512, "format": "png"}'

# Decode QR (multipart file upload):
curl -X POST \\
  https://api.agentapihive.com/v1/qr/decode \\
  -H "x-api-key: YOUR_KEY" \\
  -F "file=@qr-code.png"`,
    exampleResponse: `# Generate/Barcode: raw image bytes (PNG or SVG)
# Decode returns JSON:
{
  "text": "https://agentapihive.com/docs"
}`,
  },
  {
    id: "email",
    name: "Email",
    description: "Validate single emails or bulk lists (up to 100) for syntax, DNS, MX records, and disposable provider detection.",
    category: "Commodity",
    basePath: "/v1/email",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/email/validate \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "founder@agentapihive.com"}'`,
    exampleResponse: `{
  "email": "founder@agentapihive.com",
  "valid": true,
  "syntax": true,
  "domain": "agentapihive.com",
  "mxRecords": true,
  "hasDNS": true,
  "isDisposable": false,
  "isFreeProvider": false,
  "suggestion": null
}`,
  },
  {
    id: "url",
    name: "URL Shortener",
    description: "Create short links with optional custom codes and expiration, get click analytics, and delete links.",
    category: "Commodity",
    basePath: "/v1/url",
    methods: ["POST", "GET", "DELETE"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/url/shorten \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://agentapihive.com/docs", "customCode": "hive42"}'`,
    exampleResponse: `{
  "code": "hive42",
  "short_url": "https://aah.sh/hive42"
}`,
  },
  {
    id: "currency",
    name: "Currency",
    description: "Real-time currency conversion, live exchange rate tables, and supported currency listing.",
    category: "Intelligence",
    basePath: "/v1/currency",
    methods: ["POST", "GET"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/currency/convert \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"from": "USD", "to": "EUR", "amount": 99.95}'`,
    exampleResponse: `{
  "from": "USD",
  "to": "EUR",
  "amount": 99.95,
  "converted": 91.62,
  "rate": 0.9167,
  "timestamp": "2026-03-27T20:13:00.000Z"
}`,
  },
  {
    id: "ip",
    name: "IP",
    description: "Geolocate IPs (single, bulk up to 50, or your own) to country, city, ISP, and timezone.",
    category: "Intelligence",
    basePath: "/v1/ip",
    methods: ["POST", "GET"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/ip/lookup \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"ip": "8.8.8.8"}'`,
    exampleResponse: `{
  "ip": "8.8.8.8",
  "country": "United States",
  "city": "Mountain View",
  "isp": "Google LLC",
  "timezone": "America/Los_Angeles"
}`,
  },
  {
    id: "string",
    name: "String",
    description: "Encode, decode, hash, slugify, truncate, generate, and change case of strings. All endpoints use 'input' (not 'text') as the primary field. Case uses 'to' (not 'case_type'). Generate uses 'charset' (not 'type').",
    category: "Intelligence",
    basePath: "/v1/string",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/string/hash \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"input": "Agent API Hive", "algorithm": "sha256"}'`,
    exampleResponse: `{
  "hash": "7ea0f4fe1c44c93d3b9d8f95d7e2c5c790db3d2c16baf951f90b7b7db73690d2",
  "algorithm": "sha256",
  "length": 64
}`,
  },
  {
    id: "translate",
    name: "Translate",
    description: "Translate text between languages, detect source language, and list supported languages. Translate uses 'text', 'target', and optional 'source' fields. Returns 'translatedText' and 'detectedLanguage'.",
    category: "Intelligence",
    basePath: "/v1/translate",
    methods: ["POST", "GET"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/translate/ \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Build agents faster.", "target": "es"}'`,
    exampleResponse: `{
  "translatedText": "Construye agentes más rápido.",
  "detectedLanguage": "en",
  "source": "en",
  "target": "es"
}`,
  },
  {
    id: "extract",
    name: "Extract",
    description: "Extract structured fields from any web page using CSS selectors. POST a URL and a selector map to receive the extracted values.",
    category: "Intelligence",
    basePath: "/v1/extract",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/extract/extract \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com/product", "selectors": {"title": "h1", "price": ".price"}}'`,
    exampleResponse: `{
  "title": "Agent Laptop Sleeve",
  "price": "$39"
}`,
  },
  {
    id: "enrich",
    name: "Enrich",
    description: "Enrich email addresses into person profiles and domains into company profiles. Both use POST with JSON body.",
    category: "Enrichment",
    basePath: "/v1/enrich",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/enrich/email \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "founder@agentapihive.com"}'`,
    exampleResponse: `{
  "email": "founder@agentapihive.com",
  "full_name": "Ava Founder",
  "company": "Agent API Hive",
  "title": "CEO",
  "linkedin": "https://linkedin.com/in/ava-founder"
}`,
  },
  {
    id: "serp",
    name: "SERP",
    description: "Fetch structured search engine results for a query. Uses 'query' and optional 'engine' fields.",
    category: "Enrichment",
    basePath: "/v1/serp",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/serp/search \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"query": "best llm observability tools", "engine": "google"}'`,
    exampleResponse: `{
  "engine": "google",
  "results": [
    { "title": "Top 10 LLM Observability Tools", "url": "https://example.com/llm-tools", "snippet": "A comprehensive guide..." }
  ]
}`,
  },
  {
    id: "monitor",
    name: "Monitor",
    description: "Check website uptime, HTTP status, and response latency. Returns status, latency_ms, and uptime.",
    category: "Enrichment",
    basePath: "/v1/monitor",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/monitor/check \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://agentapihive.com"}'`,
    exampleResponse: `{
  "url": "https://agentapihive.com",
  "status": 200,
  "latency_ms": 183,
  "uptime": "99.99%"
}`,
  },
  {
    id: "price",
    name: "Price",
    description: "Look up product prices by URL or search query. Returns title, price, and currency.",
    category: "Enrichment",
    basePath: "/v1/price",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/price/lookup \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"query": "wireless ergonomic keyboard"}'`,
    exampleResponse: `{
  "title": "Wireless Ergonomic Keyboard",
  "price": 129.99,
  "currency": "USD"
}`,
  },
  {
    id: "reviews",
    name: "Reviews",
    description: "Fetch product reviews, average rating, and review highlights from a URL.",
    category: "Enrichment",
    basePath: "/v1/reviews",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/reviews/fetch \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com/product/wireless-keyboard"}'`,
    exampleResponse: `{
  "average_rating": 4.6,
  "total_reviews": 812,
  "highlights": ["fast shipping", "great battery"]
}`,
  },
  {
    id: "rate-oracle",
    name: "Rate Oracle",
    description: "Get rate limiting recommendations for third-party services. Uses 'service' field.",
    category: "Enrichment",
    basePath: "/v1/rate-oracle",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/rate-oracle/check \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"service": "openai"}'`,
    exampleResponse: `{
  "service": "openai",
  "recommendation": "burst 3, sustain 60 rpm, exponential backoff 2x"
}`,
  },
  {
    id: "patents",
    name: "Patents",
    description: "Search global patent databases by keyword query for prior art and innovation research.",
    category: "Advanced",
    basePath: "/v1/patents",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/patents/search \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"query": "agent orchestration system"}'`,
    exampleResponse: `{
  "results": [
    { "patent_id": "US1234567A", "title": "Agent orchestration system", "assignee": "Acme Corp", "filed": "2025-06-15" }
  ]
}`,
  },
  {
    id: "papers",
    name: "Papers",
    description: "Search academic papers across arXiv and Semantic Scholar by topic query.",
    category: "Advanced",
    basePath: "/v1/papers",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/papers/search \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"query": "tool-augmented language models"}'`,
    exampleResponse: `{
  "results": [
    { "title": "Tool-Augmented Language Models", "authors": ["A. Smith", "J. Lee"], "year": 2024 }
  ]
}`,
  },
  {
    id: "company",
    name: "Company",
    description: "Look up company profile data by name or domain. Provide at least one of 'name' or 'domain'.",
    category: "Advanced",
    basePath: "/v1/company",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/company/lookup \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"domain": "agentapihive.com"}'`,
    exampleResponse: `{
  "name": "Agent API Hive",
  "domain": "agentapihive.com",
  "founded": 2026,
  "headquarters": "Riyadh",
  "category": "Developer Infrastructure",
  "employee_range": "11-50"
}`,
  },
  {
    id: "product",
    name: "Product",
    description: "Extract structured product details (title, price, currency, images) from a URL.",
    category: "Advanced",
    basePath: "/v1/product",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/product/extract \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com/product/4k-portable-monitor"}'`,
    exampleResponse: `{
  "title": "4K Portable Monitor",
  "price": 299.99,
  "currency": "USD",
  "images": 5,
  "availability": "In stock"
}`,
  },
  {
    id: "sentiment",
    name: "Sentiment",
    description: "Analyze text sentiment. Returns sentiment label, score, confidence, and per-word breakdown.",
    category: "Advanced",
    basePath: "/v1/sentiment",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/sentiment/analyze \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "This product is amazing and the support team was incredibly helpful!"}'`,
    exampleResponse: `{
  "sentiment": "positive",
  "score": 0.91,
  "confidence": 0.95,
  "words": { "amazing": 0.95, "incredibly": 0.88, "helpful": 0.90 }
}`,
  },
  {
    id: "resume",
    name: "Resume",
    description: "Parse resumes into structured candidate data. Provide a 'url' to a resume file or raw 'text'.",
    category: "Advanced",
    basePath: "/v1/resume",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/resume/parse \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com/resume.pdf"}'`,
    exampleResponse: `{
  "name": "Ava Founder",
  "email": "ava@example.com",
  "skills": ["TypeScript", "LLM Ops", "Next.js"],
  "years_experience": 7,
  "experience": [{ "company": "Agent API Hive", "role": "CEO" }]
}`,
  },
  {
    id: "docgen",
    name: "DocGen",
    description: "Generate PDF and DOCX documents from templates and data. Supply a template, structured data, and output format to produce downloadable documents.",
    category: "Advanced",
    basePath: "/v1/docgen",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/docgen/generate \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"template": "invoice", "data": {"client": "Acme Corp", "total": 1200}, "format": "pdf"}'`,
    exampleResponse: `{
  "url": "https://cdn.agentapihive.com/docgen/invoice-20260328.pdf",
  "format": "pdf",
  "pages": 1
}`,
  },
  {
    id: "handoff",
    name: "Handoff",
    description: "Transfer tasks between agents with full context. Create handoffs, accept or reject them, and list all handoff records.",
    category: "Advanced",
    basePath: "/v1/handoff",
    methods: ["POST", "GET"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/handoff/create \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"fromAgent": "sales-bot", "toAgent": "support-bot", "context": {"ticket": "TK-4821", "summary": "Customer needs refund processing"}}'`,
    exampleResponse: `{
  "id": "handoff_a1b2c3",
  "fromAgent": "sales-bot",
  "toAgent": "support-bot",
  "status": "pending",
  "context": {"ticket": "TK-4821", "summary": "Customer needs refund processing"},
  "created_at": "2026-03-28T10:15:00Z"
}`,
  },
  {
    id: "escalation",
    name: "Escalation",
    description: "Route tasks through escalation levels with deadlines. Create escalations, escalate to higher levels, resolve, and list all records.",
    category: "Advanced",
    basePath: "/v1/escalation",
    methods: ["POST", "GET"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/escalation/create \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"task": "Payment gateway timeout", "level": 1, "deadline": "2026-03-28T18:00:00Z", "assignee": "ops-team"}'`,
    exampleResponse: `{
  "id": "esc_x7y8z9",
  "task": "Payment gateway timeout",
  "level": 1,
  "status": "open",
  "deadline": "2026-03-28T18:00:00Z",
  "assignee": "ops-team",
  "created_at": "2026-03-28T10:20:00Z"
}`,
  },
  {
    id: "dispute",
    name: "Dispute",
    description: "Manage disputes through a state machine lifecycle (open → review → resolved). Create disputes, update status, and list all records.",
    category: "Advanced",
    basePath: "/v1/dispute",
    methods: ["POST", "PUT", "GET"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/dispute/create \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"subject": "Invoice #4821 overcharge", "parties": ["buyer@acme.com", "seller@vendor.com"], "details": "Charged twice for same item"}'`,
    exampleResponse: `{
  "id": "disp_m4n5o6",
  "subject": "Invoice #4821 overcharge",
  "status": "open",
  "parties": ["buyer@acme.com", "seller@vendor.com"],
  "created_at": "2026-03-28T10:25:00Z"
}`,
  },
  {
    id: "verify",
    name: "Verify",
    description: "Validate email, phone, and address formats. Each endpoint checks structural validity and returns normalization data.",
    category: "Advanced",
    basePath: "/v1/verify",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/verify/email \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "founder@agentapihive.com"}'`,
    exampleResponse: `{
  "email": "founder@agentapihive.com",
  "valid": true,
  "syntax": true,
  "normalized": "founder@agentapihive.com"
}`,
  },
  {
    id: "entity-extract",
    name: "Entity Extract",
    description: "Extract named entities from text using regex patterns and dictionary matching. Returns entities with type classifications.",
    category: "Advanced",
    basePath: "/v1/entity",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/entity/extract \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "John Smith from Acme Corp called about the $5,000 invoice on March 15th"}'`,
    exampleResponse: `{
  "entities": [
    {"text": "John Smith", "type": "person"},
    {"text": "Acme Corp", "type": "organization"},
    {"text": "$5,000", "type": "currency"},
    {"text": "March 15th", "type": "date"}
  ]
}`,
  },
  {
    id: "watermark",
    name: "Watermark",
    description: "Add text watermarks to images using sharp. Accepts image URLs or base64 data with configurable text overlay, position, and opacity.",
    category: "Advanced",
    basePath: "/v1/watermark",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/watermark/image \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"imageUrl": "https://example.com/photo.jpg", "text": "CONFIDENTIAL", "position": "center", "opacity": 0.3}'`,
    exampleResponse: `{
  "url": "https://cdn.agentapihive.com/watermarked/photo-wm.jpg",
  "width": 1920,
  "height": 1080
}`,
  },
  {
    id: "attest",
    name: "Attest",
    description: "Cryptographic signing and verification using HMAC-SHA256. Sign data with a secret key, then verify signatures to ensure data integrity.",
    category: "Advanced",
    basePath: "/v1/attest",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/attest/sign \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"data": "order-confirmation-4821", "secret": "whsec_abc123"}'`,
    exampleResponse: `{
  "signature": "a1b2c3d4e5f6...sha256hex",
  "algorithm": "hmac-sha256",
  "data": "order-confirmation-4821"
}`,
  },
  {
    id: "salary",
    name: "Salary",
    description: "Look up salary benchmarks by role, location, and experience level (entry/mid/senior/lead/executive).",
    category: "Utility",
    basePath: "/v1/salary",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/salary/lookup \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"role": "Staff AI Engineer", "location": "Riyadh", "experience": "senior"}'`,
    exampleResponse: `{
  "role": "Staff AI Engineer",
  "location": "Riyadh",
  "experience": "senior",
  "median_salary": 64000,
  "currency": "USD",
  "range": { "low": 48000, "high": 85000 }
}`,
  },
  {
    id: "tax",
    name: "Tax",
    description: "Look up tax rates by country, state, and city.",
    category: "Utility",
    basePath: "/v1/tax",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/tax/lookup \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"country": "US", "state": "CA"}'`,
    exampleResponse: `{
  "country": "US",
  "state": "CA",
  "rate_percent": 7.25
}`,
  },
  {
    id: "ocr",
    name: "OCR",
    description: "Extract text from images via OCR. Accepts multipart file upload (not a JSON URL). Returns JSON with extracted text.",
    category: "Utility",
    basePath: "/v1/ocr",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/ocr/extract \\
  -H "x-api-key: YOUR_KEY" \\
  -F "file=@receipt.png"`,
    exampleResponse: `{
  "text": "Invoice #4821 Total: $1,294.00"
}`,
  },
  {
    id: "calendar",
    name: "Calendar",
    description: "Check availability in a timezone with optional working-hours constraints. Uses 'timezone', 'date', 'duration', and optional 'workingHours'.",
    category: "Utility",
    basePath: "/v1/calendar",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/calendar/check \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"timezone": "Asia/Riyadh", "date": "2026-03-28T14:00:00Z", "duration": "30m", "workingHours": {"start": "09:00", "end": "17:00"}}'`,
    exampleResponse: `{
  "available": true,
  "timezone": "Asia/Riyadh",
  "date": "2026-03-28T14:00:00Z",
  "duration": "30m"
}`,
  },
  {
    id: "code",
    name: "Code",
    description: "Execute JavaScript or Python code in a sandboxed runtime. Returns stdout, stderr, and exit_code.",
    category: "Utility",
    basePath: "/v1/code",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/code/execute \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"language": "python", "code": "print(2 + 2)", "timeout": 5000}'`,
    exampleResponse: `{
  "stdout": "4\\n",
  "stderr": "",
  "exit_code": 0
}`,
  },
  {
    id: "mock",
    name: "Mock",
    description: "Create, list, and serve mock API endpoints. Create takes 'method', optional 'responseCode', 'responseBody', and 'delay'. Serve supports GET/POST/PUT/DELETE.",
    category: "Utility",
    basePath: "/v1/mock",
    methods: ["POST", "GET", "PUT", "DELETE"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/mock/create \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"method": "GET", "responseCode": 200, "responseBody": {"users": [{"id": 1, "name": "Ava"}]}, "delay": 100}'`,
    exampleResponse: `{
  "id": "mock_7d1a",
  "serve_url": "https://mock.agentapihive.com/v1/mock/serve/mock_7d1a"
}`,
  },
  {
    id: "social",
    name: "Social",
    description: "Fetch public profile data from Twitter, Reddit, and YouTube. All endpoints use POST with JSON body. Returns structured social data — followers, posts, channels, and engagement signals.",
    category: "Intelligence",
    basePath: "/v1/social",
    methods: ["POST"],
    exampleRequest: `curl -X POST \\
  https://api.agentapihive.com/v1/social/twitter/profile \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"username": "elonmusk"}'`,
    exampleResponse: `{
  "username": "elonmusk",
  "bio": "Mars & Cars, Chips & Dips",
  "followers": 170200000,
  "following": 762,
  "tweets": 48200,
  "verified": true,
  "created_at": "2009-06-02T20:12:29Z"
}`,
  },
];

/* ── Computed counts (single source of truth) ── */
const _allApiListings = Object.values(ALL_APIS_BY_CATEGORY).flat();
export const TOTAL_APIS = API_CATEGORIES.reduce((sum, cat) => sum + cat.apis.length, 0);
export const TOTAL_ENDPOINTS = _allApiListings.length;

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    priceNote: "/month",
    dailyLimit: "100/day",
    features: [
      `All ${TOTAL_APIS} APIs, ${TOTAL_ENDPOINTS}+ endpoints`,
      "Community support",
      "API key access",
    ],
  },
  {
    name: "Starter",
    price: "$12",
    priceNote: "/month",
    dailyLimit: "1,000/day",
    features: [
      "Everything in Free",
      "Email support",
      "Usage dashboard",
    ],
  },
  {
    name: "Plus",
    price: "$36",
    priceNote: "/month",
    dailyLimit: "5,000/day",
    features: [
      "Everything in Starter",
      "Priority support",
      "Webhooks",
    ],
    highlighted: true,
  },
  {
    name: "Pro",
    price: "$60",
    priceNote: "/month",
    dailyLimit: "10,000/day",
    features: [
      "Everything in Plus",
      "Dedicated support",
      "SLA",
      "Custom limits",
    ],
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    dailyLimit: "Unlimited",
    features: [
      "Custom deployment",
      "Volume pricing",
      "Dedicated infra",
      "On-prem option",
    ],
  },
];

export function getApisByCategory(category: ApiCategory): ApiEndpoint[] {
  return API_ENDPOINTS.filter((api) => api.category === category);
}

export function getApiById(id: string): ApiEndpoint | undefined {
  return API_ENDPOINTS.find((api) => api.id === id);
}
