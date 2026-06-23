import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  // Prevent open redirect: only allow relative paths
  const safeNext = next.startsWith("/") && !next.startsWith("//")
    ? next
    : "/dashboard";

  if (code) {
    try {
      const supabase = await createServerSupabase();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${origin}${safeNext}`);
      }
      return NextResponse.redirect(
        `${origin}/auth/login?error=${encodeURIComponent(error.message)}`
      );
    } catch {
      return NextResponse.redirect(
        `${origin}/auth/login?error=${encodeURIComponent("Authentication service unavailable")}`
      );
    }
  }

  return NextResponse.redirect(
    `${origin}/auth/login?error=${encodeURIComponent("Authentication failed — no code provided")}`
  );
}
