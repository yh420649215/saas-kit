import { PricingCards } from "@/components/landing/PricingCards";

export default function PricingPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold tracking-tight">Simple Pricing</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free. Upgrade when you&apos;re ready. Cancel anytime.
          </p>
        </div>
        <PricingCards />
      </div>
    </div>
  );
}
