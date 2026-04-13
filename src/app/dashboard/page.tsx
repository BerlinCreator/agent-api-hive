"use client";

export const dynamic = "force-dynamic";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Hexagon, LogOut } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { ApiKeys } from "@/components/dashboard/api-keys";
import { UsageStats } from "@/components/dashboard/usage-stats";
import { Settings } from "@/components/dashboard/settings";
import type { DashboardApiKey, DashboardUsageStats } from "@/types";

type ApiKeyRow = {
  id: string;
  name: string;
  key: string;
  tier: string;
  daily_limit: number;
  usage_today: number;
  created_at: string;
  is_active: boolean;
};

function generateApiKey() {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const token = Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
  return `aah_live_${token}`;
}

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function buildUsageStats(keys: DashboardApiKey[]): DashboardUsageStats {
  const today = keys.reduce((sum, key) => sum + key.usageToday, 0);
  const dailyLimit = keys.reduce((sum, key) => sum + key.dailyLimit, 0);
  const thisMonth = today;
  const monthlyLimit = dailyLimit * 30;
  const history = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const count = index === 6 ? today : 0;
    return {
      date: date.toISOString(),
      label: date.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 3),
      count,
    };
  });

  return {
    today,
    dailyLimit,
    thisMonth,
    monthlyLimit,
    avgPerDay: Math.round(history.reduce((sum, point) => sum + point.count, 0) / history.length),
    history,
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [memberSince, setMemberSince] = useState<string | null>(null);
  const [keys, setKeys] = useState<DashboardApiKey[]>([]);
  const [tier, setTier] = useState("free");

  const usageStats = useMemo(() => buildUsageStats(keys), [keys]);

  const loadDashboard = useCallback(async () => {
    const supabase = getSupabase();
    const [{ data: sessionData }, { data: userData }] = await Promise.all([
      supabase.auth.getSession(),
      supabase.auth.getUser(),
    ]);

    const session = sessionData.session;
    const user = userData.user;

    if (!session || !user) {
      router.push("/login");
      return;
    }

    setUserEmail(user.email ?? null);
    setMemberSince(
      user.created_at
        ? new Date(user.created_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : null,
    );

    const today = startOfDay(new Date()).toISOString();
    const { data, error } = await supabase
      .from("api_keys")
      .select("id,name,key,tier,daily_limit,usage_today,created_at,is_active,last_reset")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    const normalizedKeys = ((data ?? []) as Array<ApiKeyRow & { last_reset?: string | null }>).map((row) => {
      const needsReset = !row.last_reset || row.last_reset < today;
      return {
        id: row.id,
        name: row.name,
        key: row.key,
        tier: row.tier,
        createdAt: row.created_at,
        usageToday: needsReset ? 0 : row.usage_today,
        dailyLimit: row.daily_limit,
        isActive: row.is_active,
      };
    });

    setKeys(normalizedKeys);
    setTier(normalizedKeys.find((item) => item.isActive)?.tier ?? "free");
  }, [router]);

  useEffect(() => {
    loadDashboard()
      .catch((error) => {
        console.error("Failed to load dashboard", error);
        router.push("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loadDashboard, router]);

  async function refreshDashboard() {
    setRefreshing(true);
    try {
      await loadDashboard();
    } finally {
      setRefreshing(false);
    }
  }

  async function handleGenerateKey() {
    const supabase = getSupabase();
    const { data: authData } = await supabase.auth.getUser();
    const user = authData.user;

    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("api_keys").insert({
      user_id: user.id,
      name: `Key ${keys.length + 1}`,
      key: generateApiKey(),
      tier,
      daily_limit: keys.find((item) => item.isActive)?.dailyLimit ?? 100,
      usage_today: 0,
      is_active: true,
      last_reset: new Date().toISOString(),
    });

    if (error) {
      throw error;
    }

    await refreshDashboard();
  }

  async function handleRevokeKey(id: string) {
    const supabase = getSupabase();
    const { error } = await supabase.from("api_keys").update({ is_active: false }).eq("id", id);

    if (error) {
      throw error;
    }

    await refreshDashboard();
  }

  async function handleLogout() {
    await getSupabase().auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Hexagon className="h-8 w-8 text-accent animate-pulse" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {userEmail && <p className="text-sm text-muted-foreground mt-1">{userEmail}</p>}
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>

      <div className="space-y-6">
        <ApiKeys keys={keys} tier={tier} loading={refreshing} onGenerate={handleGenerateKey} onRevoke={handleRevokeKey} />
        <UsageStats stats={usageStats} />
        <Settings email={userEmail} tier={tier} memberSince={memberSince} dailyLimit={usageStats.dailyLimit || 100} />
      </div>
    </div>
  );
}
