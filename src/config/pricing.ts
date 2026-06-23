export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: "month" | "year";
  currency: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
  priceId?: string; // Stripe Price ID
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "For hobbyists and small projects",
    price: 0,
    interval: "month",
    currency: "USD",
    features: [
      "1 project",
      "Basic analytics",
      "Community support",
      "1,000 API calls/month",
    ],
    cta: "Get Started",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing businesses",
    price: 29,
    interval: "month",
    currency: "USD",
    highlighted: true,
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "100,000 API calls/month",
      "Custom domain",
      "Team members (up to 5)",
    ],
    cta: "Start Pro",
    priceId: "price_pro_monthly",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large teams and organizations",
    price: 99,
    interval: "month",
    currency: "USD",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Dedicated support",
      "Unlimited API calls",
      "SLA guarantee",
      "SSO / SAML",
      "Custom integrations",
    ],
    cta: "Contact Sales",
  },
];
