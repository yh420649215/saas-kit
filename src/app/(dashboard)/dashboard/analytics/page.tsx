import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { requireAuth } from "@/lib/supabase/require-auth";
import { BarChart3, Users, CreditCard, TrendingUp } from "lucide-react";

export default async function AnalyticsPage() {
  const { supabase } = await requireAuth();

  const { count: totalSubscriptions } = await supabase
    .from("subscriptions")
    .select("*", { count: "exact", head: true });

  const { count: activeCount } = await supabase
    .from("subscriptions")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");

  const { data: plans } = await supabase
    .from("subscriptions")
    .select("plan");

  const planCounts: Record<string, number> = {};
  if (plans) {
    for (const { plan } of plans) {
      planCounts[plan] = (planCounts[plan] || 0) + 1;
    }
  }

  const stats = [
    { title: "Total Subscriptions", value: totalSubscriptions ?? 0, icon: BarChart3 },
    { title: "Active", value: activeCount ?? 0, icon: TrendingUp },
    { title: "Plans", value: Object.keys(planCounts).length, icon: CreditCard },
    { title: "Churn Rate", value: totalSubscriptions ? `${Math.round(((totalSubscriptions - (activeCount ?? 0)) / totalSubscriptions) * 100)}%` : "0%", icon: Users },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Analytics</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((s) => (
          <Card key={s.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.title}</CardTitle>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plan Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(planCounts).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(planCounts).map(([plan, count]) => (
                <div key={plan} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="capitalize">{plan}</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{count} user{count !== 1 ? "s" : ""}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm py-4 text-center">No subscription data yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
