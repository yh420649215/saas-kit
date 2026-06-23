import { NextResponse } from "next/server";

const LS_API = "https://api.lemonsqueezy.com/v1";

export async function POST() {
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  const variantId = process.env.LEMONSQUEEZY_VARIANT_ID;
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;

  if (!storeId || !variantId || !apiKey) {
    return NextResponse.json({ error: "Payment not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(`${LS_API}/checkouts`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/vnd.api+json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              custom: {
                product: "ai-tools-lifetime",
              },
            },
          },
          relationships: {
            store: { data: { type: "stores", id: storeId } },
            variant: { data: { type: "variants", id: variantId } },
          },
        },
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: json.errors?.[0]?.detail || "Checkout creation failed" },
        { status: res.status }
      );
    }

    return NextResponse.json({ url: json.data.attributes.url });
  } catch {
    return NextResponse.json({ error: "Network error" }, { status: 500 });
  }
}
