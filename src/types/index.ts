export type ApiCategory =
  | "Commodity"
  | "Intelligence"
  | "Enrichment"
  | "Advanced"
  | "Utility"
  | "Social"
  | "Agent Kernel"
  | "Agent Utilities"
  | "Business Operations";

export interface ApiEndpoint {
  id: string;
  name: string;
  description: string;
  category: ApiCategory;
  basePath: string;
  methods: HttpMethod[];
  exampleRequest?: string;
  exampleResponse?: string;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface PricingTier {
  name: string;
  price: string;
  priceNote?: string;
  dailyLimit: string;
  features: string[];
  highlighted?: boolean;
}

export interface DashboardApiKey {
  id: string;
  key: string;
  name: string;
  tier: string;
  createdAt: string;
  usageToday: number;
  dailyLimit: number;
  isActive: boolean;
}

export interface DashboardUsageHistoryPoint {
  date: string;
  label: string;
  count: number;
}

export interface DashboardUsageStats {
  today: number;
  dailyLimit: number;
  thisMonth: number;
  monthlyLimit: number;
  avgPerDay: number;
  history: DashboardUsageHistoryPoint[];
}
