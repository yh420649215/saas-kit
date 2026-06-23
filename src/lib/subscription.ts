import { createServiceSupabase } from "@/lib/supabase/server";

interface SubscriptionChange {
  stripeSubscriptionId: string;
  stripeCustomerId?: string;
  userId?: string;
  plan?: string;
  status: string;
}

export async function handleSubscriptionChange(sub: SubscriptionChange) {
  const supabase = await createServiceSupabase();

  const data: Record<string, unknown> = {
    status: sub.status,
    updated_at: new Date().toISOString(),
  };

  if (sub.stripeCustomerId) data.stripe_customer_id = sub.stripeCustomerId;
  if (sub.userId) data.user_id = sub.userId;
  if (sub.plan) data.plan = sub.plan;

  const { data: existing } = await supabase
    .from("subscriptions")
    .select("id")
    .eq("stripe_subscription_id", sub.stripeSubscriptionId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("subscriptions")
      .update(data)
      .eq("stripe_subscription_id", sub.stripeSubscriptionId);
  } else {
    await supabase
      .from("subscriptions")
      .upsert(
        {
          stripe_subscription_id: sub.stripeSubscriptionId,
          ...data,
        },
        { onConflict: "stripe_subscription_id" }
      );
  }
}
