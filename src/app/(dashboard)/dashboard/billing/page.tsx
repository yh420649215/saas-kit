import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { requireAuth } from "@/lib/supabase/require-auth";
import { getStripe } from "@/lib/stripe/client";
import { CreditCard, ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function BillingPage() {
  const { user, supabase } = await requireAuth();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const hasSubscription = subscription && subscription.status === "active";

  // Create Stripe Customer Portal link
  let portalUrl: string | null = null;
  if (hasSubscription && subscription.stripe_customer_id) {
    try {
      const session = await getStripe().billingPortal.sessions.create({
        customer: subscription.stripe_customer_id,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
      });
      portalUrl = session.url;
    } catch {
      // Stripe not configured — leave portalUrl null
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Billing</h1>

      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your subscription details.</CardDescription>
          </CardHeader>
          <CardContent>
            {hasSubscription ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold capitalize">{subscription.plan}</span>
                      <Badge variant="secondary">{subscription.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Last updated {new Date(subscription.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {portalUrl && (
                  <a href={portalUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Manage in Stripe
                    </Button>
                  </a>
                )}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>No active subscription.</p>
                <Link href="/pricing" className={buttonVariants({ className: "mt-4" })}>
                  Choose a Plan
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
