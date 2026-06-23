import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { pricingPlans } from "@/config/pricing";
import { buttonVariants } from "@/components/ui/button";

export function PricingCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
      {pricingPlans.map((plan) => (
        <Card
          key={plan.id}
          className={plan.highlighted ? "border-primary shadow-lg relative" : "shadow-sm"}
        >
          {plan.highlighted && (
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
              Most Popular
            </Badge>
          )}
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">
                {plan.price === 0 ? "Free" : `$${plan.price}`}
              </span>
              {plan.price > 0 && (
                <span className="text-muted-foreground">/{plan.interval}</span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/auth/register"
              className={buttonVariants({
                variant: plan.highlighted ? "default" : "outline",
                className: "w-full mt-6",
              })}
            >
              {plan.cta}
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
