"use client";

export const dynamic = "force-dynamic";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AuthFooter,
  AuthMetaRow,
  AuthShell,
  MissingSupabaseNotice,
} from "@/components/auth/auth-shell";
import { getSupabase, hasSupabaseEnv } from "@/lib/supabase";
import { TOTAL_APIS, TOTAL_ENDPOINTS } from "@/data/apis";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const authReady = hasSupabaseEnv();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!authReady) {
      setError("Supabase anon key is missing. Add it in .env.local to enable account creation.");
      return;
    }

    setLoading(true);

    try {
      const { error: signUpError } = await getSupabase().auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something broke while creating the account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      mode="signup"
      title="Create your account"
      description={`Spin up your workspace, generate your first key, and start shipping against ${TOTAL_APIS} production-ready APIs across ${TOTAL_ENDPOINTS}+ endpoints.`}
      footer={<AuthFooter mode="signup" />}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Min 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />

        {!authReady && <MissingSupabaseNotice />}

        {error && (
          <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <Button type="submit" variant="accent" className="w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Create account
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <AuthMetaRow />
    </AuthShell>
  );
}
