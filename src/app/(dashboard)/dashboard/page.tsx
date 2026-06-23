import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { requireAuth } from "@/lib/supabase/require-auth";
import { defaultStats } from "@/config/dashboard";
import { BarChart3, Activity } from "lucide-react";

export default async function DashboardPage() {
  const { user } = await requireAuth();

  const stats = defaultStats;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back{user.email ? `, ${user.email}` : ""}! Here&apos;s your
          overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {stat.description}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placeholder for charts */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center border-t">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="mx-auto h-12 w-12 mb-3 opacity-20" />
              <p className="text-sm">Revenue chart will appear here</p>
              <p className="text-xs">Connect Stripe to see your data</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center border-t">
            <div className="text-center text-muted-foreground">
              <Activity className="mx-auto h-12 w-12 mb-3 opacity-20" />
              <p className="text-sm">Activity feed will appear here</p>
              <p className="text-xs">Your recent actions and events</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
