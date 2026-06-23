"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

function validateRedirect(path: string | null): string {
  if (!path) return "/dashboard";
  if (path.startsWith("/") && !path.startsWith("//") && !path.startsWith("/\\")) {
    return path;
  }
  return "/dashboard";
}

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const redirectTo = validateRedirect(searchParams.get("next"));

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setConfirmMessage("");

    const { data: { session }, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else if (!session) {
      setConfirmMessage("Check your email for a confirmation link to complete signup.");
    } else {
      router.push(redirectTo);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="flex items-center justify-center gap-2 font-bold text-xl mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">S</div>
          </Link>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Start building your SaaS today</CardDescription>
        </CardHeader>
        <CardContent>
          <OAuthButtons onLogin={handleOAuthLogin} />
          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">OR CONTINUE WITH</span>
          </div>
          <form onSubmit={handleEmailRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="•••••••• (min 6 characters)" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            {confirmMessage && <p className="text-sm text-green-600 dark:text-green-400">{confirmMessage}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
