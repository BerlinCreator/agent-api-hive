"use client";

import { Settings as SettingsIcon, User, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SettingsProps {
  email: string | null;
  tier: string;
  memberSince: string | null;
  dailyLimit: number;
}

export function Settings({ email, tier, memberSince, dailyLimit }: SettingsProps) {
  return (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="h-5 w-5 text-accent" />
        <h2 className="text-lg font-semibold">Settings</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50 border border-border">
          <div className="p-2 rounded-lg bg-accent/10">
            <User className="h-5 w-5 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium mb-1">Profile</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>{email ?? "No email available"}</p>
              <p>{memberSince ? `Member since ${memberSince}` : "Member date unavailable"}</p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50 border border-border">
          <div className="p-2 rounded-lg bg-accent/10">
            <CreditCard className="h-5 w-5 text-accent" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-medium">Current Plan</h3>
              <Badge variant="accent" className="capitalize">{tier}</Badge>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>{dailyLimit.toLocaleString()} requests/day</p>
              <p>Tier is read from your active API keys in Supabase.</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
