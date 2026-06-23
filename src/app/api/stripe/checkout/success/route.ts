import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/client";
import { createServiceSupabase } from "@/lib/supabase/server";
import { randomBytes } from "crypto";

function generateLicenseKey(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const seg = () => Array.from(randomBytes(4)).map(b => chars[b % chars.length]).join("");
  return `${seg()}-${seg()}-${seg()}-${seg()}`;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.redirect(`${origin}/pricing?error=missing_session`);
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.redirect(`${origin}/pricing?error=payment_incomplete`);
    }

    const email = session.customer_details?.email ?? session.customer_email;
    if (!email) {
      return NextResponse.redirect(`${origin}/?unlocked=true`);
    }

    // Check if license already exists
    const supabase = await createServiceSupabase();
    const { data: existing } = await supabase
      .from("licenses")
      .select("license_key")
      .eq("email", email)
      .eq("product", "ai-tools-lifetime")
      .maybeSingle();

    const licenseKey = existing?.license_key ?? generateLicenseKey();

    if (!existing) {
      await supabase.from("licenses").insert({
        email,
        license_key: licenseKey,
        product: "ai-tools-lifetime",
        stripe_session_id: sessionId,
        created_at: new Date().toISOString(),
      });
    }

    return NextResponse.redirect(`${origin}/?unlocked=true&key=${encodeURIComponent(licenseKey)}`);
  } catch {
    return NextResponse.redirect(`${origin}/?unlocked=true`);
  }
}
