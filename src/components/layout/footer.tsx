import Link from 'next/link';
import { Hexagon, Globe, Send } from 'lucide-react';
import { TOTAL_APIS, TOTAL_ENDPOINTS } from '@/data/apis';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Hexagon className="h-6 w-6 text-emerald-500" fill="currentColor" />
              <span className="text-lg font-semibold">
                Agent API <span className="text-emerald-500">Hive</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {TOTAL_APIS} APIs. {TOTAL_ENDPOINTS}+ endpoints. One key.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">API Docs</Link></li>
              <li><Link href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="/signup" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Get API Key</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3">Connect</h4>
            <div className="flex gap-3">
              <a href="/docs" className="p-2 rounded-lg bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors">
                <Globe className="h-4 w-4" />
              </a>
              <a href="mailto:support@agenthive.dev" className="p-2 rounded-lg bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors">
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Agent API Hive. Built for autonomous agent workflows.
          </p>
        </div>
      </div>
    </footer>
  );
}
