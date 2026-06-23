import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { requireAuth } from "@/lib/supabase/require-auth";
import { CreditCard, Users, Activity, BarChart3 } from "lucide-react";
import { ChatPanel } from "@/components/chat/ChatPanel";

export default async function DashboardPage() {
  const { user, supabase } = await requireAuth();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const hasSubscription = subscription && subscription.status === "active";

  const stats = [
    {
      title: "Plan",
      value: hasSubscription ? (subscription.plan ?? "Pro") : "Free",
      description: hasSubscription ? subscription.status : "No active plan",
      icon: CreditCard,
    },
    {
      title: "Customer ID",
      value: hasSubscription && subscription.stripe_customer_id ? "Connected" : "—",
      description: "Stripe",
      icon: Users,
    },
    {
      title: "Subscription ID",
      value: hasSubscription ? "Active" : "—",
      description: hasSubscription
        ? new Date(subscription.updated_at).toLocaleDateString()
        : "Subscribe to get started",
      icon: Activity,
    },
    {
      title: "Projects",
      value: "1",
      description: "Active",
      icon: BarChart3,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back{user.email ? `, ${user.email}` : ""}!
        </p>
      </div>

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
                <span className="text-xs text-muted-foreground">
                  {stat.description}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            {hasSubscription ? (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <Badge>{subscription.plan}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant="secondary">{subscription.status}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stripe Customer</span>
                  <span className="font-mono text-xs">{subscription.stripe_customer_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stripe Subscription</span>
                  <span className="font-mono text-xs">{subscription.stripe_subscription_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span>{new Date(subscription.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <p>No subscription yet.</p>
                <p className="text-xs mt-1">Go to Pricing to choose a plan.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                You&apos;re logged in as{" "}
                <span className="text-foreground font-medium">{user.email}</span>
              </p>
              <p className="text-muted-foreground">
                User ID: <span className="font-mono text-xs">{user.id}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <ChatPanel />
      </div>
    </div>
  );
}
