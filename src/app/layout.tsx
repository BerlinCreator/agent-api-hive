import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TOTAL_APIS, TOTAL_ENDPOINTS } from "@/data/apis";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const metaDescription = `${TOTAL_APIS} APIs. ${TOTAL_ENDPOINTS}+ endpoints. One key. Built for AI agent builders across image, PDF, translation, enrichment, search, and more.`;

export const metadata: Metadata = {
  title: "Agent API Hive — The API Backbone for AI Agents",
  description: metaDescription,
  keywords: [
    "AI agent APIs",
    "agent API framework",
    "APIs for autonomous agents",
    "AI agent tools",
    "API suite",
    "agent utilities",
  ],
  openGraph: {
    title: "Agent API Hive — The API Backbone for AI Agents",
    description: metaDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent API Hive — The API Backbone for AI Agents",
    description: metaDescription,
  },
};

const schemaOrgJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Agent API Hive",
  description: metaDescription,
  url: "https://agentapihive.com",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: [
    { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free tier — 100 API calls/day" },
    { "@type": "Offer", price: "12", priceCurrency: "USD", description: "Starter — 1,000 API calls/day", billingIncrement: "P1M" },
    { "@type": "Offer", price: "36", priceCurrency: "USD", description: "Plus — 5,000 API calls/day", billingIncrement: "P1M" },
    { "@type": "Offer", price: "60", priceCurrency: "USD", description: "Pro — 10,000 API calls/day", billingIncrement: "P1M" },
  ],
  featureList: [
    "76 APIs across 10 categories",
    "191 endpoints",
    "Single API key authentication",
    "Image processing (resize, compress, convert, watermark)",
    "PDF tools (merge, split, extract text, metadata)",
    "Currency conversion and exchange rates",
    "Email validation (single and bulk)",
    "IP geolocation (single and bulk)",
    "Web scraping and structured extraction",
    "Lead and company enrichment",
    "SERP search",
    "Sentiment analysis",
    "OCR text extraction",
    "Translation and language detection",
    "Distributed locks and queues",
    "Feature flags and policies",
    "Audit logging and tracing",
    "Invoicing, contracts, and expenses",
    "Shopping cart and checkout",
    "Webhooks and scheduling",
  ],
  documentation: "https://agentapihive.com/docs",
  installUrl: "https://agentapihive.com/dashboard",
  supportUrl: "https://agentapihive.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased font-mono">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}