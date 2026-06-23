import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/client";
import { handleSubscriptionChange } from "@/lib/subscription";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: `Webhook signature verification failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (!session.metadata?.userId || !session.customer || !session.subscription) break;

      await handleSubscriptionChange({
        stripeSubscriptionId: String(session.subscription),
        stripeCustomerId: String(session.customer),
        userId: session.metadata.userId,
        plan: session.metadata?.plan ?? "pro",
        status: "active",
      });
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionChange({
        stripeSubscriptionId: subscription.id,
        plan: subscription.items?.data?.[0]?.price?.lookup_key ?? undefined,
        status: subscription.status,
      });
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionChange({
        stripeSubscriptionId: subscription.id,
        status: "canceled",
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
