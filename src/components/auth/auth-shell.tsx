import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight, Hexagon, ShieldCheck, TerminalSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TOTAL_APIS, TOTAL_ENDPOINTS } from "@/data/apis";

interface AuthShellProps {
  mode: "login" | "signup";
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

const authHighlights = [
  "Supabase session auth",
  "API key creation after signup",
  "Usage dashboard + quota tracking",
];

export function AuthShell({
  mode,
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-20 h-72 w-72 rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute right-[12%] top-28 h-64 w-64 rounded-full bg-emerald-500/6 blur-[100px]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="hidden lg:block">
          <Badge variant="accent" className="mb-6">
            <ShieldCheck className="h-3 w-3" />
            Secure access for agent builders
          </Badge>

          <h1 className="max-w-xl text-5xl font-semibold leading-tight tracking-tight">
            Control your <span className="text-gradient-accent">API stack</span>
            without the usual SaaS wallpaper.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Agent API Hive gives builders one clean control plane for auth,
            keys, quotas, and {TOTAL_APIS} APIs across {TOTAL_ENDPOINTS}+ endpoints. Dark terminal energy, less
            dashboard sludge.
          </p>

          <div className="mt-8 grid max-w-xl gap-3">
            {authHighlights.map((item) => (
              <div key={item} className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
                <TerminalSquare className="h-4 w-4 text-accent" />
                <span className="text-sm text-foreground/90">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5">
              <Hexagon className="h-3.5 w-3.5 text-accent" />
              {mode === "login" ? "Return to your hive" : "Create your access layer"}
            </span>
            <Link href="/docs" className="inline-flex items-center gap-1 text-accent hover:text-accent/80">
              Read the docs
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <Card className="rounded-3xl p-6 sm:p-8 lg:p-10 border-[hsl(150_3%_10%)] bg-[hsl(150_3%_6%)] backdrop-blur-xl bg-opacity-90">
          <div className="mb-8 text-center lg:text-left">
            <Link href="/" className="mb-6 inline-flex items-center gap-2">
              <Hexagon className="h-8 w-8 text-accent" />
              <span className="text-lg font-semibold tracking-tight">Agent API Hive</span>
            </Link>
            <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
          </div>

          {children}

          <div className="mt-6 border-t border-white/6 pt-5 text-center text-sm text-muted-foreground lg:text-left">
            {footer}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function MissingSupabaseNotice() {
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
      Supabase auth is wired, but the public anon key is missing in <code className="font-mono">.env.local</code>. Add <code className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to enable live signups and logins.
    </div>
  );
}

export function AuthFooter({ mode }: { mode: "login" | "signup" }) {
  return mode === "login" ? (
    <>
      Don&apos;t have an account?{" "}
      <Link href="/signup" className="font-medium text-accent hover:underline">
        Create one
      </Link>
    </>
  ) : (
    <>
      Already have an account?{" "}
      <Link href="/login" className="font-medium text-accent hover:underline">
        Log in
      </Link>
    </>
  );
}

export function AuthMetaRow() {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
      <span className="rounded-full border border-white/6 bg-white/[0.03] px-3 py-1">{TOTAL_APIS} APIs, {TOTAL_ENDPOINTS}+ endpoints</span>
      <span className="rounded-full border border-white/6 bg-white/[0.03] px-3 py-1">Railway backend</span>
      <span className="rounded-full border border-white/6 bg-white/[0.03] px-3 py-1">Terminal-grade UI</span>
    </div>
  );
}
