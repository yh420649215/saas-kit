import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/client";
import { requireAuth } from "@/lib/supabase/require-auth";

export async function POST(request: Request) {
  const { user } = await requireAuth();

  try {
    const { priceId, plan, successUrl, cancelUrl } = await request.json();

    const session = await getStripe().checkout.sessions.create({
      customer_email: user.email,
      client_reference_id: user.id,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url:
        successUrl ??
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url:
        cancelUrl ??
        `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        userId: user.id,
        plan: plan ?? "pro",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
