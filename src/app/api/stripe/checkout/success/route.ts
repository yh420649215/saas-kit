import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/client";
import { handleSubscriptionChange } from "@/lib/subscription";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.redirect(`${origin}/pricing?error=missing_session`);
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId, {
      expand: ["subscription", "customer"],
    });

    if (!session.customer || !session.subscription) {
      return NextResponse.redirect(`${origin}/dashboard`);
    }

    await handleSubscriptionChange({
      stripeSubscriptionId: String(session.subscription),
      stripeCustomerId: String(session.customer),
      userId: session.client_reference_id ?? undefined,
      plan: session.metadata?.plan ?? "pro",
      status: "active",
    });

    return NextResponse.redirect(`${origin}/dashboard?success=true`);
  } catch {
    return NextResponse.redirect(`${origin}/dashboard`);
  }
}
