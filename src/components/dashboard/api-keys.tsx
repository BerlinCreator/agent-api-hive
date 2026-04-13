"use client";

import { useMemo, useState } from "react";
import { Key, Copy, Plus, Trash2, Check, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DashboardApiKey } from "@/types";

interface ApiKeysProps {
  keys: DashboardApiKey[];
  tier: string;
  loading?: boolean;
  onGenerate: () => Promise<void>;
  onRevoke: (id: string) => Promise<void>;
}

export function ApiKeys({ keys, tier, loading = false, onGenerate, onRevoke }: ApiKeysProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [busyAction, setBusyAction] = useState<string | null>(null);

  const sortedKeys = useMemo(
    () => [...keys].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),
    [keys],
  );

  async function copyKey(key: DashboardApiKey) {
    await navigator.clipboard.writeText(key.key);
    setCopiedId(key.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function toggleVisibility(id: string) {
    setVisibleKeys((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleGenerate() {
    try {
      setBusyAction("generate");
      await onGenerate();
    } finally {
      setBusyAction(null);
    }
  }

  async function handleRevoke(id: string) {
    try {
      setBusyAction(id);
      await onRevoke(id);
    } finally {
      setBusyAction(null);
    }
  }

  function maskKey(key: string): string {
    if (key.length <= 16) return key;
    return `${key.slice(0, 14)}${"•".repeat(Math.max(8, key.length - 18))}${key.slice(-4)}`;
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6 gap-3">
        <div className="flex items-center gap-3">
          <Key className="h-5 w-5 text-accent" />
          <div>
            <h2 className="text-lg font-semibold">API Keys</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Your active tier: <span className="text-foreground font-medium capitalize">{tier}</span>
            </p>
          </div>
        </div>
        <Button variant="accent" size="sm" onClick={handleGenerate} disabled={loading || busyAction === "generate"}>
          <Plus className="h-4 w-4" />
          Generate Key
        </Button>
      </div>

      {sortedKeys.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-secondary/30 p-6 text-sm text-muted-foreground">
          No keys yet. Generate your first live key and start shipping.
        </div>
      ) : (
        <div className="space-y-3">
          {sortedKeys.map((key) => (
            <div
              key={key.id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg bg-secondary/50 border border-border"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-sm font-medium">{key.name}</span>
                  <Badge variant="accent" className="capitalize">{key.tier}</Badge>
                  <Badge variant="outline">{key.isActive ? "Active" : "Revoked"}</Badge>
                </div>
                <code className="text-xs text-muted-foreground font-mono block break-all">
                  {visibleKeys.has(key.id) ? key.key : maskKey(key.key)}
                </code>
                <span className="text-xs text-muted-foreground mt-1 block">
                  Created {new Date(key.createdAt).toLocaleDateString()} · Today {key.usageToday.toLocaleString()} / {key.dailyLimit.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleVisibility(key.id)}
                  title={visibleKeys.has(key.id) ? "Hide" : "Show"}
                  disabled={loading}
                >
                  {visibleKeys.has(key.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => copyKey(key)} title="Copy" disabled={loading}>
                  {copiedId === key.id ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRevoke(key.id)}
                  title="Revoke"
                  disabled={loading || !key.isActive || busyAction === key.id}
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
