import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

const HOME_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function GET() {
  try {
    const supabase = await createServerSupabase();
    await supabase.auth.signOut();
  } catch {
    // Supabase unavailable — still redirect home to clear local state
  }
  return NextResponse.redirect(new URL("/", HOME_URL));
}
