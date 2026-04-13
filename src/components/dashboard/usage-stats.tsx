"use client";

import { BarChart3, TrendingUp, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { DashboardUsageStats } from "@/types";

function ProgressBar({
  value,
  max,
  label,
}: {
  value: number;
  max: number;
  label: string;
}) {
  const safeMax = max <= 0 ? 1 : max;
  const pct = Math.min((value / safeMax) * 100, 100);
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono">
          {value.toLocaleString()} <span className="text-muted-foreground">/ {max.toLocaleString()}</span>
        </span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function UsageStats({ stats }: { stats: DashboardUsageStats }) {
  const maxBar = Math.max(1, ...stats.history.map((d) => d.count));

  return (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="h-5 w-5 text-accent" />
        <h2 className="text-lg font-semibold">Usage</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-lg bg-secondary/50 border border-border">
          <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
            <Clock className="h-3 w-3" />
            Today
          </div>
          <p className="text-2xl font-bold font-mono">{stats.today.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-lg bg-secondary/50 border border-border">
          <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
            <TrendingUp className="h-3 w-3" />
            This Month
          </div>
          <p className="text-2xl font-bold font-mono">{stats.thisMonth.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-lg bg-secondary/50 border border-border">
          <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
            <BarChart3 className="h-3 w-3" />
            Avg/Day
          </div>
          <p className="text-2xl font-bold font-mono">{stats.avgPerDay.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <ProgressBar value={stats.today} max={stats.dailyLimit} label="Daily usage" />
        <ProgressBar value={stats.thisMonth} max={stats.monthlyLimit} label="Monthly usage (estimated)" />
      </div>

      <div>
        <h3 className="text-sm text-muted-foreground mb-3">Last 7 days</h3>
        <div className="flex items-end gap-2 h-24">
          {stats.history.map((day) => (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t bg-accent/20 hover:bg-accent/40 transition-colors relative group"
                style={{ height: `${(day.count / maxBar) * 100}%` }}
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {day.count}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground">{day.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
