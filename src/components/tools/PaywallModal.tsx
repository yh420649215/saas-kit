"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Loader2 } from "lucide-react";

interface PaywallModalProps {
  open: boolean;
  onClose: () => void;
}

export function PaywallModal({ open, onClose }: PaywallModalProps) {
  const [loading, setLoading] = useState(false);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  // Escape key + body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="paywall-title">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-in zoom-in-95 duration-200">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
          <Sparkles className="h-7 w-7 text-primary" />
        </div>
        <h2 id="paywall-title" className="text-2xl font-bold mb-2">You&apos;ve used your 2 free tries</h2>
        <p className="text-muted-foreground mb-6">
          Unlock unlimited access to all 8 writing tools — forever. No subscription, no recurring fees.
        </p>

        <div className="bg-muted rounded-xl p-4 mb-6 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-lg">Full Access</span>
            <Badge>One-time</Badge>
          </div>
          <div className="text-3xl font-bold mb-3">$19</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              "All 8 AI writing tools, unlimited use",
              "Multiple tone versions per generation",
              "Lifetime access — no subscription",
              "New tools added free forever",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            size="lg"
            className="w-full"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              try {
                const res = await fetch("/api/stripe/checkout", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                });
                const { url, error } = await res.json();
                if (url) window.location.href = url;
                else alert(error || "Something went wrong. Please try again.");
              } catch {
                alert("Network error. Please try again.");
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            {loading ? "Redirecting..." : "Get Full Access — $19"}
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Maybe later
          </Button>
        </div>
      </div>
    </div>
  );
}
