"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";

interface PaywallModalProps {
  open: boolean;
  onClose: () => void;
}

export function PaywallModal({ open, onClose }: PaywallModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-in zoom-in-95 duration-200">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
          <Sparkles className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">You&apos;ve used your 2 free tries</h2>
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
          <a href="/pricing" className={buttonVariants({ size: "lg", className: "w-full" })}>
            Get Full Access — $19
          </a>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Maybe later
          </Button>
        </div>
      </div>
    </div>
  );
}
