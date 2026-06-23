import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/client";

export async function POST(request: Request) {
  const { priceId, mode = "payment", successUrl, cancelUrl } = await request.json();

  try {
    const session = await getStripe().checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode,
      success_url: successUrl ?? `${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl ?? `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        product: "ai-tools-lifetime",
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
