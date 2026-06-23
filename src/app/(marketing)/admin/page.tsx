import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { BarChart3, Activity, Users } from "lucide-react";
import { toolScenarios } from "@/config/tools";

export default async function AdminPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  // Subscriptions
  const { count: totalSubs } = await supabase.from("subscriptions").select("*", { count: "exact", head: true });
  const { count: activeSubs } = await supabase.from("subscriptions").select("*", { count: "exact", head: true }).eq("status", "active");
  const { data: plans } = await supabase.from("subscriptions").select("plan");

  // Users
  const { count: totalUsers } = await supabase.from("profiles").select("*", { count: "exact", head: true });

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin</h1>
            <p className="text-muted-foreground mt-1">Platform overview and monitoring.</p>
          </div>
          <Badge variant="secondary">{user.email}</Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Subscriptions</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSubs ?? 0}</div>
              <p className="text-xs text-muted-foreground">{activeSubs ?? 0} active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Profiles</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers ?? 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">AI Tools</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{toolScenarios.length}</div>
              <p className="text-xs text-muted-foreground">live</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Plan Distribution</CardTitle></CardHeader>
          <CardContent>
            {plans && plans.length > 0 ? (
              <div className="space-y-2">
                {Object.entries(
                  plans.reduce((acc, { plan }) => {
                    acc[plan] = (acc[plan] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([plan, count]) => (
                  <div key={plan} className="flex justify-between text-sm">
                    <span className="capitalize">{plan}</span>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground py-4 text-center">No subscriptions yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
