import { NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase/server";
import { createHmac } from "crypto";
import { randomBytes } from "crypto";

function generateLicenseKey(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const seg = () => Array.from(randomBytes(4)).map(b => chars[b % chars.length]).join("");
  return `${seg()}-${seg()}-${seg()}-${seg()}`;
}

function verifySignature(payload: string, signature: string): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) return false;
  const hmac = createHmac("sha256", secret);
  const digest = hmac.update(payload).digest("hex");
  return signature === digest;
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-signature") || "";

  if (!verifySignature(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: any;
  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventName = event.meta?.event_name;
  if (eventName !== "order_created") {
    return NextResponse.json({ received: true });
  }

  const email = event.data?.attributes?.user_email;
  const orderId = String(event.data?.id || "");
  const supabase = await createServiceSupabase();

  // Check for existing license
  const { data: existing } = await supabase
    .from("licenses")
    .select("license_key")
    .eq("email", email)
    .eq("product", "ai-tools-lifetime")
    .maybeSingle();

  if (!existing) {
    const licenseKey = generateLicenseKey();
    await supabase.from("licenses").insert({
      email,
      license_key: licenseKey,
      product: "ai-tools-lifetime",
      stripe_session_id: orderId,
      created_at: new Date().toISOString(),
    });
  }

  return NextResponse.json({ received: true });
}
